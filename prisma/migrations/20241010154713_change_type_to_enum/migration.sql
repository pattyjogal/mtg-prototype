/*
  Warnings:

  - The `type` column on the `MtgCard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREATURE', 'ARTIFACT', 'ENCHANTMENT', 'INSTANT', 'SORCERY', 'PLANESWALKER', 'LAND', 'OTHER');

-- Add a new column with the new enum type
ALTER TABLE "MtgCard" ADD COLUMN "new_type" "CardType"[];

-- Update the new column with the converted values
UPDATE "MtgCard"
SET "new_type" = ARRAY[
  CASE 
    WHEN LOWER("type") = 'creature' THEN 'CREATURE'
    WHEN LOWER("type") = 'artifact' THEN 'ARTIFACT'
    WHEN LOWER("type") = 'enchantment' THEN 'ENCHANTMENT'
    WHEN LOWER("type") = 'instant' THEN 'INSTANT'
    WHEN LOWER("type") = 'sorcery' THEN 'SORCERY'
    WHEN LOWER("type") = 'planeswalker' THEN 'PLANESWALKER'
    WHEN LOWER("type") = 'land' THEN 'LAND'
    ELSE 'OTHER'
  END
]::"CardType"[];

-- Drop the old column
ALTER TABLE "MtgCard" DROP COLUMN "type";

-- Rename the new column to the original column name
ALTER TABLE "MtgCard" RENAME COLUMN "new_type" TO "type";