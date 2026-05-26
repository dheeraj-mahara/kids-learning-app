"use client";

import { useEffect, useState } from "react";

type ClockQuestion = {
    hour: number;
    minute: number;
    period: "AM" | "PM";
    options: string[];
    answer: string;
};

export default function ClockGame() {
    const [q, setQ] = useState<ClockQuestion | null>(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [message, setMessage] = useState("");

    const successMessages = ["🎉 Perfect!", "🌟 Great Job!", "🚀 Super Smart!", "🥳 Well Done!"];

    const pad = (n: number) => (n < 10 ? "0" + n : n);

    const generateQuestion = () => {
        const hour = Math.floor(Math.random() * 12) + 1;
        const minuteOptions = [0, 15, 30, 45];
        const minute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
        const period = Math.random() > 0.5 ? "AM" : "PM";

        const answer = `${hour}:${pad(minute)} ${period}`;

        const options = new Set<string>();
        options.add(answer);

        while (options.size < 3) {
            const h = Math.floor(Math.random() * 12) + 1;
            const m = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
            const p = Math.random() > 0.5 ? "AM" : "PM";
            options.add(`${h}:${pad(m)} ${p}`);
        }

        setQ({
            hour,
            minute,
            period,
            answer,
            options: Array.from(options).sort(() => Math.random() - 0.5),
        });
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const checkAnswer = (opt: string) => {
        if (!q) return;

        if (opt === q.answer) {
            setScore((s) => {
                const newScore = s + 1;

                if (newScore % 5 === 0) {
                    setLevel((l) => l + 1);
                }

                return newScore;
            });

            setMessage(successMessages[Math.floor(Math.random() * successMessages.length)]);

            setTimeout(() => {
                setMessage("");
                generateQuestion();
            }, 1200);
        } else {
            setMessage("❌ Try Again!");
            setTimeout(() => setMessage(""), 800);
        }
    };

    // CLOCK HAND ANGLES
    const getHourAngle = () => {
        if (!q) return 0;
        return ((q.hour % 12) + q.minute / 60) * 30;
    };

    const getMinuteAngle = () => {
        if (!q) return 0;
        return q.minute * 6;
    };

    if (!q) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-4">
            <div className="mx-auto max-w-2xl">

                <h1 className="text-center text-4xl font-extrabold text-blue-600">
                    ⏰ Clock Learning Game
                </h1>

                {/* SCORE */}
                <div className="mt-5 flex justify-center gap-4">
                    <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2  shadow border-4 border-yellow-300">
                        ⭐ Score: {score}
                    </div>
                    <div className="rounded-full bg-white sm:px-6 px-2 sm:py-3 py-2  shadow border-4 border-pink-300">
                        📈 Level: {level}
                    </div>
                </div>

                {/* ANALOG CLOCK */}
                <div className="mt-8 relative flex justify-center">
                    <svg width="220" height="220" viewBox="0 0 200 200" className="bg-white rounded-full shadow-2xl border-4 border-blue-300">

                        {/* Clock face */}
                        <circle cx="100" cy="100" r="90" stroke="#333" strokeWidth="4" fill="#f9fafb" />

                        {/* Numbers */}
                        {[...Array(12)].map((_, i) => {
                            const angle = (i + 1) * 30;
                            const x = 100 + 70 * Math.sin((angle * Math.PI) / 180);
                            const y = 100 - 70 * Math.cos((angle * Math.PI) / 180);
                            return (
                                <text key={i} x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="bold">
                                    {i + 1}
                                </text>
                            );
                        })}

                        {/* Hour hand */}
                        <line
                            x1="100"
                            y1="100"
                            x2={100 + 40 * Math.sin((getHourAngle() * Math.PI) / 180)}
                            y2={100 - 40 * Math.cos((getHourAngle() * Math.PI) / 180)}
                            stroke="black"
                            strokeWidth="5"
                        />

                        {/* Minute hand */}
                        <line
                            x1="100"
                            y1="100"
                            x2={100 + 60 * Math.sin((getMinuteAngle() * Math.PI) / 180)}
                            y2={100 - 60 * Math.cos((getMinuteAngle() * Math.PI) / 180)}
                            stroke="red"
                            strokeWidth="3"
                        />

                        {/* Center dot */}
                        <circle cx="100" cy="100" r="4" fill="black" />
                    </svg>
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
            ${message !== "❌ Try Again!" ? "text-green-500" : "text-red-500"}
          `}
        >
          {message}
        </div>
      )}
                </div>
                {/* QUESTION */}
                <div className="mt-6 text-center text-xl font-bold text-gray-700">
                    What time is shown on the clock?
                </div>

                {/* OPTIONS */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    {q.options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => checkAnswer(opt)}
                            className="rounded-3xl bg-blue-500 p-4 text-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95"
                        >
                            {opt}
                        </button>
                    ))}

                </div>


                <div className="mt-6 text-center text-lg font-bold text-gray-700">
                    🧠 Learn Analog Clock + AM/PM Easily!
                </div>
            </div>
        </div>
    );
}