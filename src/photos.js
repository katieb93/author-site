// =====================================================================
//  YOUR PHOTOS
//  Drop images anywhere in src/assets/photography/, then list them
//  under a stack in STACKS below.
// =====================================================================

const files = import.meta.glob(
  "./assets/photography/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}",
  { eager: true, import: "default" }
);

// The stacks on the photography page, in the order they appear.
// List each photo by FILE name under the stack it belongs in.
// Any photo not listed here lands in DEFAULT_STACK.
// The FIRST photo in each list always starts on top of the pile; the rest
// are shuffled. (Or set first: "Some Photo.jpg" to pick a different one.)
// (Optional extras per stack: note: "summer '24", start: new Date(2025, 5, 7))
export const STACKS = [
  {
    label: "Travel",
    photos: [
      "Antibes beach.jpg",
      "Antibes Lanterns.jpg",
      "Arles Farmers Market Spices.jpg",
      "Arles Hidden Figures.jpg",
      "Arles Vincent Wall.jpg",
      "Cannes Beach.jpg",
      "Cannes others selfie.jpg",
      "Cannes.jpg",
      "Mougins.jpg",
      "Nice Beau Rivage.jpg",
      "Nice.jpg",
      "Van Gogh yellow wall.jpg",

    ],
  },
  {
    label: "CineStill 800T",
    photos: [
      "NoVacancy.jpg",
      "AustinMotel.jpg",
      "CinestillWalkCongress.jpg",
      
      "Deadbreakfast.jpg",
      "GoatHouse.jpg",
      "GoatHouseTalafreako.jpg",
      "Orangehouse.jpg",
      "SkeletonsOrange.jpg",
    ],
  },
  {
    label: "Photoshoots",
    photos: [
      "Paramunt Best shot.jpg",
      "Paramount looking at pictures.jpg",
      
      "Parmount Street Light.jpg",
      "Kahla Dreamy.jpg",
      "Kahla Long Goodbye Hair.jpg",
      "Kahla to camera dreamy.jpg",
      "Kelsey Black background.jpg",
      "Kelsey green teeth.jpg",
      "KelseyleaningonSkeleton.jpg",
      "Tav very serious.jpg",
      "Panic Back.jpg",
      "Panic double.jpg",
      "Rachel in Blue.jpg",
      "Rachel in Yellow.jpg",
      "Girls chat Mueller.jpg",
      "Girls in the rain mueller.jpg",
      "MeganTakingPic.jpg",
      "Natalie Long Goodbye Cheers.jpg",
    ],
  },
  {
    label: "Self-Portraits",
    photos: [
      "Halloween portrait'26.jpg",
      "Light on face car.jpg",
      "Antibes Hotel Selfie.jpg",
      "Bubbles Selfie.jpg",
      "Mirror Room Selfie.jpg",
      "Pal Big Eye selife.jpg",
      "Pink Oxfords Selfie.jpg",
      "Red Lips Pouty.jpg",
    ],
  },
  {
    label: "Everyday",
    photos: [
      "Dean Foot Up.jpg",
      "Americana (Man Working on Car).jpg",
      "Closer mom and baby.jpg",
      "ColorfulHouse.jpg",

      
      "Ellie at Palomino.jpg",
      "FunRunningHalloween.jpg",


      "HalloweenStreet.jpg",
      "Library Rooftop.jpg",
      "McKenna Pal.jpg",

      "Mom and Baby - Nat's Party.jpg",
      "Nat delighted with Dean.jpg",


      "Shipe Pool.jpg",

      "Stuffed Lamb.jpg",

      "Tracey at Radio.jpg",
      "Yellow House in Hyde Park.jpg",
    ],
  },
];

export const DEFAULT_STACK = "Everyday";

