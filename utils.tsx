import type { ReactNode } from "react";

export function manaStringToIcons(manaString: string): ReactNode[] {
    const manaSymbols = manaString.match(/{(.*?)}/g) || [];
    return manaSymbols.map(symbol => <i className={`ms ms-cost ms-${symbol.replace(/[{}]/g, '').toLowerCase()}`} />);
}
