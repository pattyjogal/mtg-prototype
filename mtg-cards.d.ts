export interface DisplayableMtgCard {
  name: string;
  manaCost: string;
  type: string;
  text: string;
  rarity: string;
  colorIndicator?: string | null;
  flavor?: string | null;
  power?: string | null;
  toughness?: string | null;
  artworkUrl?: string | null;
  setSymbolUrl?: string | null;
}
