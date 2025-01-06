"use client";

import { trpc } from "@/lib/trpc/client";

export function ExampleComponent() {
  const { data, isLoading, error } = trpc.example.hello.useQuery(
    "Test",
  );

  return (
    <div>
      <h1>Example Component</h1>
      <p>
        <span>isLoading: {isLoading ? "true" : "false"}</span>
        <span>error: {error?.message}</span>
        <span>data: {JSON.stringify(data)}</span>
      </p>
    </div>
  );
}
