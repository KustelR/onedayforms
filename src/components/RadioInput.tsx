export interface RadioInputProps {
  name: string;
  legend: string;
  options: RadioOption[];
}

export interface RadioOption {
  id: string;
  label: string;
  value: string;
}

export default function RadioInput(props: RadioInputProps) {
  const { name, options, legend } = props;
  return (
    <fieldset className="space-x-2">
      <legend>{legend}</legend>
      {options.map((option) => (
        <span className="space-x-2" key={option.id}>
          <input type="radio" name={name} id={option.id} value={option.value} />
          <label htmlFor={option.id}>{option.label}</label>
        </span>
      ))}
    </fieldset>
  );
}
