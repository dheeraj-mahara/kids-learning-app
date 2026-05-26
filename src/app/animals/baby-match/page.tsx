"use client";

import { useState } from "react";

const data = [
    { animal: "🐶 Dog", baby: "🐶 Puppy" },
    { animal: "🐱 Cat", baby: "🐱 Kitten" },
    { animal: "🐄 Cow", baby: "🐄 Calf" },
    { animal: "🐷 Pig", baby: "🐷 Piglet" },
    { animal: "🐴 Horse", baby: "🐴 Foal" },
    { animal: "🐑 Sheep", baby: "🐑 Lamb" },
    { animal: "🐐 Goat", baby: "🐐 Kid" },
    { animal: "🦁 Lion", baby: "🦁 Cub" },
    { animal: "🐯 Tiger", baby: "🐯 Cub" },
    { animal: "🐵 Monkey", baby: "🐵 Infant" },
    { animal: "🐧 Penguin", baby: "🐧 Chick" },
    { animal: "🐦 Bird", baby: "🐦 Hatchling" },
    { animal: "🦆 Duck", baby: "🦆 Duckling" },
    { animal: "🐥 Chicken", baby: "🐥 Chick" },
    { animal: "🦉 Owl", baby: "🦉 Owlet" },
    { animal: "🐸 Frog", baby: "🐸 Tadpole" },
    { animal: "🦄 Unicorn", baby: "🦄 Foal" },
    { animal: "🐍 Snake", baby: "🐍 Hatchling" },
    { animal: "🦋 Butterfly", baby: "🦋 Caterpillar" },
    { animal: "🐢 Turtle", baby: "🐢 Hatchling" },
    { animal: "🐠 Fish", baby: "🐠 Fry" },
    { animal: "🦀 Crab", baby: "🦀 Larva" },
    { animal: "🐊 Crocodile", baby: "🐊 Hatchling" },
    { animal: "🦓 Zebra", baby: "🦓 Foal" },
    { animal: "🦒 Giraffe", baby: "🦒 Calf" },
    { animal: "🐘 Elephant", baby: "🐘 Calf" },
    { animal: "🦏 Rhinoceros", baby: "🦏 Calf" },
    { animal: "🐫 Camel", baby: "🐫 Calf" },
    { animal: "🦘 Kangaroo", baby: "🦘 Joey" },
    { animal: "🦨 Skunk", baby: "🦨 Kit" },
];

function shuffle<T>(arr: T[]) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function pickQuestions() {
    return shuffle(data).slice(0, 5);
}

export default function AnimalBabyMatchGame() {
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [shake, setShake] = useState(false);
    const [correctFlash, setCorrectFlash] = useState(false);
    const [questions, setQuestions] = useState(pickQuestions);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentQuestion = questions[currentIndex];

    const options = shuffle([
        currentQuestion.baby,
        ...shuffle(data.filter((d) => d.baby !== currentQuestion.baby))
            .slice(0, 2)
            .map((d) => d.baby),
    ]);

    const handleAnswer = (baby: string) => {
        if (baby === currentQuestion.baby) {
            setScore((s) => s + 1);
            setMessage("🎉 Correct!");
            setCorrectFlash(true);
            setTimeout(() => nextQuestion(), 1000);
        } else {
            setMessage("❌ Try Again!");
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setMessage(""), 800);
        }
    };

    const nextQuestion = () => {
        setCorrectFlash(false);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((i) => i + 1);
            setMessage("");
        } else {
            setQuestions(pickQuestions());
            setCurrentIndex(0);
            setMessage("✅ Next 5 Questions!");
            setTimeout(() => setMessage(""), 1200);
        }
    };

    const restartGame = () => {
        setScore(0);
        setQuestions(pickQuestions());
        setCurrentIndex(0);
        setMessage("");
        setShake(false);
        setCorrectFlash(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100 flex flex-col items-center p-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mt-6 text-center drop-shadow-lg">
                🐾 Animal Baby Match 🐣
            </h1>

            <p className="mt-2 text-gray-700 font-semibold text-center text-lg">
                Can you find the baby animal?
            </p>

            <div className="mt-4 px-6 py-2 rounded-full font-bold shadow-lg bg-yellow-300 text-xl text-purple-700 animate-pulse">
                <p>
                    ⭐ Score: {score}
                </p>
                {message && (
                    <p className="absolute mt-4 text-xl font-bold text-pink-600 animate-bounce">
                        {message}as
                    </p>
                )}
            </div>


            {/* Question Card */}
            <div
                className={`mt-10 w-72 sm:w-80 h-52 flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl border-4 border-purple-300 transform transition-transform duration-300 ${shake ? "animate-shake" : ""
                    } ${correctFlash ? "scale-105 border-green-400" : ""}`}
            >
                <div className="text-8xl">{currentQuestion.animal.split(" ")[0]}</div>
                <div className="text-3xl font-bold mt-2 text-purple-700">
                    {currentQuestion.animal.split(" ")[1]}
                </div>
                <p className="text-gray-500 mt-2 text-lg font-semibold">
                    Pick the baby 👇
                </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-full max-w-3xl px-2">
                {options.map((baby) => (
                    <button
                        key={baby}
                        onClick={() => handleAnswer(baby)}
                        className="bg-gradient-to-tr from-blue-400 to-purple-400 hover:from-purple-400 hover:to-blue-400 text-white py-6 rounded-3xl font-extrabold text-xl shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        {baby}
                    </button>
                ))}
            </div>

            <button
                onClick={restartGame}
                className="mt-12 bg-gradient-to-r from-green-400 to-teal-400 hover:from-teal-400 hover:to-green-400 text-white px-8 py-4 rounded-3xl font-bold text-xl shadow-xl transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
                🔄 Restart Game
            </button>

            <p className="mt-4 text-gray-700 font-semibold text-lg">
                Question {currentIndex + 1} of 5
            </p>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
        </main>
    );
}