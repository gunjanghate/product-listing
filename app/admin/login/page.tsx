"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("admin-auth", "true");
      toast.success("Welcome Admin");
      router.push("/admin");
    } else {
      toast.error("Invalid password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-md w-96">
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
        <input
          type="password"
          className="border p-2 rounded-md w-full mb-4"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}
