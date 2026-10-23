// Single source of truth for every suite and app on ofbuilder.com.
// Each app gets its own standalone page at ofbuilder.com/<slug>.

export type Motif =
  | "sunrise"
  | "road"
  | "circuit"
  | "breath"
  | "stars"
  | "geometric"
  | "shapes"
  | "math"
  | "maze"
  | "orbit"
  | "donut";

export type ScreenKind =
  | "quiz"
  | "list"
  | "chart"
  | "chat"
  | "story"
  | "map"
  | "timer"
  | "progress";

export type Feature = { icon: string; title: string; body: string };
export type Step = { title: string; body: string };
export type Screen = { caption: string; kind: ScreenKind; src?: string };
export type Faq = { q: string; a: string };
export type Review = { name: string; text: string; rating: number };
export type Stat = { value: string; label: string };

export type Theme = {
  primary: string;
  secondary: string;
  soft: string; // light tinted background
  dark?: boolean; // hero renders on a dark canvas
  flag?: string[]; // country colours for citizenship motif
};

export type App = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string[];
  suiteId: SuiteId;
  icon: string;
  theme: Theme;
  motif: Motif;
  playUrl: string;
  rating?: number;
  stats: Stat[];
  features: Feature[];
  howItWorks: Step[];
  screens: Screen[];
  pricing: { free: string[]; pro: string[]; proPrice?: string };
  faq: Faq[];
  reviews: Review[];
  privacyUrl: string;
  termsUrl?: string;
  deleteAccountUrl?: string;
  disclaimer?: string;
};

export type SuiteId = "citizenship" | "driving" | "comptia" | "wellness" | "everyday";

export type Suite = {
  id: SuiteId;
  name: string;
  short: string;
  tagline: string;
  description: string;
  color: string;
  soft: string;
  emoji: string;
  why: Feature[];
};

export const playDeveloperUrl =
  "https://play.google.com/store/apps/dev?id=8090522541816028633";
export const contactEmail = "ofbuilder.apps@gmail.com";
export const socials = {
  facebook: "https://www.facebook.com/ofbuilder/",
  instagram: "https://www.instagram.com/ofbuilder/",
  linkedin: "https://bd.linkedin.com/company/ofbuilder",
  youtube: "https://www.youtube.com/@OfBuilder",
  tiktok: "https://www.tiktok.com/@ofbuilder",
  x: "https://x.com/OfBuilderDev",
};

const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

// ── Suites ────────────────────────────────────────────────────────────────

export const suites: Suite[] = [
  {
    id: "citizenship",
    name: "Citizenship Suite",
    short: "Citizenship",
    tagline: "Pass your citizenship test with confidence in 7 countries.",
    description:
      "One familiar, friendly study system for new citizens. Pick your country, then learn by topic, take timed mock exams and see your readiness climb before test day.",
    color: "#f97316",
    soft: "#fff4e8",
    emoji: "🌅",
    why: [
      { icon: "BookOpenCheck", title: "Built around the official handbooks", body: "Questions follow the topics in each country's study material, from history and values to everyday life." },
      { icon: "Timer", title: "Real exam conditions", body: "Mock tests copy the real question count and time limit, so test day feels familiar." },
      { icon: "WifiOff", title: "Study anywhere", body: "Everything works offline, on the bus, on a break, or on the way to the test centre." },
    ],
  },
  {
    id: "driving",
    name: "Driving Theory Suite",
    short: "Driving Theory",
    tagline: "Every UK DVSA theory test, in one trusted toolkit.",
    description:
      "Car, motorcycle, LGV/HGV and bus/coach. Each app is tuned to its own DVSA test, with spaced repetition, hazard perception practice and realistic mock tests.",
    color: "#2563eb",
    soft: "#eaf1ff",
    emoji: "🚦",
    why: [
      { icon: "Repeat", title: "Spaced repetition", body: "The SM-2 algorithm brings back the questions you are about to forget, right on time." },
      { icon: "Eye", title: "Hazard perception practice", body: "Train your eye to spot developing hazards before the real clips." },
      { icon: "BadgeCheck", title: "One-time unlock", body: "No subscriptions. Unlock once and keep it until you pass." },
    ],
  },
  {
    id: "comptia",
    name: "IT Certification Suite",
    short: "IT Certs",
    tagline: "Exam-ready for CompTIA, one certification at a time.",
    description:
      "Focused prep apps for A+, Network+, Security+ and CySA+. Questions are mapped to the exam objectives, with drills, full-length timed exams and analytics that find your weak domains.",
    color: "#8b5cf6",
    soft: "#f2edff",
    emoji: "🛡️",
    why: [
      { icon: "Target", title: "Mapped to the objectives", body: "Every question is tagged to an exam domain, so you know exactly what you are learning." },
      { icon: "ChartColumn", title: "Weak-domain analytics", body: "See which domains need work and drill them until they turn green." },
      { icon: "Layers", title: "A clear career path", body: "Go from A+ to Network+ to Security+ to CySA+ with one consistent study system." },
    ],
  },
  {
    id: "wellness",
    name: "AI Wellness & Faith Suite",
    short: "Wellness & Faith",
    tagline: "Calmer nights, better sleep and knowledge you can trust.",
    description:
      "Gentle AI companions for the moments that matter: falling asleep, settling the kids at bedtime and finding sourced answers to questions of faith.",
    color: "#6366f1",
    soft: "#eef0ff",
    emoji: "🌙",
    why: [
      { icon: "Sparkles", title: "AI that adapts to you", body: "Plans, stories and answers shaped around you, not one-size-fits-all content." },
      { icon: "ShieldCheck", title: "Respectful by design", body: "Calm interfaces, no dark patterns and clear sources where it matters." },
      { icon: "Earth", title: "Built for the world", body: "Multilingual support and availability across 170+ countries." },
    ],
  },
  {
    id: "everyday",
    name: "Learn, Play & Money Suite",
    short: "Learn, Play & Money",
    tagline: "Small daily apps that make you sharper and better organised.",
    description:
      "Learning games for little ones, brain training and puzzles for grown-ups, and private money tools that never ask for your bank login.",
    color: "#10b981",
    soft: "#e8fbf3",
    emoji: "🎯",
    why: [
      { icon: "Gamepad2", title: "Fun that sticks", body: "Levels, streaks and rewards that make practice something you look forward to." },
      { icon: "Lock", title: "Privacy-first money tools", body: "No bank linking, ever. Your financial data stays on your device." },
      { icon: "Zap", title: "Quick sessions", body: "Designed for two-minute bursts that fit into a busy day." },
    ],
  },
];

