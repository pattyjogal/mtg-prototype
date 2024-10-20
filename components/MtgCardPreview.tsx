import { getTailwindColorClass, manaStringToIcons, renderCostSymbols } from "@/lib/utils";
import { Blockquote, Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";
import "tailwindcss/tailwind.css";
import { DisplayableMtgCard } from "@/mtg-cards";
import { Hedvig_Letters_Serif } from "next/font/google";
import Image from "next/image";

const hedvig = Hedvig_Letters_Serif({ subsets: ["latin"] });

interface MtgCardProps {
  card: DisplayableMtgCard;
}

const MtgCardPreview: React.FC<MtgCardProps> = ({ card }) => {
  return (
    <Card className={`${getTailwindColorClass(card)} w-[375px] h-[525px] ${hedvig.className}`}>
      <Flex gap="5" direction="column" className="h-full">
        <Flex justify="between">
          <Heading className={hedvig.className}>{card.name}</Heading>
          <div>{manaStringToIcons(card.manaCost)}</div>
        </Flex>
        {card.artworkUrl ? (
          <Image
            src={card.artworkUrl}
            alt={card.name}
            width={351}
            height={200}
            className="w-full max-h-[200px] object-cover"
          />
        ) : (
          <Skeleton minHeight="200px" height="200px" />
        )}
        <Flex direction="column" className="h-full">
          <Flex direction="row" className="max-h-5 w-full justify-between mb-3">
            <Heading className={hedvig.className} size="4">
              {card.supertype ? card.supertype : ""} {card.type} {card.subtype ? ` - ${card.subtype}` : ""}
            </Heading>
            <img src={card.setSymbolUrl || "/placeholder.jpg"} alt="S" className="object-cover" />
          </Flex>
          {card.text && <Text>{renderCostSymbols(card.text)}</Text>}
          <div className="wrapper mt-auto">
            {card.flavor && <Blockquote className="italic">{card.flavor}</Blockquote>}
            {card.type.toLowerCase().includes("creature") && (
              <Flex direction="row-reverse">
                <Text className="bg-gray-700 py-1 px-2 rounded-lg">
                  {card.power} / {card.toughness}
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
