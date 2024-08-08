"use client";
import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import zxcvbn from "zxcvbn";
import { useRouter } from "next/navigation";

type PasswordStrength = "Very Weak" | "Weak" | "Fair" | "Good" | "Strong";

const PasswordReset: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("Very Weak");
  const [strengthBarWidth, setStrengthBarWidth] = useState<string>("0%");
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    const result = zxcvbn(password);
    const score = result.score;
    const meetsRequirements = validatePassword(password);

    if (meetsRequirements) {
      setPasswordStrength("Good");
      setStrengthBarWidth("80%");
    } else {
      const strength =
        score === 0
          ? "Very Weak"
          : score === 1
            ? "Weak"
            : score === 2
              ? "Fair"
              : score === 3
                ? "Good"
                : "Strong";
      setPasswordStrength(strength);
      setStrengthBarWidth(
        score === 0
          ? "20%"
          : score === 1
            ? "40%"
            : score === 2
              ? "60%"
              : score === 3
                ? "80%"
                : "100%"
      );
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include one number, one special character, and one capital letter."
      );
      return;
    }
    // Add logic to handle password reset
    setError("");
    setShowNotification(true);
    setTimeout(() => {
      router.push("/signin");
    }, 2000);
  };

  const strengthColors: Record<PasswordStrength, string> = {
    "Very Weak": "bg-red-500",
    Weak: "bg-orange-500",
    Fair: "bg-yellow-500",
    Good: "bg-blue-500",
    Strong: "bg-green-500",
  };

  const strengthTextColors: Record<PasswordStrength, string> = {
    "Very Weak": "text-red-500",
    Weak: "text-orange-500",
    Fair: "text-yellow-500",
    Good: "text-blue-500",
    Strong: "text-green-500",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkgray p-4">
      <div className="w-full max-w-lg rounded-lg border-none shadow-sm bg-lightgray text-white">
        <div className="flex flex-col space-y-1.5 p-6 items-center">
          <img src="/Main-logo.png" alt="AIgrind" className="h-12 w-14 mb-4" />
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Password Reset
          </h3>
          <p className="text-sm">Change your password</p>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="relative grid gap-3">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="new-password"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  className="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md pr-10"
                  id="new-password"
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    borderColor: "gray",
                  }}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                >
                  {newPasswordVisible ? (
                    <EyeOff size={20} className="text-darkgray" />
                  ) : (
                    <Eye size={20} className="text-darkgray" />
                  )}
                </span>
              </div>
              <div className="mt-2">
                <p
                  className={`text-sm ${strengthTextColors[passwordStrength]}`}
                >
                  Strength:{" "}
                  <span
                    className={`font-semibold ${strengthTextColors[passwordStrength]}`}
                  >
                    {passwordStrength}
                  </span>
                </p>
                <div className="w-full bg-gray-200 rounded-full mt-1">
                  <div
                    className={`h-2 rounded-full ${strengthColors[passwordStrength]}`}
                    style={{ width: strengthBarWidth }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="relative grid gap-3">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                  id="confirm-password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    borderColor: "gray",
                  }}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <EyeOff size={20} className="text-darkgray" />
                  ) : (
                    <Eye size={20} className="text-darkgray" />
                  )}
                </span>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-darkgray text-white py-2 px-4 rounded-md hover:bg-mediumgray focus:outline-none focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
        {showNotification && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>{" "}
            {/* Overlay */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="bg-green-500 text-white rounded-lg shadow-lg flex items-center p-4 opacity-0 transition-opacity duration-300 ease-in-out"
                style={{ opacity: showNotification ? 1 : 0 }}
              >
                <CheckCircle size={24} className="mr-2" />
                <span>Password successfully changed!</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
