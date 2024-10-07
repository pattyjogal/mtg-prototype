import LoginButton from "@/components/login-btn";
import MtgCard from "@/components/MtgCard";
import { Container } from "@radix-ui/themes";

export default async function Dashboard() {
  return (
    <Container>
      <MtgCard card={{
        name: "Expensive Lightning Bolt",
        manaCost: "{5}{R}",
        type: "Instant",
        rarity: "Common",
        text: "Deal 3 damage to any target",
        flavor: "Why tf is this so expensive",
        artworkUrl: "https://cardgamebase.com/wp-content/uploads/Lightning-Bolt-MTG-Banner-Card-in-Focus.jpg"
      }} />
    </Container>
  );
}
