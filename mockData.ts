import mongoose from "mongoose";
import { MtgCardModel } from "./models/card";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mtg-prototype";

const mockCards = [
  {
    name: "Black Lotus",
    manaCost: "{0}",
    type: "Artifact",
    text: "Tap, Sacrifice Black Lotus: Add three mana of any one color.",
    flavor: "The most expensive card in Magic: The Gathering.",
    artworkUrl: "https://cards.scryfall.io/art_crop/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    rarity: "Rare",
  },
  {
    name: "Lightning Bolt",
    manaCost: "{R}",
    type: "Instant",
    text: "Lightning Bolt deals 3 damage to any target.",
    flavor: "A flash of light and a hideous roar split the air as the smell of ozone overwhelms the senses.",
    artworkUrl: "https://cards.scryfall.io/art_crop/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1706239968",
    rarity: "Common",
  },
  {
    name: "Counterspell",
    manaCost: "{U}{U}",
    type: "Instant",
    text: "Counter target spell.",
    flavor: "The mage's mind whirled with grand plans, never thinking of what might happen if they were to be stopped.",
    artworkUrl: "https://cards.scryfall.io/art_crop/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1726837907",
    rarity: "Uncommon",
  },
  {
    name: "Giant Growth",
    manaCost: "{G}",
    type: "Instant",
    text: "Target creature gets +3/+3 until end of turn.",
    flavor: "The colossal power of nature can be harnessed in a single moment.",
    artworkUrl: "https://cards.scryfall.io/art_crop/front/e/7/e70722d6-b4d5-45c2-9488-9a5eb0bdb9bd.jpg?1721428103",
    rarity: "Common",
  },
  {
    name: "Dark Ritual",
    manaCost: "{B}",
    type: "Instant",
    text: "Add {B}{B}{B}.",
    flavor: "The dark energies of the ritual draw power from the shadows.",
    artworkUrl: "https://cards.scryfall.io/art_crop/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg?1628801678",
    rarity: "Uncommon",
  },
];

async function insertMockData() {
  await mongoose.connect(MONGODB_URI);

  try {
    await MtgCardModel.deleteMany({}); // Clear existing data
    await MtgCardModel.insertMany(mockCards);
    console.log("Mock data inserted successfully!");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertMockData();
