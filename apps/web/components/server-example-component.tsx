import { serverClient } from "@/lib/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getI18n } from "@/locales/server";

export async function ServerExampleComponent() {
  const data = await serverClient.example.hello("Test");
  const t = await getI18n();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("example.server.title")}</CardTitle>
            <CardDescription>{t("example.server.description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Data</span>
              <span className="font-medium">
                {data ? JSON.stringify(data) : "No data"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