// Optional: what's "written on the back" of each print, keyed by FILE name.
// PLACEHOLDER TEXT — swap in the real notes.
export const CAPTIONS = {
 "Americana (Man Working on Car).jpg": "Hyde Park, Austin, TX, pure Americana",
 "Antibes beach.jpg": "Antibes, France, Billionaires Bay",

 "Antibes Hotel Selfie.jpg": "Hôtel Le Petit Castel, Antibes, France, resting",
 "Antibes Lanterns.jpg": "Antibes, France, it’s like this there all the time",

 "Arles Farmers Market Spices.jpg": "Arles, France, the Saturday market",

 "Arles Hidden Figures.jpg": "Arles, France, a hidden figure",
 "Arles Vincent Wall.jpg": "Arles, France, “Cafe Terrace at Night in real life",
 "AustinMotel.jpg": "Austin Motel, S. Congress",
 "Bubbles Selfie.jpg": "Bubbles in the backyard",

 "Cannes Beach.jpg": "Cannes, France, late afternoon",
 "Cannes others selfie.jpg": "Cannes, France, cannot let this moment pass us by",
 "Cannes.jpg": "Cannes, France, I walked the red steps a few nights later",
 "CinestillWalkCongress.jpg": "S. Congress at night",

 "Closer mom and baby.jpg": "Mom and baby at Shipe Pool",

 "ColorfulHouse.jpg": "Spooky House, USA",

 "Deadbreakfast.jpg": "Breakfast with the dead",
 "Dean Foot Up.jpg": "Little baby nephew, dancing",
 "Ellie at Palomino.jpg": "Ellie at Palomino Coffee… a very good girl",
 "FunRunningHalloween.jpg": "Halloween night just beginning",

 "Girls chat Mueller.jpg": "Mueller, Kahla and Natallie, genuine",

 "Girls in the rain mueller.jpg": "Mueller, Rachel, Natalie, and Kahla caught in the rain",

 "GoatHouse.jpg": "The (former) goat house",
 "GoatHouseTalafreako.jpg": "The spirits led us to glory (Halloween before the 2026 mid terms)",
 "Halloween portrait'26.jpg": "Halloween portrait, '26, at Palomino",
 "HalloweenStreet.jpg": "It’s still the 90s on 35mm in Austin, TX",
 "Kahla Dreamy.jpg": "Mueller, Kahla all dreamy",
 "Kahla Long Goodbye Hair.jpg": "The Long Goodbye, Kahla and her hair",
 "Kahla to camera dreamy.jpg": "Mueller, Kahla, looking right at me",
 "Kelsey Black background.jpg": "Panic ‘26, Kelsey",
 "Kelsey green teeth.jpg": "Panic ‘26, Kelsey and her green teeth",
 "KelseyleaningonSkeleton.jpg": "Panic ‘26, Kelsey and her new friend",

 "Library Rooftop.jpg": "Austin Public Library rooftop",
 "Light on face car.jpg": "Light through the car window",
 "McKenna Pal.jpg": "Makenna at Palomino",
 "MeganTakingPic.jpg": "Panic ‘26, Megan photographing Tav",

 "Mirror Room Selfie.jpg": "At home",
 "Mom and Baby - Nat's Party.jpg": "Mom and baby at Shipe Pool, on the move",

 "Mougins.jpg": "Mougins, France, the most beautiful place I’ve ever been",

 "Nat delighted with Dean.jpg": "Nat, delighted with dean at Shipe Pool",

 "Natalie Long Goodbye Cheers.jpg": "The Long Goobye, Natalie, cheers!",
 "Nice Beau Rivage.jpg": "Beau rivage, Nice, my last night in the French Riviera",
 "Nice.jpg": "Place Massena, Nice",

 "NoVacancy.jpg": "No vacancy",

 "Orangehouse.jpg": "The orange house",

 "Pal Big Eye selife.jpg": "Average day at Palomino",

 "Panic Back.jpg": "Panic ‘26, Tav and Katy over the shoulder",
 "Panic double.jpg": "Panic ‘26, Tav and Katy front and back",

 "Paramount looking at pictures.jpg": "Timeless Beauty, looking over pictures",
 "Paramunt Best shot.jpg": "Timeless Beauty, my very best photo",
 "Parmount Street Light.jpg": "Timeless Beauty, on Congress",
 "Pink Oxfords Selfie.jpg": "All the way down to my very best shoes",
 "Rachel in Blue.jpg": "Mueller, Rachel in blue",
 "Rachel in Yellow.jpg": "Mueller, Rachel in yellow",
 "Red Lips Pouty.jpg": "Experiments in how to use the selfie function",
 "Shipe Pool.jpg": "Happy days at shipe pool",
 "SkeletonsOrange.jpg": "Skeletons on the porch",
 "Stuffed Lamb.jpg": "First Light Books, a little lamb",
 "Tav very serious.jpg": "Panic ‘26, very serious",
 "Tracey at Radio.jpg": "Radio coffee, Tracey and her hair",
 "Van Gogh yellow wall.jpg": "Arles, France, ‘Cafe Terrace at Night’ in real life",
 "Yellow House in Hyde Park.jpg": "What I want life to feel like",

};

