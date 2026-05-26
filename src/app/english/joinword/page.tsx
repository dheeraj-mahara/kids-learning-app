"use client";

import { useEffect, useState } from "react";

type Level = {
    emoji: string;
    word: string;
    letters: string[];
};

const allLevels: Level[] = [
    { emoji: "🐶", word: "DOG", letters: ["D", "O", "G", "A"] },
    { emoji: "🐱", word: "CAT", letters: ["C", "A", "T", "B"] },
    { emoji: "🦁", word: "LION", letters: ["L", "I", "O", "N"] },
    { emoji: "🐘", word: "ELEPHANT", letters: ["E", "L", "E", "P", "H", "A", "N", "T"] },
    { emoji: "🍎", word: "APPLE", letters: ["A", "P", "P", "L", "E"] },
    { emoji: "⚽", word: "BALL", letters: ["B", "A", "L", "L"] },
    { emoji: "🚗", word: "CAR", letters: ["C", "A", "R", "T"] },
    { emoji: "✈️", word: "PLANE", letters: ["P", "L", "A", "N", "E"] },
    { emoji: "🪁", word: "KITE", letters: ["K", "I", "T", "E"] },
    { emoji: "🌞", word: "SUN", letters: ["S", "U", "N", "M"] },
];

const shuffle = <T,>(arr: T[]) =>
    [...arr].sort(() => Math.random() - 0.5);

export default function EnglishWordGame() {
    const [levels, setLevels] = useState<Level[]>([]);
    const [levelIndex, setLevelIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [gameFinished, setGameFinished] = useState(false);
    const [message, setMessage] = useState("");
    const [active, setActive] = useState(false);

    useEffect(() => {
        startGame();
    }, []);

    const startGame = () => {
        const randomFive = shuffle(allLevels).slice(0, 5);

        setLevels(randomFive);
        setLevelIndex(0);
        setAnswer("");
        setGameFinished(false);
        setMessage("");
    };

    const current = levels[levelIndex];

    const handleLetter = (letter: string) => {
        if (!current) return;

        const newAnswer = answer + letter;

        setAnswer(newAnswer);

        if (current.word.startsWith(newAnswer)) {
            setActive(true);

            setTimeout(() => {
                setActive(false);
            }, 300);
        }

        if (newAnswer === current.word) {
            setMessage("🎉 AMAZING 🎉");

            const audio = new Audio(
                "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
            );

            audio.play();

            setTimeout(() => {
                setAnswer("");
                setMessage("");

                if (levelIndex < levels.length - 1) {
                    setLevelIndex((prev) => prev + 1);
                } else {
                    setGameFinished(true);
                }
            }, 1500);
        }
    };

    const removeLastLetter = () => {
        if (!answer) return;

        setAnswer(answer.slice(0, -1));
    };

    if (!current && !gameFinished) {
        return (
            <div className="h-screen flex items-center justify-center text-4xl font-bold bg-yellow-100">
                Loading...
            </div>
        );
    }

    if (gameFinished) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 px-5">
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
                <div className="bg-white/40 backdrop-blur-2xl border-[6px] border-white/40 rounded-[50px] p-10 shadow-2xl text-center max-w-2xl w-full">

                    <div className=" text-[80px] sm:text-[150px] animate-bounce">
                        🏆
                    </div>
                      <div className="absolute top-5 left-5 text-4xl animate-pulse">
          ✨
        </div>

        <div className="absolute top-5 right-5 text-4xl animate-bounce">
          ⭐
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
        <main className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative flex items-center justify-center sm:px-5 px-3 sm:py-10 py-6">

            {/* floating items */}
            <div className="absolute top-10 left-10 text-7xl animate-bounce opacity-80">
                ☁️
            </div>

            <div className="absolute top-20 right-10 text-6xl animate-pulse">
                🌈
            </div>

            <div className="absolute bottom-10 left-10 text-6xl animate-bounce">
                ⭐
            </div>

            <div className="absolute bottom-10 right-10 text-7xl animate-pulse">
                ☁️
            </div>

            {/* main card */}
            <div
                className="  relative  bg-white/30  backdrop-blur-2xl  border-[6px]  border-white/40  rounded-[60px]  p-5   shadow-[0_20px_80px_rgba(0,0,0,0.15)]   w-full   max-w-5xl   overflow-hidden
          text-center
        "
            >

                {/* stars */}
                <div className="absolute top-5 left-5 text-4xl animate-pulse">
                    ✨
                </div>

                <div className="absolute top-5 right-5 text-4xl animate-bounce">
                    ⭐
                </div>

                {/* title */}
                <h1 className="text-5xl md:text-6xl font-black text-pink-600 drop-shadow-lg">
                    Fun Word Game 🎈
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 mt-3 font-bold">
                    Tap the letters and complete the word 😍
                </p>

                {/* emoji */}
                <div
                    className={`
            text-[100px]
            mt-8
            transition-all
            duration-300
            ${active ? "scale-125 rotate-6" : "animate-bounce"}
          `}
                >
                    {current.emoji}
                </div>

                {/* speech bubble */}
                <div className="inline-block bg-white px-6 py-3 rounded-full shadow-xl text-pink-600 font-black text-xl ">
                    Who am I? 🤔
                </div>

                {/* answer */}
                <div
                    className=" mt-6 bg-white rounded-[35px] shadow-[inset_0_5px_20px_rgba(0,0,0,0.1)] sm:h-[100px] h-[60px] flex items-center justify-center sm:text-6xl text-3xl md:text-7xl font-black sm:tracking-[12px] tracking-[4px] text-pink-500
          "
                >
                    {answer || "___"}
                </div>

                {/* success message */}
                {message && (
                    <div
                        className=" absolute left-1/2 -translate-x-1/2 top-[ text font-b text-green animate-bounce
            "
                    >
                        {message}
                    </div>
                )}

                {/* letters */}
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 sm:gap-5 gap-3 mt-6">

                    {current.letters.map((letter, i) => (
                        <button
                            key={i}
                            onClick={() => handleLetter(letter)}
                            className=" sm:h-17 h-12 rounded-[30px] bg-gradient-to-br from-blue-400 to-blue-600 text-white sm:text-4xl text-2xl font-black shadow-[0_10px_30px_rgba(59,130,246,0.5)] hover:scale-110 active:scale-95 transition-all duration-200 "
                        >
                            {letter}
                        </button>
                    ))}

                </div>

                {/* progress */}
                <div className="mt-8">

                    <div className="w-full h-5 bg-white/50 rounded-full overflow-hidden">

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
                                width: `${((levelIndex + 1) / levels.length) * 100}%`,
                            }}
                        />

                    </div>

                    <div className="mt-4 text-2xl font-bold text-pink-600">
                        Level {levelIndex + 1} / {levels.length}
                    </div>

                </div>

                {/* buttons */}
                <div className="flex flex-wrap justify-center gap-5 mt-8">

                    <button
                        onClick={startGame}
                        className=" sm:px-8 px-2 sm:py-4 py-1 rounded-full sm:text-xl font-black text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl hover:scale-105 transition "
                    >
                        🔄 Restart
                    </button>

                    <button
                        onClick={removeLastLetter}
                        className="
            sm:px-8 px-2 sm:py-4 py-1 rounded-full sm:text-xlfont-black text-white bg-gradient-to-r from-gray-700 to-gray-900 shadow-2xl hover:scale-105 transition"
                    >
                        ⬅ Delete
                    </button>

                </div>

            </div>
        </main>
    );
}