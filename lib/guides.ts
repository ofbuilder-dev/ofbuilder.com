// Exam guides: what the test is, the format, how to book, the day itself and a study plan.
// Facts are kept to what official sources publish; every guide links the official page and tells
// readers to check it before booking, because fees and rules change.
import type { Faq } from "./apps";

export type Guide = {
  examName: string;
  title: string; // SEO title, max ~60 chars
  description: string; // meta description, max ~160 chars
  intro: string;
  who: string;
  facts: [string, string][];
  official: { label: string; url: string };
  steps: { title: string; body: string }[];
  onTheDay: string[];
  tips: string[];
  faq: Faq[];
};

const UPDATED = "2026";

const citizenship: Record<string, Guide> = {
  "life-in-the-uk": {
    examName: "Life in the UK test",
    title: `Life in the UK Test ${UPDATED}: Format, Booking & How to Pass`,
    description: "Everything about the Life in the UK test: 24 questions, 45 minutes, pass mark 18, how to book, what to bring and a free study plan.",
    intro: "The Life in the UK test checks your knowledge of British traditions, history, law and government. You need to pass it for settlement (indefinite leave to remain) and for British citizenship.",
    who: "Most people aged 18 to 64 applying for settlement or British citizenship. People under 18 or aged 65 and over usually don't need to take it.",
    facts: [
      ["Questions", "24 multiple choice"],
      ["Time", "45 minutes"],
      ["Pass mark", "18 correct (75%)"],
      ["Study book", "Life in the United Kingdom: A Guide for New Residents"],
      ["Where", "Approved test centres across the UK"],
    ],
    official: { label: "GOV.UK: Life in the UK test", url: "https://www.gov.uk/life-in-the-uk-test" },
    steps: [
      { title: "Study the official handbook", body: "Every question comes from the handbook, so learn its chapters on values, history, society and government." },
      { title: "Book online at least 3 days ahead", body: "Book on GOV.UK. You need an email address, a debit or credit card and the ID you'll bring on the day." },
      { title: "Sit the test", body: "You answer 24 questions on a computer. You get your result before you leave the centre." },
      { title: "Use your unique reference number", body: "If you pass, you get a unique reference number to use in your settlement or citizenship application." },
    ],
    onTheDay: ["Bring the same ID you used to book", "Arrive early: you can't sit the test if you're late", "Phones and bags are stored away during the test"],
    tips: ["Dates and numbers come up often: learn key years, monarchs and battles", "Take timed mock tests until you score 20+ every time", "Review every wrong answer and the handbook section it came from"],
    faq: [
      { q: "Can I retake the Life in the UK test if I fail?", a: "Yes. You have to wait at least 7 days, and you pay the fee again each time you book." },
      { q: "How long is a Life in the UK test pass valid?", a: "A pass doesn't expire. Keep your unique reference number for your applications." },
    ],
  },
  "us-citizenship": {
    examName: "US citizenship civics test",
    title: `US Citizenship Test ${UPDATED}: Civics Format & How to Pass`,
    description: "How the US naturalization civics test works, how many questions you must answer correctly, what happens at the interview and a free study plan.",
    intro: "The civics test is part of your naturalization interview with USCIS. An officer asks you questions about American government and history, and you answer out loud.",
    who: "Most applicants for US citizenship (Form N-400). Some older, long-term residents can study fewer questions or take the test in their own language.",
    facts: [
      ["Format", "Spoken questions at your USCIS interview"],
      ["Questions", "Up to 20 asked from the official list"],
      ["To pass", "12 correct answers"],
      ["Also tested", "English reading, writing and speaking"],
      ["Retake", "One retest if you fail part of the test"],
    ],
    official: { label: "USCIS: Citizenship Resource Center", url: "https://www.uscis.gov/citizenship" },
    steps: [
      { title: "File Form N-400", body: "Apply online or by mail. USCIS then schedules your biometrics and interview." },
      { title: "Learn the official civics questions", body: "USCIS publishes the full list of questions and answers. Learn every one: you don't know which you'll get." },
      { title: "Attend your interview", body: "The officer reviews your application and gives you the English and civics tests." },
      { title: "Take the Oath of Allegiance", body: "If you pass and your application is approved, you're invited to a naturalization ceremony." },
    ],
    onTheDay: ["Bring your interview notice and green card", "Bring the documents listed in your notice", "Answer clearly; you can ask the officer to repeat a question"],
    tips: ["Practise answering out loud, not just reading", "Some answers change (like who your senators are): check them before the interview", "Mix civics practice with reading and writing the vocabulary lists"],
    faq: [
      { q: "Which version of the civics test will I take?", a: "It depends on when you filed your N-400. Check USCIS's website for the version that applies to you." },
      { q: "What if I fail the civics test?", a: "You get one more chance, usually at a second interview within 60 to 90 days." },
    ],
  },
  "canadian-citizenship": {
    examName: "Canadian citizenship test",
    title: `Canadian Citizenship Test ${UPDATED}: Format & How to Pass`,
    description: "The Canadian citizenship test explained: 20 questions, 45 minutes, 15 to pass, the Discover Canada guide, the online test and a free study plan.",
    intro: "The citizenship test checks what you know about Canada's history, geography, economy, government, laws and symbols. Everything comes from the official guide, Discover Canada.",
    who: "Applicants aged 18 to 54 when they apply for Canadian citizenship.",
    facts: [
      ["Questions", "20, multiple choice and true or false"],
      ["Time", "45 minutes"],
      ["Pass mark", "15 correct (75%)"],
      ["Study guide", "Discover Canada"],
      ["Where", "Usually online, after IRCC invites you"],
    ],
    official: { label: "IRCC: Citizenship test", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship.html" },
    steps: [
      { title: "Apply for citizenship", body: "Submit your application to IRCC. The test invitation comes after it's processed." },
      { title: "Study Discover Canada", body: "Read the guide cover to cover. Questions can come from any chapter." },
      { title: "Take the test when invited", body: "Most people take it online within the deadline in their invitation." },
      { title: "Attend your ceremony", body: "After you pass and your application is approved, you take the Oath of Citizenship." },
    ],
    onTheDay: ["Use a computer with a webcam, in a quiet room", "Have your ID ready", "No notes, books or help are allowed during the test"],
    tips: ["Learn the roles in government: Prime Minister, Governor General, MPs", "Know your own province or territory's details", "Practise until you score 17 or more out of 20"],
    faq: [
      { q: "What happens if I fail the Canadian citizenship test?", a: "IRCC will usually invite you to take it again. If you don't pass after that, you may be asked to an interview with an official." },
      { q: "Is the test only in English?", a: "You can take it in English or French." },
    ],
  },
  "australian-citizenship": {
    examName: "Australian citizenship test",
    title: `Australian Citizenship Test ${UPDATED}: Format & How to Pass`,
    description: "The Australian citizenship test explained: 20 questions, 45 minutes, 75% plus all 5 values questions, Our Common Bond and a free study plan.",
    intro: "The citizenship test checks your knowledge of Australia and of the responsibilities and privileges of citizenship. All questions are based on the official resource, Australian Citizenship: Our Common Bond.",
    who: "Most applicants aged 18 to 59 applying for citizenship by conferral.",
    facts: [
      ["Questions", "20 multiple choice"],
      ["Time", "45 minutes"],
      ["Pass mark", "75%, and all 5 values questions correct"],
      ["Study book", "Australian Citizenship: Our Common Bond"],
      ["Where", "At your citizenship appointment"],
    ],
    official: { label: "Home Affairs: Citizenship test", url: "https://immi.homeaffairs.gov.au/citizenship" },
    steps: [
      { title: "Apply for citizenship", body: "Apply online. You'll be invited to an appointment to sit the test." },
      { title: "Study Our Common Bond", body: "Pay special attention to the Australian values section: you must get every values question right." },
      { title: "Attend your appointment", body: "Bring your original identity documents. You take the test on a computer." },
      { title: "Make the pledge", body: "Once approved, you make the Australian Citizenship Pledge at a ceremony." },
    ],
    onTheDay: ["Bring the original documents listed in your appointment letter", "Arrive on time", "You can't use notes or a phone"],
    tips: ["Treat the values chapter as a must-know", "Learn the three levels of government and what each does", "Take mock tests until you pass with room to spare"],
    faq: [
      { q: "Can I fail the test even with 75%?", a: "Yes. You must also answer all five Australian values questions correctly." },
      { q: "Can I resit if I fail?", a: "Yes, you can usually resit. Check the Home Affairs website for the current rules." },
    ],
  },
  "german-citizenship": {
    examName: "Einbürgerungstest",
    title: `Einbürgerungstest ${UPDATED}: Format, 310 Questions & How to Pass`,
    description: "The German citizenship test (Einbürgerungstest) explained: 33 questions, 60 minutes, 17 to pass, the official question catalogue and a free study plan.",
    intro: "The Einbürgerungstest checks your knowledge of the legal and social order and living conditions in Germany. Questions come from an official catalogue published by the BAMF.",
    who: "Most people applying for German citizenship (naturalisation). A German school-leaving qualification can count instead.",
    facts: [
      ["Questions", "33 (30 general + 3 about your state)"],
      ["Time", "60 minutes"],
      ["Pass mark", "17 correct"],
      ["Question catalogue", "310 questions (300 general + 10 per state)"],
      ["Where", "BAMF-approved test centres, often a Volkshochschule"],
    ],
    official: { label: "BAMF: Einbürgerungstest", url: "https://www.bamf.de/" },
    steps: [
      { title: "Find a test centre", body: "Register at an approved test centre near you, often your local Volkshochschule (VHS)." },
      { title: "Learn the question catalogue", body: "All questions come from the published catalogue, so practise all 300 general questions and your state's 10." },
      { title: "Sit the test", body: "You answer 33 multiple-choice questions in 60 minutes." },
      { title: "Get your certificate", body: "If you pass, you receive a certificate to include with your naturalisation application." },
    ],
    onTheDay: ["Bring a valid passport or ID card", "Bring your registration confirmation", "Phones are switched off and put away"],
    tips: ["Practise the state questions for where you live", "Read each question carefully: options can look very similar", "Aim for 25+ correct in practice to pass comfortably"],
    faq: [
      { q: "Is the Einbürgerungstest the same as Leben in Deutschland?", a: "They use the same question catalogue, but the pass mark for citizenship is 17 out of 33." },
      { q: "Can I retake the Einbürgerungstest?", a: "Yes, you can register again if you don't pass." },
    ],
  },
  "danish-citizenship": {
    examName: "Danish citizenship test (Indfødsretsprøven)",
    title: `Danish Citizenship Test ${UPDATED}: Indfødsretsprøven Guide`,
    description: "How the Danish citizenship test (Indfødsretsprøven) works, how to sign up, what it covers and a free study plan with practice questions.",
    intro: "Indfødsretsprøven is the Danish citizenship test. It checks your knowledge of Danish society, culture, history and democratic values.",
    who: "Most adults applying for Danish citizenship by naturalisation.",
    facts: [
      ["Format", "Written multiple-choice test"],
      ["Covers", "Society, culture, history and Danish values"],
      ["When", "Held on set dates during the year"],
      ["Sign-up", "Through an approved language centre"],
      ["Rules", "Check the official site for the current question count and pass mark"],
    ],
    official: { label: "Danish Ministry: Citizenship test", url: "https://uim.dk/" },
    steps: [
      { title: "Check the next test date", body: "The test runs on fixed dates, so find the next one and the sign-up deadline." },
      { title: "Sign up at a language centre", body: "Register and pay the fee before the deadline." },
      { title: "Study the official material", body: "Use the published study material and practise with mock tests." },
      { title: "Sit the test", body: "Take the test on the day and keep your certificate for your application." },
    ],
    onTheDay: ["Bring valid photo ID", "Arrive early", "No aids or phones are allowed"],
    tips: ["Learn Danish values questions carefully", "Practise reading questions in Danish", "Take timed mock tests"],
    faq: [
      { q: "How often is the Danish citizenship test held?", a: "It's held on set dates during the year. Check the official site for the next one." },
      { q: "Is the test in Danish?", a: "Yes, the test is in Danish." },
    ],
  },
  "knm-inburgering": {
    examName: "KNM exam",
    title: `KNM Exam ${UPDATED}: Knowledge of Dutch Society Guide`,
    description: "What the KNM exam (Kennis van de Nederlandse Maatschappij) covers, how to book it with DUO, what happens on the day and a free study plan.",
    intro: "KNM (Kennis van de Nederlandse Maatschappij) is the knowledge of Dutch society part of the civic integration (inburgering) exam. It covers work, health, housing, education, history and Dutch norms and values.",
    who: "People who must complete civic integration in the Netherlands.",
    facts: [
      ["Format", "Computer-based multiple-choice exam"],
      ["Covers", "Work, healthcare, housing, education, history, politics and values"],
      ["Organised by", "DUO"],
      ["Booking", "Online with DigiD"],
      ["Rules", "Check inburgeren.nl for the current format and pass mark"],
    ],
    official: { label: "Inburgeren.nl: KNM exam", url: "https://www.inburgeren.nl/en/" },
    steps: [
      { title: "Check your requirements", body: "Find out which civic integration exams you need on inburgeren.nl." },
      { title: "Book with DUO", body: "Log in with DigiD and choose a date and location." },
      { title: "Study the topics", body: "Practise questions on every KNM topic, from healthcare to history." },
      { title: "Take the exam", body: "Your result appears in your DUO account." },
    ],
    onTheDay: ["Bring a valid ID", "Arrive on time", "Phones must be switched off"],
    tips: ["Read situations carefully: many questions describe everyday scenarios", "Learn how Dutch institutions work (gemeente, huisarts, UWV)", "Practise under time pressure"],
    faq: [
      { q: "Is the KNM exam in Dutch?", a: "Yes, the exam is in Dutch at a basic level." },
      { q: "Can I retake the KNM exam?", a: "Yes, you can book the exam again if you don't pass." },
    ],
  },
};

const carFacts: [string, string][] = [
  ["Multiple choice", "50 questions in 57 minutes"],
  ["Pass mark", "43 out of 50"],
  ["Hazard perception", "14 video clips, pass mark 44 out of 75"],
  ["Certificate", "Valid for 2 years"],
  ["You need", "A provisional driving licence"],
];

function theory(vehicle: string, facts: [string, string][], extra: Partial<Guide> = {}): Guide {
  const name = `${vehicle} theory test`;
  return {
    examName: `UK ${name}`,
    title: `UK ${vehicle} Theory Test ${UPDATED}: Format, Pass Mark & Booking`,
    description: `The UK ${name} explained: questions, pass marks, hazard perception, how to book with DVSA and a free study plan with mock tests.`,
    intro: `The ${name} has two parts: multiple-choice questions and hazard perception. You must pass both parts at the same sitting to get your certificate.`,
    who: `Anyone learning to drive a ${vehicle.toLowerCase()} in Great Britain who needs a theory pass before the practical test.`,
    facts,
    official: { label: "GOV.UK: Book your theory test", url: "https://www.gov.uk/book-theory-test" },
    steps: [
      { title: "Get your provisional licence", body: "You need a provisional licence number to book." },
      { title: "Book online with DVSA", body: "Choose a test centre and date on GOV.UK. Only use the official site to avoid extra fees." },
      { title: "Study and take mock tests", body: "Work through every topic, then practise timed mocks and hazard perception clips." },
      { title: "Sit the test", body: "You get your result at the centre. Your pass certificate lasts 2 years." },
    ],
    onTheDay: ["Bring your photocard provisional licence", "Arrive in good time", "You can do a short practice session before each part"],
    tips: ["Learn stopping distances and road signs: they come up often", "In hazard perception, click when a hazard starts to develop, not before", "Score 47+ in mocks before you book"],
    faq: [
      { q: "What happens if I pass one part and fail the other?", a: "You have to take both parts again. You can rebook after 3 working days." },
      { q: "How long is a theory test pass valid?", a: "2 years. You need to pass your practical test within that time." },
    ],
    ...extra,
  };
}

const heavyFacts: [string, string][] = [
  ["Multiple choice", "100 questions in 1 hour 55 minutes"],
  ["Pass mark", "85 out of 100"],
  ["Hazard perception", "19 video clips, pass mark 67 out of 100"],
  ["Also needed", "Driver CPC case studies if you drive professionally"],
  ["Certificate", "Valid for 2 years"],
];

function comptia(exam: string, code: string, facts: [string, string][], about: string): Guide {
  return {
    examName: `CompTIA ${exam} (${code})`,
    title: `CompTIA ${exam} ${code} Exam ${UPDATED}: Format & Study Plan`,
    description: `CompTIA ${exam} ${code} explained: number of questions, time limit, passing score, domains, how to book with Pearson VUE and a free study plan.`,
    intro: about,
    who: "IT professionals and career changers who want a vendor-neutral certification recognised by employers worldwide.",
    facts,
    official: { label: `CompTIA: ${exam}`, url: "https://www.comptia.org/certifications" },
    steps: [
      { title: "Check the exam objectives", body: "Download the official objectives from CompTIA. They list every topic the exam can cover." },
      { title: "Buy a voucher", body: "Buy an exam voucher from CompTIA or an authorised partner." },
      { title: "Book with Pearson VUE", body: "Sit the exam at a test centre or online from home with OnVUE." },
      { title: "Get your result", body: "You see your score straight after the exam. Certifications are valid for 3 years." },
    ],
    onTheDay: ["Bring government-issued photo ID", "For online exams, check your computer and room in advance", "Flag hard questions and come back to them"],
    tips: ["Do performance-based questions (PBQs) last if they're slowing you down", "Focus on the domains with the highest weighting", "Score 85%+ consistently in practice before you book"],
    faq: [
      { q: `How hard is the ${exam} exam?`, a: "Most people need a few weeks of focused study. Practice exams show you when you're ready." },
      { q: "How long is a CompTIA certification valid?", a: "3 years. You can renew it with continuing education or a higher certification." },
    ],
  };
}

const cfacts = (score: string): [string, string][] => [
  ["Questions", "Up to 90 (multiple choice and PBQs)"],
  ["Time", "90 minutes"],
  ["Passing score", `${score} on a 100 to 900 scale`],
  ["Where", "Pearson VUE centre or online"],
  ["Valid for", "3 years"],
];

export const guides: Record<string, Guide> = {
  ...citizenship,
  "driving-theory": theory("Car", carFacts),
  "motorcycle-theory": theory("Motorcycle", carFacts),
  "lgv-hgv-theory": theory("LGV", heavyFacts),
  "pcv-bus-theory": theory("PCV", heavyFacts),
  "a-plus-core-1": comptia("A+ Core 1", "220-1201", cfacts("675"), "A+ Core 1 is the first of the two A+ exams. It covers mobile devices, networking, hardware, virtualisation and cloud, and hardware and network troubleshooting."),
  "a-plus-core-2": comptia("A+ Core 2", "220-1202", cfacts("700"), "A+ Core 2 is the second A+ exam. It covers operating systems, security, software troubleshooting and operational procedures."),
  "network-plus": comptia("Network+", "N10-009", cfacts("720"), "Network+ proves you can design, configure, manage and troubleshoot wired and wireless networks."),
  "security-plus": comptia("Security+", "SY0-701", cfacts("750"), "Security+ is the most popular entry-level cybersecurity certification. It covers threats, security architecture, operations and governance."),
  "cysa-plus": comptia(
    "CySA+",
    "CS0-004",
    [
      ["Format", "Multiple choice and PBQs"],
      ["Covers", "Security operations, vulnerability management, incident response, reporting"],
      ["Rules", "Check CompTIA for the current question count, time and passing score"],
      ["Where", "Pearson VUE centre or online"],
      ["Valid for", "3 years"],
    ],
    "CySA+ is an intermediate cybersecurity analyst certification focused on detecting, analysing and responding to threats.",
  ),
};

export const guideSlugs = () => Object.keys(guides);

/** Splits topics into a day-by-day plan: learning days, then mixed review, then mock tests. */
export function studyPlan(topics: string[], days: number) {
  const mockDays = days >= 14 ? 3 : 2;
  const reviewDays = days >= 14 ? Math.round(days * 0.15) : 1;
  const learnDays = Math.max(1, days - mockDays - reviewDays);
  const plan: { day: number; title: string; tasks: string[] }[] = [];
  for (let d = 0; d < learnDays; d++) {
    const from = Math.floor((d * topics.length) / learnDays);
    const to = Math.floor(((d + 1) * topics.length) / learnDays);
    const slice = topics.slice(from, Math.max(to, from + 1));
    plan.push({ day: d + 1, title: slice.join(" + "), tasks: [`Study ${slice.join(" and ")}`, "Answer the topic practice questions", "Write down anything you get wrong"] });
  }
  for (let d = 0; d < reviewDays; d++) plan.push({ day: plan.length + 1, title: "Review", tasks: ["Take the readiness check", "Re-study your two weakest topics", "Redo the questions you got wrong"] });
  for (let d = 0; d < mockDays; d++) plan.push({ day: plan.length + 1, title: d === mockDays - 1 ? "Final mock test" : "Mock test", tasks: ["Take a full timed mock test", "Review every wrong answer", d === mockDays - 1 ? "Pass with room to spare? You're ready to book" : "Study the topics you missed"] });
  return plan.slice(0, days);
}
