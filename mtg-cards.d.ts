export interface IMtgCard {
  colorIndicator?: string[];
  name: string;
  set?: string;
  manaCost: string;
  type: string;
  rarity: string;
  text: string;
  flavor?: string;
  power?: string;
  toughness?: string;
  artworkUrl?: string;
}
