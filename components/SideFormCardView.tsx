"use client";

import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import MtgCardPreview from "@/components/MtgCardPreview";
import CardEditForm from "@/components/CardEditForm";

export default function SideFormCardView() {
  const [card, setCard] = useState({
    name: "",
    manaCost: "",
    type: "",
    artworkUrl: "",
    rarity: "common",
    text: "",
  });

  function handleCardChange(name: string, value: string) {
    setCard((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Flex justify="between">
      <CardEditForm onInputChange={handleCardChange} />
      <MtgCardPreview card={card} />
    </Flex>
  );
}
