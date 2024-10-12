import MiniMtgCard from "@/components/MiniMtgCard";
import prisma from "@/lib/dbConnect";
import { createDisplayCard } from "@/lib/utils";
import { Button, Container, Grid } from "@radix-ui/themes";
import Link from "next/link";

export default async function CardsPage() {
  const cards = await prisma.mtgCard.findMany();
  return (
    <Container>
      <Button asChild className="mb-6">
        <Link href="/cards/create">Create</Link>
      </Button>
      {cards.length === 0 ? (
        <h1>No cards found</h1>
      ) : (
        <Grid columns="5" gap="3" rows="repeat(2, 64px)" width="auto">
          {cards.map((card) => (
            <MiniMtgCard key={card.id} card={{ ...createDisplayCard(card), id: card.id }} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
