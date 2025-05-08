import { useSession } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function AuthenticatedRoute({ children }: Props) {
  const { session } = useSession();

  if (!session) {
    console.log("User is not authenticated, redirecting to login.");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
