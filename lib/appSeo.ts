// Search-focused copy for each app page: <title>, meta description, target keywords,
// an on-page heading + intro paragraph, and extra FAQs that answer common search questions.
import type { Faq } from "./apps";

export type AppSeo = {
  title: string; // ≤ 60 characters, primary keyword first
  description: string; // ≤ 160 characters
  keywords: string[];
  heading: string; // overview section H2
  intro: string; // keyword-rich but natural paragraph
  faq: Faq[]; // appended to the page FAQ and FAQPage schema
};

const play = "Free to download on Google Play.";

export const appSeo: Record<string, AppSeo> = {
  // ── Citizenship ────────────────────────────────────────────────────────
  "life-in-the-uk": {
    title: "Life in the UK Test 2026 Practice App: Free Mock Tests",
    description: "Practise for the Life in the UK test 2026 with handbook-based questions, timed mock tests and a readiness score. Study offline. " + play,
    keywords: ["life in the uk test", "life in the uk test 2026", "life in the uk practice test", "life in the uk mock test", "life in the uk test app", "british citizenship test", "life in the uk handbook questions", "ILR test", "settlement test uk"],
    heading: "The Life in the UK test practice app that gets you test-ready",
    intro: "Preparing for British citizenship or indefinite leave to remain (ILR)? Our Life in the UK test app covers every chapter of the official handbook with practice questions, full mock tests that match the real 24-question, 45-minute format, and a readiness score that shows when you're consistently above the 75% pass mark.",
    faq: [
      { q: "How many questions are in the Life in the UK test?", a: "The real test has 24 multiple-choice questions and you have 45 minutes to answer them. You need 18 correct answers (75%) to pass." },
      { q: "Who needs to take the Life in the UK test?", a: "Most people applying for indefinite leave to remain (settlement) or British citizenship need to pass it. Check gov.uk for the rules that apply to you." },
    ],
  },
  "us-citizenship": {
    title: "US Citizenship Test 2026 Prep: USCIS Civics Practice App",
    description: "Prepare for the USCIS naturalization civics test with practice questions, interview-style mock tests and progress tracking. Works offline.",
    keywords: ["us citizenship test", "us citizenship test 2026", "uscis civics test", "naturalization test practice", "citizenship test questions", "us citizenship test app", "civics test practice", "n-400 interview prep"],
    heading: "Practise the USCIS civics test the smart way",
    intro: "Getting ready for your naturalization interview? This US citizenship test app helps you learn the USCIS civics questions on American government, history and geography, then rehearse with mock tests so you can walk into your interview confident.",
    faq: [
      { q: "What is on the US citizenship test?", a: "The naturalization test has an English part (reading, writing and speaking) and a civics part about US history and government, asked by a USCIS officer during your interview." },
      { q: "Which version of the civics test will I take?", a: "The version depends on when you filed your N-400 application. Always confirm on uscis.gov, and practise with the question set that applies to you." },
    ],
  },
  "canadian-citizenship": {
    title: "Canadian Citizenship Test 2026: Discover Canada Practice",
    description: "Pass the Canadian citizenship test with Discover Canada practice questions, timed mock exams and topic quizzes. Study offline. " + play,
    keywords: ["canadian citizenship test", "canadian citizenship test 2026", "discover canada practice test", "canada citizenship test questions", "citizenship test canada practice", "canadian citizenship test app", "discover canada study guide"],
    heading: "Your Discover Canada study guide and practice test, in one app",
    intro: "The Canadian citizenship test is based on the Discover Canada study guide. This app turns every chapter, from Canadian history and government to symbols and regions, into practice questions, then lets you sit timed mock tests until you're passing comfortably.",
    faq: [
      { q: "How many questions are on the Canadian citizenship test?", a: "The test has 20 multiple-choice or true/false questions about Canada, and you need 15 correct answers (75%) to pass." },
      { q: "Is the Canadian citizenship test online?", a: "Most applicants now take the test online after being invited by IRCC. The questions come from the Discover Canada study guide." },
    ],
  },
  "australian-citizenship": {
    title: "Australian Citizenship Test 2026: Our Common Bond Practice",
    description: "Practise for the Australian citizenship test with Our Common Bond questions, Australian values practice and timed mock tests. " + play,
    keywords: ["australian citizenship test", "australian citizenship test 2026", "our common bond practice test", "australian citizenship practice test", "australian values questions", "australian citizenship test app", "citizenship test australia"],
    heading: "Study Our Common Bond and pass the Australian citizenship test",
    intro: "Our Australian citizenship test app covers the official Our Common Bond resource: Australia and its people, democratic beliefs, rights and liberties, government and the law, and Australian values. It gives the values questions extra practice, because you must get every one of them right.",
    faq: [
      { q: "How many questions are in the Australian citizenship test?", a: "The test has 20 multiple-choice questions, including 5 about Australian values. You need at least 75% overall and must answer all 5 values questions correctly." },
      { q: "What should I study for the Australian citizenship test?", a: "Everything in the test comes from the official Our Common Bond resource. This app turns each part of it into practice questions." },
    ],
  },
  "german-citizenship": {
    title: "Einbürgerungstest 2026: Leben in Deutschland Practice App",
    description: "Prepare for the Einbürgerungstest (Leben in Deutschland) with the official question catalogue, state questions and timed mock tests.",
    keywords: ["einbürgerungstest", "einbürgerungstest 2026", "leben in deutschland test", "german citizenship test", "einbürgerungstest fragen", "einbürgerungstest app", "310 fragen", "german naturalisation test"],
    heading: "Pass the Einbürgerungstest with confidence",
    intro: "Applying for German citizenship? Our Einbürgerungstest app helps you practise the Leben in Deutschland question catalogue, including the questions for your federal state, and lets you sit realistic mock tests with the real 33-question format.",
    faq: [
      { q: "How many questions are in the Einbürgerungstest?", a: "The test has 33 multiple-choice questions from a catalogue of 310 (300 general plus 10 for your federal state). You have 60 minutes and need 17 correct answers to pass." },
      { q: "Is the Leben in Deutschland test the same as the Einbürgerungstest?", a: "They share the same question catalogue. The Einbürgerungstest is used for naturalisation, while the Leben in Deutschland test is part of the integration course." },
    ],
  },
  "danish-citizenship": {
    title: "Danish Citizenship Test 2026: Indfødsretsprøven Practice",
    description: "Practise for Indfødsretsprøven, the Danish citizenship test, with questions on Danish history, society and culture, plus timed mock exams.",
    keywords: ["danish citizenship test", "indfødsretsprøven", "indfødsretsprøve", "denmark citizenship test", "danish citizenship test practice", "indfødsretsprøven spørgsmål", "danish citizenship test app"],
    heading: "Get ready for Indfødsretsprøven",
    intro: "Indfødsretsprøven, the Danish citizenship test, checks your knowledge of Danish society, history, culture and democratic values. This app breaks the learning material into short topic sets and timed mock exams so you can track your progress toward a pass.",
    faq: [
      { q: "What is Indfødsretsprøven?", a: "It's the citizenship test you need to pass to become a Danish citizen through naturalisation. It covers Danish society, culture, history and democratic values." },
      { q: "How should I prepare for the Danish citizenship test?", a: "Study the official learning material topic by topic, then practise with timed mock exams until you pass consistently." },
    ],
  },
  "knm-inburgering": {
    title: "KNM Exam Practice 2026: Inburgering Test Questions",
    description: "Prepare for the KNM (Kennis van de Nederlandse Maatschappij) inburgering exam with practice questions on all 8 themes and mock exams.",
    keywords: ["knm exam", "knm examen oefenen", "inburgering exam", "kennis van de nederlandse maatschappij", "knm practice test", "inburgeringsexamen knm", "dutch integration exam", "knm test questions"],
    heading: "Practise the KNM inburgering exam on every theme",
    intro: "The KNM exam (Kennis van de Nederlandse Maatschappij) is part of the Dutch civic integration exam. Our app covers the KNM themes, from work and income to healthcare, education, housing, history and Dutch norms and values, with practice questions and full mock exams.",
    faq: [
      { q: "What is the KNM exam?", a: "KNM stands for Kennis van de Nederlandse Maatschappij (knowledge of Dutch society). It's one of the parts of the inburgeringsexamen, the Dutch civic integration exam." },
      { q: "How do I practise for the KNM exam?", a: "Learn one theme at a time, review the explanations for your mistakes, then sit timed mock exams until you pass comfortably." },
    ],
  },

  // ── Driving theory ─────────────────────────────────────────────────────
  "driving-theory": {
    title: "Driving Theory Test UK 2026: DVSA Practice & Hazard App",
    description: "Pass your UK car theory test with 1,000+ DVSA-style questions, hazard perception practice, mock tests and spaced repetition. One-time unlock.",
    keywords: ["driving theory test", "driving theory test uk 2026", "theory test practice", "dvsa theory test", "hazard perception test", "uk theory test app", "car theory test", "mock theory test", "theory test revision"],
    heading: "The UK driving theory test app that helps you pass first time",
    intro: "Revise for the DVSA car theory test with 1,000+ multiple-choice questions organised by topic, hazard perception practice, road signs drills and full mock tests that match the real exam. Spaced repetition brings back the questions you're most likely to forget.",
    faq: [
      { q: "How many questions are in the UK driving theory test?", a: "The car theory test has 50 multiple-choice questions in 57 minutes, and you need 43 to pass. You also take a hazard perception part with 14 clips; the pass mark is 44 out of 75." },
      { q: "How long should I revise for the theory test?", a: "Most learners study for a few weeks. Short daily sessions with spaced repetition work better than cramming." },
    ],
  },
  "motorcycle-theory": {
    title: "Motorcycle Theory Test UK 2026: DVSA Practice App",
    description: "Revise for the UK motorcycle theory test with DVSA-style questions, hazard perception practice and timed mock tests. Study offline.",
    keywords: ["motorcycle theory test", "motorcycle theory test uk", "motorbike theory test practice", "dvsa motorcycle theory", "bike theory test app", "motorcycle hazard perception", "motorcycle mock theory test"],
    heading: "Ride into your motorcycle theory test ready",
    intro: "Our motorcycle theory test app covers the DVSA question bank for riders, from riding safety and road signs to motorcycle handling, plus hazard perception practice and mock tests that mirror the real exam.",
    faq: [
      { q: "How many questions are in the motorcycle theory test?", a: "It has 50 multiple-choice questions and you need 43 to pass, followed by a hazard perception part with a pass mark of 44 out of 75." },
      { q: "Do I need a theory test before my motorcycle test?", a: "In most cases, yes. You need a valid motorcycle theory test pass certificate before booking your practical riding tests." },
    ],
  },
  "lgv-hgv-theory": {
    title: "LGV & HGV Theory Test UK 2026: Practice App",
    description: "Pass the LGV/HGV theory test with DVSA-style multiple-choice questions, hazard perception practice and mock tests for lorry drivers.",
    keywords: ["hgv theory test", "lgv theory test", "hgv theory test practice", "lorry theory test", "hgv theory test uk 2026", "lgv multiple choice", "hgv hazard perception", "cpc theory test"],
    heading: "Your fast lane to an LGV/HGV licence",
    intro: "Training to drive lorries? This HGV theory test app covers the LGV multiple-choice question bank, including vehicle weights and dimensions, drivers' hours, loading and road safety, plus hazard perception practice and realistic mock tests.",
    faq: [
      { q: "How many questions are in the HGV theory test?", a: "The LGV multiple-choice test has 100 questions in 115 minutes and you need 85 to pass. The hazard perception part has 19 clips with a pass mark of 67 out of 100." },
      { q: "Is the HGV theory test the same as Driver CPC?", a: "The theory test is part of getting your licence. Driver CPC case studies, practical tests and ongoing training are separate requirements." },
    ],
  },
  "pcv-bus-theory": {
    title: "PCV & Bus Theory Test UK 2026: Practice App",
    description: "Revise for the PCV bus and coach theory test with DVSA-style questions, hazard perception practice and mock tests. One-time unlock.",
    keywords: ["pcv theory test", "bus theory test", "pcv theory test practice", "coach driver theory test", "pcv theory test uk 2026", "bus driver theory test app", "pcv hazard perception"],
    heading: "Get your bus and coach theory test done, first time",
    intro: "Our PCV theory test app prepares bus and coach drivers for the DVSA multiple-choice questions on passenger safety, drivers' hours, vehicle handling and the rules of the road, with hazard perception practice and timed mock tests.",
    faq: [
      { q: "How many questions are in the PCV theory test?", a: "The PCV multiple-choice test has 100 questions in 115 minutes and you need 85 to pass. The hazard perception part has a pass mark of 67 out of 100." },
      { q: "Do I need a provisional licence for the PCV theory test?", a: "Yes. You need a provisional bus and coach (category D) entitlement before you can book the theory test." },
    ],
  },

  // ── CompTIA ────────────────────────────────────────────────────────────
  "a-plus-core-1": {
    title: "CompTIA A+ Core 1 (220-1201) Practice Test App",
    description: "Prepare for CompTIA A+ Core 1 220-1201 with objective-mapped practice questions, PBQ-style drills, timed exams and weak-domain analytics.",
    keywords: ["comptia a+ core 1", "220-1201", "comptia a+ practice test", "a+ core 1 practice questions", "comptia a+ exam prep", "a+ certification app", "220-1201 practice exam"],
    heading: "CompTIA A+ Core 1 (220-1201) practice that maps to the objectives",
    intro: "Start your IT career with CompTIA A+. This Core 1 220-1201 practice app covers mobile devices, networking, hardware, virtualization and cloud, and hardware and network troubleshooting, with questions tagged to each exam objective.",
    faq: [
      { q: "What is the passing score for A+ Core 1 (220-1201)?", a: "CompTIA lists a passing score of 675 on a scale of 100 to 900, with up to 90 questions in 90 minutes. Always check comptia.org for the latest details." },
      { q: "Do I need both A+ Core 1 and Core 2?", a: "Yes. To earn the CompTIA A+ certification you must pass both Core 1 (220-1201) and Core 2 (220-1202)." },
    ],
  },
  "a-plus-core-2": {
    title: "CompTIA A+ Core 2 (220-1202) Practice Test App",
    description: "Pass CompTIA A+ Core 2 220-1202 with practice questions on operating systems, security and troubleshooting, plus timed full-length exams.",
    keywords: ["comptia a+ core 2", "220-1202", "a+ core 2 practice test", "comptia a+ 220-1202 questions", "a+ core 2 exam prep", "comptia a+ app", "220-1202 practice exam"],
    heading: "CompTIA A+ Core 2 (220-1202) practice to finish your A+",
    intro: "Complete your CompTIA A+ with this Core 2 220-1202 practice app. It covers operating systems, security, software troubleshooting and operational procedures, with PBQ-style drills and full-length timed exams.",
    faq: [
      { q: "What is the passing score for A+ Core 2 (220-1202)?", a: "CompTIA lists a passing score of 700 on a scale of 100 to 900, with up to 90 questions in 90 minutes. Check comptia.org for the latest details." },
      { q: "Should I take A+ Core 1 or Core 2 first?", a: "You can take them in either order, but many people start with Core 1 (hardware and networking) and then move on to Core 2." },
    ],
  },
  "network-plus": {
    title: "CompTIA Network+ N10-009 Practice Test App",
    description: "Prepare for CompTIA Network+ N10-009 with objective-mapped practice questions, subnetting and ports drills, PBQ-style practice and timed exams.",
    keywords: ["comptia network+", "network+ n10-009", "n10-009 practice test", "network+ practice questions", "network plus exam prep", "comptia network+ app", "subnetting practice"],
    heading: "Master networking for CompTIA Network+ (N10-009)",
    intro: "This Network+ N10-009 practice app covers networking concepts, implementation, operations, security and troubleshooting, with flashcards for ports and protocols and analytics that show which domains still need work.",
    faq: [
      { q: "What is the passing score for Network+ N10-009?", a: "CompTIA lists a passing score of 720 on a scale of 100 to 900, with up to 90 questions in 90 minutes. Check comptia.org for the latest details." },
      { q: "Is Network+ worth it before Security+?", a: "Network+ gives you the networking foundation that Security+ builds on, so many people take it first." },
    ],
  },
  "security-plus": {
    title: "CompTIA Security+ SY0-701 Practice Test App",
    description: "Pass CompTIA Security+ SY0-701 with objective-mapped practice questions, PBQ-style drills, timed full exams and weak-domain analytics.",
    keywords: ["comptia security+", "security+ sy0-701", "sy0-701 practice test", "security+ practice questions", "security plus exam prep", "comptia security+ app", "sy0-701 exam"],
    heading: "CompTIA Security+ (SY0-701) practice that finds your weak spots",
    intro: "Our Security+ SY0-701 practice app covers general security concepts, threats, vulnerabilities and mitigations, security architecture, security operations and security program management, with full-length timed exams and domain-by-domain analytics.",
    faq: [
      { q: "What is the passing score for Security+ SY0-701?", a: "CompTIA lists a passing score of 750 on a scale of 100 to 900, with up to 90 questions in 90 minutes. Check comptia.org for the latest details." },
      { q: "How long does it take to study for Security+?", a: "It depends on your experience. Many people study for 4 to 8 weeks and use practice exams to check when they're ready." },
    ],
  },
  "cysa-plus": {
    title: "CompTIA CySA+ CS0-004 Practice Test App",
    description: "Prepare for CompTIA CySA+ CS0-004 with scenario-based practice on security operations, vulnerability management and incident response.",
    keywords: ["comptia cysa+", "cysa+ cs0-004", "cysa+ practice test", "cysa+ practice questions", "cybersecurity analyst exam prep", "comptia cysa+ app", "cs0-004 exam"],
    heading: "Think like a security analyst for CompTIA CySA+",
    intro: "This CySA+ practice app prepares you for the cybersecurity analyst exam with scenario-based questions on security operations, vulnerability management, incident response and reporting and communication, plus timed full-length practice exams.",
    faq: [
      { q: "What does CompTIA CySA+ cover?", a: "CySA+ focuses on security operations, vulnerability management, incident response and reporting. It's aimed at security analysts with some hands-on experience." },
      { q: "Should I take Security+ before CySA+?", a: "CompTIA recommends having Security+ (or equivalent knowledge) and some hands-on experience before attempting CySA+." },
    ],
  },

  // ── Little Sparks (kids) ───────────────────────────────────────────────
  dreamnest: {
    title: "DreamNest AI: Personalised Bedtime Stories for Kids",
    description: "AI bedtime stories starring your child: their name, favourite things and a gentle lesson every night, with soothing narration. Rated 5.0★ on Google Play.",
    keywords: ["bedtime stories app", "ai bedtime stories", "personalised bedtime stories", "bedtime stories for kids", "sleep stories for children", "ai story generator for kids", "kids bedtime story app"],
    heading: "Personalised AI bedtime stories that help kids fall asleep",
    intro: "DreamNest AI is a bedtime story app that creates a brand-new, personalised story every night. Your child is the hero, their favourite characters join in, and a gentle lesson and calming ending help little ones drift off. Turn on narration for a soothing read-aloud.",
    faq: [
      { q: "Can AI make a bedtime story with my child's name?", a: "Yes. DreamNest AI writes a unique story around your child's name, age and interests, and you can pick tonight's mood." },
      { q: "Is there a bedtime story app that reads stories aloud?", a: "DreamNest AI includes soothing narration that reads each story aloud in a calm, sleep-friendly voice." },
    ],
  },
  brightkids: {
    title: "BrightKids: ABC, Numbers & Shapes Learning Games for Kids",
    description: "Fun early learning games for toddlers and preschoolers: alphabet, phonics, numbers, counting, shapes and colours. Kid-safe. " + play,
    keywords: ["kids learning app", "abc learning games", "toddler learning app", "preschool learning games", "learn numbers for kids", "shapes and colours game", "phonics for kids", "educational games for toddlers"],
    heading: "Learning games for toddlers and preschoolers",
    intro: "BrightKids is an early learning app for children aged about 2 to 6. Playful mini-games teach the alphabet and phonics, numbers and counting, and shapes and colours, with big buttons, friendly sounds and lots of praise.",
    faq: [
      { q: "What is a good learning app for toddlers?", a: "Look for short, simple games with big controls and no distractions. BrightKids covers letters, numbers, shapes and colours in a kid-safe space." },
      { q: "Can BrightKids teach my child the alphabet?", a: "Yes. Letter games combine sounds, tracing and matching to help children recognise letters and learn phonics." },
    ],
  },

  // ── Noor (Islamic) ─────────────────────────────────────────────────────
  ilmai: {
    title: "IlmAI: Islamic AI Q&A with Quran & Hadith References",
    description: "Ask questions about Islam and get clear answers that cite the Quran and Hadith, in Bangla, English and Indonesian. Madhab-aware.",
    keywords: ["islamic ai app", "islamic questions and answers", "ask islamic questions", "quran and hadith app", "islamic chatbot", "muslim ai assistant", "islamic app bangla", "hadith search app"],
    heading: "An Islamic AI companion with Quran and Hadith sources",
    intro: "IlmAI is an Islamic Q&A app. Ask questions about worship, faith and daily life, and get respectful, easy-to-understand answers with references to the Quran and Hadith. It works in Bangla, English and Indonesian.",
    faq: [
      { q: "Is there an app to ask Islamic questions?", a: "IlmAI lets you ask questions about Islam in natural language and gives answers with Quran and Hadith references you can check yourself." },
      { q: "Does IlmAI support Bangla?", a: "Yes. IlmAI supports Bangla, English and Indonesian for both questions and answers." },
    ],
  },

  // ── Everyday Essentials ────────────────────────────────────────────────
  sleepwise: {
    title: "SleepWise: AI Sleep Coach & CBT-I Insomnia App",
    description: "Sleep better with an AI sleep coach based on CBT-I: a personal sleep plan, sleep diary, breathwork and insights. Available in 176 countries.",
    keywords: ["sleep coach app", "cbt-i app", "insomnia app", "ai sleep coach", "sleep diary app", "how to fall asleep faster", "sleep improvement app", "breathing exercises for sleep"],
    heading: "A CBT-I based AI sleep coach for better nights",
    intro: "SleepWise is a sleep coach app built on Cognitive Behavioral Therapy for Insomnia (CBT-I). Log your nights in a quick sleep diary and get a personal sleep plan, wind-down routine and relaxation sessions to help you fall asleep faster and stay asleep.",
    faq: [
      { q: "What is CBT-I?", a: "Cognitive Behavioral Therapy for Insomnia is a structured, evidence-based approach that changes the habits and thoughts that keep you awake." },
      { q: "Can an app help with insomnia?", a: "Apps based on CBT-I techniques can help you build better sleep habits. For ongoing or severe sleep problems, speak to a doctor." },
    ],
  },
  "mental-math": {
    title: "Mental Math Master: Brain Training & Math Games",
    description: "Get faster at mental arithmetic with 150+ levels across 4 worlds, Speed Run mode, daily streaks and a global leaderboard. " + play,
    keywords: ["mental math app", "math games", "brain training app", "mental arithmetic practice", "times tables game", "math speed training", "math puzzle game", "learn mental math"],
    heading: "Brain training and math games that make you faster",
    intro: "Mental Math Master is a math game and brain training app with 150+ levels across 4 worlds. Practise addition, subtraction, multiplication and division, race the clock in Speed Run mode and climb the global leaderboard.",
    faq: [
      { q: "How can I get faster at mental math?", a: "Short, regular practice is the key. Timed rounds and daily streaks in Mental Math Master build speed and accuracy over time." },
      { q: "Is Mental Math Master good for kids?", a: "Yes. Older kids can use it to practise times tables and arithmetic, and adults use it for brain training." },
    ],
  },
  arrowgo: {
    title: "ArrowGo: Swipe Maze Puzzle Game, Rated 4.8★",
    description: "A relaxing swipe puzzle: guide the arrow through hundreds of mazes in the fewest moves. One-finger play, works offline. Rated 4.8★ on Google Play.",
    keywords: ["maze puzzle game", "swipe puzzle game", "arrow puzzle", "offline puzzle game", "brain puzzle game", "relaxing puzzle game", "logic maze game"],
    heading: "A relaxing swipe maze puzzle you can play offline",
    intro: "ArrowGo is a swipe puzzle game where you slide an arrow through twisting mazes to reach the goal. Hundreds of levels, calm one-finger play and three-star solves make it a great offline brain puzzle for all ages.",
    faq: [
      { q: "Is ArrowGo an offline game?", a: "Yes. Every level works without an internet connection, so it's perfect for flights and commutes." },
      { q: "Is ArrowGo suitable for kids?", a: "Yes. It's a calm, non-violent logic puzzle game for all ages." },
    ],
  },
  renu: {
    title: "Renu: Subscription Tracker, No Bank Linking",
    description: "Track every subscription in one place, get reminders before renewals and see your monthly and yearly totals. No bank login. Pro is $2.99 one-time.",
    keywords: ["subscription tracker", "subscription manager app", "track subscriptions", "cancel subscriptions", "renewal reminder app", "recurring payments tracker", "subscription tracker no bank"],
    heading: "Track and cut your subscriptions, privately",
    intro: "Renu is a subscription tracker that keeps streaming, software, gym and other recurring payments in one list. It shows your monthly and yearly spend and reminds you before anything renews, without ever linking your bank account.",
    faq: [
      { q: "How do I keep track of all my subscriptions?", a: "Add each subscription to a tracker like Renu once. It totals your monthly and yearly costs and reminds you before every renewal." },
      { q: "Is there a subscription tracker without bank linking?", a: "Yes. Renu never asks for bank credentials. You add subscriptions yourself, and your data stays on your device." },
    ],
  },
  budgetwise: {
    title: "BudgetWise: Budget Planner & Expense Tracker App",
    description: "Private budgeting with a 50/30/20 planner, expense tracker, net worth and debt payoff (avalanche or snowball). No bank linking. " + play,
    keywords: ["budget app", "expense tracker", "budget planner", "50/30/20 budget", "debt payoff planner", "net worth tracker", "budget app no bank", "money manager app"],
    heading: "A private budget planner and expense tracker",
    intro: "BudgetWise is a budgeting app that sets up a 50/30/20 budget in seconds, tracks your expenses, follows your net worth and plans your debt payoff with the avalanche or snowball method. All of it works without linking a bank account.",
    faq: [
      { q: "What is the 50/30/20 budget rule?", a: "It's a simple plan where 50% of income goes to needs, 30% to wants and 20% to savings or paying off debt." },
      { q: "Is there a budget app that doesn't connect to my bank?", a: "Yes. BudgetWise works without bank linking, so you stay in control and your data stays on your device." },
    ],
  },
};
