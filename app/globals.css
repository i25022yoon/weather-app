@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&display=swap");
@import "tailwindcss";

:root {
  --bg: #0b1018;
  --panel: #111a26;
  --panel-raised: #151f2d;
  --line: rgba(174, 193, 218, .10);
  --text: #edf3fc;
  --muted: #8d9db2;
  --muted-2: #61738a;
  --accent: #82c8ff;
  --accent-strong: #4ca9f4;
  --green: #6ce0b1;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: "DM Sans", "Noto Sans JP", sans-serif;
  -webkit-font-smoothing: antialiased;
}
button, input { font: inherit; }
button { cursor: pointer; }
a { color: inherit; text-decoration: none; }
.weather-app { min-height: 100vh; display: flex; background: radial-gradient(ellipse at 75% -20%, rgba(52, 103, 155, .13), transparent 42%), var(--bg); }
.sidebar {
  width: 248px; flex: 0 0 248px; min-height: 100vh; display: flex; flex-direction: column;
  padding: 30px 17px 18px; border-right: 1px solid var(--line); background: rgba(13, 19, 29, .9);
}
.brand { display: flex; align-items: center; gap: 11px; margin: 1px 0 48px 8px; font-size: 23px; font-weight: 700; letter-spacing: -.9px; }
.brand-mark { width: 35px; height: 35px; display: grid; place-items: center; border-radius: 11px; background: linear-gradient(145deg, #82d2ff, #428ce2); box-shadow: 0 6px 22px #4ca9f42b; }
.brand-mark svg { width: 25px; fill: none; stroke: #102137; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.brand-dot, .page-heading h1 span { color: var(--accent); }
.side-label { color: #607188; font-size: 10px; letter-spacing: 1.8px; font-weight: 700; padding: 0 12px; margin-bottom: 12px; }
.side-nav { display: grid; gap: 6px; }
.nav-item { min-height: 43px; display: flex; align-items: center; gap: 12px; padding: 0 13px; border-radius: 9px; color: #8292a7; font-size: 12px; transition: .2s ease; }
.nav-item > span { font-size: 19px; width: 18px; text-align: center; }
.nav-item:hover, .nav-item.active { color: #dceeff; background: linear-gradient(90deg, rgba(77, 160, 232, .17), rgba(77, 160, 232, .055)); }
.nav-item.active { box-shadow: inset 2px 0 #72c3ff; }
.sidebar-bottom { margin-top: 46px; display: flex; flex-direction: column; flex: 1; }
.saved-city { border: 0; width: 100%; display: flex; align-items: center; gap: 11px; padding: 11px 12px; border-radius: 8px; background: transparent; color: #92a1b4; text-align: left; font-size: 12px; }
.saved-city:hover, .saved-city.selected { background: #172433; color: #e5f3ff; }
.city-pin { font-size: 19px; color: #6ebaf3; }
.city-arrow { margin-left: auto; opacity: 0; color: #77c4ff; }
.saved-city:hover .city-arrow, .saved-city.selected .city-arrow { opacity: 1; }
.sidebar-note { margin-top: auto; margin-bottom: 25px; padding: 17px 16px; border: 1px solid rgba(119, 183, 236, .13); border-radius: 12px; background: linear-gradient(135deg, #15263a, #111b29); }
.note-icon { color: #8bd0ff; font-size: 19px; }
.sidebar-note p { margin: 9px 0 11px; font-size: 14px; font-weight: 600; line-height: 1.8; color: #dceafa; }
.sidebar-note > span:last-child { font-size: 10px; color: #7089a4; }
.profile-row { display: flex; align-items: center; gap: 10px; padding: 16px 5px 0; border-top: 1px solid var(--line); }
.profile-avatar { width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; color: #bce5ff; background: #24415c; font-size: 12px; font-weight: 700; }
.profile-row > div:nth-child(2) { display: grid; gap: 3px; }
.profile-row strong { font-size: 11px; font-weight: 600; }
.profile-row span { color: #71839a; font-size: 9px; }
.profile-menu { margin-left: auto; letter-spacing: 2px; }
.main-panel { flex: 1; min-width: 0; }
.topbar { min-height: 73px; padding: 0 43px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); }
.breadcrumb { display: flex; align-items: center; gap: 12px; color: #708198; font-size: 11px; }
.breadcrumb strong { color: #dce6f3; font-weight: 500; }
.crumb-slash { color: #3b4b5f; }
.topbar-right { display: flex; align-items: center; gap: 22px; }
.live-status { display: flex; align-items: center; gap: 7px; font-size: 9px; letter-spacing: 1.2px; color: #9aacc0; }
.live-dot, .current-live span { width: 6px; height: 6px; border-radius: 50%; background: var(--green); box-shadow: 0 0 9px #6ce0b166; }
.topbar-date { font-size: 11px; color: #8c9cb0; }
.content { max-width: 1450px; padding: 37px 43px 24px; margin: 0 auto; }
.page-heading { display: flex; justify-content: space-between; align-items: end; gap: 20px; }
.eyebrow { display: block; color: #6c819b; font-size: 9px; font-weight: 700; letter-spacing: 1.65px; }
.page-heading h1 { margin: 9px 0 8px; font-size: clamp(26px, 2.5vw, 34px); line-height: 1.2; font-weight: 600; letter-spacing: -1.25px; }
.page-heading p { margin: 0; color: #8394a9; font-size: 12px; }
.location-button { display: flex; align-items: center; gap: 9px; flex-shrink: 0; padding: 11px 15px; border: 1px solid rgba(126, 190, 242, .22); border-radius: 9px; color: #c5e6ff; background: #152537; font-size: 11px; transition: .2s; }
.location-button span { font-size: 17px; }
.location-button:hover { background: #1b3249; border-color: #65baff66; }
.search-row { display: flex; align-items: center; gap: 14px; margin: 28px 0 30px; }
.search-box { position: relative; flex: 1; max-width: 570px; }
.search-box input { width: 100%; height: 45px; padding: 0 44px 0 42px; border: 1px solid #253345; border-radius: 9px; outline: none; background: #111a26; color: #eaf4ff; font-size: 12px; transition: .2s; }
.search-box input::placeholder { color: #62748b; }
.search-box input:focus { border-color: #4a9edb; box-shadow: 0 0 0 3px #4a9edb18; }
.search-icon { position: absolute; z-index: 1; left: 15px; top: 7px; font-size: 26px; line-height: 1; color: #7892ac; }
.search-spinner { position: absolute; right: 15px; top: 15px; width: 15px; height: 15px; border: 2px solid #34495e; border-top-color: #82c8ff; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.search-hint { color: #64758a; font-size: 10px; }
.search-results { position: absolute; z-index: 20; top: calc(100% + 8px); left: 0; right: 0; padding: 5px; border: 1px solid #2b3c50; border-radius: 10px; background: #131f2d; box-shadow: 0 16px 40px #0006; }
.search-result { display: flex; width: 100%; align-items: center; gap: 11px; border: 0; border-radius: 7px; padding: 10px; text-align: left; color: #dce8f5; background: transparent; }
.search-result:hover { background: #203146; }
.result-pin { color: #79c6ff; font-size: 20px; }
.result-name { display: grid; gap: 3px; font-size: 12px; }
.result-name small { color: #8094aa; font-size: 10px; }
.result-arrow { margin-left: auto; color: #7abef1; }
.search-empty { padding: 13px 12px; color: #8b9db2; font-size: 11px; }
.notice, .error-banner { display: flex; align-items: center; gap: 10px; margin: -14px 0 23px; padding: 11px 14px; border-radius: 8px; font-size: 11px; color: #9ecdf1; background: #142437; border: 1px solid #2c4b68; }
.error-banner { color: #ffb9b9; background: #2b1a21; border-color: #64333c; }
.error-banner div { flex: 1; }
.error-banner p { margin: 4px 0 0; color: #d5a2a8; }
.error-banner button { border: 1px solid #75404a; border-radius: 7px; padding: 7px 10px; color: #ffe0e3; background: #42232b; font-size: 10px; }
.section-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.section-title { display: flex; align-items: center; gap: 10px; }
.section-indicator { display: block; width: 3px; height: 18px; border-radius: 4px; background: #70c1ff; }
.section-title h2 { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: -.15px; }
.updated-label { color: #64778e; font-size: 10px; }
.dashboard-grid { display: grid; grid-template-columns: minmax(0, 1.06fr) minmax(0, 1fr); gap: 16px; }
.current-card, .details-card, .forecast-card { position: relative; overflow: hidden; border: 1px solid var(--line); border-radius: 13px; background: linear-gradient(140deg, #141f2d, #111923); }
.current-card { min-height: 294px; padding: 22px 24px 18px; background: radial-gradient(ellipse at 83% 42%, rgba(58, 128, 186, .17), transparent 36%), linear-gradient(130deg, #172738, #121b28 72%); }
.current-card-glow { position: absolute; right: -70px; top: -110px; width: 300px; height: 300px; border-radius: 50%; border: 1px solid #82c8ff0b; box-shadow: 0 0 0 32px #82c8ff05, 0 0 0 66px #82c8ff03; pointer-events: none; }
.current-topline { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; }
.current-label { color: #8196ad; font-size: 9px; letter-spacing: 1.4px; font-weight: 700; }
.current-live { display: flex; align-items: center; gap: 7px; color: #82e4bb; font-size: 9px; letter-spacing: 1px; }
.current-location { display: flex; align-items: center; gap: 10px; margin-top: 24px; position: relative; z-index: 1; }
.location-marker { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid #39526b; border-radius: 10px; color: #8acfff; background: #1d3448; font-size: 22px; }
.current-location h2 { margin: 0 0 3px; font-size: 16px; font-weight: 600; }
.current-location p { margin: 0; color: #8196ac; font-size: 10px; }
.current-main { display: flex; align-items: center; justify-content: space-between; margin: 4px 0 8px; position: relative; z-index: 1; }
.temperature { font-size: clamp(54px, 5.5vw, 75px); line-height: 1.1; font-weight: 500; letter-spacing: -4px; color: #f2f8ff; }
.temperature span { color: #86caff; font-size: .63em; vertical-align: top; margin-left: 3px; }
.condition { margin-top: 1px; color: #d1e7fa; font-size: 13px; }
.feels-line { margin-top: 8px; color: #7f93a9; font-size: 10px; }
.feels-line strong { color: #b9cfe4; font-weight: 500; margin-left: 4px; }
.weather-art { width: 125px; height: 120px; display: grid; place-items: center; position: relative; margin-right: 15px; }
.weather-art > span { position: relative; z-index: 1; font-size: 72px; filter: drop-shadow(0 8px 18px #6fbdfb26); }
.weather-art-halo { position: absolute; width: 94px; height: 94px; border-radius: 50%; background: #8dcfff0b; border: 1px solid #8dcfff15; box-shadow: 0 0 0 16px #8dcfff06; }
.current-divider { height: 1px; background: #d6e8f50e; margin: 17px 0 14px; position: relative; z-index: 1; }
.current-footer { display: flex; flex-wrap: wrap; align-items: center; gap: 17px; color: #8498ae; font-size: 10px; position: relative; z-index: 1; }
.current-footer > span { display: flex; align-items: center; gap: 5px; }
.current-footer strong { color: #d6e7f6; font-weight: 600; }
.mini-icon { color: #80c8ff; font-size: 15px; }
.loading-weather { min-height: 170px; display: flex; align-items: center; justify-content: center; gap: 12px; color: #8ba0b7; font-size: 11px; }
.loading-orb { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #2b4156; border-top-color: #80c8ff; animation: spin .8s linear infinite; }
.empty-weather { padding: 45px 0; color: #8da1b8; font-size: 12px; }
.details-card { min-height: 294px; padding: 22px 23px 18px; }
.card-heading { display: flex; align-items: center; justify-content: space-between; }
.card-heading h2, .forecast-heading h2 { margin: 6px 0 0; font-size: 14px; font-weight: 600; }
.card-heading-icon { display: grid; place-items: center; width: 29px; height: 29px; border: 1px solid #2b3b4d; border-radius: 8px; color: #86c8f7; font-size: 14px; }
.metrics-grid { display: grid; grid-template-columns: 1fr 1fr; margin-top: 17px; }
.metric { padding: 13px 13px 12px 0; min-width: 0; }
.metric:nth-child(odd) { border-right: 1px solid var(--line); }
.metric:nth-child(even) { padding-left: 17px; }
.metric:nth-child(n+3) { border-top: 1px solid var(--line); }
.metric-top { display: flex; align-items: center; gap: 8px; }
.metric-icon { display: grid; place-items: center; width: 25px; height: 25px; border-radius: 7px; font-size: 17px; }
.metric-icon.humidity { color: #8bd1ff; background: #24425a; }
.metric-icon.wind { color: #8be0ca; background: #1c3d3b; }
.metric-icon.feels { color: #ffc68d; background: #483628; }
.metric-icon.rain { color: #c0b3ff; background: #332d51; }
.metric-label { color: #8a9cb1; font-size: 10px; }
.metric-value { margin-top: 9px; color: #e7f1fb; font-size: 24px; line-height: 1.1; font-weight: 500; letter-spacing: -.7px; }
.metric-value small { color: #8da2b8; font-size: 10px; letter-spacing: 0; }
.metric-foot { margin-top: 5px; color: #647990; font-size: 9px; }
.metric-bar { height: 3px; overflow: hidden; margin-top: 10px; border-radius: 5px; background: #273444; }
.metric-bar span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #438dc8, #83d4ff); }
.detail-loading, .forecast-loading { padding: 30px 0; color: #8194aa; font-size: 11px; }
.forecast-card { margin-top: 17px; padding: 21px 23px 19px; }
.forecast-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 19px; }
.forecast-badge { display: flex; align-items: center; gap: 9px; border: 1px solid #2b3b4d; border-radius: 6px; padding: 7px 9px; color: #8097af; font-size: 9px; letter-spacing: 1px; }
.forecast-badge span { color: #80c8ff; font-size: 12px; }
.hourly-scroll { overflow-x: auto; scrollbar-width: thin; scrollbar-color: #304358 transparent; }
.hourly-list { min-width: 600px; display: grid; grid-template-columns: repeat(12, minmax(44px, 1fr)); }
.hour-item { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 10px 4px 5px; border-right: 1px solid #ffffff08; }
.hour-item:last-child { border-right: 0; }
.hour-now { background: linear-gradient(180deg, #1d3449, #1d344900); border-radius: 8px; }
.hour-time { white-space: nowrap; color: #8195ab; font-size: 9px; }
.hour-now .hour-time { color: #b8e1ff; }
.hour-icon { height: 27px; display: grid; place-items: center; font-size: 23px; }
.hour-temp { font-size: 14px; font-weight: 600; color: #e0ebf7; }
.hour-rain { color: #79bdf1; font-size: 9px; }
.hour-rain span { font-size: 12px; }
.weekly-card { margin-top: 17px; }
.weekly-list { display: grid; }
.week-row { display: grid; grid-template-columns: 1fr 1.3fr .55fr 35px minmax(60px, .9fr) 35px; align-items: center; gap: 12px; padding: 12px 4px; border-top: 1px solid var(--line); }
.week-day { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.week-day strong { font-size: 11px; font-weight: 600; white-space: nowrap; }
.week-day > span { color: #6e8298; font-size: 9px; }
.week-condition { display: flex; align-items: center; gap: 9px; color: #93a5b9; font-size: 10px; }
.week-icon { width: 25px; text-align: center; font-size: 19px; }
.week-rain { color: #75b8ed; font-size: 10px; white-space: nowrap; }
.week-rain span { font-size: 13px; }
.week-min, .week-max { color: #9aabbd; text-align: right; font-size: 11px; font-weight: 500; }
.week-max { color: #e5eff9; }
.temp-range { height: 4px; border-radius: 10px; background: #293747; overflow: hidden; }
.temp-range span { display: block; height: 100%; min-width: 7px; border-radius: 10px; background: linear-gradient(90deg, #6e9fe3, #f4bd78); }
.week-today .week-day strong { color: #9dd5ff; }
.page-footer { display: flex; justify-content: space-between; gap: 15px; padding: 22px 1px 3px; color: #52647a; font-size: 9px; letter-spacing: .6px; }
.footer-dot { margin: 0 6px; color: #70c1ff; font-size: 6px; vertical-align: middle; }
.page-footer a { color: #8ebee2; }
.page-footer a:hover { color: #d4edff; }

@media (min-width: 1500px) {
  .content { padding-top: 45px; }
  .dashboard-grid { gap: 19px; }
  .current-card, .details-card { min-height: 310px; }
  .forecast-card { margin-top: 19px; }
}
@media (max-width: 1100px) {
  .sidebar { width: 210px; flex-basis: 210px; padding-left: 12px; padding-right: 12px; }
  .topbar { padding: 0 27px; }
  .content { padding: 30px 27px 22px; }
  .dashboard-grid { grid-template-columns: 1fr; }
  .current-card, .details-card { min-height: auto; }
  .weather-art { margin-right: 35px; }
}
@media (max-width: 760px) {
  .weather-app { display: block; }
  .sidebar { width: 100%; min-height: 0; height: auto; padding: 15px 18px; border-right: 0; border-bottom: 1px solid var(--line); }
  .brand { margin: 0; font-size: 20px; }
  .brand-mark { width: 31px; height: 31px; }
  .side-label, .side-nav, .sidebar-bottom { display: none; }
  .topbar { min-height: 56px; padding: 0 18px; }
  .breadcrumb { font-size: 10px; gap: 8px; }
  .topbar-right { gap: 10px; }
  .live-status { font-size: 8px; }
  .topbar-date { display: none; }
  .content { padding: 27px 17px 20px; }
  .page-heading { align-items: start; flex-direction: column; gap: 17px; }
  .page-heading h1 { font-size: 29px; }
  .location-button { padding: 9px 12px; }
  .search-row { display: block; margin: 22px 0 25px; }
  .search-box { max-width: none; }
  .search-hint { display: block; margin: 8px 2px 0; }
  .section-title-row { margin-bottom: 11px; }
  .current-card { padding: 19px 17px 15px; }
  .current-location { margin-top: 20px; }
  .temperature { font-size: 65px; }
  .weather-art { width: 92px; height: 95px; margin-right: 0; }
  .weather-art > span { font-size: 57px; }
  .weather-art-halo { width: 70px; height: 70px; }
  .current-footer { gap: 11px; font-size: 9px; }
  .details-card, .forecast-card { padding: 18px 16px; }
  .weekly-card { padding-bottom: 13px; }
  .week-row { grid-template-columns: minmax(58px, .8fr) minmax(86px, 1fr) 32px 28px minmax(35px, .6fr) 28px; gap: 6px; padding: 13px 0; }
  .week-day { display: grid; gap: 4px; }
  .week-day strong { font-size: 10px; }
  .week-day > span { font-size: 8px; }
  .week-condition { gap: 4px; font-size: 9px; }
  .week-icon { width: 20px; font-size: 17px; }
  .week-rain { font-size: 9px; }
  .week-min, .week-max { font-size: 10px; }
  .page-footer { font-size: 8px; flex-direction: column; gap: 8px; }
}
@media (max-width: 390px) {
  .live-status { display: none; }
  .breadcrumb { gap: 6px; }
  .page-heading h1 { font-size: 26px; }
  .temperature { font-size: 56px; }
  .weather-art { width: 75px; }
  .current-footer { gap: 8px; }
  .metric-value { font-size: 21px; }
  .week-row { grid-template-columns: 48px minmax(78px, 1fr) 27px 23px minmax(24px, .5fr) 24px; gap: 4px; }
  .week-condition { font-size: 8px; }
}
