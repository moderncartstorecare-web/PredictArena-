/* =================================================================
   CricPulse · app.js
   Depends on: supabase.js (window.DB), cdn supabase-js
   ================================================================= */

/* ---------------- ZAPUPI CONFIG ---------------- */
const ZAPUPI_API_KEY = 'zapce570e671e2f07f3bc9837566a44ec4c';
const PRESET_AMOUNTS = [50, 100, 300, 500, 1000];

/* ---------------- ICONS ---------------- */
const P = {
  home:"M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z M9 22V12h6v10",
  crosshair:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  lines:"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  award:"M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z M8.2 13.4 7 22l5-3 5 3-1.2-8.6",
  giftbox:"M20 12v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Zm0 0h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z",
  bell:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0",
  person:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  exit:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  check:"M20 6 9 17l-5-5",
  xmark:"M18 6 6 18 M6 6l12 12",
  clock:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2",
  lock:"M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z M7 11V7a5 5 0 0 1 10 0v4",
  copy:"M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
  moon:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
  sun:"M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  search:"M21 21l-4.3-4.3 M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  chev:"m6 9 6 6 6-6",
  flame:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z",
  star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z",
  shield:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z",
  trend:"M22 7l-8.5 8.5-5-5L2 17 M16 7h6v6",
  grid:"M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  cricket:"M15 3l6 6-9.5 9.5a2.1 2.1 0 0 1-3 0l-3-3a2.1 2.1 0 0 1 0-3zM3 21l3.5-3.5",
  football:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 7l4.3 3.1-1.6 5H9.3l-1.6-5z M12 7V2.5 M16.3 10.1l4.2-1.3 M14.7 15.1l2.6 3.6 M9.3 15.1l-2.6 3.6 M7.7 10.1 3.5 8.8",
  kabaddi:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  rupee:"M6 3h12 M6 8h12 M6 13h9a4 4 0 0 1 0 8h-3l-6 3 M6 13l6 5",
  gamepad:"M6 12h4 M8 10v4 M15 13h.01 M18 11h.01 M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.42.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.55-.6-6.58-.69-7.26A4 4 0 0 0 17.32 5Z",
  question:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01",
  arrowRight:"M5 12h14 M12 5l7 7-7 7",
  arrowLeft:"M19 12H5 M12 19l-7-7 7-7",
  wallet:"M21 12V7H5a2 2 0 0 1 0-4h14v4 M3 5v14a2 2 0 0 0 2 2h16v-5 M18 12a2 2 0 0 0 0 4h4v-4Z",
  arrowDown:"M12 5v14 M19 12l-7 7-7-7",
  arrowUp:"M12 19V5 M5 12l7-7 7 7",
  bank:"M3 21h18 M3 10h18 M5 6l7-3 7 3 M4 10v11 M20 10v11 M8 14v3 M12 14v3 M16 14v3",
  card:"M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z M1 10h22",
  upi:"M7 12l5-5 5 5 M12 7v13",
  doc:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  google:"M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4c-.3 1.5-1.1 2.7-2.4 3.6v3h3.8c2.3-2.1 3.7-5.2 3.7-8.8Z"
};

const svg = (n, s = 16, w = 1.75) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n] || P.crosshair}"/></svg>`;

const googleIcon = () =>
  `<svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>`;

/* ---------------- HELPERS ---------------- */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const inr = n => "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
const inr2 = n => "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------------- STATIC DATA ---------------- */
const CATS = [
  { key:"cricket", label:"Cricket", glyph:"cricket" },
  { key:"football", label:"Football", glyph:"football" },
  { key:"kabaddi", label:"Kabaddi", glyph:"kabaddi" },
  { key:"indian", label:"Indian events", glyph:"rupee" },
  { key:"esports", label:"Esports", glyph:"gamepad" }
];

const MARKETS = [
  { id:1, cat:"cricket", league:"IPL · Match 42", sideA:["MI","Mumbai Indians"], sideB:["CSK","Chennai Super Kings"], closes:1500, crowdA:62, oddsA:1.85, oddsB:2.10 },
  { id:2, cat:"cricket", league:"ODI Series", sideA:["IND","India"], sideB:["AUS","Australia"], closes:5400, crowdA:58, oddsA:1.70, oddsB:2.30 },
  { id:3, cat:"cricket", league:"Women's T20", sideA:["RCB","Bengaluru Royals"], sideB:["DC","Delhi Capitals"], closes:9000, crowdA:49, oddsA:2.05, oddsB:1.90 },
  { id:4, cat:"cricket", league:"Ranji Trophy", sideA:["KAR","Karnataka"], sideB:["TN","Tamil Nadu"], closes:3600, crowdA:44, oddsA:2.15, oddsB:1.80 },
  { id:5, cat:"cricket", league:"T20 League", sideA:["KKR","Kolkata Knight Riders"], sideB:["SRH","Sunrisers Hyderabad"], closes:12000, crowdA:47, oddsA:1.95, oddsB:1.95 },
  { id:6, cat:"cricket", league:"ODI · Day/Night", sideA:["ENG","England"], sideB:["SA","South Africa"], closes:7200, crowdA:55, oddsA:1.75, oddsB:2.20 },
  { id:7, cat:"indian", league:"Entertainment", question:"Will the new film cross ₹300 crore by Sunday?", sideA:["Y","Yes"], sideB:["N","No"], closes:20000, crowdA:51, oddsA:1.90, oddsB:2.00 },
  { id:8, cat:"indian", league:"Economy", question:"Will Sensex close above last week's high?", sideA:["Y","Yes"], sideB:["N","No"], closes:15000, crowdA:46, oddsA:2.10, oddsB:1.85 },
  { id:9, cat:"esports", league:"BGMI Pro Series", sideA:["TSM","Team Soul"], sideB:["GE","Godlike"], closes:6400, crowdA:53, oddsA:1.80, oddsB:2.10 }
];

const REWARD_POOL = [
  ["10%","FreshBite 10% off","FB10-X7Q2","Food delivery"],
  ["₹50","Cinema snack voucher","SNACK50-K9","Entertainment"],
  ["20%","LearnHub course discount","LEARN20-M4","Education"],
  ["Free","1-month reading app trial","READ1M-ZT","Subscriptions"],
  ["15%","TravelNest booking offer","TRIP15-B8","Travel"]
];

const ACHIEVEMENTS = [
  { label:"First prediction", glyph:"crosshair", test:(t,s)=>t.total>=1 },
  { label:"First win", glyph:"award", test:(t)=>t.wins>=1 },
  { label:"3-win streak", glyph:"flame", test:(t,s)=>s.streak_best>=3 },
  { label:"3 coupons won", glyph:"giftbox", test:(t,s,c)=>c.length>=3 },
  { label:"Level 3", glyph:"star", test:(t,s)=>Math.floor(s.xp/100)+1>=3 }
];

const FAQS = [
  ["Is it really free?", "Yes. Every market is free to enter. This demo has no payments."],
  ["Are the rewards real?", "No. Coupons and brands are fictional. Site is for education only."],
  ["How are winners decided?", "When a market closes, the official result is compared with your pick."],
  ["What can I predict?", "Cricket, football, kabaddi, esports — plus Yes/No Indian events."],
  ["Is this gambling?", "No money is staked. No cash prizes. Check local laws before building a real product."],
  ["How does the wallet work?", "The wallet holds rewards. Deposit/withdraw are simulated in this demo."],
  ["Withdrawal limits?", "Min ₹100. Up to 24 hrs in demo."],
  ["Is my data safe?", "Yes — data lives in your own Supabase project with Row-Level Security."]
];

const RAIL = [
  { group:"Predict", items:[["home","Overview","home"],["markets","Markets","crosshair"],["history","My picks","lines"]] },
  { group:"Money", items:[["wallet","Wallet","wallet"],["transactions","Transactions","doc"],["rewards","Coupons","giftbox"]] },
  { group:"More", items:[["ranks","Leaderboard","award"],["alerts","Notifications","bell"],["profile","Profile","person"],["terms","Terms & Help","shield"]] }
];

const PAGE_META = {
  home:["Overview","Your cricket prediction performance at a glance."],
  markets:["Markets","Pick an outcome, add it to your slip, then lock it. Entry is free."],
  history:["My picks","Track pending and settled predictions."],
  wallet:["Wallet","Your balance, deposits and withdrawals."],
  transactions:["Transactions","Every credit and debit on your account."],
  rewards:["Coupons","Claim rewards you have won."],
  ranks:["Leaderboard","See how you rank against other predictors."],
  alerts:["Notifications","Activity on your account."],
  profile:["Profile","Details, preferences and security."],
  terms:["Terms & Help","Platform rules, FAQ and legal information."]
};

const VENUES = ["","Wankhede Stadium, Mumbai","M. Chinnaswamy Stadium, Bengaluru","Arun Jaitley Stadium, Delhi","Eden Gardens, Kolkata","Rajiv Gandhi Stadium, Hyderabad","Narendra Modi Stadium, Ahmedabad","Official box office trackers","Official exchange closing data","Online final, India server"];
const NAMES = ["Rohit Sharma","Virat Kohli","Shubman Gill","KL Rahul","Suryakumar Yadav","Hardik Pandya","Ravindra Jadeja","Jasprit Bumrah"];

