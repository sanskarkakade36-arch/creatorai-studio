"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { authService } from "@/services/auth";

export function useAuth() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  /**
   * -----------------------------
   * Load Session
   * -----------------------------
   */

  const loadUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();

      const currentSession = await authService.getSession();

      setUser(currentUser);

      setSession(currentSession);
    } catch (error) {
      console.error(error);

      setUser(null);

      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * -----------------------------
   * Logout
   * -----------------------------
   */

  const logout = async () => {
    await authService.logout();

    router.replace("/login");

    router.refresh();
  };

  /**
   * -----------------------------
   * Refresh User
   * -----------------------------
   */

  const refresh = async () => {
    await loadUser();
  };

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        setUser(session?.user ?? null);

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
  user,
  session,
  loading,
  logout,
  refresh,
  isAuthenticated: !!session,
};
}