import mongoose from "mongoose";

const PropsSchema = {
  name: { type: String, required: true },
  label: { type: String },
  id: { type: String },
  options: [Object],
};

const ItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "textarea", "radio"],
    required: true,
  },
  props: {
    type: PropsSchema,
    required: true,
  },
});

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
});
