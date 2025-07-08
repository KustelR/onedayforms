import { CustomTextAreaProps } from "@/components/CustomTextArea";
import { RadioInputProps } from "@/components/RadioInput";
import { TextInputProps } from "@/components/TextInput";

export interface SerializedForm {
  name: string;
  description: string;
  items: Array<FormItem>;
}

export type FormItem = FormItemText | FormItemRadio | FormItemTextArea;
export type FormItemType = FormItem["type"];

interface FormItemText {
  type: "text";
  props: TextInputProps;
}

interface FormItemTextArea {
  type: "textarea";
  props: CustomTextAreaProps;
}

interface FormItemRadio {
  type: "radio";
  props: RadioInputProps;
}

export default async function getForm(id: string): Promise<SerializedForm> {
  return {
    name: `Very Important Questions ${id}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pharetra",
    items: [
      {
        type: "text",
        props: {
          id: "Text_INPUT",
          name: "test123",
          label: "What is your favorite color?",
        },
      },
      {
        type: "textarea",
        props: {
          id: "Text_AREA",
          name: "test1234",
          label: "What is your favorite food?",
        },
      },
      {
        type: "radio",
        props: {
          name: "radio_test",
          legend: "What is your favorite animal?",
          options: [
            { id: "cat", label: "Cat", value: "cat" },
            { id: "dog", label: "Dog", value: "dog" },
            { id: "fish", label: "Fish", value: "fish" },
          ],
        },
      },
    ],
  };
}
