name: Update channels
on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:
permissions:
  contents: write
jobs:
  update:
    runs-on: ubuntu-latest
    timeout-minutes: 90
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: if [ -f bot/update.py ]; then python bot/update.py; else python update.py; fi
      - name: Commit changes
        run: |
          git config user.name "vimline-bot"
          git config user.email "bot@users.noreply.github.com"
          git add channels.json
          git diff --staged --quiet || (git commit -m "Update channels" && git push)
