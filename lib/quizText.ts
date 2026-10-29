// Interface text for the mock test in each supported language. English is the default.
export type Lang = "en" | "de" | "da" | "nl";

export type QuizText = {
  questions: string;
  time: string;
  toPass: string;
  noLimit: string;
  best: (n: number) => string;
  start: string;
  footnote: string;
  passed: string;
  notYet: string;
  passMark: (m: number, n: number) => string;
  bestScore: (n: number) => string;
  tryAgain: string;
  review: string;
  upHeadPass: string;
  upHeadFail: (k: number) => string;
  upSubPass: string;
  upSubFail: string;
  storiesQ: string;
  storiesLink: string;
  reviewTitle: string;
  notAnswered: string;
  youChose: (o: string) => string;
  questionOf: (i: number, n: number) => string;
  answered: (a: number, n: number) => string;
  prev: string;
  finish: string;
  next: string;
  results: string;
  cardPass: (exam: string) => string;
  cardScore: (pct: number, exam: string) => string;
  cardSub: (pct: number, m: number, n: number) => string;
  share: string;
  creating: string;
  saved: string;
  copied: string;
  shareText: string;
  cardCta: string;
  perks: (premium: number) => string[];
  badge: string;
  freeDl: string;
  onPlay: string;
  freeOnPlay: string;
};

