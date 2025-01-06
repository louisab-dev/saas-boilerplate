import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { useToast } from "./use-toast";
import { supabase } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUpWithEmail = async (email: string, password: string) => {
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
    setLoading(true);
    await signup.mutateAsync({ email, password });
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      router.push("/");
    }
  };

  return {
    loading,
    signUpWithEmail,
    signOut,
    signInWithEmail,
  };
};
