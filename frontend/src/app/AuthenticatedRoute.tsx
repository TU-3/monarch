"use client";

import { useSession } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AuthenticatedRoute({ children }: Props) {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      console.log("User is not authenticated, redirecting to login.");
      router.push("/auth/login");
    }
  }, [session, router]);

  if (!session) {
    // Optionally show a loading state while redirecting
    return null;
  }

  return <>{children}</>;
}