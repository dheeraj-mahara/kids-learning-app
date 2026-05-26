"use client";

import { useState, useEffect } from "react";

const animals = [
  { name: "Dog", emoji: "🐶", sound: "/sounds/dog.mp3", soundText: "Woof Woof!" },
  { name: "Cat", emoji: "🐱", sound: "/sounds/cat.mp3", soundText: "Meow Meow!" },
  { name: "Lion", emoji: "🦁", sound: "/sounds/lion.mp3", soundText: "Roarrr!" },
  { name: "Cow", emoji: "🐮", sound: "/sounds/cow.mp3", soundText: "Moo Moo!" },
  { name: "Monkey", emoji: "🐵", sound: "/sounds/monkey.mp3", soundText: "Ooh Ooh!" },
];

export default function GuessSoundPage() {
  const [options, setOptions] = useState<typeof animals>([]);
  const [correctAnimal, setCorrectAnimal] = useState<typeof animals[0] | null>(null);
  const [guessResult, setGuessResult] = useState<string | null>(null);

  const newRound = () => {
    const shuffled = [...animals].sort(() => Math.random() - 0.5);
    const correct = shuffled[0];
    setCorrectAnimal(correct);
    setOptions(shuffled.slice(0, 3).sort(() => Math.random() - 0.5));

    const audio = new Audio(correct.sound);
    audio.play();
    setGuessResult(null);
  };

  useEffect(() => {
    newRound();
  }, []);

  const handleGuess = (animalName: string) => {
    if (!correctAnimal) return;

    if (animalName === correctAnimal.name) {
      setGuessResult("correct");
    } else {
      setGuessResult("wrong");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-600 text-center">
        🐾 Guess the Animal Sound! 🎵
      </h1>
      <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 text-center">
        Listen carefully and tap the correct animal!
      </p>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 mt-10">
        {options.map((animal) => (
          <button
            key={animal.name + Math.random()} // refresh emoji each round
            onClick={() => handleGuess(animal.name)}
            className={`text-6xl sm:text-7xl md:text-8xl p-6 sm:p-8 rounded-3xl shadow-xl transition-transform hover:scale-125 focus:outline-none ${
              guessResult
                ? animal.name === correctAnimal?.name
                  ? "bg-green-300"
                  : guessResult === "wrong" && animal.name !== correctAnimal?.name
                  ? "bg-red-200"
                  : "bg-yellow-200"
                : "bg-yellow-200"
            }`}
          >
            {animal.emoji}
          </button>
        ))}
      </section>

      {guessResult && correctAnimal && (
        <div className="mt-8 sm:mt-10 text-center animate-fadeIn">
          {guessResult === "correct" ? (
            <p className="text-2xl sm:text-3xl md:text-4xl text-green-600 font-bold animate-pulse">
              🎉 Yay! It was {correctAnimal.name}: {correctAnimal.soundText} 🎉
            </p>
          ) : (
            <p className="text-2xl sm:text-3xl md:text-4xl text-red-600 font-bold animate-pulse">
              ❌ Oops! The correct answer was {correctAnimal.name}: {correctAnimal.soundText}
            </p>
          )}

          <button
            onClick={newRound}
            className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg sm:text-xl hover:bg-pink-600 transition transform hover:scale-105"
          >
            Play Again 🔁
          </button>
        </div>
      )}
    </main>
  );
}