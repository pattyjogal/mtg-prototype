import { Container, Heading } from "@radix-ui/themes";
import { auth } from "@/auth";
import SideFormCardView from "@/components/SideFormCardView";
import { notFound, redirect } from "next/navigation";
import { updateCard } from "@/app/actions";
import prisma from "@/lib/dbConnect";

type Props = { params: { card_id: string } };

export default async function CardEditPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) {
    redirect("/cards");
  }

  const card = await prisma.mtgCard.findFirst({ where: { id: params.card_id } });
  if (!card) {
    notFound();
  }

  const updateCardWithId = updateCard.bind(null, card.id);

  return (
    <Container>
      <Heading mb="8">Edit {card.name}</Heading>
      <SideFormCardView onSubmit={updateCardWithId} initCard={card} submitText="Save Edits" />
    </Container>
  );
}
