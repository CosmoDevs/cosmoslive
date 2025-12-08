"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EventForm from "./component/event-form";
import Events from "./events/page";

export default function EventsPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        console.log("User not logged in → redirecting to /about");
        router.replace("/about");
      } else {
        console.log("User is logged in → showing EventForm");
      }
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!userId) return null;

  return <Events />;
}
