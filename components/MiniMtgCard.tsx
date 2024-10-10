import { DisplayableMtgCard } from "@/mtg-cards";
import { getTailwindColorClass, manaStringToIcons } from "@/lib/utils";
import { Card, Flex, Heading, Inset } from "@radix-ui/themes";
import "tailwindcss/tailwind.css";
import Link from "next/link";

interface MiniMtgCardProps {
  card: DisplayableMtgCard & { id: string };
}

const MiniMtgCard: React.FC<MiniMtgCardProps> = ({ card }) => {
  return (
    <Card asChild className={`${getTailwindColorClass(card)} w-[187px] h-[263px]`}>
      <Link href={`/cards/${card.id}`}>
        <Flex gap="5" direction="column">
          <Flex justify="between" wrap="nowrap">
            <Heading size="2" truncate>
              {card.name}
            </Heading>
            <Flex gap="1">{manaStringToIcons(card.manaCost)}</Flex>
          </Flex>
          <Inset>
            <img
              src={card.artworkUrl || "/placeholder.jpg"}
              alt={card.name}
              className="w-full max-h-[187px] object-cover"
            />
          </Inset>
          <Heading size="4" weight="regular">
            {card.type}
          </Heading>
        </Flex>
      </Link>
    </Card>
  );
};

export default MiniMtgCard;
