export interface CustomTextAreaProps {
  id: string;
  name: string;
  label: string;
}

export default function CustomTextArea(props: CustomTextAreaProps) {
  const { id, name, label } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        name={name}
        className="block w-full bg-neutral-200 h-32"
        id={id}
      />
    </div>
  );
}
