"use client";

import { SignIn, useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <SignIn />;
  }

  return <div>Welcome!</div>;
}