// Optional: real date stamps, keyed by FILE name. Format like the camera did it.
// PLACEHOLDER DATES — swap in the real ones.
export const DATES = {
"Americana (Man Working on Car).jpg": "'26 7 1",

 "Antibes beach.jpg": "'26 5 14",
 "Antibes Hotel Selfie.jpg": "'26 5 14",
 "Antibes Lanterns.jpg": "'26 5 14",
 "Arles Farmers Market Spices.jpg": "'26 5 23",
 "Arles Hidden Figures.jpg": "'26 5 21",
 "Arles Vincent Wall.jpg": "'26 5 21",

 "AustinMotel.jpg": "'26 4 19",

 "Bubbles Selfie.jpg": "'26 5 2",

 "Cannes Beach.jpg": "'26 5 15",
 "Cannes others selfie.jpg": "'26 5 15",
 "Cannes.jpg": "'26 5 15",

 "CinestillWalkCongress.jpg": "'26 8 2",

 "Closer mom and baby.jpg": "'26 8 8",

 "ColorfulHouse.jpg": "'26 10 31",

 "Deadbreakfast.jpg": "'26 10 31",
 "Dean Foot Up.jpg": "'26 8 8",

 "Ellie at Palomino.jpg": "'26 8 18",

 "FunRunningHalloween.jpg": "'26 10 31",
 "Girls chat Mueller.jpg": "'26 7 17",
 "Girls in the rain mueller.jpg": "'26 7 17",

 "GoatHouse.jpg": "'26 10 31",
 "GoatHouseTalafreako.jpg": "'26 10 31",
 "Halloween portrait'26.jpg": "'26 10 31",
 "HalloweenStreet.jpg": "'26 10 31",

 "Kahla Dreamy.jpg": "'26 7 17",

 "Kahla Long Goodbye Hair.jpg": "'26 7 2",
 "Kahla to camera dreamy.jpg": "'26 7 17",

 "Kelsey Black background.jpg": "'26 10 15",
 "Kelsey green teeth.jpg": "'26 10 15",
 "KelseyleaningonSkeleton.jpg": "'26 10 15",

 "Library Rooftop.jpg": "'26 7 25",

 "Light on face car.jpg": "'26 10 15",

 "McKenna Pal.jpg": "'26 6 5",

 "MeganTakingPic.jpg": "'26 10 15",

 "Mirror Room Selfie.jpg": "'26 5 20",

 "Mom and Baby - Nat's Party.jpg": "'26 8 8",
 "Mougins.jpg": "'26 5 16",

 "Nat delighted with Dean.jpg": "'26 8 8",
 "Natalie Long Goodbye Cheers.jpg": "'26 7 2",

 "Nice Beau Rivage.jpg": "'26 5 23",
 "Nice.jpg": "'26 5 23",

 "NoVacancy.jpg": "'26 8 2",
 "Orangehouse.jpg": "'26 10 31",

 "Pal Big Eye selife.jpg": "'26 7 13",
 "Panic Back.jpg": "'26 10 15",
 "Panic double.jpg": "'26 10 15",

 "Paramount looking at pictures.jpg": "'26 6 24",
 "Paramunt Best shot.jpg": "'26 6 24",
 "Parmount Street Light.jpg": "'26 6 24",

 "Pink Oxfords Selfie.jpg": "'26 8 26",

 "Rachel in Blue.jpg": "'26 7 12",
 "Rachel in Yellow.jpg": "'26 7 12",

 "Red Lips Pouty.jpg": "'26 5 2",
 "Shipe Pool.jpg": "'26 8 8",
 "SkeletonsOrange.jpg": "'26 10 31",
 "Stuffed Lamb.jpg": "'26 7 1",
 "Tav very serious.jpg": "'26 10 15",
 "Tracey at Radio.jpg": "'26 8 2",
 "Van Gogh yellow wall.jpg": "'26 5 21",
 "Yellow House in Hyde Park.jpg": "'26 7 1",

};

