import { IMtgCard } from "@/mtg-cards";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cardSchema = new Schema<IMtgCard>({
  name: { type: String, required: true },
  set: String,
  type: { type: String, required: true },
  manaCost: { type: String, required: true },
  rarity: { type: String, required: true },
  text: { type: String, required: true },
  flavor: String,
  power: String,
  toughness: String,
  artworkUrl: String,
});

export const MtgCardModel =
  (mongoose.models.MtgCard as mongoose.Model<IMtgCard>) ?? model<IMtgCard>("MtgCard", cardSchema);
