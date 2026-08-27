/**
 * UI chrome copy (everything that isn't a question/option/insight from
 * config.ts) for both languages. Finnish here is the human translator's
 * reviewed copy (see the "Scorecard UI translations" sheet) — Claude's
 * original draft stood wherever the sheet left "Finnish (updated)" blank.
 * Question/option/insight Finnish in config.ts is still Claude's draft,
 * pending a separate translation pass.
 */
export const UI_TEXT = {
  en: {
    landing: {
      heading: "Do you want a brand that goes much deeper than just the surface?",
      subheading: "These 15 questions will help you measure and improve...",
      topics: [
        "Brand values in your culture",
        "Brand marketing and messaging",
        "Product/service brand matching",
      ],
      minutes: "It only takes 3 minutes",
      cta: "Take the test now",
      bio: "Brought to you by Sam and Jonas, who have between them over 50 years of experience in brand development, product design and service design. Now they are on a mission to help others build lasting and dynamic brands from the inside out.",
    },
    questionnaire: {
      beforeWeStart: "Before we start",
      firstName: "First name",
      surname: "Surname",
      email: "Your work email",
      consentPrefix:
        "By submitting your email, you consent to receive marketing communications from us. You can withdraw your consent at any time via the unsubscribe link in any email we send. See our",
      privacyPolicy: "privacy policy",
      consentSuffix: "for details.",
      fillAllFields: "Please fill in all fields.",
      back: "Back",
      next: "Next",
      seeResults: "See results",
      questionOf: (current: number, total: number) => `Question ${current} of ${total}`,
      freeTextPlaceholder: "Type your answer here...",
      selectedCount: (selected: number, max: number) => `${selected}/${max} selected`,
    },
    results: {
      loading: "Loading your results…",
      noResultsHeading: "No results yet",
      noResultsBody: "Take the assessment first to see your score.",
      takeTestNow: "Take the test now",
      overallHeading: "Your overall culture-based brand score is:",
      overallGaugeLabel: "Overall",
      topicLabels: {
        culture: "Brand values in culture",
        marketing: "Brand marketing and messaging",
        productMatching: "Product/service brand matching",
      },
      insightsHeading: "Here's some things you could work on",
      ctaHeading: "Why don't you talk with us more to see how we can help you develop further?",
      ctaAction: "Start the conversation",
      thankYou: "Thank you, we will be in touch with you within the next few days.",
      returnHome: "Return to fromto.fi",
    },
  },
  fi: {
    landing: {
      heading: "Haluatko brändin, joka menee paljon pintaa syvemmälle?",
      subheading: "Nämä 15 kysymystä auttavat sinua mittaamaan ja kehittämään...",
      topics: [
        "Brändisi arvot yrityskulttuurissasi",
        "Brändin markkinointi ja viestintä",
        "Tuotteen/palvelun ja brändin yhteensopivuus",
      ],
      minutes: "Aikaa menee vain 3 minuuttia",
      cta: "Aloita testi",
      bio: "Tekijöinä Sam ja Jonas, joilla on yhteensä yli 50 vuoden kokemus brändin kehittämisestä, tuotesuunnittelusta ja palvelumuotoilusta. Heidän tavoitteenaan on auttaa nyt muita rakentamaan kestäviä ja dynaamisia brändejä sisältä käsin.",
    },
    questionnaire: {
      beforeWeStart: "Ennen kuin aloitamme",
      firstName: "Etunimi",
      surname: "Sukunimi",
      email: "Työsähköpostisi",
      consentPrefix:
        "Antamalla sähköpostiosoitteesi suostut ottamaan vastaan markkinointiviestejä meiltä. Voit perua suostumuksesi milloin tahansa peruutuslinkin kautta, joka löytyy jokaisesta lähettämästämme viestistä. Katso lisätietoja",
      privacyPolicy: "tietosuojaselosteestamme",
      consentSuffix: ".",
      fillAllFields: "Täytä kaikki kentät.",
      back: "Takaisin",
      next: "Seuraava",
      seeResults: "Katso tulokset",
      questionOf: (current: number, total: number) => `Kysymys ${current}/${total}`,
      freeTextPlaceholder: "Kirjoita vastauksesi tähän...",
      selectedCount: (selected: number, max: number) => `${selected}/${max} valittu`,
    },
    results: {
      loading: "Ladataan tuloksiasi…",
      noResultsHeading: "Ei vielä tuloksia",
      noResultsBody: "Tee testi ensin nähdäksesi pisteesi.",
      takeTestNow: "Aloita testi",
      overallHeading: "Kokonaispisteesi kulttuuripohjaisesta brändistä on:",
      overallGaugeLabel: "Yhteensä",
      topicLabels: {
        culture: "Brändin arvot kulttuurissa",
        marketing: "Brändin markkinointi ja viestintä",
        productMatching: "Tuotteen/palvelun ja brändin yhteensopivuus",
      },
      insightsHeading: "Näitä asioita voit kehittää",
      ctaHeading: "Haluatko keskustella kanssamme lisää ja katsoa, miten voisimme auttaa sinua kehittämään?",
      ctaAction: "Aloita keskustelu",
      thankYou: "Kiitos, olemme sinuun yhteydessä lähipäivinä.",
      returnHome: "Palaa fromto.fi-sivustolle",
    },
  },
} as const;
