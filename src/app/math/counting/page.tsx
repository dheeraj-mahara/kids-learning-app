"use client";

import { useEffect, useState } from "react";

type Question = {
  question: string;
  answer: number;
  options: number[];
};

export default function KidsMathGame() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const successMessages = [
    "🎉 Amazing!",
    "🌟 Great Job!",
    "🚀 Super Smart!",
    "🥳 Awesome!",
  ];

  const generateQuestion = () => {
    const type = Math.floor(Math.random() * 5);

    let question = "";
    let answer = 0;

    const max = level * 10;

    // BEFORE NUMBER
    if (type === 0) {
      const num = Math.floor(Math.random() * max) + 2;
      question = `What comes BEFORE?\n⬜ ${num}`;
      answer = num - 1;
    }

    // AFTER NUMBER
    if (type === 1) {
      const num = Math.floor(Math.random() * max) + 1;
      question = `What comes AFTER?\n${num} ⬜`;
      answer = num + 1;
    }

    // MIDDLE NUMBER
    if (type === 2) {
      const start = Math.floor(Math.random() * max) + 1;
      question = `Fill the EMPTY BOX\n${start} ⬜ ${start + 2}`;
      answer = start + 1;
    }

    // COUNT FORWARD
    if (type === 3) {
      const start = Math.floor(Math.random() * max) + 1;
      question = `Count Forward\n${start}, ${start + 1}, ⬜`;
      answer = start + 2;
    }

    // COUNT BACKWARD
    if (type === 4) {
      const start = Math.floor(Math.random() * max) + 5;
      question = `Count Backward\n${start}, ⬜, ${start - 2}`;
      answer = start - 1;
    }

    // OPTIONS (NO DUPLICATES)
    let options = [answer];

    while (options.length < 3) {
      const wrong = answer + Math.floor(Math.random() * 6) - 3;
      if (wrong > 0 && !options.includes(wrong)) {
        options.push(wrong);
      }
    }

    options = options.sort(() => Math.random() - 0.5);

    setCurrentQuestion({ question, answer, options });
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const checkAnswer = (num: number) => {
    if (!currentQuestion) return;

    if (num === currentQuestion.answer) {
      const randomMsg =
        successMessages[Math.floor(Math.random() * successMessages.length)];

      setMessage(randomMsg);
      setScore((prev) => prev + 1);

      // LEVEL UP
      const newScore = score + 1;
      if (newScore % 5 === 0) {
        setLevel((prev) => prev + 1);
      }

      setTimeout(() => {
        setMessage("");
        generateQuestion();
      }, 1200);
    } else {
      setMessage("❌ Try Again!");
      setTimeout(() => setMessage(""), 800);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-4">
      <div className="mx-auto max-w-2xl">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-pink-600">
            Kids Math Game 🔢
          </h1>
          <p className="mt-2 text-lg font-semibold text-gray-700">
            Learn Numbers with Fun 🎈
          </p>
        </div>

        {/* SCORE + LEVEL */}
        <div className="mt-5 flex justify-center gap-4">
          <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2 shadow-lg border-4 border-yellow-300">
            ⭐ Score: {score}
          </div>

          <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2 shadow-lg border-4 border-blue-300">
            📈 Level: {level}
          </div>
        </div>

        {/* QUESTION BOX */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-2xl border-4 border-pink-300">
          
          <p className="whitespace-pre-line text-center text-3xl font-extrabold text-gray-700">
            {currentQuestion.question}
          </p>

          {/* OPTIONS */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {currentQuestion.options.map((num) => (
              <button
                key={num}
                onClick={() => checkAnswer(num)}
                className="rounded-3xl bg-purple-500 p-2 sm:p-6 text-4xl font-extrabold text-white shadow-lg transition hover:scale-105 active:scale-95"
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
          🌈 Keep Learning & Playing 🌈
        </div>

      </div>
    </div>
  );
}