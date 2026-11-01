/*READING THIS FILE IS NOT RECOMMENDED AS IT CONTAINS VULGAR LANGUAGE FOR CENSORING AND FLAGGING PURPOSES*/


































/* Censor engine (extracted from standalone page). Exposes window.processTextDirect(text, level, style) - style 'stars' (full ***) or 'replace' (default). */
(function(){
/* ============================== ENGINE ============================== */
const badWordsMap = new Map([
            // Original words from first response, with assigned ratings
            ["fuck", { replacement: "frick", rating: 3 }],
			["fuk", { replacement: "frik", rating: 3 }],
            ["shit", { replacement: "poop", rating: 2 }],
			["dipshit", { replacement: "fool", rating: 2 }],
			["shat", { replacement: "pooped", rating: 2 }],
            ["ass", { replacement: "butt", rating: 2 }],
			["jackass", { replacement: "donkey", rating: 2 }],
			["asses", { replacement: "butts", rating: 2 }],
            ["bitch", { replacement: "female dog", rating: 2 }],
			["puta", { replacement: "doo", rating: 1 }],
            ["cunt", { replacement: "woman private part", rating: 3 }],
			["prick", { replacement: "woman private part", rating: 3 }],
            ["dick", { replacement: "richard", rating: 2 }],
			["dik", { replacement: "richard", rating: 2 }],
			["puss", { replacement: "cat", rating: 2 }],
            ["pussy", { replacement: "cat", rating: 2 }],
			["pussies", { replacement: "cat", rating: 2 }],
            ["cock", { replacement: "rooster", rating: 2 }],
			["cok", { replacement: "rooster", rating: 2 }],
            ["bastard", { replacement: "person born out of wedlock", rating: 2 }],
            ["damn", { replacement: "darn", rating: 1 }],
            ["hell", { replacement: "heck", rating: 1 }],
            ["goddamn", { replacement: "gosh darn", rating: 2 }],
            ["motherfucker", { replacement: "hurtful person", rating: 3 }],
            ["son of a bitch", { replacement: "wild animal", rating: 2 }],
            ["arse", { replacement: "rear end", rating: 2 }],
            ["bollocks", { replacement: "nonsense", rating: 2 }],
			["wank", { replacement: "do silly things", rating: 2 }],
            ["wanker", { replacement: "silly person", rating: 2 }],
            ["twat", { replacement: "silly person", rating: 2 }],
            ["bugger", { replacement: "annoying person", rating: 2 }],
            ["crap", { replacement: "poop", rating: 1 }],
            ["dildo", { replacement: "toy", rating: 2 }],
            ["jerkoff", { replacement: "solo activity", rating: 2 }],
            ["cum", { replacement: "mayo", rating: 3 }],
			["cummed", { replacement: "mayo blasted", rating: 3 }],
            ["cumming", { replacement: "mayo blasting", rating: 3 }],
            ["semen", { replacement: "male reproductive fluid", rating: 2 }],
			["jizz", { replacement: "male reproductive fluid", rating: 3 }],
            ["sperm", { replacement: "male reproductive cells", rating: 2 }],
            ["blowjob", { replacement: "mouth time", rating: 2 }],
            ["handjob", { replacement: "hand time", rating: 2 }],
            ["tit", { replacement: "breast", rating: 2 }],
			["titties", { replacement: "breasts", rating: 2 }],
            ["tiddy", { replacement: "breast", rating: 2 }],
            ["tiddies", { replacement: "breasts", rating: 2 }],
            ["boob", { replacement: "breast", rating: 1 }],
			["booby", { replacement: "breast", rating: 1 }],
			["boobies", { replacement: "breasts", rating: 1 }],
            ["nipple", { replacement: "breast tip", rating: 1 }],
			["clitoris", { replacement: "female pleasure organ", rating: 1 }],
            ["clit", { replacement: "female pleasure organ", rating: 2 }],
            ["vagina", { replacement: "woman doodle", rating: 2 }],
            ["penis", { replacement: "man doodle", rating: 2 }],
            ["porn", { replacement: "adult entertainment", rating: 2 }],
            ["prostitute", { replacement: "worker", rating: 2 }],
            ["whore", { replacement: "worker", rating: 3 }],
            ["triche", { replacement: "worker", rating: 3 }],
            ["slut", { replacement: "revealing person", rating: 2 }],
            ["hooker", { replacement: "worker", rating: 2 }],
			["hoe", { replacement: "revealing person", rating: 2 }],
			["boner", { replacement: "sharp blade", rating: 2 }],
            ["faggot", { replacement: "dummy", rating: 3 }],
            ["fag", { replacement: "dumb", rating: 3 }],
            ["queer", { replacement: "gay", rating: 2 }],
            ["dyke", { replacement: "lesbian", rating: 3 }],
			["nigga", { replacement: "Black person", rating: 3 }],
            ["igga", { replacement: "lack person", rating: 3 }],
			["nigger", { replacement: "Black person", rating: 3 }],
            ["spic", { replacement: "Hispanic person", rating: 3 }],
            ["chink", { replacement: "Asian person", rating: 3 }],
            ["gook", { replacement: "Asian person", rating: 3 }],
            ["kike", { replacement: "Jewish person", rating: 3 }],
            ["wetback", { replacement: "immigrant", rating: 3 }],
            ["beaner", { replacement: "Hispanic person", rating: 3 }],
            ["paki", { replacement: "South Asian person", rating: 3 }],
            ["sand nigger", { replacement: "Middle Eastern person", rating: 3 }],
            ["raghead", { replacement: "Middle Eastern person", rating: 3 }],
            ["retard", { replacement: "retarded person", rating: 1 }],
            ["cripple", { replacement: "crippled person", rating: 2 }],
            ["spastic", { replacement: "cerebral palsy", rating: 2 }],
            ["mongoloid", { replacement: "Down Syndrome", rating: 2 }],
            ["tranny", { replacement: "transgender person", rating: 3 }],
            ["shemale", { replacement: "woman", rating: 3 }],
            ["hermaphrodite", { replacement: "intersex person", rating: 3 }],
            ["pedophile", { replacement: "child abuser", rating: 2 }],
            ["rapist", { replacement: "unlawful sexer", rating: 2 }],
            ["molester", { replacement: "child abuser", rating: 2 }],
            ["incest", { replacement: "adult act with relatives", rating: 2 }],
            ["bestiality", { replacement: "adult act with animals", rating: 3 }],
            ["necrophilia", { replacement: "adult act with corpses", rating: 3 }],
            ["asshole", { replacement: "butthole", rating: 2 }],
            ["scumbag", { replacement: "despicable person", rating: 2 }],
			["douche", { replacement: "fool", rating: 2 }],
            ["douchebag", { replacement: "fool", rating: 2 }],
            ["butt-fuck", { replacement: "anal act", rating: 3 }],
            ["cocksucker", { replacement: "drinker of the pee", rating: 3 }],
            ["fellatio", { replacement: "drinking act", rating: 2 }],
			["felch", { replacement: "drink", rating: 3 }],
            ["cunnilingus", { replacement: "drinking act", rating: 2 }],
            ["sodomy", { replacement: "poohole act", rating: 3 }],
            ["ejaculate", { replacement: "release bodily fluid", rating: 2 }],
			["ejaculating", { replacement: "releasing bodily fluid", rating: 2 }],
            ["ejaculated", { replacement: "released bodily fluid", rating: 2 }],
            ["ejaculat", { replacement: "placeholder", rating: 2 }],
            ["orgasm", { replacement: "adult climax", rating: 2 }],
            ["sexual intercourse", { replacement: "adult activity", rating: 2 }],
            ["fornication", { replacement: "adult relations outside marriage", rating: 2 }],
            ["adultery", { replacement: "adult relations with married person", rating: 2 }],
            ["pervert", { replacement: "unstable person", rating: 2 }],
            ["queef", { replacement: "non-fart air expulsion", rating: 2 }],
            ["smegma", { replacement: "private secretion", rating: 2 }],
            ["gonorrhea", { replacement: "not-diarrhea juicy blast", rating: 2 }],
            ["syphilis", { replacement: "infection", rating: 2 }],
            ["chlamydia", { replacement: "infection", rating: 2 }],
            ["herpes", { replacement: "bumps", rating: 2 }],
            ["aids", { replacement: "infection", rating: 2 }],
            ["hiv", { replacement: "infection", rating: 2 }],
            ["crackhead", { replacement: "crack addict", rating: 1 }],
            ["junkie", { replacement: "obsesser", rating: 1 }],
            ["drunkard", { replacement: "drunk", rating: 2 }],
            ["piss", { replacement: "pee", rating: 2 }],
            ["shithead", { replacement: "poopooface", rating: 2 }],
            ["asswipe", { replacement: "buttsmear", rating: 2 }],
			["scrote", { replacement: "ballsack", rating: 2 }],
            ["scrotum", { replacement: "ballsack", rating: 2 }],
			["testicle", { replacement: "ball", rating: 2 }],
            ["testicles", { replacement: "balls", rating: 2 }],
            ["ovaries", { replacement: "girlballs", rating: 2 }],
			["ovary", { replacement: "girlball", rating: 2 }],
            ["uterus", { replacement: "baby safe", rating: 2 }],
            ["genitals", { replacement: "private parts", rating: 2 }],
            ["pubic", { replacement: "groin area", rating: 2 }],
            ["erection", { replacement: "uprightening", rating: 2 }],
            ["ejaculation", { replacement: "release of body fluid", rating: 2 }],
			["deep throat", { replacement: "feed", rating: 3 }],
			["deepthroat", { replacement: "feed", rating: 3 }],
            ["suck", { replacement: "drink", rating: 1 }],
            ["sucker", { replacement: "dummy", rating: 1 }],
            ["rectum", { replacement: "lower intestine", rating: 1 }],
            ["anus", { replacement: "rear opening", rating: 1 }],
			["anal", { replacement: "rear end", rating: 1 }],
            ["masturbate", { replacement: "the best bait in Terraria", rating: 2 }],
			["masturbated", { replacement: "used the best bait in Terraria", rating: 2 }],
			["masturbation", { replacement: "the process of using the best bait in Terraria", rating: 2 }],
			["masturbating", { replacement: "using the best bait in terraria", rating: 2 }],
			["masturbat", { replacement: "placeholder", rating: 2 }],
			["beat the meat", { replacement: "the best bait in Terraria", rating: 2 }],
			["beating the meat", { replacement: "using the best bait in terraria", rating: 2 }],
			["jack-off", { replacement: "the best bait in Terraria", rating: 2 }],
			["jack off", { replacement: "the best bait in Terraria", rating: 2 }],
			["jackoff", { replacement: "the best bait in Terraria", rating: 2 }],
			["jacked off", { replacement: "used the best bait in Terraria", rating: 2 }],
			["jacking off", { replacement: "using the best bait in Terraria", rating: 2 }],
			["jerk-off", { replacement: "the best bait in Terraria", rating: 2 }],
			["jerk off", { replacement: "the best bait in Terraria", rating: 2 }],
			["jerkoff", { replacement: "the best bait in Terraria", rating: 2 }],
			["jerked off", { replacement: "used the best bait in Terraria", rating: 2 }],
			["jerking off", { replacement: "using the best bait in Terraria", rating: 2 }],
            ["erotic", { replacement: "stimulating", rating: 2 }],
            ["threesome", { replacement: "three-in-one bundle", rating: 2 }],
            ["orgy", { replacement: "extracurricular club", rating: 2 }],
            ["gangbang", { replacement: "bad party", rating: 2 }],
            ["golden shower", { replacement: "water sports", rating: 2 }],
            ["scat", { replacement: "fecal play", rating: 2 }],
            ["bdsm", { replacement: "painful activities", rating: 2 }],
            ["fetish", { replacement: "supernatural", rating: 2 }],
            ["kinky", { replacement: "twisted", rating: 2 }],
			["horny", { replacement: "mesmerized", rating: 2 }],
			["rawdog", { replacement: "naked", rating: 2 }],
            ["dominatrix", { replacement: "dominant woman", rating: 2 }],
            ["submissive", { replacement: "subordinate person", rating: 2 }],
            ["sadist", { replacement: "pain inflicter", rating: 2 }],
            ["masochist", { replacement: "pain receiver", rating: 2 }],
            ["bondage", { replacement: "restraint", rating: 1 }],
            ["spank", { replacement: "whoop", rating: 2 }],
            ["cuckold", { replacement: "betrayed spouse", rating: 2 }],
            ["cuck", { replacement: "betrayed spouse", rating: 2 }],
            ["incestuous", { replacement: "related by blood", rating: 2 }],
            ["fisting", { replacement: "punching", rating: 3 }],
            ["rimjob", { replacement: "poo poo clean", rating: 3 }],
			["footjob", { replacement: "foot clean", rating: 2 }],
			["nipplejob", { replacement: "breast clean", rating: 2 }],
            ["fornicator", { replacement: "non-marriage adult performer", rating: 2 }],
            ["adulterer", { replacement: "person who commits adultery", rating: 2 }],
            ["pederast", { replacement: "child abuser", rating: 3 }],
            ["zoophile", { replacement: "animal man", rating: 3 }],
            ["necrophile", { replacement: "corpse man", rating: 3 }],
            ["sexual predator", { replacement: "monster", rating: 3 }],
            ["abuser", { replacement: "person who abuses", rating: 2 }],
            ["child molester", { replacement: "child abuser", rating: 3 }],
            ["rape", { replacement: "assault", rating: 2 }],
            ["gang rape", { replacement: "group assault", rating: 3 }],
            ["sexual harassment", { replacement: "harassment", rating: 2 }],
            ["grope", { replacement: "touch funny", rating: 2 }],
            ["fondle", { replacement: "touch adult-like", rating: 2 }],
            ["exhibitionist", { replacement: "self exposer", rating: 2 }],
            ["voyeur", { replacement: "watcher", rating: 2 }],
            ["peeping tom", { replacement: "watcher", rating: 2 }],
			["ballsack", { replacement: "balloon", rating: 1 }],
            ["freak", { replacement: "creep", rating: 1 }],
            ["idiot", { replacement: "fool", rating: 1 }],
            ["moron", { replacement: "dummy", rating: 1 }],
            ["loser", { replacement: "underdog", rating: 1 }],
            ["stupid", { replacement: "unwise", rating: 1 }],
			["breast", { replacement: "chest", rating: 1 }],
			["sex", { replacement: "fun", rating: 1 }],
			["gay", { replacement: "odd", rating: 1 }],
			["lesbian", { replacement: "odd girl", rating: 1 }],
			["queer", { replacement: "odd", rating: 1 }],
			["transgender", { replacement: "clown", rating: 1 }],
			["transexual", { replacement: "clown", rating: 1 }],
			["lgbt", { replacement: "odd", rating: 1 }],
			["lgbtq", { replacement: "odd", rating: 1 }],
			["lgbtqia", { replacement: "odd", rating: 1 }],
			["twink", { replacement: "donut", rating: 1 }],
			["feminist", { replacement: "protester", rating: 1 }],
			["feminism", { replacement: "protest culture", rating: 1 }],
			["demiboy", { replacement: "boy", rating: 1 }],
			["demigirl", { replacement: "girl", rating: 1 }],
			// Little Kid Censored Words
			["poop", { replacement: "doo", rating: 1 }],
			["poopy", { replacement: "doodly", rating: 1 }],
			["poo", { replacement: "doo", rating: 1 }],
			["poopoo", { replacement: "doodoo", rating: 1 }],
			["pee", { replacement: "dew", rating: 1 }],
			["peepee", { replacement: "gooey duck", rating: 1 }],
			["urine", { replacement: "dee", rating: 1 }],
			["excrement", { replacement: "dum", rating: 1 }],
			["feces", { replacement: "dum", rating: 1 }],
			["crap", { replacement: "stink", rating: 1 }],
			["frick", { replacement: "bonkers", rating: 1 }],
			["fricking", { replacement: "bonking", rating: 1 }],
			["fricker", { replacement: "bonkerman", rating: 1 }],
			["jeez", { replacement: "sheesh", rating: 1 }],
			["butt", { replacement: "potato", rating: 1 }],
			["tush", { replacement: "tater", rating: 1 }],
			["anus", { replacement: "tube", rating: 1 }],
			["rectum", { replacement: "backup", rating: 1 }],
			["anal", { replacement: "mad", rating: 1 }],
			["dammit", { replacement: "fiddlesticks", rating: 1 }],
			["abortion", { replacement: "politics", rating: 1 }],
			["kidnap", { replacement: "steal", rating: 1 }],
			["kidnapped", { replacement: "stole", rating: 1 }],
			["fart", { replacement: "air", rating: 1 }],
			["puke", { replacement: "gag", rating: 1 }],
			["vomit", { replacement: "gag", rating: 1 }],
			["barf", { replacement: "gag", rating: 1 }],
			["diarrhea", { replacement: "liquid doo", rating: 1 }],
			["moron", { replacement: "silly", rating: 1 }],
			["idiot", { replacement: "goofy", rating: 1 }],
			["sucker", { replacement: "dum doodle", rating: 1 }],
			["retarded", { replacement: "slow", rating: 1 }],
			["turd", { replacement: "doodad", rating: 1 }],
			["wiener", { replacement: "hot dog", rating: 1 }],
			["drunk", { replacement: "tired", rating: 1 }],
			["vodka", { replacement: "capri sun", rating: 1 }],
			["bourbon", { replacement: "kool-aid", rating: 1 }],
			["groin", { replacement: "in-the-legs", rating: 1 }],
			["terrorist", { replacement: "meany", rating: 1 }],
			["terrorism", { replacement: "mean culture", rating: 1 }],
			["communist", { replacement: "confined", rating: 1 }],
			["communism", { replacement: "confined culture", rating: 1 }],
			["nude", { replacement: "naked", rating: 1 }],
			["slaughter", { replacement: "tickle", rating: 1 }],
			["murder", { replacement: "slap", rating: 1 }],
			["murderer", { replacement: "slapper", rating: 1 }],
			["murdered", { replacement: "slapped", rating: 1 }],
            ["abuse", { replacement: "tight hug", rating: 1 }],
            ["trifling", { replacement: "forgot-their-bubble-bath", rating: 1 }],
            ["satan", { replacement: "mean dude", rating: 1 }],
            ["satanic", { replacement: "mean dude aligned", rating: 1 }],
            ["slave", { replacement: "24/7 worker", rating: 1 }],
        ]);

        
const whitelistedWords = new Map([
            // Universal Whitelist (whitelisted for all levels 1, 2, 3)
            ["assassinate", [1, 2, 3]],
            ["assassin", [1, 2, 3]],
            ["assassination", [1, 2, 3]],
			["assassinated", [1, 2, 3]],
            ["classic", [1, 2, 3]],
			["compass", [1, 2, 3]],
            ["passing", [1, 2, 3]],
            ["passage", [1, 2, 3]],
			["bypass", [1, 2, 3]],
			["grassroots", [1, 2, 3]],
            ["massive", [1, 2, 3]],
            ["assist", [1, 2, 3]],
            ["assistant", [1, 2, 3]],
            ["assistance", [1, 2, 3]],
			["encompass", [1, 2, 3]],
            ["assess", [1, 2, 3]],
            ["assign", [1, 2, 3]],
			["assignment", [1, 2, 3]],
            ["assigned", [1, 2, 3]],
            ["classwork", [1, 2, 3]],
			["classroom", [1, 2, 3]],
            ["classicist", [1, 2, 3]],
			["passable", [1, 2, 3]],
            ["sassy", [1, 2, 3]],
            ["surpass", [1, 2, 3]],
			["crosspass", [1, 2, 3]],
            ["assess", [1, 2, 3]],
            ["assessment", [1, 2, 3]],
			["assessed", [1, 2, 3]],
            ["associate", [1, 2, 3]],
            ["association", [1, 2, 3]],
            ["class", [1, 2, 3]],
            ["passage", [1, 2, 3]],
            ["compass", [1, 2, 3]],
            ["grass", [1, 2, 3]],
            ["mass", [1, 2, 3]],
            ["brass", [1, 2, 3]],
			["retardant", [1, 2, 3]],
            ["pussycat", [1, 2, 3]],
            ["cocktail", [1, 2, 3]],
            ["hellfire", [1, 2, 3]],
            ["shellfish", [1, 2, 3]],
            ["damnation", [1, 2, 3]],
            ["scunthorpe", [1, 2, 3]],
            ["analyst", [1, 2, 3]],
            ["analysis", [1, 2, 3]],
            ["analogy", [1, 2, 3]],
            ["titmouse", [1, 2, 3]],
            ["booboo", [1, 2, 3]],
            ["nipplewort", [1, 2, 3]],
			["breastplate", [1, 2, 3]],
			["twinkie", [1, 2, 3]],
			["twinkle", [1, 2, 3]],
            // Tiered Whitelist (whitelisted for Standard and Mild, but NOT Child Lock)
            // Example: "badass" is whitelisted for levels 2 and 3.
            // If censorLevel is 1 (Child Lock), it will be censored.
            ["badass", [2, 3]],
            ["badasses", [2, 3]],
            ["kickass", [2, 3]],
        ]);

        
// ---- Extra words (added on top of the originals; never override them) ----
const EXTRA_WORDS = [
  ["badass",{replacement:"tough guy",rating:1}],["kickass",{replacement:"awesome",rating:1}],["badasses",{replacement:"tough guys",rating:1}],
  ["dumbass",{replacement:"dummy",rating:2}],["smartass",{replacement:"wise guy",rating:2}],["fatass",{replacement:"big person",rating:2}],
  ["motherfucker",{replacement:"mean person",rating:3}],["motherfucking",{replacement:"mean",rating:3}],["fucker",{replacement:"frick-er",rating:3}],
  ["fuckwit",{replacement:"silly person",rating:3}],["fuckface",{replacement:"silly face",rating:3}],["fuckhead",{replacement:"silly head",rating:3}],
  ["bullshit",{replacement:"baloney",rating:2}],["horseshit",{replacement:"hogwash",rating:2}],["batshit",{replacement:"wacky",rating:2}],["shitty",{replacement:"yucky",rating:2}],
  ["crappy",{replacement:"stinky",rating:1}],["arsehole",{replacement:"rear opening",rating:2}],["arsewipe",{replacement:"buttsmear",rating:2}],
  ["goddamn",{replacement:"gosh darn",rating:2}],["goddamnit",{replacement:"gosh darn it",rating:2}],["god damn",{replacement:"gosh darn",rating:2}],
  ["hell",{replacement:"heck",rating:1}],["bloody",{replacement:"darn",rating:1}],["piss off",{replacement:"go away",rating:2}],["pissed off",{replacement:"very annoyed",rating:2}],
  ["screw you",{replacement:"shoo",rating:1}],["tosser",{replacement:"silly person",rating:2}],["prat",{replacement:"silly person",rating:2}],
  ["bellend",{replacement:"silly person",rating:2}],["knobhead",{replacement:"silly person",rating:2}],["numbnuts",{replacement:"silly person",rating:2}],
  ["nutsack",{replacement:"ballsack",rating:2}],["cumshot",{replacement:"mayo blast",rating:3}],["cumslut",{replacement:"mayo fan",rating:3}],["creampie",{replacement:"dessert",rating:3}],
  ["bukkake",{replacement:"big mess",rating:3}],["hentai",{replacement:"cartoons",rating:2}],["milf",{replacement:"mom",rating:2}],["vibrator",{replacement:"massager",rating:2}],
  ["buttplug",{replacement:"plug",rating:2}],["butthole",{replacement:"rear opening",rating:2}],["dickhead",{replacement:"silly head",rating:2}],["titfuck",{replacement:"chest hug",rating:3}],
  ["blow job",{replacement:"mouth time",rating:2}],["hand job",{replacement:"hand time",rating:2}],["rim job",{replacement:"poo poo clean",rating:3}],["boob job",{replacement:"chest surgery",rating:1}],
  ["pornography",{replacement:"adult entertainment",rating:2}],["pornographic",{replacement:"adult-themed",rating:2}],["nsfw",{replacement:"grown-up content",rating:1}],
  ["wtf",{replacement:"what the heck",rating:1}],["wth",{replacement:"what the heck",rating:1}],["stfu",{replacement:"be quiet",rating:2}],["gtfo",{replacement:"go away",rating:2}],
  ["omfg",{replacement:"oh my goodness",rating:2}],["lmfao",{replacement:"laughing",rating:1}],["ffs",{replacement:"for goodness sake",rating:1}],
  ["towelhead",{replacement:"Middle Eastern person",rating:3}],["wop",{replacement:"Italian person",rating:3}],["dago",{replacement:"Italian person",rating:3}],["honky",{replacement:"white person",rating:3}],
  ["kraut",{replacement:"German person",rating:3}],["trannie",{replacement:"clown with an ego",rating:2}],["midget",{replacement:"little person",rating:1}],["libtard",{replacement:"person",rating:2}],
  ["fucktard",{replacement:"silly person",rating:3}],["jackasses",{replacement:"donkeys",rating:2}],["masturbator",{replacement:"bait user",rating:2}],["cumslut",{replacement:"mayo fan",rating:3}]
];
const EXTRA_WHITE = ("assume assumed assuming assumption assumptions assure assured assert asserted assertion asset assets assembly assemble assembled assault assaulted "+
 "assailant assay assiduous assimilate assimilation assorted assortment assort embarrass embarrassed embarrassing embarrassment harass harassed harassing hassle hassles hassled "+
 "cassette cassettes cassandra cassie lasso passion passionate passenger passengers passport passports password passwords passive passover past pasta paste pastel pastor "+
 "massage massages massaged message messages messenger messaged massacre massacred bassist bassoon bass classy classes classified classification glass glasses glassware sass lass "+
 "molasses carcass carcasses crevasse morass trespass trespassing impasse overpass underpass tassel jasmine basement assassins mass masses brasserie grasshopper grasses grassy "+
 "cockpit cockpits cockatoo cockney cockroach cockroaches cockerel cockle cockles peacock peacocks woodcock hancock hitchcock shuttlecock poppycock cockburn babcock "+
 "dickens dickinson dickson dickerson penistone essex sussex middlesex wessex sextet sexton sextant sextuple "+
 "title titles titled titan titans titanic titanium entitle entitled entitlement subtitle subtitles constitute constitution institution institute petition petitions competition competitions "+
 "repetition partition ambition nutrition tit-for-tat titter tithe tithes titillate titian attitude altitude latitude gratitude multitude aptitude platitude "+
 "document documents documented documentary documentation circumstance circumstances circumference cucumber cucumbers accumulate accumulated accumulation cumulative cumulus cumin "+
 "succumb succumbed modicum vacuum vacuums curriculum curricula cumbersome cumbria cumberland cumberbatch "+
 "shoe shoes shoelace shoemaker horseshoe horseshoes shoehorn hoe-down "+
 "speed speech peel peek peer peers peep peeping peeve people peoples beep steep sleep sweep deep keep sweet tweet "+
 "pool pools poor poodle poodles spoon spoons spool snoop "+
 "hive hives archive archives archived chive chives shiver shivers chivalry achiever "+
 "raids maids braids plaids said "+
 "canal canals banal renal venal analog analogue analytic analytical analytics anal-retentive "+
 "button buttons butter buttery butterfly buttress butte abutting rebuttal buttocks buttonhole buttonhook "+
 "grape grapes drape drapes draped drapery scrape scraped scraper scrapes scraping trapeze rapeseed crape "+
 "arsenal arsenals arsenic parse parsed parsing parser parsers sparse sparsely coarse coarsely hoarse hearse "+
 "spice spices spiced spicy despicable suspicion suspicions suspicious auspicious conspicuous inconspicuous perspicacious "+
 "pakistan pakistani pakistanis computation computations computational reputation reputations disputation deputation imputation amputation putative computable reputable disputable indisputable "+
 "fukushima fukuoka fukuda fukui saturday saturdays "+
 "swank swanky coke cokes "+
 "hello shell shells hellenic helmet helm helper helpful "+
 "cocoon cocoons raccoon raccoons tycoon tycoons "+
 "shiitake shitake mishit scum cuckoo cuckoos "+
 "prattle pratfall pratt "+
 "therapist therapists therapy "+
 "peanut peanuts penalty penal pubic-hair "+
 "twinkle twinkies "+
 "scrap scraps scrapped scrapping scrappy scrapyard scrapbook uranus janus manus cocker cockers niggard niggards niggardly wankel spicule spicules spicer prickle prickles prickly prickled prickling bitcoin").split(/\s+/).filter(w=>w&&!/[^a-z]/.test(w));


const MORE_RAW=`dumb|silly|1
dumber|sillier|1
dumbest|silliest|1
jerk|meanie|1
jerkface|meanie face|1
jerkwad|meanie|1
dork|goof|1
dweeb|goof|1
doofus|goof|1
dipstick|goof|1
knucklehead|goof|1
nimrod|goof|1
nitwit|silly person|1
halfwit|silly person|1
dimwit|silly person|1
imbecile|silly person|1
cretin|silly person|1
simpleton|silly person|1
buffoon|silly person|1
bozo|goof|1
blockhead|goof|1
airhead|goof|1
numbskull|goof|1
ignoramus|goof|1
butthead|silly head|1
buttface|silly face|1
poophead|silly head|1
fartface|silly face|1
weirdo|unusual person|1
psycho|wild person|1
lunatic|wild person|1
maniac|wild person|1
nutjob|wild person|1
nutcase|wild person|1
wacko|wild person|1
slob|messy person|1
sissy|scaredy-cat|1
wuss|scaredy-cat|1
shut up|be quiet|1
shutup|be quiet|1
screw up|mess up|1
screwup|mess-up|1
screwed up|messed up|1
frigging|really|1
friggin|really|1
friggen|really|1
freaking|really|1
freakin|really|1
flipping|really|1
effing|fricking|2
effin|fricking|2
blimey|goodness|1
crikey|goodness|1
hella|very|1
hellacious|wild|1
hells|hecks|1
hellhole|heck hole|1
hellish|heckish|1
hellspawn|heck spawn|1
hellbent|heck bent|1
damned|darned|1
damnit|darn it|1
goddam|gosh darn|2
goddammit|gosh darn it|2
goddamned|gosh darned|2
dang it|darn it|1
omg|oh my goodness|1
oh my god|oh my goodness|1
oh my gosh|oh my goodness|1
jesus christ|oh my goodness|1
holy crap|holy moly|1
holy shit|holy moly|2
holy fuck|holy moly|3
holy hell|holy moly|1
what the hell|what the heck|1
what the fuck|what the heck|3
what the shit|what the heck|2
what the f|what the heck|2
lmao|laughing|1
rofl|laughing|1
roflmao|laughing|1
kys|be well|3
kill yourself|be well|3
go kill yourself|go be well|3
kill urself|be well|3
go to hell|go away|2
fuck off|go away|3
fuck you|goodbye now|3
fuck this|nope to this|3
fuck that|nope to that|3
fuck it|forget it|3
f off|go away|2
bugger off|go away|2
sod off|go away|2
get fucked|go away|3
eat shit|eat dirt|2
kiss my ass|give me a high five|2
kiss my arse|give me a high five|2
suck my dick|say hi to my little guy|3
suck my cock|say hi to my big guy|3
blow me|wave at me|2
bite me|talk to the hand|1
shut the fuck up|please be quiet|3
shut the hell up|please be quiet|2
no shit|no way|2
oh shit|oh no|2
oh fuck|oh no|3
oh crap|oh no|1
full of shit|full of nonsense|2
piece of shit|piece of junk|2
piece of crap|piece of junk|1
piece of work|piece of art|1
give a fuck|care|3
give a shit|care|2
give a damn|care|1
dont give a fuck|dont care|3
dont give a shit|dont care|2
dont give a damn|dont care|1
fuck around|mess around|3
fucking around|messing around|3
fuck up|mess up|3
fucked up|messed up|3
shit happens|stuff happens|2
sons of bitches|wild animals|2
mother fucker|hurtful person|3
mother fucking|mean|3
ass hole|butthole|2
dumb ass|dummy|2
bad ass|tough guy|1
smart ass|wise guy|2
jack ass|donkey|2
dick head|silly head|2
shit head|poopooface|2
fuck head|silly head|3
fuck face|silly face|3
bull shit|baloney|2
horse shit|hogwash|2
hell hole|heck hole|1
son of a gun|rascal|1
fucking|fricking|3
fucked|fricked|3
fucks|fricks|3
fuckin|fricking|3
fuckers|frick-ers|3
motherfuckers|mean people|3
motherfuckin|mean|3
mfer|mean person|3
fuckup|mess-up|3
fuckboy|silly boy|3
fuckery|nonsense|3
fuckload|big pile|3
fuckton|big pile|3
fuckass|silly person|3
fucktards|silly people|3
clusterfuck|big mess|3
mindfuck|brain twist|3
unfuck|fix|3
fugly|unique-looking|2
fugg|frick|3
fuggin|fricking|3
fvck|frick|3
fck|frick|3
fcking|fricking|3
shitting|pooping|2
shits|poops|2
shitted|pooped|2
shitload|big pile|2
shitshow|circus|2
shitstorm|big mess|2
shitface|poopy face|2
shitfaced|very sleepy|2
shitbag|poop bag|2
shitbird|poop bird|2
shitlord|poop lord|2
shitter|toilet|2
shithole|poop hole|2
shitless|poopless|2
shitpost|silly post|2
shitposting|silly posting|2
dipshits|fools|2
bitchy|grumpy|2
bitches|female dogs|2
bitching|whining|2
bitched|whined|2
bitchass|grumpy donkey|2
bitchin|awesome|2
bitchslap|scold|2
sonofabitch|wild animal|2
dickwad|silly wad|2
dickweed|silly weed|2
dickface|silly face|2
dickless|powerless|2
dicks|richards|2
dickish|richardish|2
cocks|roosters|2
cockhead|silly head|2
cockblock|party pooper|2
cocksucking|tooting|3
cockface|silly face|2
asshat|silly hat|2
asshats|silly hats|2
assclown|circus donkey|2
assface|silly face|2
assbag|silly bag|2
assholes|buttholes|2
assholery|rudeness|2
asslicker|brown noser|2
asskisser|brown noser|2
dumbasses|dummies|2
smartasses|wise guys|2
dickheads|silly heads|2
craps|stinks|1
crapped|stunk|1
crapping|stinking|1
crapper|toilet|1
crapola|nonsense|1
craphole|stink hole|1
crapshoot|gamble|1
pissed|mad|2
pissing|peeing|2
pisser|toilet|2
pissant|small ant|2
pisshead|silly head|2
pissy|grumpy|2
piss-off|go away|2
cunts|woman private parts|3
cunty|rude|3
cuntface|silly face|3
twats|silly people|2
twatface|silly face|2
twatwaffle|silly waffle|2
wankers|silly people|2
wanking|doing silly things|2
wanked|did silly things|2
wankstain|silly stain|2
pricks|woman private parts|3
prickish|rude|2
whores|workers|3
whorehouse|workplace|3
whorish|flirty|3
slutty|flirty|2
sluts|revealing people|2
skank|messy person|2
skanky|messy|2
strumpet|worker|2
harlot|worker|2
hussy|flirt|2
floozy|flirt|2
thot|flirt|2
thots|flirts|2
bimbo|airhead lady|2
dirtbag|yucky person|2
lowlife|sad person|2
slimeball|yucky person|2
sleazebag|yucky person|2
sleaze|yuck|2
sleazy|yucky|2
dingleberry|hanging crumb|2
dingleberries|hanging crumbs|2
turds|doodads|1
turdy|doodly|1
twerk|dance|1
twerking|dancing|1
booty|caboose|1
buttcrack|spud crack|1
butt crack|spud crack|1
butthurt|sad|1
hemorrhoid|sore tush|1
hemorrhoids|sore tush|1
toilet|potty|1
toilets|potties|1
boogers|goobers|1
booger|goober|1
snot|goo|1
snotty|gooey|1
burp|air pop|1
burped|air popped|1
burping|air popping|1
belch|air pop|1
farts|airs|1
farted|aired|1
farting|airing|1
farty|airy|1
fartknocker|silly person|1
pooping|dooing|1
pooper|dooer|1
peeing|dewing|1
peed|dewed|1
tinkle|dew|1
poops|doos|1
pooey|doodly|1
pukes|gags|1
puked|gagged|1
puking|gagging|1
vomited|gagged|1
vomiting|gagging|1
barfed|gagged|1
barfing|gagging|1
sucks|is bad|1
sucked|was bad|1
sucking|drinking|1
kill|defeat|1
killed|defeated|1
killing|defeating|1
killer|defeater|1
killers|defeaters|1
death|long nap|1
deaths|long naps|1
torture|tickle|1
tortured|tickled|1
torturing|tickling|1
genocide|mean act|1
murders|slaps|1
murderers|slappers|1
murderous|slappy|1
murdering|slapping|1
corpse|sleeping body|1
corpses|sleeping bodies|1
nazi|meanie|1
nazis|meanies|1
nazism|meanie culture|1
devil|red guy|1
devils|red guys|1
lucifer|mean dude|1
antichrist|mean dude|1
beelzebub|mean dude|1
drug|medicine|1
drugs|medicines|1
cocaine|flour|1
heroin|bad medicine|1
marijuana|leaf|1
cannabis|leaf|1
narcotic|medicine|1
overdose|too much medicine|1
pothead|sleepy person|1
stoner|sleepy person|1
beer|root beer|1
wine|grape juice|1
booze|juice|1
liquor|juice|1
alcohol|juice|1
alcoholic|juice lover|1
whiskey|apple juice|1
whisky|apple juice|1
tequila|lemonade|1
cigarette|candy stick|1
cigarettes|candy sticks|1
cigar|candy stick|1
tobacco|leaves|1
vape|fog machine|1
vaping|fogging|1
hangover|nap time|1
sexy|cute|1
sexual|grown-up|1
sexually|in a grown-up way|1
sexuality|identity|1
sexist|unfair person|1
sexism|unfairness|1
sexier|cuter|1
sexting|texting|2
bisexual|odd|1
homosexual|odd|1
asexual|odd|1
pansexual|odd|1
nudity|nakedness|1
nudist|clothes-free person|1
cleavage|chest line|1
panties|undies|1
lingerie|fancy undies|1
stripper|dancer|2
strippers|dancers|2
strip club|dance club|2
nudes|silly pictures|2
porno|adult film|2
pornos|adult films|2
pornstar|adult actor|2
pornhub|video site|2
onlyfans|fan site|2
xxx|adult|2
camgirl|webcam person|2
fap|do silly things|2
faps|does silly things|2
fapping|doing silly things|2
fapped|did silly things|2
jizzed|released fluid|3
jizzing|releasing fluid|3
jism|male reproductive fluid|3
cums|mayos|3
cumshots|mayo blasts|3
cumdump|mayo bin|3
cumbucket|mayo bin|3
cumguzzler|mayo drinker|3
cumface|mayo face|3
spooge|male reproductive fluid|3
vajayjay|woman doodle|2
hooha|woman doodle|2
coochie|cat|2
cooch|cat|2
schlong|man doodle|2
gonad|private part|2
vulva|woman doodle|2
labia|woman doodle|2
foreskin|man doodle skin|2
phallus|man doodle|2
phallic|man doodle shaped|2
vaginal|woman doodle|2
vaginas|woman doodles|2
penile|man doodle|2
penises|man doodles|2
dildos|toys|2
orgasms|adult climaxes|2
orgasmic|climaxy|2
erections|uprightenings|2
prostitution|working|2
prostitutes|workers|2
pimp|manager|2
pimps|managers|2
brothel|house of workers|2
raped|assaulted|2
raping|assaulting|2
rapes|assaults|2
rapists|unlawful sexers|2
molest|harm|2
molested|harmed|2
molesting|harming|2
molestation|harm|2
pedo|child abuser|3
pedophilia|child abuse|3
pedophiles|child abusers|3
paedophile|child abuser|3
loli|cartoon|3
lolicon|cartoon|3
bastards|unfortunates|2
bollock|nonsense|2
tosspot|silly person|2
minger|ugly person|2
arses|rear ends|2
arsehat|silly hat|2
twunt|silly person|2
poofter|person|3
faggots|dummies|3
faggy|dumb|3
fags|dumb people|3
fagot|dummy|3
dykes|lesbians|3
queers|gay people|2
niggers|Black people|3
niggas|Black people|3
nigguh|Black person|3
nigg|Black person|3
negro|Black person|3
negroes|Black people|3
negroid|Black person|3
darkie|Black person|3
darky|Black person|3
jigaboo|Black person|3
pickaninny|child|3
porchmonkey|Black person|3
coon|Black person|3
coons|Black people|3
chinks|Asian people|3
chinaman|Chinese person|3
ching chong|gibberish|3
chingchong|gibberish|3
gooks|Asian people|3
zipperhead|Asian person|3
slanteye|Asian person|3
jap|Japanese person|3
japs|Japanese people|3
spics|Hispanic people|3
spick|Hispanic person|3
beaners|Hispanic people|3
wetbacks|immigrants|3
cholo|Hispanic person|2
gringo|foreigner|1
kikes|Jewish people|3
jewboy|Jewish person|3
heeb|Jewish person|3
hymie|Jewish person|3
gyp|swindle|2
gypped|swindled|2
gypsy|Romani person|2
gypsies|Romani people|2
redskin|Native American person|3
redskins|Native American people|3
injun|Native American person|3
squaw|Native American woman|3
polack|Polish person|3
limey|British person|2
whitey|white person|2
honkey|white person|3
honkie|white person|3
cracka|white person|2
dagos|Italian people|3
wops|Italian people|3
coolie|worker|3
mulatto|mixed person|3
halfbreed|mixed person|3
half-breed|mixed person|3
sandnigger|Middle Eastern person|3
camel jockey|Middle Eastern person|3
muzzie|Muslim person|3
ayrab|Middle Eastern person|3
towelheads|Middle Eastern people|3
raghead|Middle Eastern person|3
ragheads|Middle Eastern people|3
retards|retarded people|1
spaz|clumsy person|2
spazz|clumsy person|2
spazzy|clumsy|2
spazzes|clumsy people|2
cripples|crippled people|2
crippled|hurt|2
midgets|little people|2
libtards|people|2
conservatard|person|2
republitard|person|2
incel|lonely person|2
incels|lonely people|2
tranny|clown with an ego|3
trannies|clowns with ego beyond comprehension|3
shemales|women|3
ladyboy|person|2
sheboon|person|3`;
(function(){
  const have=new Set([...badWordsMap.keys(),...EXTRA_WORDS.map(x=>x[0])]);
  const reps=new Set();
  for(const [,m] of badWordsMap)reps.add(m.replacement.toLowerCase());
  for(const [,m] of EXTRA_WORDS)reps.add(m.replacement.toLowerCase());
  const rows=MORE_RAW.split('\n').map(l=>l.trim().split('|')).filter(a=>a.length===3&&a[0]&&a[1]);
  for(const a of rows)reps.add(a[1].toLowerCase());
  for(const [w,r,k] of rows){const lw=w.toLowerCase();if(have.has(lw)||reps.has(lw))continue;have.add(lw);EXTRA_WORDS.push([lw,{replacement:r,rating:+k}]);}
})();
EXTRA_WHITE.push(...("abutment abutments abuts abutted accumulates accumulating accumulations accumulator accumulators album albums altitudes analeptic analogies analogize analogous analogs analyse analysed analyses analysing analysts analyze analyzed analyzer analyzers analyzes analyzing antitank antithesis antithetical antitoxin antitoxins antitrust appetite appetites aptitudes archival archived archiving archivist archivists assad assam assange assassinated assassinating assassinations assayed assays assemblage assembler assemblies assemblyman assent assertive assertively assertiveness assessable assessing assessor assessors assiduously assignee assigning assigns assimilated assimilates assisted assisting assists associated associates associating associations associative assortments assuage assuaged assurance assurances assuredly assyria assyrian attitudes attitudinal bachelor bachelors banalities banality basset bassett bassinet bassline beatitude beehive beehives benedick bibcock bluegrass bombshell bombshells brassband brasses brassiere brassy bumble bumper bumpy butterball buttercream buttercup buttercups butterfingers butterflies buttermilk butternut butterscotch buttonholed bypassed bypasses bypassing canalside cassava cassini cassock cassowary chivalric chivalrous circumference circumferences circumflex circumnavigate circumnavigated circumnavigation circumscribe circumscribed circumspect circumstantial circumstantially circumvent circumvented circumvention circumvents clamshell clamshells cockades cockamamie cockatiel cockatiels cockatoos cockerels cockeyed cockleshell cockney cockneys cockpits cockroach cockroaches cocksure cockswain cocktails cocoons compasses compassion compassionate competitive competitively competitor competitors conspicuously constituencies constituency constituent constituents constitutes constitutional constitutionally coonhound coonhounds coonskin crabgrass cucumbers cummerbund cummings cummins cumquat cumulated cumulonimbus decumbent denude denuded denudes dickensian dicker dickered dickering dickey dickie dickies dickon dietitian dietitians disassemble disassembled disassociate disassociated dispassionate documentarian documentarians documentaries documenting dorking druggist druggists drugstore drugstores dumbbell dumbbells dumbfounded dumbledore dumbo dumbstruck dumbwaiter eelgrass eggshell eggshells embarrasses embarrassingly embarrassments encompassed encompasses encompassing encumber encumbered encumbrance entitles entitling exactitude fortitude fukuhara fukumoto fukunaga fukuoka fukushima fukuyama fukuzawa gamecock glassy grapefruit grapefruits grapeshot grapevine grapevines grassfed grasshoppers grassland grasslands gratitudes gypsophila gypsum hancocks harasser harassers harassment harassments hellbender hellebore hellman hellmans hellos helluva heroine heroines hesitant hesitate hesitated hesitating hesitation hesitations hivemind humble impassioned incumbency incumbent incumbents ineptitude institutes institutional institutionalized institutions japan japanese japanned jape japes japing japonica jerkily jerkin jerkins jerky killarney killdeer killeen killington lassie lassitude latitudes lemongrass liquorice longitude longitudes magnitude magnitudes massachusetts massaging massed masseur masseuse massif massing massively michelle michelles mitchell mitchells morasses multitudes negroni negronis number numbers nutritional nutritionist nutritionists nutritious nutshell nutshells overkill overpasses partitioned partitions passbook passcode passed passer passerby passerine passes passionflower passionfruit passive passively passivity passkey passkeys passphrase pecker peek peeked peeking peeks peel peeled peeler peelers peeling peepers peephole peepholes peerage peered peering peerless peeve peeved peevish penistone penistonian petcock petitioned petitioner petitioners pistol pistols piston pistons platitudes pooch pooches poolroom poolside poorly porgies porgy procumbent qualitative qualitatively quantitative quantitatively quantities quantity raccoons reassemble reassembled reassert reassess reassessed reassessment reassign reassigned reassigns reassurance reassure reassured reassuring rebut rebuts rebutted rebutting rectitude recumbent repetitious repetitive restitution retitle rochelle ryegrass sassafras sassier sassiest sassily sawgrass scathing scatter scatterbrain scatterbrained scattered scattering scatterplot scatters schellenberg scrapbooks scrapers scrapes scrapheap scrapings scrappier scraps screwball screwballs screwdriver screwdrivers scunthorpian seashell seashells servitude sexagenarian sexennial sexology sextillion sextuplets shellac shellacked shelled shelley shelling shells shelly shelter sheltered shelters shivered shivering shivery skill skilled skillet skillets skillful skillfully skills solitude speeches speechless speedboat speeder speeding speedometer speedometers speeds speedway speedy spicebush spicier spiciest spiciness spicing spoof spoofed spoofing spoofs spook spooked spooks spooky spooled spooler spooling stitch stitched stitchery stitches stitching stopcock substitute substituted substitutes substituting substitution substitutions subtitled succumbing succumbs superstition superstitions superstitious surpassed surpasses surpassing sweepers sweeping sweepstake sweepstakes swine teepee tepee therapeutic therapeutics tithing titillated titillating titillation titmice titrate titrated titration titters tittle titular titus tobacconist tobacconists tortoiseshell toupee toupees trespasser trespassers twine twines tycoons unassailable unassigned unassisted unassuming underpasses unencumbered unisex unskilled untitled vineyard weathercock whoopee whoopie wineglass wineries winery woodpecker woodpeckers cumulus").split(" "));

const PARTS = ["mother","motha","dumb","bull","horse","bat","chicken","dog","cow","ape","goat","pig","fat","lazy","big","little","hard","hot","jack","wise","smart","bad","stupid","god","holy","ugly","dirty","nasty","tough","sh","piece","of","a","the","you","ya","u","your","head","face","hole","wad","wit","tard","bag","boy","man","ball","balls","monkey","stain","lips","brain","bucket","licker","sucker","hat","nugget","weasel","clown","burger","sandwich","storm","fest","load","bomb","fuck","pants","faced","headed","brained","witted","hater","lover","muffin","goblin","waffle","canoe","pirate","wipe","wipes","cheese","bandit","fiend","queen","king","boss","master","hunter","sauce","juice","jockey","nut","nuts"];
const EMBED = new Set(['fuck','cunt','shit','bitch','nigger','nigga','faggot','whore','twat','jizz','asshole','cocksucker','motherfucker','bullshit','dipshit','shithead','dickhead']);
const INFL = ['s','es','ed','d','ing','ings','er','ers','y','ies','ie','z'];
const INFLSET = new Set(INFL);
const STEM_REST = new Set(['','e','es','ed','d','s','ing','ion','ions','or','ors','er','ers','ive','ory']);
const REV_SAFE = new Set(['lana','natas','evals','sdia','edun','nemes','nrop','ekup']);
const SKEL_SAFE = new Set(['cnt','slt','frt','hll','btt','tsh','nrd','trd','pssd','rdm']);
const PHON_EXTRA = {feck:'fuck',fock:'fuck',fack:'fuck',fuhk:'fuck',fukk:'fuck',fuq:'fuck',phuck:'fuck',phuk:'fuk',biatch:'bitch',beyotch:'bitch',biotch:'bitch',shiet:'shit',shyt:'shit',sheit:'shit',shiz:'shit',cawk:'cock',kunt:'cunt',azz:'ass',phuq:'fuck',fucc:'fuck',fuxk:'fuck',sheeit:'shit'};
const HOMO = {'а':'a','в':'b','с':'c','е':'e','ё':'e','н':'h','і':'i','ї':'i','ј':'j','к':'k','м':'m','о':'o','р':'p','ѕ':'s','т':'t','х':'x','у':'y','ԁ':'d','ɡ':'g','ɑ':'a','ı':'i','ℓ':'l','ł':'l','ø':'o','đ':'d','α':'a','β':'b','ε':'e','ι':'i','κ':'k','ν':'v','ο':'o','ρ':'p','τ':'t','υ':'u','χ':'x','ω':'w','η':'n','ѵ':'v','ѡ':'w','ꞵ':'b','ⅰ':'i','ⅼ':'l','ⅽ':'c','ⅾ':'d','ⅿ':'m','æ':'ae','œ':'oe','ß':'ss'};
const LEET1 = {'0':'o','1':'i','3':'e','4':'a','5':'s','6':'g','7':'t','8':'b','9':'g','@':'a','$':'s','!':'i','|':'i'};
const LEET2 = {'0':'o','1':'l','3':'e','4':'a','5':'s','6':'d','7':'l','8':'b','9':'p','@':'a','$':'s','!':'l','|':'l'};
const WILD = new Set(['*','#','%','?','^','~']);
const LEETSYM = new Set(['@','$','!','|']);
const JOIN = new Set(['.','-','_','·','•',"'",'’']);
const INVIS = /^[\u200B-\u200F\u2060-\u2064\uFEFF\u00AD\u180E\u034F\u061C\u115F\u1160\u3164\uFFA0]$/;
const SILLY = ["banana","pickle","sparkle","noodle","waffle","kazoo","muffin","turnip","boop","flapdoodle","nincompoop","gizmo","bubbles","jellybean","fiddlesticks","sprinkles","pancake","wombat","snickerdoodle","zucchini"];
const JOKE_EXTRA = [["oh no","oh shit"],["oh my gosh","oh my fucking god"],["gosh","goddamn"],["heck","hell"],["hello","what the fuck is up"],["good morning","good fucking morning"],["good night","fuck off, good night"],["thank you","thanks, asshole"],["thanks","thanks, dickhead"],["please","pretty fucking please"],["friend","asshole"],["my friend","motherfucker"],["excuse me","get the fuck out of my way"],["wow","holy shit"],["oops","fuck"],["yikes","oh crap"],["awesome","badass"],["very","fucking"],["really","fucking"],["terrible","shitty"],["silly","dumbass"],["goodness","fuck"],["sorry","my bad, asshole"],["darn it","goddammit"],["no way","no fucking way"],["unbelievable","fucking unbelievable"],["nonsense","bullshit"],["gentleman","dickhead"],["dear","you bastard"]];
const EMOJI_META = {replacement:'👍',rating:2,word:'🖕',key:'🖕'};

const strip=s=>s.replace(/[^a-z]/g,'');
/* ---- flexible phrase matching: ignores fillers (the/my/his...) and verb endings ---- */
const FILLER=new Set(['the','a','an','my','your','his','her','their','our','its','this','that','these','those','some','ur','ya','yo','me','him','them','it','mine','yer','thy','ones','one']);
const IRR={beaten:'beat',shat:'shit',shitted:'shit',came:'cum',spat:'spit'};
function stemV(w){
  if(IRR[w])return IRR[w];
  let x=w;
  for(const e of ['ing','in','ed','es','en','s']){if(x.length-e.length>=3&&x.endsWith(e)){x=x.slice(0,-e.length);break;}}
  if(x.length>3&&x[x.length-1]===x[x.length-2]&&!/[ls]$/.test(x))x=x.slice(0,-1);
  if(x.length>3&&x.endsWith('e'))x=x.slice(0,-1);
  return x;
}
function phraseKeyN(words){const ks=[];for(const w of words){const c=strip(w.toLowerCase());if(!c||FILLER.has(c))continue;ks.push(stemV(c));}return ks.length>=2?ks.join(''):'';}

function ddStr(s){return s.replace(/(.)\1+/g,'$1');}
function dedupRuns(k){let s='',min=[];for(const c of k){if(s&&s[s.length-1]===c)min[min.length-1]++;else{s+=c;min.push(1);}}return {s,min};}
const act=(r,l)=>l===3?r===3:l===2?r>=2:true;

let D=null,DKEY='';
function buildDict(cfg){
  const key=JSON.stringify([cfg.custom,cfg.customWhite,cfg.detect.stretch]);
  if(D&&DKEY===key)return D; DKEY=key;
  const st=!!cfg.detect.stretch;
  const exact=new Map(),phrases=new Map(),stemsRaw=[];
  const put=(w,m)=>{const k=strip(w.toLowerCase());if(!k)return;
    if(m.replacement==='placeholder'){stemsRaw.push({key:k,meta:m});return;}
    const meta={word:w,key:k,replacement:m.replacement,rating:m.rating,custom:!!m.custom};
    exact.set(k,meta);
    if(/\s/.test(w.trim()))phrases.set(k,meta);else phrases.delete(k);};
  for(const [w,m] of badWordsMap)put(w,m);
  for(const [w,m] of EXTRA_WORDS)if(!badWordsMap.has(w))put(w,m);
  for(const c of cfg.custom)put(c.word,{replacement:c.replacement,rating:+c.rating,custom:true});
  const stems=[];
  for(const s of stemsRaw){const base=[...exact.values()].filter(m=>m.key.startsWith(s.key)).sort((a,b)=>a.key.length-b.key.length)[0];
    stems.push({sk:st?ddStr(s.key):s.key,meta:{word:s.key,key:s.key,rating:s.meta.rating,replacement:base?base.replacement:'something'}});}
  const dd=new Map();
  if(st)for(const [k,meta] of exact){const {s,min}=dedupRuns(k);if(!dd.has(s))dd.set(s,[]);dd.get(s).push({meta,min});}
  for(const arr of dd.values())arr.sort((a,b)=>b.min.reduce((x,y)=>x+y,0)-a.min.reduce((x,y)=>x+y,0));
  const byLen=new Map();let maxLen=0;
  for(const [k,meta] of exact){maxLen=Math.max(maxLen,k.length);if(k.length>=3&&k.length<=14){if(!byLen.has(k.length))byLen.set(k.length,[]);byLen.get(k.length).push({key:k,meta});}}
  for(const arr of byLen.values())arr.sort((a,b)=>b.meta.rating-a.meta.rating);
  const skel=new Map();
  for(const [k,meta] of exact){if(k.length<4)continue;const sk=k.replace(/[aeiou]/g,'');if(sk.length<3||sk===k||SKEL_SAFE.has(sk))continue;const o=skel.get(sk);if(!o||meta.rating>o.rating)skel.set(sk,meta);}
  const white=new Map();
  for(const [w,l] of whitelistedWords)white.set(strip(w.toLowerCase()),l);
  for(const w of EXTRA_WHITE)if(!white.has(w))white.set(w,[1,2,3]);
  for(const w of cfg.customWhite)white.set(strip(w.toLowerCase()),[1,2,3]);
  const parts=[...new Set(PARTS.map(p=>st?ddStr(p):p))].sort((a,b)=>b.length-a.length);
  const phrasesN=new Map();
  for(const meta of phrases.values()){const k=phraseKeyN(meta.word.split(/[\s-]+/));if(!k)continue;const o=phrasesN.get(k);if(!o||meta.rating>o.rating)phrasesN.set(k,meta);}
  D={exact,dd,phrases,phrasesN,stems,byLen,maxLen,skel,white,parts,stretch:st};return D;
}
function lookup(U,i,j){
  const key=U.s.slice(i,j);
  if(!D.stretch)return D.exact.get(key)||null;
  const arr=D.dd.get(key);if(!arr)return null;
  for(const c of arr){let ok=true;for(let k=0;k<c.min.length;k++)if(U.cnt[i+k]<c.min[k]){ok=false;break;}if(ok)return c.meta;}
  return null;
}
function inflOK(rest,pk){
  if(!rest)return true;
  if(INFLSET.has(rest))return true;
  if(pk.length>=4&&rest==='in')return true;
  if(!D.stretch&&rest[0]===pk[pk.length-1]){const r=rest.slice(1);if(INFLSET.has(r)||(pk.length>=4&&r==='in'))return true;}
  return false;
}
function segment(U,strict){
  const s=U.s,n=s.length;if(n<3||n>60)return null;
  const memo=new Array(n+1).fill(undefined);
  function go(i){
    if(i===n)return [];
    if(memo[i]!==undefined)return memo[i];
    let res=null;
    if(!(strict&&i>0)){
      for(let j=Math.min(n,i+D.maxLen);j>i;j--){
        const m=lookup(U,i,j);if(!m)continue;
        if(strict){if(j===n){res=[{a:i,b:j,meta:m}];break;}if(inflOK(s.slice(j),m.key)){res=[{a:i,b:j,meta:m},{a:j,b:n}];break;}continue;}
        const r=go(j);if(r){res=[{a:i,b:j,meta:m},...r];break;}
        if(inflOK(s.slice(j),m.key)){res=[{a:i,b:j,meta:m},{a:j,b:n}];break;}
      }
      if(!res&&!strict)for(const p of D.parts){if(s.startsWith(p,i)){const r=go(i+p.length);if(r){res=[{a:i,b:i+p.length},...r];break;}}}
    }
    memo[i]=res;return res;
  }
  return go(0);
}
function protSpans(U,lvl){
  const sp=[],s=U.s;
  if(!D.wl)D.wl=[...D.white.entries()].filter(([k])=>k.length>=4).map(([k,l])=>({k:D.stretch?ddStr(k):k,l}));
  for(const w of D.wl){if(!w.l.includes(lvl))continue;let i=s.indexOf(w.k);
    while(i>=0){let e=i+w.k.length;for(const inf of INFL){if(s.startsWith(inf,e)){e+=inf.length;break;}}sp.push([i,e]);i=s.indexOf(w.k,i+1);}}
  return sp;
}
function scanAgg(U,lvl){
  const n=U.s.length,out=[];let i=0,sp=null;
  while(i<n){let h=null;for(let j=Math.min(n,i+D.maxLen);j>=i+3;j--){const m=lookup(U,i,j);if(m){h={a:i,b:j,meta:m};break;}}
    if(h){if(sp===null)sp=protSpans(U,lvl);if(sp.some(([a,b])=>a<=h.a&&b>=h.b)){i++;continue;}out.push(h);i=h.b;}else i++;}
  return out;
}
function baseChar(cp,uni){
  if(!uni)return cp.toLowerCase();
  let c=cp.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(HOMO[c])c=HOMO[c];
  return c;
}
function makeUnits(text,s,e,cfg,map,dropWild){
  const det=cfg.detect,U={s:'',cnt:[],o0:[],o1:[],leet:[]};
  for(let k=s;k<e;){
    const cp=String.fromCodePoint(text.codePointAt(k));const k2=k+cp.length;
    if(INVIS.test(cp)){k=k2;continue;}
    if(JOIN.has(cp)&&(det.separators||cp==="'"||cp==='’')){k=k2;continue;}
    if(dropWild&&WILD.has(cp)){k=k2;continue;}
    let b=baseChar(cp,det.unicode),lt=false;
    if(map&&b.length===1&&map[b]!==undefined){b=map[b];lt=true;}
    for(const ch of b){
      const L=U.s.length-1;
      if(det.stretch&&L>=0&&U.s[L]===ch){U.cnt[L]++;U.o1[L]=k2;U.leet[L]=U.leet[L]&&lt;}
      else{U.s+=ch;U.cnt.push(1);U.o0.push(k);U.o1.push(k2);U.leet.push(lt);}
    }
    k=k2;
  }
  return U;
}
function rawCore(text,s,e,cfg){
  let o='';
  for(let k=s;k<e;){const cp=String.fromCodePoint(text.codePointAt(k));k+=cp.length;
    if(INVIS.test(cp)||JOIN.has(cp)||WILD.has(cp))continue;
    let b=baseChar(cp,true);if(b.length===1&&LEET1[b])b=LEET1[b];o+=b;}
  return o;
}
function isWhite(core,lvl){
  let l=D.white.get(core);if(l&&l.includes(lvl))return true;
  for(const inf of INFL){if(core.length>inf.length+2&&core.endsWith(inf)){l=D.white.get(core.slice(0,-inf.length));if(l&&l.includes(lvl))return true;}}
  return false;
}
function toHits(pieces,U,text,ctx,n){
  const hs=[];
  for(const p of pieces){
    if(!p.meta||!act(p.meta.rating,ctx.lvl))continue;
    let real=0,lt=0,sum=0;for(let k=p.a;k<p.b;k++){if(U.leet[k])lt++;else real++;sum+=U.cnt[k];}
    if(lt&&!real)continue;
    const o0=U.o0[p.a],o1=U.o1[p.b-1],orig=text.slice(o0,o1);let kind='exact';
    if(/[.\-_·•*'’\s\u200B-\u200F\u00AD\uFEFF]/.test(orig))kind='separated';
    else if(lt)kind='leet';else if(/[^\x00-\x7F]/.test(orig))kind='look-alike';
    else if(sum>p.meta.key.length)kind='stretched';
    else if(p.a>0||p.b<n)kind='compound';
    hs.push({o0,o1,meta:p.meta,kind});
  }
  return hs;
}
function trySeg(U,text,ctx){
  const det=ctx.cfg;let pieces=null,hs=[];
  if(U.s.length<3)return hs;
  pieces=ctx.cfg.match==='aggressive'?scanAgg(U,ctx.lvl):segment(U,ctx.cfg.match==='strict');
  if(pieces)hs=toHits(pieces,U,text,ctx,U.s.length);
  if(!hs.length&&ctx.cfg.detect.padded&&ctx.cfg.match==='balanced'&&U.s.length>=5){
    const n=U.s.length,sl_=(a,b)=>({s:U.s.slice(a,b),cnt:U.cnt.slice(a,b),o0:U.o0.slice(a,b),o1:U.o1.slice(a,b),leet:U.leet.slice(a,b)});
    const run=x=>!x||/^(.)\1*$/.test(x);
    pad:for(let tot=1;tot<=6;tot++)for(let pl=0;pl<=tot;pl++){
      const sl=tot-pl;if(n-tot<4)continue;
      const pre=U.s.slice(0,pl),suf=U.s.slice(n-sl);
      const sub=sl_(pl,n-sl),seg=segment(sub,false);if(!seg)continue;
      const sh=toHits(seg,sub,text,ctx,sub.s.length).filter(h=>h.meta.key.length>=4);
      if(!sh.length)continue;
      const top=sh.reduce((a,b)=>b.meta.rating>a.meta.rating?b:a);
      const lim=top.meta.rating===3?3:top.meta.rating===2?2:0;
      if(tot<=lim||(top.meta.rating<=2&&run(pre)&&run(suf))){hs=[{o0:U.o0[0],o1:U.o1[n-1],meta:top.meta,kind:'padded'}];break pad;}
    }
  }
  if(!hs.length&&ctx.cfg.detect.padded&&ctx.cfg.match==='balanced'&&U.s.length>=5){
    const n=U.s.length;
    emb:for(let i=0;i<n;i++)for(let j=Math.min(n,i+D.maxLen);j>=i+4;j--){
      const m=lookup(U,i,j);if(!m||!EMBED.has(m.key)||m.rating>=3)continue;
      const h=toHits([{a:i,b:j,meta:m}],U,text,ctx,n);
      if(h.length){hs=[{o0:U.o0[0],o1:U.o1[n-1],meta:m,kind:'padded'}];break emb;}
    }
  }
  if(!hs.length)for(const st of D.stems){
    if(U.s.startsWith(st.sk)&&act(st.meta.rating,ctx.lvl)){const rest=U.s.slice(st.sk.length);
      if(STEM_REST.has(rest)||(ctx.cfg.match!=='strict'&&rest.length<=4&&/^[a-z]*$/.test(rest))){hs=[{o0:U.o0[0],o1:U.o1[U.s.length-1],meta:st.meta,kind:'stem'}];break;}}}
  return hs;
}
function wildStage(text,s,e,ctx){
  const pat=[],o0=[],o1=[];
  for(let k=s;k<e;){const cp=String.fromCodePoint(text.codePointAt(k));const k2=k+cp.length;
    if(INVIS.test(cp)||JOIN.has(cp)){k=k2;continue;}
    const b=baseChar(cp,ctx.cfg.detect.unicode);
    if(/^[a-z]+$/.test(b))for(const ch of b){pat.push(ch);o0.push(k);o1.push(k2);}
    else{pat.push(null);o0.push(k);o1.push(k2);}
    k=k2;}
  const L=pat.length;if(L<3||L>20)return [];
  if(!pat.some(x=>x===null))return [];
  let best=null;
  for(const tail of ['',...INFL]){
    const wl=L-tail.length;if(wl<3)continue;
    let tok=true;for(let i=0;i<tail.length;i++)if(pat[wl+i]!==tail[i]){tok=false;break;}if(!tok)continue;
    for(const {key,meta} of (D.byLen.get(wl)||[])){
      if(!act(meta.rating,ctx.lvl))continue;
      let ok=true,reals=0;for(let i=0;i<wl;i++){if(pat[i]!==null){if(pat[i]!==key[i]){ok=false;break;}reals++;}}
      if(!ok)continue;const wilds=wl-reals;
      if(wilds<1)continue;
      if(!(reals>=2||(reals>=1&&pat[0]&&wl>=4&&wilds>=2)))continue;
      if(!best||meta.rating>best.meta.rating||(meta.rating===best.meta.rating&&tail.length<best.tl)){best={meta,wl,tl:tail.length};}
    }
    if(best)break;
  }
  if(!best)return [];
  return [{o0:o0[0],o1:o1[best.wl-1],meta:best.meta,kind:'masked'}];
}
function analyzeWhole(text,s0,e0,ctx){
  const cfg=ctx.cfg,det=cfg.detect,lvl=ctx.lvl;
  let s=s0,e=e0;
  while(s<e&&WILD.has(text[s]))s++;while(e>s&&WILD.has(text[e-1]))e--;
  const raw=text.slice(s,e);
  if(raw.length<2&&!(det.masks))return [];
  const hasWild=/[*#%?^~]/.test(raw);
  const maps=det.leet?(/[1!|679]/.test(raw)?[LEET1,LEET2]:[LEET1]):[null];
  if(!hasWild||det.separators){
    for(const map of maps){
      const U=makeUnits(text,s,e,cfg,map,hasWild);
      const hs=trySeg(U,text,ctx);if(hs.length)return hs;
    }
  }
  if(det.masks&&(/[^\p{L}]/u.test(text.slice(s0,e0)))){const h=wildStage(text,s0,e0,ctx);if(h.length)return h;}
  const U0=makeUnits(text,s,e,{...cfg,detect:{...det,stretch:false}},det.leet?LEET1:null,hasWild);
  const t=U0.s;if(!/^[a-z]+$/.test(t)||t.length<3)return [];
  const whole=(meta,kind,tail)=>[{o0:U0.o0[0],o1:U0.o1[t.length-1],meta,kind,tail:tail||''}];
  if(det.phonetic){
    const vars=new Set();
    if(PHON_EXTRA[t])vars.add(PHON_EXTRA[t]);
    vars.add(t.replace(/ph/g,'f'));vars.add(t.replace(/zz/g,'ss'));vars.add(t.replace(/kk/g,'ck'));vars.add(t.replace(/vv/g,'w'));
    vars.add(t.replace(/v/g,'u'));vars.add(t.replace(/q$/,'k'));vars.add(t.replace(/c$/,'ck'));vars.add(t.replace(/z$/,'s'));
    for(const v0 of vars){if(v0===t||v0.length<3)continue;
      const v=D.stretch?ddStr(v0):v0;const P={s:v,cnt:Array(v.length).fill(99),leet:Array(v.length).fill(false),o0:[],o1:[]};
      const r=segment(P,true);
      if(r){const pc=r.find(p=>p.meta&&act(p.meta.rating,lvl));if(pc)return whole(pc.meta,'phonetic',v.slice(pc.b));}}
  }
  if(det.vowelless&&t.length<=8&&!/[aeiou]/.test(t)){
    const m=D.skel.get(t)||D.skel.get(ddStr(t));if(m&&act(m.rating,lvl))return whole(m,'vowel-drop');}
  if(det.reversed&&t.length>=4){const r=[...t].reverse().join('');const m=D.exact.get(r);if(m&&!REV_SAFE.has(r)&&act(m.rating,lvl))return whole(m,'reversed');}
  return [];
}
function analyzeToken(text,s,e,ctx){
  const tt=text.slice(s,e);
  if(!/\p{L}/u.test(tt))return [];
  const core=rawCore(text,s,e,ctx.cfg);
  if(isWhite(core,ctx.lvl))return [];
  let hs=analyzeWhole(text,s,e,ctx);if(hs.length)return hs;
  const runs=[];let m;
  for(const re of [/[^\-_.·•]+/g,/[\p{L}\p{M}\p{N}]+/gu]){while((m=re.exec(tt)))runs.push([s+m.index,s+m.index+m[0].length]);}
  if(runs.length>1||(runs.length===1&&(runs[0][1]-runs[0][0])<(e-s))){
    for(const [a,b] of runs){if(b-a<3||!/\p{L}/u.test(text.slice(a,b)))continue;
      if(isWhite(rawCore(text,a,b,ctx.cfg),ctx.lvl))continue;
      hs=hs.concat(analyzeWhole(text,a,b,ctx));}
  }
  return hs;
}
function tokenize(text){
  const cps=[];for(let k=0;k<text.length;){const cp=String.fromCodePoint(text.codePointAt(k));cps.push([cp,k]);k+=cp.length;}
  const isW=c=>/[\p{L}\p{M}\p{N}]/u.test(c)||LEETSYM.has(c)||WILD.has(c);
  const isStart=c=>/[\p{L}\p{N}]/u.test(c)||c==='@'||c==='$'||c==='*'||c==='#'||c==='%'||c==='~'||c==='^';
  const toks=[];let a=0;
  while(a<cps.length){
    if(!isStart(cps[a][0])){a++;continue;}
    let b=a+1;
    while(b<cps.length){const c=cps[b][0];
      if(isW(c)||INVIS.test(c)){b++;continue;}
      if(JOIN.has(c)&&b+1<cps.length&&isW(cps[b+1][0])){b++;continue;}
      break;}
    let eb=b;while(eb>a+1&&(cps[eb-1][0]==='!'||cps[eb-1][0]==='?'))eb--;
    const s=cps[a][1],e=eb<cps.length?cps[eb][1]:text.length;
    toks.push({s,e});a=Math.max(b,a+1);
    if(eb<b)a=b;
  }
  return toks;
}
function simpleCore(text,s,e){let o='';for(let k=s;k<e;){const cp=String.fromCodePoint(text.codePointAt(k));k+=cp.length;if(INVIS.test(cp)||JOIN.has(cp))continue;let b=baseChar(cp,true);if(b.length===1&&LEET1[b])b=LEET1[b];o+=b;}return o;}

function detect(text,cfg,lvl){
  buildDict(cfg);D.lvl=lvl;
  const ctx={cfg,lvl},det=cfg.detect;let hits=[];
  const toks=tokenize(text);const used=new Set();
  // spaced-out letters
  if(det.spaced){
    const ok=i=>{const t=toks[i];if(!t)return false;const tx=text.slice(t.s,t.e);return [...tx].length===1&&/[\p{L}@$!|0-9]/u.test(tx)&&!(/[0-9]/.test(tx)&&!det.leet);};
    for(let i=0;i<toks.length;){
      if(!ok(i)){i++;continue;}
      let j=i;while(j+1<toks.length&&ok(j+1)&&/^[ \t]*[.,\-_*·•|\/\\]?[ \t]*$/.test(text.slice(toks[j].e,toks[j+1].s))&&text.slice(toks[j].e,toks[j+1].s).length>0)j++;
      if(j-i+1>=3&&j-i<40){
        let done=false;
        for(let a=i;a<=j-2&&!done;a++)for(let b=j;b>=a+2&&!done;b--){
          const letters=[];for(let k=a;k<=b;k++)letters.push(toks[k]);
          const U={s:'',cnt:[],o0:[],o1:[],leet:[]};
          const map=det.leet?LEET1:null;
          for(const t of letters){let c=baseChar(text.slice(t.s,t.e),det.unicode),lt=false;if(map&&map[c]){c=map[c];lt=true;}
            for(const ch of c){U.s+=ch;U.cnt.push(1);U.o0.push(t.s);U.o1.push(t.e);U.leet.push(lt);}}
          if(!/[a-z]{2,}/.test(U.s)&&U.leet.filter(x=>!x).length<2)continue;
          const D0=D.stretch;D.stretch=false;let pieces=segment(U,false);
          let hs=pieces?toHits(pieces,U,text,ctx,U.s.length):[];D.stretch=D0;
          if(hs.length&&pieces&&pieces.every(p=>p.meta||p.a<p.b)){
            hs.forEach(h=>{h.kind='spaced';hits.push(h);});
            for(let k=a;k<=b;k++)used.add(k);done=true;}
        }
      }
      i=j+1;
    }
  }
  // multi-word phrases
  if(D.phrases.size){
    for(let i=0;i<toks.length;i++){
      if(used.has(i))continue;let key='',best=null;
      for(let k=i;k<Math.min(toks.length,i+6);k++){
        if(used.has(k))break;
        if(k>i&&!/^([ \t\r\n]+|-|[ \t]-[ \t])$/.test(text.slice(toks[k-1].e,toks[k].s)))break;
        key+=simpleCore(text,toks[k].s,toks[k].e);
        if(k>i){const m=D.phrases.get(key);if(m&&act(m.rating,lvl))best={k,m};}}
      if(best){hits.push({o0:toks[i].s,o1:toks[best.k].e,meta:best.m,kind:'phrase'});for(let k=i;k<=best.k;k++)used.add(k);}
    }
  }
  // flexible phrases: "beat the meat", "beating my meat", "beat his meat", "jerked her off"...
  if(D.phrasesN.size){
    for(let i=0;i<toks.length;i++){
      if(used.has(i))continue;
      const c0=simpleCore(text,toks[i].s,toks[i].e);if(!c0||FILLER.has(c0))continue;
      let key=stemV(c0),n=1,best=null;
      for(let k=i+1;k<Math.min(toks.length,i+9);k++){
        if(used.has(k))break;
        if(!/^([ \t\r\n]+|-|[ \t]-[ \t])$/.test(text.slice(toks[k-1].e,toks[k].s)))break;
        const c=simpleCore(text,toks[k].s,toks[k].e);if(!c)break;
        if(FILLER.has(c))continue;
        key+=stemV(c);n++;
        const m=D.phrasesN.get(key);if(m&&n>=2&&act(m.rating,lvl))best={k,m};
      }
      if(best){hits.push({o0:toks[i].s,o1:toks[best.k].e,meta:best.m,kind:'phrase'});for(let k=i;k<=best.k;k++)used.add(k);}
    }
  }
  for(let i=0;i<toks.length;i++){if(used.has(i))continue;hits=hits.concat(analyzeToken(text,toks[i].s,toks[i].e,ctx));}
  if(det.emoji){let k=-1;while((k=text.indexOf('🖕',k+1))>=0)hits.push({o0:k,o1:k+2,meta:EMOJI_META,kind:'emoji'});}
  hits.sort((a,b)=>a.o0-b.o0||(b.o1-b.o1)||(b.o1-b.o0)-(a.o1-a.o0));
  const out=[];let end=-1;for(const h of hits){if(h.o0>=end){out.push(h);end=h.o1;}}
  return out;
}
function applyCase(orig,repl){
  const L=orig.replace(/[^\p{L}]/gu,'');if(!L)return repl;
  if(L.length>=2&&L===L.toUpperCase()&&L!==L.toLowerCase())return repl.toUpperCase();
  if(L[0]===L[0].toUpperCase()&&L[0]!==L[0].toLowerCase()&&L.slice(1)===L.slice(1).toLowerCase())return repl.charAt(0).toUpperCase()+repl.slice(1);
  return repl;
}
function hash(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h;}
function maskStr(o,cfg){const ch=[...o];return ch.map((c,i)=>{if(/[\p{L}\p{N}]/u.test(c)){if(cfg.keepFirst&&i===0)return c;if(cfg.keepLast&&i===ch.length-1)return c;return cfg.maskChar||'*';}return c;}).join('');}
function renderHit(h,text,cfg,lvl,chainOk){
  const o=text.slice(h.o0,h.o1);
  switch(cfg.style){
    case 'stars':return maskStr(o,cfg);
    case 'block':return maskStr(o,{...cfg,maskChar:'█',keepFirst:false,keepLast:false});
    case 'bleep':return cfg.bleepText||'[bleep]';
    case 'tag':return '[censored]';
    case 'remove':return '';
    case 'silly':return applyCase(o,SILLY[hash(o.toLowerCase())%SILLY.length]);
    case 'flag':return o;
  }
  let r=applyCase(o,h.meta.replacement)+(h.tail||'');
  if(cfg.chain&&chainOk){const sub=detect(r,cfg,lvl),sc={...cfg,chain:false};
    if(sub.length){let out='',c=0;for(const x of sub){out+=r.slice(c,x.o0)+applyCase(r.slice(x.o0,x.o1),x.meta.replacement)+(x.tail||'');c=x.o1;}r=out+r.slice(c);}}
  return r;
}
function censorText(text,cfg){
  const lvl=cfg.level;
  const hits=detect(text,cfg,lvl);
  const segs=[];let c=0;
  for(const h of hits){
    if(h.o0>c)segs.push({t:text.slice(c,h.o0)});
    segs.push({t:renderHit(h,text,cfg,lvl,true),hit:{orig:text.slice(h.o0,h.o1),rating:h.meta.rating,kind:h.kind,word:h.meta.word}});
    c=h.o1;
  }
  segs.push({t:text.slice(c)});
  return {segs,hits:segs.filter(s=>s.hit).map(s=>s.hit),out:segs.map(s=>s.t).join('')};
}
/* ---- Reverse (joke) ---- */
let REV=null,REVKEY='';
function buildReverse(cfg){
  const key=JSON.stringify([cfg.custom,cfg.level,cfg.chaos]);if(REV&&REVKEY===key)return REV;REVKEY=key;
  const map=new Map();
  const add=(w,m)=>{if(m.replacement==='placeholder')return;const k=m.replacement.toLowerCase();if(!act(m.rating,cfg.level))return;const o=map.get(k);if(!o||m.rating>o.rating)map.set(k,{word:w,rating:m.rating});};
  for(const [w,m] of badWordsMap)add(w,m);
  for(const [w,m] of EXTRA_WORDS)if(!badWordsMap.has(w))add(w,m);
  for(const c of cfg.custom)add(c.word,{replacement:c.replacement,rating:+c.rating});
  const extras=new Map();if(cfg.chaos>0)for(const [a,b] of JOKE_EXTRA)if(!map.has(a))extras.set(a,{word:b,rating:1,extra:true});
  const all=new Map([...map,...extras]);
  const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const keys=[...all.keys()].sort((a,b)=>b.length-a.length).map(esc);
  const re=new RegExp('(?<![\\p{L}\\p{N}])('+keys.join('|')+')(s|es|ed|ing|d)?(?![\\p{L}\\p{N}])','giu');
  REV={map:all,re};return REV;
}
function reverseText(text,cfg){
  const R=buildReverse(cfg);const hits=[];let m;R.re.lastIndex=0;
  while((m=R.re.exec(text))){
    const base=m[1],suf=m[2]||'',e=R.map.get(base.toLowerCase());if(!e)continue;
    if(e.extra&&(hash(base+m.index)%100)>=cfg.chaos)continue;
    let w=e.word;let sfx=suf;if(!e.extra){const e2=R.map.get(w.toLowerCase());if(e2&&!e2.extra&&e2.word.toLowerCase()!==w.toLowerCase())w=e2.word;}if(suf&&/y$/.test(w)&&/^(s|es)$/.test(suf)){w=w.slice(0,-1);sfx='ies';}
    hits.push({o0:m.index,o1:m.index+m[0].length,out:applyCase(base,w)+sfx,rating:e.rating,orig:m[0],word:e.word,kind:e.extra?'joke':'reversed'});
  }
  if(cfg.chaos>0){
    const re2=/(?<![\p{L}\p{N}])(the|a|an|my|your|this|that|these|those|our|his|her|their)\s+(?=\p{L})/giu;
    while((m=re2.exec(text))){const at=m.index+m[0].length;
      if(hits.some(h=>h.o0<=at&&h.o1>at))continue;
      if(hash(m[0]+m.index)%100<cfg.chaos*0.45)hits.push({o0:at,o1:at,out:'fucking ',rating:2,orig:'',word:'(intensifier)',kind:'chaos'});}
  }
  hits.sort((a,b)=>a.o0-b.o0||a.o1-b.o1);
  const segs=[];let c=0;
  for(const h of hits){if(h.o0<c)continue;if(h.o0>c)segs.push({t:text.slice(c,h.o0)});
    segs.push({t:cfg.style==='flag'?h.orig:h.out,hit:{orig:h.orig,rating:h.rating,kind:h.kind,word:h.word,rev:true}});c=Math.max(c,h.o1);}
  segs.push({t:text.slice(c)});
  return {segs,hits:segs.filter(s=>s.hit).map(s=>s.hit),out:segs.map(s=>s.t).join('')};
}
function process(text,cfg){return cfg.direction==='reverse'?reverseText(text,cfg):censorText(text,cfg);}
function processTextDirect(text,level,style){
  const stars=style==='stars';
  const cfg={level:level||1,style:stars?'stars':'replace',match:'balanced',direction:'censor',
    detect:{leet:true,unicode:true,separators:true,spaced:true,masks:true,stretch:true,phonetic:true,vowelless:true,reversed:false,emoji:true,padded:true},
    maskChar:'*',keepFirst:!stars,keepLast:false,bleepText:'[bleep]',chain:true,chaos:40,custom:[],customWhite:[]};
  try{const r=censorText(String(text||''),cfg);return {hasMatches:r.hits.length>0,cleanedText:r.out};}
  catch(e){console.error('[censor]',e);return {hasMatches:false,cleanedText:String(text||'')};}
}
window.processTextDirect=processTextDirect;
})();
