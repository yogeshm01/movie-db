// In Login.jsx

export default function Login() {
  const handleGoogleSignIn = () => {
    const authWindow = window.open("/auth-popup", "_blank", "width=500,height=600");
    if (!authWindow) {
      alert("Popup blocked! Please allow popups for this site.");
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
