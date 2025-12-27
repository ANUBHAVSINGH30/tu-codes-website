"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new sign in page
    router.replace("/signin");
  }, [router]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to sign in...</p>
      </div>
    </div>
  );
}

export default LoginPage
