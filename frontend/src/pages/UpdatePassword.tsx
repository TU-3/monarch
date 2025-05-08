import { UpdatePasswordForm } from "@/components/update-password-form";
import { useSession } from "@/context/AuthContext";

function UpdatePassword() {
  const session = useSession();
  return (
    <>
      <UpdatePasswordForm />
    </>
  );
}

export default UpdatePassword;
