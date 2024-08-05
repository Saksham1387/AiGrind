"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import Image from "next/image";
import { Eye, EyeOff, X } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import Link from "next/link";

const SigninPage = () => {
  const router = useRouter();
  const email = useRef("");
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleCloseDialog = () => {
    setIsForgotPasswordOpen(false);
  };

  const handleProviderLogin = async (provider: string) => {
    if (provider === "google") {
      const result = await signIn("google", { redirect: false });
      if (result?.ok) {
        router.push("/dashboard");
      } else if (result?.error) {
        console.error(result.error);
      } else {
        console.error("Sign-in function returned undefined.");
      }
    } else if (provider === "github") {
      const result = await signIn("github", { redirect: false });
      if (result?.ok) {
        router.push("/");
      } else if (result?.error) {
        console.error(result.error);
      } else {
        console.error("Sign-in function returned undefined.");
      }
    } else {
      console.error("Invalid provider");
    }
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const result: SignInResponse | undefined = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
    });
    if (result?.ok) {
      // Manually redirect
      router.push("/dashboard");
    } else if (result?.error) {
      console.error(result.error);
    } else {
      console.error("Sign-in function returned undefined.");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-lightgray text-white">
        <div className="hidden lg:block relative">
          <video
            src="/SignupVid.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="text-center">
              <h1 className="text-slate-300 text-2xl mb-3">Welcome to</h1>
              <h1 className="text-white text-6xl">AiGrind Community</h1>
              <h1 className="text-white text-md mt-4">
                Join a growing community of AI enthusiasts.
              </h1>
              <button
                onClick={() => router.push("/")}
                className="font-light text-green-300 text-xs hover:underline"
              >
                Know more{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-12 px-6 lg:py-0">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <Image
                src="/Main-logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain mx-auto"
              />
            </div>
            <div className="text-center space-y-2 mb-5">
              <h1 className="text-3xl font-bold">Welcome Back!</h1>
              <p className="text-3xl font-bold">Login to your account</p>
              <p className="text-sm text-muted-foreground font-light">
                Welcome! Where data and code ignite innovation.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => {
                    email.current = e.target.value;
                  }}
                  className="text-black"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password"> Password</Label>
                  <button
                    onClick={handleForgotPasswordClick}
                    className="inline-block text-sm underline"
                  >
                    Forgot your password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={passwordValue}
                    onChange={(e) => {
                      setPasswordValue(e.target.value);
                      password.current = e.target.value;
                    }}
                    className="pr-10 text-black"
                  />
                  {passwordValue && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="text-black" size={20} />
                      ) : (
                        <Eye className="text-black" size={20} />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-300"
              >
                Login
              </Button>
              <div className="flex  flex-col gap-y-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center text-black"
                  onClick={() => {
                    handleProviderLogin("google");
                  }}
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Login with Google</span>
                </Button>
                {/* <Button
                  variant="outline"
                  className="w-full flex items-center justify-center text-black"
                  onClick={() => {
                    handleProviderLogin("github");
                  }}
                >
                  <div className="bg-white p-1 rounded-full">
                    <svg className="w-6" viewBox="0 0 32 32">
                      <path
                        fillRule="evenodd"
                        d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Login with GitHub</span>
                </Button> */}
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                className="underline"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      {isForgotPasswordOpen && <ForgotPassword onClose={handleCloseDialog} />}
    </>
  );
};

export default SigninPage;

function ForgotPassword({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-darkgray bg-opacity-75">
      <div
        ref={dialogRef}
        className="bg-darkgray p-10 flex flex-col text-white text-center rounded-lg shadow-lg relative"
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          <X></X>
        </button>
        <h1 className="">FORGOT PASSWORD</h1>
        <p className="mb-3 text-gray-500">Enter your registered email below</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="border border-gray-300 rounded-lg p-2 text-black mb-2"
          />
          <Button
            type="submit"
            className="bg-lightgray hover:bg-lightgray text-white mt-3"
          >
            Send reset link
          </Button>
        </form>
        {message && <p className="mt-2 text-green-800">{message}</p>}
      </div>
    </div>
  );
}
