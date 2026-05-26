"use client";

import { useEffect, useState } from "react";

type Level = {
  emoji: string;
  word: string;
  missingIndex: number;
};

const allLevels = [
  { emoji: "🐶", word: "DOG", missingIndex: 1 },
  { emoji: "🐱", word: "CAT", missingIndex: 2 },
  { emoji: "🦁", word: "LION", missingIndex: 1 },
  { emoji: "🐘", word: "ELEPHANT", missingIndex: 2 },
  { emoji: "🍎", word: "APPLE", missingIndex: 1 },
  { emoji: "⚽", word: "BALL", missingIndex: 2 },
  { emoji: "🚗", word: "CAR", missingIndex: 1 },
  { emoji: "✈️", word: "PLANE", missingIndex: 2 },
  { emoji: "🪁", word: "KITE", missingIndex: 1 },
  { emoji: "🌞", word: "SUN", missingIndex: 1 },
  { emoji: "🌙", word: "MOON", missingIndex: 2 },
  { emoji: "🐟", word: "FISH", missingIndex: 1 },
  { emoji: "🐦", word: "BIRD", missingIndex: 2 },
  { emoji: "🏫", word: "SCHOOL", missingIndex: 2 },
  { emoji: "📱", word: "PHONE", missingIndex: 1 },
  { emoji: "🚲", word: "BIKE", missingIndex: 1 },
  { emoji: "🐄", word: "COW", missingIndex: 1 },
  { emoji: "🐴", word: "HORSE", missingIndex: 2 },
  { emoji: "🐸", word: "FROG", missingIndex: 1 },
  { emoji: "🐝", word: "BEE", missingIndex: 1 },
  { emoji: "🍌", word: "BANANA", missingIndex: 2 },
  { emoji: "🍇", word: "GRAPE", missingIndex: 1 },
  { emoji: "🥕", word: "CARROT", missingIndex: 2 },
  { emoji: "🍔", word: "BURGER", missingIndex: 1 },
  { emoji: "🍕", word: "PIZZA", missingIndex: 2 },
  { emoji: "🏠", word: "HOUSE", missingIndex: 2 },
  { emoji: "🚪", word: "DOOR", missingIndex: 1 },
  { emoji: "🪑", word: "CHAIR", missingIndex: 2 },
  { emoji: "🛏️", word: "BED", missingIndex: 1 },
  { emoji: "💡", word: "LIGHT", missingIndex: 2 },
  { emoji: "📚", word: "BOOK", missingIndex: 1 },
  { emoji: "✏️", word: "PENCIL", missingIndex: 2 },
  { emoji: "🧸", word: "TOY", missingIndex: 1 },
];

const shuffle = <T,>(arr: T[]) =>
  [...arr].sort(() => Math.random() - 0.5);

