// src/pages/AuthPopup.jsx

import React, { useEffect } from "react";
import { signInWithRedirect, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function AuthPopUp() {
  useEffect(() => {
    const signIn = async () => {
      try {
        await signInWithRedirect(auth, provider);
      } catch (error) {
        console.error("Redirect failed, trying popup...");
        try {
          const result = await signInWithPopup(auth, provider);
          console.log("Signed in with popup:", result.user);
        } catch (popupError) {
          console.error("Popup sign-in failed:", popupError);
        }
      }
    };

    signIn();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2>Signing you in with Google...</h2>
    </div>
  );
}
