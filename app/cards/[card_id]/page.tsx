import MtgCardPreview from "@/components/MtgCardPreview";
import prisma from "@/lib/dbConnect";
import { createDisplayCard } from "@/lib/utils";
import { Button, Container, Flex, Strong, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = { params: { card_id: string } };

const CardPage = async ({ params }: Props) => {
  const card = await prisma.mtgCard.findFirst({ where: { id: params.card_id } });
  if (!card) {
    notFound();
  }

  return (
    <Container>
      <Flex gap="6">
        <MtgCardPreview card={createDisplayCard(card)} />
        <Flex direction="column" gap="3">
          <Flex gap="1">
            <Button asChild>
              <Link href={`/cards/${card.id}/edit`}>
                <Pencil2Icon />
              </Link>
            </Button>
            <Button color="red">
              <TrashIcon />
            </Button>
          </Flex>
          <Text>
            Created by <Strong>{card.user}</Strong>
          </Text>
        </Flex>
      </Flex>
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
