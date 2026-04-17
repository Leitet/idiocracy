// Each "tell" is a cultural signal from the movie Idiocracy (2006).
// Stars are real-world news / reference items whose existence nudges the score.
// Stars use absolute positions on a 0-100 scale. The tell's score = the highest star.
// Total score = average of all tell scores.
//
// `trend` is editorial: "rising" (getting worse), "stable", or "easing" (improving).
// `date` is a human string: "Mar 5, 2024", "Sep 2023", "2015–present".

const TELLS = [
  {
    id: "brawndo",
    title: "Use sports drinks to water crops",
    movie: "Brawndo — It's got what plants crave. It's got electrolytes.",
    trend: "rising",
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
    trend: "rising",
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
    trend: "rising",
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
    trend: "stable",
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
    trend: "stable",
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
    trend: "rising",
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
    trend: "rising",
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
    trend: "rising",
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
    trend: "rising",
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
    trend: "rising",
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
  },

  // ---------- NEW TELLS ----------

  {
    id: "tattoo-id",
    title: "Your tattoo IS your ID",
    movie: "Joe's arm barcode gets scanned at every checkpoint. No scan, no service.",
    trend: "rising",
    stars: [
      { pct: 36, date: "Jan 18, 2020",
        title: "Clearview AI scrapes 3B+ photos for facial-recognition database",
        source: "NYT", url: "https://www.nytimes.com/2020/01/18/technology/clearview-privacy-facial-recognition.html" },
      { pct: 55, date: "2014–present",
        title: "China's Social Credit System — camera-graded citizens, blacklists",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Social_Credit_System" },
      { pct: 68, date: "Jul 24, 2023",
        title: "Worldcoin launches iris-scanning 'Orb' for global biometric ID",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Worldcoin" },
      { pct: 75, date: "2023–present",
        title: "TSA facial-recognition at 30+ US airports; opt-out pressure reported",
        source: "Wikipedia — TSA", url: "https://en.wikipedia.org/wiki/Transportation_Security_Administration#Biometrics" }
    ]
  },
  {
    id: "iq-falling",
    title: "Measured IQ starts falling",
    movie: "500 years of dumbing down. The smartest man alive is merely average.",
    trend: "rising",
    stars: [
      { pct: 40, date: "Jun 11, 2018",
        title: "Norway study: IQ scores have declined since the mid-1970s",
        source: "PNAS", url: "https://www.pnas.org/doi/10.1073/pnas.1718793115" },
      { pct: 55, date: "Mar 9, 2023",
        title: "Northwestern study finds first IQ declines in the US since scoring began",
        source: "Intelligence journal", url: "https://www.sciencedirect.com/science/article/abs/pii/S0160289623000132" },
      { pct: 66, date: "Oct 24, 2022",
        title: "NAEP: US 4th/8th-grade math and reading scores see largest drops ever recorded",
        source: "NCES / NAEP", url: "https://www.nationsreportcard.gov/highlights/mathematics/2022/" },
      { pct: 72, date: "2023",
        title: "PISA (OECD): pandemic-era decline across reading, math, and science in most countries",
        source: "OECD", url: "https://www.oecd.org/pisa/publications/pisa-2022-results.htm" }
    ]
  },
  {
    id: "museum-revisionism",
    title: "The museum is confidently wrong",
    movie: "A history exhibit claims Einstein invented gravity. A guide calls a cave 'where Jesus was born'.",
    trend: "rising",
    stars: [
      { pct: 42, date: "May 28, 2007",
        title: "Creation Museum opens in Kentucky — shows humans coexisting with dinosaurs",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Creation_Museum" },
      { pct: 57, date: "Jul 7, 2016",
        title: "Ark Encounter — full-scale Noah's Ark theme park — opens as historical exhibit",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ark_Encounter" },
      { pct: 65, date: "Nov 17, 2017",
        title: "Flat Earth International Conference draws hundreds to 'disprove NASA'",
        source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Flat_Earth_International_Conference" },
      { pct: 73, date: "2020–present",
        title: "TikTok 'hidden history' pseudo-documentaries outperform accredited sources",
        source: "Wikipedia — Misinformation on TikTok", url: "https://en.wikipedia.org/wiki/Misinformation_related_to_TikTok" }
    ]
  },
  {
    id: "sexualized-everything",
    title: "Starbucks offers 'full body lattes'",
    movie: "Routine services at mainstream chains are explicitly sexual.",
    trend: "rising",
    stars: [
      { pct: 44, date: "2016–present",
        title: "OnlyFans grows to 3M+ creators; $6.6B GMV by 2023",
        source: "Wikipedia — OnlyFans", url: "https://en.wikipedia.org/wiki/OnlyFans" },
      { pct: 58, date: "2021–present",
        title: "Mainstream actors and athletes migrate to creator-content platforms",
        source: "Wikipedia — Creator economy", url: "https://en.wikipedia.org/wiki/Creator_economy" },
      { pct: 66, date: "2022–present",
        title: "Thirst-trap aesthetics dominate brand marketing on TikTok/Instagram",
        source: "Wikipedia — Thirst trap", url: "https://en.wikipedia.org/wiki/Thirst_trap" },
      { pct: 70, date: "Oct 2023",
        title: "AI companion apps (Replika, Character.ai) pivot to paid romantic roleplay",
        source: "Wikipedia — Replika", url: "https://en.wikipedia.org/wiki/Replika" }
    ]
  }
];
