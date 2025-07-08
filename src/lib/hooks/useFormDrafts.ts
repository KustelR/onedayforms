"use client";

import { useEffect } from "react";
import { SerializedForm } from "../getForm";

export default function useFormDrafts() {
  const drafts: Record<string, SerializedForm> = {};
  const delayed: Array<() => void> = [];
  let isDraftLoaded: boolean = false;
  useEffect(() => {
    const storedDrafts = localStorage.getItem("drafts");
    if (storedDrafts) {
      Object.assign(drafts, JSON.parse(storedDrafts));
    }
    isDraftLoaded = true;
    delayed.forEach((fn) => fn());
  }, []);
  return {
    getDraft: (id: string) => {
      return new Promise<SerializedForm | null>((resolve) => {
        if (!isDraftLoaded) {
          delayed.push(() => resolve(drafts[id] || null));
        } else {
          resolve(drafts[id] || null);
        }
      });
    },
    saveDraft: (id: string, form: SerializedForm) => {
      return new Promise<void>((resolve) => {
        drafts[id] = form;
        localStorage.setItem("drafts", JSON.stringify(drafts));
        resolve();
      });
    },
  };
}
