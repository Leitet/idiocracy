// Each "tell" is a cultural signal from the movie Idiocracy (2006).
// Stars are real-world news / reference items whose existence nudges the score.
// Stars use absolute positions on a 0-100 scale. The tell's score = the highest star.
// Total score = average of all tell scores.
//
// Note: URLs point to encyclopedic / news references that *document* the phenomenon.
// Some are knowingly punny — that is the point.

const TELLS = [
  {
    id: "brawndo",
    title: "Use sports drinks to water crops",
    movie: "Brawndo — It's got what plants crave. It's got electrolytes.",
    stars: [
      { pct: 22, title: "Brawndo was trademarked and sold as a real energy drink",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Brawndo" },
      { pct: 41, title: "Electrolyte-obsessed marketing now a mass category (Liquid I.V., LMNT, Prime)",
        source: "Wikipedia — Liquid I.V.", url: "https://en.wikipedia.org/wiki/Liquid_I.V." },
      { pct: 58, title: "'Raw water' trend: people pay premium for unfiltered spring water",
        source: "NYT", url: "https://www.nytimes.com/2017/12/29/dining/raw-water-unfiltered.html" },
      { pct: 67, title: "Prime Hydration: celebrity-branded electrolyte drink causes school bans",
        source: "Wikipedia — Prime (drink)", url: "https://en.wikipedia.org/wiki/Prime_(drink)" }
    ]
  },
  {
    id: "wrestler-president",
    title: "Wrestler / entertainer becomes head of state",
    movie: "President Dwayne Elizondo Mountain Dew Herbert Camacho — five-time ultimate smackdown champion.",
    stars: [
      { pct: 35, title: "Jesse 'The Body' Ventura elected Governor of Minnesota (1999)",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jesse_Ventura" },
      { pct: 52, title: "Arnold Schwarzenegger elected Governor of California (2003)",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Governorship_of_Arnold_Schwarzenegger" },
      { pct: 78, title: "Donald Trump (WWE Hall of Fame) elected US President",
        source: "Wikipedia — Trump & wrestling", url: "https://en.wikipedia.org/wiki/Donald_Trump_and_wrestling" },
      { pct: 84, title: "Volodymyr Zelenskyy, sitcom comedian, elected President of Ukraine",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Volodymyr_Zelenskyy" }
    ]
  },
  {
    id: "ow-my-balls",
    title: "'Ow! My Balls!' is what passes for entertainment",
    movie: "The #1 show in 2505 is a man getting hit in the groin. For 90 minutes.",
    stars: [
      { pct: 40, title: "AFV built a 30-year empire on groin-injury home videos",
        source: "Wikipedia — AFV", url: "https://en.wikipedia.org/wiki/America%27s_Funniest_Home_Videos" },
      { pct: 61, title: "Jackass franchise grosses hundreds of millions globally",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jackass_(franchise)" },
      { pct: 77, title: "TikTok 'fail' and pain-challenge videos dominate short-form feeds",
        source: "Wikipedia — TikTok", url: "https://en.wikipedia.org/wiki/TikTok" },
      { pct: 82, title: "MrBeast-style pain/endurance spectacle is the #1 channel on YouTube",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/MrBeast" }
    ]
  },
  {
    id: "costco-everything",
    title: "Costco sells everything, including law degrees",
    movie: "Welcome to Costco. I love you.",
    stars: [
      { pct: 30, title: "Costco sells engagement rings, coffins, and vacation packages",
        source: "Wikipedia — Costco", url: "https://en.wikipedia.org/wiki/Costco" },
      { pct: 48, title: "Couples getting legally married inside Costco warehouses",
        source: "BBC", url: "https://www.bbc.com/news/world-us-canada-48133678" },
      { pct: 66, title: "Walmart offers primary care, dental, and optical inside stores",
        source: "Wikipedia — Walmart Health", url: "https://en.wikipedia.org/wiki/Walmart_Health" },
      { pct: 71, title: "Amazon acquires One Medical: same-day doctor visits via Prime",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/One_Medical" }
    ]
  },
  {
    id: "corporate-everything",
    title: "Corporate logos replace public life",
    movie: "Carl's Jr. — Fuck you, I'm eating.",
    stars: [
      { pct: 45, title: "Stadium naming rights: venues renamed every few years to new sponsors",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Naming_rights" },
      { pct: 62, title: "Entire public-transit stations sold to brands (Barclays Center stop, etc.)",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Atlantic_Avenue%E2%80%93Barclays_Center_station" },
      { pct: 74, title: "School districts sell naming rights to gyms, fields, and hallways",
        source: "NYT", url: "https://www.nytimes.com/2011/01/26/education/26schools.html" },
      { pct: 80, title: "NFL stadiums generate more from logos than from tickets",
        source: "Wikipedia — Sponsorship", url: "https://en.wikipedia.org/wiki/Sponsorship" }
    ]
  },
  {
    id: "anti-intellect",
    title: "Anti-intellectualism becomes mainstream",
    movie: "You talk like a fag, and your shit's all retarded.",
    stars: [
      { pct: 38, title: "Flat Earth Society membership surges in the streaming era",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Modern_flat_Earth_beliefs" },
      { pct: 56, title: "Ivermectin and bleach as COVID cures trend globally",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ivermectin_during_the_COVID-19_pandemic" },
      { pct: 72, title: "Measles returns to countries that eliminated it, via anti-vax movements",
        source: "WHO", url: "https://www.who.int/news-room/fact-sheets/detail/measles" },
      { pct: 81, title: "'Do your own research' memes crowd out expert sources on social feeds",
        source: "Wikipedia — Misinformation", url: "https://en.wikipedia.org/wiki/Misinformation" }
    ]
  },
  {
    id: "language-decay",
    title: "Vocabulary collapses to grunts and brands",
    movie: "A hybrid of hillbilly, valley girl, inner-city slang, and various grunts.",
    stars: [
      { pct: 33, title: "Emoji becomes Oxford's Word of the Year (2015: 😂)",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Face_with_Tears_of_Joy_emoji" },
      { pct: 49, title: "'Rizz' named Oxford Word of the Year (2023)",
        source: "Oxford Languages", url: "https://corp.oup.com/word-of-the-year/" },
      { pct: 63, title: "Gen Alpha 'brainrot' vocabulary: skibidi, gyatt, fanum tax",
        source: "Wikipedia — Brainrot", url: "https://en.wikipedia.org/wiki/Brain_rot" },
      { pct: 70, title: "Average US adult reading level measured below 6th grade",
        source: "US Dept of Education", url: "https://nces.ed.gov/pubs2019/2019179.pdf" }
    ]
  },
  {
    id: "medical-buttons",
    title: "Medicine by cartoon buttons",
    movie: "Hospital diagnosis is pressing a picture of a body part. A computer reads your tattoo.",
    stars: [
      { pct: 41, title: "Self-checkout kiosks replace ER triage in some US hospitals",
        source: "WSJ", url: "https://www.wsj.com/articles/self-service-kiosks-come-to-the-hospital-11562076000" },
      { pct: 58, title: "AI chatbots diagnose conditions from a selfie or a typed symptom list",
        source: "Wikipedia — Symptom checker", url: "https://en.wikipedia.org/wiki/Symptom_checker" },
      { pct: 68, title: "Ozempic prescribed via 90-second telehealth questionnaires",
        source: "Wikipedia — Ozempic", url: "https://en.wikipedia.org/wiki/Semaglutide" },
      { pct: 74, title: "FDA clears AI that reads your chest X-ray without a radiologist",
        source: "FDA", url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices" }
    ]
  },
  {
    id: "garbage-avalanche",
    title: "Garbage reaches structural-hazard levels",
    movie: "A garbage landslide buries a city.",
    stars: [
      { pct: 44, title: "The Great Pacific Garbage Patch: now roughly twice the size of Texas",
        source: "NOAA", url: "https://oceanservice.noaa.gov/facts/garbagepatch.html" },
      { pct: 60, title: "Delhi's Ghazipur landfill rises past 65 m — taller than the Taj Mahal",
        source: "Reuters", url: "https://www.reuters.com/article/idUSKCN1VG1ZL/" },
      { pct: 72, title: "Microplastics found in human blood, placenta, and brain tissue",
        source: "Nature", url: "https://www.nature.com/articles/d41586-024-00650-3" },
      { pct: 79, title: "E-waste tonnage now outpaces recycling infrastructure 5 to 1 (UN)",
        source: "UN", url: "https://unitar.org/about/news-stories/press/global-e-waste-monitor-2024-electronic-waste-rising-five-times-faster-documented-e-waste-recycling" }
    ]
  },
  {
    id: "smart-stop-breeding",
    title: "The smart stop reproducing",
    movie: "Opening montage: PhDs delay kids forever while a trailer dynasty explodes.",
    stars: [
      { pct: 47, title: "South Korea fertility rate drops below 0.7 — lowest in recorded history",
        source: "Reuters", url: "https://www.reuters.com/world/asia-pacific/south-koreas-fertility-rate-drops-fresh-record-low-2024-02-28/" },
      { pct: 62, title: "Japan declares demographic crisis 'on the brink of not functioning'",
        source: "BBC", url: "https://www.bbc.com/news/world-asia-64373950" },
      { pct: 74, title: "Educated-women birth rate half that of low-education cohorts (OECD)",
        source: "OECD Family Database", url: "https://www.oecd.org/els/family/database.htm" },
      { pct: 81, title: "Italy, Spain, Greece below replacement for 3+ decades running",
        source: "Eurostat", url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Fertility_statistics" }
    ]
  }
];
