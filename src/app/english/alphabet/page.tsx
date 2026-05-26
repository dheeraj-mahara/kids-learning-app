"use client";

import { useEffect, useState } from "react";

const alphabets = [
    { letter: "A", word: "Apple", emoji: "🍎", color: "from-red-400 to-pink-500" },
    { letter: "B", word: "Ball", emoji: "⚽", color: "from-blue-400 to-cyan-500" },
    { letter: "C", word: "Cat", emoji: "🐱", color: "from-blue-400 to-cyan-500"},
    { letter: "D", word: "Dog", emoji: "🐶", color: "from-green-400 to-emerald-500" },
    { letter: "E", word: "Elephant", emoji: "🐘", color: "from-gray-400 to-gray-600" },
    { letter: "F", word: "Fish", emoji: "🐟", color: "from-sky-400 to-blue-600" },
    { letter: "G", word: "Goat", emoji: "🐐", color: "from-lime-400 to-green-500" },
    { letter: "H", word: "Horse", emoji: "🐴", color: "from-amber-400 to-orange-500" },
    { letter: "I", word: "Ice Cream", emoji: "🍦", color: "from-pink-300 to-rose-500" },
    { letter: "J", word: "Jug", emoji: "🫗", color: "from-cyan-400 to-blue-500" },
    { letter: "K", word: "Kite", emoji: "🪁", color: "from-violet-400 to-fuchsia-500" },
    { letter: "L", word: "Lion", emoji: "🦁", color: "from-orange-400 to-red-500" },
    { letter: "M", word: "Monkey", emoji: "🐒", color: "from-yellow-500 to-amber-700" },
    { letter: "N", word: "Nest", emoji: "🪺", color: "from-stone-400 to-yellow-700" },
    { letter: "O", word: "Orange", emoji: "🍊", color: "from-orange-400 to-yellow-500" },
    { letter: "P", word: "Parrot", emoji: "🦜", color: "from-green-400 to-lime-500" },
    { letter: "Q", word: "Queen", emoji: "👑", color: "from-yellow-400 to-yellow-600" },
    { letter: "R", word: "Rabbit", emoji: "🐰", color: "from-pink-300 to-purple-400" },
    { letter: "S", word: "Sun", emoji: "☀️", color: "from-yellow-300 to-orange-500" },
    { letter: "T", word: "Tiger", emoji: "🐯", color: "from-orange-400 to-red-500" },
    { letter: "U", word: "Umbrella", emoji: "☂️", color: "from-indigo-400 to-blue-600" },
    { letter: "V", word: "Violin", emoji: "🎻", color: "from-amber-500 to-red-500" },
    { letter: "W", word: "Watch", emoji: "⌚", color: "from-slate-400 to-slate-700" },
    { letter: "X", word: "Xylophone", emoji: "🎹", color: "from-fuchsia-400 to-pink-500" },
    { letter: "Y", word: "Yak", emoji: "🐃", color: "from-neutral-500 to-stone-700" },
    { letter: "Z", word: "Zebra", emoji: "🦓", color: "from-gray-300 to-gray-700" },
];

export default function AlphabetPage() {
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedWord, setSelectedWord] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("");

    const speakLetter = (
        letter: string,
        word: string
    ) => {
        window.speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();

        msg.lang = "en-US";
        msg.rate = 0.9;
        msg.pitch = 1.4;

        msg.text = `${letter} for ${word}`;

        window.speechSynthesis.speak(msg);
    };

    useEffect(() => {
        if (!selected) return;

        const timer = setTimeout(() => {
            setSelected(null);
            setSelectedWord("");
            setSelectedEmoji("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [selected]);

    return (
        <main className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative px-5 py-10">

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

            {/* header */}
            <div className="text-center relative z-10">

                <h1 className="text-5xl md:text-7xl font-black text-blue-600 drop-shadow-lg">
                    🔤 Alphabet World
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 mt-5 font-bold">
                    Tap a letter and hear the magic 🎧✨
                </p>

            </div>

            {/* main card */}
            <div
                className="  relative  mt-12  bg-white/30  backdrop-blur-2xl  border-[6px]  border-white/40  rounded-[50px]  p-4  md:p-10  shadow-[0_20px_80px_rgba(0,0,0,0.15)]  max-w-7xl  mx-auto  overflow-hidden"
            >

                {/* decorative stars */}
                <div className="absolute top-5 left-5 text-4xl animate-pulse">
                    ✨
                </div>

                <div className="absolute top-5 right-5 text-4xl animate-bounce">
                    ⭐
                </div>

                {/* alphabet grid */}
                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">

                    {alphabets.map((item) => (
                        <button
                            key={item.letter}
                            onClick={() => {
                                setSelected(item.letter);
                                setSelectedWord(item.word);
                                setSelectedEmoji(item.emoji);

                                speakLetter(item.letter, item.word);
                            }}
                            className={` relative overflow-hidden rounded-[35px] sm:p-5 p-1 
                          sm:h-52 bg-gradient-to-br ${item.color} shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                       hover:scale-110 hover:-translate-y-2 active:scale-95 transition-all duration-300
                          border-[5px] border-white/40 group
              `}
                        >

                            {/* glow */}
                            <div className="absolute inset-0 bg-white/10"></div>

                            {/* emoji bg */}
                            <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-20 group-hover:scale-125 transition duration-500">
                                {item.emoji}
                            </div>

                            {/* letter */}
                            <div className="relative z-10 flex flex-col items-center justify-center h-full">

                                <div className="text-6xl md:text-7xl font-black text-white drop-shadow-lg">
                                    {item.letter}
                                </div>

                                <div className="text-lg font-bold text-white mt-4 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                    {item.word}
                                </div>

                            </div>

                            {/* sparkle */}
                            <div className="absolute top-3 right-3 text-2xl animate-pulse">
                                ✨
                            </div>

                        </button>
                    ))}

                </section>

            </div>

            {/* popup */}
            {selected && (
                <div
                    className="  fixed  bottom-8  left-1/2  -translate-x-1/2  z-50  bg-white/90  backdrop-blur-xl  border-[5px]  border-white  rounded-[40px]  sm:px-10 p-3  sm:py-6   shadow-[0_20px_60px_rgba(0,0,0,0.2)]  animate-bounce"      >

                    <div className="flex items-center sm:gap-6 gap-4">

                        <div className="sm:text-7xl text-5xl">
                            {selectedEmoji}
                        </div>

                        <div>

                            <div className="text-4xl sm:text-6xl  font-black text-pink-500">
                                {selected}
                            </div>

                            <div className="text-2xl font-bold text-gray-700">
                                {selectedWord}
                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* bottom text */}
            <div className="text-center mt-12 text-2xl font-black text-pink-600">
                Learn With Fun 🎈
            </div>

        </main>
    );
}