/* ---------------- STATE ---------------- */
const state = {
  user: null,
  profile: null,
  route: "home",
  publicRoute: "landing",
  authMode: "signin",
  filterCat: "all",
  search: "",
  slip: {},
  predictions: [],
  coupons: [],
  transactions: [],
  notifications: [],
  leaderboard: [],
  popover: false,
  picksFilter: "all",
  txFilter: "all",
  rankRange: "week",
  loading: false,
  bus: null
};

/* ---------------- AUTH ---------------- */
async function boot() {
  // check session
  const user = await DB.getUser();
  if (user) {
    await loadUserData(user);
  }
  await checkPaymentReturn();
  render();
}

async function loadUserData(user) {
  state.user = { id: user.id, email: user.email, name: user.user_metadata?.display_name || user.email.split("@")[0] };
  try {
    state.loading = true;
    render();
    const [profile, preds, coupons, txns, notifs, lb] = await Promise.all([
      DB.getProfile(user.id),
      DB.getPredictions(user.id),
      DB.getCoupons(user.id),
      DB.getTransactions(user.id),
      DB.getNotifications(user.id),
      DB.getLeaderboard()
    ]);
    state.profile = profile;
    state.predictions = preds;
    state.coupons = coupons;
    state.transactions = txns;
    state.notifications = notifs;
    state.leaderboard = lb;
  } catch (e) {
    console.error(e);
    toast("Failed to load data: " + e.message, "xmark");
  } finally {
    state.loading = false;
    render();
  }
}

