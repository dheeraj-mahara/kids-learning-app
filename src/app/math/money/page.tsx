"use client";

import { useEffect, useState } from "react";

type CoinGame = {
  coins: number[];
  options: number[];
  answer: number;
};

const coinValues = [1, 2, 5, 10, 20]; // you can change to ₹ coins

export default function CoinGame() {
  const [game, setGame] = useState<CoinGame | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("");

  const success = ["🎉 Great!", "🌟 Awesome!", "🎆Super!", "🥳 Nice!"];

  const generateGame = () => {
    const coinCount = Math.floor(Math.random() * 4) + 2; // 2–5 coins

    const coins = Array.from({ length: coinCount }, () => {
      return coinValues[Math.floor(Math.random() * coinValues.length)];
    });

    const answer = coins.reduce((a, b) => a + b, 0);

    const options = new Set<number>();
    options.add(answer);

    while (options.size < 3) {
      const fake =
        answer + (Math.floor(Math.random() * 10) - 5); // near values
      if (fake > 0) options.add(fake);
    }

    setGame({
      coins,
      answer,
      options: Array.from(options).sort(() => Math.random() - 0.5),
    });
  };

  useEffect(() => {
    generateGame();
  }, []);

  const checkAnswer = (opt: number) => {
    if (!game) return;

    if (opt === game.answer) {
      setScore((s) => {
        const newScore = s + 1;
        if (newScore % 5 === 0) setLevel((l) => l + 1);
        return newScore;
      });

      setMessage(success[Math.floor(Math.random() * success.length)]);

      setTimeout(() => {
        setMessage("");
        generateGame();
      }, 1000);
    } else {
      setMessage("❌ Try Again!");
      setTimeout(() => setMessage(""), 800);
    }
  };

  if (!game) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-4">
      <div className="mx-auto max-w-2xl">

        <h1 className="text-center text-4xl font-extrabold text-green-600">
          🪙 Coin Counting Game
        </h1>

        {/* SCORE */}
        <div className="mt-5 flex justify-center gap-4">
          <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2  shadow border-4 border-yellow-300">
            ⭐ Score: {score}
          </div>
          <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2  shadow border-4 border-pink-300">
            📈 Level: {level}
          </div>
        </div>

        {/* COINS */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {game.coins.map((c, i) => (
            <div
              key={i}
              className="h-20 w-20 flex items-center justify-center rounded-full bg-yellow-300 text-2xl font-bold shadow-lg border-4 border-yellow-500"
            >
              ₹{c}
            </div>
          ))}
        </div>

        {/* QUESTION */}
        <div className="mt-6 text-center text-xl font-bold text-gray-700">
          What is the total value of these coins?
        </div>

        {/* OPTIONS */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {game.options.map((opt) => (
            <button
              key={opt}
              onClick={() => checkAnswer(opt)}
              className="rounded-3xl bg-green-500 p-5 text-2xl font-bold text-white shadow-lg hover:scale-105 active:scale-95"
            >
              ₹{opt}
            </button>
          ))}
        </div>

      
         {message && (
        <div
          className={`
            absolute
            left-1/2
            -translate-x-1/2
            top-[58%]
            text-4xl
            font-black
            animate-bounce
            text-green-500
            ${message !== "❌ Try Again!" ? "text-green-500" : "text-red-500"}
          `}
        >
          {message}
        </div>
      )}


        <div className="mt-6 text-center text-lg font-bold text-gray-700">
          🧠 Learn Money Counting Easily!
        </div>
      </div>
    </div>
  );
}