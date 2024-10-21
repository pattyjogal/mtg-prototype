import { FormState } from "@/app/actions";
import * as Form from "@radix-ui/react-form";
import { Flex, Select, Spinner, TextArea, TextField } from "@radix-ui/themes";
import { debounce } from "lodash";
import SubmitButton from "./SubmitButton";
import CardTypeMultiselect from "./CardTypeMultiselect";
import { CardType } from "@prisma/client";

interface CardEditFormProps {
  onInputChange(name: string, value: string | string[]): void;
  card: FormState;
  action: (payload: FormData) => void;
  submitText: string;
}

function CardEditForm({ onInputChange, card, action, submitText }: CardEditFormProps) {
  const debouncedInputChange = debounce((name: string, value: string | string[]) => {
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
          <TextField.Root type="text" name="name" defaultValue={card.name} required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="manaCost">
        <Form.Label htmlFor="manaCost">Mana Cost</Form.Label>
        <Form.Control asChild>
          <TextField.Root type="text" name="manaCost" defaultValue={card.manaCost} required onChange={handleChange} />
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
      <Form.Field className="grid mb-3" name="supertype">
        <Form.Label htmlFor="supertype">Supertype</Form.Label>
        <Form.Control asChild>
          <TextField.Root type="text" name="supertype" defaultValue={card.supertype || ""} onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="type">
        <Form.Label htmlFor="type">Type</Form.Label>
        <Form.Control asChild>
          <CardTypeMultiselect
            name="type"
            value={card.type}
            onChange={(vals) => {
              onInputChange("type", vals);
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="subtype">
        <Form.Label htmlFor="subtype">Subtype</Form.Label>
        <Form.Control asChild>
          <TextField.Root type="text" name="subtype" defaultValue={card.subtype || ""} onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="rarity">
        <Form.Label htmlFor="rarity">Rarity</Form.Label>
        <Form.Control asChild>
          <Select.Root
            defaultValue="common"
            name="rarity"
            required
            value={card.rarity}
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
          <TextArea name="text" required defaultValue={card.text} onChange={handleChange}></TextArea>
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="flavor">
        <Form.Label htmlFor="flavor">Flavor</Form.Label>
        <Form.Control asChild>
          <TextArea name="flavor" defaultValue={card.flavor || ""} onChange={handleChange}></TextArea>
        </Form.Control>
      </Form.Field>
      {card.type.includes(CardType.CREATURE) && (
        <Flex className="mb-3">
          <Form.Field name="power">
            <Form.Label htmlFor="power">Power</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                type="number"
                name="power"
                required
                defaultValue={card.power || ""}
                onChange={handleChange}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="toughness">
            <Form.Label htmlFor="toughness">Toughness</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                type="number"
                name="toughness"
                required
                defaultValue={card.toughness || ""}
                onChange={handleChange}
              />
            </Form.Control>
          </Form.Field>
        </Flex>
      )}
      <Form.Submit asChild>
        <SubmitButton label={submitText} loading={<Spinner />} />
      </Form.Submit>
    </Form.Root>
  );
}
export default CardEditForm;
