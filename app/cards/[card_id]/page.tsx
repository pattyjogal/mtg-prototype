import MtgCardPreview from "@/components/MtgCardPreview";
import prisma from "@/lib/dbConnect";
import { createDisplayCard } from "@/lib/utils";
import { AlertDialog, Button, Container, Flex, Strong, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { deleteCard } from "@/app/actions";
import DeleteButton from "@/components/DeleteButton";

type Props = { params: { card_id: string } };

const CardPage = async ({ params }: Props) => {
  const card = await prisma.mtgCard.findFirst({ where: { id: params.card_id } });
  if (!card) {
    notFound();
  }

  const deleteAction = deleteCard.bind(null, card.id);

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
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="red">
                  <TrashIcon />
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete {card.name}?</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure you want to delete this card? This action cannot be undone.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <DeleteButton deleteAction={deleteAction} />
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
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
