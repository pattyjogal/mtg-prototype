import type { ReactNode } from "react";
import { SetCard } from "./mtg-cards";

export function manaStringToIcons(manaString: string): ReactNode[] {
  const manaSymbols = manaString.match(/{(.*?)}/g) || [];
  return manaSymbols.map((symbol) => (
    <i
      className={`ms ms-cost ms-${symbol.replace(/[{}]/g, "").toLowerCase()}`}
    />
  ));
}


const colorSymbols: { [key: string]: string } = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
};

function getColorIdentity(card: SetCard): string[] {
    const colorIdentity = new Set<string>();

    // Check mana cost for color symbols
    if (card.manaCost) {
        for (const symbol of Object.keys(colorSymbols)) {
            if (card.manaCost.includes(symbol)) {
                colorIdentity.add(colorSymbols[symbol]);
            }
        }
    }

    // Check color indicators
    if (card.colorIndicator) {
        for (const color of card.colorIndicator) {
            if (colorSymbols[color]) {
                colorIdentity.add(colorSymbols[color]);
            }
        }
    }

    // Check card text for color-related keywords
    if (card.text) {
        for (const symbol of Object.keys(colorSymbols)) {
            const colorName = colorSymbols[symbol];
            const regex = new RegExp(`\\b${colorName}\\b`, "i");
            if (regex.test(card.text)) {
                colorIdentity.add(colorName);
            }
        }
    }

    return Array.from(colorIdentity);
}

export function getTailwindColorClass(card: SetCard): string {
    const colorIdentity = getColorIdentity(card);

    if (colorIdentity.length === 0) {
        return "bg-gray-500"; // Colorless
    } else if (colorIdentity.length > 1) {
        return "bg-yellow-500"; // Multicolor
    } else {
        const color = colorIdentity[0];
        switch (color) {
            case "White":
                return "bg-white";
            case "Blue":
                return "bg-blue-500";
            case "Black":
                return "bg-black";
            case "Red":
                return "bg-red-500";
            case "Green":
                return "bg-green-500";
            default:
                return "bg-gray-500"; // Fallback to colorless
        }
    }
}