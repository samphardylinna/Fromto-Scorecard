import type { Insight, Question } from "./types";

/**
 * Source of truth for the scorecard. Converted once from `Scorecard .xlsx`
 * (Sheet1) cross-checked against the Miro board's Questionnaire frame —
 * the spreadsheet's own numeric ranges (e.g. "2-5", "6-10") were corrupted
 * into calendar dates by Excel's autoformat, so option wording originally
 * followed Miro; point values follow the spreadsheet.
 *
 * Option labels for q1-3, q5-7, and q10, plus q7's prompt, were later
 * replaced with friendlier phrasing from a follow-up `New Questions.xlsx`
 * (its "Answer options" column reproduces the old labels — again mangled
 * into dates by Excel — purely as a lookup key; "New Answer Text" is the
 * actual replacement). Underlying option ids and point values are
 * unchanged, so scoring and insight triggers aren't affected.
 *
 * Re-generate this file by hand if the spreadsheet or Miro board changes —
 * nothing reads either source at runtime.
 *
 * `promptFi` / `labelFi` / `textFi` (on Question, AnswerOption, and Insight
 * respectively) are draft Finnish translations, done by Claude pending
 * review by the human translator — replace with their copy once it's in.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    order: 1,
    prompt: "How many times a week do you talk with an employee about your brand's story and values?",
    promptFi: "Kuinka monta kertaa viikossa keskustelet työntekijän kanssa brändisi tarinasta ja arvoista?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q1-a", label: "Pretty much never", labelFi: "Käytännössä en koskaan", score: 1 },
      { id: "q1-b", label: "A few times a week", labelFi: "Muutaman kerran viikossa", score: 2 },
      { id: "q1-c", label: "At least once a day", labelFi: "Vähintään kerran päivässä", score: 3 },
      { id: "q1-d", label: "More than twice a day", labelFi: "Useammin kuin kaksi kertaa päivässä", score: 4 },
    ],
  },
  {
    id: "q2",
    order: 2,
    prompt: "How many of your employees know your brand values?",
    promptFi: "Kuinka moni työntekijöistäsi tuntee brändisi arvot?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q2-a", label: "Less than half", labelFi: "Alle puolet", score: 1 },
      {
        id: "q2-b",
        label: "More than half, but still a lot don't",
        labelFi: "Yli puolet, mutta moni ei silti tunne",
        score: 2,
      },
      { id: "q2-c", label: "Most of them", labelFi: "Suurin osa heistä", score: 3 },
      { id: "q2-d", label: "Yes, all of them", labelFi: "Kyllä, kaikki", score: 4 },
    ],
  },
  {
    id: "q3",
    order: 3,
    prompt:
      "How many ways can you name where the brand values concretely affect the way you personally work?",
    promptFi:
      "Kuinka monta konkreettista tapaa osaat nimetä, joilla brändiarvot vaikuttavat omaan työskentelyysi?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q3-a", label: "They don't affect my work", labelFi: "Ne eivät vaikuta työhöni", score: 1 },
      { id: "q3-b", label: "A few come to mind", labelFi: "Muutama tulee mieleen", score: 2 },
      {
        id: "q3-c",
        label: "I can easily name 5 to 10 ways",
        labelFi: "Osaan helposti nimetä 5–10 tapaa",
        score: 3,
      },
      { id: "q3-d", label: "More than 10", labelFi: "Yli 10", score: 4 },
    ],
  },
  {
    id: "q4",
    order: 4,
    prompt: "In less than a minute, can you explain to a 10-year-old the difference your company makes to the world?",
    promptFi:
      "Pystytkö alle minuutissa selittämään 10-vuotiaalle, millaisen eron yrityksesi tekee maailmaan?",
    kind: "single",
    topics: ["culture", "marketing"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q4-a", label: "No", labelFi: "En", score: 2 },
      { id: "q4-b", label: "Yes", labelFi: "Kyllä", score: 4 },
    ],
  },
  {
    id: "q5",
    order: 5,
    prompt: "How much of your onboarding process is used for your brand story and values?",
    promptFi: "Kuinka suuri osa perehdytysprosessistanne käsittelee brändinne tarinaa ja arvoja?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q5-a", label: "Hardly any time", labelFi: "Lähes ei lainkaan", score: 1 },
      { id: "q5-b", label: "Around about a quarter", labelFi: "Noin neljännes", score: 2 },
      { id: "q5-c", label: "About a third", labelFi: "Noin kolmannes", score: 3 },
      {
        id: "q5-d",
        label: "More than half of the time, this is very important for us",
        labelFi: "Yli puolet ajasta – tämä on meille erittäin tärkeää",
        score: 4,
      },
    ],
  },
  {
    id: "q6",
    order: 6,
    prompt: "Out of 10 customers, how many would be able to tell you what your brand story is?",
    promptFi: "Kuinka moni kymmenestä asiakkaasta osaisi kertoa, mikä brändisi tarina on?",
    kind: "single",
    topics: ["marketing"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q6-a", label: "None", labelFi: "Ei yksikään", score: 1 },
      { id: "q6-b", label: "Maybe one", labelFi: "Ehkä yksi", score: 2 },
      { id: "q6-c", label: "A good few", labelFi: "Muutama", score: 3 },
      { id: "q6-d", label: "More than half", labelFi: "Yli puolet", score: 4 },
    ],
  },
  {
    id: "q7",
    order: 7,
    prompt:
      "Your product/service should prove your brand to be true, how many product features can you name which do that?",
    promptFi:
      "Tuotteesi/palvelusi pitäisi todistaa brändisi todeksi – kuinka monta tuoteominaisuutta osaat nimetä, jotka tekevät niin?",
    kind: "single",
    topics: ["productMatching"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q7-a", label: "None", labelFi: "Ei yhtään", score: 1 },
      { id: "q7-b", label: "Less than 5", labelFi: "Alle 5", score: 2 },
      { id: "q7-c", label: "Between 6 and 10", labelFi: "6–10", score: 3 },
      { id: "q7-d", label: "More than 10", labelFi: "Yli 10", score: 4 },
    ],
  },
  {
    id: "q8",
    order: 8,
    prompt:
      "Your brand values show up clearly in your customer support and guide every interaction with a customer.",
    promptFi:
      "Brändiarvosi näkyvät selvästi asiakastuessanne ja ohjaavat jokaista asiakaskohtaamista.",
    kind: "single",
    topics: ["productMatching"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q8-a", label: "No", labelFi: "Ei", score: 2 },
      { id: "q8-b", label: "Yes", labelFi: "Kyllä", score: 4 },
    ],
  },
  {
    id: "q9",
    order: 9,
    prompt: "When designing your product, you know exactly the kind of person you're aiming to delight.",
    promptFi: "Kun suunnittelette tuotettanne, tiedätte tarkalleen, millaista ihmistä haluatte ilahduttaa.",
    kind: "single",
    topics: ["productMatching"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q9-a", label: "No", labelFi: "Ei", score: 2 },
      { id: "q9-b", label: "Yes", labelFi: "Kyllä", score: 4 },
    ],
  },
  {
    id: "q10",
    order: 10,
    prompt: "How much of your marketing is about who you are and where you're going?",
    promptFi: "Kuinka suuri osa markkinoinnistanne kertoo siitä, keitä olette ja minne olette menossa?",
    kind: "single",
    topics: ["marketing"],
    randomizeOrder: true,
    randomizeOptions: false,
    options: [
      { id: "q10-a", label: "Hardly anything", labelFi: "Lähes ei mitään", score: 1 },
      { id: "q10-b", label: "A little bit", labelFi: "Vähän", score: 2 },
      {
        id: "q10-c",
        label: "Quite a lot but less than 25%",
        labelFi: "Melko paljon, mutta alle 25 %",
        score: 3,
      },
      { id: "q10-d", label: "More than 25%", labelFi: "Yli 25 %", score: 4 },
    ],
  },

  // Q11-15: fixed order per Miro, unscored against the topic gauges — they
  // instead feed the "final five" total that gates the results-page CTA.
  {
    id: "q11",
    order: 11,
    prompt: "Which of the following best describes your current situation?",
    promptFi: "Mikä seuraavista kuvaa parhaiten nykytilannettanne?",
    kind: "single",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    options: [
      {
        id: "q11-a",
        label: "Our focus is on making sure the product works",
        labelFi: "Keskitymme siihen, että tuote toimii",
        score: 1,
      },
      {
        id: "q11-b",
        label: "It all goes fine as long as I'm involved, the moment I step out the wheels fall off",
        labelFi: "Kaikki sujuu, kunhan olen itse mukana – heti kun vetäydyn, homma hajoaa",
        score: 2,
      },
      {
        id: "q11-c",
        label:
          "We've done good, even though we've grown a lot, although I'd like to find a way to make it more repeatable.",
        labelFi:
          "Olemme pärjänneet hyvin kasvusta huolimatta, mutta haluaisin löytää tavan tehdä siitä toistettavampaa.",
        score: 3,
      },
      {
        id: "q11-d",
        label: "We're proud of what we've achieved, but we are hungry to grow more",
        labelFi: "Olemme ylpeitä saavutuksistamme, mutta haluamme kasvaa vielä enemmän",
        score: 4,
      },
    ],
  },
  {
    id: "q12",
    order: 12,
    prompt: "Which best describes the outcome you're looking for?",
    promptFi: "Mikä kuvaa parhaiten tavoittelemaanne lopputulosta?",
    kind: "single",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    options: [
      {
        id: "q12-a",
        label: "This isn't really a focus for us",
        labelFi: "Tämä ei ole meille varsinainen painopiste",
        score: 1,
      },
      {
        id: "q12-b",
        label: "A clear method which can support our team to make the right choices and build a good brand",
        labelFi:
          "Selkeä menetelmä, joka auttaa tiimiämme tekemään oikeita valintoja ja rakentamaan hyvän brändin",
        score: 2,
      },
      {
        id: "q12-c",
        label: "I want to make sure our brand and way of doing things is truly a living part of the organisation",
        labelFi:
          "Haluan varmistaa, että brändimme ja toimintatapamme ovat aidosti elävä osa organisaatiota",
        score: 3,
      },
      {
        id: "q12-d",
        label: "A brand our core customers will love and I won't rest till we've built it",
        labelFi: "Brändi, jota ydinasiakkaamme rakastavat – enkä lepää ennen kuin olemme sen rakentaneet",
        score: 4,
      },
    ],
  },
  {
    id: "q13",
    order: 13,
    prompt: "What's stopping you get there? (select up to 3)",
    promptFi: "Mikä estää teitä pääsemästä sinne? (valitse enintään 3)",
    kind: "multi",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    maxSelections: 3,
    options: [
      { id: "q13-a", label: "This is low priority for us", labelFi: "Tämä on meille matala prioriteetti", score: -3 },
      {
        id: "q13-b",
        label: "We don't have the time to focus on this",
        labelFi: "Meillä ei ole aikaa keskittyä tähän",
        score: -1,
      },
      {
        id: "q13-c",
        label: "Our team doesn't seem to understand the mission",
        labelFi: "Tiimimme ei tunnu ymmärtävän missiota",
        score: 0,
      },
      {
        id: "q13-d",
        label: "We don't have the financial resources",
        labelFi: "Meillä ei ole taloudellisia resursseja",
        score: -2,
      },
      { id: "q13-e", label: "We don't have the right people", labelFi: "Meillä ei ole oikeita ihmisiä", score: 1 },
      {
        id: "q13-f",
        label: "We don't seem to be doing the right thing",
        labelFi: "Emme tunnu tekevän oikeita asioita",
        score: 2,
      },
      { id: "q13-g", label: "We don't have the know how", labelFi: "Meiltä puuttuu osaaminen", score: 3 },
    ],
  },
  {
    id: "q14",
    order: 14,
    prompt: "Which kind of solution would best suit your needs?",
    promptFi: "Millainen ratkaisu sopisi parhaiten tarpeisiinne?",
    kind: "single",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    options: [
      {
        id: "q14-a",
        label: "A process our team can implement themselves",
        labelFi: "Prosessi, jonka tiimimme voi toteuttaa itse",
        score: 1,
      },
      {
        id: "q14-b",
        label: "Online workshops where I can learn to do this myself",
        labelFi: "Verkkotyöpajat, joissa opin tekemään tämän itse",
        score: 2,
      },
      {
        id: "q14-c",
        label: "In-house brand director who would develop this for us",
        labelFi: "Talon sisäinen brändijohtaja, joka kehittäisi tämän meille",
        score: 3,
      },
      {
        id: "q14-d",
        label: "A fully outsourced solution where somebody will come in and fix this for us",
        labelFi: "Täysin ulkoistettu ratkaisu, jossa joku tulee hoitamaan tämän puolestamme",
        score: 4,
      },
    ],
  },
  {
    id: "q15",
    order: 15,
    prompt: "Is there anything else you'd like to share with us?",
    promptFi: "Onko jotain muuta, mitä haluaisit kertoa meille?",
    kind: "text",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: false,
  },
];

export const FINAL_FIVE_THRESHOLD = 5;

/**
 * Real copy and trigger conditions extracted from the Miro board's
 * "Questionnaire logic" frame (IN1-IN13, connectors C1-C43) via its vector
 * PDF export — each connector's answer-side and insight-side endpoints
 * were matched by position to the nearest labeled answer/insight, cross-
 * checked against a second, independently-rendered sample of the same
 * diagram (which agreed exactly on the one case they overlapped: Q2's
 * "90-100%" answer routing to IN8's warning insight, not a positive one).
 *
 * A handful of connectors initially had ambiguous answer-side matches
 * (within ~1.5 units of a neighboring option in the same question) — those
 * were re-resolved against the actual drawn answer-box boundaries from the
 * PDF's vector paths rather than label-to-label distance, which is
 * decisive since each option occupies a distinct, non-overlapping y-range.
 */
