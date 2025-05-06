import { useEffect } from "react";
import { createClient } from "@/lib/client";

export default function AuthenticatedRoute() {
  useEffect(() => {
    const checkAuth = async () => {
      const client = createClient();
      const { error } = await client.auth.getUser();

      if (error) {
        location.href = "/login";
      }
    };
    checkAuth();
  }, []);

  return <div>Authenticated page</div>;
}
