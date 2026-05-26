"use client";

import { useEffect, useState } from "react";

type Level = {
  emoji: string;
  word: string;
  letters: string[];
};

const allLevels: Level[] = [
  { emoji: "🏠", word: "घर", letters: ["घ", "र", "क", "म"] },
  { emoji: "🥭", word: "आम", letters: ["आ", "म", "क", "त"] },
  { emoji: "🐰", word: "खरगोश", letters: ["ख", "र", "ग", "ो", "श", "ट"] },
  { emoji: "🐶", word: "कुत्ता", letters: ["क", "ु", "त", "्", "त", "ा"] },
  { emoji: "🐱", word: "बिल्ली", letters: ["ब", "ि", "ल", "्", "ल", "ी"] },
  { emoji: "🦁", word: "शेर", letters: ["श", "े", "र", "क"] },
  { emoji: "🐘", word: "हाथी", letters: ["ह", "ा", "थ", "ी", "क"] },
  { emoji: "🚗", word: "गाड़ी", letters: ["ग", "ा", "ड़", "ी", "र"] },
  { emoji: "🍎", word: "सेब", letters: ["स", "े", "ब", "क"] },
  { emoji: "🌞", word: "सूरज", letters: ["स", "ू", "र", "ज"] },

  { emoji: "🌙", word: "चाँद", letters: ["च", "ाँ", "द", "र"] },
  { emoji: "🌳", word: "पेड़", letters: ["प", "े", "ड़", "त"] },
  { emoji: "🌸", word: "फूल", letters: ["फ", "ू", "ल", "क"] },
  { emoji: "⚽", word: "गेंद", letters: ["ग", "े", "ं", "द"] },
  { emoji: "🚲", word: "साइकिल", letters: ["स", "ा", "इ", "क", "ि", "ल"] },
  { emoji: "✏️", word: "पेंसिल", letters: ["प", "े", "ं", "स", "ि", "ल"] },
  { emoji: "📘", word: "किताब", letters: ["क", "ि", "त", "ा", "ब"] },
  { emoji: "🏫", word: "स्कूल", letters: ["स", "्", "क", "ू", "ल"] },
  { emoji: "🍌", word: "केला", letters: ["क", "े", "ल", "ा"] },
  { emoji: "🥕", word: "गाजर", letters: ["ग", "ा", "ज", "र"] },
  { emoji: "🍅", word: "टमाटर", letters: ["ट", "म", "ा", "ट", "र"] },
  { emoji: "🥛", word: "दूध", letters: ["द", "ू", "ध"] },
  { emoji: "🚂", word: "ट्रेन", letters: ["ट", "्", "र", "े", "न"] },
  { emoji: "🚌", word: "बस", letters: ["ब", "स", "क"] },
  { emoji: "🔥", word: "आग", letters: ["आ", "ग", "प"] },
];

const shuffle = <T,>(arr: T[]) =>
  [...arr].sort(() => Math.random() - 0.5);

export default function HindiWordGame() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [message, setMessage] = useState("");

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

    if (newAnswer === current.word) {
      setMessage("🎉 सही जवाब!");

      setTimeout(() => {
        setAnswer("");
        setMessage("");

        if (levelIndex < levels.length - 1) {
          setLevelIndex((prev) => prev + 1);
        } else {
          setGameFinished(true);
        }
      }, 800);
    }
  };
  const removeLastLetter = () => {
    if (!answer) return;
    setAnswer(answer.slice(0, -1));
  };

  // LOADING
  if (!current && !gameFinished) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  // GAME END SCREEN
  if (gameFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
        <div className="text-7xl mb-4">🏆</div>

        <h1 className="text-3xl font-bold text-green-600">
          बहुत बढ़िया! गेम पूरा हुआ 🎉
        </h1>

        <button
          onClick={startGame}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl font-bold"
        >
          🔄 नया गेम खेलो
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6">
      <div className="absolute top-10 left-5 text-5xl animate-bounce opacity-20">
        😊
      </div>

      <div className="absolute top-20 right-10 text-5xl animate-pulse opacity-20">
        🎈
      </div>

      <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-20">
        ⭐
      </div>
      {/* CARD */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-2xl text-center w-full sm:max-w-[70%]">
<h1 className="text-5xl md:text-6xl font-black text-pink-600 drop-shadow-lg">
    मजेदार शब्द खेल 🎈
</h1>

<p className="text-xl md:text-2xl text-gray-700 mt-3 font-bold">
    अक्षरों पर टैप करें और शब्द पूरा करें 😍
</p>
        {/* emoji */}
        <div className="text-8xl my-6">{current.emoji}</div>

        {/* answer box */}
        <div className="bg-white rounded-2xl shadow-inner text-5xl font-bold py-4 mb-6 min-h-[80px]">
          {answer || "___"}
        </div>

        {/* letters */}
        <div className="grid sm:grid-cols-6 grid-cols-3  gap-3 ">
          {current.letters.map((letter, i) => (
            <button
              key={i}
              onClick={() => handleLetter(letter)}
              className="bg-pink-500 text-white text-3xl font-bold rounded-2xl h-16 hover:scale-105 active:scale-95 transition"
            >
              {letter}
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
              width: `${((levelIndex) / levels.length) * 100}%`,
            }}
          />
        </div>

        <div className="text-sm mt-2 text-gray-600">
          लेवल {levelIndex + 1} / {levels.length}
        </div>

        {/* restart */}
        <div className="flex align-center justify-center gap-5">

          <button
            onClick={startGame}
            className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-xl font-bold"
          >
            🔄 रीस्टार्ट
          </button>
          <button
            onClick={removeLastLetter}
            className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition"
          >
            ⬅ मिटाओ
          </button>
        </div>
      </div>
    </main>
  );
}