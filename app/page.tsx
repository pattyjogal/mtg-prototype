import MtgCardPreview from "@/components/MtgCardPreview";
import { Container } from "@radix-ui/themes";

export default async function Dashboard() {
  return (
    <Container>
      <MtgCardPreview
        card={{
          name: "Expensive Lightning Bolt",
          manaCost: "{5}{R}",
          type: "Instant",
          rarity: "Common",
          text: "Deal 3 damage to any target",
          flavor: "Why tf is this so expensive",
          artworkUrl: "https://cardgamebase.com/wp-content/uploads/Lightning-Bolt-MTG-Banner-Card-in-Focus.jpg",
          setSymbolUrl: "https://i.imgur.com/AaDn6sc.png",
        }}
      />
      <MtgCardPreview
        card={{
          name: "Colossal Dreadmaw",
          manaCost: "{4}{G}{G}",
          type: "Creature",
          rarity: "Common",
          text: "Trample, Haste",
          flavor: "It's big.",
          artworkUrl:
            "https://www.muddycolors.com/wp-content/uploads/2017/12/1c9a4-art2bid2b4023332btowering2bgiant2bfinal.jpg",
          setSymbolUrl: "https://i.imgur.com/AaDn6sc.png",
          power: "6",
          toughness: "6",
        }}
      />
      <MtgCardPreview
        card={{
          name: "Vanilla Dreadmaw",
          manaCost: "{4}{G}{G}",
          type: "Creature",
          rarity: "Common",
          text: "",
          flavor: "It's big.",
          artworkUrl:
            "https://www.muddycolors.com/wp-content/uploads/2017/12/1c9a4-art2bid2b4023332btowering2bgiant2bfinal.jpg",
          setSymbolUrl: "https://i.imgur.com/AaDn6sc.png",
          power: "6",
          toughness: "6",
        }}
      />
    </Container>
  );
}
