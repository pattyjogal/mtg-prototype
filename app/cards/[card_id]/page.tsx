import MtgCard from "@/components/MtgCard";
import dbConnect from "@/lib/dbConnect";
import { MtgCardModel } from "@/models/card";
import { Container } from "@radix-ui/themes";
import { notFound } from "next/navigation";

const CardPage = async ({ params }: { params: { card_id: string } }) => {
  await dbConnect();

  const card = await MtgCardModel.findById(params.card_id).lean();
  if (!card) {
    notFound();
  }

  return (
    <Container>
      <MtgCard card={card} />
    </Container>
  );
};

export default CardPage;
