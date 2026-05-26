"use client";

import { useState, useEffect } from "react";

export const animalQuestions = [
    { question: "Which animal says 'Meow'?", options: ["Dog🐶", "Cat🐱", "Lion🦁"], answer: "Cat🐱", emoji: "🐱" },
    { question: "Which animal says 'Woof'?", options: ["Dog🐶", "Sheep🐑", "Monkey🐵"], answer: "Dog🐶", emoji: "🐶" },
    { question: "Which animal is called the king of the jungle?", options: ["Lion🦁", "Tiger🐅", "Elephant🐘"], answer: "Lion🦁", emoji: "🦁" },
    { question: "Which animal says 'Moo'?", options: ["Cow🐮", "Sheep🐑", "Dog🐶"], answer: "Cow🐮", emoji: "🐮" },
    { question: "Which animal is known for climbing trees?", options: ["Monkey🐵", "Lion🦁", "Cat🐱"], answer: "Monkey🐵", emoji: "🐵" },
    { question: "Which animal has a long trunk?", options: ["Elephant🐘", "Lion🦁", "Dog🐶"], answer: "Elephant🐘", emoji: "🐘" },
    { question: "Which animal says 'Baa'?", options: ["Sheep🐑", "Cow🐮", "Cat🐱"], answer: "Sheep🐑", emoji: "🐑" },
    { question: "Which animal loves bananas?", options: ["Monkey🐵", "Dog🐶", "Lion🦁"], answer: "Monkey🐵", emoji: "🐵" },
    { question: "Which animal hops and has a pouch?", options: ["Kangaroo🦘", "Elephant🐘", "Cat🐱"], answer: "Kangaroo🦘", emoji: "🦘" },
    { question: "Which animal has stripes?", options: ["Tiger🐅", "Lion🦁", "Dog🐶"], answer: "Tiger🐅", emoji: "🐅" },
    { question: "Which animal can fly?", options: ["Bird🐦", "Dog🐶", "Cat🐱"], answer: "Bird🐦", emoji: "🐦" },
    { question: "Which animal has a shell?", options: ["Turtle🐢", "Dog🐶", "Cat🐱"], answer: "Turtle🐢", emoji: "🐢" },
    { question: "Which animal says 'Oink'?", options: ["Pig🐷", "Cow🐮", "Cat🐱"], answer: "Pig🐷", emoji: "🐷" },
    { question: "Which animal is the tallest?", options: ["Giraffe🦒", "Elephant🐘", "Lion🦁"], answer: "Giraffe🦒", emoji: "🦒" },
    { question: "Which animal lives in water?", options: ["Fish🐟", "Dog🐶", "Lion🦁"], answer: "Fish🐟", emoji: "🐟" },
    { question: "Which animal can change colors?", options: ["Chameleon", "Dog🐶", "Cat🐱"], answer: "Chameleon", emoji: "🦎" },
    { question: "Which animal has big ears?", options: ["Elephant🐘", "Cat🐱", "Lion🦁"], answer: "Elephant🐘", emoji: "🐘" },
    { question: "Which animal is nocturnal?", options: ["Owl🦉", "Dog🐶", "Cow🐮"], answer: "Owl🦉", emoji: "🦉" },
    { question: "Which animal is known for its black-and-white stripes?", options: ["Zebra🦓", "Tiger🐅", "Dog🐶"], answer: "Zebra🦓", emoji: "🦓" },
    { question: "Which animal builds a web?", options: ["Spider🕷️", "Dog🐶", "Cat🐱"], answer: "Spider🕷️", emoji: "🕷️" },
    { question: "Which animal is very slow?", options: ["Tortoise🐢", "Lion🦁", "Dog🐶"], answer: "Tortoise", emoji: "🐢" },
    { question: "Which animal has a mane?", options: ["Lion🦁", "Dog🐶", "Cat🐱"], answer: "Lion🦁", emoji: "🦁" },
    { question: "Which animal is known for hopping?", options: ["Frog🐸", "Cat🐱", "Dog🐶"], answer: "Frog🐸", emoji: "🐸" },
    { question: "Which animal quacks?", options: ["Duck🦆", "Dog🐶", "Cat🐱"], answer: "Duck🦆", emoji: "🦆" },
    { question: "Which animal has antlers?", options: ["Deer🦌", "Lion🦁", "Dog🐶"], answer: "Deer🦌", emoji: "🦌" },
    { question: "Which animal has a pouch for its babies?", options: ["Kangaroo🦘", "Lion🦁", "Dog🐶"], answer: "Kangaroo🦘", emoji: "🦘" },
    { question: "Which animal swims in the sea?", options: ["Dolphin🐬", "Dog🐶", "Cat🐱"], answer: "Dolphin", emoji: "🐬" },
    { question: "Which animal has a long neck?", options: ["Giraffe🦒", "Dog🐶", "Cat🐱"], answer: "Giraffe🦒", emoji: "🦒" },
    { question: "Which animal rolls in mud?", options: ["Pig🐷", "Dog🐶", "Cat🐱"], answer: "Pig🐷", emoji: "🐷" },
    { question: "Which animal is very colorful and can fly?", options: ["Parrot🦜", "Dog🐶", "Cat🐱"], answer: "Parrot🦜", emoji: "🦜" },
    { question: "Which animal has stripes and roars?", options: ["Tiger🐅", "Cat🐱", "Dog🐶"], answer: "Tiger🐅", emoji: "🐅" },
];

