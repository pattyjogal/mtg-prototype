import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface ToggleGroupCheckboxProps {
  name: string;
  onChange: (selectedValues: string[]) => void;
  value?: string[];
}

const ToggleGroupCheckbox: React.FC<ToggleGroupCheckboxProps> = ({ name, onChange, value = [] }) => {
  const handleSelectionChange = (value: string[]) => {
    onChange(value); // Call parent onChange handler to keep the form data updated
  };

  return (
    <ToggleGroup.Root type="multiple" className="ToggleGroup" value={value} onValueChange={handleSelectionChange}>
      <ToggleGroup.Item value="ARTIFACT" className="ToggleGroupItem">
        <i className="ms ms-artifact" />
      </ToggleGroup.Item>

      <ToggleGroup.Item value="CREATURE" className="ToggleGroupItem">
        <i className="ms ms-creature" />
      </ToggleGroup.Item>

      <ToggleGroup.Item value="ENCHANTMENT" className="ToggleGroupItem">
        <i className="ms ms-enchantment" />
      </ToggleGroup.Item>

      <ToggleGroup.Item value="INSTANT" className="ToggleGroupItem">
        <i className="ms ms-instant" />
      </ToggleGroup.Item>

      <ToggleGroup.Item value="SORCERY" className="ToggleGroupItem">
        <i className="ms ms-sorcery" />
      </ToggleGroup.Item>

      <ToggleGroup.Item value="LAND" className="ToggleGroupItem">
        <i className="ms ms-land" />
      </ToggleGroup.Item>

      {/* Hidden inputs for form submission */}
      {value.map((val) => (
        <input key={val} type="hidden" name={name} value={val} />
      ))}
    </ToggleGroup.Root>
  );
};

export default ToggleGroupCheckbox;
