import React from "react";
import { signInWithRedirect, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Google sign-in (redirect) error:", error);

      try {
        const result = await signInWithPopup(auth, provider);
        console.log("Signed in with popup, user:", result.user);
      } catch (popupError) {
        console.error("Google sign-in (popup) error:", popupError);
      }
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
