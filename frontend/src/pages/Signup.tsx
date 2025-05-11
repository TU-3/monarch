import { SignUpForm } from "@/components/authentication/sign-up-form";

function Signup() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignUpForm className="sm:w-96" />
    </div>
  );
}

export default Signup;
