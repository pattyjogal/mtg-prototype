import { IMtgCard } from "@/mtg-cards";
import { getTailwindColorClass, manaStringToIcons } from "@/lib/utils";
import { Blockquote, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import "tailwindcss/tailwind.css";

interface MtgCardProps {
  card: IMtgCard;
}

const MtgCard: React.FC<MtgCardProps> = ({ card }) => {
  return (
    <Card className={`${getTailwindColorClass(card)} w-[375px] h-[525px]`}>
      <Flex gap="3" direction="column">
        <Flex justify="between">
          <Heading>{card.name}</Heading>
          <div>{manaStringToIcons(card.manaCost)}</div>
        </Flex>
        <Inset>
          <img
            src={card.artworkUrl || "/placeholder.jpg"}
            alt={card.name}
            className="w-full max-h-[250px] object-cover"
          />
        </Inset>
        <Heading size="4" weight="regular">
          {card.type}
        </Heading>
        <Text>{card.text}</Text>
        {card.flavor && <Blockquote>{card.flavor}</Blockquote>}
      </Flex>
    </Card>
  );
};

export default MtgCard;
