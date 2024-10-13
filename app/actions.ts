"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "@/lib/dbConnect";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { put } from "@vercel/blob";
import cuid2 from "@paralleldrive/cuid2";
import { CardType, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type FormState = Omit<Prisma.MtgCardCreateInput, "type" | "artworkUrl"> & { artwork?: File; type: CardType[] };

export const login = () => signIn("discord");
export const logout = () => signOut();

const createCardSchema = zfd.formData({
  name: zfd.text(),
  manaCost: zfd.text(),
  artwork: zfd.file(z.instanceof(File).optional()),
  type: zfd.repeatableOfType(zfd.text(z.nativeEnum(CardType))),
  rarity: zfd.text(),
  text: zfd.text(),
  flavor: zfd.text().optional(),
  power: zfd.text().optional(),
  toughness: zfd.text().optional(),
});

export async function createCard(formState: FormState, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { artwork, ...parsed } = createCardSchema.parse(formData);

  let data: Prisma.MtgCardCreateInput = { ...parsed, user: session.user.name || "unknown" };
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
  redirect(`/cards/${card.id}`);
  return JSON.parse(JSON.stringify(card)) as FormState;
}
