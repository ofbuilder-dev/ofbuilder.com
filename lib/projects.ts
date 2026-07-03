// NOTE: `reviews`, `rating`, `ratingCount`, and `downloads` below are placeholder
// sample content for layout. Replace with real Play Store data before launch.

export type Review = {
  name: string;
  role?: string;
  rating: number; // 1–5
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
  description: string; // short, for cards
  longDescription: string[]; // paragraphs, for detail page
  category: string;
  emoji: string;
  accent: string;
  status: "live" | "soon";
  packageId: string;
  playUrl?: string;
  subdomain: string;
  tags: string[];
  // detail-page content
  rating?: number;
  ratingCount?: string;
  downloads?: string;
  features: Feature[];
  screenshots: Shot[];
  reviews: Review[];
  updates: Update[];
};

export const projects: Project[] = [
  {
    slug: "dreamnest",
    name: "DreamNest AI",
    tagline: "Bedtime stories that help children grow.",
    description:
      "Emotion-based, AI-personalized bedtime stories. Parents pick a child's context and feeling, and DreamNest delivers a calming, lesson-based story with optional narration.",
    longDescription: [
      "DreamNest turns bedtime into a moment that actually helps your child grow. Instead of generic stories, you tell DreamNest a little about your child — their name, age, and what they're feeling tonight — and it crafts a calming, age-appropriate story built around that exact emotion.",
      "Every story carries a gentle lesson, ends on a soothing note designed for sleep, and can be narrated aloud with natural text-to-speech. It's the bedtime helper for parents who want screen time to mean something.",
    ],
    category: "Kids & Family",
    emoji: "🌙",
    accent: "#8b5cf6",
    status: "live",
    packageId: "com.dreamnest.ai",
    playUrl: "https://play.google.com/store/apps/details?id=com.dreamnest.ai",
    subdomain: "https://dreamnest.ofbuilder.com",
    tags: ["AI", "Storytelling", "Flutter"],
    rating: 4.8,
    ratingCount: "Open testing",
    downloads: "50+",
    features: [
      {
        icon: "💜",
        title: "Emotion-based stories",
        body: "Pick what your child is feeling — worried, excited, sad — and get a story tuned to help them process it.",
      },
      {
        icon: "🎙️",
        title: "Soothing narration",
        body: "Optional language-aware text-to-speech reads each story aloud in a calm, sleep-friendly voice.",
      },
      {
        icon: "🌱",
        title: "A lesson every night",
        body: "Stories quietly teach kindness, courage and calm — never preachy, always age-appropriate.",
      },
      {
        icon: "👨‍👩‍👧",
        title: "Made for the whole family",
        body: "Save favourites, build a library, and personalize for each child by name and age.",
      },
    ],
    screenshots: [
      { caption: "Pick a child & feeling" },
      { caption: "A story made just for tonight" },
      { caption: "Listen with gentle narration" },
      { caption: "Your saved story library" },
    ],
    reviews: [
      {
        name: "Aisha R.",
        role: "Parent of two",
        rating: 5,
        date: "May 2026",
        text: "My daughter asks for her 'special story' every night now. The emotion picker is genius — it actually helped on a really anxious evening.",
      },
      {
        name: "Daniel K.",
        role: "Dad",
        rating: 5,
        date: "Apr 2026",
        text: "The narration is so calming I sometimes nod off too. Beautiful little app.",
      },
      {
        name: "Priya S.",
        rating: 4,
        date: "Apr 2026",
        text: "Love the concept and the stories are sweet. Would love even more language options.",
      },
    ],
    updates: [
      {
        date: "Jun 2026",
        title: "Production launch 🎉",
        body: "DreamNest is now live on Google Play after a successful 14-day open testing period.",
      },
      {
        date: "May 2026",
        title: "Image caching & offline library",
        body: "Stories and art now cache locally so favourites open instantly, even offline.",
      },
    ],
  },
  {
    slug: "myexpenses",
    name: "My Expenses",
    tagline: "Track spending. Plan budgets. Stay in control.",
    description:
      "A fast, no-friction expense tracker for everyday money. Log expenses, set budgets, and see where your money actually goes.",
    longDescription: [
      "My Expenses is built for one thing: knowing where your money goes without the spreadsheet headache. Log an expense in seconds, organize by category, and watch clean charts turn your spending into something you can actually act on.",
      "Set monthly budgets, track them in real time, and catch overspending before it happens — all in a fast, private, offline-first app.",
    ],
    category: "Finance",
    emoji: "💸",
    accent: "#10b981",
    status: "live",
    packageId: "com.xihadulislam.myexpenses",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.xihadulislam.myexpenses",
    subdomain: "https://myexpenses.ofbuilder.com",
    tags: ["Productivity", "Budgeting"],
    rating: 4.6,
    ratingCount: "—",
    downloads: "50+",
    features: [
      {
        icon: "⚡",
        title: "Log in seconds",
        body: "Add an expense with amount, category and note in just a couple of taps.",
      },
      {
        icon: "📊",
        title: "Clear insights",
        body: "Visual breakdowns show exactly where your money goes each month.",
      },
      {
        icon: "🎯",
        title: "Budgets that work",
        body: "Set category budgets and get a live view of how much room is left.",
      },
      {
        icon: "🔒",
        title: "Private by default",
        body: "Your financial data stays on your device — no account required.",
      },
    ],
    screenshots: [
      { caption: "Your spending at a glance" },
      { caption: "Add an expense fast" },
      { caption: "Category breakdown" },
      { caption: "Budgets & limits" },
    ],
    reviews: [
      {
        name: "Marcus T.",
        rating: 5,
        date: "Mar 2026",
        text: "Finally an expense tracker that doesn't try to do a hundred things. Simple and fast.",
      },
      {
        name: "Lena O.",
        role: "Student",
        rating: 4,
        date: "Feb 2026",
        text: "The budget view keeps me honest. Wish it had a desktop version too.",
      },
    ],
    updates: [
      {
        date: "Apr 2026",
        title: "Budget improvements",
        body: "Added per-category budgets and a cleaner monthly summary.",
      },
    ],
  },
  {
    slug: "mentalmath",
    name: "Mental Math Master",
    tagline: "Train your brain with daily math challenges.",
    description:
      "Sharpen mental arithmetic with timed drills and progressive difficulty. A clean, game-like way to get faster at math.",
    longDescription: [
      "Mental Math Master is a daily workout for your brain. Quick, timed drills push you to calculate faster, while difficulty ramps up as you improve — so it always feels challenging but never impossible.",
      "Track your streaks, beat your best times, and turn mental math from a chore into a game you actually want to come back to.",
    ],
    category: "Education & Games",
    emoji: "🧠",
    accent: "#f59e0b",
    status: "live",
    packageId: "com.thenoob.mental_math_master",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.thenoob.mental_math_master",
    subdomain: "https://mentalmath.ofbuilder.com",
    tags: ["Education", "Game", "Flutter"],
    rating: 4.7,
    ratingCount: "—",
    downloads: "100+",
    features: [
      {
        icon: "⏱️",
        title: "Timed drills",
        body: "Beat the clock with rapid-fire arithmetic that sharpens your speed.",
      },
      {
        icon: "📈",
        title: "Adaptive difficulty",
        body: "The challenge scales with your skill, so you're always improving.",
      },
      {
        icon: "🔥",
        title: "Streaks & stats",
        body: "Build a daily habit and watch your best times drop over time.",
      },
      {
        icon: "🎮",
        title: "Game-like feel",
        body: "Clean, satisfying gameplay that makes practice genuinely fun.",
      },
    ],
    screenshots: [
      { caption: "Daily challenge" },
      { caption: "Race the clock" },
      { caption: "Track your progress" },
      { caption: "Beat your best" },
    ],
    reviews: [
      {
        name: "Sofia M.",
        role: "Teacher",
        rating: 5,
        date: "May 2026",
        text: "I recommend this to my students. Short sessions, real improvement.",
      },
      {
        name: "Raj P.",
        rating: 5,
        date: "Apr 2026",
        text: "Addictive in the best way. My mental math is noticeably faster.",
      },
      {
        name: "Tom B.",
        rating: 4,
        date: "Mar 2026",
        text: "Great drills. Would love a multiplayer mode.",
      },
    ],
    updates: [
      {
        date: "Jun 2026",
        title: "2.0 rebuild",
        body: "Rebuilt from the ground up with smoother gameplay and new stats.",
      },
    ],
  },
  {
    slug: "ilmai",
    name: "IlmAI",
    tagline: "Trusted Islamic answers, instantly.",
    description:
      "AI-powered Islamic Q&A with a Quran and Hadith explorer. Ask questions in multiple languages and get clear, respectful, sourced answers.",
    longDescription: [
      "IlmAI is a respectful, AI-powered companion for everyday Islamic questions. Ask anything — from prayer and fasting to daily etiquette — and get a clear, considerate answer in your language, grounded in the Quran and Hadith.",
      "Explore the Quran and Hadith directly, dig deeper with follow-up questions, and upgrade to Pro for unlimited, more capable answers.",
    ],
    category: "Lifestyle",
    emoji: "🕌",
    accent: "#14b8a6",
    status: "live",
    packageId: "com.ilmai.islamicqa",
    playUrl: "https://play.google.com/store/apps/details?id=com.ilmai.islamicqa",
    subdomain: "https://ilmai.ofbuilder.com",
    tags: ["AI", "Multilingual"],
    features: [
      {
        icon: "💬",
        title: "Ask anything",
        body: "Natural Q&A on faith and practice, answered clearly and respectfully.",
      },
      {
        icon: "📖",
        title: "Quran & Hadith explorer",
        body: "Browse and search source texts right inside the app.",
      },
      {
        icon: "🌍",
        title: "Multilingual",
        body: "Ask and read answers in multiple languages.",
      },
      {
        icon: "⭐",
        title: "Pro tier",
        body: "Unlock unlimited questions and the most capable AI models.",
      },
    ],
    screenshots: [
      { caption: "Ask a question" },
      { caption: "Clear, sourced answers" },
      { caption: "Quran explorer" },
      { caption: "Hadith library" },
    ],
    reviews: [],
    updates: [
      {
        date: "Coming soon",
        title: "In development",
        body: "IlmAI is being polished for its first Play Store release. Stay tuned.",
      },
    ],
  },
  {
    slug: "nurseup",
    name: "NurseUp",
    tagline: "The all-in-one study companion for nursing students.",
    description:
      "Flashcard decks, clinical simulators (pain scales, vitals, GCS, PQRSTU), and an AI tutor — built for Canadian nursing students.",
    longDescription: [
      "NurseUp is the study companion built specifically for nursing students. Master the fundamentals with 17 chapters of flashcards and summaries, then practice the skills that matter with interactive clinical simulators — pain scales, vital signs, GCS, PQRSTU and full clinical scenarios.",
      "Stuck on a concept? The built-in AI tutor explains anything on demand, so you always have a study buddy at 2am before an exam.",
    ],
    category: "Education",
    emoji: "🩺",
    accent: "#3b82f6",
    status: "soon",
    packageId: "com.nurseup.app",
    subdomain: "https://nurseup.ofbuilder.com",
    tags: ["AI Tutor", "Healthcare", "Flutter"],
    features: [
      {
        icon: "🃏",
        title: "Study mode",
        body: "17 chapters of flashcard decks and concise chapter summaries.",
      },
      {
        icon: "🧪",
        title: "Clinical simulators",
        body: "Practice pain scales, vitals, GCS, PQRSTU and clinical scenarios.",
      },
      {
        icon: "🤖",
        title: "AI tutor",
        body: "Ask any nursing question and get a clear, instant explanation.",
      },
      {
        icon: "🍁",
        title: "Built for Canadian students",
        body: "Content tailored to the Canadian nursing curriculum.",
      },
    ],
    screenshots: [
      { caption: "Flashcard decks" },
      { caption: "Pain scale simulator" },
      { caption: "Vital signs practice" },
      { caption: "Ask the AI tutor" },
    ],
    reviews: [],
    updates: [
      {
        date: "Coming soon",
        title: "In development",
        body: "NurseUp is preparing for its first release. Want early access? Reach out.",
      },
    ],
  },
  {
    slug: "passly",
    name: "Driving Theory Test",
    tagline: "Pass your UK driving theory test first time.",
    description:
      "Full UK theory test prep for 2026 — practice questions, hazard perception, and an AI tutor. One-time unlock, no subscription.",
    longDescription: [
      "Driving Theory Test is everything you need to pass the UK driving theory test on your first attempt. Work through the full 2026 question bank, train on hazard perception clips with a deterministic scoring engine, and learn the 'why' behind every answer with a built-in AI tutor.",
      "No confusing subscriptions — one affordable unlock gets you the whole thing, forever.",
    ],
    category: "Education",
    emoji: "🚗",
    accent: "#ef4444",
    status: "live",
    packageId: "com.drivingtheorytest.uk",
    playUrl: "https://play.google.com/store/apps/details?id=com.drivingtheorytest.uk",
    subdomain: "https://passly.ofbuilder.com",
    tags: ["AI Tutor", "Exam Prep"],
    features: [
      {
        icon: "❓",
        title: "Full question bank",
        body: "Practice the complete 2026 UK theory test question set.",
      },
      {
        icon: "👀",
        title: "Hazard perception",
        body: "Train on video clips with fair, 100% deterministic scoring.",
      },
      {
        icon: "🤖",
        title: "AI tutor",
        body: "Don't just memorize — understand every answer with on-demand help.",
      },
      {
        icon: "💷",
        title: "One-time unlock",
        body: "Pay once for full access. No subscriptions, ever.",
      },
    ],
    screenshots: [
      { caption: "Practice questions" },
      { caption: "Hazard perception clips" },
      { caption: "Mock exams" },
      { caption: "AI explanations" },
    ],
    reviews: [],
    updates: [
      {
        date: "Coming soon",
        title: "Launching for 2026",
        body: "Passly is being prepared for the 2026 UK theory test season.",
      },
    ],
  },
  {
    slug: "shishuai",
    name: "Shishu AI",
    tagline: "An AI co-pilot for new parents.",
    description:
      "Multilingual baby & parenting Q&A with growth tracking, sleep predictions, and WHO percentile charts — for feeding, sleep, and development.",
    longDescription: [
      "Shishu AI is the calm, knowledgeable co-pilot every new parent wishes they had. Ask anything about feeding, sleep, development, vaccines or growth — in your own language — and get clear, reassuring guidance grounded in trusted health standards.",
      "Track growth against WHO percentile charts, get smart nap predictions from wake windows, and even ask questions about a photo. It's parenting support that fits in your pocket.",
    ],
    category: "Parenting & Health",
    emoji: "👶",
    accent: "#ec4899",
    status: "soon",
    packageId: "com.shishuai.app",
    subdomain: "https://shishuai.ofbuilder.com",
    tags: ["AI", "Health", "Multilingual"],
    features: [
      {
        icon: "💬",
        title: "Parenting Q&A",
        body: "Context-aware answers on feeding, sleep, development and more.",
      },
      {
        icon: "📏",
        title: "WHO growth tracking",
        body: "Plot height and weight against official WHO percentile charts.",
      },
      {
        icon: "😴",
        title: "Smart nap predictions",
        body: "Wake-window based predictions help you time naps right.",
      },
      {
        icon: "📷",
        title: "Photo Q&A (Pro)",
        body: "Ask a question about a photo and get a thoughtful answer.",
      },
    ],
    screenshots: [
      { caption: "Ask about your baby" },
      { caption: "Growth percentile charts" },
      { caption: "Sleep & nap window" },
      { caption: "Quick daily logging" },
    ],
    reviews: [],
    updates: [
      {
        date: "Coming soon",
        title: "In development",
        body: "Shishu AI is in active development with multilingual support.",
      },
    ],
  },
  {
    slug: "sleepwise",
    name: "SleepWise AI",
    tagline: "Your personal AI sleep coach.",
    description:
      "Personalized bedtime routines, breathwork, body-scan, sleep sounds, and a CBT-I journal to help you fall asleep and stay asleep.",
    longDescription: [
      "SleepWise is an AI sleep coach that builds a wind-down routine around you. Guided breathwork, body-scan sessions, and a library of sleep sounds help you actually switch off — while a CBT-I-inspired journal works on the habits keeping you awake.",
      "Track your sleep over time, get personalized bedtime stories and routines, and finally make falling asleep feel effortless.",
    ],
    category: "Health & Wellness",
    emoji: "😴",
    accent: "#6366f1",
    status: "live",
    packageId: "com.sleepwiseai.app",
    playUrl: "https://play.google.com/store/apps/details?id=com.sleepwiseai.app",
    subdomain: "https://sleepwise.ofbuilder.com",
    tags: ["AI", "Wellness", "Flutter"],
    features: [
      {
        icon: "🌬️",
        title: "Breathwork & body-scan",
        body: "Guided sessions to calm your mind and relax your body for sleep.",
      },
      {
        icon: "🎵",
        title: "Sleep sounds",
        body: "A library of soothing soundscapes to drift off to.",
      },
      {
        icon: "📓",
        title: "CBT-I journal",
        body: "Evidence-based journaling to tackle the root of poor sleep.",
      },
      {
        icon: "📊",
        title: "Sleep insights",
        body: "Track routines and trends to keep improving night after night.",
      },
    ],
    screenshots: [
      { caption: "Tonight's routine" },
      { caption: "Guided breathwork" },
      { caption: "Sleep sounds" },
      { caption: "Your sleep stats" },
    ],
    reviews: [],
    updates: [
      {
        date: "Coming soon",
        title: "In development",
        body: "SleepWise is being refined ahead of its Play Store launch.",
      },
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

export const contactEmail = "ofbuilder.apps@gmail.com";
