"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your session...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          setStatus("Success! Redirecting you...");
        } else {
          setStatus("No verification code found. Redirecting...");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setStatus("Authentication failed. Redirecting...");
      } finally {
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-radial from-[#1e3a2f] to-[#0d1f18] text-white p-4">
      <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl max-w-md w-full text-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl pointer-events-none" />
        <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mb-6" />
        <h2 className="text-2xl font-semibold tracking-wide mb-2 text-emerald-100">Faith Journey</h2>
        <p className="text-sm text-emerald-200/70">{status}</p>
      </div>
    </div>
  );
}