// ── Shared builders for app families ──────────────────────────────────────

const DEFAULT_PRICING = {
  free: ["Free to download", "Core practice content", "Progress tracking"],
  pro: ["Everything unlocked", "Unlimited mock exams", "No ads"],
};

type CitizenInput = {
  slug: string;
  name: string;
  shortName: string;
  country: string;
  test: string;
  handbook: string;
  flag: string[];
  tagline: string;
  stats: Stat[];
  extraFaq?: Faq;
};

function citizenship(c: CitizenInput): App {
  return {
    slug: c.slug,
    name: c.name,
    shortName: c.shortName,
    tagline: c.tagline,
    description: [
      `${c.shortName} helps you prepare for the ${c.test} with practice questions built around ${c.handbook}. Study one topic at a time, learn from clear explanations and come back to the questions you got wrong.`,
      `When you feel ready, sit a timed mock exam that works like the real one. Your readiness score shows how close you are to passing, so you can book your test with confidence.`,
    ],
    suiteId: "citizenship",
    icon: `/icons/${c.slug}.png`,
    theme: { primary: "#f97316", secondary: c.flag[0], soft: "#fff4e8", flag: c.flag },
    motif: "sunrise",
    playUrl: playDeveloperUrl,
    stats: c.stats,
    features: [
      { icon: "ListChecks", title: "Official-style question bank", body: `Questions that cover every chapter of ${c.handbook}, written in plain, clear language.` },
      { icon: "Timer", title: "Timed mock exams", body: "Full mock tests with a real-exam timer and pass mark, so nothing on test day surprises you." },
      { icon: "BookOpen", title: "Study by topic", body: "Focus on history, government, values or daily life, and master one area at a time." },
      { icon: "RotateCcw", title: "Mistakes review", body: "Every wrong answer is saved to a review list with an explanation, so you fix it for good." },
      { icon: "TrendingUp", title: "Readiness score", body: "A live score that tells you when you are consistently scoring above the pass mark." },
      { icon: "WifiOff", title: "Works offline", body: "Study on the bus, at work or abroad. You don't need an internet connection." },
    ],
    howItWorks: [
      { title: "Learn the topics", body: "Work through short topic sets with an explanation after every answer." },
      { title: "Fix your weak spots", body: "Revisit your mistakes until the review list is empty." },
      { title: "Pass the mock, then the real test", body: "Hit the pass mark in timed mocks, then walk in ready." },
    ],
    screens: [
      { caption: "Practice by topic", kind: "quiz" },
      { caption: "Timed mock exam", kind: "timer" },
      { caption: "Your readiness score", kind: "progress" },
      { caption: "Chapters at a glance", kind: "list" },
    ],
    pricing: {
      free: ["Free to download", "Sample questions in every topic", "Progress tracking"],
      pro: ["Full question bank", "Unlimited mock exams", "Mistakes review & readiness score", "No ads"],
    },
    faq: [
      { q: `Is this the official ${c.test}?`, a: `No. ${c.shortName} is an independent study app and is not affiliated with any government. Its questions are written to match the topics and format of the official test.` },
      { q: "Do I need an internet connection?", a: "No. After you install it, everything works offline." },
      { q: "How do I know when I'm ready?", a: "Your readiness score rises as you pass mock exams. When you are passing consistently, you are in a good position to book your test." },
      { q: "Is my data private?", a: "Your progress is stored on your device. See the privacy policy for full details." },
      c.extraFaq ?? { q: "Can I reset my progress?", a: "Yes. You can reset your progress from the settings screen at any time." },
    ],
    reviews: [],
    privacyUrl: "/privacy/citizenship/",
    termsUrl: "/terms/citizenship/",
    disclaimer: "Independent study aid. Not affiliated with or endorsed by any government body.",
  };
}

type DrivingInput = {
  slug: string;
  name: string;
  shortName: string;
  vehicle: string;
  icon: string;
  tagline: string;
  playUrl?: string;
  stats: Stat[];
};

function driving(d: DrivingInput): App {
  return {
    slug: d.slug,
    name: d.name,
    shortName: d.shortName,
    tagline: d.tagline,
    description: [
      `Get ready for the UK ${d.vehicle} theory test with DVSA-style multiple-choice questions, hazard perception practice and mock tests that mirror the real exam.`,
      "Spaced repetition (SM-2) brings back the questions you're about to forget, so every study session counts. No subscription: one unlock and it's yours until you pass.",
    ],
    suiteId: "driving",
    icon: `/icons/${d.slug}.png`,
    theme: { primary: "#2563eb", secondary: "#facc15", soft: "#eaf1ff" },
    motif: "road",
    playUrl: d.playUrl ?? playDeveloperUrl,
    stats: d.stats,
    features: [
      { icon: "ListChecks", title: "DVSA-style questions", body: `A full ${d.vehicle} question bank, organised by DVSA topic, with an explanation for every answer.` },
      { icon: "Eye", title: "Hazard perception practice", body: "Learn to spot developing hazards early, with fair and consistent scoring." },
      { icon: "Repeat", title: "SM-2 spaced repetition", body: "A proven memory algorithm schedules reviews right before you'd forget." },
      { icon: "Timer", title: "Mock test simulator", body: "Timed tests with the same question count and pass mark as the real exam." },
      { icon: "Signpost", title: "Road signs trainer", body: "Learn every common UK road sign with quick visual drills." },
      { icon: "BadgeCheck", title: "One-time unlock", body: "No subscription. Pay once and keep full access until you pass." },
    ],
    howItWorks: [
      { title: "Pick a topic", body: "Start with alertness, rules of the road, signs and more." },
      { title: "Let the algorithm coach you", body: "Spaced repetition brings back exactly the right questions each day." },
      { title: "Pass your mocks", body: "Hit the pass mark in timed mocks, then book with confidence." },
    ],
    screens: [
      { caption: "DVSA-style questions", kind: "quiz" },
      { caption: "Hazard perception", kind: "map" },
      { caption: "Mock test timer", kind: "timer" },
      { caption: "Progress by topic", kind: "progress" },
    ],
    pricing: {
      free: ["Free to download", "Sample questions in every topic", "Road signs basics"],
      pro: ["Full question bank", "Unlimited mock tests", "Hazard perception practice", "No subscription"],
      proPrice: "One-time unlock",
    },
    faq: [
      { q: "Is this up to date for 2026?", a: "Yes. The question bank follows the current DVSA topic areas for the 2026 test season." },
      { q: "Is it official DVSA material?", a: "No. It's an independent study app with DVSA-style questions. It is not affiliated with or endorsed by the DVSA." },
      { q: "Do I need a subscription?", a: "No. There's a single one-time unlock and no recurring charges." },
      { q: "Does it work offline?", a: "Yes, multiple-choice practice and mock tests work without a connection." },
      { q: "What is spaced repetition?", a: "It shows you a question again just before you are likely to forget it. That makes your revision much more efficient." },
    ],
    reviews: [],
    privacyUrl: "/privacy/driving-theory/",
    disclaimer: "Independent study aid. Not affiliated with or endorsed by the DVSA.",
  };
}