export const getRandomQuestions = () => {
    const shuffled = [...animalQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
};

export default function AnimalQuizPage() {
    const [questions, setQuestions] = useState<typeof animalQuestions>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [quizFinished, setquizFinished] = useState<boolean>(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setQuestions(getRandomQuestions());
    }, []);

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (option: string) => {
        setSelectedOption(option);

        if (option === currentQuestion.answer) {
            setScore((prev) => prev + 1);
        }
    };

    const nextQuestion = () => {
        setSelectedOption(null);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setquizFinished(true)
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 px-4 py-8 flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-600 text-center">
                🐾 Quick Animal Quiz! 🐾
            </h1>

            <div className="mt-8 bg-white p-6 rounded-3xl shadow-xl w-full max-w-md text-center animate-fadeIn">

                <div className="relative text-6xl mb-4">{currentQuestion.emoji}     <p className="absolute top-0 right-0  text-gray-700 text-lg sm:text-xl">
                    Score: <span className="font-bold">{score}</span>
                </p></div>
                <p className="text-xl sm:text-2xl font-bold mb-6">{currentQuestion.question}</p>


                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            disabled={!!selectedOption}
                            className={`py-3 rounded-2xl text-lg font-semibold transition transform hover:scale-105 ${selectedOption
                                ? option === currentQuestion.answer
                                    ? "bg-green-300"
                                    : option === selectedOption
                                        ? "bg-red-200"
                                        : "bg-yellow-200"
                                : "bg-yellow-200 hover:bg-yellow-300"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                
                {quizFinished ? (
                    <button
                        onClick={() => {
                            setScore(0);
                            setQuestions(getRandomQuestions());
                            setCurrentIndex(0);
                            setSelectedOption(null);
                            setquizFinished(false);
                        }}
                        className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg hover:bg-pink-600 transition transform hover:scale-105 cursor-pointer"
                    >
                        Restart Quiz 🔁
                    </button>
                ) : (
                    <button
                        onClick={nextQuestion}
                        disabled={!selectedOption}
                        className={`mt-6 px-6 py-3 rounded-full font-bold text-lg transition transform hover:scale-105 ${selectedOption
                            ? "bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
                            : "bg-pink-300 text-gray-200 cursor-not-allowed"
                            }`}
                    >
                        Next Question 🔁
                    </button>
                )}
            </div>





        </main>
    );
}