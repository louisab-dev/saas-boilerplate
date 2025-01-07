import { ExampleComponent } from "@/components/example-component";
import { ServerExampleComponent } from "@/components/server-example-component";
import { UserExampleComponent } from "@/components/user-example-component";

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <ExampleComponent />
      <ServerExampleComponent />
      <UserExampleComponent />
    </div>
  );
}
