"use client";

import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import MtgCardPreview from "@/components/MtgCardPreview";
import CardEditForm from "@/components/CardEditForm";
import { FormState } from "@/app/actions";
import { createDisplayCard } from "@/lib/utils";
import { useFormState } from "react-dom";

interface SideFormCardViewProps {
  onSubmit(state: FormState, data: FormData): Promise<FormState>;
  initCard?: FormState;
}

export default function SideFormCardView({ onSubmit, initCard }: SideFormCardViewProps) {
  const [card, setCard] = useState<FormState>(
    initCard || {
      name: "",
      manaCost: "",
      type: [],
      rarity: "common",
      text: "",
    }
  );

  const [, action] = useFormState(onSubmit, {
    name: "",
    manaCost: "",
    rarity: "common",
    text: "",
    type: [],
  });

  function handleCardChange(name: string, value: string) {
    setCard((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Flex justify="between">
      <CardEditForm onInputChange={handleCardChange} card={card} action={action} />
      <MtgCardPreview card={createDisplayCard(card)} />
    </Flex>
  );
}
