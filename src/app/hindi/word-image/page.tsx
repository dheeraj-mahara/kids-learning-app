"use client";

import { useEffect, useState } from "react";

type Question = {
    emoji: string;
    answer: string;
    options: string[];
};

const allQuestions: Question[] = [
    { emoji: "🐄", answer: "गाय", options: ["गाय", "घोड़ा", "कुत्ता"] },
    { emoji: "🍎", answer: "सेब", options: ["आम", "सेब", "केला"] },
    { emoji: "🐘", answer: "हाथी", options: ["शेर", "हाथी", "बिल्ली"] },
    { emoji: "🚗", answer: "गाड़ी", options: ["बस", "गाड़ी", "साइकिल"] },
    { emoji: "🐶", answer: "कुत्ता", options: ["बिल्ली", "कुत्ता", "घोड़ा"] },
    { emoji: "🐱", answer: "बिल्ली", options: ["चूहा", "बिल्ली", "कौआ"] },
    { emoji: "🦁", answer: "शेर", options: ["शेर", "हिरण", "कुत्ता"] },
    { emoji: "🌞", answer: "सूरज", options: ["चाँद", "सूरज", "तारा"] },
    { emoji: "🌙", answer: "चाँद", options: ["सूरज", "चाँद", "बादल"] },
    { emoji: "🚂", answer: "ट्रेन", options: ["ट्रेन", "बस", "कार"] },
];

const shuffle = (arr: Question[]): Question[] =>
    [...arr].sort(() => Math.random() - 0.5);

export default function WordImageGame() {
    const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
    const [level, setLevel] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [gameFinished, setGameFinished] = useState<boolean>(false);

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
            setMessage("🎉 सही जवाब!");
            setCorrect(true);

            setTimeout(() => {
                setMessage("");
                setCorrect(null);

                if (level < gameQuestions.length - 1) {
                    setLevel((prev) => prev + 1);
                } else {
                    setGameFinished(true); // ✅ GAME END
                }
            }, 800);
        } else {
            setMessage("❌ फिर कोशिश करो!");
            setCorrect(false);

            setTimeout(() => {
                setMessage("");
                setCorrect(null);
            }, 700);
        }
    };

    // ---------------- GAME END SCREEN ----------------
    if (gameFinished) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 text-center p-6">
                <div className="text-7xl mb-4">🏆</div>

                <h1 className="text-3xl font-bold text-green-600">
                    शाबाश! गेम पूरा हुआ 🎉
                </h1>

                <p className="mt-2 text-gray-600 text-lg">
                    तुमने सभी सवाल पूरे कर लिए
                </p>

                <button
                    onClick={startNewGame}
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition"
                >
                    🔄 नया गेम खेलो
                </button>
            </div>
        );
    }

    if (!current) {
        return (
            <div className="h-screen flex items-center justify-center text-2xl">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-pink-100 to-yellow-100 p-4">
            <div className="absolute top-10 left-5 text-5xl animate-bounce opacity-20">
                😊
            </div>

            <div className="absolute top-20 right-10 text-5xl animate-pulse opacity-20">
                🎈
            </div>

            <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-20">
                ⭐
            </div>
            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-center">

                <h1 className="text-3xl font-bold text-pink-600 mb-4">
                    🧠 शब्द और चित्र गेम
                </h1>

                {/* emoji */}
                <div className="text-8xl mb-6 bg-white rounded-2xl py-6 shadow">
                    {current.emoji}
                </div>

                {/* options */}
                <div className="grid grid-cols-3 gap-3">
                    {current.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => checkAnswer(opt)}
                            className="py-3 rounded-xl font-bold text-white
              bg-gradient-to-r from-purple-400 to-pink-500
              hover:scale-105 active:scale-95 transition"
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
            text-green-500
            ${message !== "❌ फिर कोशिश करो!" ? "text-green-500" : "text-red-500"}
          `}
        >
          {message}
        </div>
      )}

                {/* progress */}
                <div className="mt-5 w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-pink-500 transition-all"
                        style={{
                            width: `${((level + 1) / gameQuestions.length) * 100}%`,
                        }}
                    />
                </div>

                <div className="text-sm mt-2 text-gray-600">
                    लेवल {level + 1} / {gameQuestions.length}
                </div>

                <button
                    onClick={startNewGame}
                    className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-xl font-bold"
                >
                    🔄 रीस्टार्ट
                </button>

            </div>
        </main>
    );
}