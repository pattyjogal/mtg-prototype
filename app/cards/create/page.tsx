"use client";

import { createCard } from "@/app/actions";
import * as Form from "@radix-ui/react-form";
import { Button, Container, Flex, Heading, Select, TextArea, TextField } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { debounce } from "lodash";
import MtgCardPreview from "@/components/MtgCardPreview";

interface SubmitButtonProps {
  label: ReactNode;
  loading: ReactNode;
}

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? loading : label}
    </Button>
  );
};

interface CardEditFormProps {
  onInputChange(name: string, value: string): void;
}

function CardEditForm({ onInputChange }: CardEditFormProps) {
  const [, action] = useFormState(createCard, {
    name: "",
    manaCost: "",
    artworkUrl: "",
    type: "",
    rarity: "common",
    text: "",
  });

  const debouncedInputChange = debounce((name: string, value: string) => {
    onInputChange(name, value);
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    debouncedInputChange(e.target.name, e.target.value);
  };

  return (
    <Form.Root className="max-w-lg" action={action}>
      <Form.Field className="grid mb-3" name="name">
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control asChild>
          <TextField.Root type="text" name="name" required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="manaCost">
        <Form.Label htmlFor="manaCost">Mana Cost</Form.Label>
        <Form.Control asChild>
          <TextField.Root type="text" name="manaCost" required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="artworkUrl">
        <Form.Label htmlFor="artworkUrl">Artwork URL</Form.Label>
        <Form.Control asChild>
          <TextField.Root type="text" name="artworkUrl" required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="type">
        <Form.Label htmlFor="type">Type</Form.Label>
        <Form.Control asChild>
          <TextField.Root type="text" name="type" required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="rarity">
        <Form.Label htmlFor="rarity">Rarity</Form.Label>
        <Form.Control asChild>
          <Select.Root
            defaultValue="common"
            name="rarity"
            required
            onValueChange={(value) => debouncedInputChange("rarity", value)}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="common">Common</Select.Item>
              <Select.Item value="uncommon">Uncommon</Select.Item>
              <Select.Item value="rare">Rare</Select.Item>
              <Select.Item value="mythic">Mythic</Select.Item>
            </Select.Content>
          </Select.Root>
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="text">
        <Form.Label htmlFor="text">Text</Form.Label>
        <Form.Control asChild>
          <TextArea name="text" required onChange={handleChange}></TextArea>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <SubmitButton label="Create Card" loading="Creating Card..." />
      </Form.Submit>
    </Form.Root>
  );
}

export default function CardEditPage() {
  const [card, setCard] = useState({
    name: "",
    manaCost: "",
    type: "",
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
