import MtgCardPreview from "@/components/MtgCardPreview";
import prisma from "@/lib/dbConnect";
import { createDisplayCard } from "@/lib/utils";
import { Container } from "@radix-ui/themes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { card_id: string } };

const CardPage = async ({ params }: Props) => {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { card_id } = params;

  // fetch data
  const card = await prisma.mtgCard.findFirst({ where: { id: card_id } });
  if (!card) {
    return {};
  }

  return {
    title: card.name,
    description: card.manaCost + " • " + card.type + " • " + card.text,
    openGraph: {
      images: card.artworkUrl ? [card.artworkUrl] : [],
    },
  };
}

export default CardPage;
