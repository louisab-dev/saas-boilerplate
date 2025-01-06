"use client";

// This is needed as a workaround: https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
import * as core from "next-international";
import { createI18nClient } from "next-international/client";

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import("./en"),
  fr: () => import("./fr"),
});