type CertInput = {
  slug: string;
  name: string;
  shortName: string;
  exam: string;
  focus: string;
  tagline: string;
  primary: string;
  secondary: string;
  stats: Stat[];
};

function cert(c: CertInput): App {
  return {
    slug: c.slug,
    name: c.name,
    shortName: c.shortName,
    tagline: c.tagline,
    description: [
      `${c.shortName} prepares you for the CompTIA ${c.exam} exam with practice questions mapped to the official exam objectives, covering ${c.focus}.`,
      "Drill one domain at a time, take full-length timed exams, and let the analytics show you which domains need more work before you book.",
    ],
    suiteId: "comptia",
    icon: `/icons/${c.slug}.png`,
    theme: { primary: c.primary, secondary: c.secondary, soft: "#f2edff", dark: true },
    motif: "circuit",
    playUrl: playDeveloperUrl,
    stats: c.stats,
    features: [
      { icon: "Target", title: "Mapped to exam objectives", body: `Every question is tagged to a ${c.exam} domain and objective.` },
      { icon: "Terminal", title: "PBQ-style drills", body: "Scenario-based drills that build the hands-on thinking performance-based questions need." },
      { icon: "Timer", title: "Full-length timed exams", body: "Simulate the real exam with the real time pressure." },
      { icon: "Lightbulb", title: "Detailed explanations", body: "Learn why the right answer is right and why each distractor is wrong." },
      { icon: "ChartColumn", title: "Weak-domain analytics", body: "A domain-by-domain breakdown tells you exactly where to focus." },
      { icon: "Layers", title: "Flashcards", body: "Quick-fire flashcards for ports, acronyms and key concepts." },
    ],
    howItWorks: [
      { title: "Baseline test", body: "Take a quick diagnostic to see where you stand in each domain." },
      { title: "Drill your weak domains", body: "Targeted practice and flashcards turn red domains green." },
      { title: "Sit the full exam", body: "Pass timed full-length exams consistently, then book the real one." },
    ],
    screens: [
      { caption: "Objective-mapped questions", kind: "quiz" },
      { caption: "Domain analytics", kind: "chart" },
      { caption: "Timed full exam", kind: "timer" },
      { caption: "Flashcards", kind: "list" },
    ],
    pricing: DEFAULT_PRICING,
    faq: [
      { q: `Which version of ${c.exam} does this cover?`, a: `This app targets the ${c.exam} exam objectives named in its title.` },
      { q: "Is this official CompTIA material?", a: "No. It's an independent study app and is not affiliated with or endorsed by CompTIA." },
      { q: "Does it include performance-based questions?", a: "It includes PBQ-style scenario drills that train the same skills in a mobile-friendly format." },
      { q: "Can I study offline?", a: "Yes, practice questions and flashcards work without a connection." },
      { q: "Which CompTIA exam should I take first?", a: "Most people start with A+ Core 1 and Core 2, then move on to Network+ and Security+. CySA+ comes after that." },
    ],
    reviews: [],
    privacyUrl: "/privacy/comptia/",
    disclaimer: "CompTIA, A+, Network+, Security+ and CySA+ are trademarks of CompTIA. This app is not affiliated with or endorsed by CompTIA.",
  };
}

// ── Apps ──────────────────────────────────────────────────────────────────

