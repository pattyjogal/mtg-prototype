import MiniMtgCard from "@/components/MiniMtgCard";
import prisma from "@/lib/dbConnect";
import { Container, Grid } from "@radix-ui/themes";

export default async function CardsPage() {
  const cards = await prisma.mtgCard.findMany();
  return (
    <Container>
      {cards.length === 0 ? (
        <h1>No cards found</h1>
      ) : (
        <Grid columns="5" gap="3" rows="repeat(2, 64px)" width="auto">
          {cards.map((card) => (
            <MiniMtgCard key={card.id} card={card} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
