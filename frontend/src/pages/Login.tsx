import { LoginForm } from "@/components/login-form";
import { useSession } from "@/context/AuthContext";

function Login() {
  const session = useSession();
  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
