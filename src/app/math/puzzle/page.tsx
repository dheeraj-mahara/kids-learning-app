"use client";

import { useEffect, useState } from "react";

type Puzzle = {
  question: string;
  answer: number;
  options: number[];
};

export default function MathPuzzleGame() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("");

  const successMessages = [
    "🎉 Correct!",
    "🌟 Great Job!",
    "🚀 Super Smart!",
    "🥳 Well Done!",
  ];

  const generatePuzzle = () => {
    const type = Math.floor(Math.random() * 4);
    const max = level * 10;

    let question = "";
    let answer = 0;

    // 🔢 PATTERN PUZZLE
    if (type === 0) {
      const start = Math.floor(Math.random() * max) + 1;
      question = `Fill the missing number:\n${start}, ${start + 2}, ⬜, ${start + 6}`;
      answer = start + 4;
    }

    // ➕ ADDITION PUZZLE
    if (type === 1) {
      const a = Math.floor(Math.random() * max) + 1;
      const b = Math.floor(Math.random() * max) + 1;
      question = `Solve:\n${a} + ${b} = ⬜`;
      answer = a + b;
    }

    // ➖ SUBTRACTION PUZZLE
    if (type === 2) {
      const a = Math.floor(Math.random() * max) + 5;
      const b = Math.floor(Math.random() * (a - 1)) + 1;
      question = `Solve:\n${a} - ${b} = ⬜`;
      answer = a - b;
    }

    // 🔢 MISSING MIDDLE NUMBER
    if (type === 3) {
      const a = Math.floor(Math.random() * max) + 1;
      question = `Find the missing number:\n${a}, ⬜, ${a + 4}`;
      answer = a + 2;
    }

    // 🎯 OPTIONS (NO DUPLICATES)
    let options = [answer];

    while (options.length < 3) {
      const wrong = answer + Math.floor(Math.random() * 6) - 3;
      if (wrong > 0 && !options.includes(wrong)) {
        options.push(wrong);
      }
    }

    options = options.sort(() => Math.random() - 0.5);

    setPuzzle({ question, answer, options });
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  const checkAnswer = (num: number) => {
    if (!puzzle) return;

    if (num === puzzle.answer) {
      const msg =
        successMessages[Math.floor(Math.random() * successMessages.length)];

      setMessage(msg);
      setScore((s) => s + 1);

      const newScore = score + 1;
      if (newScore % 5 === 0) {
        setLevel((l) => l + 1);
      }

      setTimeout(() => {
        setMessage("");
        generatePuzzle();
      }, 1200);
    } else {
      setMessage("❌ Try Again!");
      setTimeout(() => setMessage(""), 800);
    }
  };

  if (!puzzle) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4">
      <div className="mx-auto max-w-2xl">

        {/* TITLE */}
        <h1 className="text-center text-4xl font-extrabold text-purple-700">
          🧩 Math Puzzle Game
        </h1>

        {/* SCORE + LEVEL */}
        <div className="mt-5 flex justify-center gap-4">
          <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2  shadow border-4 border-yellow-300">
            ⭐ Score: {score}
          </div>

          <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2 shadow border-4 border-blue-300">
            📈 Level: {level}
          </div>
        </div>

        {/* PUZZLE CARD */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-2xl border-4 border-purple-300">

          <p className="whitespace-pre-line text-center text-3xl font-extrabold text-gray-700">
            {puzzle.question}
          </p>

          {/* OPTIONS */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {puzzle.options.map((num) => (
              <button
                key={num}
                onClick={() => checkAnswer(num)}
                className="rounded-3xl bg-purple-500 sm:p-6 p-2 text-4xl font-extrabold text-white shadow-lg transition hover:scale-105 active:scale-95"
              >
                {num}
              </button>
            ))}
          </div>

          {/* MESSAGE */}
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
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center text-lg font-bold text-gray-700">
          🎮 Train Your Brain Daily!
        </div>
      </div>
    </div>
  );
}