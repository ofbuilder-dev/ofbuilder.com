// Local-language landing pages for exam apps whose users search in their own language.
// Each page lives at /<app-slug>/<lang>/ and links to the (English) free practice pages.
import type { Faq } from "./apps";

export type LocalPage = {
  lang: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  facts: [string, string][];
  features: { title: string; body: string }[];
  ui: { mock: string; ready: string; app: string; factsTitle: string; featuresTitle: string; faqTitle: string; note: string; english: string };
  faq: Faq[];
  // Translated free mock test page at /<app-slug>/<lang>/mock-test/
  mock: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    intro: string;
    examName: string;
    ctaTitle: string;
    ctaBody: string;
    getApp: string;
    english: string;
    back: string;
  };
};

export const local: Record<string, Record<string, LocalPage>> = {
  "german-citizenship": {
    de: {
      lang: "de",
      title: "Einbürgerungstest 2026 üben: Kostenloser Probetest & App",
      description: "Bereite dich auf den Einbürgerungstest vor: 33 Fragen, 60 Minuten, 17 richtige Antworten zum Bestehen. Kostenloser Online-Probetest und App.",
      h1: "Einbürgerungstest 2026 sicher bestehen",
      intro: "Übe die Fragen aus dem offiziellen Fragenkatalog, mache realistische Probetests und sieh genau, wann du bereit bist. Kostenlos im Browser oder offline in der App.",
      facts: [
        ["Fragen", "33 (30 allgemein + 3 zu deinem Bundesland)"],
        ["Zeit", "60 Minuten"],
        ["Bestanden ab", "17 richtigen Antworten"],
        ["Fragenkatalog", "310 Fragen"],
      ],
      features: [
        { title: "Fragen aus dem Katalog", body: "Übe die allgemeinen Fragen und die Fragen zu deinem Bundesland." },
        { title: "Realistische Probetests", body: "33 Fragen in 60 Minuten, wie im echten Test." },
        { title: "Fehler gezielt wiederholen", body: "Die App bringt die Fragen zurück, die du falsch beantwortet hast." },
      ],
      ui: {
        mock: "Kostenlosen Probetest starten",
        ready: "Bin ich bereit?",
        app: "App bei Google Play",
        factsTitle: "Der Test auf einen Blick",
        featuresTitle: "So bereitest du dich vor",
        faqTitle: "Häufige Fragen",
        note: "Hinweis: Die Übungsseiten sind auf Englisch.",
        english: "English version",
      },
      faq: [
        { q: "Wie viele Fragen hat der Einbürgerungstest?", a: "33 Fragen: 30 allgemeine Fragen und 3 Fragen zu deinem Bundesland. Du hast 60 Minuten Zeit." },
        { q: "Wie viele Fragen muss ich richtig beantworten?", a: "Du brauchst mindestens 17 richtige Antworten, um den Test zu bestehen." },
        { q: "Ist die App offiziell?", a: "Nein. Die App ist eine unabhängige Lernhilfe und nicht mit dem BAMF verbunden." },
      ],
      mock: {
        title: "Einbürgerungstest Probetest 2026: Kostenlos online üben",
        description: "Kostenloser Einbürgerungstest-Probetest: 33 Fragen, 60 Minuten, 17 richtige zum Bestehen. Sofort Ergebnis und Erklärungen, ohne Anmeldung.",
        eyebrow: "Kostenloser Probetest",
        h1: "Einbürgerungstest Probetest",
        intro: "33 Fragen in 60 Minuten, wie im echten Test. Du brauchst 17 richtige Antworten zum Bestehen. Am Ende siehst du dein Ergebnis und alle Erklärungen.",
        examName: "Einbürgerungstest",
        ctaTitle: "Mehr Fragen üben?",
        ctaBody: "Alle Fragen, unbegrenzte Probetests und Fehlerwiederholung in der App.",
        getApp: "App laden",
        english: "English version",
        back: "← Zur Übersicht",
      },
    },
  },
  "danish-citizenship": {
    da: {
      lang: "da",
      title: "Indfødsretsprøven 2026: Gratis prøvetest og app",
      description: "Forbered dig til indfødsretsprøven med øvespørgsmål om dansk samfund, kultur, historie og værdier. Gratis prøvetest online og app til Android.",
      h1: "Bestå indfødsretsprøven",
      intro: "Øv spørgsmål om dansk samfund, kultur, historie og værdier. Tag prøvetests og se præcis, hvornår du er klar. Gratis i browseren eller offline i appen.",
      facts: [
        ["Prøven", "Skriftlig multiple choice-prøve"],
        ["Emner", "Samfund, kultur, historie og danske værdier"],
        ["Afholdes", "På faste datoer i løbet af året"],
      ],
      features: [
        { title: "Spørgsmål om alle emner", body: "Øv samfund, kultur, historie og værdier, emne for emne." },
        { title: "Prøvetests med tid", body: "Træn under tidspres, så du er klar på dagen." },
        { title: "Gentag dine fejl", body: "Appen viser dig igen de spørgsmål, du har svaret forkert på." },
      ],
      ui: {
        mock: "Start gratis prøvetest",
        ready: "Er jeg klar?",
        app: "Hent appen på Google Play",
        factsTitle: "Prøven kort fortalt",
        featuresTitle: "Sådan forbereder du dig",
        faqTitle: "Ofte stillede spørgsmål",
        note: "Bemærk: Øvesiderne er på engelsk.",
        english: "English version",
      },
      faq: [
        { q: "Hvad handler indfødsretsprøven om?", a: "Prøven handler om dansk samfund, kultur, historie og danske værdier." },
        { q: "Hvornår afholdes prøven?", a: "Prøven afholdes på faste datoer i løbet af året. Tjek den officielle hjemmeside for næste dato." },
        { q: "Er appen officiel?", a: "Nej. Appen er et uafhængigt studieværktøj og er ikke tilknyttet de danske myndigheder." },
      ],
      mock: {
        title: "Indfødsretsprøven prøvetest 2026: Gratis online",
        description: "Gratis prøvetest til indfødsretsprøven: øv spørgsmål om dansk samfund, kultur, historie og værdier. Få dit resultat og forklaringer med det samme.",
        eyebrow: "Gratis prøvetest",
        h1: "Prøvetest til indfødsretsprøven",
        intro: "Øv dig med spørgsmål om dansk samfund, kultur, historie og værdier under tidspres. Til sidst ser du dit resultat og alle forklaringer. Dette er et øveformat, ikke den officielle prøve.",
        examName: "Indfødsretsprøven",
        ctaTitle: "Vil du øve flere spørgsmål?",
        ctaBody: "Alle spørgsmål, ubegrænsede prøvetests og gennemgang af dine fejl i appen.",
        getApp: "Hent appen",
        english: "English version",
        back: "← Tilbage til oversigten",
      },
    },
  },
  "knm-inburgering": {
    nl: {
      lang: "nl",
      title: "KNM-examen 2026 oefenen: gratis proefexamen en app",
      description: "Oefen voor het KNM-examen (Kennis van de Nederlandse Maatschappij) met vragen over werk, zorg, wonen, onderwijs en geschiedenis. Gratis proefexamen online.",
      h1: "Slaag voor je KNM-examen",
      intro: "Oefen vragen over werk, zorg, wonen, onderwijs, geschiedenis en Nederlandse normen en waarden. Doe proefexamens en zie precies wanneer je klaar bent. Gratis in je browser of offline in de app.",
      facts: [
        ["Examen", "Multiple choice op de computer"],
        ["Onderwerpen", "Werk, zorg, wonen, onderwijs, geschiedenis en politiek"],
        ["Organisatie", "DUO"],
      ],
      features: [
        { title: "Vragen over alle onderwerpen", body: "Oefen elk KNM-onderwerp, van de huisarts tot de gemeente." },
        { title: "Proefexamens met tijd", body: "Oefen onder tijdsdruk, zodat je klaar bent op de dag zelf." },
        { title: "Herhaal je fouten", body: "De app laat de vragen terugkomen die je fout had." },
      ],
      ui: {
        mock: "Start gratis proefexamen",
        ready: "Ben ik er klaar voor?",
        app: "Download de app op Google Play",
        factsTitle: "Het examen in het kort",
        featuresTitle: "Zo bereid je je voor",
        faqTitle: "Veelgestelde vragen",
        note: "Let op: de oefenpagina's zijn in het Engels.",
        english: "English version",
      },
      faq: [
        { q: "Wat is het KNM-examen?", a: "KNM staat voor Kennis van de Nederlandse Maatschappij. Het is een onderdeel van het inburgeringsexamen." },
        { q: "Hoe meld ik me aan?", a: "Je meldt je aan bij DUO met je DigiD." },
        { q: "Is de app officieel?", a: "Nee. De app is een onafhankelijk hulpmiddel en is niet verbonden aan DUO." },
      ],
      mock: {
        title: "KNM proefexamen 2026: Gratis online oefenen",
        description: "Gratis KNM-proefexamen voor je inburgering: oefen vragen over werk, zorg, wonen, onderwijs en geschiedenis. Direct je score en uitleg.",
        eyebrow: "Gratis proefexamen",
        h1: "KNM proefexamen",
        intro: "Oefen vragen over werk, zorg, wonen, onderwijs, geschiedenis en Nederlandse normen en waarden op tijd. Aan het eind zie je je score en alle uitleg. Dit is een oefenformat, niet het officiële examen.",
        examName: "KNM-examen",
        ctaTitle: "Meer vragen oefenen?",
        ctaBody: "Alle vragen, onbeperkt proefexamens en je fouten herhalen in de app.",
        getApp: "Download de app",
        english: "English version",
        back: "← Terug naar overzicht",
      },
    },
  },
};

export const localesFor = (slug: string) => Object.keys(local[slug] ?? {});
export const localParams = () => Object.entries(local).flatMap(([slug, langs]) => Object.keys(langs).map((lang) => ({ slug, lang })));
