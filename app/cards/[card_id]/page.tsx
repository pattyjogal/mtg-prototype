import MtgCardPreview from "@/components/MtgCardPreview";
import prisma from "@/lib/dbConnect";
import { createDisplayCard } from "@/lib/utils";
import { Container } from "@radix-ui/themes";
import { notFound } from "next/navigation";

const CardPage = async ({ params }: { params: { card_id: string } }) => {
  const card = await prisma.mtgCard.findFirst({ where: { id: params.card_id } });
  if (!card) {
    notFound();
  }

  return (
    <Container>
      <MtgCardPreview card={createDisplayCard(card)} />
    </Container>
  );
};

export default CardPage;
