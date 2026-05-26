"use client";

import { useEffect, useState } from "react";

type Operation =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

type Question = {
  num1: number;
  num2: number;
  correct: number;
  symbol: string;
  options: number[];
  emoji: string;
};

const operations = [
  {
    id: "addition",
    label: "Addition",
    icon: "➕",
    color: "from-pink-400 to-rose-400",
  },
  {
    id: "subtraction",
    label: "Subtraction",
    icon: "➖",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "multiplication",
    label: "Multiply",
    icon: "✖️",
    color: "from-yellow-400 to-orange-400",
  },
  {
    id: "division",
    label: "Division",
    icon: "➗",
    color: "from-green-400 to-emerald-400",
  },
];

const kidImages = ["🍎", "🍌", "🍓", "🐻", "⭐", "🍪", "🧸", "🐥"];

export default function Page() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [operation, setOperation] =
    useState<Operation>("addition");

  const [question, setQuestion] =
    useState<Question | null>(null);

  const generateQuestion = () => {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    let correct = 0;
    let symbol = "+";

    switch (operation) {
      case "addition":
        correct = num1 + num2;
        symbol = "+";
        break;

      case "subtraction":
        if (num2 > num1) {
          [num1, num2] = [num2, num1];
        }
        correct = num1 - num2;
        symbol = "-";
        break;

      case "multiplication":
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        correct = num1 * num2;
        symbol = "×";
        break;

      case "division":
        correct = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        num1 = correct * num2;
        symbol = "÷";
        break;
    }

    const wrongAnswers = new Set<number>();

    while (wrongAnswers.size < 3) {
      const wrong =
        correct + (Math.floor(Math.random() * 5) - 2);

      if (wrong !== correct && wrong >= 0) {
        wrongAnswers.add(wrong);
      }
    }

    const options = [
      correct,
      ...wrongAnswers,
    ].sort(() => Math.random() - 0.5);

    setQuestion({
      num1,
      num2,
      correct,
      symbol,
      options,
      emoji:
        kidImages[
        Math.floor(Math.random() * kidImages.length)
        ],
    });
  };

  useEffect(() => {
    generateQuestion();
  }, [operation, score]);

  const checkAnswer = (value: number) => {
    if (!question) return;

    if (value === question.correct) {
      setScore((prev) => prev + 1);
      setMessage("🎉 Awesome Job!");
      setTimeout(() => setMessage(""), 800);

    } else {
      setMessage("❌ Try Again!");
      setTimeout(() => setMessage(""), 800);

    }
  };

  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-4">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-pink-600">
            Kids Math Game 🧮
          </h1>
        </div>

        {/* Score */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white px-8 py-4 shadow-xl border-4 border-pink-300">
            <p className="text-2xl font-bold text-pink-600">
              ⭐ Score: {score}
            </p>
          </div>
        </div>

        {/* Operations */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {operations.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setOperation(item.id as Operation);
                setMessage("");
              }}
              className={`rounded-3xl bg-gradient-to-r ${item.color}
              p-3 text-white shadow-xl hover:scale-105 transition`}
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="font-bold">
                {item.label}
              </div>
            </button>
          ))}
        </div>

        {/* Question */}
        <div className="rounded-[40px] bg-white p-6 shadow-2xl border-8 border-yellow-300">

          {/* Visual */}
          <div className="relative text-center mb-8">
            <div className="flex flex-wrap justify-center gap-2 text-5xl">
              {Array.from({
                length: question.num1,
              }).map((_, i) => (
                <span key={i}>{question.emoji}</span>
              ))}
            </div>

            <div className="my-4 text-5xl font-bold text-pink-500">
              {question.symbol}
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-5xl">
              {Array.from({
                length: question.num2,
              }).map((_, i) => (
                <span key={i}>{question.emoji}</span>
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
          </div>

          {/* Math */}
          <h2 className="text-center text-5xl font-extrabold text-blue-600 mb-8">
            {question.num1} {question.symbol}{" "}
            {question.num2} = ?
          </h2>

          {/* Answers */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                className="rounded-3xl bg-gradient-to-r from-purple-400 to-pink-400
                sm:px-6 sm:py-5 p-2 text-2xl sm:text-3xl font-bold sm:font-extrabold text-white shadow-xl
                hover:scale-105 transition"
              >
                {option}
              </button>
            ))}
          </div>

          {/* Message */}

        </div>
      </div>

    </div>
  );
}