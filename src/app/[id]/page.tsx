import FormView from "@/components/FormView";
import getForm from "@/lib/getForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const form = await getForm(id);
  return (
    <div className="w-full h-screen flex justify-center bg-background text-foreground">
      <FormView form={form} />
    </div>
  );
}
