import { SignUpForm } from "@/components/sign-up-form";
import { useSession } from "@/context/AuthContext";

function Signup() {
  const session = useSession();
  return (
    <>
      <SignUpForm />
    </>
  );
}

export default Signup;
