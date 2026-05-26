"use client";

import { useEffect, useState } from "react";

type Level = {
    emoji: string;
    word: string;
    missingIndex: number;
};

const allLevels: Level[] = [
    { emoji: "🏠", word: "घर", missingIndex: 1 },
    { emoji: "🥭", word: "आम", missingIndex: 1 },
    { emoji: "🐶", word: "कुत्ता", missingIndex: 2 },
    { emoji: "🐱", word: "बिल्ली", missingIndex: 3 },
    { emoji: "🦁", word: "शेर", missingIndex: 1 },
    { emoji: "🐘", word: "हाथी", missingIndex: 2 },
    { emoji: "🚗", word: "गाड़ी", missingIndex: 2 },
    { emoji: "🍎", word: "सेब", missingIndex: 1 },
    { emoji: "🌞", word: "सूरज", missingIndex: 2 },
    { emoji: "🌙", word: "चाँद", missingIndex: 2 },
    { emoji: "🌳", word: "पेड़", missingIndex: 1 },
    { emoji: "🌸", word: "फूल", missingIndex: 1 },
    { emoji: "⚽", word: "गेंद", missingIndex: 2 },
    { emoji: "🚲", word: "साइकिल", missingIndex: 3 },
    { emoji: "✏️", word: "पेंसिल", missingIndex: 2 },
    { emoji: "📘", word: "किताब", missingIndex: 2 },
    { emoji: "🏫", word: "स्कूल", missingIndex: 2 },
    { emoji: "🍌", word: "केला", missingIndex: 1 },
    { emoji: "🥕", word: "गाजर", missingIndex: 2 },
    { emoji: "🍅", word: "टमाटर", missingIndex: 3 },
    { emoji: "🥛", word: "दूध", missingIndex: 1 },
    { emoji: "🚂", word: "ट्रेन", missingIndex: 2 },
    { emoji: "🚌", word: "बस", missingIndex: 1 },
    { emoji: "🔥", word: "आग", missingIndex: 1 },
    { emoji: "🌧️", word: "बारिश", missingIndex: 2 },
    { emoji: "☀️", word: "धूप", missingIndex: 1 },
    { emoji: "🪁", word: "पतंग", missingIndex: 2 },
    { emoji: "🐟", word: "मछली", missingIndex: 2 },
    { emoji: "🧸", word: "खिलौना", missingIndex: 3 },
    { emoji: "🎒", word: "बैग", missingIndex: 1 },
    { emoji: "📱", word: "फोन", missingIndex: 1 },
    { emoji: "💡", word: "बत्ती", missingIndex: 2 },
    { emoji: "🏀", word: "बॉल", missingIndex: 1 },
    { emoji: "🍉", word: "तरबूज", missingIndex: 2 },
    { emoji: "🍇", word: "अंगूर", missingIndex: 2 },
    { emoji: "🥥", word: "नारियल", missingIndex: 3 },
    { emoji: "🍓", word: "स्ट्रॉबेरी", missingIndex: 4 },
    { emoji: "🚪", word: "दरवाजा", missingIndex: 2 },
    { emoji: "🪑", word: "कुर्सी", missingIndex: 3 },
    { emoji: "🛏️", word: "बिस्तर", missingIndex: 2 },
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

    const current = levels[index];

    // setup question
    useEffect(() => {
        if (!current) return;

        const arr = current.word.split("");
        const correct = arr[current.missingIndex];

        arr[current.missingIndex] = "___";
        setDisplayWord(arr);

        // create options (correct + random letters)
        const randomLetters = shuffle(
            "अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह"
                .split("")
        ).slice(0, 3);

        setOptions(shuffle([correct, ...randomLetters]));
    }, [current]);

    const handleAnswer = (opt: string) => {
        if (!current) return;

        const correct = current.word[current.missingIndex];

        if (opt === correct) {
            setMessage("🎉 सही जवाब!");

            const filled = [...displayWord];
            filled[current.missingIndex] = correct;
            setDisplayWord(filled);

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
            setMessage("❌ गलत! फिर कोशिश करो");
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
                       बहुत बढ़िया! 🎉
                    </h1>

                    <p className="text-2xl text-gray-700 mt-4">
                         गेम पूरा 😍
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
                        🔄 फिर खेलो
                    </button>

                </div>
            </main>
    );
  }

    return (

        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative px-5 py-10">

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

            <div
                className="   relative w-full max-w-5xl bg-white/30 backdrop-blur-2xl border-[6px] border-white/40 rounded-[60px] p-8  md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.15)] overflow-hidden text-center " >

                <div className="absolute top-5 left-5 text-4xl animate-pulse">
                    ✨
                </div>

                <div className="absolute top-5 right-5 text-4xl animate-bounce">
                    ⭐
                </div>


                <h1 className="text-4xl md:text-6xl font-black text-blue-600 drop-shadow-lg">
    🧩 गायब अक्षर खेल
</h1>

<p className="text-xl mb-8 md:text-2xl text-gray-700 mt-5 font-bold">
    शब्द पूरा करें 😍
</p>

                <div
                    className="  mt-10  bg-white  rounded-[40px]  sm:py-10 pt-5  shadow-[0_10px_40px_rgba(0,0,0,0.1)]  relative  overflow-hidden" >

                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 opacity-40"></div>

                    <div className="relative text-[100px] sm:text-[140px] animate-bounce">
                        {current.emoji}
                    </div>

                </div>
                {/* word */}
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
                            className="bg-pink-500 text-white text-xl font-bold py-3 rounded-xl hover:scale-105 active:scale-95 transition"
                        >
                            {opt}
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
            ${message !== "❌ गलत! फिर कोशिश करो" ? "text-green-500" : "text-red-500"}
          `}
        >
          {message}
        </div>
      )}

                {/* progress */}
                <div className="mt-6 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-pink-500 transition-all"
                        style={{
                            width: `${levels.length ? (index / levels.length) * 100 : 0}%`,
                        }}
                    />
                </div>

                <div className="text-sm mt-2 text-gray-600">
                    लेवल {index + 1} / {levels.length}
                </div>

                {/* restart */}


                <button
                    onClick={startGame}
                    className=" sm:mt-10 mt-4 sm:px-10  sm:py-5 p-3 rounded-full text-2xl font-black text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl hover:scale-105 active:scale-95 transition-all

        "
                >
                    🔄 रीस्टार्ट
                </button>
            </div>
        </div>
    );
}