"use client";
import { trpc } from "@/lib/trpc/client";
import { useI18n } from "@/locales/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function UserExampleComponent() {
  const t = useI18n();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data, isLoading, error, refetch } = trpc.user.me.useQuery();
  const updateMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      setIsUpdating(false);
      toast({
        title: t("common.success"),
        description: t("user.successfulUpdate"),
        variant: "success",
      });
      refetch(); // Refresh the data after update
      setName(""); // Clear the input
    },
    onError: (error) => {
      setIsUpdating(false);
      toast({
        title: t("common.error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    updateMutation.mutate({ name });
  };

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
          {/* Name update form */}
          <form onSubmit={handleUpdateName} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder={t("user.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isUpdating}
              />
              <Button type="submit" disabled={isUpdating || !name}>
                {isUpdating
                  ? <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  : null}
                {t("user.updateName")}
              </Button>
            </div>
            {updateMutation.error && (
              <p className="text-sm text-destructive">
                {t("common.error")}: {updateMutation.error.message}
              </p>
            )}
          </form>

          {error
            ? (
              <div className="bg-destructive/15 p-4 text-destructive">
                <p className="text-sm font-medium">
                  {t("common.error")}: {error.message}
                </p>
              </div>
            )
            : (
              <div className="bg-muted p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">
                      {isLoading ? t("common.loading") : t("common.ready")}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">
                        {data?.email || t("common.notAvailable")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium">
                        {data?.name || t("common.notAvailable")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
