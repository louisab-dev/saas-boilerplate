import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { useToast } from "./use-toast";

export const useAuth = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const signup = trpc.auth.signup.useMutation({
    onSuccess: () =>
      toast({
        title: "Success",
        description: "You have successfully signed up",
        variant: "success",
      }),
    onError: (error: any) =>
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      }),
  });

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    await signup.mutateAsync({ email, password });
    setLoading(false);
  };

  return {
    loading,
    signUpWithEmail,
  };
};
