"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/dbConnect";
import { DisplayableMtgCard } from "@/mtg-cards";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { put } from "@vercel/blob";
import cuid2 from "@paralleldrive/cuid2";

type FormState = { artwork: File | null } & DisplayableMtgCard;

export const login = () => signIn("discord");
export const logout = () => signOut();

const createCardSchema = zfd.formData({
  name: zfd.text(),
  manaCost: zfd.text(),
  artwork: zfd.file(z.instanceof(File).optional()),
  type: zfd.text(),
  rarity: zfd.text(),
  text: zfd.text(),
});

export async function createCard(formState: FormState, formData: FormData) {
  const { artwork, ...parsed } = createCardSchema.parse(formData);

  let data: DisplayableMtgCard = parsed;
  if (artwork) {
    const mimeToExtension: { [key: string]: string } = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
    };
    const extension = mimeToExtension[artwork.type] || "bin";
    const { url } = await put(`card_art/${cuid2.createId()}.${extension}`, artwork, { access: "public" });
    data = { ...data, artworkUrl: url };
  }

  const card = await prisma.mtgCard.create({ data });
  return JSON.parse(JSON.stringify(card)) as FormState;
}
