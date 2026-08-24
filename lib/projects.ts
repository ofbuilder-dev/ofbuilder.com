export type Review = {
  name: string;
  role?: string;
  rating: number;
  date: string;
  text: string;
};

export type Feature = { icon: string; title: string; body: string };
export type Update = { date: string; title: string; body: string };
export type Shot = { caption: string; tint?: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string[];
  category: string;
  emoji: string;
  accent: string;
  status: "live" | "soon";
  packageId: string;
  playUrl?: string;
  subdomain: string;
  tags: string[];
  rating?: number;
  ratingCount?: string;
  downloads?: string;
  features: Feature[];
  screenshots: Shot[];
  reviews: Review[];
  updates: Update[];
};

export const projects: Project[] = [
  // ── LIVE ────────────────────────────────────────────────────────────────
  {
    slug: "dreamnest",
    name: "DreamNest AI",
    tagline: "Personalized bedtime stories your child will love.",
    description:
      "AI creates custom bedtime stories featuring your child's name, favorite characters, and interests. Unique, calming, and never repeats.",
    longDescription: [
      "DreamNest AI creates personalized AI-generated bedtime stories featuring your child's name, favorite characters, and interests. Each story is unique, calming, and designed to help children fall asleep peacefully.",
      "Every story carries a gentle lesson, ends on a soothing note designed for sleep, and can be narrated aloud with natural text-to-speech. New story every night — never repeats.",
    ],
    category: "Kids & Parenting",
    emoji: "🌙",
    accent: "#8b5cf6",
    status: "live",
    packageId: "com.dreamnest.ai",
    playUrl: "https://play.google.com/store/apps/details?id=com.dreamnest.ai",
    subdomain: "https://dreamnest.ofbuilder.com",
    tags: ["AI", "Storytelling", "Flutter"],
    rating: 4.8,
    ratingCount: "50+",
    downloads: "100+",
    features: [
      { icon: "✨", title: "AI custom stories", body: "Generates a unique story in seconds with your child's name and interests woven in." },
      { icon: "🎙️", title: "Soothing narration", body: "Optional text-to-speech reads each story aloud in a calm, sleep-friendly voice." },
      { icon: "🌱", title: "A lesson every night", body: "Stories quietly teach kindness, courage and calm — never preachy, always age-appropriate." },
      { icon: "📵", title: "Works offline", body: "Stories cache locally so they open instantly, even without a connection." },
    ],
    screenshots: [
      { caption: "Pick a child & feeling" },
      { caption: "A story made just for tonight" },
      { caption: "Listen with gentle narration" },
      { caption: "Your saved story library" },
    ],
    reviews: [
      { name: "Aisha R.", role: "Parent of two", rating: 5, date: "May 2026", text: "My daughter asks for her 'special story' every night now. The emotion picker is genius." },
      { name: "Daniel K.", role: "Dad", rating: 5, date: "Apr 2026", text: "The narration is so calming I sometimes nod off too. Beautiful little app." },
    ],
    updates: [
      { date: "Jun 2026", title: "Production launch 🎉", body: "DreamNest is now live on Google Play." },
      { date: "May 2026", title: "Image caching & offline library", body: "Stories and art now cache locally so favourites open instantly, even offline." },
    ],
  },
  {
    slug: "sleepwise",
    name: "SleepWise: AI Sleep Coach",
    tagline: "Better sleep, scientifically proven.",
    description:
      "CBT-I based AI sleep coach. Personalized sleep plans, relaxation exercises, sleep diary with AI insights. Available in 176 countries.",
    longDescription: [
      "SleepWise is an AI-powered sleep coach that uses Cognitive Behavioral Therapy for Insomnia (CBT-I) techniques to help you fall asleep faster, stay asleep longer, and wake up refreshed.",
      "Track your sleep over time, get AI-personalized bedtime routines, and finally make falling asleep feel effortless. Available in 176 countries.",
    ],
    category: "Health & Fitness",
    emoji: "😴",
    accent: "#6366f1",
    status: "live",
    packageId: "com.sleepwiseai.app",
    playUrl: "https://play.google.com/store/apps/details?id=com.sleepwiseai.app",
    subdomain: "https://sleepwise.ofbuilder.com",
    tags: ["AI", "Wellness", "CBT-I"],
    rating: 4.7,
    ratingCount: "—",
    downloads: "50+",
    features: [
      { icon: "🧠", title: "CBT-I coaching", body: "Evidence-based techniques to tackle the root causes of poor sleep." },
      { icon: "📋", title: "Personalized sleep plan", body: "AI builds a bedtime routine around your schedule and sleep patterns." },
      { icon: "🌬️", title: "Relaxation exercises", body: "Guided breathwork and body-scan sessions to calm your mind." },
      { icon: "📓", title: "Sleep diary + AI insights", body: "Track quality trends and get smart feedback on what's keeping you awake." },
    ],
    screenshots: [
      { caption: "Tonight's routine" },
      { caption: "Guided breathwork" },
      { caption: "Sleep diary" },
      { caption: "Your sleep stats" },
    ],
    reviews: [],
    updates: [
      { date: "Jul 2026", title: "Live in 176 countries", body: "SleepWise is now available on Google Play worldwide." },
    ],
  },
  {
    slug: "ilmai",
    name: "IlmAI: Islamic AI & Quran",
    tagline: "Your AI companion for Islamic knowledge.",
    description:
      "AI-powered Islamic Q&A with Quran and Hadith citations. Available in Bangla, English, and Indonesian.",
    longDescription: [
      "IlmAI is an AI-powered Islamic Q&A app that answers your religious questions using authentic Quran and Hadith sources. Madhab-aware, respectful, and available in Bangla, English, and Indonesian.",
      "Explore the Quran and Hadith directly, dig deeper with follow-up questions, and upgrade to Pro for unlimited, more capable answers.",
    ],
    category: "Lifestyle",
    emoji: "🕌",
    accent: "#14b8a6",
    status: "live",
    packageId: "com.ilmai.islamicqa",
    playUrl: "https://play.google.com/store/apps/details?id=com.ilmai.islamicqa",
    subdomain: "https://ilmai.ofbuilder.com",
    tags: ["AI", "Multilingual", "Islamic"],
    features: [
      { icon: "💬", title: "AI Islamic Q&A", body: "Natural Q&A on faith and practice in Bangla, English, and Indonesian." },
      { icon: "📖", title: "Quran & Hadith explorer", body: "Every answer cites authentic sources from the Quran and Hadith." },
      { icon: "🕋", title: "Madhab-aware", body: "Responses are tailored to recognized schools of Islamic jurisprudence." },
      { icon: "⭐", title: "Pro tier", body: "Unlock unlimited questions and the most capable AI models." },
    ],
    screenshots: [
      { caption: "Ask a question" },
      { caption: "Clear, sourced answers" },
      { caption: "Quran explorer" },
      { caption: "Hadith library" },
    ],
    reviews: [],
    updates: [
      { date: "Jul 2026", title: "Live on Google Play", body: "IlmAI is now available globally with multilingual support." },
    ],
  },
  {
    slug: "passly",
    name: "Driving Theory Test UK: DVSA",
    tagline: "Pass your UK theory test first time.",
    description:
      "1,000+ DVSA-style questions, hazard perception video training, SM-2 spaced repetition, and mock test simulator.",
    longDescription: [
      "Comprehensive UK driving theory test preparation with official DVSA-style questions, hazard perception training, and AI-powered spaced repetition to maximize your chances of passing first time.",
      "No confusing subscriptions — one affordable unlock gets you the whole thing, forever.",
    ],
    category: "Education",
    emoji: "🚗",
    accent: "#ef4444",
    status: "live",
    packageId: "com.drivingtheorytest.uk",
    playUrl: "https://play.google.com/store/apps/details?id=com.drivingtheorytest.uk",
    subdomain: "https://passly.ofbuilder.com",
    tags: ["Education", "Exam Prep", "AI Tutor"],
    features: [
      { icon: "❓", title: "1,000+ practice questions", body: "Full DVSA-style question bank with detailed explanations per answer." },
      { icon: "👀", title: "Hazard perception", body: "Train on video clips with fair, deterministic scoring." },
      { icon: "🔁", title: "SM-2 spaced repetition", body: "Smart algorithm surfaces weak areas to maximize your study efficiency." },
      { icon: "⏱️", title: "Mock test simulator", body: "Timed mock tests that mirror the real exam format exactly." },
    ],
    screenshots: [
      { caption: "Practice questions" },
      { caption: "Hazard perception clips" },
      { caption: "Mock exams" },
      { caption: "Progress by topic" },
    ],
    reviews: [],
    updates: [
      { date: "Jul 2026", title: "Live for 2026 test season", body: "Full 2026 DVSA question bank now available." },
    ],
  },
  {
    slug: "mentalmath",
    name: "Mental Math Master",
    tagline: "Train your brain. Master mental math.",
    description:
      "150+ levels across 4 worlds. Candy Crush-style map, speed run mode, daily rewards, trophies, and a global leaderboard.",
    longDescription: [
      "Mental Math Master is a gamified brain training app with 150+ levels across 4 worlds — from Foundation to Elite. Built with a Candy Crush-style level map, daily rewards, trophies, and a speed run mode.",
      "Train addition, subtraction, multiplication, and division faster than a calculator. Build streaks, earn coins and gems, and climb the global leaderboard.",
    ],
    category: "Education & Games",
    emoji: "🧠",
    accent: "#f59e0b",
    status: "live",
    packageId: "com.thenoob.mental_math_master",
    playUrl: "https://play.google.com/store/apps/details?id=com.thenoob.mental_math_master",
    subdomain: "https://mentalmath.ofbuilder.com",
    tags: ["Education", "Game", "Brain Training"],
    rating: 4.7,
    ratingCount: "—",
    downloads: "100+",
    features: [
      { icon: "🗺️", title: "150+ levels · 4 worlds", body: "Candy Crush-style map from Foundation to Elite — always a next challenge." },
      { icon: "⚡", title: "Speed Run mode", body: "Timed challenges that push your mental arithmetic to the limit." },
      { icon: "🏆", title: "Trophies & leaderboard", body: "Daily rewards, gem shop, and a global leaderboard to compete on." },
      { icon: "🔥", title: "Daily streaks", body: "Build a habit and watch your calculation speed improve week over week." },
    ],
    screenshots: [
      { caption: "Level map" },
      { caption: "Speed Run challenge" },
      { caption: "Trophy room" },
      { caption: "Global leaderboard" },
    ],
    reviews: [
      { name: "Sofia M.", role: "Teacher", rating: 5, date: "May 2026", text: "I recommend this to my students. Short sessions, real improvement." },
      { name: "Raj P.", rating: 5, date: "Apr 2026", text: "Addictive in the best way. My mental math is noticeably faster." },
    ],
    updates: [
      { date: "Jun 2026", title: "2.0 rebuild", body: "Rebuilt from the ground up with 150 levels, candy crush map, and speed run mode." },
    ],
  },
  {
    slug: "renu",
    name: "Renu: Subscription Tracker",
    tagline: "Know exactly what you're paying for every month.",
    description:
      "Track all your subscriptions in one place — no bank linking. Monthly & annual cost summary, renewal reminders, works offline.",
    longDescription: [
      "Renu helps you track all your subscriptions in one place — no bank linking required. See what you're paying monthly and annually, get reminders before renewals, and cancel what you don't use.",
      "Privacy-first, works offline, and takes under a minute to set up.",
    ],
    category: "Finance & Utilities",
    emoji: "🔄",
    accent: "#10b981",
    status: "live",
    packageId: "com.ofbuilder.renu",
    playUrl: "https://play.google.com/store/apps/details?id=com.ofbuilder.renu",
    subdomain: "https://renu.ofbuilder.com",
    tags: ["Finance", "Productivity"],
    features: [
      { icon: "📋", title: "Unlimited subscriptions", body: "Track every service — streaming, SaaS, gym, anything — in one list." },
      { icon: "🔔", title: "Renewal reminders", body: "Get notified before any subscription renews so you're never surprised." },
      { icon: "💰", title: "Monthly + annual totals", body: "See exactly what you're spending per month and per year at a glance." },
      { icon: "🔒", title: "No bank linking", body: "100% privacy-first. Your financial data stays on your device." },
    ],
    screenshots: [
      { caption: "All subscriptions at a glance" },
      { caption: "Add in seconds" },
      { caption: "Monthly cost breakdown" },
      { caption: "Renewal reminders" },
    ],
    reviews: [],
    updates: [
      { date: "Aug 2026", title: "Live on Google Play", body: "Renu is now available. One-time Pro unlock at $2.99." },
    ],
  },

  // ── IN DEVELOPMENT / COMING SOON ────────────────────────────────────────
  {
    slug: "budgetwise",
    name: "BudgetWise: Personal Finance",
    tagline: "Know exactly where your money goes.",
    description:
      "Privacy-first budgeting with no bank linking. Track budget, net worth, debt payoff, bill reminders, and AI spending insights.",
    longDescription: [
      "BudgetWise is a privacy-first personal finance app. No bank linking — ever. Track your budget, net worth, debt payoff, and bill reminders all in one beautiful dark UI.",
      "3x cheaper than Monarch, works offline, ready in 5 minutes. The complete money picture without handing over your bank credentials.",
    ],
    category: "Finance",
    emoji: "💸",
    accent: "#06b6d4",
    status: "soon",
    packageId: "com.xihadulislam.myexpenses",
    subdomain: "https://budgetwise.ofbuilder.com",
    tags: ["Finance", "Privacy-first", "AI"],
    features: [
      { icon: "📊", title: "50/30/20 budget setup", body: "Auto-configure your budget in seconds with the proven 50/30/20 rule." },
      { icon: "🏦", title: "Net worth tracker", body: "Assets vs liabilities — see your real financial picture at a glance." },
      { icon: "❄️", title: "Debt payoff planner", body: "Avalanche and Snowball strategies to become debt-free faster." },
      { icon: "🔒", title: "No bank linking", body: "Total privacy. Everything stays on your device, works 100% offline." },
    ],
    screenshots: [
      { caption: "Budget overview" },
      { caption: "Net worth tracker" },
      { caption: "Debt payoff planner" },
      { caption: "AI spending insights" },
    ],
    reviews: [],
    updates: [
      { date: "Coming soon", title: "In development", body: "BudgetWise v2.0 is in active development as a full rebrand." },
    ],
  },
  {
    slug: "muslimwise",
    name: "Muslim Wise",
    tagline: "Your complete Islamic life companion.",
    description:
      "Premium Islamic app for Gulf Muslims — AI Q&A, Zakat calculator, Halal stock screener, Umrah guide, Islamic finance tools. Arabic-first, zero ads.",
    longDescription: [
      "Muslim Wise is a premium Islamic app built specifically for Gulf Muslims — Saudi Arabia, UAE, Qatar, Kuwait. AI Islamic Q&A, Zakat calculator, Halal stock screener, Islamic finance tools, Umrah guide, and much more.",
      "Arabic-first, privacy-first, zero ads — even on the free tier.",
    ],
    category: "Lifestyle",
    emoji: "🌙",
    accent: "#059669",
    status: "soon",
    packageId: "com.ofbuilder.muslimwise",
    subdomain: "https://muslimwise.ofbuilder.com",
    tags: ["Islamic", "AI", "Arabic", "Finance"],
    features: [
      { icon: "🤖", title: "AI Islamic Q&A", body: "Arabic + English answers grounded in Gulf fatwas and authentic sources." },
      { icon: "💹", title: "Halal stock screener", body: "Screen Tadawul, ADX, and NASDAQ stocks for Shariah compliance." },
      { icon: "🕋", title: "Umrah & Hajj guides", body: "Complete step-by-step guides for Umrah and Hajj preparation." },
      { icon: "📜", title: "Zakat calculator", body: "Calculates Zakat across all asset types with current Nisab values." },
    ],
    screenshots: [
      { caption: "Prayer times + Azan" },
      { caption: "AI Islamic Q&A" },
      { caption: "Halal stock screener" },
      { caption: "Umrah guide" },
    ],
    reviews: [],
    updates: [
      { date: "Coming soon", title: "In development", body: "Muslim Wise is being built for Gulf audiences. Stay tuned." },
    ],
  },
  {
    slug: "lifewise",
    name: "LifeWise: AI Life Coach",
    tagline: "Your personal coach for every area of life.",
    description:
      "AI coaching across Finance, Health, Career, and Relationships. Daily action plan, 100+ book summaries, monthly life score.",
    longDescription: [
      "LifeWise is an AI-powered life coaching app covering all 4 areas of life: Personal Finance, Health & Wellness, Career Growth, and Relationships. Set your priorities and get a personalized daily action plan.",
      "100+ book summaries, daily curated articles, and a monthly life score — all for less than a coffee per week.",
    ],
    category: "Lifestyle",
    emoji: "🌟",
    accent: "#f97316",
    status: "soon",
    packageId: "com.ofbuilder.lifewise",
    subdomain: "https://lifewise.ofbuilder.com",
    tags: ["AI", "Productivity", "Self-improvement"],
    features: [
      { icon: "🎯", title: "4 life categories", body: "Finance, Health, Career, Relationships — AI ranks your priorities daily." },
      { icon: "📅", title: "Daily action plan", body: "5–7 personalized tasks split 60/30/10 across your top priorities." },
      { icon: "📚", title: "100+ book summaries", body: "Key lessons from top self-improvement books, curated and concise." },
      { icon: "📈", title: "Monthly life score", body: "0–100 score with AI review to track your life improvement over time." },
    ],
    screenshots: [
      { caption: "Your daily priorities" },
      { caption: "AI life coach chat" },
      { caption: "Book summary library" },
      { caption: "Monthly life review" },
    ],
    reviews: [],
    updates: [
      { date: "Coming soon", title: "In development", body: "LifeWise is being built for a global launch." },
    ],
  },
  {
    slug: "shishuai",
    name: "ShishuAI: Baby Care",
    tagline: "Smart parenting guidance from day one.",
    description:
      "AI parenting Q&A, WHO growth charts, vaccine tracker, IMCI health triage, prescription scanner, and milestone tracker.",
    longDescription: [
      "ShishuAI is an AI-powered baby care and parenting app for new parents. Prescription scanning, WHO growth charts, vaccine schedule tracker, IMCI health triage, and AI answers to all your parenting questions.",
      "Everything a new parent needs in one calm, trustworthy app.",
    ],
    category: "Parenting & Health",
    emoji: "👶",
    accent: "#ec4899",
    status: "soon",
    packageId: "com.shishuai.app",
    subdomain: "https://shishuai.ofbuilder.com",
    tags: ["AI", "Health", "Parenting"],
    features: [
      { icon: "📷", title: "Prescription scanner", body: "Photo → digital record. Never lose a prescription again." },
      { icon: "📏", title: "WHO growth charts", body: "Track height, weight, and head circumference against official standards." },
      { icon: "💉", title: "Vaccine tracker", body: "Full schedule with reminders so you never miss a dose." },
      { icon: "🏥", title: "IMCI health triage", body: "Evidence-based guidance on when to see a doctor — anytime." },
    ],
    screenshots: [
      { caption: "Ask about your baby" },
      { caption: "WHO growth chart" },
      { caption: "Vaccine schedule" },
      { caption: "Prescription records" },
    ],
    reviews: [],
    updates: [
      { date: "Coming soon", title: "Internal testing", body: "ShishuAI is in internal testing. Public launch coming soon." },
    ],
  },
  {
    slug: "sakinahfit",
    name: "Sakinah Fit",
    tagline: "Fitness designed for your faith.",
    description:
      "AI fitness app for Muslim women — prayer-aware scheduling, modest home workouts, Ramadan program, halal nutrition coaching.",
    longDescription: [
      "Sakinah Fit is an AI-powered fitness app built specifically for Muslim women — respecting modesty, prayer schedules, and Ramadan fasting.",
      "Home workouts, halal nutrition guidance, and fitness coaching that understands your lifestyle.",
    ],
    category: "Health & Fitness",
    emoji: "🌸",
    accent: "#a855f7",
    status: "soon",
    packageId: "com.ofbuilder.sakinahfit",
    subdomain: "https://sakinahfit.ofbuilder.com",
    tags: ["AI", "Fitness", "Islamic", "Women"],
    features: [
      { icon: "🕐", title: "Prayer-aware scheduling", body: "Workouts planned around your prayer times automatically." },
      { icon: "🏠", title: "Modest home workouts", body: "Routines designed for privacy — no gym required." },
      { icon: "🌙", title: "Ramadan program", body: "Fasting-friendly workouts and nutrition guidance for Ramadan." },
      { icon: "🥗", title: "Halal nutrition coach", body: "AI-powered meal guidance focused on halal, wholesome foods." },
    ],
    screenshots: [
      { caption: "Today's workout" },
      { caption: "Prayer-aware schedule" },
      { caption: "Ramadan mode" },
      { caption: "Nutrition guidance" },
    ],
    reviews: [],
    updates: [
      { date: "Coming soon", title: "In development", body: "Sakinah Fit is in active development." },
    ],
  },
  {
    slug: "mindfulmuslim",
    name: "MindfulMuslim",
    tagline: "Find peace through Islamic mindfulness.",
    description:
      "Islamic meditation, Quran recitation for calm, breathing with dhikr, morning/evening adhkar, and Ramadan special programs.",
    longDescription: [
      "MindfulMuslim is an Islamic meditation and mindfulness app. Guided Islamic meditation (Muraqabah), Quran recitation for relaxation, breathing exercises paired with dhikr.",
      "Morning and evening adhkar sessions, sleep stories with Islamic themes, and a dedicated Ramadan program for stress relief and spiritual clarity.",
    ],
    category: "Health & Fitness",
    emoji: "🤲",
    accent: "#0ea5e9",
    status: "soon",
    packageId: "com.ofbuilder.mindfulmuslim",
    subdomain: "https://mindfulmuslim.ofbuilder.com",
    tags: ["Islamic", "Wellness", "Meditation"],
    features: [
      { icon: "🧘", title: "Islamic meditation", body: "Guided Muraqabah sessions for spiritual focus and inner calm." },
      { icon: "📿", title: "Breathing with dhikr", body: "Breathing exercises synchronized with Islamic remembrance." },
      { icon: "🌅", title: "Morning & evening adhkar", body: "Daily adhkar sessions to start and end the day with intention." },
      { icon: "🌙", title: "Ramadan program", body: "Special 30-day program for stress relief and spiritual deepening." },
    ],
    screenshots: [
      { caption: "Today's session" },
      { caption: "Breathing with dhikr" },
      { caption: "Quran recitation" },
      { caption: "Ramadan program" },
    ],
    reviews: [],
    updates: [
      { date: "Planned", title: "In planning", body: "MindfulMuslim is being designed for a global Muslim audience." },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const playDeveloperUrl =
  "https://play.google.com/store/apps/dev?id=8090522541816028633";

export const facebookUrl = "https://www.facebook.com/ofbuilder/";
export const instagramUrl = "https://www.instagram.com/ofbuilder/";
export const linkedinUrl = "https://bd.linkedin.com/company/ofbuilder";
export const youtubeUrl = "https://www.youtube.com/@OfBuilder";
export const tiktokUrl = "https://www.tiktok.com/@ofbuilder";
export const pinterestUrl = "https://www.pinterest.com/ofbuilder/";
export const twitterUrl = "https://x.com/OfBuilderDev";

export const contactEmail = "ofbuilder.apps@gmail.com";
