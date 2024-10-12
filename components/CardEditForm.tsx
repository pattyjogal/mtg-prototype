import { createCard } from "@/app/actions";
import * as Form from "@radix-ui/react-form";
import { Flex, Select, TextArea, TextField } from "@radix-ui/themes";
import { debounce } from "lodash";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import CardTypeMultiselect from "./CardTypeMultiselect";
import { useState } from "react";
import { CardType } from "@prisma/client";

interface CardEditFormProps {
  onInputChange(name: string, value: string): void;
}

function CardEditForm({ onInputChange }: CardEditFormProps) {
  const [, action] = useFormState(createCard, {
    name: "",
    manaCost: "",
    rarity: "common",
    text: "",
    type: [],
  });

  const [typeValues, setTypeValues] = useState<string[]>([]);

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
      <Form.Field className="grid mb-3" name="artwork">
        <Form.Label htmlFor="artwork">Artwork Image</Form.Label>
        <Form.Control asChild>
          <input
            type="file"
            name="artwork"
            accept="image/*"
            required
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  debouncedInputChange("artworkUrl", reader.result as string);
                };
                reader.readAsDataURL(file);
              } else {
                debouncedInputChange("artworkUrl", "");
              }
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="type">
        <Form.Label htmlFor="type">Type</Form.Label>
        <Form.Control asChild>
          <CardTypeMultiselect name="type" value={typeValues} onChange={setTypeValues} />
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
      <Form.Field className="grid mb-3" name="flavor">
        <Form.Label htmlFor="flavor">Flavor</Form.Label>
        <Form.Control asChild>
          <TextArea name="flavor" onChange={handleChange}></TextArea>
        </Form.Control>
      </Form.Field>
      {typeValues.includes(CardType.CREATURE) && (
        <Flex className="mb-3">
          <Form.Field name="power">
            <Form.Label htmlFor="power">Power</Form.Label>
            <Form.Control asChild>
              <TextField.Root type="number" name="power" required onChange={handleChange} />
            </Form.Control>
          </Form.Field>
          <Form.Field name="toughness">
            <Form.Label htmlFor="toughness">Toughness</Form.Label>
            <Form.Control asChild>
              <TextField.Root type="number" name="toughness" required onChange={handleChange} />
            </Form.Control>
          </Form.Field>
        </Flex>
      )}
      <Form.Submit asChild>
        <SubmitButton label="Create Card" loading="Creating Card..." />
      </Form.Submit>
    </Form.Root>
  );
}
export default CardEditForm;
