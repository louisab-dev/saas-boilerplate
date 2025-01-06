"use client";
import { trpc } from "@/lib/trpc/client";
import { useI18n } from "@/locales/client";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ExampleComponent() {
  const t = useI18n();
  const { data, isLoading, error, refetch } = trpc.example.hello.useQuery(
    "Test",
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("example.client.title")}</CardTitle>
            <CardDescription>{t("example.client.description")}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {isLoading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <RefreshCcw className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error
            ? (
              <div className="bg-destructive/15 p-4 text-destructive">
                <p className="text-sm font-medium">Error: {error.message}</p>
              </div>
            )
            : (
              <div className="bg-muted p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">
                      {isLoading ? "Loading..." : "Ready"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Data</span>
                    <span className="font-medium">
                      {data ? JSON.stringify(data) : "No data"}
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
