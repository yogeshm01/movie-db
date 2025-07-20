import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in user:", user);
      // You can store user in context or redirect etc.
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
