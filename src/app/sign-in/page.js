import { Suspense } from "react";
import SignInComponent from "@/Components/SignIn/SignInComponent";

function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInComponent />
    </Suspense>
  );
}

export default SignIn;