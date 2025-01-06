import { supabase } from "@/lib/auth/client";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const getUser = async (): Promise<User | null> => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return null;
    } else {
      return data.user;
    }
  };

  return {
    getUser,
  };
};
