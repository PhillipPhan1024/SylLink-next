"use client";
import React, { ReactNode, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          if (session) {
            const { user } = session;
            const { email, id, user_metadata } = user;

            const { data, error } = await supabase
              .from("profiles")
              .upsert({
                id,
                full_name: user_metadata?.full_name || "",
                email: email || "",
                provider_token: session.provider_token || null,
                provider_refresh_token: session.provider_refresh_token || null,
              })
              .select()
              .single();

            if (error) {
              console.error("Error inserting/updating profile:", error);
            } else {
              console.log("Profile updated/inserted:", data);
            }
          }
        } else if (event === "SIGNED_OUT") {
          // Optionally, you might want to handle user sign-out logic
          // For example, cleaning up local storage or updating the state
          const { error } = await supabase.auth.signOut();
          console.log("Signed out");
        } else if (event === "TOKEN_REFRESHED") {
          console.log("REFRESH TOKEN \n\n\n\n\n\n\n\n\n\n\n\n");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return children;
};

export default AuthProvider;
