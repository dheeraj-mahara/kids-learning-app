"use client";

import { useEffect, useState } from "react";

const animals = [
  "🐶",
  "🐱",
  "🦁",
  "🐸",
  "🐼",
  "🐰",
  "🦊",
  "🐻",
];

const shuffledCards = [...animals, ...animals]
  .sort(() => Math.random() - 0.5)
  .map((emoji, index) => ({
    id: index,
    emoji,
    flipped: false,
    matched: false,
  }));


export default function AnimalMemoryGame() {
  const [cards, setCards] = useState(shuffledCards);
  

  const [selectedCards, setSelectedCards] = useState<any[]>([]);
const [isRestarting, setIsRestarting] = useState(false);
  const [moves, setMoves] = useState(0);

  const [stars, setStars] = useState(0);

  const [gameWon, setGameWon] = useState(false);

  const flipCard = (card: any) => {
    if (
      card.flipped ||
      card.matched ||
      selectedCards.length === 2
    ) {
      return;
    }

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );

    setCards(updatedCards);

    setSelectedCards((prev) => [...prev, card]);

    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;

      if (first.emoji === second.emoji) {
        setTimeout(() => {
          const updated = cards.map((c) =>
            c.emoji === first.emoji
              ? { ...c, matched: true }
              : c
          );

          setCards(updated);

          setSelectedCards([]);

          setStars((prev) => prev + 1);

          // Win Check
          if (
            updated.every((card) => card.matched)
          ) {
            setGameWon(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const updated = cards.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, flipped: false }
              : c
          );

          setCards(updated);

          setSelectedCards([]);
        }, 900);
      }
    }
  }, [selectedCards]);

  const restartGame = () => {
  setIsRestarting(true);

  setCards((prev) =>
    prev.map((c) => ({
      ...c,
      flipped: true,
    }))
  );

  setTimeout(() => {
    const shuffled = [...animals, ...animals]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));

    setCards(shuffled);
    setSelectedCards([]);
    setMoves(0);
    setStars(0);
    setGameWon(false);

    setIsRestarting(false);
  }, 500);
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-sky-200 to-yellow-100 overflow-hidden p-4">

      <div className="absolute top-10 left-5 text-5xl animate-bounce opacity-20">
        🐾
      </div>

      <div className="absolute top-20 right-10 text-5xl animate-pulse opacity-20">
        🌈
      </div>

      <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-20">
        ⭐
      </div>

      {/* Header */}
      <div className="text-center">

        <div className="inline-block bg-white/70 backdrop-blur-xl px-8 py-6 rounded-[35px] shadow-2xl border-4 border-white">

          <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Animal Memory Game 🧠🐾
          </h1>

          <p className="mt-3 text-lg sm:text-2xl font-bold text-gray-700">
            Match the cute animals ✨
          </p>

        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">

          <div className="bg-yellow-300 px-6 py-3 rounded-full shadow-xl font-extrabold text-xl text-orange-700">
            ⭐ Stars: {stars}
          </div>

          <div className="bg-blue-300 px-6 py-3 rounded-full shadow-xl font-extrabold text-xl text-blue-800">
            🎯 Moves: {moves}
          </div>

        </div>

      </div>

      {/* Game Board */}
      <div className="max-w-5xl mx-auto mt-10">

        <div className="grid grid-cols-4  gap-2 sm:gap-5">

          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => flipCard(card)}
              className={`
                h-16 sm:h-30
                rounded-[30px]
                shadow-2xl
                transition-all
                duration-300
                transform
                hover:scale-105
                active:scale-95
                border-3 sm:border-4
                border-white
                flex
                items-center
                justify-center
                text-4xl sm:text-5xl
                sm:text-6xl
                font-bold
                ${
                  card.flipped || card.matched
                    ? "bg-white rotate-y-180"
                    : "bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400"
                }
                 ${isRestarting ? "scale-20 opacity-60" : ""}
              `}
            >
              {card.flipped || card.matched ? (
                card.emoji
              ) : (
                "❓"
              )}
            </button>
          ))}

        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-10">

        <button
          onClick={restartGame}
          className="
            bg-gradient-to-r
            from-green-400
            to-green-600
            text-white
            px-8
            py-4
            rounded-3xl
            font-extrabold
            text-2xl
            shadow-2xl
            hover:scale-105
            transition
          "
        >
          🔄 Restart Game
        </button>

      </div>

      {/* Win Popup */}
      {gameWon && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-[40px] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.3)] text-center max-w-md w-full border-[8px] border-yellow-300 ">

            <div className="text-7xl animate-bounce">
              🎉
            </div>

            <h2 className="text-4xl font-extrabold text-pink-600 mt-4">
              You Won!
            </h2>

            <p className="mt-3 text-xl font-bold text-gray-700">
              Amazing Memory Little Champ 🏆
            </p>

            <div className="mt-5 flex justify-center gap-4 text-2xl animate-bounce">
              ⭐ {stars}
              🎯 {moves}
            </div>

            <button
              onClick={restartGame}
              className="
                mt-8
                bg-gradient-to-r
                from-pink-500
                to-orange-500
                text-white
                px-8
                py-4
                rounded-3xl
                font-extrabold
                text-xl
                shadow-xl
                hover:scale-105
                transition
              "
            >
              Play Again 🎮
            </button>

          </div>

        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-12">

        <div className="inline-block bg-white/70 backdrop-blur-xl px-8 py-5 rounded-[30px] shadow-xl border-4 border-white">

          <h3 className="text-3xl font-extrabold text-purple-600">
            Learn & Play 🧠✨
          </h3>

          <p className="mt-2 text-gray-700 font-semibold text-lg">
            Fun memory game for kids 🐾
          </p>

        </div>

      </div>

    </main>
  );
}