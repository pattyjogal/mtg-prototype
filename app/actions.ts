"use server";
// https://www.robinwieruch.de/next-forms/
import { MtgCardModel } from "@/models/card";
import { IMtgCard } from "@/mtg-cards";
import { z } from "zod";
import { zfd } from "zod-form-data";

type FormState = IMtgCard;

const createCardSchema = zfd.formData({
  name: zfd.text(),
  manaCost: zfd.text(),
  artworkUrl: zfd.text(z.string().url()),
  type: zfd.text(),
  rarity: zfd.text(),
  text: zfd.text(),
});

export async function createCard(formState: FormState, formData: FormData) {
  const data = createCardSchema.parse(formData);
  const card = await MtgCardModel.create(data);
  return JSON.parse(JSON.stringify(card)) as FormState;
}
