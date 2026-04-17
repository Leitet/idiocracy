// Each "tell" is a cultural signal from the movie Idiocracy (2006).
// Stars are real-world news / reference items whose existence nudges the score.
// Stars use absolute positions on a 0-100 scale. The tell's score = the highest star.
// Total score = average of all tell scores.
//
// `date` is a human-readable string: "Mar 5, 2024", "Sep 2023", "2015–present".
// URLs point to primary sources — Wikipedia, major news outlets, government agencies.

const TELLS = [
  {
    id: "brawndo",
    title: "Use sports drinks to water crops",
    movie: "Brawndo — It's got what plants crave. It's got electrolytes.",
    stars: [
      { pct: 22, date: "Oct 2013",
        title: "Brawndo trademarked and sold as a real-world energy drink",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Brawndo" },
      { pct: 41, date: "2020–present",
        title: "Electrolyte-obsessed marketing becomes a mass category (Liquid I.V., LMNT, Prime)",
        source: "Wikipedia — Liquid I.V.", url: "https://en.wikipedia.org/wiki/Liquid_I.V." },
      { pct: 58, date: "Dec 29, 2017",
        title: "'Raw water' trend: people pay premium for unfiltered spring water",
        source: "NYT", url: "https://www.nytimes.com/2017/12/29/dining/raw-water-unfiltered.html" },
      { pct: 67, date: "Jan 2023",
        title: "Prime Hydration: celebrity-branded electrolyte drink triggers school bans",
        source: "Wikipedia — Prime (drink)", url: "https://en.wikipedia.org/wiki/Prime_(drink)" }
    ]
  },
  {
    id: "wrestler-president",
    title: "Wrestler / entertainer becomes head of state",
    movie: "President Dwayne Elizondo Mountain Dew Herbert Camacho — five-time ultimate smackdown champion.",
    stars: [
      { pct: 35, date: "Nov 3, 1998",
        title: "Jesse 'The Body' Ventura elected Governor of Minnesota",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jesse_Ventura" },
      { pct: 52, date: "Oct 7, 2003",
        title: "Arnold Schwarzenegger wins California recall election",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Governorship_of_Arnold_Schwarzenegger" },
      { pct: 78, date: "Nov 8, 2016",
        title: "Donald Trump (WWE Hall of Fame, 2013) elected US President",
        source: "Wikipedia — Trump & wrestling", url: "https://en.wikipedia.org/wiki/Donald_Trump_and_wrestling" },
      { pct: 84, date: "Apr 21, 2019",
        title: "Volodymyr Zelenskyy, sitcom comedian, elected President of Ukraine",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Volodymyr_Zelenskyy" }
    ]
  },
  {
    id: "ow-my-balls",
    title: "'Ow! My Balls!' is what passes for entertainment",
    movie: "The #1 show in 2505 is a man getting hit in the groin. For 90 minutes.",
    stars: [
      { pct: 40, date: "1989–present",
        title: "America's Funniest Home Videos builds a 30-year empire on groin-injury clips",
        source: "Wikipedia — AFV", url: "https://en.wikipedia.org/wiki/America%27s_Funniest_Home_Videos" },
      { pct: 61, date: "2000–present",
        title: "Jackass franchise grosses hundreds of millions, four theatrical films",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jackass_(franchise)" },
      { pct: 77, date: "2020–present",
        title: "TikTok 'fail' and pain-challenge videos dominate short-form feeds",
        source: "Wikipedia — TikTok", url: "https://en.wikipedia.org/wiki/TikTok" },
      { pct: 82, date: "Jun 2024",
        title: "MrBeast — pain/endurance spectacle — overtakes T-Series as #1 on YouTube",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/MrBeast" }
    ]
  },
  {
    id: "costco-everything",
    title: "Costco sells everything, including law degrees",
    movie: "Welcome to Costco. I love you.",
    stars: [
      { pct: 30, date: "2010–present",
        title: "Costco sells engagement rings, coffins, and vacation packages",
        source: "Wikipedia — Costco", url: "https://en.wikipedia.org/wiki/Costco" },
      { pct: 48, date: "May 10, 2019",
        title: "Couples getting legally married inside Costco warehouses",
        source: "BBC", url: "https://www.bbc.com/news/world-us-canada-48133678" },
      { pct: 66, date: "2019–2024",
        title: "Walmart Health offers primary care, dental, optical inside stores",
        source: "Wikipedia — Walmart Health", url: "https://en.wikipedia.org/wiki/Walmart_Health" },
      { pct: 71, date: "Feb 22, 2023",
        title: "Amazon closes One Medical acquisition — same-day doctor visits via Prime",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/One_Medical" }
    ]
  },
  {
    id: "corporate-everything",
    title: "Corporate logos replace public life",
    movie: "Carl's Jr. — Fuck you, I'm eating.",
    stars: [
      { pct: 45, date: "1990–present",
        title: "Stadium naming rights: venues renamed every few years to the highest bidder",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Naming_rights" },
      { pct: 62, date: "Jun 28, 2012",
        title: "NYC sells an entire subway station to a brand (Atlantic Av–Barclays Center)",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Atlantic_Avenue%E2%80%93Barclays_Center_station" },
      { pct: 74, date: "Jan 25, 2011",
        title: "School districts sell naming rights to gyms, fields, and hallways",
        source: "NYT", url: "https://www.nytimes.com/2011/01/26/education/26schools.html" },
      { pct: 80, date: "2020–present",
        title: "Top NFL stadiums now earn more from sponsor logos than from tickets",
        source: "Wikipedia — Sponsorship", url: "https://en.wikipedia.org/wiki/Sponsorship" }
    ]
  },
  {
    id: "anti-intellect",
    title: "Anti-intellectualism becomes mainstream",
    movie: "You talk like a fag, and your shit's all retarded.",
    stars: [
      { pct: 38, date: "2015–present",
        title: "Modern flat-Earth beliefs surge in the streaming era",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Modern_flat_Earth_beliefs" },
      { pct: 56, date: "2020–2022",
        title: "Ivermectin and bleach promoted as COVID cures by millions",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ivermectin_during_the_COVID-19_pandemic" },
      { pct: 72, date: "2023",
        title: "WHO: measles cases rise sharply as vaccination coverage slips",
        source: "WHO", url: "https://www.who.int/news-room/fact-sheets/detail/measles" },
      { pct: 81, date: "2020–present",
        title: "'Do your own research' meme crowds out expert sources on social feeds",
        source: "Wikipedia — Misinformation", url: "https://en.wikipedia.org/wiki/Misinformation" }
    ]
  },
  {
    id: "language-decay",
    title: "Vocabulary collapses to grunts and brands",
    movie: "A hybrid of hillbilly, valley girl, inner-city slang, and various grunts.",
    stars: [
      { pct: 33, date: "Nov 17, 2015",
        title: "Oxford Word of the Year is an emoji: 😂 Face with Tears of Joy",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Face_with_Tears_of_Joy_emoji" },
      { pct: 49, date: "Dec 4, 2023",
        title: "'Rizz' named Oxford Word of the Year",
        source: "Oxford Languages", url: "https://corp.oup.com/word-of-the-year/" },
      { pct: 63, date: "2024",
        title: "Gen Alpha 'brainrot' vocabulary — skibidi, gyatt, fanum tax — enters mainstream",
        source: "Wikipedia — Brain rot", url: "https://en.wikipedia.org/wiki/Brain_rot" },
      { pct: 70, date: "Jul 2019",
        title: "US Dept of Ed: 54% of adults read below 6th-grade level",
        source: "NCES / PIAAC", url: "https://nces.ed.gov/pubs2019/2019179.pdf" }
    ]
  },
  {
    id: "medical-buttons",
    title: "Medicine by cartoon buttons",
    movie: "Hospital diagnosis is pressing a picture of a body part. A computer reads your tattoo.",
    stars: [
      { pct: 41, date: "Jul 2019",
        title: "Self-service kiosks replace ER triage in parts of the US hospital system",
        source: "WSJ", url: "https://www.wsj.com/articles/self-service-kiosks-come-to-the-hospital-11562076000" },
      { pct: 58, date: "2020–present",
        title: "AI symptom checkers diagnose from a typed list or a selfie",
        source: "Wikipedia — Symptom checker", url: "https://en.wikipedia.org/wiki/Symptom_checker" },
      { pct: 68, date: "2023",
        title: "Ozempic and GLP-1 drugs prescribed via 90-second telehealth forms",
        source: "Wikipedia — Semaglutide", url: "https://en.wikipedia.org/wiki/Semaglutide" },
      { pct: 74, date: "2022–present",
        title: "FDA clears AI devices that read chest X-rays without a radiologist",
        source: "FDA", url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices" }
    ]
  },
  {
    id: "garbage-avalanche",
    title: "Garbage reaches structural-hazard levels",
    movie: "A garbage landslide buries a city.",
    stars: [
      { pct: 44, date: "2018",
        title: "Great Pacific Garbage Patch measured at ~1.6 million km² — twice the size of Texas",
        source: "NOAA", url: "https://oceanservice.noaa.gov/facts/garbagepatch.html" },
      { pct: 60, date: "Sep 3, 2019",
        title: "Delhi's Ghazipur landfill rises past 65 m — set to exceed the Taj Mahal",
        source: "Reuters", url: "https://www.reuters.com/article/idUSKCN1VG1ZL/" },
      { pct: 72, date: "Feb 2024",
        title: "Microplastics found in human blood, placenta, and brain tissue",
        source: "Nature", url: "https://www.nature.com/articles/d41586-024-00650-3" },
      { pct: 79, date: "Mar 20, 2024",
        title: "UN: e-waste rising 5× faster than it is recycled (62 Mt in 2022)",
        source: "UN / UNITAR", url: "https://unitar.org/about/news-stories/press/global-e-waste-monitor-2024-electronic-waste-rising-five-times-faster-documented-e-waste-recycling" }
    ]
  },
  {
    id: "smart-stop-breeding",
    title: "The smart stop reproducing",
    movie: "Opening montage: PhDs delay kids forever while a trailer dynasty explodes.",
    stars: [
      { pct: 47, date: "Feb 28, 2024",
        title: "South Korea fertility rate drops to 0.72 — lowest in recorded history",
        source: "Reuters", url: "https://www.reuters.com/world/asia-pacific/south-koreas-fertility-rate-drops-fresh-record-low-2024-02-28/" },
      { pct: 62, date: "Jan 23, 2023",
        title: "Japan PM: country 'on the brink of not functioning' on demographics",
        source: "BBC", url: "https://www.bbc.com/news/world-asia-64373950" },
      { pct: 74, date: "2023",
        title: "OECD: highly-educated women have ~half the births of low-education cohorts",
        source: "OECD Family Database", url: "https://www.oecd.org/els/family/database.htm" },
      { pct: 81, date: "1990–present",
        title: "Italy, Spain, Greece sub-replacement for 3+ decades running",
        source: "Eurostat", url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Fertility_statistics" }
    ]
  }
];
