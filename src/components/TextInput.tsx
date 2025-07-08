export interface TextInputProps {
  id: string;
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput(props: TextInputProps) {
  const { id, label, name, onChange } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className="block w-full bg-neutral-300"
        type="text"
        id={id}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
