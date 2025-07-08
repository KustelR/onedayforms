import { FormItem, SerializedForm } from "@/lib/getForm";
import { TextInput } from "./TextInput";
import CustomTextArea from "./CustomTextArea";
import RadioInput from "./RadioInput";
import { nanoid } from "nanoid";

export default function FormView(props: { form: SerializedForm }) {
  const { form } = props;
  return (
    <div className="p-3 w-3xl bg-white space-y-3 shadow-md">
      <div>
        <h1 className="text-4xl text-center font-sans">{form.name}</h1>
        <p className="px-3 font-merriweather">{form.description}</p>
      </div>
      <form className="space-y-3" action="/" method="post">
        <ul className="space-y-3">
          {form.items.map((item) => {
            return (
              <li key={"id" in item.props ? item.props.id : nanoid()}>
                {getElement(item)}
              </li>
            );
          })}
        </ul>
        <button
          className="bg-blue-500 shadow-md font-bold text-white rounded-xl text-2xl px-8 py-0.5 cursor-pointer hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function getElement(item: FormItem): React.JSX.Element {
  switch (item.type) {
    case "text":
      return <TextInput {...item.props} />;
    case "textarea":
      return <CustomTextArea {...item.props} />;
    case "radio":
      return <RadioInput {...item.props} />;
  }
}
