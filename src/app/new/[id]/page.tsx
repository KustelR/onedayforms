"use client";

import CustomTextArea from "@/components/CustomTextArea";
import RadioInput, { RadioOption } from "@/components/RadioInput";
import { TextInput } from "@/components/TextInput";
import { FormItem, FormItemType, SerializedForm } from "@/lib/getForm";
import useFormDrafts from "@/lib/hooks/useFormDrafts";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState<SerializedForm>({
    name: "new form",
    description: "new form description",
    items: [],
  });
  const drafts = useFormDrafts();
  const params = useParams();
  return (
    <div className="w-full h-screen flex justify-center bg-background text-foreground">
      <div className="p-3 w-3xl bg-white space-y-3 shadow-md overflow-y-scroll">
        <div className="space-y-3">
          <input
            type="text"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="text-4xl w-full bg-neutral-300 text-center font-sans"
            defaultValue={form.name}
          />
          <textarea
            className="px-3 bg-neutral-300 w-full font-merriweather h-32"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            defaultValue={form.description}
          />
        </div>
        <div className="space-y-3">
          <ul className="space-y-3">
            {form.items.map((item) => {
              return (
                <li key={"id" in item.props ? item.props.id : nanoid()}>
                  {getElement(item)}
                </li>
              );
            })}
            <li>
              <ItemAdder
                onAdd={(item) =>
                  setForm({ ...form, items: [...form.items, item] })
                }
              />
            </li>
          </ul>
          <div className="flex space-x-3 items-center">
            <button
              className="bg-blue-500 shadow-md font-bold text-white rounded-xl text-2xl px-8 py-0.5 cursor-pointer hover:bg-blue-600"
              type="submit"
              onClick={() => {
                console.log("Form submitted:", form);
              }}
            >
              Post
            </button>
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                const id = params["id"] as string;
                drafts.saveDraft(id, form);
                window.open(`/preview/${id}`);
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
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

function ItemAdder(props: { onAdd: (item: FormItem) => void }) {
  const [type, setType] = useState<FormItemType>("text");
  const [options, setOptions] = useState<RadioOption[]>([]);
  return (
    <form
      className="my-4 space-y-3 bg-neutral-200 rounded-md p-3"
      onSubmit={(e) => {
        e.preventDefault();
        switch (type) {
          case "text":
          case "textarea":
            {
              props.onAdd({
                type: type,
                props: {
                  id: nanoid(),
                  name: (e.currentTarget as HTMLFormElement).new_name.value,
                  label: (e.currentTarget as HTMLFormElement).new_label.value,
                },
              });
            }
            break;
          case "radio": {
            props.onAdd({
              type: type,
              props: {
                name: (e.currentTarget as HTMLFormElement).new_name.value,
                label: (e.currentTarget as HTMLFormElement).new_label.value,
                options: options,
              },
            });
          }
        }
      }}
    >
      <h2 className="font-bold">Add New Item</h2>
      <div>
        <label className="mr-1" htmlFor="new_type">
          Type
        </label>
        <select
          className="bg-neutral-300 p-1"
          name="Type"
          id="new_type"
          value={type}
          onChange={(e) => setType(e.target.value as FormItemType)}
        >
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="radio">Radio</option>
        </select>
      </div>
      <TextInput id="new_label" name="new_label" label="Label" />
      <TextInput id="new_name" name="new_name" label="Name" />
      {type === "radio" && (
        <RadioOptionsEditor
          options={options}
          onDelte={(id) => {
            setOptions(options.filter((option) => option.id !== id));
          }}
          onAdd={(option) => {
            console.log(options);
            setOptions([...options, option]);
          }}
        />
      )}
      <button
        type="submit"
        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold rounded-md px-3 py-1"
      >
        Add new
      </button>
    </form>
  );
}

function RadioOptionsEditor(props: {
  options: RadioOption[];
  onAdd: (option: RadioOption) => void;
  onDelte: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-bold">Radio Options</h3>
      <table className="table-auto w-full  border border-neutral-400">
        <thead>
          <tr className="border-spacing-0.5 *:pl-1 border border-neutral-400">
            <th>Label</th>
            <th>Value</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody className="">
          {props.options.map((option) => {
            return (
              <tr
                className="cursor-pointer hover:bg-red-200 *:pl-1"
                key={option.id}
                onClick={() => props.onDelte(option.id)}
              >
                <td>{option.label}</td>
                <td>{option.value}</td>
                <td>{option.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <RadioOptionAdder onAdd={props.onAdd} />
    </div>
  );
}

function RadioOptionAdder(props: { onAdd: (option: RadioOption) => void }) {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  return (
    <fieldset className="space-y-3 bg-black/5 p-2 rounded-md">
      <h4 className="font-bold">Option Editor</h4>
      <TextInput
        id="new_option_label"
        name="new_option_label"
        label="Label"
        onChange={(e) => setLabel(e.target.value)}
      />
      <TextInput
        id="new_option_value"
        name="new_option_value"
        label="Value"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="bg-neutral-500 cursor-pointer hover:bg-neutral-600 text-white font-bold rounded-md px-2 py-1"
        onClick={(e) => {
          e.preventDefault();
          props.onAdd({ id: nanoid(), label, value });
        }}
      >
        Add option
      </button>
    </fieldset>
  );
}