// Photos without a date above get a made-up 90s date. Each stack starts
// a few weeks after the last. Set to null for no date stamps at all.
// (Made-up dates are also what "Organize by date" sorts by, so add real
// ones in DATES above for any photo where the order matters.)
export const ROLL_START = new Date(1998, 5, 14); // June 14, 1998

// ---------------------------------------------------------------------
//  You shouldn't need to edit below here.
// ---------------------------------------------------------------------

const altFromName = (name) => {
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "Photograph";
};

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Repeatable "random" number from a filename, so each print always lands
// at the same messy angle.
const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

// "'26 5 21" -> a real date, so photos can be sorted
const parseStamp = (s) => {
  const m = /'?(\d{2,4})\s+(\d{1,2})\s+(\d{1,2})/.exec(s || "");
  if (!m) return null;
  let y = Number(m[1]);
  if (y < 100) y += y < 70 ? 2000 : 1900;
  return new Date(y, Number(m[2]) - 1, Number(m[3]));
};

const stamp = (d) =>
  `'${String(d.getFullYear()).slice(2)} ${d.getMonth() + 1} ${String(
    d.getDate()
  ).padStart(2, " ")}`;

// Which stack each photo belongs in
const stackOf = {};
STACKS.forEach((s) => s.photos.forEach((name) => (stackOf[name] = s.label)));

// Group files by stack
const groups = {};
for (const [path, src] of Object.entries(files)) {
  const name = path.split("/").pop();
  const label = stackOf[name] || DEFAULT_STACK;
  (groups[label] ||= []).push({ src, name, id: path });
}

const stackOrder = (label) => {
  const i = STACKS.findIndex((s) => s.label === label);
  return i === -1 ? STACKS.length : i;
};

export const ROLLS = Object.entries(groups)
  .map(([label, items]) => {
    const info = STACKS.find((s) => s.label === label) || {};
    return {
      slug: slugify(label),
      label,
      note: info.note || "",
      start: info.start || null,
      // Always on top of the pile: `first` if set, else the first photo listed
      first: info.first || info.photos?.[0] || null,
      items,
    };
  })
  .sort(
    (a, b) =>
      stackOrder(a.label) - stackOrder(b.label) || a.label.localeCompare(b.label)
  )
  .map((roll, rollIndex) => {
    // Made-up date stamps: each roll starts ~6 weeks after the one before
    let day = null;
    if (roll.start) day = new Date(roll.start);
    else if (ROLL_START) {
      day = new Date(ROLL_START);
      day.setDate(day.getDate() + rollIndex * 42);
    }

    const photos = roll.items
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      .map(({ src, name, id }) => {
        const seed = hash(name) % 100000;
        let date = DATES[name] || "";
        let time = parseStamp(date)?.getTime() ?? null;
        if (!date && day) {
          date = stamp(day);
          time = day.getTime();
          day.setDate(day.getDate() + Math.floor(rand(seed + 1.3) * 3));
        }
        return {
          id,
          src,
          name,
          time,
          alt: altFromName(name),
          caption: CAPTIONS[name] || "",
          date,
          // messiness, from -0.5 to 0.5 (the stack decides how big)
          r: rand(seed + 3.1) - 0.5,
          x: rand(seed + 5.7) - 0.5,
          y: rand(seed + 7.3) - 0.5,
        };
      });

    const { items, ...rest } = roll;
    return { ...rest, photos };
  });

export const ALL_PHOTOS = ROLLS.flatMap((r) => r.photos);

// Every photo, oldest first (photos with no date go at the end)
export const BY_DATE = [...ALL_PHOTOS].sort(
  (a, b) =>
    (a.time ?? Infinity) - (b.time ?? Infinity) ||
    a.name.localeCompare(b.name, undefined, { numeric: true })
);
