import { Suspense } from "react";
import SignUpComponent from "@/Components/SignUp/SignUpComponent";

function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpComponent />
    </Suspense>
  );
}

export default SignUp;