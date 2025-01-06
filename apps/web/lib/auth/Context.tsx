// THIS IS NOT CURRENTLY USED, @supabase/ssr IS USED INSTEAD OF THIS CLIENT-SIDE APPROACH.

import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/auth/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  signOut: async () => {},
  signIn: async (email: string, password: string) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (error) {}
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
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
      }
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        toast({
          title: "Error",
          description: sessionError.message,
          variant: "destructive",
        });
      }

      const { session } = data;

      if (!session) {
        toast({
          title: "Error",
          description: "Could not sign in",
          variant: "destructive",
        });
      }
      setSession(session);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const value = useMemo(
    () => ({ session, isLoading, signOut, signIn }),
    [session, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
