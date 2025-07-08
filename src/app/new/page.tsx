import { nanoid } from "nanoid";
import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  redirect(`/new/${nanoid()}`, RedirectType.replace);
}
