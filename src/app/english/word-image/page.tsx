"use client";

import { useEffect, useState } from "react";

type Question = {
  emoji: string;
  answer: string;
  options: string[];
};

const allQuestions: Question[] = [
  { emoji: "🐄", answer: "Cow", options: ["Cow", "Horse", "Dog"] },
  { emoji: "🍎", answer: "Apple", options: ["Mango", "Apple", "Banana"] },
  { emoji: "🐘", answer: "Elephant", options: ["Lion", "Elephant", "Cat"] },
  { emoji: "🚗", answer: "Car", options: ["Bus", "Car", "Bike"] },
  { emoji: "🐶", answer: "Dog", options: ["Cat", "Dog", "Horse"] },
  { emoji: "🐱", answer: "Cat", options: ["Mouse", "Cat", "Crow"] },
  { emoji: "🦁", answer: "Lion", options: ["Lion", "Deer", "Dog"] },
  { emoji: "🌞", answer: "Sun", options: ["Moon", "Sun", "Star"] },
  { emoji: "🌙", answer: "Moon", options: ["Sun", "Moon", "Cloud"] },
  { emoji: "🚂", answer: "Train", options: ["Train", "Bus", "Car"] },
];

const shuffle = (arr: Question[]): Question[] =>
  [...arr].sort(() => Math.random() - 0.5);

export default function WordImageGame() {
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomFive = shuffle(allQuestions).slice(0, 5);
    setGameQuestions(randomFive);
    setLevel(0);
    setMessage("");
    setCorrect(null);
    setGameFinished(false);
  };

  const current = gameQuestions[level];

  const checkAnswer = (option: string) => {
    if (!current) return;

    if (option === current.answer) {
      setMessage("🎉 Correct!");
      setCorrect(true);

      setTimeout(() => {
        setMessage("");
        setCorrect(null);

        if (level < gameQuestions.length - 1) {
          setLevel((prev) => prev + 1);
        } else {
          setGameFinished(true);
        }
      }, 800);
    } else {
      setMessage("❌ Try Again!");
      setCorrect(false);

      setTimeout(() => {
        setMessage("");
        setCorrect(null);
      }, 700);
    }
  };
if (gameFinished) {
  return (
    <main className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative px-5">

      {/* floating items */}
      <div className="absolute top-10 left-10 text-7xl animate-bounce">
        ☁️
      </div>

      <div className="absolute top-16 right-10 text-6xl animate-pulse">
        🌈
      </div>

      <div className="absolute bottom-10 left-10 text-6xl animate-bounce">
        ⭐
      </div>

      <div className="absolute bottom-10 right-10 text-7xl animate-pulse">
        🎈
      </div>

      {/* winner card */}
      <div
        className="
          relative
          bg-white/30
          backdrop-blur-2xl
          border-[6px]
          border-white/40
          rounded-[60px]
          p-7
          md:p-14
          shadow-[0_20px_80px_rgba(0,0,0,0.15)]
          text-center
          max-w-2xl
          w-full
          overflow-hidden
        "
      >

        {/* stars */}
        <div className="absolute top-5 left-5 text-4xl animate-pulse">
          ✨
        </div>

        <div className="absolute top-5 right-5 text-4xl animate-bounce">
          ⭐
        </div>

        {/* trophy */}
        <div className="text-[85px] sm:text-[140px]  animate-bounce drop-shadow-lg">
          🏆
        </div>

        <h1 className="text-2xl md:text-5xl font-black text-green-500 sm:mt-4">
          Great Job 🎉
        </h1>

        <p className="mt-5 text-2xl text-gray-700 font-bold">
          You completed all levels 😍
        </p>

        <div className="sm:mt-6 mt-2 inline-block bg-white px-6  py-2 rounded-full shadow-xl text-pink-600 text-xl font-black">
          Super Smart Kid 🚀
        </div>

        <button
          onClick={startNewGame}
          className="
            sm:mt-8 mt-2
            sm:px-8 px-4
            sm:py-4 py-2
            ml-2
            rounded-full
            sm:text-2xl
            font-black
            text-white
            bg-gradient-to-r
            from-pink-500
            to-orange-400
            shadow-2xl
            hover:scale-105
            active:scale-95
            transition-all
          "
        >
          🔄 Play Again
        </button>

      </div>
    </main>
  );
}

