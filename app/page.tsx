// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // 🔐 In a real app, check auth status here
  const isLoggedIn = false; // Replace with real auth check!

  if (isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return null; // Just in case
}
