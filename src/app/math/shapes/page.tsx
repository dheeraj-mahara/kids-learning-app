"use client";

import { useEffect, useState } from "react";

type Shape = {
  name: string;
  emoji: string;
  color: string;
};

const shapes: Shape[] = [
  {
    name: "Circle",
    emoji: "⚪",
    color: "bg-pink-400",
  },
  {
    name: "Square",
    emoji: "🟦",
    color: "bg-blue-400",
  },
  {
    name: "Triangle",
    emoji: "🔺",
    color: "bg-yellow-400",
  },
  {
    name: "Star",
    emoji: "⭐",
    color: "bg-orange-400",
  },
  {
    name: "Heart",
    emoji: "💖",
    color: "bg-red-400",
  },

  // New Shapes
  {
    name: "Diamond",
    emoji: "🔷",
    color: "bg-cyan-400",
  },
  {
    name: "Rectangle",
    emoji: "▬",
    color: "bg-green-400",
  },
  {
    name: "Oval",
    emoji: "🥚",
    color: "bg-lime-400",
  },
  {
    name: "Pentagon",
    emoji: "⬟",
    color: "bg-indigo-400",
  },
  {
    name: "Hexagon",
    emoji: "⬢",
    color: "bg-teal-400",
  },

];

export default function Page() {
  const [currentShape, setCurrentShape] = useState<Shape>(shapes[0]);
  const [options, setOptions] = useState<Shape[]>([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const randomShape =
      shapes[Math.floor(Math.random() * shapes.length)];

    const shuffled = [...shapes]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    if (!shuffled.find((s) => s.name === randomShape.name)) {
      shuffled[0] = randomShape;
    }

    setCurrentShape(randomShape);
    setOptions(shuffled.sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const checkAnswer = (shape: Shape) => {
    if (shape.name === currentShape.name) {
      setMessage("🎉 Great Job!");
      setScore((prev) => prev + 1);

      setTimeout(() => {
        setMessage("");
        generateQuestion();
      }, 1000);
    } else {
      setMessage("❌ Try Again!");
            setTimeout(() => setMessage(""), 800);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-2">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-pink-600">
            Shape Learning Game 🔷
          </h1>

          <p className="mt-2 text-sm md:text-lg text-gray-700 font-semibold">
            Learn Shapes in a Fun Way 🎨
          </p>
        </div>

        {/* Score */}
        <div className="mt-4 flex justify-center">
          <div className="rounded-full bg-white px-5 py-2 shadow-lg border-2 border-yellow-300">
            <p className="text-lg font-bold text-purple-600">
              ⭐ Score: {score}
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div className="mt-6  relative rounded-3xl bg-white p-5 shadow-xl border-4 border-pink-300">
          <div className="text-center ">
            <p className="text-xl md:text-2xl font-bold text-gray-700">
              Which Shape Is This?
            </p>

            <div className="mt-2 text-[50px] md:text-[80px] animate-bounce">
              {currentShape.emoji}
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {options.map((shape) => (
              <button
                key={shape.name}
                onClick={() => checkAnswer(shape)}
                className={`${shape.color}
            rounded-2xl p-2 text-white shadow-lg
            transition hover:scale-105 active:scale-95`}
              >
                <div className="text-4xl">{shape.emoji}</div>

                <p className="mt-2 text-lg font-extrabold">
                  {shape.name}
                </p>
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


        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm font-bold text-gray-700">
            🌈 Happy Learning Kids 🌈
          </p>
        </div>
      </div>
    </div>
  );
}