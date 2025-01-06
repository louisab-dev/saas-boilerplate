import { serverClient } from "@/lib/trpc/server";

export async function ServerExampleComponent() {
  const data = await serverClient.example.hello("Test");
  return (
    <div>
      <h1>Example Server Component</h1>
      <p>
        <span>data: {JSON.stringify(data)}</span>
      </p>
    </div>
  );
}
