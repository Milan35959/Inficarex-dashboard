import { LoginForm } from "@/components/loginForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-md">
     
      <LoginForm />
    </div>
  </div>
  );
}
