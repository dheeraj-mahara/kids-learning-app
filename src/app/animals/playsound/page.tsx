"use client";

import { useState } from "react";

const animals = [
    {
        name: "Dog",
        emoji: "🐶",
        sound: "/sounds/dog.mp3",
        color: "from-yellow-300 to-yellow-500",
        soundText: "Woof Woof!",
    },
    {
        name: "Cow",
        emoji: "🐮",
        sound: "/sounds/cow.mp3",
        color: "from-sky-300 to-sky-500",
        soundText: "Moo Moo!",
    },
    {
        name: "Monkey",
        emoji: "🐵",
        sound: "/sounds/monkey.mp3",
        color: "from-green-300 to-green-500",
        soundText: "Ooh Ooh!",
    },
    {
        name: "Cat",
        emoji: "🐱",
        sound: "/sounds/cat.mp3",
        color: "from-pink-300 to-pink-500",
        soundText: "Meow Meow!",
    },
    {
        name: "Lion",
        emoji: "🦁",
        sound: "/sounds/lion.mp3",
        color: "from-orange-300 to-orange-500",
        soundText: "Roarrr!",
    },
];

export default function AnimalsPage() {
    const [activeAnimal, setActiveAnimal] = useState<string | null>(null);

    const playSound = (sound: string, name: string) => {
        const audio = new Audio(sound);

        audio.play();

        setActiveAnimal(name);

        setTimeout(() => {
            setActiveAnimal(null);
        }, 1500);
    };

    return (
        <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 px-4 py-6 relative">

            {/* Background Blur */}
            <div className="absolute top-10 left-10 w-28 h-28 md:w-40 md:h-40 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute bottom-10 right-10 w-32 h-32 md:w-52 md:h-52 bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

            {/* Heading */}
            <div className="text-center relative z-10">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-pink-600 drop-shadow-lg">
                    Animal Sounds 🐾
                </h1>

                <p className="text-base sm:text-xl md:text-3xl text-gray-700 mt-3 font-semibold">
                    Tap an animal and hear the magic 🎵✨
                </p>
            </div>

            {/* Cards */}
            <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto mt-10 relative z-10">

                {animals.map((animal) => (
                    <button
                        key={animal.name}
                        onClick={() => playSound(animal.sound, animal.name)}
                        className={`
                            bg-gradient-to-br ${animal.color}
                            rounded-3xl
                            p-4 md:p-8
                            shadow-xl
                            transition-all
                            duration-300
                            hover:scale-105
                            active:scale-95
                            border-2
                            border-white/50
                            relative
                            overflow-hidden
                        `}
                    >

                        <div className="absolute inset-0 bg-white/10"></div>

                        {/* Emoji */}
                        <div
                            className={`
                                text-[70px] sm:text-[90px] md:text-[120px]
                                transition-all
                                duration-300
                                relative
                                z-10
                                ${activeAnimal === animal.name
                                    ? "animate-bounce scale-110"
                                    : "animate-pulse"
                                }
                            `}
                        >
                            {animal.emoji}
                        </div>

                        {/* Name */}
                        <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white drop-shadow-md mt-2 relative z-10">
                            {animal.name}
                        </h2>

                        {/* Text */}
                        {activeAnimal !== animal.name ? (
                            <p className="text-sm sm:text-lg text-white font-bold mt-2 relative z-10">
                                Click Me 🎶
                            </p>
                        ) : (
         <p className="text-[12px] sm:text-lg md:text-2xl font-bold text-white mt-2 animate-pulse relative z-10 whitespace-nowrap">
    {animal.soundText}
</p>
                        )}

                        {/* Sound Animation */}
                        {activeAnimal === animal.name && (
                            <div className="absolute sm:bottom-30 bottom-20 left-1/2 -translate-x-1/2 flex gap-1 h-6 z-20">

                                <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
                                <div className="w-1 h-5 bg-white rounded-full animate-pulse"></div>
                                <div className="w-1 h-4 bg-white rounded-full animate-bounce"></div>
                                <div className="w-1 h-6 bg-white rounded-full animate-pulse"></div>

                            </div>
                        )}

                        {/* Sparkle */}
                        <div className="absolute top-2 right-2 text-lg md:text-2xl animate-pulse">
                            ✨
                        </div>

                    </button>
                ))}
            </section>

            {/* Footer */}
            <div className="text-center mt-10 text-lg md:text-2xl font-bold text-pink-600">
                Made with ❤️ for Kids
            </div>
        </main>
    );
}