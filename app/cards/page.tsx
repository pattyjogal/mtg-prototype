import MtgCard from "@/components/MtgCard";
import dbConnect from "@/lib/dbConnect";
import { MtgCardModel } from "@/models/card";
import { Container, Grid } from "@radix-ui/themes";

export default async function CardsPage() {
  await dbConnect();

  const cards = await MtgCardModel.find({}).lean();

  return (
    <Container>
      {cards.length === 0 ? (
        <h1>No cards found</h1>
      ) : (
        <Grid columns="5" gap="3" rows="repeat(2, 64px)" width="auto">
          {cards.map((card) => (
            <MtgCard key={card._id.toString()} card={card} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
