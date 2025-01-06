import { createBrowserClient } from "@supabase/ssr";

import { env } from "next-runtime-env"; // This is a workaround that makes all the env variables prefixed with NEXT_PUBLIC to be accessible from the browser. I'd like to get rid of this dependency by following the correct way to load a public env var like the API_URL but I could not find it in the docs. This is worth looking into: https://github.com/vercel/next.js/discussions/17641#discussioncomment-11461646

export const supabase = createBrowserClient(
  env("NEXT_PUBLIC_SUPABASE_URL") || "",
  env("NEXT_PUBLIC_SUPABASE_ANON_KEY") || "",
);
