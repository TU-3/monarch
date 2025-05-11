import { UpdatePasswordForm } from "@/components/authentication/update-password-form";

function UpdatePassword() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <UpdatePasswordForm className="sm:w-96" />
    </div>
  );
}

export default UpdatePassword;