export default function MissingLetterGame() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [displayWord, setDisplayWord] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);

  const current = levels[index];

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const picked = shuffle(allLevels).slice(0, 5);
    setLevels(picked);
    setIndex(0);
    setFinished(false);
    setMessage("");
  };

  useEffect(() => {
    if (!current) return;

    const arr = current.word.split("");
    const correct = arr[current.missingIndex];

    const temp = [...arr];
    temp[current.missingIndex] = "_";
    setDisplayWord(temp);

    const randomLetters = shuffle(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    ).slice(0, 3);

    setOptions(shuffle([correct, ...randomLetters]));
  }, [current]);

  const handleAnswer = (opt: string) => {
    if (!current) return;

    const correct = current.word[current.missingIndex];

    if (opt === correct) {
      setMessage("🎉 Correct!");

      const updated = [...displayWord];
      updated[current.missingIndex] = correct;
      setDisplayWord(updated);

      setTimeout(() => {
        setMessage("");

        setIndex((prev) => {
          const next = prev + 1;
          if (next >= levels.length) {
            setFinished(true);
            return prev;
          }
          return next;
        });
      }, 700);
    } else {
      setMessage("❌ Try Again!");
      setTimeout(() => setMessage(""), 700);
    }
  };

  if (!current && !finished) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (finished) {
    return (
   
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 px-5">

                <div className="bg-white/40 backdrop-blur-2xl border-[6px] border-white/40 rounded-[50px] p-10 shadow-2xl text-center max-w-2xl w-full">

                    <div className=" text-[80px] sm:text-[150px] animate-bounce">
                        🏆
                    </div>

                    <h1 className="sm:text-5xl  text-3xl font-black text-green-500 mt-5">
                        Great Job 🎉
                    </h1>

                    <p className="text-2xl text-gray-700 mt-4">
                        You completed all levels 😍
                    </p>

                    <button
                        onClick={startGame}
                        className="
              sm:mt-10  mt-6
              sm:px-10 px-4
              sm:py-5 py-3
              rounded-full
              sm:text-2xl 
              font-black
              text-white
              bg-gradient-to-r
              from-pink-500
              to-orange-400
              shadow-2xl
              hover:scale-105
              transition
            "
                    >
                        🔄 Play Again
                    </button>

                </div>
            </main>
    );
  }

 return (
  <main className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative px-5 py-10">

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
      className="   relative w-full max-w-5xl bg-white/30 backdrop-blur-2xl border-[6px] border-white/40 rounded-[60px] p-8  md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.15)] overflow-hidden text-center " >

      {/* decorative stars */}
      <div className="absolute top-5 left-5 text-4xl animate-pulse">
        ✨
      </div>

      <div className="absolute top-5 right-5 text-4xl animate-bounce">
        ⭐
      </div>

      {/* title */}
      <h1 className="text-4xl md:text-6xl font-black text-blue-600 drop-shadow-lg">
        🧩 Missing Letter Game
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 mt-5 font-bold">
        Complete the word 😍
      </p>

      {/* emoji box */}
      <div
        className="  mt-10  bg-white  rounded-[40px]  sm:py-10 pt-5  shadow-[0_10px_40px_rgba(0,0,0,0.1)]  relative  overflow-hidden" >

        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 opacity-40"></div>

        <div className="relative text-[100px] sm:text-[140px] animate-bounce">
          {current.emoji}
        </div>

      </div>

      {/* word display */}
      <div
        className="  sm:mt-8 mt-6  bg-white  rounded-[35px]  shadow-[inset_0_5px_20px_rgba(0,0,0,0.1)]  sm:min-h-[110px]  min-h-[70px]  flex  items-center  justify-center  text-2xl  md:text-7xl  font-black  tracking-[8px]  sm:tracking-[12px]  text-pink-500"
      >
        {displayWord.join("")}
      </div>

      {/* options */}
      <div className="grid grid-cols-3 sm:grid-cols-4 sm:gap-5 gap-3 mt-6 sm:mt-10">

        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="   sm:py-5 py-2   rounded-[25px]   font-black   text-white   sm:text-4xl text-3xl   bg-gradient-to-br   from-blue-400   to-purple-500   shadow-[0_10px_30px_rgba(59,130,246,0.4)]   hover:scale-110   hover:-translate-y-1   active:scale-95   transition-all   duration-200 "
          >
            {opt}
          </button>
        ))}

      </div>

      {/* message */}
      {message && (
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            top-[60%]
            text-4xl
            font-black
            text-green-500
            animate-bounce
          "
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
              width: `${
                levels.length
                  ? ((index + 1) / levels.length) * 100
                  : 0
              }%`,
            }}
          />

        </div>

        <div className="mt-4 text-2xl font-black text-pink-600">
          Level {index + 1} / {levels.length}
        </div>

      </div>

      {/* restart button */}
      <button
        onClick={startGame}
                className=" sm:mt-10 mt-4 sm:px-10  sm:py-5 p-3 rounded-full text-2xl font-black text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl hover:scale-105 active:scale-95 transition-all

        "
      >
        🔄 Restart
      </button>

    </div>
  </main>
);
}