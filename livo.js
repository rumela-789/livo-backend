<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Livo</title>
    <style>
        :root {
            --bg-color: #000000;
            --card-bg: #16181c;
            --text-main: #e7e9ea;
            --text-sec: #71767b;
            --accent: #1d9bf0;
            --border: #2f3336;
            --like: #f91880;
            --live: #f91880;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        body { background-color: var(--bg-color); color: var(--text-main); overflow-x: hidden; padding-top: 100px; padding-bottom: 20px; }
        
        button { cursor: pointer; border: none; outline: none; background: transparent; color: inherit; }
        input[type="text"], input[type="password"], textarea { width: 100%; background: black; border: 1px solid var(--border); color: var(--text-main); padding: 12px; border-radius: 4px; font-size: 15px; }
        input[type="file"] { display: none; }

        /* AUTH SCREENS */
        .auth-container { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; padding: 20px; background: black; }
        .auth-box { width: 100%; max-width: 400px; }
        .auth-title { font-size: 30px; font-weight: 800; margin-bottom: 30px; color: white; text-align: center; }
        .auth-input { margin-bottom: 15px; border-radius: 4px; }
        .auth-btn { background: var(--accent); color: white; font-weight: bold; padding: 15px; border-radius: 30px; width: 100%; font-size: 16px; margin-top: 10px; }
        .toggle-auth { margin-top: 20px; color: var(--text-sec); font-size: 14px; text-align: center; }
        .toggle-auth a { color: var(--accent); cursor: pointer; }

        /* HEADER & TOP NAV */
        .sticky-header { position: fixed; top: 0; left: 0; width: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); z-index: 100; border-bottom: 1px solid var(--border); }
        .app-header { padding: 10px 15px; display: flex; align-items: center; gap: 15px; justify-content: space-between; }
        .logo { font-size: 24px; font-weight: 900; color: white; letter-spacing: -1px; cursor: pointer; }
        
        .search-container { flex: 1; margin: 0 10px; position: relative; }
        .search-input { background: #202327; border: none; padding: 10px 15px 10px 40px; border-radius: 20px; width: 100%; color: white; font-size: 14px; }
        .search-icon { position: absolute; left: 12px; top: 10px; color: var(--text-sec); }

        .top-nav { display: flex; justify-content: space-around; padding: 5px 0; border-bottom: 1px solid var(--border); }
        .nav-item { display: flex; flex-direction: column; align-items: center; color: var(--text-sec); padding: 8px; width: 20%; position: relative; }
        .nav-item svg { width: 26px; height: 26px; fill: currentColor; transition: fill 0.2s; }
        .nav-item.active { color: var(--text-main); }
        .nav-item.active::after { content: ''; position: absolute; bottom: 0; width: 50px; height: 4px; background: var(--accent); border-radius: 2px; }

        /* MENU DROPDOWN */
        .menu-btn { font-size: 20px; color: var(--text-main); }
        .dropdown-menu { position: absolute; top: 60px; right: 15px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; width: 200px; display: none; flex-direction: column; box-shadow: 0 5px 15px rgba(0,0,0,0.5); z-index: 101; }
        .dropdown-menu.show { display: flex; }
        .menu-opt { padding: 12px 15px; border-bottom: 1px solid var(--border); cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 15px; }
        .menu-opt:last-child { border-bottom: none; }
        .menu-opt:hover { background: var(--border); }

        /* MAIN CONTENT */
        .container { max-width: 600px; margin: 0 auto; padding: 0 10px; }
        .view-section { display: none; animation: fadeIn 0.2s; }
        .view-section.active { display: block; }

        /* COMPOSER BOX */
        .cp-box { padding: 15px; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
        .cp-top-row { display: flex; align-items: flex-start; gap: 10px; }
        .cp-avatar-sm { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border); transition: opacity 0.2s; }
        .cp-avatar-sm:hover { opacity: 0.8; }
        
        .cp-input-container { flex: 1; }
        .cp-input { border: none; background: transparent; font-size: 18px; color: white; resize: none; outline: none; min-height: 50px; padding: 10px 0; width: 100%; }
        
        /* Advanced Tools Layout */
        .cp-tools { display: flex; justify-content: space-between; align-items: center; margin-top: 5px; padding-left: 50px; }
        
        .cp-icons-group { display: flex; gap: 15px; }
        
        /* Small Advanced Icons */
        .cp-icon-btn { 
            font-size: 18px; 
            cursor: pointer; 
            color: var(--accent); 
            transition: color 0.2s; 
            display: flex; 
            align-items: center;
            justify-content: center;
        }
        .cp-icon-btn:hover { color: #8ed1fc; }
        
        .cp-btn { background: var(--accent); color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; opacity: 0.5; pointer-events: none; transition: 0.2s; white-space: nowrap; }
        .cp-btn.ready { opacity: 1; pointer-events: auto; }

        .file-status { font-size: 12px; color: var(--text-main); margin-left: auto; display: none; } 

        /* POST CARD */
        .post-card { padding: 15px 10px; border-bottom: 1px solid var(--border); position: relative; }
        .post-card:hover { background-color: rgba(255,255,255,0.03); }
        
        .pc-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .pc-user-info { display: flex; gap: 10px; flex: 1; }
        .pc-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; cursor: pointer; border: 1px solid var(--border); }
        .pc-meta { flex: 1; min-width: 0; }
        .pc-top-line { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
        
        .pc-name { font-weight: bold; color: var(--text-main); cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px; }
        .pc-name:hover { text-decoration: underline; }
        .pc-handle { color: var(--text-sec); font-size: 14px; white-space: nowrap; }
        
        /* Follow Button in Feed */
        .follow-btn-small {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-main);
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
            white-space: nowrap;
            margin-left: 5px;
        }
        .follow-btn-small:hover { background: #d7dbdc; color: black; border-color: #d7dbdc; }
        .follow-btn-small.following { border-color: var(--border); color: var(--text-main); }
        .follow-btn-small.following:hover { background: #f4212e1a; color: #f4212e; border-color: #f4212e; }

        /* Post Options Menu (Edit/Delete) */
        .post-options-btn { color: var(--text-sec); cursor: pointer; padding: 5px; font-size: 18px; }
        .post-menu { position: absolute; right: 20px; top: 45px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); display: none; flex-direction: column; z-index: 10; }
        .post-menu.show { display: flex; }
        .pm-item { padding: 10px 20px; cursor: pointer; font-size: 14px; color: var(--text-main); }
        .pm-item:hover { background: var(--border); }
        .pm-item.delete { color: #f4212e; }

        .pc-text { font-size: 15px; line-height: 1.5; margin-bottom: 10px; margin-left: 50px; white-space: pre-wrap; word-break: break-word; }

        /* MEDIA WRAPPERS - Twitter Style */
        .pc-media-wrapper { width: 100%; background: #000; border-radius: 16px; overflow: hidden; position: relative; margin-bottom: 10px; margin-left: 50px; border: 1px solid var(--border); max-width: calc(100% - 50px); }
        .pc-media video { width: 100%; max-height: 500px; display: block; object-fit: cover; }
        .pc-media img { width: 100%; display: block; object-fit: cover; }
        .pc-media-wrapper.img-mode { max-height: 500px; width: auto; border-radius: 16px; } 
        .pc-media-wrapper.vid-mode { aspect-ratio: 16/9; max-height: 400px; }

        /* COMMENTS */
        .comments-section { margin-left: 50px; margin-top: 10px; border-top: 1px solid var(--border); display: none; padding-top: 10px; }
        .comments-section.open { display: block; }
        .comment-item { padding: 8px 0; display: flex; gap: 10px; font-size: 13px; }
        .comment-bubble { background: #16181c; padding: 8px 12px; border-radius: 12px; flex: 1; }
        .comment-author { font-weight: bold; font-size: 12px; color: var(--text-sec); margin-bottom: 2px; }
        .comment-input-wrapper { display: flex; gap: 8px; margin-top: 10px; align-items: center; }
        .comment-input { background: #000; border: 1px solid var(--border); border-radius: 20px; padding: 8px 12px; font-size: 13px; color: white; width: 100%; }
        .comment-btn { background: var(--accent); color: white; border: none; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }

        /* POST ACTIONS */
        .pc-actions { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 10px; margin-left: 50px; max-width: calc(100% - 50px); }
        .action-item { display: flex; align-items: center; gap: 6px; color: var(--text-sec); font-size: 13px; cursor: pointer; transition: color 0.2s; padding: 8px; border-radius: 4px; }
        .action-item:hover { background: rgba(29, 155, 240, 0.1); }
        .action-item:hover.like { color: var(--like); background: rgba(249, 24, 128, 0.1); }
        .action-item:hover.comment { color: var(--accent); background: rgba(29, 155, 240, 0.1); }
        .action-item i { font-size: 18px; font-style: normal; }
        .action-item.liked { color: var(--like) !important; } 

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }

        /* PROFILE HEADER */
        .profile-header { padding: 0 0 20px 0; border-bottom: 1px solid var(--border); position: relative; }
        .cover-wrapper { position: relative; width: 100%; height: 150px; background: #333; }
        .cover-pic { width: 100%; height: 100%; object-fit: cover; }
        .cover-upload-trigger { position: absolute; bottom: 10px; right: 10px; width: 32px; height: 32px; background: rgba(0,0,0,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; cursor: pointer; transition: background 0.2s; }
        .profile-pic-wrapper { position: relative; display: inline-block; margin-top: -50px; margin-left: 15px; }
        .profile-pic { width: 120px; height: 120px; border-radius: 50%; border: 4px solid black; object-fit: cover; position: relative; z-index: 2; background: #333; }
        .avatar-upload-trigger { position: absolute; bottom: 5px; right: 5px; width: 32px; height: 32px; background: rgba(0,0,0,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; transition: background 0.2s; color: white; }
        .ph-details { padding: 10px 15px 0 15px; }
        .ph-top-row { display: flex; justify-content: space-between; align-items: flex-start; }
        .ph-name { font-size: 22px; font-weight: 800; color: white; display: flex; align-items: center; gap: 5px; }
        .ph-handle { color: var(--text-sec); font-size: 14px; margin-bottom: 12px; }
        .ph-bio { color: var(--text-main); margin-bottom: 12px; font-size: 15px; line-height: 1.4; }
        .ph-meta { font-size: 14px; color: var(--text-sec); margin-bottom: 15px; display: flex; gap: 15px; }
        
        .edit-btn { border: 1px solid var(--border); padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; min-width: 100px; text-align: center; transition: 0.2s; }
        .edit-btn:hover { background: white; color: black; border-color: white; }
        .badge-channel { background: var(--accent); color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: normal; text-transform: uppercase; }
        
        /* SEARCH & OTHERS */
        .search-tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 15px; }
        .s-tab { flex: 1; text-align: center; padding: 15px; cursor: pointer; border-bottom: 2px solid transparent; color: var(--text-sec); font-weight: 500; transition: 0.2s; }
        .s-tab.active { border-bottom-color: var(--accent); color: var(--accent); font-weight: bold; }
        .search-result-item { padding: 15px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; cursor: pointer; }
        .search-result-item:hover { background: rgba(255,255,255,0.03); }

        /* MODALS */
        .modal { position: fixed; bottom: 0; left: 0; width: 100%; background: var(--card-bg); border-top: 1px solid var(--border); z-index: 200; padding: 25px; display: none; flex-direction: column; animation: slideUp 0.3s; border-radius: 20px 20px 0 0; box-shadow: 0 -5px 20px rgba(0,0,0,0.5); }
        .modal.open { display: flex; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .modal-input-group { margin-bottom: 15px; }
        .modal-input-group label { display: block; color: var(--text-sec); font-size: 12px; margin-bottom: 5px; }

    </style>
</head>
<body>

    <!-- AUTH SECTION -->
    <div id="auth-screen" class="auth-container">
        <div class="auth-box">
            <div class="auth-title">Livo</div>
            <div id="login-form">
                <input type="text" id="l-user" class="auth-input" placeholder="Username">
                <input type="password" id="l-pass" class="auth-input" placeholder="Password">
                <button class="auth-btn" onclick="app.login()">Log in</button>
                <div class="toggle-auth">Don't have an account? <a onclick="app.toggleAuth('register')">Sign up</a></div>
            </div>
            <div id="register-form" style="display:none;">
                <input type="text" id="r-user" class="auth-input" placeholder="Username">
                <input type="password" id="r-pass" class="auth-input" placeholder="Password">
                <button class="auth-btn" onclick="app.register()">Sign up</button>
                <div class="toggle-auth">Already have an account? <a onclick="app.toggleAuth('login')">Log in</a></div>
            </div>
        </div>
    </div>

    <!-- APP SECTION -->
    <div id="app-screen" style="display:none;">
        <div class="sticky-header">
            <div class="app-header">
                <div class="logo" onclick="app.navTo('home')">Livo</div>
                <div class="search-container">
                    <span class="search-icon">🔍</span>
                    <input type="text" class="search-input" placeholder="Search" onkeyup="app.handleSearch(this.value)">
                </div>
                <button class="menu-btn" onclick="document.getElementById('main-menu').classList.toggle('show')">☰</button>
                <div id="main-menu" class="dropdown-menu">
                    <div class="menu-opt" onclick="app.navTo('profile'); document.getElementById('main-menu').classList.remove('show')">👤 My Profile</div>
                    <div class="menu-opt" onclick="document.getElementById('modal-edit-profile').classList.add('open'); document.getElementById('main-menu').classList.remove('show')">✏️ Edit Profile</div>
                    <div class="menu-opt" onclick="app.logout()">🚪 Logout</div>
                </div>
            </div>
            
            <div class="top-nav">
                <div class="nav-item active" onclick="app.navTo('home')" id="nav-home">
                    <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
                <div class="nav-item" onclick="app.navTo('video')" id="nav-video">
                    <svg viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
                </div>
                <div class="nav-item" onclick="app.navTo('chat')" id="nav-chat">
                    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
                </div>
                <div class="nav-item" onclick="app.navTo('channel')" id="nav-channel">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <div class="nav-item" onclick="app.navTo('ping')" id="nav-ping">
                    <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
                </div>
            </div>
        </div>

        <div class="container" style="margin-top: 10px;">
            
            <!-- HOME VIEW -->
            <div id="view-home" class="view-section active">
                <div class="cp-box">
                    <div class="cp-top-row">
                        <!-- Avatar Clickable -->
                        <img id="home-avatar" class="cp-avatar-sm" src="" onclick="app.navTo('profile')">
                        <div class="cp-input-container">
                            <textarea id="home-post-input" class="cp-input" placeholder="What is happening?!" oninput="app.checkPostBtn('home')"></textarea>
                        </div>
                    </div>
                    
                    <div class="cp-tools">
                        <div class="cp-icons-group">
                            <label for="home-img-file" class="cp-icon-btn" title="Image">🖼️</label>
                            <label for="home-vid-file" class="cp-icon-btn" title="Video">🎥</label>
                            <!-- Live Option -->
                            <label for="home-vid-file" class="cp-icon-btn" title="Go Live" style="color:var(--live)">📡</label>
                        </div>
                        <span id="home-file-status" class="file-status"></span>
                        <button class="cp-btn" id="home-post-btn" onclick="app.createPost('home')">Post</button>
                    </div>
                    <input type="file" id="home-img-file" accept="image/*" onchange="app.handleFileSelect('home', 'img', this)">
                    <input type="file" id="home-vid-file" accept="video/*" onchange="app.handleFileSelect('home', 'vid', this)">
                </div>
                <div id="home-feed"></div>
            </div>

            <!-- VIDEO VIEW -->
            <div id="view-video" class="view-section">
                <div id="video-feed"></div>
            </div>

            <!-- CHAT VIEW -->
            <div id="view-chat" class="view-section">
                <h3 style="padding:15px; border-bottom:1px solid var(--border);">Messages</h3>
                <div id="chat-list">
                    <div class="search-result-item">
                        <img src="https://picsum.photos/seed/u1/100/100" class="pc-avatar">
                        <div>
                            <div style="font-weight:bold;">John Doe</div>
                            <div style="color:var(--text-sec); font-size:13px;">Hey, how are you?</div>
                        </div>
                    </div>
                    <div class="search-result-item">
                        <img src="https://picsum.photos/seed/u2/100/100" class="pc-avatar">
                        <div>
                            <div style="font-weight:bold;">Jane Smith</div>
                            <div style="color:var(--text-sec); font-size:13px;">Check out my new channel!</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SEARCH RESULTS VIEW -->
            <div id="view-search" class="view-section">
                <div class="search-tabs">
                    <div class="s-tab active" onclick="app.switchSearchTab('profiles')">Profiles</div>
                    <div class="s-tab" onclick="app.switchSearchTab('channels')">Channels</div>
                </div>
                <div id="search-results-list"></div>
            </div>

            <!-- PROFILE VIEW -->
            <div id="view-profile" class="view-section">
                <div id="profile-header-content"></div>
                <div class="cp-box" id="profile-post-box" style="display:none;">
                    <div class="cp-top-row">
                        <img id="profile-avatar" class="cp-avatar-sm" src="" onclick="app.navTo('profile')">
                        <div class="cp-input-container">
                            <textarea id="profile-post-input" class="cp-input" placeholder="What is happening?!" oninput="app.checkPostBtn('profile')"></textarea>
                        </div>
                    </div>
                    <div class="cp-tools">
                        <div class="cp-icons-group">
                            <label for="profile-img-file" class="cp-icon-btn">🖼️</label>
                            <label for="profile-vid-file" class="cp-icon-btn">🎥</label>
                            <label for="profile-vid-file" class="cp-icon-btn" style="color:var(--live)">📡</label>
                        </div>
                        <span id="profile-file-status" class="file-status"></span>
                        <button class="cp-btn" id="profile-post-btn" onclick="app.createPost('profile')">Post</button>
                    </div>
                    <input type="file" id="profile-img-file" accept="image/*" onchange="app.handleFileSelect('profile', 'img', this)">
                    <input type="file" id="profile-vid-file" accept="video/*" onchange="app.handleFileSelect('profile', 'vid', this)">
                </div>
                <div id="profile-feed"></div>
            </div>

            <!-- CHANNEL VIEW -->
            <div id="view-channel" class="view-section">
                <div id="channel-header-content"></div>
                <div class="cp-box" id="channel-post-box" style="display:none;">
                    <div class="cp-top-row">
                        <img id="channel-avatar" class="cp-avatar-sm" src="">
                        <div class="cp-input-container">
                            <textarea id="channel-post-input" class="cp-input" placeholder="Broadcast to Channel..." oninput="app.checkPostBtn('channel')"></textarea>
                        </div>
                    </div>
                    <div class="cp-tools">
                        <div class="cp-icons-group">
                            <label for="channel-img-file" class="cp-icon-btn">🖼️</label>
                            <label for="channel-vid-file" class="cp-icon-btn">🎥</label>
                            <label for="channel-vid-file" class="cp-icon-btn" style="color:var(--live)">📡</label>
                        </div>
                        <span id="channel-file-status" class="file-status"></span>
                        <button class="cp-btn" id="channel-post-btn" onclick="app.createPost('channel')">Post</button>
                    </div>
                    <input type="file" id="channel-img-file" accept="image/*" onchange="app.handleFileSelect('channel', 'img', this)">
                    <input type="file" id="channel-vid-file" accept="video/*" onchange="app.handleFileSelect('channel', 'vid', this)">
                </div>
                <div id="channel-feed"></div>
            </div>

            <div id="view-channel-list" class="view-section">
                <div style="display:flex; justify-content:space-between; align-items:center; padding:15px;">
                    <h3>Channels</h3>
                    <button class="cp-btn" style="opacity:1; pointer-events:auto;" onclick="app.openCreateChannel()">+ Create</button>
                </div>
                <div id="all-channels-list"></div>
            </div>

             <div id="view-ping" class="view-section">
                <h3 style="padding:15px; border-bottom:1px solid var(--border);">Ping</h3>
                <div id="ping-list" style="padding:15px;">
                    <div style="padding:10px; border-bottom:1px solid var(--border); display:flex; gap:10px; align-items:center;">
                        <div style="background:var(--accent); width:10px; height:10px; border-radius:50%;"></div>
                        <div><strong>Livo Welcome</strong> liked your post.</div>
                    </div>
                    <div style="padding:10px; border-bottom:1px solid var(--border); display:flex; gap:10px; align-items:center;">
                        <div style="background:var(--accent); width:10px; height:10px; border-radius:50%;"></div>
                        <div><strong>System</strong> welcomed you to Livo.</div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- MODAL: CREATE CHANNEL -->
    <div id="modal-create-channel" class="modal">
        <div class="modal-head" style="font-size:18px; font-weight:bold; margin-bottom:15px; display:flex; justify-content:space-between;">
            <span>Create Channel</span>
            <span onclick="document.getElementById('modal-create-channel').classList.remove('open')" style="cursor:pointer;">×</span>
        </div>
        <input type="text" id="new-chan-name" class="auth-input" placeholder="Channel Name">
        <textarea id="new-chan-bio" class="auth-input" placeholder="Description"></textarea>
        <button class="auth-btn" onclick="app.submitCreateChannel()">Create</button>
    </div>

    <!-- MODAL: EDIT PROFILE -->
    <div id="modal-edit-profile" class="modal">
        <div class="modal-head" style="font-size:18px; font-weight:bold; margin-bottom:15px; display:flex; justify-content:space-between;">
            <span>Edit Profile</span>
            <span onclick="document.getElementById('modal-edit-profile').classList.remove('open')" style="cursor:pointer;">×</span>
        </div>
        <div class="modal-input-group">
            <label>Name</label>
            <input type="text" id="edit-name" class="auth-input">
        </div>
        <div class="modal-input-group">
            <label>Bio</label>
            <textarea id="edit-bio" class="auth-input" rows="3"></textarea>
        </div>
        <div class="modal-input-group">
            <label>Location</label>
            <input type="text" id="edit-location" class="auth-input">
        </div>
        <div class="modal-input-group">
            <label>Website</label>
            <input type="text" id="edit-website" class="auth-input">
        </div>
        <button class="auth-btn" onclick="app.saveProfileChanges()">Save</button>
    </div>

    <script>
        const DB = {
            users: JSON.parse(localStorage.getItem('livo_users')) || [],
            posts: JSON.parse(localStorage.getItem('livo_posts')) || [],
            channels: JSON.parse(localStorage.getItem('livo_channels')) || [],
            currentUser: JSON.parse(localStorage.getItem('livo_curr')) || null
        };

        const app = {
            state: { currentView: 'home', viewingProfileId: null, viewingChannelId: null, searchTab: 'profiles' },

            init: function() {
                if(DB.currentUser) { this.showApp(); } 
                else { document.getElementById('auth-screen').style.display = 'flex'; }
            },

            save: function() {
                localStorage.setItem('livo_users', JSON.stringify(DB.users));
                localStorage.setItem('livo_posts', JSON.stringify(DB.posts));
                localStorage.setItem('livo_channels', JSON.stringify(DB.channels));
                localStorage.setItem('livo_curr', JSON.stringify(DB.currentUser));
            },

            toggleAuth: (type) => {
                document.getElementById('login-form').style.display = type === 'login' ? 'block' : 'none';
                document.getElementById('register-form').style.display = type === 'register' ? 'block' : 'none';
            },

            login: function() {
                const u = document.getElementById('l-user').value.trim();
                const p = document.getElementById('l-pass').value.trim();
                if(!u || !p) return alert("Please enter credentials");
                const user = DB.users.find(x => x.username.toLowerCase() === u.toLowerCase() && x.password === p);
                if(user) { DB.currentUser = user; this.save(); this.showApp(); } else alert('Wrong credentials');
            },

            register: function() {
                const u = document.getElementById('r-user').value.trim();
                const p = document.getElementById('r-pass').value.trim();
                if(!u || !p) return alert("All fields required");
                if(DB.users.find(x => x.username.toLowerCase() === u.toLowerCase())) return alert('Username already taken');
                const newUser = { 
                    id: Date.now(), 
                    username: u, 
                    password: p, 
                    bio: "Hello Livo!", 
                    location: "",
                    website: "",
                    avatar: `https://picsum.photos/seed/${u}/200/200`, 
                    cover: `https://picsum.photos/seed/${u}cover/600/200`,
                    following: [] 
                };
                DB.users.push(newUser); DB.currentUser = newUser; this.save(); this.showApp();
            },

            logout: function() { DB.currentUser = null; localStorage.removeItem('livo_curr'); location.reload(); },

            showApp: function() {
                document.getElementById('auth-screen').style.display = 'none';
                document.getElementById('app-screen').style.display = 'block';
                document.getElementById('home-avatar').src = DB.currentUser.avatar;
                if(DB.posts.length === 0) {
                    DB.posts.push({ id: 1, authorId: 999, authorName: "Livo Official", isChannel: true, channelId: 100, content: "Welcome to Livo! Post videos, images and connect with channels.", media: null, type: 'post', likes: 120, comments: [], timestamp: Date.now() });
                    DB.channels.push({id: 100, ownerId: 999, name: "Livo Official", bio: "System Channel", avatar: `https://picsum.photos/seed/livo/200/200`, cover: `https://picsum.photos/seed/cover1/600/200`});
                    this.save();
                }
                this.navTo('home');
            },

            navTo: function(viewName) {
                this.state.currentView = viewName;
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                const navEl = document.getElementById('nav-' + viewName);
                if(navEl) navEl.classList.add('active');
                document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
                
                if(viewName === 'home') { document.getElementById('view-home').classList.add('active'); this.renderFeed('home'); } 
                else if (viewName === 'video') { document.getElementById('view-video').classList.add('active'); this.renderFeed('video'); } 
                else if (viewName === 'chat') { document.getElementById('view-chat').classList.add('active'); } 
                else if (viewName === 'channel') { document.getElementById('view-channel-list').classList.add('active'); this.renderChannelList(); } 
                else if (viewName === 'ping') { document.getElementById('view-ping').classList.add('active'); } 
                else if (viewName === 'profile') { this.openProfile(DB.currentUser.id); } 
                else if (viewName === 'search') { document.getElementById('view-search').classList.add('active'); }
            },

            handleFileSelect: function(context, type, fileInput) {
                const file = fileInput.files[0];
                if(!file) return;
                const btn = document.getElementById(context + '-post-btn');
                const statusSpan = document.getElementById(context + '-file-status');
                if(type === 'img') document.getElementById(context + '-vid-file').value = "";
                if(type === 'vid') document.getElementById(context + '-img-file').value = "";
                const reader = new FileReader();
                reader.onload = (e) => {
                    btn.dataset.fileData = e.target.result;
                    btn.dataset.fileType = type;
                    btn.classList.add('ready');
                    statusSpan.innerText = type === 'img' ? "Image" : "Video";
                    statusSpan.style.display = "block";
                };
                reader.readAsDataURL(file);
            },

            openEditProfileModal: function() {
                document.getElementById('edit-name').value = DB.currentUser.username;
                document.getElementById('edit-bio').value = DB.currentUser.bio;
                document.getElementById('edit-location').value = DB.currentUser.location || '';
                document.getElementById('edit-website').value = DB.currentUser.website || '';
                document.getElementById('modal-edit-profile').classList.add('open');
            },

            saveProfileChanges: function() {
                const newName = document.getElementById('edit-name').value;
                const newBio = document.getElementById('edit-bio').value;
                const newLoc = document.getElementById('edit-location').value;
                const newWeb = document.getElementById('edit-website').value;
                if(!newName) return alert("Name cannot be empty");

                DB.currentUser.username = newName;
                DB.currentUser.bio = newBio;
                DB.currentUser.location = newLoc;
                DB.currentUser.website = newWeb;

                const idx = DB.users.findIndex(u => u.id === DB.currentUser.id);
                if(idx > -1) DB.users[idx] = DB.currentUser;

                this.save();
                document.getElementById('modal-edit-profile').classList.remove('open');
                alert("Profile Updated!");
                this.openProfile(DB.currentUser.id);
            },

            updateProfileImage: function(type, input) {
                const file = input.files[0];
                if(!file) return;
                const reader = new FileReader();
                reader.onload = (e) => {
                    if(type === 'avatar') DB.currentUser.avatar = e.target.result;
                    else if(type === 'cover') DB.currentUser.cover = e.target.result;
                    const idx = DB.users.findIndex(u => u.id === DB.currentUser.id);
                    if(idx > -1) DB.users[idx] = DB.currentUser;
                    this.save();
                    this.openProfile(DB.currentUser.id); 
                };
                reader.readAsDataURL(file);
            },

            clearFile: function(context) {
                const btn = document.getElementById(context + '-post-btn');
                document.getElementById(context + '-img-file').value = "";
                document.getElementById(context + '-vid-file').value = "";
                delete btn.dataset.fileData;
                delete btn.dataset.fileType;
                btn.classList.remove('ready');
                document.getElementById(context + '-file-status').innerText = "";
                document.getElementById(context + '-file-status').style.display = "none";
            },

            checkPostBtn: function(context) {
                const text = document.getElementById(context + '-post-input').value;
                const btn = document.getElementById(context + '-post-btn');
                if(text.trim().length > 0 || btn.dataset.fileData) {
                    btn.classList.add('ready');
                } else {
                    if(!btn.dataset.fileData) btn.classList.remove('ready');
                }
            },

            createPost: function(context) {
                let text="", media=null, type='post', isChannel=false, channelId=null, authorName=DB.currentUser.username, authorId=DB.currentUser.id;
                
                if(context === 'home') { text = document.getElementById('home-post-input').value; } 
                else if (context === 'profile') { 
                    text = document.getElementById('profile-post-input').value; 
                    // Explicitly ensuring profile posts go to user timeline
                    isChannel = false; 
                } 
                else if (context === 'channel') { 
                    text = document.getElementById('channel-post-input').value; 
                    isChannel = true; 
                    channelId = this.state.viewingChannelId; 
                    const chan = DB.channels.find(c => c.id == channelId); 
                    authorName = chan ? chan.name : "Unknown Channel"; 
                    authorId = chan.ownerId; 
                }
                
                const btn = document.getElementById(context + '-post-btn');
                if(btn.dataset.fileData) {
                    media = btn.dataset.fileData;
                    type = btn.dataset.fileType === 'vid' ? 'video' : 'post';
                }

                if(!text && !media) return alert("Empty content");

                const newPost = { id: Date.now(), authorId, authorName, isChannel, channelId, content: text, media, type, likes: 0, comments: [], timestamp: Date.now() };
                DB.posts.unshift(newPost); this.save();
                
                if(context === 'home') { document.getElementById('home-post-input').value = ""; this.clearFile('home'); }
                if(context === 'profile') { document.getElementById('profile-post-input').value = ""; this.clearFile('profile'); }
                if(context === 'channel') { document.getElementById('channel-post-input').value = ""; this.clearFile('channel'); }
                
                this.refreshCurrentView();
            },

            deletePost: function(postId) {
                if(!confirm("Delete this post?")) return;
                DB.posts = DB.posts.filter(p => p.id !== postId);
                this.save();
                this.refreshCurrentView();
            },

            editPost: function(postId) {
                const post = DB.posts.find(p => p.id === postId);
                if(!post) return;
                const newText = prompt("Edit caption:", post.content);
                if(newText !== null) {
                    post.content = newText;
                    this.save();
                    this.refreshCurrentView();
                }
            },

            toggleLike: function(postId, btnElement) {
                const post = DB.posts.find(p => p.id === postId);
                if(post) {
                    if(!post.likedBy) post.likedBy = [];
                    const userId = DB.currentUser.id;
                    const index = post.likedBy.indexOf(userId);
                    if(index === -1) {
                        post.likedBy.push(userId);
                        post.likes++;
                        btnElement.classList.add('liked');
                        btnElement.querySelector('span').innerText = post.likes;
                    } else {
                        post.likedBy.splice(index, 1);
                        post.likes--;
                        btnElement.classList.remove('liked');
                        btnElement.querySelector('span').innerText = post.likes;
                    }
                    this.save();
                }
            },

            submitComment: function(postId, inputId) {
                const input = document.getElementById(inputId);
                const text = input.value.trim();
                if(!text) return;

                const post = DB.posts.find(p => p.id === postId);
                if(post) {
                    const comment = { id: Date.now(), authorName: DB.currentUser.username, text: text, timestamp: Date.now() };
                    post.comments.push(comment);
                    this.save();
                    input.value = "";
                    this.refreshCurrentView();
                    setTimeout(() => {
                        const section = document.getElementById(`comments-${postId}`);
                        if(section) section.classList.add('open');
                    }, 50);
                }
            },

            toggleFollow: function(targetId, isChannel, btnElement) {
                if(targetId === DB.currentUser.id && !isChannel) return;

                let list;
                if(isChannel) {
                    const chan = DB.channels.find(c => c.id === targetId);
                    if(!chan.followers) chan.followers = [];
                    list = chan.followers;
                    const idx = list.indexOf(DB.currentUser.id);
                    if(idx > -1) { list.splice(idx, 1); btnElement.innerText = "Follow"; btnElement.classList.remove('following'); }
                    else { list.push(DB.currentUser.id); btnElement.innerText = "Following"; btnElement.classList.add('following'); }
                } else {
                    if(!DB.currentUser.following) DB.currentUser.following = [];
                    list = DB.currentUser.following;
                    const idx = list.indexOf(targetId);
                    if(idx > -1) {
                        list.splice(idx, 1);
                        if(btnElement) { btnElement.innerText = "Follow"; btnElement.classList.remove('following'); }
                    } else {
                        list.push(targetId);
                        if(btnElement) { btnElement.innerText = "Following"; btnElement.classList.add('following'); }
                    }
                    const uIdx = DB.users.findIndex(u => u.id === DB.currentUser.id);
                    if(uIdx > -1) DB.users[uIdx] = DB.currentUser;
                }
                this.save();
            },

            // NEW: Time Ago Function
            timeAgo: function(timestamp) {
                const seconds = Math.floor((new Date() - timestamp) / 1000);
                let interval = seconds / 31536000;
                if (interval > 1) return Math.floor(interval) + "y";
                interval = seconds / 2592000;
                if (interval > 1) return Math.floor(interval) + "mo";
                interval = seconds / 86400;
                if (interval > 1) return Math.floor(interval) + "d";
                interval = seconds / 3600;
                if (interval > 1) return Math.floor(interval) + "h";
                interval = seconds / 60;
                if (interval > 1) return Math.floor(interval) + "m";
                return "Just now";
            },

            refreshCurrentView: function() {
                const v = this.state.currentView;
                if(v === 'home') this.renderFeed('home');
                if(v === 'video') this.renderFeed('video');
                if(this.state.viewingChannelId) this.openChannel(this.state.viewingChannelId);
                if(this.state.viewingProfileId) this.openProfile(this.state.viewingProfileId);
            },

            renderFeed: function(viewType) {
                const containerId = viewType === 'video' ? 'video-feed' : 'home-feed';
                const container = document.getElementById(containerId);
                container.innerHTML = '';
                let posts = [...DB.posts].sort((a,b) => b.timestamp - a.timestamp);
                
                if(viewType === 'video') posts = posts.filter(p => p.type === 'video');
                
                if(posts.length === 0) container.innerHTML = "<div style='padding:20px;text-align:center;color:#777'>No posts yet</div>";

                posts.forEach(post => { 
                    container.innerHTML += this.buildPostHTML(post, viewType); 
                });
            },

            buildPostHTML: function(post, viewType) {
                const isChannel = post.isChannel;
                const isMyPost = post.authorId === DB.currentUser.id || (isChannel && post.authorId === DB.currentUser.id); 
                // BADGE REMOVED FROM FEED as requested
                // const badge = isChannel ? `<span class="badge-channel">Channel</span>` : ''; 
                
                const avatarUrl = post.authorId === 999 ? `https://picsum.photos/seed/livo/200/200` : `https://picsum.photos/seed/${post.authorId}/200/200`;
                
                const nameClick = isChannel ? `onclick="app.openChannel(${post.channelId})"` : `onclick="app.openProfile(${post.authorId})"`;
                const avatarClick = nameClick;

                let mediaHTML = '';
                if(post.media) {
                    const mediaClass = post.type === 'video' ? 'vid-mode' : 'img-mode';
                    if(post.type === 'video') {
                        mediaHTML = `<div class="pc-media-wrapper ${mediaClass}"><video controls src="${post.media}"></video></div>`;
                    } else {
                        mediaHTML = `<div class="pc-media-wrapper ${mediaClass}"><img src="${post.media}"></div>`;
                    }
                }

                // FOLLOW BUTTON LOGIC FOR FEED
                let followBtnHTML = '';
                if(!isMyPost && !isChannel) { 
                    const isFollowing = DB.currentUser.following && DB.currentUser.following.includes(post.authorId);
                    const btnClass = isFollowing ? "follow-btn-small following" : "follow-btn-small";
                    const btnText = isFollowing ? "Following" : "Follow";
                    followBtnHTML = `<button class="${btnClass}" onclick="event.stopPropagation(); app.toggleFollow(${post.authorId}, false, this)">${btnText}</button>`;
                }

                let optionsMenu = '';
                if(isMyPost) {
                    optionsMenu = `
                        <div class="post-options-btn" onclick="event.stopPropagation(); this.nextElementSibling.classList.toggle('show');">⋮</div>
                        <div class="post-menu" onclick="event.stopPropagation(); this.classList.remove('show');">
                            <div class="pm-item" onclick="app.editPost(${post.id})">Edit Caption</div>
                            <div class="pm-item delete" onclick="app.deletePost(${post.id})">Delete Post</div>
                        </div>
                    `;
                }

                const commentsHTML = post.comments.map(c => `
                    <div class="comment-item">
                        <div style="flex:1;">
                            <div class="comment-author">${c.authorName}</div>
                            <div>${c.text}</div>
                        </div>
                    </div>
                `).join('');

                // Using timeAgo
                const timeString = this.timeAgo(post.timestamp);

                return `
                <div class="post-card" onclick="document.querySelectorAll('.post-menu').forEach(m=>m.classList.remove('show'))">
                    <div class="pc-header">
                        <div class="pc-user-info">
                            <img src="${avatarUrl}" class="pc-avatar" ${avatarClick}>
                            <div class="pc-meta">
                                <div class="pc-top-line">
                                    <div class="pc-name" ${nameClick}>${post.authorName}</div>
                                    ${followBtnHTML}
                                </div>
                                <div class="pc-handle">@${post.authorName.replace(/\s/g,'').toLowerCase()} · ${timeString}</div>
                            </div>
                        </div>
                        ${optionsMenu}
                    </div>
                    
                    <div class="pc-text" onclick="${isChannel ? `app.openChannel(${post.channelId})` : `app.openProfile(${post.authorId})`}">${post.content}</div>
                    ${mediaHTML}
                    
                    <div class="pc-actions">
                        <div class="action-item like" onclick="app.toggleLike(${post.id}, this)">
                            <i style="font-style:normal;">❤️</i> <span>${post.likes}</span>
                        </div>
                        <div class="action-item comment" onclick="document.getElementById('comments-${post.id}').classList.toggle('open')">
                            <i style="font-style:normal;">💬</i> <span>${post.comments.length}</span>
                        </div>
                        <div class="action-item">
                            <i style="font-style:normal;">🔗</i>
                        </div>
                    </div>

                    <div id="comments-${post.id}" class="comments-section">
                        ${commentsHTML}
                        <div class="comment-input-wrapper">
                            <img src="${DB.currentUser.avatar}" class="cp-avatar-sm" style="width:24px;height:24px;">
                            <input type="text" class="comment-input" id="input-${post.id}" placeholder="Write a comment..." onkeydown="if(event.key==='Enter') app.submitComment(${post.id}, 'input-${post.id}')">
                            <button class="comment-btn" onclick="app.submitComment(${post.id}, 'input-${post.id}')">Reply</button>
                        </div>
                    </div>
                </div>
                `;
            },

            openProfile: function(userId) {
                this.state.viewingProfileId = userId; this.state.viewingChannelId = null;
                document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
                document.getElementById('view-profile').classList.add('active');
                const user = DB.users.find(u => u.id == userId); if(!user) return;
                const isMe = user.id === DB.currentUser.id;
                const coverSrc = user.cover || user.avatar; 
                
                let actionBtn = '';
                if(!isMe) {
                    const isFollowing = DB.currentUser.following && DB.currentUser.following.includes(user.id);
                    const btnText = isFollowing ? "Following" : "Follow";
                    actionBtn = `<button class="edit-btn" style="background:white; color:black; border:none;" onclick="app.toggleFollow(${user.id}, false, this)">${btnText}</button>`;
                } else {
                    actionBtn = `<button class="edit-btn profile-edit-btn" onclick="app.openEditProfileModal()">Edit Profile</button>`;
                }

                const headerHTML = `
                    <div class="profile-header">
                        <div class="cover-wrapper">
                            <img src="${coverSrc}" class="cover-pic">
                            ${isMe ? `<input type="file" id="cover-upload" accept="image/*" onchange="app.updateProfileImage('cover', this)" style="display:none"><div class="cover-upload-trigger" onclick="document.getElementById('cover-upload').click()">📷</div>` : ''}
                        </div>
                        <div class="profile-pic-wrapper">
                             <img src="${user.avatar}" class="profile-pic">
                             ${isMe ? `<input type="file" id="avatar-upload" accept="image/*" onchange="app.updateProfileImage('avatar', this)" style="display:none"><div class="avatar-upload-trigger" onclick="document.getElementById('avatar-upload').click()">📷</div>` : ''}
                        </div>
                        <div class="ph-details">
                            <div class="ph-top-row">
                                <div>
                                    <div class="ph-name">${user.username}</div>
                                    <div class="ph-handle">@${user.username.replace(/\s/g,'').toLowerCase()}</div>
                                </div>
                                <div style="display:flex; gap:10px;">${actionBtn}</div>
                            </div>
                            <div class="ph-bio">${user.bio}</div>
                            <div class="ph-meta">
                                <span>📍 ${user.location || 'Earth'}</span>
                                <span>🔗 ${user.website || 'livo.com'}</span>
                            </div>
                        </div>
                    </div>`;
                document.getElementById('profile-header-content').innerHTML = headerHTML;
                
                const postBox = document.getElementById('profile-post-box');
                document.getElementById('profile-avatar').src = user.avatar;
                if(isMe) { postBox.style.display = 'flex'; } else { postBox.style.display = 'none'; }
                
                // Timeline Logic: Only show posts where authorId == userId and not a channel post
                const posts = DB.posts.filter(p => p.authorId == userId && !p.isChannel).sort((a,b) => b.timestamp - a.timestamp);
                const feedHTML = posts.map(p => this.buildPostHTML(p)).join('');
                document.getElementById('profile-feed').innerHTML = feedHTML || "<div style='padding:40px;text-align:center;color:#777'>No posts yet</div>";
            },

            openChannel: function(chanId) {
                this.state.viewingChannelId = chanId; this.state.viewingProfileId = null;
                document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
                document.getElementById('view-channel').classList.add('active');
                const chan = DB.channels.find(c => c.id == chanId); if(!chan) return;
                const isOwner = chan.ownerId === DB.currentUser.id;
                const coverSrc = chan.cover || chan.avatar;

                const headerHTML = `
                    <div class="profile-header">
                        <div class="cover-wrapper">
                             <img src="${coverSrc}" class="cover-pic">
                             ${isOwner ? `<input type="file" id="chan-cover-upload" accept="image/*" onchange="app.updateChannelImage(${chanId}, 'cover', this)" style="display:none"><div class="cover-upload-trigger" onclick="document.getElementById('chan-cover-upload').click()">📷</div>` : ''}
                        </div>
                        <div class="profile-pic-wrapper">
                             <img src="${chan.avatar}" class="profile-pic">
                             ${isOwner ? `<input type="file" id="chan-avatar-upload" accept="image/*" onchange="app.updateChannelImage(${chanId}, 'avatar', this)" style="display:none"><div class="avatar-upload-trigger" onclick="document.getElementById('chan-avatar-upload').click()">📷</div>` : ''}
                        </div>
                        <div class="ph-details">
                            <div class="ph-top-row">
                                <div>
                                    <div class="ph-name">${chan.name} <span class="badge-channel">Channel</span></div>
                                    <div class="ph-handle">@${chan.name.replace(/\s/g,'').toLowerCase()}</div>
                                </div>
                                <div style="display:flex; gap:10px;">
                                    ${isOwner ? `<button class="edit-btn profile-edit-btn">Owner</button>` : `<button class="edit-btn" style="background:white; color:black; border:none;" onclick="app.toggleFollow(${chan.id}, true, this)">Follow</button>`}
                                </div>
                            </div>
                            <div class="ph-bio">${chan.bio}</div>
                        </div>
                    </div>`;
                document.getElementById('channel-header-content').innerHTML = headerHTML;
                
                const postBox = document.getElementById('channel-post-box');
                document.getElementById('channel-avatar').src = chan.avatar;
                if(isOwner) { postBox.style.display = 'flex'; } else { postBox.style.display = 'none'; }
                
                const posts = DB.posts.filter(p => p.channelId == chanId).sort((a,b) => b.timestamp - a.timestamp);
                const feedHTML = posts.map(p => this.buildPostHTML(p)).join('');
                document.getElementById('channel-feed').innerHTML = feedHTML || "<div style='padding:40px;text-align:center;color:#777'>No posts in this channel</div>";
            },

            updateChannelImage: function(chanId, type, input) {
                const file = input.files[0];
                if(!file) return;
                const reader = new FileReader();
                reader.onload = (e) => {
                    const idx = DB.channels.findIndex(c => c.id === chanId);
                    if(idx > -1) {
                        if(type === 'cover') DB.channels[idx].cover = e.target.result;
                        if(type === 'avatar') DB.channels[idx].avatar = e.target.result;
                        this.save();
                        this.openChannel(chanId);
                    }
                    alert(type === 'cover' ? 'Cover Photo Updated!' : 'Logo Updated!');
                };
                reader.readAsDataURL(file);
            },

            renderChannelList: function() {
                const list = document.getElementById('all-channels-list'); list.innerHTML = '';
                DB.channels.forEach(c => {
                    list.innerHTML += `<div class="search-result-item" onclick="app.openChannel(${c.id})"><img src="${c.cover || c.avatar}" class="pc-avatar" style="border-radius:8px;"><div><div style="font-weight:bold;">${c.name} <span class="badge-channel">Channel</span></div><div style="color:var(--text-sec); font-size:13px;">${c.bio.substring(0,40)}...</div></div></div>`;
                });
            },

            openCreateChannel: function() { document.getElementById('modal-create-channel').classList.add('open'); },

            submitCreateChannel: function() {
                const name = document.getElementById('new-chan-name').value;
                const bio = document.getElementById('new-chan-bio').value;
                if(!name) return alert("Name required");
                const newChan = { id: Date.now(), ownerId: DB.currentUser.id, name: name, bio: bio, avatar: `https://picsum.photos/seed/${name}/200/200`, cover: `https://picsum.photos/seed/${name}cover/600/200`, followers: [] };
                DB.channels.push(newChan); this.save(); document.getElementById('modal-create-channel').classList.remove('open'); this.renderChannelList();
            },

            handleSearch: function(query) {
                if(query.length < 2) { if(this.state.currentView === 'search') this.navTo('home'); return; }
                this.state.currentView = 'search';
                document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
                document.getElementById('view-search').classList.add('active');
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                this.renderSearch(query);
            },

            switchSearchTab: function(tab) {
                this.state.searchTab = tab;
                document.querySelectorAll('.s-tab').forEach(el => el.classList.remove('active'));
                event.target.classList.add('active');
                const query = document.querySelector('.search-input').value;
                this.renderSearch(query);
            },

            renderSearch: function(query) {
                const list = document.getElementById('search-results-list'); list.innerHTML = '';
                const q = query.toLowerCase();
                if(this.state.searchTab === 'profiles') {
                    DB.users.filter(u => u.username.toLowerCase().includes(q)).forEach(u => {
                        list.innerHTML += `<div class="search-result-item" onclick="app.openProfile(${u.id})"><img src="${u.avatar}" class="pc-avatar"><div><div style="font-weight:bold;">${u.username}</div><div style="color:#777;">User</div></div></div>`;
                    });
                } else {
                    DB.channels.filter(c => c.name.toLowerCase().includes(q)).forEach(c => {
                        list.innerHTML += `<div class="search-result-item" onclick="app.openChannel(${c.id})"><img src="${c.cover || c.avatar}" class="pc-avatar" style="border-radius:8px;"><div><div style="font-weight:bold;">${c.name}</div><div style="color:#777;">Channel</div></div></div>`;
                    });
                }
            }
        };

        window.onload = () => app.init();
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.menu-btn') && !e.target.closest('.dropdown-menu')) {
                document.getElementById('main-menu').classList.remove('show');
            }
        });
    </script>
</body>
</html>