export const INSIGHTS: Insight[] = [
  {
    id: "IN1",
    triggers: [
      { questionId: "q1", optionId: "q1-a" },
      { questionId: "q1", optionId: "q1-b" },
      { questionId: "q2", optionId: "q2-a" },
    ],
    text: "Make a conscious effort to coach team members to consider how to do a task in a manner that not just supports your brand values, but amplifies it — target making it a natural thought process for everyone in the company.",
    textFi:
      "Panosta tietoisesti siihen, että valmennat tiimin jäseniä pohtimaan, miten tehtävä voidaan tehdä tavalla, joka ei vain tue brändiarvojanne vaan vahvistaa niitä — tavoitteena on tehdä tästä luonnollinen ajattelutapa koko yritykselle.",
  },
  {
    id: "IN2",
    triggers: [
      { questionId: "q1", optionId: "q1-a" },
      { questionId: "q1", optionId: "q1-b" },
      { questionId: "q2", optionId: "q2-b" },
      { questionId: "q3", optionId: "q3-a" },
    ],
    text: "Take time to consider and write up how your actions and work habits support, or fail to support, the brand values. Be open with the team about this, especially your shortcomings. Show them you're working on it and encourage them to do the same. Remember, only bad stuff flows down the hill; the stuff worth having must be grown upwards.",
    textFi:
      "Käytä aikaa pohtiaksesi ja kirjataksesi ylös, miten omat toimintatapasi ja työtottumuksesi tukevat — tai eivät tue — brändiarvoja. Ole tästä avoin tiimille, erityisesti omista puutteistasi. Näytä heille, että työskentelet asian parissa, ja kannusta heitä tekemään samoin. Muista: vain huonot asiat valuvat alaspäin, hyvät asiat on kasvatettava ylöspäin.",
  },
  {
    id: "IN3",
    triggers: [
      { questionId: "q1", optionId: "q1-c" },
      { questionId: "q3", optionId: "q3-b" },
      { questionId: "q3", optionId: "q3-c" },
    ],
    text: "Continue taking the time to work with team members on how the brand values concretely affect their work. Share specific examples from your own experience of how you shape your work to support the brand.",
    textFi:
      "Jatka ajan käyttämistä yhdessä tiimin kanssa siihen, miten brändiarvot konkreettisesti vaikuttavat heidän työhönsä. Jaa omakohtaisia esimerkkejä siitä, miten muokkaat omaa työtäsi tukemaan brändiä.",
  },
  {
    id: "IN4",
    triggers: [
      { questionId: "q1", optionId: "q1-d" },
      { questionId: "q3", optionId: "q3-d" },
    ],
    text: "Everything worth having in this world grows upwards; it doesn't flow down. Work with your leadership team to encourage them to consider how the brand values affect their work so it doesn't get stuck at your level. Give them the task of modelling it and teaching their team — the best way to learn something is to teach it.",
    textFi:
      "Kaikki arvokas tässä maailmassa kasvaa ylöspäin — se ei valu alas. Työskentele johtoryhmäsi kanssa ja kannusta heitä pohtimaan, miten brändiarvot vaikuttavat heidän työhönsä, jotta asia ei jää jumiin omalle tasollesi. Anna heille tehtäväksi näyttää esimerkkiä ja opettaa asiaa omalle tiimilleen — paras tapa oppia jotain on opettaa sitä.",
  },
  {
    id: "IN5",
    triggers: [
      { questionId: "q2", optionId: "q2-c" },
      { questionId: "q2", optionId: "q2-d" },
      { questionId: "q3", optionId: "q3-d" },
    ],
    text: "Everyone knows your brand values and story, but do they know how to apply them? Take the time to sit down with people and coach them through their day-to-day tasks, working through how the brand values and story affect the work they're doing.",
    textFi:
      "Kaikki tuntevat brändinne arvot ja tarinan, mutta osaavatko he soveltaa niitä? Käytä aikaa istuaksesi alas ihmisten kanssa ja valmenna heitä päivittäisissä tehtävissä käymällä läpi, miten brändiarvot ja -tarina vaikuttavat heidän työhönsä.",
  },
  {
    id: "IN6",
    triggers: [
      { questionId: "q2", optionId: "q2-a" },
      { questionId: "q4", optionId: "q4-a" },
      { questionId: "q5", optionId: "q5-a" },
      { questionId: "q6", optionId: "q6-a" },
    ],
    text: "Is your brand story where you come from, where you're going, and what you want to achieve in the world — told as a story? Or is it still on a piece of paper from the boardroom table? Work on presenting your strategy and story so even a child could understand it. People get inspired by stories, not statistics. Give them a story.",
    textFi:
      "Kerrotaanko brändinne tarina — mistä tulette, minne olette menossa ja mitä haluatte saavuttaa maailmassa — todella tarinana? Vai onko se yhä vain hallituksen pöydältä löytyvä paperi? Työstä strategiaasi ja tarinaasi niin, että jopa lapsi ymmärtäisi sen. Ihmiset innostuvat tarinoista, eivät tilastoista. Anna heille tarina.",
  },
  {
    id: "IN7",
    triggers: [
      { questionId: "q4", optionId: "q4-b" },
      { questionId: "q5", optionId: "q5-b" },
      { questionId: "q6", optionId: "q6-b" },
      { questionId: "q6", optionId: "q6-c" },
      { questionId: "q10", optionId: "q10-a" },
    ],
    text: "A well-crafted story works for investors and employees as well as customers. How well do you see the same story repeated across your marketing? Make sure the same message is being repeated across all functions of the company.",
    textFi:
      "Hyvin rakennettu tarina toimii niin sijoittajille, työntekijöille kuin asiakkaillekin. Kuinka hyvin näet saman tarinan toistuvan markkinoinnissasi? Varmista, että sama viesti toistuu yrityksen kaikissa toiminnoissa.",
  },
  {
    id: "IN8",
    triggers: [
      // this is the "high score, still a warning" case — Q2's best answer
      // (90-100%) deliberately routes here, confirmed independently twice
      { questionId: "q2", optionId: "q2-d" },
      { questionId: "q5", optionId: "q5-c" },
      { questionId: "q5", optionId: "q5-d" },
      { questionId: "q6", optionId: "q6-a" },
      { questionId: "q10", optionId: "q10-b" },
    ],
    text: "You're putting a lot of time into onboarding your employees into the brand value and story, but it's not making its way through to the customers. Consider how you coach your team members on day-to-day tasks and strategic goals — is there a weak link in the story-telling chain?",
    textFi:
      "Käytätte paljon aikaa työntekijöiden perehdyttämiseen brändiarvoihin ja -tarinaan, mutta se ei tunnu välittyvän asiakkaille asti. Pohdi, miten valmennat tiimin jäseniä päivittäisissä tehtävissä ja strategisissa tavoitteissa — onko tarinankerronnan ketjussa heikko lenkki?",
  },
  {
    id: "IN9",
    triggers: [
      { questionId: "q7", optionId: "q7-a" },
      { questionId: "q7", optionId: "q7-b" },
      { questionId: "q6", optionId: "q6-b" },
      { questionId: "q10", optionId: "q10-a" },
    ],
    text: "Your brand is one of the key differentiators for your product and one of the things that allows you to charge more than your competitors. If you can't name many features that support your brand, your sales team and customers likely can't either — and won't be able to justify your pricing. Work with your product team to connect features to your brand values, then take that message to sales.",
    textFi:
      "Brändinne on yksi tuotteenne keskeisistä erottautumistekijöistä ja yksi syy siihen, että voitte pyytää kilpailijoita korkeampaa hintaa. Jos ette itse osaa nimetä montaa brändiä tukevaa ominaisuutta, tuskin myyntitiiminne tai asiakkaannekaan osaavat — eivätkä he silloin pysty perustelemaan hintaanne. Työskentele tuotetiimin kanssa yhdistääksesi ominaisuudet brändiarvoihin ja vie viesti sitten myyntiin.",
  },
  {
    id: "IN10",
    triggers: [
      { questionId: "q7", optionId: "q7-c" },
      { questionId: "q8", optionId: "q8-b" },
      { questionId: "q8", optionId: "q8-a" },
    ],
    text: "There's an art to knowing how many features you need in your products and services to make it feel like the brand. Work with your team to understand what your strategy demands your product has and what your brand requires — before you start any design work. The product is there to complete the strategy, not the strategy to sell the product.",
    textFi:
      "On oma taitolajinsa tietää, kuinka monta ominaisuutta tuotteessanne tai palvelussanne tarvitaan, jotta se tuntuu brändiltä. Työskentele tiimisi kanssa ymmärtääksesi, mitä strategianne edellyttää tuotteelta ja mitä brändinne vaatii — ennen kuin aloitatte suunnittelutyön. Tuote on olemassa toteuttaakseen strategian, ei strategia myydäkseen tuotetta.",
  },
  {
    id: "IN11",
    triggers: [
      { questionId: "q8", optionId: "q8-a" },
      { questionId: "q9", optionId: "q9-b" },
    ],
    text: "We are all most sensitive when we're upset. Customer support is the most important part of your business for improving your brand perception. Work hard with the team so they know what the brand is, they experience the brand inside the company, and they have the freedom to make it happen.",
    textFi:
      "Olemme kaikki herkimmillämme silloin, kun olemme harmissamme. Asiakastuki on liiketoimintanne tärkein osa-alue brändimielikuvan parantamisessa. Työskentele tiimin kanssa, jotta he tietävät, mikä brändi on, kokevat sen myös yrityksen sisällä, ja heillä on vapaus toteuttaa sitä.",
  },
  {
    id: "IN12",
    triggers: [
      { questionId: "q7", optionId: "q7-a" },
      { questionId: "q7", optionId: "q7-b" },
    ],
    text: "Indifference is the most expensive and least effective outcome. Make sure your product is designed for those who love your brand, not just for what it has in it, but for what it says about them when they have it. You can't please everyone. You may have to annoy some people in the pursuit of delighting others.",
    textFi:
      "Välinpitämättömyys on kallein ja tehottomin lopputulos. Varmista, että tuotteenne on suunniteltu niille, jotka rakastavat brändiänne — ei vain sen ominaisuuksien vuoksi, vaan sen vuoksi, mitä se kertoo heistä, kun he omistavat sen. Kaikkia ei voi miellyttää. Jonkun ärsyttäminen voi olla väistämätöntä, jotta voit ilahduttaa toisia.",
  },
  {
    id: "IN13",
    triggers: [
      { questionId: "q6", optionId: "q6-d" },
      { questionId: "q9", optionId: "q9-a" },
      { questionId: "q10", optionId: "q10-c" },
    ],
    text: "Like attracts like. When the world knows who you are and where you're going, you'll find it much easier to attract customers, employees, and investors who match your business. Keep working with your team to find creative ways to broadcast the difference you're going to make.",
    textFi:
      "Samanlainen vetää puoleensa samanlaista. Kun maailma tietää, keitä olette ja minne olette menossa, teidän on paljon helpompi houkutella asiakkaita, työntekijöitä ja sijoittajia, jotka sopivat yhteen liiketoimintanne kanssa. Jatka työskentelyä tiimisi kanssa löytääksesi luovia tapoja viestiä siitä muutoksesta, jonka aiotte tehdä.",
  },
];

/** Every completed survey surfaces at least this many insights. */
export const FREE_INSIGHT_COUNT = 3;