async function submitAuth() {
  const signup = state.authMode === "signup";
  const nameEl = $("auth-name");
  const email = $("auth-email").value.trim();
  const password = $("auth-password").value;
  const err = $("auth-error");
  err.textContent = "";

  if (signup && (!nameEl || !nameEl.value.trim())) { err.textContent = "Enter your full name."; return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { err.textContent = "Enter a valid email."; return; }
  if (password.length < 6) { err.textContent = "Password must be at least 6 characters."; return; }

  err.textContent = "Please wait...";
  try {
    if (signup) {
      const { error } = await DB.signUp(email, password, nameEl.value.trim());
      if (error) throw error;
      toast("Account created! Check your email to verify.", "check");
      state.authMode = "signin";
      render();
    } else {
      const { data, error } = await DB.signIn(email, password);
      if (error) throw error;
      await loadUserData(data.user);
    }
  } catch (e) {
    err.textContent = e.message || "Authentication failed.";
  }
}

async function googleLogin() {
  try {
    await DB.signInGoogle();
  } catch (e) {
    toast("Google login failed: " + e.message, "xmark");
  }
}

async function logout() {
  await DB.signOut();
  state.user = null;
  state.profile = null;
  state.predictions = [];
  state.coupons = [];
  state.transactions = [];
  state.notifications = [];
  state.publicRoute = "landing";
  render();
}

/* ---------------- DERIVED ---------------- */
const level = () => Math.floor((state.profile?.xp || 0) / 100) + 1;
const tier = () => level() >= 5 ? "Gold" : level() >= 3 ? "Silver" : "Bronze";
const market = id => MARKETS.find(m => m.id === Number(id));
const titleOf = m => m.question || `${m.sideA[1]} vs ${m.sideB[1]}`;
const catLabel = k => (CATS.find(c => c.key === k) || {}).label || k;

const tally = () => {
  const settled = state.predictions.filter(p => p.result);
  const wins = settled.filter(p => p.result === "win").length;
  return { total: state.predictions.length, settled: settled.length, wins, pct: settled.length ? Math.round(wins / settled.length * 100) : 0 };
};

/* ---------------- LIVE SIM ---------------- */
const LIVE = {};
MARKETS.forEach(m => {
  if (m.cat === "cricket") LIVE[m.id] = { runs: 96 + m.id * 11, wickets: m.id % 4, balls: 72 + m.id * 5, log: ["Match in progress"], target: 180 + m.id * 5 };
  else if (m.cat === "football") LIVE[m.id] = { minute: 18 + m.id * 6, goals: [m.id % 3, (m.id + 1) % 2], log: ["Kick-off"] };
  else if (m.cat === "kabaddi") LIVE[m.id] = { minute: 14, pts: [16, 14], log: ["Match in progress"] };
  else if (m.cat === "esports") LIVE[m.id] = { rounds: [7, 6], log: ["Map 2 in progress"] };
  else LIVE[m.id] = { value: m.id === 7 ? 248.6 : 78420.5, log: ["Tracker started"] };
});
const overs = b => `${Math.floor(b / 6)}.${b % 6}`;

function liveText(m) {
  const L = LIVE[m.id];
  if (m.question) return m.id === 7 ? `Live · ₹${L.value.toFixed(1)} crore so far` : `Live · Sensex ${Math.round(L.value).toLocaleString("en-IN")}`;
  if (m.cat === "cricket") {
    const rr = L.balls ? (L.runs / (L.balls / 6)).toFixed(2) : "0.00";
    return `Live · ${m.sideA[0]} ${L.runs}/${L.wickets} (${overs(L.balls)} ov) · RR ${rr}`;
  }
  if (m.cat === "football") return `Live · ${m.sideA[0]} ${L.goals[0]} – ${L.goals[1]} ${m.sideB[0]}`;
  if (m.cat === "kabaddi") return `Live · ${m.sideA[0]} ${L.pts[0]} – ${L.pts[1]} ${m.sideB[0]}`;
  return `Live · ${m.sideA[0]} ${L.rounds[0]} – ${L.rounds[1]} ${m.sideB[0]}`;
}

function tickLive() {
  MARKETS.forEach(m => {
    const L = LIVE[m.id];
    const r = Math.random();
    if (m.cat === "cricket") {
      if (L.balls >= 119) return;
      const out = [0,0,1,1,1,2,4,4,6,-1][Math.floor(r*10)];
      L.balls++;
      if (out < 0) { if (L.wickets < 9) L.wickets++; L.log.unshift(`${overs(L.balls)} ov: WICKET`); }
      else { L.runs += out; const w = out===4?"FOUR":out===6?"SIX":out?`${out} run${out>1?"s":""}`:"Dot ball"; L.log.unshift(`${overs(L.balls)} ov: ${w}`); }
    } else if (m.cat === "football") {
      if (L.minute >= 90) return;
      L.minute++;
      if (r < 0.05) { const s = Math.random()*100 < m.crowdA ? 0 : 1; L.goals[s]++; L.log.unshift(`${L.minute}' GOAL — ${s?m.sideB[0]:m.sideA[0]}`); }
    } else if (m.cat === "kabaddi") {
      if (L.minute >= 40) return;
      if (r < 0.5) L.minute++;
      const s = r < 0.5 ? 0 : 1; const p = 1 + Math.floor(Math.random()*3);
      L.pts[s] += p; L.log.unshift(`Raid — ${s?m.sideB[0]:m.sideA[0]} +${p}`);
    } else if (m.cat === "esports") {
      if (L.rounds[0] >= 13 || L.rounds[1] >= 13) return;
      const s = r < m.crowdA/100 ? 0 : 1; L.rounds[s]++;
      L.log.unshift(`Round won by ${s?m.sideB[0]:m.sideA[0]}`);
    } else {
      L.value += m.id === 7 ? Math.random() * 1.4 : (Math.random()-0.45) * 45;
      L.log.unshift(`Update — ${m.id===7?`₹${L.value.toFixed(1)} cr`:Math.round(L.value).toLocaleString("en-IN")}`);
    }
    L.log = L.log.slice(0, 5);
  });
  document.querySelectorAll("[data-livetext]").forEach(n => {
    const m = market(n.dataset.livetext); if (m) n.textContent = liveText(m);
  });
}
setInterval(tickLive, 3000);

/* ---------------- COUNTDOWN ---------------- */
const bootedAt = Date.now();
const readable = s => {
  s = Math.max(0, s);
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60;
  return (h?h+"h ":"") + m + "m " + String(sec).padStart(2,"0") + "s";
};
const secsLeft = m => Math.max(0, m.closes - Math.floor((Date.now()-bootedAt)/1000));
setInterval(() => {
  document.querySelectorAll("[data-countdown]").forEach(n => {
    const m = market(n.dataset.countdown); if (m) n.textContent = readable(secsLeft(m));
  });
}, 1000);

/* ---------------- TOAST / MODAL ---------------- */
function toast(msg, glyph = "check") {
  const n = document.createElement("div");
  n.className = "toast";
  n.innerHTML = `${svg(glyph, 14)}<span>${esc(msg)}</span>`;
  $("toasts").appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

function showWithdrawModal() {
  const bal = state.profile?.balance || 0;
  $("modal-layer").innerHTML = `
    <div class="modal-layer" data-dismiss-modal>
      <div class="modal-box">
        <h3 style="font-size:17px;margin-bottom:4px">Withdraw funds</h3>
        <p class="t3 fs12" style="margin-bottom:18px">Available: <b class="mint">${inr2(bal)}</b></p>
        <div class="field"><label>Amount (min ₹100)</label><input class="input" id="wd-amount" type="number" min="100" placeholder="Enter amount"></div>
        <div class="field"><label>Method</label>
          <select class="input" id="wd-method">
            <option value="upi">UPI</option>
            <option value="bank">Bank transfer</option>
          </select>
        </div>
        <div class="field" id="wd-upi-field"><label>UPI ID</label><input class="input" id="wd-upi" placeholder="yourname@upi"></div>
        <div id="wd-bank-fields" style="display:none">
          <div class="field"><label>Account number</label><input class="input" id="wd-acc"></div>
          <div class="field"><label>IFSC</label><input class="input" id="wd-ifsc"></div>
        </div>
        <div class="form-error" id="wd-error"></div>
        <button class="btn btn-accent btn-block" data-submit-withdraw>Withdraw</button>
      </div>
    </div>`;
}

function showDepositModal() {
  $("modal-layer").innerHTML = `
    <div class="modal-layer" data-dismiss-modal>
      <div class="modal-box">
        <h3 style="font-size:17px;margin-bottom:4px">Add funds</h3>
        <p class="t3 fs12" style="margin-bottom:18px">Secure payment powered by ZapUPI.</p>
        
        <div class="field"><label>Select Amount</label>
          <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">
            ${PRESET_AMOUNTS.map(v=>`<button class="chip" data-deposit-amount="${v}">₹${v}</button>`).join("")}
          </div>
          <input class="input" id="dep-amount" type="number" min="50" placeholder="Custom amount (Min ₹50)">
        </div>
        
        <div class="field">
          <label>Payment Method</label>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; margin-bottom:12px;">
            <!-- Paytm -->
            <button class="pay-method-btn" data-method="paytm" style="padding:12px; border:1px solid var(--stroke); border-radius:10px; display:flex; align-items:center; gap:8px; cursor:pointer; background:var(--surface); transition:0.2s;">
              <div style="width:24px; height:24px; background:#00b9f1; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-size:10px;">P</div>
              <span style="font-size:13px; font-weight:600; color:var(--ink);">Paytm</span>
            </button>
            <!-- Google Pay -->
            <button class="pay-method-btn" data-method="gpay" style="padding:12px; border:1px solid var(--stroke); border-radius:10px; display:flex; align-items:center; gap:8px; cursor:pointer; background:var(--surface); transition:0.2s;">
              <div style="width:24px; height:24px; background:#fff; border-radius:4px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:10px; color:#4285F4; box-shadow:0 1px 3px rgba(0,0,0,0.1);">G</div>
              <span style="font-size:13px; font-weight:600; color:var(--ink);">Google Pay</span>
            </button>
            <!-- PhonePe -->
            <button class="pay-method-btn" data-method="phonepe" style="padding:12px; border:1px solid var(--stroke); border-radius:10px; display:flex; align-items:center; gap:8px; cursor:pointer; background:var(--surface); transition:0.2s;">
              <div style="width:24px; height:24px; background:#5f259f; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-size:10px;">P</div>
              <span style="font-size:13px; font-weight:600; color:var(--ink);">PhonePe</span>
            </button>
            <!-- Other UPI -->
            <button class="pay-method-btn" data-method="upi" style="padding:12px; border:1px solid var(--stroke); border-radius:10px; display:flex; align-items:center; gap:8px; cursor:pointer; background:var(--surface); transition:0.2s;">
              <div style="width:24px; height:24px; background:#f1f5f9; border-radius:4px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:10px; color:#64748b;">U</div>
              <span style="font-size:13px; font-weight:600; color:var(--ink);">Other UPI</span>
            </button>
          </div>
          <!-- Hidden input to store the selected method -->
          <input type="hidden" id="dep-method" value="zapupi">
        </div>

        <div style="background:var(--surface-2); padding:10px; border-radius:8px; margin-bottom:14px; display:flex; gap:8px; align-items:center;">
          <span style="color:var(--accent);">${svg("shield",18)}</span>
          <div class="fs12 t3"><b style="color:var(--ink)">Powered by ZapUPI integration</b><br>Secure UPI and card payments.</div>
        </div>

        <div class="form-error" id="dep-error"></div>
        <button class="btn btn-accent btn-block" data-submit-deposit>Continue to pay</button>
        <p class="t3 fs11" style="text-align:center;margin-top:12px">Min deposit ₹50</p>
      </div>
    </div>`;
}

/* ---------------- SHARED FRAGMENTS ---------------- */
const brandMark = `<div class="brand"><span class="brand-mark">${svg("cricket",16,2.2)}</span>CricPulse<small>LIVE</small></div>`;
const faqMarkup = () => FAQS.map(([q,a])=>`<details><summary>${esc(q)}${svg("chev",15)}</summary><p>${esc(a)}</p></details>`).join("");

const notifMarkup = list => list.length
  ? list.map(n => `
      <div class="notif ${n.read ? "" : "unread"}">
        <span class="notif-glyph">${svg(n.glyph||"bell", 14)}</span>
        <div>
          <b>${esc(n.title)}</b>
          <small>${esc(n.body||"")}</small>
          <div class="when">${esc(n.when || new Date(n.created_at).toLocaleDateString("en-IN"))}</div>
        </div>
      </div>`).join("")
  : `<div class="t3 fs13" style="padding:24px;text-align:center">Nothing here yet.</div>`;

const statusTag = p => p.result === "win" ? `<span class="pill mint">Won</span>`
  : p.result === "loss" ? `<span class="pill rose">Lost</span>`
  : `<span class="pill">Pending</span>`;

const chipRow = (attr, cur, items) => `
  <div class="chip-row">
    ${items.map(([k,l]) => `<button class="chip ${cur===k?"on":""}" data-${attr}="${k}">${l}</button>`).join("")}
  </div>`;

const txStatusPill = s => s==="completed" ? `<span class="pill mint">Completed</span>`
  : s==="pending" ? `<span class="pill amber">Pending</span>`
  : `<span class="pill rose">Failed</span>`;
const txTypeLabel = t => ({deposit:"Deposit",withdraw:"Withdrawal",win:"Winnings",reward:"Reward",fee:"Fee",refund:"Refund"}[t]||t);

/* ---------------- PUBLIC VIEWS ---------------- */
function landingView() {
  const categoryCards = CATS.map(c => {
    const count = MARKETS.filter(m => m.cat === c.key).length;
    return `<div class="panel market-card">
      <span class="market-glyph">${svg(c.glyph, 20)}</span>
      <div><b>${c.label}</b><span>${count} open market${count===1?"":"s"}</span></div>
    </div>`;
  }).join("");

  return `
    <header class="public-header">
      ${brandMark}
      <nav>
        <button data-scroll="how">How it works</button>
        <button data-scroll="markets">Markets</button>
        <button data-scroll="wallet-info">Wallet</button>
        <button data-scroll="faq">FAQ</button>
      </nav>
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline" data-auth="signin">Log in</button>
        <button class="btn btn-accent" data-auth="signup">Sign up</button>
      </div>
    </header>
    <div class="container">
      <section class="hero">
        <div>
          <span class="hero-tag">${svg("cricket",13)} Cricket-first prediction platform</span>
          <h1>Call the match. <em>Win real rewards.</em></h1>
          <p>CricPulse is India's free cricket prediction platform. Pick the winner, follow the live action, and climb the leaderboard.</p>
          <div class="hero-actions">
            <button class="btn btn-accent" data-auth="signup">Create free account</button>
            <button class="btn btn-outline" data-auth="signin">I have an account</button>
          </div>
        </div>
        <div class="live-board">
          <div class="live-board-head">
            <span class="caps t3">Live now · IPL Match 42</span>
            <span class="pill live">LIVE</span>
          </div>
          <div class="live-board-body">
            <div class="live-scoreline">
              <div class="live-team"><span>MI</span><b>142/3</b><small>14.2 ov · RR 9.95</small></div>
              <div class="live-sep">vs</div>
              <div class="live-team"><span>CSK</span><b>—</b><small>Yet to bat</small></div>
            </div>
            <div class="live-status">Mumbai Indians batting · Target 186</div>
          </div>
          <div class="live-foot">
            <div><small>Prediction pool</small><b>₹2,84,500</b></div>
            <div><small>Players</small><b>3,248</b></div>
          </div>
        </div>
      </section>
      <section class="section" id="how">
        <div class="section-head"><h2>Three steps to your first win</h2><p>Free to enter. Withdraw anytime above ₹100.</p></div>
        <div class="row-3">
          <div class="panel feature-card"><div class="feature-icon">${svg("crosshair",20)}</div><h3>Choose a market</h3><p>Browse cricket, football, kabaddi and more.</p></div>
          <div class="panel feature-card"><div class="feature-icon">${svg("lock",20)}</div><h3>Lock your pick</h3><p>One side per market. Free entry.</p></div>
          <div class="panel feature-card"><div class="feature-icon">${svg("wallet",20)}</div><h3>Withdraw winnings</h3><p>Correct picks credit your wallet instantly.</p></div>
        </div>
      </section>
      <section class="section" id="markets">
        <div class="section-head"><h2>Markets</h2><p>Five categories refreshed through the day.</p></div>
        <div class="row-3">${categoryCards}</div>
      </section>
      <section class="section" id="wallet-info">
        <div class="section-head"><h2>Your wallet, your control</h2></div>
        <div class="row-3">
          <div class="panel feature-card"><div class="feature-icon">${svg("bank",20)}</div><h3>UPI & bank withdrawals</h3><p>Withdraw to Google Pay, PhonePe, Paytm or any bank. Min ₹100.</p></div>
          <div class="panel feature-card"><div class="feature-icon">${svg("doc",20)}</div><h3>Full history</h3><p>Every deposit, withdrawal and win logged.</p></div>
          <div class="panel feature-card"><div class="feature-icon">${svg("shield",20)}</div><h3>Secure</h3><p>Supabase RLS — you only see your own data.</p></div>
        </div>
      </section>
      <section class="section" id="faq">
        <div class="section-head"><h2>Common questions</h2></div>
        <div style="max-width:680px">${faqMarkup()}</div>
      </section>
    </div>
    <footer class="public-footer">
      <div class="container">
        <div class="cols">
          <div>
            <div class="brand" style="margin-bottom:12px">${brandMark}</div>
            <p>CricPulse is a cricket-first prediction platform demo. No real money, no cash prizes.</p>
          </div>
          <div><h4>Platform</h4>
            <ul>
              <li><button data-scroll="how">How it works</button></li>
              <li><button data-scroll="markets">Markets</button></li>
              <li><button data-scroll="faq">FAQ</button></li>
            </ul>
          </div>
          <div><h4>Legal</h4>
            <ul>
              <li><a href="terms.html">Terms & Conditions</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="refund.html">Refund Policy</a></li>
              <li><a href="responsible.html">Responsible gaming</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top:1px solid var(--stroke);padding-top:20px">© 2024 CricPulse. Education demo only.</div>
      </div>
    </footer>`;
}

function authView() {
  const up = state.authMode === "signup";
  return `
    <header class="public-header">
      ${brandMark}
      <button class="btn btn-outline" data-back-home>Back to site</button>
    </header>
    <div class="auth-view">
      <div class="panel auth-card">
        <h2>${up ? "Create your account" : "Welcome back"}</h2>
        <p class="t3 fs13" style="margin-top:3px">Free to join. No card needed.</p>
        <div class="auth-switch">
          <button class="${up?"":"on"}" data-auth="signin">Log in</button>
          <button class="${up?"on":""}" data-auth="signup">Sign up</button>
        </div>
        ${up ? `<div class="field"><label>Full name</label><input class="input" id="auth-name"></div>` : ""}
        <div class="field"><label>Email</label><input class="input" id="auth-email" type="email"></div>
        <div class="field"><label>Password</label><input class="input" id="auth-password" type="password"></div>
        <div class="form-error" id="auth-error"></div>
        <button class="btn btn-accent btn-block" data-submit-auth>${up?"Create account":"Log in"}</button>
        <div class="auth-divider">OR</div>
        <button class="btn-google" data-google-login>${googleIcon()} Continue with Google</button>
        <div class="auth-terms">By continuing, you agree to the Terms. Demo — no real money.</div>
      </div>
    </div>`;
}

/* ---------------- APP VIEWS ---------------- */
function homeView() {
  const t = tally();
  const unclaimed = state.coupons.filter(c => !c.claimed).length;
  const liveIds = [1,2,5];
  const soon = [...MARKETS].sort((a,b)=>a.closes-b.closes).slice(0,4);

  const perCategory = CATS.map(c => {
    const settled = state.predictions.filter(p => p.result && market(p.market_id)?.cat === c.key);
    const wins = settled.filter(p => p.result === "win").length;
    return { label:c.label, count:settled.length, pct:settled.length?Math.round(wins/settled.length*100):0 };
  });

  return `
    <div class="ribbon">
      <div class="ribbon-cell"><small>Predictions</small><b>${t.total}</b><span>${t.settled} settled</span></div>
      <div class="ribbon-cell"><small>Accuracy</small><b>${t.pct}%</b><span>${t.wins} correct</span></div>
      <div class="ribbon-cell"><small>Streak</small><b>${state.profile?.streak||0}</b><span>Best ${state.profile?.streak_best||0}</span></div>
      <div class="ribbon-cell"><small>Wallet</small><b>${inr(state.profile?.balance||0)}</b><span>${state.coupons.length} coupons</span></div>
    </div>
    <div class="row-2" style="margin-bottom:16px">
      <div class="panel panel-pad">
        <div class="between" style="margin-bottom:6px"><h3>Live cricket</h3><span class="pill live">LIVE</span></div>
        ${liveIds.map(id => {
          const m = market(id);
          return `<div class="detail-line">
            <div>
              <button class="market-name" data-open="${m.id}">${esc(titleOf(m))}</button>
              <div class="market-live" data-livetext="${m.id}">${liveText(m)}</div>
            </div>
            <button class="btn btn-outline btn-sm" data-open="${m.id}">View</button>
          </div>`;
        }).join("")}
      </div>
      <div class="panel panel-pad">
        <div class="between" style="margin-bottom:4px"><h3>Level ${level()} · ${tier()}</h3></div>
        <p class="t3 fs12" style="margin-bottom:12px">${100-((state.profile?.xp||0)%100)} XP to level ${level()+1}</p>
        <div class="track"><span style="width:${(state.profile?.xp||0)%100}%"></span></div>
        <div class="detail-line" style="margin-top:16px"><span class="t2">Total XP</span><b>${state.profile?.xp||0}</b></div>
        <div class="detail-line"><span class="t2">Coupons unclaimed</span><b>${unclaimed}</b></div>
        <div class="detail-line"><span class="t2">Wallet</span><b class="mint">${inr2(state.profile?.balance||0)}</b></div>
      </div>
    </div>
    <div class="row-2">
      <div class="panel panel-pad">
        <h3 style="margin-bottom:10px">Closing soon</h3>
        ${soon.map(m=>`<div class="detail-line">
          <div><button class="market-name" data-open="${m.id}">${esc(titleOf(m))}</button>
          <div class="market-sub">${catLabel(m.cat)} · closes in ${readable(secsLeft(m))}</div></div>
          <button class="btn btn-outline btn-sm" data-jump="${m.cat}">Pick</button>
        </div>`).join("")}
      </div>
      <div class="panel panel-pad">
        <h3 style="margin-bottom:10px">Recent picks</h3>
        ${state.predictions.length
          ? state.predictions.slice(0,5).map(p => {
              const m = market(p.market_id);
              return `<div class="detail-line">
                <div><button class="market-name" data-open="${m.id}">${esc(titleOf(m))}</button>
                <div class="market-sub">Your call: ${esc(m[p.pick][1])}</div></div>
                ${statusTag(p)}
              </div>`;
            }).join("")
          : `<div class="t3 fs13" style="padding:20px 0;text-align:center">No picks yet.</div>`}
      </div>
    </div>
    <div class="panel panel-pad" style="margin-top:16px">
      <h3 style="margin-bottom:14px">Accuracy by category</h3>
      ${perCategory.map(c=>`<div style="margin-bottom:12px">
        <div class="between fs13" style="margin-bottom:5px"><span>${c.label}</span><span class="t3">${c.count?`${c.pct}% of ${c.count}`:"No data"}</span></div>
        <div class="track"><span style="width:${c.pct}%"></span></div>
      </div>`).join("")}
    </div>`;
}

function marketsView() {
  const q = state.search.toLowerCase();
  const shown = MARKETS.filter(m =>
    (state.filterCat === "all" || m.cat === state.filterCat) && titleOf(m).toLowerCase().includes(q)
  );

  const list = shown.length
    ? shown.map(m => {
        const locked = state.predictions.find(p => p.market_id === m.id);
        const chosen = state.slip[m.id];
        return `<div class="market-item">
          <div>
            <button class="market-name" data-open="${m.id}">${esc(titleOf(m))}</button>
            <div class="market-sub">${catLabel(m.cat)} · ${esc(m.league)}</div>
            <div class="market-live" data-livetext="${m.id}">${liveText(m)}</div>
          </div>
          <div class="countdown">${svg("clock",13)}<span data-countdown="${m.id}">${readable(secsLeft(m))}</span></div>
          <div>
            <div class="pick-grid">
              ${["A","B"].map(k => {
                const side = k === "A" ? m.sideA : m.sideB;
                const pct = k === "A" ? m.crowdA : 100 - m.crowdA;
                const odds = k === "A" ? m.oddsA : m.oddsB;
                const active = locked ? locked.pick === k.toLowerCase() : chosen === k.toLowerCase();
                return `<button class="pick ${active?"on":""}" data-pick="${m.id}:${k.toLowerCase()}" ${locked?"disabled":""}>
                  <span>${esc(side[1])}</span>
                  <b>${locked&&active?svg("lock",11):odds.toFixed(2)+"x"}</b>
                </button>`;
              }).join("")}
            </div>
            <div class="split-track"><i style="width:${m.crowdA}%"></i></div>
            <div class="t3 fs11" style="margin-top:4px">Crowd: ${m.crowdA}% / ${100-m.crowdA}%</div>
          </div>
        </div>`;
      }).join("")
    : `<div class="t3 fs13" style="padding:30px;text-align:center">No markets match your search.</div>`;

  const slipIds = Object.keys(state.slip);

  return `
    ${chipRow("cat", state.filterCat, [["all","All"], ...CATS.map(c=>[c.key,c.label])])}
    <div class="search-field">
      ${svg("search",15)}
      <input class="input" id="market-search" placeholder="Search teams or events" value="${esc(state.search)}">
    </div>
    <div class="predict-layout">
      <div class="market-group">${list}</div>
      <div class="panel panel-pad slip">
        <h3 style="margin-bottom:12px">Your slip</h3>
        ${slipIds.length
          ? slipIds.map(id => {
              const m = market(id);
              return `<div class="slip-entry">
                <div><b class="fs13" style="display:block">${esc(titleOf(m))}</b>
                <span class="t3 fs12">Call: ${esc(m[state.slip[id]][1])}</span></div>
                <button class="slip-remove" data-remove="${id}">${svg("xmark",14)}</button>
              </div>`;
            }).join("")
          : `<div class="t3 fs13" style="padding:18px 0;text-align:center">Tap an outcome to add it.</div>`}
        <div class="slip-line"><span class="t2">Entry fee</span><b class="mint">Free</b></div>
        <div class="slip-line"><span class="t2">XP on lock</span><b>+${slipIds.length*10}</b></div>
        <div class="slip-line"><span class="t2">Wallet</span><b>${inr2(state.profile?.balance||0)}</b></div>
        <button class="btn btn-accent btn-block" style="margin-top:10px" data-lock-slip ${slipIds.length?"":"disabled"}>
          ${svg("lock",14)} Lock ${slipIds.length||""} pick${slipIds.length===1?"":"s"}
        </button>
      </div>
    </div>`;
}

function historyView() {
  const filters = [
    ["all",`All (${state.predictions.length})`],
    ["pending",`Pending (${state.predictions.filter(p=>!p.result).length})`],
    ["win",`Won (${state.predictions.filter(p=>p.result==="win").length})`],
    ["loss",`Lost (${state.predictions.filter(p=>p.result==="loss").length})`]
  ];
  const rows = state.predictions.filter(p => state.picksFilter === "all" || (state.picksFilter === "pending" ? !p.result : p.result === state.picksFilter));

  const body = rows.length
    ? `<table>
        <tr><th>Event</th><th>Category</th><th>Call</th><th>Odds</th><th>Status</th><th>Payout</th><th></th></tr>
        ${rows.map(p => {
          const m = market(p.market_id);
          return `<tr>
            <td><button class="market-name" data-open="${m.id}">${esc(titleOf(m))}</button></td>
            <td>${catLabel(m.cat)}</td>
            <td>${esc(m[p.pick][1])}</td>
            <td>${p.odds.toFixed(2)}x</td>
            <td>${statusTag(p)}</td>
            <td>${p.result==="win"?inr(p.payout):"—"}</td>
            <td>${p.result?"":`<button class="btn btn-outline btn-sm" data-settle="${p.id}">Settle</button>`}</td>
          </tr>`;
        }).join("")}
      </table>`
    : `<div class="t3 fs13" style="padding:30px;text-align:center">No picks in this view.</div>`;

  return `${chipRow("picks-filter", state.picksFilter, filters)}<div class="table-shell">${body}</div>`;
}

function walletView() {
  const bal = state.profile?.balance || 0;
  const pending = state.transactions.filter(t => t.type==="withdraw"&&t.status==="pending").reduce((s,t)=>s+t.amount,0);
  const available = bal - pending;
  const totDep = state.transactions.filter(t=>t.type==="deposit"&&t.status==="completed").reduce((s,t)=>s+t.amount,0);
  const totWin = state.transactions.filter(t=>t.type==="win").reduce((s,t)=>s+t.amount,0);
  const totWit = state.transactions.filter(t=>t.type==="withdraw"&&t.status==="completed").reduce((s,t)=>s+t.amount,0);

  return `
    <div class="wallet-hero">
      <div class="wallet-balance">
        <small>Available balance</small>
        <h2>${inr2(available)}</h2>
        <div class="sub">${pending>0?`${inr2(pending)} pending withdrawal`:"No pending withdrawals"}</div>
        <div class="wallet-actions">
          <button class="btn btn-light" data-open-deposit>${svg("arrowDown",14)} Add funds</button>
          <button class="btn btn-light" data-open-withdraw ${available>=100?"":"disabled"}>${svg("arrowUp",14)} Withdraw</button>
        </div>
      </div>
      <div class="wallet-side">
        <div class="wallet-mini"><small>Total deposits</small><b>${inr(totDep)}</b><span>Lifetime</span></div>
        <div class="wallet-mini"><small>Total winnings</small><b class="mint">${inr(totWin)}</b><span>Credited</span></div>
        <div class="wallet-mini"><small>Withdrawn</small><b>${inr(totWit)}</b><span>To bank/UPI</span></div>
      </div>
    </div>
    <div class="panel panel-pad">
      <div class="between" style="margin-bottom:14px">
        <h3>Recent transactions</h3>
        <button class="btn btn-outline btn-sm" data-nav="transactions">View all</button>
      </div>
      ${state.transactions.length
        ? state.transactions.slice(0,6).map(t=>`<div class="detail-line">
            <div><b class="fs13" style="display:block">${txTypeLabel(t.type)}</b>
            <span class="t3 fs12">${esc(t.note||"")} · ${new Date(t.created_at).toLocaleDateString("en-IN")}</span></div>
            <div style="text-align:right">
              <b class="${t.type==="withdraw"||t.type==="fee"?"rose":"mint"}">${t.type==="withdraw"||t.type==="fee"?"−":"+"}${inr2(t.amount)}</b>
              <div style="margin-top:2px">${txStatusPill(t.status)}</div>
            </div>
          </div>`).join("")
        : `<div class="t3 fs13" style="padding:20px 0;text-align:center">No transactions yet.</div>`}
    </div>
    <div class="panel panel-pad" style="margin-top:16px">
      <h3 style="margin-bottom:8px">Withdrawal policy</h3>
      <div class="detail-line"><span class="t2">Minimum</span><b>₹100</b></div>
      <div class="detail-line"><span class="t2">Processing</span><b>Up to 24 hours</b></div>
      <div class="detail-line"><span class="t2">Methods</span><b>UPI · Bank transfer</b></div>
    </div>`;
}

function transactionsView() {
  const filters = [["all","All"],["deposit","Deposits"],["withdraw","Withdrawals"],["win","Winnings"],["reward","Rewards"]];
  const rows = state.transactions.filter(t => state.txFilter === "all" || t.type === state.txFilter);
  const body = rows.length
    ? `<table>
        <tr><th>Date</th><th>Type</th><th>Note</th><th>Amount</th><th>Status</th></tr>
        ${rows.map(t=>`<tr>
          <td class="t3">${new Date(t.created_at).toLocaleDateString("en-IN")}</td>
          <td>${txTypeLabel(t.type)}</td>
          <td class="t3">${esc(t.note||"")}</td>
          <td class="${t.type==="withdraw"||t.type==="fee"?"amount-neg":"amount-pos"}">${t.type==="withdraw"||t.type==="fee"?"−":"+"}${inr2(t.amount)}</td>
          <td>${txStatusPill(t.status)}</td>
        </tr>`).join("")}
      </table>`
    : `<div class="t3 fs13" style="padding:30px;text-align:center">No transactions.</div>`;
  return `${chipRow("tx-filter", state.txFilter, filters)}<div class="table-shell">${body}</div>`;
}

function rewardsView() {
  const unclaimed = state.coupons.filter(c=>!c.claimed).length;
  const claimed = state.coupons.length - unclaimed;
  const mine = state.coupons.length
    ? state.coupons.map((c,i)=>`<div class="coupon-tile ${c.claimed?"":"muted"}">
        <div class="coupon-value">${esc(c.value)}</div>
        <div class="coupon-body">
          <div class="between" style="align-items:flex-start;gap:8px">
            <b class="fs13">${esc(c.title)}</b>
            ${c.claimed?`<span class="pill mint">Claimed</span>`:`<span class="pill amber">Available</span>`}
          </div>
          <div class="t3 fs12" style="margin-top:2px">${esc(c.category||"")}</div>
          ${c.claimed
            ? `<div class="coupon-code"><span>${esc(c.code)}</span>
                <button class="btn btn-outline btn-sm" data-copy="${esc(c.code)}">${svg("copy",12)}Copy</button></div>`
            : `<button class="btn btn-accent btn-sm" style="margin-top:10px" data-claim="${c.id}">${svg("giftbox",13)}Claim</button>`}
        </div>
      </div>`).join("")
    : `<div class="t3 fs13" style="padding:30px;text-align:center;grid-column:1/-1">No coupons yet.</div>`;
  const pool = REWARD_POOL.map(([v,t,,c])=>`<div class="coupon-tile muted">
    <div class="coupon-value">${v}</div>
    <div class="coupon-body"><b class="fs13">${t}</b><div class="t3 fs12" style="margin-top:2px">${c}</div></div>
  </div>`).join("");

  return `
    <div class="ribbon" style="margin-bottom:20px">
      <div class="ribbon-cell"><small>Available</small><b>${unclaimed}</b><span>Unlocked</span></div>
      <div class="ribbon-cell"><small>Claimed</small><b>${claimed}</b><span>Saved</span></div>
      <div class="ribbon-cell"><small>Tier</small><b>${tier()}</b><span>Lvl ${level()}</span></div>
      <div class="ribbon-cell"><small>Wallet</small><b>${inr(state.profile?.balance||0)}</b><span>Winnings</span></div>
    </div>
    <h3 style="margin-bottom:12px">Your coupons</h3>
    <div class="coupon-grid" style="margin-bottom:26px">${mine}</div>
    <h3 style="margin-bottom:12px">Rewards you can win</h3>
    <div class="coupon-grid">${pool}</div>`;
}

function ranksView() {
  const me = state.profile ? { name: state.user.name, xp: state.profile.xp, isMe: true } : null;
  const list = state.leaderboard.map(r => ({ name: r.name, xp: r.xp, isMe: r.id === state.user?.id }));
  if (me && !list.find(x => x.isMe)) list.push(me);
  list.sort((a,b) => b.xp - a.xp);

  return `
    <div class="table-shell">
      <table>
        <tr><th>Rank</th><th>Player</th><th>XP</th></tr>
        ${list.map((r,i)=>`<tr class="${r.isMe?"highlight":""}">
          <td><b>${i+1}</b></td>
          <td>${esc(r.name)}${r.isMe?" (you)":""}</td>
          <td>${r.xp}</td>
        </tr>`).join("")}
      </table>
    </div>`;
}

function alertsView() {
  const unread = state.notifications.filter(n=>!n.read).length;
  return `
    <div class="between" style="margin-bottom:16px">
      <span class="pill ${unread?"amber":"mint"}">${unread} unread</span>
      <button class="btn btn-outline btn-sm" data-read-all>Mark all read</button>
    </div>
    <div class="panel" style="overflow:hidden">${notifMarkup(state.notifications)}</div>`;
}

function profileView() {
  const t = tally();
  const toggles = [
    ["email","Email updates","Weekly summary of your performance."],
    ["results","Result alerts","Notify me when a pick is settled."],
    ["rewards","Reward alerts","Notify me when a coupon unlocks."]
  ];
  const prefs = state.profile?.prefs || {email:1,results:1,rewards:1};

  return `
    <div class="row-2">
      <div>
        <div class="panel panel-pad" style="margin-bottom:16px">
          <h3 style="margin-bottom:14px">Profile</h3>
          <div class="field"><label>Display name</label><input class="input" id="display-name" value="${esc(state.profile?.display_name || state.user.name)}"></div>
          <div class="field"><label>Email</label><input class="input" value="${esc(state.user.email)}" disabled></div>
          <button class="btn btn-accent" data-save-profile>Save changes</button>
        </div>
        <div class="panel panel-pad">
          <h3 style="margin-bottom:14px">Preferences</h3>
          ${toggles.map(([k,l,d])=>`<div class="detail-line">
            <div><b class="fs13" style="display:block">${l}</b><span class="t3 fs12">${d}</span></div>
            <label style="position:relative;width:38px;height:21px;flex:none;display:block">
              <input type="checkbox" data-pref="${k}" ${prefs[k]?"checked":""} style="opacity:0;position:absolute;inset:0;margin:0;z-index:1;cursor:pointer">
              <span style="position:absolute;inset:0;border-radius:11px;background:${prefs[k]?"var(--accent)":"var(--stroke-2)"};transition:background 180ms"></span>
              <span style="position:absolute;left:3px;top:3px;width:15px;height:15px;border-radius:50%;background:#fff;transition:transform 180ms;transform:translateX(${prefs[k]?"16px":"0"})"></span>
            </label>
          </div>`).join("")}
        </div>
      </div>
      <div>
        <div class="panel panel-pad" style="margin-bottom:16px">
          <div class="center gap12" style="margin-bottom:16px">
            <span class="avatar" style="width:48px;height:48px;font-size:18px">${esc(state.user.name[0].toUpperCase())}</span>
            <div><b>${esc(state.user.name)}</b><div class="t3 fs12">Level ${level()} · ${tier()}</div></div>
          </div>
          <div class="detail-line"><span class="t2">Predictions</span><b>${t.total}</b></div>
          <div class="detail-line"><span class="t2">Accuracy</span><b>${t.pct}%</b></div>
          <div class="detail-line"><span class="t2">Coupons</span><b>${state.coupons.length}</b></div>
          <div class="detail-line"><span class="t2">Wallet</span><b class="mint">${inr2(state.profile?.balance||0)}</b></div>
        </div>
        <div class="panel panel-pad" style="margin-bottom:16px">
          <h3 style="margin-bottom:12px">Badges</h3>
          ${ACHIEVEMENTS.map(a => {
            const earned = a.test(t, state.profile||{xp:0,streak_best:0}, state.coupons);
            return `<div class="detail-line" style="opacity:${earned?1:0.45}">
              <div class="center gap10"><span style="color:${earned?"var(--gold)":"var(--ink-3)"}">${svg(a.glyph,17)}</span><span class="fs13">${a.label}</span></div>
              <span class="t3 fs12">${earned?"Earned":"Locked"}</span>
            </div>`;
          }).join("")}
        </div>
        <div class="panel panel-pad">
          <h3 style="margin-bottom:12px">Session</h3>
          <button class="btn btn-outline btn-block" data-logout>${svg("exit",14)}Log out</button>
        </div>
      </div>
    </div>`;
}

function termsView() {
  return `
    <div class="row-2">
      <div class="panel panel-pad">
        <h3 style="margin-bottom:14px">Terms & Conditions</h3>
        <div class="terms-body">
          <h3>1. About this demo</h3>
          <p>CricPulse is an education project. No real money is accepted, held, or paid out.</p>
          <h3>2. Eligibility</h3>
          <p>You must be 18+ to use a real prediction platform. This demo is for education.</p>
          <h3>3. Wallet & payments</h3>
          <ul>
            <li>Deposits and withdrawals are simulated in this demo.</li>
            <li>Minimum withdrawal is ₹100.</li>
            <li>Withdrawals take up to 24 hours in this demo.</li>
          </ul>
          <h3>4. Predictions & rewards</h3>
          <ul>
            <li>Every market is free to enter.</li>
            <li>One prediction per market.</li>
            <li>Correct picks earn XP and may unlock coupons.</li>
            <li>Coupons have no cash value.</li>
          </ul>
          <h3>5. Responsible gaming</h3>
          <p>Prediction platforms can be addictive. Real platforms must provide self-exclusion tools.</p>
          <h3>6. Legal compliance</h3>
          <p>Online gaming laws vary by state in India. Consult a lawyer before building a real product.</p>
          <h3>7. Data & privacy</h3>
          <p>Data is stored in your Supabase project with Row-Level Security. See our Privacy Policy.</p>
          <h3>8. Limitation of liability</h3>
          <p>Provided "as is". Authors are not liable for any loss.</p>
          <h3>9. Contact</h3>
          <p>support@skillclash.in (fictional).</p>
        </div>
      </div>
      <div class="panel panel-pad">
        <h3 style="margin-bottom:4px">FAQ</h3>
        <div style="margin-top:14px">${faqMarkup()}</div>
      </div>
    </div>`;
}

function matchView() {
  const m = market(state.matchId);
  const locked = state.predictions.find(p => p.market_id === m.id);
  const chosen = state.slip[m.id];
  const formA = [0,1,2,3,4].map(i=>(m.id*3+i*5)%7<4?"W":"L");
  const formB = [0,1,2,3,4].map(i=>(m.id*3+i*5+2)%7<4?"W":"L");
  const formStrip = arr => `<div class="form-strip">${arr.map(x=>`<span class="${x.toLowerCase()}">${x}</span>`).join("")}</div>`;

  return `
    <div class="t3 fs12" style="margin-bottom:16px">
      <button class="market-name fs12" style="color:var(--ink-2)" data-nav="markets">Markets</button>
      / ${catLabel(m.cat)} / ${esc(m.league)}
    </div>
    <div class="match-layout">
      <div>
        <div class="score-block" style="margin-bottom:16px">
          <div class="between" style="margin-bottom:8px"><h3>Live score</h3><span class="pill live">LIVE</span></div>
          <div data-livebox="${m.id}">${m.cat==="cricket"?`
            <div class="score-grid">
              <div class="score-team"><b>${esc(m.sideA[1])}</b><span class="num">${LIVE[m.id].runs}/${LIVE[m.id].wickets}</span><small>${overs(LIVE[m.id].balls)} ov</small></div>
              <div class="live-sep">vs</div>
              <div class="score-team"><b>${esc(m.sideB[1])}</b><span class="num">—</span><small>Yet to bat</small></div>
            </div>`:`<div style="padding:20px;text-align:center;color:var(--ink-3)">${liveText(m)}</div>`}
          </div>
        </div>
        <div class="panel panel-pad" style="margin-bottom:16px">
          <h3 style="margin-bottom:4px">Match details</h3>
          <div class="detail-line"><span class="k">Status</span><b>Live</b></div>
          <div class="detail-line"><span class="k">Category</span><b>${catLabel(m.cat)}</b></div>
          <div class="detail-line"><span class="k">Competition</span><b>${esc(m.league)}</b></div>
          <div class="detail-line"><span class="k">${m.question?"Resolution":"Venue"}</span><b>${esc(VENUES[m.id]||"")}</b></div>
          <div class="detail-line"><span class="k">Closes in</span><b data-countdown="${m.id}">${readable(secsLeft(m))}</b></div>
          <div class="detail-line"><span class="k">Entry fee</span><b>Free</b></div>
        </div>
        ${!m.question ? `<div class="panel panel-pad" style="margin-bottom:16px">
          <h3 style="margin-bottom:12px">Team form</h3>
          <div class="detail-line"><span>${esc(m.sideA[1])}</span>${formStrip(formA)}</div>
          <div class="detail-line"><span>${esc(m.sideB[1])}</span>${formStrip(formB)}</div>
        </div>`:""}
      </div>
      <div>
        <div class="panel panel-pad slip">
          <h3 style="margin-bottom:12px">Your call</h3>
          <div class="countdown" style="margin-bottom:14px">${svg("clock",13)} Closes in <span data-countdown="${m.id}">${readable(secsLeft(m))}</span></div>
          ${locked
            ? `<div class="detail-line"><span class="t2">Your pick</span><b>${esc(m[locked.pick][1])}</b></div>
               <div class="detail-line"><span class="t2">Odds</span><b>${locked.odds.toFixed(2)}x</b></div>
               <div class="detail-line"><span class="t2">Status</span>${statusTag(locked)}</div>
               ${locked.result?"":`<button class="btn btn-outline btn-block" style="margin-top:12px" data-settle="${locked.id}">Settle (demo)</button>`}`
            : `<div class="pick-grid" style="margin-bottom:12px">
                 ${["a","b"].map(s=>`<button class="pick ${chosen===s?"on":""}" data-match-pick="${m.id}:${s}">
                   <span>${esc(m[s==="a"?"sideA":"sideB"][1])}</span>
                   <b>${(s==="a"?m.oddsA:m.oddsB).toFixed(2)}x</b>
                 </button>`).join("")}
               </div>
               <div class="slip-line"><span class="t2">Entry fee</span><b class="mint">Free</b></div>
               <div class="slip-line"><span class="t2">If correct</span><b>Coupon + 50 XP</b></div>
               <button class="btn btn-accent btn-block" style="margin-top:12px" data-lock-match="${m.id}" ${chosen?"":"disabled"}>
                 ${svg("lock",14)} Lock pick
               </button>`}
          <div class="split-track" style="margin-top:10px"><i style="width:${m.crowdA}%"></i></div>
          <div class="t3 fs12" style="margin-top:6px">Crowd: ${m.crowdA}% / ${100-m.crowdA}%</div>
        </div>
      </div>
    </div>`;
}

/* ---------------- SHELL ---------------- */
function shellView() {
  const unread = state.notifications.filter(n=>!n.read).length;
  const mobileItems = ["home","markets","history","wallet","profile"];
  const railNav = RAIL.map(g => `
    <div class="rail-group">
      <div class="rail-group-label">${g.group}</div>
      ${g.items.map(([route,label,glyph])=>{
        const active = state.route===route || (state.route==="match"&&route==="markets");
        return `<button class="rail-link ${active?"on":""}" data-nav="${route}">${svg(glyph,16)}${label}</button>`;
      }).join("")}
    </div>`).join("");

  const title = state.route==="match" ? titleOf(market(state.matchId)) : PAGE_META[state.route][0];
  const subtitle = state.route==="match"
    ? `${catLabel(market(state.matchId).cat)} · ${market(state.matchId).league}`
    : PAGE_META[state.route][1];

  let content = "";
  if (state.loading) {
    content = `<div class="loading-block" style="height:300px"></div>`;
  } else {
    switch (state.route) {
      case "home": content = homeView(); break;
      case "markets": content = marketsView(); break;
      case "history": content = historyView(); break;
      case "wallet": content = walletView(); break;
      case "transactions": content = transactionsView(); break;
      case "rewards": content = rewardsView(); break;
      case "ranks": content = ranksView(); break;
      case "alerts": content = alertsView(); break;
      case "profile": content = profileView(); break;
      case "terms": content = termsView(); break;
      case "match": content = matchView(); break;
    }
  }

  const isDark = document.documentElement.dataset.theme==="dark" || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme:dark)").matches);
  const showBack = state.route !== "home";

  return `
    <div class="app-shell">
      <aside class="rail">
        ${brandMark}
        <div class="rail-wallet">
          <small>Wallet</small>
          <b>${inr(state.profile?.balance||0)}</b>
          <button class="btn btn-block" data-open-deposit>${svg("arrowDown",12)} Add funds</button>
        </div>
        ${railNav}
        <div class="rail-foot">Education demo.<br>No real money or prizes.</div>
      </aside>
      <main class="workspace">
        <div class="workspace-head">
          <div style="display:flex;align-items:flex-start;gap:10px">
            ${showBack?`<button class="back-btn" data-back aria-label="Go back">${svg("arrowLeft",16)}</button>`:""}
            <div>
              <h1>${title}</h1>
              <p>${subtitle}</p>
            </div>
          </div>
          <div class="head-tools">
            <button class="tool-btn" data-toggle-theme aria-label="Toggle theme">${svg(isDark?"sun":"moon",16)}</button>
            <div class="pop-wrap">
              <button class="tool-btn" data-toggle-popover aria-label="Notifications">
                ${svg("bell",16)}
                ${unread?`<span class="tool-badge">${unread}</span>`:""}
              </button>
              ${state.popover?`
                <div class="popover">
                  <div class="popover-head"><span class="fs13" style="font-weight:600">Notifications</span><button class="btn btn-outline btn-sm" data-read-all>Mark read</button></div>
                  ${notifMarkup(state.notifications.slice(0,4))}
                  <div style="padding:10px"><button class="btn btn-outline btn-block btn-sm" data-nav="alerts">View all</button></div>
                </div>`:""}
            </div>
            <button class="user-pill" data-nav="profile">
              <span class="avatar">${esc(state.user.name[0].toUpperCase())}</span>
              <span>${esc(state.user.name.split(" ")[0])}</span>
            </button>
          </div>
        </div>
        ${content}
      </main>
    </div>
    <nav class="mobile-nav">
      ${mobileItems.map(route=>{
        const item = RAIL.flatMap(g=>g.items).find(i=>i[0]===route);
        const active = state.route===route || (state.route==="match"&&route==="markets");
        return `<button class="${active?"on":""}" data-nav="${route}">${svg(item[2],18)}${item[1].split(" ")[0]}</button>`;
      }).join("")}
    </nav>`;
}

/* ---------------- RENDER ---------------- */
function render() {
  const root = $("app");
  if (!state.user) {
    root.innerHTML = state.publicRoute === "auth" ? authView() : landingView();
  } else {
    root.innerHTML = shellView();
  }
}

/* ---------------- EVENT DELEGATION ---------------- */
document.addEventListener("click", async ev => {
  const t = ev.target.closest(
    "[data-nav],[data-auth],[data-back-home],[data-submit-auth],[data-scroll]," +
    "[data-toggle-theme],[data-toggle-popover],[data-read-all],[data-pick],[data-remove],[data-lock-slip]," +
    "[data-open],[data-match-pick],[data-lock-match],[data-settle],[data-claim],[data-copy]," +
    "[data-save-profile],[data-logout],[data-cat],[data-back]," +
    "[data-picks-filter],[data-rank-range],[data-pref],[data-jump]," +
    "[data-dismiss-modal],[data-open-deposit],[data-open-withdraw]," +
    "[data-submit-deposit],[data-submit-withdraw],[data-deposit-amount],[data-tx-filter],[data-google-login]"
  );
  if (!t) {
    if (state.popover && !ev.target.closest(".popover") && !ev.target.closest("[data-toggle-popover]")) {
      state.popover = false; render();
    }
    return;
  }
  const d = t.dataset;

  if (d.nav) { state.route = d.nav; state.popover = false; render(); window.scrollTo(0,0); return; }
  if (d.back !== undefined) { state.route = state.route==="match"?"markets":"home"; render(); window.scrollTo(0,0); return; }
  if (d.auth) { state.publicRoute = "auth"; state.authMode = d.auth; render(); return; }
  if (d.backHome !== undefined) { state.publicRoute = "landing"; render(); return; }
  if (d.submitAuth !== undefined) { await submitAuth(); return; }
  if (d.googleLogin !== undefined) { await googleLogin(); return; }
  if (d.scroll) { const n = document.getElementById(d.scroll); if (n) n.scrollIntoView({behavior:"smooth"}); return; }

  if (d.toggleTheme !== undefined) {
    const r = document.documentElement;
    const cur = r.dataset.theme || (matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
    r.dataset.theme = cur === "dark" ? "light" : "dark";
    render();
    return;
  }
  if (d.togglePopover !== undefined) { state.popover = !state.popover; render(); return; }
  if (d.readAll !== undefined) { try { await DB.markAllRead(state.user.id); state.notifications.forEach(n=>n.read=true); render(); } catch(e){toast(e.message,"xmark");} return; }

  if (d.cat) { state.filterCat = d.cat; render(); return; }
  if (d.jump) { state.route = "markets"; state.filterCat = d.jump; render(); return; }
  if (d.pick) {
    const [id, side] = d.pick.split(":");
    if (state.slip[id] === side) delete state.slip[id]; else state.slip[id] = side;
    render(); return;
  }
  if (d.remove) { delete state.slip[d.remove]; render(); return; }

  if (d.lockSlip !== undefined) {
    const ids = Object.keys(state.slip);
    if (!ids.length) return;
    try {
      for (const id of ids) {
        const m = market(id);
        const pick = state.slip[id];
        await DB.placePrediction(Number(id), pick, pick==="a"?m.oddsA:m.oddsB);
      }
      state.slip = {};
      toast(`Locked ${ids.length} pick${ids.length>1?"s":""}. +${ids.length*10} XP`, "lock");
      await loadUserData({ id: state.user.id, email: state.user.email, user_metadata: { display_name: state.user.name } });
    } catch (e) { toast(e.message || "Failed to lock", "xmark"); }
    return;
  }

  if (d.open) { state.route = "match"; state.matchId = Number(d.open); state.popover = false; render(); window.scrollTo(0,0); return; }
  if (d.matchPick) { const [id, side] = d.matchPick.split(":"); state.slip[id] = side; render(); return; }
  if (d.lockMatch) {
    const id = Number(d.lockMatch), side = state.slip[id];
    if (!side) return;
    try {
      const m = market(id);
      await DB.placePrediction(id, side, side==="a"?m.oddsA:m.oddsB);
      delete state.slip[id];
      toast("Pick locked. +10 XP", "lock");
      await loadUserData({ id: state.user.id, email: state.user.email, user_metadata: { display_name: state.user.name } });
    } catch (e) { toast(e.message || "Failed to lock", "xmark"); }
    return;
  }

  if (d.picksFilter) { state.picksFilter = d.picksFilter; render(); return; }
  if (d.settle) {
    const p = state.predictions.find(x => x.id === Number(d.settle));
    if (!p || p.result) return;
    const m = market(p.market_id);
    const win = Math.random()*100 < (p.pick==="a"?m.crowdA:100-m.crowdA);
    try {
      const res = await DB.settlePrediction(p.id, win);
      toast(win ? `Won! ${inr(res.winnings)} credited.` : "Lost — 5 XP earned.", win?"award":"xmark");
      await loadUserData({ id: state.user.id, email: state.user.email, user_metadata: { display_name: state.user.name } });
    } catch (e) { toast(e.message || "Failed to settle", "xmark"); }
    return;
  }

  if (d.claim) {
    try {
      await DB.claimCoupon(Number(d.claim));
      toast("Claimed!", "giftbox");
      await loadUserData({ id: state.user.id, email: state.user.email, user_metadata: { display_name: state.user.name } });
    } catch (e) { toast(e.message || "Failed to claim", "xmark"); }
    return;
  }
  if (d.copy) { try { navigator.clipboard.writeText(d.copy); } catch(_){}; toast(`Code ${d.copy} copied`, "copy"); return; }

  if (d.txFilter) { state.txFilter = d.txFilter; render(); return; }

  if (d.saveProfile !== undefined) {
    const name = $("display-name").value.trim();
    if (!name) { toast("Name cannot be empty.", "xmark"); return; }
    try {
      await DB.updateProfile(state.user.id, { display_name: name });
      state.user.name = name;
      state.profile.display_name = name;
      toast("Profile updated.", "person");
      render();
    } catch (e) { toast(e.message || "Failed to save", "xmark"); }
    return;
  }
  if (d.logout !== undefined) { await logout(); return; }

  if (d.openDeposit !== undefined) { showDepositModal(); return; }
  if (d.openWithdraw !== undefined) {
    if ((state.profile?.balance||0) < 100) { toast("Minimum withdrawal is ₹100.", "xmark"); return; }
    showWithdrawModal(); return;
  }
  if (d.depositAmount) {
    const input = $("dep-amount"); if (input) input.value = d.depositAmount; return;
  }
  
  // ZapUPI Deposit Logic
  if (d.submitDeposit !== undefined) {
    const amount = Number($("dep-amount").value);
    if (!amount || amount < 50) { $("dep-error").textContent = "Minimum deposit is ₹50."; return; }
    
    if (typeof ZapUPI === 'undefined') {
      $("dep-error").textContent = "Payment gateway not loaded. Please refresh.";
      return;
    }

    // Get the selected app (paytm, gpay, phonepe, upi)
    const selectedApp = $("dep-method").value;
    if (!selectedApp) { $("dep-error").textContent = "Please select a payment app."; return; }

    const orderId = 'ORD' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6).toUpperCase();
    const currentUrl = window.location.origin + window.location.pathname;
    
    t.disabled = true;
    t.textContent = 'Opening app...';

    try {
      await DB.client.from('payment_requests').insert({ 
        user_id: state.user.id, 
        txn_id: orderId, 
        amount_inr: amount, 
        status: 'pending' 
      });
    } catch(e) { console.error('Supabase insert failed', e); }

    ZapUPI.createOrder({
      zap_key: ZAPUPI_API_KEY, 
      order_id: orderId, 
      amount: amount.toString(),
      // ZapUPI parameter to force specific app
      preferred_app: selectedApp === 'upi' ? null : selectedApp, 
      success_url: currentUrl + '?status=success&order_id=' + orderId,
      failed_url: currentUrl + '?status=failed&order_id=' + orderId,
      timeout_url: currentUrl + '?status=timeout&order_id=' + orderId,
    }, {
    return;
  }

  if (d.submitWithdraw !== undefined) {
    const amount = Number($("wd-amount").value);
    const method = $("wd-method").value;
    let detail = "";
    if (method === "upi") detail = $("wd-upi").value.trim();
    else { const acc = $("wd-acc").value.trim(); const ifsc = $("wd-ifsc").value.trim(); if (!acc||!ifsc) { $("wd-error").textContent = "Enter account + IFSC."; return; } detail = acc+" / "+ifsc; }
    if (!amount || amount < 100) { $("wd-error").textContent = "Min ₹100."; return; }
    if (!detail) { $("wd-error").textContent = "Enter details."; return; }
    try {
      await DB.withdraw(amount, method, detail);
      $("modal-layer").innerHTML = "";
      toast(`Withdrawal of ${inr2(amount)} requested.`, "bank");
      await loadUserData({ id: state.user.id, email: state.user.email, user_metadata: { display_name: state.user.name } });
    } catch (e) { $("wd-error").textContent = e.message || "Failed"; }
    return;
  }

  if (d.dismissModal !== undefined) { $("modal-layer").innerHTML = ""; return; }
});

document.addEventListener("input", ev => {
  if (ev.target.id === "market-search") { state.search = ev.target.value; render(); }
});

document.addEventListener("change", ev => {
  if (ev.target.dataset.pref) {
    const prefs = { ...(state.profile?.prefs||{}), [ev.target.dataset.pref]: ev.target.checked ? 1 : 0 };
    DB.updateProfile(state.user.id, { prefs }).then(() => {
      state.profile.prefs = prefs;
      render();
    }).catch(e => toast(e.message,"xmark"));
  }
  if (ev.target.id === "wd-method") {
    $("wd-upi-field").style.display = ev.target.value === "upi" ? "block" : "none";
    $("wd-bank-fields").style.display = ev.target.value === "bank" ? "block" : "none";
  }
});

document.addEventListener("click", ev => { if (ev.target.classList.contains("modal-layer")) $("modal-layer").innerHTML = ""; });
document.addEventListener("keydown", ev => { if (ev.key === "Escape") $("modal-layer").innerHTML = ""; });

/* ---------------- ZAPUPI RETURN HANDLER ---------------- */
async function checkPaymentReturn() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  const orderId = params.get('order_id');
  
  if (!orderId) return;

  if (status === 'success') {
    toast("Verifying payment...", "clock");
    
    setTimeout(async () => {
      try {
        const { data } = await DB.client.from('payment_requests')
          .select('*')
          .eq('txn_id', orderId)
          .eq('status', 'pending')
          .maybeSingle();

        if (data) {
          await DB.client.from('payment_requests').update({ status: 'approved' }).eq('txn_id', orderId);
          await DB.deposit(data.amount_inr);
          toast(`Payment successful! ₹${data.amount_inr} added.`, "wallet");
          if (state.user) {
            await loadUserData({ id: state.user.id, email: state.user.email, user_metadata: { display_name: state.user.name } });
          }
        }
      } catch(e) {
        console.error('Payment verification failed', e);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 2000);
    
  } else if (status === 'failed') {
    toast('Payment failed. Please try again.', 'xmark');
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (status === 'timeout') {
    toast('Payment timed out. Please try again.', 'xmark');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}


/* ---------------- PAYMENT METHOD SELECTION LOGIC ---------------- */
document.addEventListener("click", function(e) {
  const btn = e.target.closest(".pay-method-btn");
  if (btn) {
    // Remove active state from all buttons
    document.querySelectorAll(".pay-method-btn").forEach(b => {
      b.style.borderColor = "var(--stroke)";
      b.style.background = "var(--surface)";
    });
    
    // Add active state to clicked button
    btn.style.borderColor = "var(--accent)";
    btn.style.background = "var(--surface-2)";
    
    // Update hidden input value
    const method = btn.dataset.method;
    document.getElementById("dep-method").value = method;
  }
});

/* ---------------- BOOT ---------------- */
DB.onAuthChange(async (_event, session) => {
   
/* ---------------- BOOT ---------------- */
DB.onAuthChange(async (_event, session) => {
  if (session?.user) {
    if (!state.user || state.user.id !== session.user.id) {
      await loadUserData(session.user);
    }
  } else if (state.user) {
    state.user = null; state.profile = null; render();
  }
});

boot();
