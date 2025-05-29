import { ForgotPasswordForm } from "@/components/authentication/forgot-password-form";

function ForgotPassword() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ForgotPasswordForm className="sm:w-96" />
    </div>
  );
}

export default ForgotPassword;
