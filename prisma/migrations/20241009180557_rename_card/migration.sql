/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "MtgCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manaCost" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "flavor" TEXT,
    "power" TEXT,
    "toughness" TEXT,
    "artworkUrl" TEXT,
    "setSymbolUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MtgCard_pkey" PRIMARY KEY ("id")
);
