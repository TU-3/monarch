import { LoginForm } from "@/components/authentication/login-form";

function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoginForm className="sm:w-96" />
    </div >
  );
}

export default Login;
