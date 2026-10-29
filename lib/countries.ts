// Country hub pages at /tests/<id>/: every free test, guide and app for one country.
import type { Faq } from "./apps";

export type Country = {
  id: string;
  name: string;
  flag: string;
  color: string;
  title: string; // SEO title, max ~60 chars
  description: string; // meta description, max 160 chars
  intro: string;
  apps: string[]; // app slugs with free tests, most important first
  localPage?: { href: string; label: string };
  faq: Faq[];
};

export const countries: Country[] = [
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    color: "#c8102e",
    title: "UK Practice Tests 2026: Life in the UK & Theory Tests",
    description: "Free UK practice tests: Life in the UK mock test plus car, motorcycle, LGV and bus theory tests. Instant scores and explanations, no sign-up.",
    intro:
      "Moving to the UK or learning to drive here? Practise for the Life in the UK test and every DVSA theory test for free, right in your browser. Each test follows the real format, so you know exactly where you stand before you book.",
    apps: ["life-in-the-uk", "driving-theory", "motorcycle-theory", "lgv-hgv-theory", "pcv-bus-theory"],
    faq: [
      { q: "Which test do I need to settle in the UK?", a: "Most adults applying for settlement or British citizenship need to pass the Life in the UK test. There's a separate English language requirement too, so check GOV.UK for what applies to you." },
      { q: "Which theory test do I need?", a: "Car learners take the car theory test. Motorcyclists, lorry drivers and bus or coach drivers each take their own theory test with different questions." },
      { q: "Are these the official tests?", a: "No. These are independent practice tests that follow the official format. Book the real tests on GOV.UK." },
    ],
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    color: "#1d4ed8",
    title: "US Citizenship Practice Test 2026: Free Civics Test",
    description: "Free US citizenship practice: civics mock test, readiness check and practice by topic for your naturalization interview. No sign-up.",
    intro:
      "Getting ready for your naturalization interview? Practise the civics questions for free, check how ready you are, and learn what happens on the day. Plus free practice for CompTIA certifications, popular with US employers.",
    apps: ["us-citizenship", "security-plus", "a-plus-core-1", "a-plus-core-2", "network-plus", "cysa-plus"],
    faq: [
      { q: "What's in the US naturalization test?", a: "It has two parts: a civics test about American government and history, and an English test covering reading, writing and speaking." },
      { q: "Is the civics test multiple choice?", a: "No. A USCIS officer asks the questions at your interview and you answer out loud. Practising with multiple-choice questions is still a great way to learn the answers." },
      { q: "Are these official USCIS tests?", a: "No. They're independent practice tests. Check uscis.gov for the official question list and the test version that applies to you." },
    ],
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    color: "#d52b1e",
    title: "Canadian Citizenship Practice Test 2026 (Free)",
    description: "Free Canadian citizenship practice test: 20 questions in the real format, a readiness check and practice by topic from Discover Canada.",
    intro:
      "Preparing to become a Canadian citizen? Practise for the citizenship test for free with questions based on Discover Canada, the official study guide, and find out how close you are to passing.",
    apps: ["canadian-citizenship"],
    faq: [
      { q: "Who takes the Canadian citizenship test?", a: "Applicants aged 18 to 54 when they apply for citizenship." },
      { q: "Can I take the test in French?", a: "Yes, you can take it in English or French." },
      { q: "What should I study?", a: "Everything in the test comes from Discover Canada, the official study guide, so read it cover to cover." },
    ],
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    color: "#012169",
    title: "Australian Citizenship Practice Test 2026 (Free)",
    description: "Free Australian citizenship practice test: 20 questions in the real format, including values questions, plus a readiness check and topic practice.",
    intro:
      "Applying for Australian citizenship? Practise for the test for free with questions based on Our Common Bond, and make sure you're confident on the five values questions you must get right.",
    apps: ["australian-citizenship"],
    faq: [
      { q: "Who needs to sit the citizenship test?", a: "Most applicants aged 18 to 59 applying for citizenship by conferral." },
      { q: "What's the pass mark?", a: "You need 75% overall, and you must answer all five Australian values questions correctly." },
      { q: "What should I study?", a: "All questions are based on the official resource, Australian Citizenship: Our Common Bond." },
    ],
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    color: "#dd0000",
    title: "Einbürgerungstest Practice 2026: Free German Test",
    description: "Free Einbürgerungstest practice: a 33-question mock test in the real format, a readiness check and practice by topic. Auf Deutsch verfügbar.",
    intro:
      "Applying for German citizenship? Practise for the Einbürgerungstest for free with a mock test in the real format: 33 questions, 60 minutes and 17 to pass. Every question comes from the official catalogue.",
    apps: ["german-citizenship"],
    localPage: { href: "/german-citizenship/de/", label: "🇩🇪 Auf Deutsch lesen" },
    faq: [
      { q: "Do I need the Einbürgerungstest for citizenship?", a: "Most people applying for German citizenship need to pass it. A German school-leaving qualification can count instead." },
      { q: "Is the test in German?", a: "Yes. The questions are in German, so practise reading them carefully." },
      { q: "Where do I take it?", a: "At a BAMF-approved test centre, often your local Volkshochschule (VHS)." },
    ],
  },
  {
    id: "denmark",
    name: "Denmark",
    flag: "🇩🇰",
    color: "#c60c30",
    title: "Danish Citizenship Test Practice 2026 (Free)",
    description: "Free practice for the Danish citizenship test (Indfødsretsprøven): mock test, readiness check and practice by topic. På dansk også.",
    intro:
      "Applying for Danish citizenship? Practise for Indfødsretsprøven for free, covering Danish society, culture, history and values, and see how ready you are before the next test date.",
    apps: ["danish-citizenship"],
    localPage: { href: "/danish-citizenship/da/", label: "🇩🇰 Læs på dansk" },
    faq: [
      { q: "What is the Danish citizenship test called?", a: "Indfødsretsprøven. It checks your knowledge of Danish society, culture, history and values." },
      { q: "Is the test in Danish?", a: "Yes, the test is in Danish." },
      { q: "When is it held?", a: "On set dates during the year. Check the official site for the next date and sign-up deadline." },
    ],
  },
  {
    id: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    color: "#ae1c28",
    title: "KNM Exam Practice 2026: Free Inburgering Test",
    description: "Free KNM practice for the Dutch civic integration (inburgering) exam: mock test, readiness check and practice by topic. Ook in het Nederlands.",
    intro:
      "Doing your civic integration in the Netherlands? Practise for the KNM exam (Kennis van de Nederlandse Maatschappij) for free, covering work, healthcare, housing, education and Dutch history.",
    apps: ["knm-inburgering"],
    localPage: { href: "/knm-inburgering/nl/", label: "🇳🇱 Lees in het Nederlands" },
    faq: [
      { q: "What is the KNM exam?", a: "KNM stands for Kennis van de Nederlandse Maatschappij (knowledge of Dutch society). It's part of the civic integration exam." },
      { q: "How do I book it?", a: "You book with DUO, logging in with your DigiD." },
      { q: "Is the exam in Dutch?", a: "Yes, the exam is in Dutch at a basic level." },
    ],
  },
];

export const getCountry = (id: string) => countries.find((c) => c.id === id);
