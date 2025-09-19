export default function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Signed in with popup:", result.user);
      return;
    } catch (popupErr) {
      console.warn("Popup sign-in failed or blocked, falling back to redirect:", popupErr);
    }

    try {
      await signInWithRedirect(auth, provider);
    } catch (redirectErr) {
      console.error("Redirect sign-in failed:", redirectErr);
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
