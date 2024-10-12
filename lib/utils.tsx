import { DisplayableMtgCard } from "@/mtg-cards";
import { MtgCard } from "@prisma/client";
import type { ReactNode } from "react";
import { CardTypeDisplay, CardTypeOrder } from "./constants";

export function CostSymbol({ cost }: { cost: string }) {
  return <i className={`ms ms-cost ms-${cost.replace(/[{}]/g, "").toLowerCase()}`} />;
}

export function manaStringToIcons(manaString: string): ReactNode[] {
  const manaSymbols = manaString.match(/{(.*?)}/g) || [];
  return manaSymbols.map((symbol) => <CostSymbol key={symbol} cost={symbol} />);
}

export function renderCostSymbols(text: string): ReactNode[] {
  return text.split(/({.*?})/g).map((part, index) => {
    if (part.match(/{.*?}/)) {
      return <CostSymbol key={index} cost={part} />;
    }
    return part;
  });
}

const colorSymbols: { [key: string]: string } = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
};

function getColorIdentity(card: DisplayableMtgCard): string[] {
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

  return Array.from(colorIdentity);
}

export function getTailwindColorClass(card: DisplayableMtgCard): string {
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

export function createDisplayCard(card: MtgCard): DisplayableMtgCard {
  return {
    ...card,
    type: CardTypeOrder.filter((x) => card.type.includes(x))
      .map((type) => CardTypeDisplay[type])
      .join(" "),
  };
}
