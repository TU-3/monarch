import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { useSession } from "@/context/AuthContext";

function ForgotPassword() {
  const session = useSession();
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
}

export default ForgotPassword;
