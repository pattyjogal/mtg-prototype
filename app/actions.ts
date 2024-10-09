"use server";
import prisma from "@/lib/dbConnect";
import { DisplayableMtgCard } from "@/mtg-cards";
import { z } from "zod";
import { zfd } from "zod-form-data";

type FormState = DisplayableMtgCard;

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
  const card = await prisma.mtgCard.create({ data });
  return JSON.parse(JSON.stringify(card)) as FormState;
}
