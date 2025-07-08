"use client";

import FormView from "@/components/FormView";
import { SerializedForm } from "@/lib/getForm";
import useFormDrafts from "@/lib/hooks/useFormDrafts";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState<SerializedForm | null>(null);
  const params = useParams();
  const drafts = useFormDrafts();
  const id = params["id"];
  drafts.getDraft(typeof id === "string" ? id : "null").then((draft) => {
    if (draft) setForm(draft);
  });
  return (
    <div className="w-full h-screen flex justify-center bg-background text-foreground">
      {form && <FormView form={form} />}
      {!form && (
        <div className="p-3 w-3xl bg-white space-y-3 shadow-md">
          <h1 className="text-4xl text-center font-sans">Form not found</h1>
          <p className="text-center">
            The form you are looking for does not exist.
          </p>
        </div>
      )}
    </div>
  );
}
