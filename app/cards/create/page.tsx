"use client";

import { Container, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import MtgCardPreview from "@/components/MtgCardPreview";
import CardEditForm from "@/components/CardEditForm";

export default function CardEditPage() {
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
    <Container>
      <Heading mb="8">Create a Card</Heading>
      <Flex justify="between">
        <CardEditForm onInputChange={handleCardChange} />
        <MtgCardPreview card={card} />
      </Flex>
    </Container>
  );
}
