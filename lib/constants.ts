import { CardType } from "@prisma/client";

export const CardTypeDisplay: { [key in CardType]: string } = {
  CREATURE: "Creature",
  INSTANT: "Instant",
  SORCERY: "Sorcery",
  ARTIFACT: "Artifact",
  ENCHANTMENT: "Enchantment",
  PLANESWALKER: "Planeswalker",
  LAND: "Land",
  OTHER: "Other",
};

export const CardTypeOrder: CardType[] = [
  CardType.ENCHANTMENT,
  CardType.ARTIFACT,
  CardType.LAND,
  CardType.CREATURE,
  CardType.INSTANT,
  CardType.SORCERY,
  CardType.PLANESWALKER,
  CardType.OTHER,
];
