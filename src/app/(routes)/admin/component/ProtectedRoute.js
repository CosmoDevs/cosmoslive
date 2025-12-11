"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.replace("/about");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!userId) return null;

  return children;
}
