import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/client";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = createClient();
    // Listen for auth state changes, if so set the new session and loading state
    const authStateListener = client.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );
    return () => {
        // Cleanup the listener when the component unmounts
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    // Provide the session to the context 
    <AuthContext.Provider value={{ session }}>
      {isLoading ? <div>loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
