import { getTailwindColorClass, manaStringToIcons } from "@/lib/utils";
import { Blockquote, Card, Flex, Heading, Text } from "@radix-ui/themes";
import "tailwindcss/tailwind.css";
import { DisplayableMtgCard } from "@/mtg-cards";

interface MtgCardProps {
  card: DisplayableMtgCard;
}

const MtgCardPreview: React.FC<MtgCardProps> = ({ card }) => {
  return (
    <Card className={`${getTailwindColorClass(card)} w-[375px] h-[525px]`}>
      <Flex gap="5" direction="column" className="h-full">
        <Flex justify="between">
          <Heading>{card.name}</Heading>
          <div>{manaStringToIcons(card.manaCost)}</div>
        </Flex>
        <img
          src={card.artworkUrl || "/placeholder.jpg"}
          alt={card.name}
          className="w-full max-h-[200px] object-cover"
        />
        <Flex direction="column" className="h-full justify-between">
          <Flex direction="row" className="max-h-5 w-full justify-between">
            <Heading size="4" weight="regular">
              {card.type}
            </Heading>
            <img src={card.setSymbolUrl || "/placeholder.jpg"} alt={card.name} className="object-cover" />
          </Flex>
          {card.text && <Text>{card.text}</Text>}
          {card.flavor && <Blockquote className="italic">{card.flavor}</Blockquote>}
          <div className="wrapper">
            {card.type.toLowerCase().includes("creature") && (
              <Flex direction="row-reverse">
                <Text>
                  {card.power}/{card.toughness}
                </Text>
              </Flex>
            )}
          </div>
        </Flex>
      </Flex>
    </Card>
  );
};

export default MtgCardPreview;