export const apps: App[] = [
  // Citizenship
  citizenship({
    slug: "life-in-the-uk", name: "Life in the UK Test 2026", shortName: "Life in the UK Test",
    country: "United Kingdom", test: "Life in the UK test", handbook: "the official handbook",
    flag: ["#012169", "#c8102e", "#ffffff"],
    tagline: "Pass the Life in the UK test first time.",
    stats: [{ value: "24", label: "questions in the real test" }, { value: "45 min", label: "time limit" }, { value: "75%", label: "pass mark" }],
  }),
  citizenship({
    slug: "us-citizenship", name: "US Citizenship Test 2026 Prep", shortName: "US Citizenship Test",
    country: "United States", test: "USCIS naturalization civics test", handbook: "the USCIS civics questions",
    flag: ["#3c3b6e", "#b22234", "#ffffff"],
    tagline: "Ace the USCIS civics test with confidence.",
    stats: [{ value: "Civics", label: "full topic coverage" }, { value: "Mock", label: "interview-style practice" }, { value: "Offline", label: "study anywhere" }],
    extraFaq: { q: "Does it cover the latest civics test?", a: "The question set follows the current USCIS civics test. Always check uscis.gov for the version that applies to your application date." },
  }),
  citizenship({
    slug: "canadian-citizenship", name: "Canadian Citizenship Test 2026", shortName: "Canadian Citizenship Test",
    country: "Canada", test: "Canadian citizenship test", handbook: "Discover Canada",
    flag: ["#d52b1e", "#ffffff", "#d52b1e"],
    tagline: "Discover Canada, then pass with ease.",
    stats: [{ value: "20", label: "questions in the real test" }, { value: "45 min", label: "time limit" }, { value: "75%", label: "pass mark" }],
  }),
  citizenship({
    slug: "australian-citizenship", name: "Australian Citizenship Test", shortName: "Australian Citizenship Test",
    country: "Australia", test: "Australian citizenship test", handbook: "Our Common Bond",
    flag: ["#012169", "#e4002b", "#ffffff"],
    tagline: "Learn Our Common Bond and pass with confidence.",
    stats: [{ value: "20", label: "questions in the real test" }, { value: "45 min", label: "time limit" }, { value: "75%", label: "pass mark" }],
    extraFaq: { q: "What about the values questions?", a: "The app gives Australian values extra practice, because you must answer every values question correctly to pass." },
  }),
  citizenship({
    slug: "german-citizenship", name: "German Citizenship Test 2026", shortName: "Einbürgerungstest",
    country: "Germany", test: "Einbürgerungstest (Leben in Deutschland)", handbook: "the official question catalogue",
    flag: ["#000000", "#dd0000", "#ffce00"],
    tagline: "Leben in Deutschland, made simple.",
    stats: [{ value: "33", label: "questions in the real test" }, { value: "60 min", label: "time limit" }, { value: "17", label: "correct answers to pass" }],
    extraFaq: { q: "Are the state-specific questions included?", a: "Yes. Choose your federal state and you'll practise its questions alongside the general catalogue." },
  }),
  citizenship({
    slug: "danish-citizenship", name: "Danish Citizenship Test 2026", shortName: "Danish Citizenship Test",
    country: "Denmark", test: "Danish citizenship test (Indfødsretsprøven)", handbook: "the official learning material",
    flag: ["#c8102e", "#ffffff", "#c8102e"],
    tagline: "Prepare for Indfødsretsprøven the smart way.",
    stats: [{ value: "Topics", label: "history, society & culture" }, { value: "Mock", label: "timed exam practice" }, { value: "Offline", label: "study anywhere" }],
  }),
  citizenship({
    slug: "knm-inburgering", name: "KNM Inburgering Exam Practice", shortName: "KNM Inburgering",
    country: "Netherlands", test: "KNM (Kennis van de Nederlandse Maatschappij) exam", handbook: "the KNM exam themes",
    flag: ["#ae1c28", "#ffffff", "#21468b"],
    tagline: "Know Dutch society. Pass your KNM exam.",
    stats: [{ value: "8", label: "KNM themes covered" }, { value: "Mock", label: "exam simulator" }, { value: "Offline", label: "study anywhere" }],
  }),

  // Driving theory
  driving({
    slug: "driving-theory", name: "Driving Theory Test UK 2026", shortName: "Driving Theory UK",
    vehicle: "car", icon: "Car", tagline: "Pass your UK car theory test first time.",
    playUrl: play("com.drivingtheorytest.uk"),
    stats: [{ value: "1,000+", label: "DVSA-style questions" }, { value: "50", label: "questions in the real test" }, { value: "43", label: "correct answers to pass" }],
  }),
  driving({
    slug: "motorcycle-theory", name: "Motorcycle Theory Test UK 2026", shortName: "Motorcycle Theory UK",
    vehicle: "motorcycle", icon: "Bike", tagline: "Ride into your motorcycle theory test ready.",
    stats: [{ value: "50", label: "questions in the real test" }, { value: "43", label: "correct answers to pass" }, { value: "SM-2", label: "spaced repetition" }],
  }),
  driving({
    slug: "lgv-hgv-theory", name: "LGV & HGV Theory Test UK 2026", shortName: "LGV & HGV Theory",
    vehicle: "LGV/HGV", icon: "Truck", tagline: "Your fast lane to an LGV licence.",
    stats: [{ value: "100", label: "multiple-choice questions" }, { value: "85", label: "correct answers to pass" }, { value: "SM-2", label: "spaced repetition" }],
  }),
  driving({
    slug: "pcv-bus-theory", name: "PCV & Bus Theory Test UK 2026", shortName: "PCV & Bus Theory",
    vehicle: "PCV (bus and coach)", icon: "Bus", tagline: "Get your bus and coach theory test done, first time.",
    stats: [{ value: "100", label: "multiple-choice questions" }, { value: "85", label: "correct answers to pass" }, { value: "SM-2", label: "spaced repetition" }],
  }),

  // CompTIA
  cert({
    slug: "a-plus-core-1", name: "A+ Core 1 220-1201 Exam Prep", shortName: "A+ Core 1",
    exam: "A+ Core 1 (220-1201)", focus: "mobile devices, networking, hardware, virtualization and troubleshooting",
    tagline: "Start your IT career with A+ Core 1.", primary: "#f97316", secondary: "#facc15",
    stats: [{ value: "90", label: "max questions" }, { value: "90 min", label: "exam length" }, { value: "675", label: "passing score (of 900)" }],
  }),
  cert({
    slug: "a-plus-core-2", name: "A+ Core 2 220-1202 Exam Prep", shortName: "A+ Core 2",
    exam: "A+ Core 2 (220-1202)", focus: "operating systems, security, software troubleshooting and operational procedures",
    tagline: "Finish your A+ with Core 2.", primary: "#ef4444", secondary: "#f97316",
    stats: [{ value: "90", label: "max questions" }, { value: "90 min", label: "exam length" }, { value: "700", label: "passing score (of 900)" }],
  }),
  cert({
    slug: "network-plus", name: "Network+ N10-009 Exam Prep", shortName: "Network+",
    exam: "Network+ (N10-009)", focus: "networking concepts, implementation, operations, security and troubleshooting",
    tagline: "Master networking for Network+.", primary: "#22c55e", secondary: "#22d3ee",
    stats: [{ value: "90", label: "max questions" }, { value: "90 min", label: "exam length" }, { value: "720", label: "passing score (of 900)" }],
  }),
  cert({
    slug: "security-plus", name: "Security+ SY0-701 Exam Prep", shortName: "Security+",
    exam: "Security+ (SY0-701)", focus: "general security concepts, threats and vulnerabilities, security architecture, operations, and program management",
    tagline: "Lock in your Security+ pass.", primary: "#3b82f6", secondary: "#22d3ee",
    stats: [{ value: "90", label: "max questions" }, { value: "90 min", label: "exam length" }, { value: "750", label: "passing score (of 900)" }],
  }),
  cert({
    slug: "cysa-plus", name: "CySA+ CS0-004 Exam Prep", shortName: "CySA+",
    exam: "CySA+ (CS0-004)", focus: "security operations, vulnerability management, incident response and reporting",
    tagline: "Think like a security analyst.", primary: "#a855f7", secondary: "#ec4899",
    stats: [{ value: "4", label: "core exam domains" }, { value: "PBQ", label: "scenario drills" }, { value: "Timed", label: "full exams" }],
  }),

  // Wellness & faith
  {
    slug: "sleepwise",
    name: "SleepWise: AI Sleep Coach",
    shortName: "SleepWise",
    tagline: "Fall asleep faster. Wake up like yourself again.",
    description: [
      "SleepWise is an AI sleep coach built on Cognitive Behavioral Therapy for Insomnia (CBT-I), the approach sleep specialists recommend. It helps you fall asleep faster, stay asleep longer and wake up refreshed.",
      "Log your nights in a quick sleep diary. The AI turns your patterns into a personal plan with a wind-down routine, a sleep window and relaxation sessions that change as you improve.",
    ],
    suiteId: "wellness",
    icon: "/icons/sleepwise.png",
    theme: { primary: "#6366f1", secondary: "#c084fc", soft: "#eef0ff", dark: true },
    motif: "breath",
    playUrl: play("com.sleepwiseai.app"),
    stats: [{ value: "176", label: "countries" }, { value: "CBT-I", label: "evidence-based method" }, { value: "AI", label: "personal sleep plan" }],
    features: [
      { icon: "Brain", title: "CBT-I coaching", body: "Evidence-based techniques that tackle the root causes of poor sleep, not just the symptoms." },
      { icon: "CalendarClock", title: "Personal sleep plan", body: "The AI builds a sleep window and bedtime routine around your schedule." },
      { icon: "Wind", title: "Breathwork & relaxation", body: "Guided breathing and body scans that quiet a racing mind." },
      { icon: "NotebookPen", title: "Sleep diary", body: "Log a night in seconds and watch trends in your sleep quality appear." },
      { icon: "Sparkles", title: "AI insights", body: "Clear, kind feedback on what's helping your sleep and what's keeping you awake." },
      { icon: "Moon", title: "Wind-down mode", body: "A calm, dark interface made for the last half hour before bed." },
    ],
    howItWorks: [
      { title: "Tell SleepWise about your nights", body: "A two-minute check-in maps your sleep habits and goals." },
      { title: "Follow your plan", body: "Get a nightly routine, a sleep window and relaxation sessions." },
      { title: "Watch your sleep improve", body: "Your diary and AI insights show progress week by week." },
    ],
    screens: [
      { caption: "Tonight's routine", kind: "list" },
      { caption: "Guided breathwork", kind: "timer" },
      { caption: "Sleep diary", kind: "chart" },
      { caption: "Talk to your coach", kind: "chat" },
    ],
    pricing: {
      free: ["Sleep diary", "Basic relaxation sessions", "Weekly sleep summary"],
      pro: ["Full CBT-I program", "AI personal sleep plan", "Unlimited AI insights", "All relaxation sessions"],
    },
    faq: [
      { q: "What is CBT-I?", a: "Cognitive Behavioral Therapy for Insomnia is a structured, evidence-based method that changes the habits and thoughts that keep you awake." },
      { q: "Is SleepWise a medical device?", a: "No. SleepWise is a wellness coach. If you have a sleep disorder or health concern, speak to a doctor." },
      { q: "Do I need a wearable?", a: "No. A quick daily sleep diary is all it needs." },
      { q: "Where is it available?", a: "SleepWise is available on Google Play in 176 countries." },
      { q: "Is my sleep data private?", a: "Yes. See the SleepWise privacy policy for exactly what is stored and why." },
    ],
    reviews: [],
    privacyUrl: "/privacy/sleepwise/",
  },
  {
    slug: "dreamnest",
    name: "DreamNest AI: Sleep Stories",
    shortName: "DreamNest AI",
    tagline: "Bedtime stories starring your child, every night.",
    description: [
      "DreamNest AI writes a new bedtime story every night with your child's name, favourite characters and interests woven in. Every story is unique, calming and made to help little ones drift off peacefully.",
      "Each story carries a gentle lesson, like kindness, courage or patience, and ends on a soothing note. Turn on narration and a calm voice reads it aloud while you cuddle up.",
    ],
    suiteId: "wellness",
    icon: "/icons/dreamnest.png",
    theme: { primary: "#8b5cf6", secondary: "#fbbf24", soft: "#f3efff", dark: true },
    motif: "stars",
    playUrl: play("com.dreamnest.ai"),
    rating: 5.0,
    stats: [{ value: "5.0★", label: "on Google Play" }, { value: "∞", label: "stories, none repeat" }, { value: "1 min", label: "to create a story" }],
    features: [
      { icon: "WandSparkles", title: "Personalised AI stories", body: "A unique story in seconds, starring your child by name." },
      { icon: "Heart", title: "Pick tonight's feeling", body: "Brave, calm, curious or sleepy. The story's mood matches your child's." },
      { icon: "Mic", title: "Soothing narration", body: "A calm, sleep-friendly voice reads each story aloud." },
      { icon: "Sprout", title: "A gentle lesson every night", body: "Kindness, courage and patience, taught warmly and never preachy." },
      { icon: "Library", title: "Story library", body: "Save favourites and read them again any night." },
      { icon: "WifiOff", title: "Works offline", body: "Saved stories open instantly, even without a connection." },
    ],
    howItWorks: [
      { title: "Add your child", body: "Their name, age and favourite things like dinosaurs, space or unicorns." },
      { title: "Choose tonight's feeling", body: "Pick a mood and DreamNest writes a brand-new story." },
      { title: "Read or listen, then sleep", body: "Read along or let the narrator take over as eyes get heavy." },
    ],
    screens: [
      { caption: "Pick a child & feeling", kind: "list" },
      { caption: "A story made for tonight", kind: "story" },
      { caption: "Gentle narration", kind: "timer" },
      { caption: "Your story library", kind: "progress" },
    ],
    pricing: {
      free: ["Free stories to try", "Child profile", "Story library"],
      pro: ["New stories every night", "Soothing narration", "Multiple children", "Offline library"],
    },
    faq: [
      { q: "Is DreamNest safe for kids?", a: "Yes. Stories are generated with child-safe guidelines, kept age-appropriate and always end calmly." },
      { q: "Do stories ever repeat?", a: "No. Every story is newly generated around your child's details and tonight's chosen feeling." },
      { q: "What ages is it for?", a: "DreamNest works best for children aged about 2 to 10." },
      { q: "Can I delete my account and data?", a: "Yes. You can delete your account and data at any time from the delete-account page below." },
      { q: "Does it need the internet?", a: "Creating a new story needs a connection. Stories you've saved can be read offline." },
    ],
    reviews: [],
    privacyUrl: "/privacy/dreamnest-ai/",
    deleteAccountUrl: "/delete-account/dreamnest-ai/",
  },
  {
    slug: "ilmai",
    name: "IlmAI: Islamic AI & Quran",
    shortName: "IlmAI",
    tagline: "Ask anything about Islam and get answers with sources.",
    description: [
      "IlmAI is an AI companion for Islamic knowledge. Ask your questions in Bangla, English or Indonesian and get respectful, clear answers that cite authentic Quran and Hadith sources.",
      "Answers take the schools of Islamic jurisprudence (madhab) into account, and every citation can be checked in the built-in Quran and Hadith explorer.",
    ],
    suiteId: "wellness",
    icon: "/icons/ilmai.png",
    theme: { primary: "#0f766e", secondary: "#d4a72c", soft: "#ecfaf6", dark: true },
    motif: "geometric",
    playUrl: play("com.ilmai.islamicqa"),
    stats: [{ value: "3", label: "languages" }, { value: "Quran + Hadith", label: "cited sources" }, { value: "Madhab", label: "-aware answers" }],
    features: [
      { icon: "MessageCircle", title: "AI Islamic Q&A", body: "Ask naturally about faith, worship and daily life, and get clear, respectful answers." },
      { icon: "BookMarked", title: "Quran & Hadith citations", body: "Answers cite their sources so you can verify them yourself." },
      { icon: "Scale", title: "Madhab-aware", body: "Answers take the recognised schools of Islamic jurisprudence into account." },
      { icon: "Languages", title: "Bangla · English · Indonesian", body: "Ask and read answers in the language you think in." },
      { icon: "Search", title: "Quran & Hadith explorer", body: "Browse and search the sources directly, beyond the chat." },
      { icon: "Star", title: "Pro tier", body: "Unlimited questions and more capable AI models." },
    ],
    howItWorks: [
      { title: "Ask your question", body: "Type it the way you'd ask a knowledgeable friend." },
      { title: "Read the sourced answer", body: "Get a clear explanation with Quran and Hadith references." },
      { title: "Go deeper", body: "Ask follow-ups or open the cited verses in the explorer." },
    ],
    screens: [
      { caption: "Ask a question", kind: "chat" },
      { caption: "Sourced answers", kind: "story" },
      { caption: "Quran explorer", kind: "list" },
      { caption: "Hadith library", kind: "progress" },
    ],
    pricing: {
      free: ["Daily free questions", "Quran & Hadith explorer", "3 languages"],
      pro: ["Unlimited questions", "Most capable AI models", "Priority answers"],
    },
    faq: [
      { q: "Does IlmAI replace a scholar?", a: "No. IlmAI is a learning companion. For personal rulings (fatwa), please consult a qualified scholar." },
      { q: "Which languages are supported?", a: "Bangla, English and Indonesian." },
      { q: "Where do the answers come from?", a: "Answers are grounded in authentic Quran and Hadith sources, and the citations are shown with each answer." },
      { q: "Can I delete my account?", a: "Yes. Use the delete-account page linked below." },
      { q: "What does Pro include?", a: "Unlimited questions and access to more capable AI models." },
    ],
    reviews: [],
    privacyUrl: "/privacy/ilmai/",
    deleteAccountUrl: "/delete-account/ilmai/",
  },

  // Learn, play & money
  {
    slug: "brightkids",
    name: "BrightKids: Learning for Kids",
    shortName: "BrightKids",
    tagline: "Playful early learning your little one will love.",
    description: [
      "BrightKids turns the ABCs, numbers, shapes and colours into bright, bouncy mini-games. Tap, trace and match your way through bite-sized lessons with a friendly fox guide.",
      "It's made for small hands and short attention spans, with big buttons, cheerful sounds and lots of praise, so learning feels like play.",
    ],
    suiteId: "everyday",
    icon: "/icons/brightkids.png",
    theme: { primary: "#f97316", secondary: "#22c55e", soft: "#fff7e6" },
    motif: "shapes",
    playUrl: playDeveloperUrl,
    stats: [{ value: "ABC", label: "letters & phonics" }, { value: "123", label: "numbers & counting" }, { value: "●▲■", label: "shapes & colours" }],
    features: [
      { icon: "ALargeSmall", title: "Letters & phonics", body: "Learn the alphabet with sounds, tracing and matching games." },
      { icon: "Hash", title: "Numbers & counting", body: "Count, compare and recognise numbers through play." },
      { icon: "Shapes", title: "Shapes & colours", body: "Sort, match and spot shapes and colours in fun scenes." },
      { icon: "PartyPopper", title: "Rewards & praise", body: "Stars, stickers and cheers keep little learners motivated." },
      { icon: "Baby", title: "Made for small hands", body: "Big, simple controls designed for toddlers and preschoolers." },
      { icon: "ShieldCheck", title: "Kid-safe", body: "A calm, safe space designed with children's privacy in mind." },
    ],
    howItWorks: [
      { title: "Choose a world", body: "Letters, numbers, shapes or colours." },
      { title: "Play mini-games", body: "Short, joyful activities that build one skill at a time." },
      { title: "Collect stars", body: "Earn rewards and watch confidence grow." },
    ],
    screens: [
      { caption: "Pick a learning world", kind: "map" },
      { caption: "Letter games", kind: "quiz" },
      { caption: "Sticker rewards", kind: "progress" },
      { caption: "Shapes & colours", kind: "list" },
    ],
    pricing: {
      free: ["Free to download", "Starter games in every world"],
      pro: ["All learning worlds", "All mini-games", "No ads"],
    },
    faq: [
      { q: "What age is BrightKids for?", a: "It's designed for toddlers and preschoolers, roughly ages 2 to 6." },
      { q: "Is it safe for children?", a: "Yes. BrightKids is built with children's privacy in mind. See the privacy policy for details." },
      { q: "Does it work offline?", a: "Yes, the learning games work without a connection." },
      { q: "Can multiple kids use it?", a: "Yes. It's great for siblings to take turns." },
      { q: "Will my child need help?", a: "Activities are simple and voice-guided, but playing together makes it even better." },
    ],
    reviews: [],
    privacyUrl: "/privacy/brightkids/",
  },
  {
    slug: "mental-math",
    name: "Mental Math Master: Math Games",
    shortName: "Mental Math Master",
    tagline: "Train your brain to beat the calculator.",
    description: [
      "Mental Math Master is gamified brain training with 150+ levels across 4 worlds, from Foundation to Elite. A colourful level map, daily rewards and trophies keep you coming back.",
      "Sharpen addition, subtraction, multiplication and division. Take on Speed Run mode, build streaks and climb the global leaderboard.",
    ],
    suiteId: "everyday",
    icon: "/icons/mental-math.png",
    theme: { primary: "#0f766e", secondary: "#f59e0b", soft: "#e9fbf7" },
    motif: "math",
    playUrl: play("com.thenoob.mental_math_master"),
    stats: [{ value: "150+", label: "levels" }, { value: "4", label: "worlds" }, { value: "🌍", label: "global leaderboard" }],
    features: [
      { icon: "Map", title: "150+ levels · 4 worlds", body: "A colourful level map from Foundation to Elite, with always another challenge ahead." },
      { icon: "Zap", title: "Speed Run mode", body: "Race the clock and push your mental arithmetic to its limit." },
      { icon: "Trophy", title: "Trophies & leaderboard", body: "Earn trophies and compete with players worldwide." },
      { icon: "Flame", title: "Daily streaks", body: "Build a habit and watch your speed improve week over week." },
      { icon: "Gem", title: "Coins, gems & rewards", body: "Daily rewards and a gem shop to spend your winnings in." },
      { icon: "Calculator", title: "All four operations", body: "Addition, subtraction, multiplication and division, from easy to elite." },
    ],
    howItWorks: [
      { title: "Start in Foundation", body: "Warm up with quick, confidence-building rounds." },
      { title: "Climb the map", body: "Unlock new worlds as your speed and accuracy grow." },
      { title: "Compete globally", body: "Take on Speed Runs and climb the leaderboard." },
    ],
    screens: [
      { caption: "The level map", kind: "map" },
      { caption: "Speed Run", kind: "timer" },
      { caption: "Solve fast", kind: "quiz" },
      { caption: "Global leaderboard", kind: "list" },
    ],
    pricing: {
      free: ["Free to play", "Hundreds of levels", "Daily rewards"],
      pro: ["No ads", "Bonus gems", "Exclusive themes"],
    },
    faq: [
      { q: "Who is Mental Math Master for?", a: "Anyone from students to adults who want faster, more confident mental arithmetic." },
      { q: "Is it good for kids?", a: "Yes. Short rounds and rewards make it a great way for older kids to practise times tables and arithmetic." },
      { q: "Does it work offline?", a: "Levels work offline. The leaderboard needs a connection." },
      { q: "How many levels are there?", a: "150+ levels across 4 worlds, and more are on the way." },
      { q: "Is there a time limit?", a: "Normal levels are relaxed. Speed Run mode is where the clock comes in." },
    ],
    reviews: [],
    privacyUrl: "/privacy/mental-math/",
  },
  {
    slug: "arrowgo",
    name: "ArrowGo: Swipe Maze Puzzle",
    shortName: "ArrowGo",
    tagline: "Swipe. Slide. Solve. The puzzle you can't put down.",
    description: [
      "ArrowGo is a satisfying swipe puzzle. Guide the arrow through twisting mazes, plan your moves and reach the goal. It's easy to learn, and the later levels get properly tricky.",
      "Hundreds of hand-tuned levels, crisp animations and a relaxing pace make it perfect for a quick break or a long session.",
    ],
    suiteId: "everyday",
    icon: "/icons/arrowgo.png",
    theme: { primary: "#2563eb", secondary: "#facc15", soft: "#eef4ff" },
    motif: "maze",
    playUrl: playDeveloperUrl,
    rating: 4.8,
    stats: [{ value: "4.8★", label: "on Google Play" }, { value: "100s", label: "of levels" }, { value: "1 finger", label: "to play" }],
    features: [
      { icon: "MoveRight", title: "Swipe to move", body: "Simple one-finger controls. Swipe and the arrow slides until it hits a wall." },
      { icon: "Puzzle", title: "Hundreds of mazes", body: "Hand-tuned levels that slowly ramp up the challenge." },
      { icon: "Lightbulb", title: "Hints when stuck", body: "A nudge in the right direction when a maze has you beat." },
      { icon: "Star", title: "Star ratings", body: "Solve in the fewest moves to earn all three stars." },
      { icon: "Coffee", title: "Relaxing pace", body: "No timers, no pressure. Just you and the puzzle." },
      { icon: "WifiOff", title: "Play offline", body: "Perfect for flights, commutes and waiting rooms." },
    ],
    howItWorks: [
      { title: "Swipe a direction", body: "The arrow slides until something stops it." },
      { title: "Plan your path", body: "Use walls and turns to line up the perfect route." },
      { title: "Reach the goal", body: "Solve in fewer moves for more stars." },
    ],
    screens: [
      { caption: "Swipe through mazes", kind: "map" },
      { caption: "Level select", kind: "list" },
      { caption: "Three-star solves", kind: "progress" },
      { caption: "Trickier worlds", kind: "map" },
    ],
    pricing: { free: ["Free to play", "Hundreds of levels"], pro: ["Remove ads", "Extra hints"] },
    faq: [
      { q: "Is ArrowGo free?", a: "Yes. It's free to play, with optional purchases to remove ads or get extra hints." },
      { q: "Can I play offline?", a: "Yes, every level works offline." },
      { q: "Is it suitable for kids?", a: "Yes. It's a calm, non-violent puzzle game for all ages." },
      { q: "How hard does it get?", a: "Early levels are gentle, and later worlds will challenge seasoned puzzle fans." },
      { q: "Are new levels added?", a: "We add new levels and worlds in updates." },
    ],
    reviews: [],
    privacyUrl: "/privacy/arrowgo/",
  },
  {
    slug: "renu",
    name: "Renu: Subscription Tracker",
    shortName: "Renu",
    tagline: "Know exactly what you pay for, every month.",
    description: [
      "Renu keeps all your subscriptions in one tidy list, from streaming and software to the gym and cloud storage. See your monthly and yearly total at a glance and get a reminder before anything renews.",
      "No bank linking, ever. Renu is privacy-first, works offline and takes under a minute to set up.",
    ],
    suiteId: "everyday",
    icon: "/icons/renu.png",
    theme: { primary: "#0d9488", secondary: "#34d399", soft: "#e8faf6" },
    motif: "orbit",
    playUrl: play("com.ofbuilder.renu"),
    stats: [{ value: "0", label: "bank logins needed" }, { value: "<1 min", label: "to set up" }, { value: "$2.99", label: "one-time Pro" }],
    features: [
      { icon: "List", title: "All subscriptions in one place", body: "Streaming, software, gym, anything. Track them all in one list." },
      { icon: "Bell", title: "Renewal reminders", body: "Get notified before a subscription renews, so no charge surprises you." },
      { icon: "Wallet", title: "Monthly & yearly totals", body: "See exactly what you spend per month and per year." },
      { icon: "Lock", title: "No bank linking", body: "Privacy-first. Your data stays on your device." },
      { icon: "ChartPie", title: "Spending breakdown", body: "See which categories eat most of your budget." },
      { icon: "WifiOff", title: "Works offline", body: "No account and no cloud needed. Just open it and go." },
    ],
    howItWorks: [
      { title: "Add your subscriptions", body: "Pick from popular services or add your own in seconds." },
      { title: "See the real total", body: "Monthly and yearly costs, calculated for you." },
      { title: "Cancel what you don't use", body: "Reminders give you time to decide before you're charged." },
    ],
    screens: [
      { caption: "All subscriptions", kind: "list" },
      { caption: "Monthly breakdown", kind: "chart" },
      { caption: "Renewal reminders", kind: "progress" },
      { caption: "Add in seconds", kind: "list" },
    ],
    pricing: {
      free: ["Track your subscriptions", "Renewal reminders", "Monthly total"],
      pro: ["Unlimited subscriptions", "Yearly insights & breakdowns", "Custom categories"],
      proPrice: "$2.99 one-time",
    },
    faq: [
      { q: "Do I need to link my bank?", a: "No, never. You add subscriptions yourself, so your financial data stays private." },
      { q: "Is Pro a subscription?", a: "No. Pro is a one-time $2.99 unlock. A subscription tracker shouldn't be another subscription." },
      { q: "Does it work offline?", a: "Yes, completely." },
      { q: "Does it support my currency?", a: "Yes. You can choose your currency in settings." },
      { q: "Where is my data stored?", a: "On your device. See the privacy policy for details." },
    ],
    reviews: [],
    privacyUrl: "/privacy/renu/",
  },
  {
    slug: "budgetwise",
    name: "BudgetWise: Budget & Expenses",
    shortName: "BudgetWise",
    tagline: "See where your money goes, without giving up your privacy.",
    description: [
      "BudgetWise is privacy-first personal finance. Set up a 50/30/20 budget in seconds, track expenses, and watch your net worth grow, all without linking a bank account.",
      "Plan your debt payoff with the avalanche or snowball method, get bill reminders and see clear insights into your spending. Everything stays on your device.",
    ],
    suiteId: "everyday",
    icon: "/icons/budgetwise.png",
    theme: { primary: "#7c3aed", secondary: "#10b981", soft: "#f3effe" },
    motif: "donut",
    playUrl: playDeveloperUrl,
    stats: [{ value: "50/30/20", label: "instant budget setup" }, { value: "0", label: "bank logins needed" }, { value: "100%", label: "on-device data" }],
    features: [
      { icon: "ChartPie", title: "50/30/20 budget", body: "Set up a proven budget in seconds, then tweak it to fit your life." },
      { icon: "Receipt", title: "Expense tracking", body: "Log spending quickly, with smart categories." },
      { icon: "Landmark", title: "Net worth tracker", body: "Assets versus liabilities, so you see your real financial picture." },
      { icon: "Snowflake", title: "Debt payoff planner", body: "Avalanche and snowball strategies to become debt-free faster." },
      { icon: "Bell", title: "Bill reminders", body: "Never miss a due date again." },
      { icon: "Lock", title: "No bank linking", body: "Total privacy. Everything stays on your device and works offline." },
    ],
    howItWorks: [
      { title: "Set your income", body: "BudgetWise splits it into needs, wants and savings." },
      { title: "Track as you spend", body: "Log expenses in a tap and stay inside your plan." },
      { title: "Grow your net worth", body: "Pay down debt and watch your progress climb." },
    ],
    screens: [
      { caption: "Budget overview", kind: "chart" },
      { caption: "Expenses", kind: "list" },
      { caption: "Debt payoff plan", kind: "progress" },
      { caption: "Net worth", kind: "chart" },
    ],
    pricing: {
      free: ["Budget & expense tracking", "Bill reminders", "Basic insights"],
      pro: ["Net worth tracker", "Debt payoff planner", "Advanced insights", "No ads"],
    },
    faq: [
      { q: "Do I need to connect my bank?", a: "No. BudgetWise never asks for bank credentials. You stay in full control." },
      { q: "What is the 50/30/20 rule?", a: "It's a simple plan: 50% of income goes to needs, 30% to wants and 20% to savings or paying off debt." },
      { q: "Avalanche or snowball?", a: "Avalanche pays the highest-interest debt first and saves the most money. Snowball pays the smallest balance first and builds momentum. BudgetWise supports both." },
      { q: "Does it work offline?", a: "Yes, completely." },
      { q: "Where is my data stored?", a: "On your device. See the privacy policy for details." },
    ],
    reviews: [],
    privacyUrl: "/privacy/budgetwise/",
  },
];

// Apps in development, shown in the "In the lab" strip on the home page.
export const labApps = [
  { name: "Muslim Wise", emoji: "🕌", note: "Islamic life companion for the Gulf" },
  { name: "LifeWise", emoji: "🌟", note: "AI life coach" },
  { name: "ShishuAI", emoji: "👶", note: "AI baby care" },
  { name: "Sakinah Fit", emoji: "🌸", note: "Fitness for Muslim women" },
  { name: "MindfulMuslim", emoji: "🤲", note: "Islamic mindfulness" },
];

export function getApp(slug: string) {
  return apps.find((a) => a.slug === slug);
}

export function getSuite(id: string) {
  return suites.find((s) => s.id === id);
}

export function appsInSuite(id: SuiteId) {
  return apps.filter((a) => a.suiteId === id);
}