export const quizText: Record<Lang, QuizText> = {
  en: {
    questions: "questions",
    time: "time",
    toPass: "to pass",
    noLimit: "No limit",
    best: (n) => `🏅 Your best score: ${n}%`,
    start: "Start mock test →",
    footnote: "Free, no sign-up. Questions are shuffled every time.",
    passed: "Passed 🎉",
    notYet: "Not quite yet",
    passMark: (m, n) => `pass mark ${m}/${n}`,
    bestScore: (n) => `Best score: ${n}%`,
    tryAgain: "↻ Try again",
    review: "Review answers ↓",
    upHeadPass: "Great score! Make sure you pass on the day.",
    upHeadFail: (k) => `You're ${k} correct ${k === 1 ? "answer" : "answers"} away from passing.`,
    upSubPass: "Keep practising with fresh questions and unlimited mock tests until you pass every time.",
    upSubFail: "The full app helps you close the gap: it brings back your weak questions and tracks when you're ready.",
    storiesQ: "Passed the real thing?",
    storiesLink: "Share your success story",
    reviewTitle: "Review your answers",
    notAnswered: "Not answered",
    youChose: (o) => `✗ You chose: ${o}`,
    questionOf: (i, n) => `Question ${i} of ${n}`,
    answered: (a, n) => `${a}/${n} answered`,
    prev: "← Previous",
    finish: "Finish test",
    next: "Next →",
    results: "See results",
    cardPass: (e) => `I passed the ${e} mock test! 🎉`,
    cardScore: (pct, e) => `I scored ${pct}% on the ${e} mock test`,
    cardSub: (pct, m, n) => `${pct}% · pass mark ${m}/${n}`,
    share: "Share my result",
    creating: "Creating…",
    saved: "Image saved ✓",
    copied: "Image saved, link copied ✓",
    shareText: "Try the free test:",
    cardCta: "Try it free →",
    perks: (n) => [n > 0 ? `${n}+ more practice questions` : "The full question bank", "Unlimited timed mock tests", "Mistakes review with explanations", "Readiness score so you know when to book", "Works offline, anywhere"],
    badge: "Download free on",
    freeDl: "Free download · No sign-up needed",
    onPlay: "on Google Play",
    freeOnPlay: "Free on Google Play · Android",
  },
  de: {
    questions: "Fragen",
    time: "Zeit",
    toPass: "zum Bestehen",
    noLimit: "Ohne Limit",
    best: (n) => `🏅 Deine Bestleistung: ${n} %`,
    start: "Probetest starten →",
    footnote: "Kostenlos, ohne Anmeldung. Die Fragen werden jedes Mal neu gemischt.",
    passed: "Bestanden 🎉",
    notYet: "Noch nicht ganz",
    passMark: (m, n) => `Bestehensgrenze ${m}/${n}`,
    bestScore: (n) => `Bestleistung: ${n} %`,
    tryAgain: "↻ Nochmal versuchen",
    review: "Antworten ansehen ↓",
    upHeadPass: "Tolles Ergebnis! Jetzt auch am Prüfungstag bestehen.",
    upHeadFail: (k) => `Dir ${k === 1 ? "fehlt" : "fehlen"} nur ${k} richtige ${k === 1 ? "Antwort" : "Antworten"} zum Bestehen.`,
    upSubPass: "Übe weiter mit neuen Fragen und unbegrenzten Probetests, bis du jedes Mal bestehst.",
    upSubFail: "Die App hilft dir, die Lücke zu schließen: Sie wiederholt deine schwachen Fragen und zeigt dir, wann du bereit bist.",
    storiesQ: "Den echten Test bestanden?",
    storiesLink: "Erzähl uns deine Erfolgsgeschichte",
    reviewTitle: "Deine Antworten",
    notAnswered: "Nicht beantwortet",
    youChose: (o) => `✗ Deine Antwort: ${o}`,
    questionOf: (i, n) => `Frage ${i} von ${n}`,
    answered: (a, n) => `${a}/${n} beantwortet`,
    prev: "← Zurück",
    finish: "Test beenden",
    next: "Weiter →",
    results: "Ergebnis ansehen",
    cardPass: (e) => `Ich habe den ${e}-Probetest bestanden! 🎉`,
    cardScore: (pct, e) => `Ich habe ${pct} % im ${e}-Probetest erreicht`,
    cardSub: (pct, m, n) => `${pct} % · Bestehensgrenze ${m}/${n}`,
    share: "Ergebnis teilen",
    creating: "Wird erstellt…",
    saved: "Bild gespeichert ✓",
    copied: "Bild gespeichert, Link kopiert ✓",
    shareText: "Mach den kostenlosen Test:",
    cardCta: "Kostenlos testen →",
    perks: (n) => [n > 0 ? `${n}+ weitere Übungsfragen` : "Alle Fragen aus dem Katalog", "Unbegrenzte Probetests mit Zeitlimit", "Fehler wiederholen mit Erklärungen", "Fortschrittsanzeige: Wann bist du bereit?", "Funktioniert offline, überall"],
    badge: "Jetzt bei",
    freeDl: "Kostenloser Download · Ohne Anmeldung",
    onPlay: "bei Google Play",
    freeOnPlay: "Kostenlos bei Google Play · Android",
  },
  da: {
    questions: "spørgsmål",
    time: "tid",
    toPass: "for at bestå",
    noLimit: "Ingen grænse",
    best: (n) => `🏅 Din bedste score: ${n} %`,
    start: "Start prøvetest →",
    footnote: "Gratis, uden tilmelding. Spørgsmålene blandes hver gang.",
    passed: "Bestået 🎉",
    notYet: "Ikke helt endnu",
    passMark: (m, n) => `beståelseskrav ${m}/${n}`,
    bestScore: (n) => `Bedste score: ${n} %`,
    tryAgain: "↻ Prøv igen",
    review: "Se dine svar ↓",
    upHeadPass: "Flot resultat! Sørg for at bestå på dagen.",
    upHeadFail: (k) => `Du mangler kun ${k} rigtige svar for at bestå.`,
    upSubPass: "Bliv ved med at øve med nye spørgsmål og ubegrænsede prøvetests, indtil du består hver gang.",
    upSubFail: "Appen hjælper dig med at lukke hullet: den gentager dine svage spørgsmål og viser, hvornår du er klar.",
    storiesQ: "Har du bestået den rigtige prøve?",
    storiesLink: "Del din succeshistorie",
    reviewTitle: "Gennemgå dine svar",
    notAnswered: "Ikke besvaret",
    youChose: (o) => `✗ Dit svar: ${o}`,
    questionOf: (i, n) => `Spørgsmål ${i} af ${n}`,
    answered: (a, n) => `${a}/${n} besvaret`,
    prev: "← Forrige",
    finish: "Afslut test",
    next: "Næste →",
    results: "Se resultat",
    cardPass: (e) => `Jeg bestod prøvetesten til ${e}! 🎉`,
    cardScore: (pct, e) => `Jeg fik ${pct} % i prøvetesten til ${e}`,
    cardSub: (pct, m, n) => `${pct} % · beståelseskrav ${m}/${n}`,
    share: "Del mit resultat",
    creating: "Opretter…",
    saved: "Billede gemt ✓",
    copied: "Billede gemt, link kopieret ✓",
    shareText: "Tag den gratis test:",
    cardCta: "Prøv gratis →",
    perks: (n) => [n > 0 ? `${n}+ flere øvespørgsmål` : "Hele spørgsmålsbanken", "Ubegrænsede prøvetests med tid", "Gennemgå fejl med forklaringer", "Parathedsscore, så du ved, hvornår du er klar", "Virker offline, overalt"],
    badge: "Nu på",
    freeDl: "Gratis download · Ingen tilmelding",
    onPlay: "på Google Play",
    freeOnPlay: "Gratis på Google Play · Android",
  },
  nl: {
    questions: "vragen",
    time: "tijd",
    toPass: "om te slagen",
    noLimit: "Geen limiet",
    best: (n) => `🏅 Je beste score: ${n}%`,
    start: "Start proefexamen →",
    footnote: "Gratis, zonder aanmelden. De vragen worden elke keer geschud.",
    passed: "Geslaagd 🎉",
    notYet: "Nog niet helemaal",
    passMark: (m, n) => `slaaggrens ${m}/${n}`,
    bestScore: (n) => `Beste score: ${n}%`,
    tryAgain: "↻ Opnieuw",
    review: "Bekijk je antwoorden ↓",
    upHeadPass: "Mooie score! Zorg dat je ook op de dag zelf slaagt.",
    upHeadFail: (k) => `Je mist nog maar ${k} goede ${k === 1 ? "antwoord" : "antwoorden"} om te slagen.`,
    upSubPass: "Blijf oefenen met nieuwe vragen en onbeperkt proefexamens tot je elke keer slaagt.",
    upSubFail: "De app helpt je het gat te dichten: hij herhaalt je zwakke vragen en laat zien wanneer je klaar bent.",
    storiesQ: "Geslaagd voor het echte examen?",
    storiesLink: "Deel je succesverhaal",
    reviewTitle: "Bekijk je antwoorden",
    notAnswered: "Niet beantwoord",
    youChose: (o) => `✗ Jouw antwoord: ${o}`,
    questionOf: (i, n) => `Vraag ${i} van ${n}`,
    answered: (a, n) => `${a}/${n} beantwoord`,
    prev: "← Vorige",
    finish: "Examen afronden",
    next: "Volgende →",
    results: "Bekijk resultaat",
    cardPass: (e) => `Ik ben geslaagd voor het proefexamen ${e}! 🎉`,
    cardScore: (pct, e) => `Ik haalde ${pct}% op het proefexamen ${e}`,
    cardSub: (pct, m, n) => `${pct}% · slaaggrens ${m}/${n}`,
    share: "Deel mijn resultaat",
    creating: "Bezig…",
    saved: "Afbeelding opgeslagen ✓",
    copied: "Afbeelding opgeslagen, link gekopieerd ✓",
    shareText: "Doe de gratis test:",
    cardCta: "Probeer gratis →",
    perks: (n) => [n > 0 ? `${n}+ extra oefenvragen` : "De volledige vragenbank", "Onbeperkt proefexamens op tijd", "Fouten herhalen met uitleg", "Een score die laat zien wanneer je klaar bent", "Werkt offline, overal"],
    badge: "Ontdek het op",
    freeDl: "Gratis download · Zonder aanmelden",
    onPlay: "op Google Play",
    freeOnPlay: "Gratis op Google Play · Android",
  },
};