if (!current) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200">

      <div className="bg-white px-10 py-6 rounded-[30px] shadow-2xl text-3xl font-black text-pink-500 animate-pulse">
        Loading Game... 🎮
      </div>

    </div>
  );
}

return (
  <main className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative sm:px-5 px-3 sm:py-10 py-6">

    {/* floating items */}
    <div className="absolute top-10 left-5 text-7xl animate-bounce opacity-80">
      ☁️
    </div>

    <div className="absolute top-20 right-10 text-6xl animate-pulse">
      🌈
    </div>

    <div className="absolute bottom-10 left-10 text-6xl animate-bounce">
      ⭐
    </div>

    <div className="absolute bottom-10 right-10 text-7xl animate-pulse">
      🎈
    </div>

    {/* main game card */}
    <div
      className="
        relative
        w-full
        max-w-4xl
        bg-white/30
        backdrop-blur-2xl
        border-[6px]
        border-white/40
        rounded-[60px]
        p-4
        md:p-12
        shadow-[0_20px_80px_rgba(0,0,0,0.15)]
        overflow-hidden
        text-center
      "
    >

      {/* decorative stars */}
      <div className="absolute top-5 left-5 text-4xl animate-pulse">
        ✨
      </div>

      <div className="absolute top-5 right-5 text-4xl animate-bounce">
        ⭐
      </div>

      {/* title */}
      <h1 className="text-4xl md:text-6xl font-black text-blue-600 drop-shadow-lg">
        🧠 Word Game
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 mt-5 font-bold">
        Choose the correct answer 🎯
      </p>

      {/* emoji box */}
      <div
        className="
          mt-10
          bg-white
          rounded-[40px]
          sm:py-10 pt-5
          shadow-[0_10px_40px_rgba(0,0,0,0.1)]
          relative
          overflow-hidden
        "
      >

        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 opacity-40"></div>

        <div className="relative text-[140px] animate-bounce">
          {current.emoji}
        </div>

      </div>

      {/* options */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3  sm:gap-5 mt-6 sm:mt-10">

        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => checkAnswer(opt)}
            className="
              sm:py-5 py-3
              rounded-[25px]
              font-black
              text-white
              text-2xl
              bg-gradient-to-br
              from-blue-400
              to-purple-500
              shadow-[0_10px_30px_rgba(59,130,246,0.4)]
              hover:scale-110
              hover:-translate-y-1
              active:scale-95
              transition-all
              duration-200
            "
          >
            {opt}
          </button>
        ))}

      </div>

      {/* message */}
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
            ${correct ? "text-green-500" : "text-red-500"}
          `}
        >
          {message}
        </div>
      )}

      {/* progress */}
      <div className="mt-10">

        <div className="w-full h-5 bg-white/50 rounded-full overflow-hidden shadow-inner">

          <div
            className="
              h-full
              bg-gradient-to-r
              from-pink-400
              to-orange-400
              transition-all
              duration-500
            "
            style={{
              width: `${((level + 1) / gameQuestions.length) * 100}%`,
            }}
          />

        </div>

        <div className="mt-4 text-2xl font-black text-pink-600">
          Level {level + 1} / {gameQuestions.length}
        </div>

      </div>

      {/* restart button */}
      <button
        onClick={startNewGame}
        className=" sm:mt-10 mt-4 sm:px-10  sm:py-5 p-3 rounded-full text-2xl font-black text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl hover:scale-105 active:scale-95 transition-all
        "
      >
        🔄 Restart
      </button>

    </div>
  </main>
);
}