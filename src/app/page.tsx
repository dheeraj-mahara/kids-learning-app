"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [kidName, setKidName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("kidName");

    if (!name) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const savedName = localStorage.getItem("kidName");

    if (savedName) {
      setKidName(savedName);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-200 to-yellow-100 flex items-center justify-center px-5">

      <div className="bg-white w-full max-w-2xl rounded-[50px] p-12 shadow-2xl text-center">

        {/* Emoji */}
        <div className="text-8xl animate-bounce">
          🧒
        </div>

        {/* Title */}
        <h1 className="text-6xl font-extrabold text-pink-600 mt-8">
          Hii {kidName} 😍
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-gray-600 mt-6 leading-relaxed">
          Welcome to FunLearn 🎈
          <br />
          Let’s play and learn together ✨
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/activities")}
          className="mt-12 bg-pink-500 hover:bg-pink-600 transition text-white text-3xl font-bold px-12 py-5 rounded-full shadow-xl"
        >
          Let’s Start 🚀
        </button>

      </div>
    </main>
  );
}