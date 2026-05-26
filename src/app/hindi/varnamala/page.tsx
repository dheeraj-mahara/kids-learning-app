"use client";

import { useEffect, useState } from "react";

const swar = [
  { letter: "अ", word: "अनार", emoji: "🍎", color: "from-red-400 to-pink-500" },
  { letter: "आ", word: "आम", emoji: "🥭", color: "from-blue-400 to-cyan-500" },
  { letter: "इ", word: "इमली", emoji: "🌿", color: "from-gray-400 to-gray-600" },
  { letter: "ई", word: "ईख", emoji: "🎋", color: "from-orange-400 to-yellow-500" },
  { letter: "उ", word: "उल्लू", emoji: "🦉", color: "from-lime-400 to-green-500" },
  { letter: "ऊ", word: "ऊंट", emoji: "🐫", color: "from-amber-400 to-orange-500" },
  { letter: "ए", word: "एक", emoji: "1️⃣", color: "from-pink-300 to-rose-500" },
  { letter: "ऐ", word: "ऐनक", emoji: "👓", color: "from-indigo-400 to-blue-600" },
  { letter: "ओ", word: "ओखली", emoji: "📖", color: "from-violet-400 to-fuchsia-500" },
  { letter: "औ", word: "औरत", emoji: "👩", color: "from-orange-400 to-red-500" },
];

const vyanjan = [
  { letter: "क", word: "कमल", emoji: "🌸", color: "from-green-400 to-emerald-500" },
  { letter: "ख", word: "खरगोश", emoji: "🐰", color: "from-pink-300 to-rose-500" },
  { letter: "ग", word: "गमला", emoji: "🥃", color: "from-violet-400 to-fuchsia-500" },
  { letter: "घ", word: "घर", emoji: "🏠", color: "from-stone-400 to-yellow-700" },
  { letter: "च", word: "चम्मच", emoji: "🥄", color: "from-orange-400 to-yellow-500" },
  { letter: "ज", word: "जहाज", emoji: "🚢", color: "from-green-400 to-lime-500" },
  { letter: "ट", word: "टमाटर", emoji: "🍅", color: "from-yellow-400 to-yellow-600" },
  { letter: "ड", word: "डमरू", emoji: "🥁", color: "from-pink-300 to-purple-400" },
  { letter: "त", word: "तरबूज", emoji: "🍉", color: "from-yellow-300 to-orange-500" },
  { letter: "द", word: "दूध", emoji: "🥛", color: "from-orange-400 to-red-500" },
  { letter: "प", word: "पतंग", emoji: "🪁", color: "from-indigo-400 to-blue-600" },
  { letter: "म", word: "मकान", emoji: "🏡", color: "from-amber-500 to-red-500" },
  { letter: "य", word: "यज्ञ", emoji: "🔥", color: "from-slate-400 to-slate-700" },
  { letter: "र", word: "रसगुल्ला", emoji: "🍥", color: "from-fuchsia-400 to-pink-500" },
  { letter: "ल", word: "लड्डू", emoji: "🍬", color: "from-neutral-500 to-stone-700" },
  { letter: "स", word: "सूरज", emoji: "☀️", color: "from-gray-300 to-gray-700" },
];

export default function VarnamalaPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const speakLetter = (letter: string, word: string) => {
    window.speechSynthesis.cancel(); // ⬅️ stops lag/queue

    const msg = new SpeechSynthesisUtterance();

    msg.lang = "hi-IN";
    msg.rate = 1.1;   // faster for kids
    msg.pitch = 1.2;  // more fun voice

    msg.text = `${letter}, ${letter} से ${word}`;

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
  const Card = ({ item }: any) => (


    <button
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
              `}    >
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Emoji background */}
      <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-20 group-hover:scale-125 transition duration-500">
        {item.emoji}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">

        <div className="text-6xl md:text-7xl font-black text-white drop-shadow-lg">
          {item.letter}
        </div>

        <div className="text-lg font-bold text-white mt-4 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm">
          {item.word}
        </div>

      </div>

      <div className="absolute top-3 right-3 text-2xl animate-pulse">
        ✨
      </div>
    </button>

  );

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative px-5 py-10">
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
      <div className="text-center relative z-10">

        <h1 className="text-5xl md:text-7xl font-extrabold text-pink-600 drop-shadow-lg">
          📖 हिंदी वर्णमाला
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mt-5 font-bold">
          अक्षर दबाओ और शब्द सुनो 🎧✨
        </p>
      </div>

      {/* Swar */}

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

        <section >
          <h2 className="text-4xl my-4 font-extrabold text-purple-600 text-center">
            🔴 स्वर
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
            {swar.map((item) => (
              <Card key={item.letter} item={item} />
            ))}
          </div>
        </section>

        {/* Vyanjan */}
        <section className="mt-16">
          <h2 className="text-3xl mb-5 font-bold text-green-600 text-center">
            🟢 व्यंजन
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
            {vyanjan.map((item) => (
              <Card key={item.letter} item={item} />
            ))}
          </div>
        </section>
      </div>

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
    </main>
  );
}