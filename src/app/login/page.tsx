"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("kidName");

    if (name) {
      router.push("/");
    }
  }, [router]);

 const handleStart = async () => {

  if (!name) return;

  try {

    // const response = await fetch("/api/login", {
    //   method: "POST",

    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify({
    //     name,
    //   }),
    // });

    // const data = await response.json();

    // console.log(data);

    localStorage.setItem("kidName", name);

    router.push("/");

  } catch (error) {

    console.log(error);

  }
};

  return (
    <main className="min-h-screen bg-yellow-200 flex items-center justify-center px-5">

      <div className="bg-white w-full max-w-xl rounded-[40px] p-10 shadow-2xl text-center">

        <div className="text-7xl">
          🐻
        </div>

        <h1 className="text-5xl font-extrabold text-pink-600 mt-5">
          FunLearn
        </h1>

        <p className="mt-4 text-2xl text-gray-600">
          What is your name? 😍
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-8 px-6 py-5 rounded-full border-4 border-pink-300 outline-none text-2xl"
        />

        <button
          onClick={handleStart}
          className="mt-8 bg-pink-500 hover:bg-pink-600 text-white text-2xl px-10 py-5 rounded-full w-full"
        >
          Start Playing 🚀
        </button>

      </div>
    </main>
  );
}