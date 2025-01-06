"use client";

import { useToast } from "./use-toast";
import { supabase } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const { toast } = useToast();
  const router = useRouter();

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "You have successfully signed up",
        variant: "success",
      });
      router.push("/signin");
    }
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

  const getUser = async (): Promise<User | null> => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } else {
      return data.user;
    }
  };

  const requestPasswordResetWithEmail = async (
    email: string,
  ): Promise<boolean> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/api/auth/password-callback`,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } else {
      toast({
        title: "Success",
        description: "Password reset email sent",
        variant: "success",
      });
      return true;
    }
  };

  const changePasswordWithEmail = async (
    password: string,
  ): Promise<boolean> => {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } else {
      toast({
        title: "Success",
        description: "Password changed",
        variant: "success",
      });
      return true;
    }
  };

  return {
    signUpWithEmail,
    signOut,
    signInWithEmail,
    getUser,
    requestPasswordResetWithEmail,
    changePasswordWithEmail,
  };
};
