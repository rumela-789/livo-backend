"""Vimline channel bot.
Downloads public channel lists (iptv-org), removes adult content, checks which
streams are alive, and writes channels.json for the app. No paid/pirated sources.
"""
import re, json, time, urllib.request, concurrent.futures as cf

B = 'https://iptv-org.github.io/iptv/'
FILES = {'bd': 'countries/bd', 'ben': 'languages/ben', 'in': 'countries/in', 'hin': 'languages/hin',
         'sports': 'categories/sports', 'movies': 'categories/movies', 'music': 'categories/music',
         'news': 'categories/news', 'us': 'countries/us', 'gb': 'countries/gb',
         'pk': 'countries/pk', 'np': 'countries/np', 'lk': 'countries/lk'}
# More public iptv-org categories (the adult "xxx" list is never used).
for _c in ['kids', 'animation', 'entertainment', 'comedy', 'series', 'classic', 'documentary', 'science', 'culture',
           'religious', 'education', 'lifestyle', 'cooking', 'travel', 'outdoor', 'family', 'general', 'business', 'weather']:
    FILES[_c] = 'categories/' + _c
BLOCK_N, BLOCK_U = set(), set()   # adult channels, used only to EXCLUDE (never shown)
KOL = re.compile(r'bangla|bengal|jalsha|ananda|kolkata|calcutta|aath|aakash|24 ?ghanta|sangeet|mahuaa', re.I)
# Adult content is always dropped (by channel name and by group/category).
ADULT = re.compile(r'\b(xxx|porn\w*|sex\w*|adult|erotic\w*|playboy|hustler|brazzers|penthouse|nude|nudes|hentai|fetish|18\+|redlight|vivid)\b', re.I)
ADULT_GROUP = re.compile(r'xxx|adult|porn|erotic', re.I)
# Tabs whose streams are often region-locked: the app checks these on the viewer's own device.
REGIONAL = {'bd', 'kol', 'hin', 'sa'}
MAX_URLS = 3
UA = {'User-Agent': 'Mozilla/5.0 (VimlineBot)'}

def norm(n):
    n = re.sub(r'\b(hd|sd|fhd|uhd|4k)\b', '', n.lower())
    return re.sub(r'[^a-z0-9\u0980-\u09ff]', '', n)

def parse(text, blocklist=False):
    out, meta = {}, None
    for line in text.splitlines():
        if line.startswith('#EXTINF'):
            name = line.split(',', 1)[1].strip() if ',' in line else ''
            name = re.sub(r'\s*\[.*?\]|\s*\(\d+p\)', '', name).strip()
            g = lambda k: (re.search(k + r'="([^"]*)"', line) or [None, ''])[1]
            tid = g('tvg-id')
            cc = tid.rsplit('.', 1)[-1].split('@')[0].lower() if '.' in tid else ''
            meta = dict(name=name, logo=g('tvg-logo'), cc=cc,
                        adult=bool(ADULT.search(name) or ADULT_GROUP.search(g('group-title'))))
        elif line.strip() and not line.startswith('#') and meta:
            url, k = line.strip(), norm(meta['name'])
            if k and (blocklist or (not meta['adult'] and url.startswith('https://'))):  # http can't play on an https site
                e = out.setdefault(k, dict(name=meta['name'], logo=meta['logo'], cc=meta['cc'], urls=[]))
                if url not in e['urls']:
                    e['urls'].append(url)
            meta = None
    return list(out.values())

def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.read().decode('utf-8', 'replace')

def probe(url):
    """alive = looks like an HLS playlist AND allows browser playback (CORS header)."""
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=8) as r:
            head = r.read(512).decode('utf-8', 'ignore').lstrip()
            return head.startswith('#EXTM3U') and r.headers.get('Access-Control-Allow-Origin') is not None
    except Exception:
        return False

def cat(*keys):
    return lambda r: [c for k in keys for c in r[k]]

TABS = [('bd', 'Bangladesh', lambda r: r['bd']),
        ('kol', 'Kolkata', lambda r: [c for c in r['ben'] if c['cc'] != 'bd'] + [c for c in r['in'] if KOL.search(c['name'])]),
        ('sports', 'Sports', cat('sports')), ('movies', 'Movies', cat('movies')),
        ('music', 'Music', cat('music')), ('news', 'News', cat('news')),
        ('kids', 'Kids', cat('kids', 'animation')),
        ('ent', 'Entertainment', cat('entertainment', 'comedy', 'series', 'classic')),
        ('life', 'Lifestyle', cat('lifestyle', 'cooking', 'travel', 'outdoor', 'family')),
        ('know', 'Knowledge', cat('documentary', 'science', 'culture', 'education')),
        ('rel', 'Religious', cat('religious')),
        ('hin', 'Hindi', cat('hin')),
        ('sa', 'South Asia', cat('pk', 'np', 'lk')),
        ('intl', 'International', cat('us', 'gb', 'general', 'business', 'weather'))]

def build(raw):
    """Each channel is kept only in the first tab that has it; extra links become backups."""
    seen, tabs = {}, []
    for tid, name, get in TABS:
        chans = []
        for c in get(raw):
            k = norm(c['name'])
            if not k or ADULT.search(c['name']) or k in BLOCK_N or any(u in BLOCK_U for u in c['urls']):
                continue
            if k in seen:
                seen[k]['urls'] += [u for u in c['urls'] if u not in seen[k]['urls']]
            else:
                n = dict(name=c['name'], logo=c['logo'], urls=list(c['urls']))
                seen[k] = n
                chans.append(n)
        tabs.append(dict(id=tid, name=name, channels=chans))
    return tabs

def main():
    try:  # adult list is downloaded only so those channels can be removed everywhere
        for c in parse(fetch(B + 'categories/xxx.m3u'), True):
            BLOCK_N.add(norm(c['name'])); BLOCK_U.update(c['urls'])
    except Exception as e:
        print('blocklist failed', e)
    print('blocked', len(BLOCK_N), 'adult names')
    raw = {}
    for k, path in FILES.items():
        try:
            raw[k] = parse(fetch(B + path + '.m3u'))
        except Exception as e:
            print('failed', k, e); raw[k] = []
    tabs = build(raw)
    jobs = {u for t in tabs if t['id'] not in REGIONAL for c in t['channels'] for u in c['urls'][:MAX_URLS]}
    print('checking', len(jobs), 'links')
    with cf.ThreadPoolExecutor(64) as ex:
        res = dict(zip(jobs, ex.map(probe, jobs)))
    for t in tabs:
        keep = []
        for c in t['channels']:
            if t['id'] in REGIONAL:
                keep.append(c)          # checked later on the viewer's device
            else:
                ok = [u for u in c['urls'][:MAX_URLS] if res.get(u)]
                if ok:
                    c['urls'] = ok; c['v'] = 1; keep.append(c)
        t['channels'] = keep
        print(t['id'], len(keep))
    with open('channels.json', 'w', encoding='utf-8') as f:
        json.dump(dict(updated=int(time.time()), tabs=tabs), f, ensure_ascii=False, separators=(',', ':'))

if __name__ == '__main__':
    main()
