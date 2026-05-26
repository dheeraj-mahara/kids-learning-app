"use client";

import { useEffect, useRef, useState } from "react";

const songs = [
  `
  Baby Shark doo doo doo doo doo doo
  Baby Shark doo doo doo doo doo doo
  Baby Shark!
  `,

  `
  Twinkle twinkle little star,
  How I wonder what you are,
  Up above the world so high,
  Like a diamond in the sky.
  `,

  `
  Johny Johny yes papa,
  Eating sugar no papa,
  Telling lies no papa,
  Open your mouth ha ha ha!
  `,

  `
  Lakdi ki kathi,
  Kathi pe ghoda,
  Ghode ki dum pe jo maara hathauda.
  `,

  `
  A B C D E F G,
  H I J K L M N O P,
  Q R S,
  T U V,
  W X Y and Z.
  `,

  `
  The wheels on the bus go round and round,
  Round and round,
  Round and round,
  All through the town.
  `,

  `
  Old MacDonald had a farm,
  E I E I O,
  And on his farm he had a cow,
  E I E I O.
  `,

  `
  Humpty Dumpty sat on a wall,
  Humpty Dumpty had a great fall,
  All the king's horses and all the king's men,
  Couldn't put Humpty together again.
  `,

  `
  Baa baa black sheep,
  Have you any wool?
  Yes sir yes sir,
  Three bags full.
  `,

  `
  Chanda mama door ke,
  Pue pakaye boor ke,
  Aap khaaye thali mein,
  Munne ko de pyali mein.
  `,
];

const funnyReplies = [
  "Hahaha 😹",
  "You are so smart 🌟",
  "Wowww 😍",
  "Let's sing together 🎵",
  "Yayyyy 🥳",
  "Amazing voice 🎤",
];

export default function TalkingGame() {
  const [message, setMessage] = useState("Hello Kids 😸");
  const [listening, setListening] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [catMood, setCatMood] = useState("😸");

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {

          const text = event.results[0][0].transcript;

          setMessage(text);

          setCatMood("😻");

          speakText(text);

          setTimeout(() => {

            const funny =
              funnyReplies[
                Math.floor(Math.random() * funnyReplies.length)
              ];

            setMessage(funny);

            speakText(funny);

            setCatMood("😹");

          }, 2500);
        };

        recognition.onend = () => {
          setListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const speakText = (text: string) => {

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.pitch = 1.8;
    speech.rate = 0.85;
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  const startTalking = () => {

    if (recognitionRef.current) {

      setListening(true);

      setMessage("I am listening 👂");

      setCatMood("🙀");

      recognitionRef.current.start();
    }
  };

  const singRandomSong = () => {

    const randomSong =
      songs[Math.floor(Math.random() * songs.length)];

    setCurrentSong(randomSong);

    setCatMood("🎤");

    const text = `Now I will sing ${randomSong}`;

    speakText(text);

    setMessage(`🎵 ${randomSong}`);
  };

  const sayABCD = () => {

    setCatMood("🤓");

    speakText(
      "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
    );

    setMessage("🔤 ABCD Time");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-yellow-100 to-sky-200 relative flex items-center justify-center px-5 py-10">

      {/* floating items */}
      <div className="absolute top-10 left-5 text-7xl animate-bounce">
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

      {/* main card */}
      <div
        className="
          relative
          w-full
          max-w-5xl
          bg-white/30
          backdrop-blur-2xl
          border-[6px]
          border-white/40
          rounded-[60px]
          p-8
          md:p-12
          shadow-[0_20px_80px_rgba(0,0,0,0.15)]
          overflow-hidden
          text-center
        "
      >

        {/* decorative stars */}
        <div className="absolute top-5 left-5 text-4xl animate-pulse">
          ✨
        </div>

        <div className="absolute top-5 right-5 text-4xl animate-bounce">
          ⭐
        </div>

        {/* title */}
        <h1 className="text-5xl md:text-7xl font-black text-pink-600 drop-shadow-lg">
          Talking Cat 😸
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 mt-5 font-bold">
          Talk • Sing • Learn 🎤
        </p>

        {/* cat area */}
        <div
          className="
            mt-10
            bg-white
            rounded-[50px]
            py-10
            px-6
            shadow-[0_10px_40px_rgba(0,0,0,0.1)]
            relative
            overflow-hidden
          "
        >

          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 opacity-40"></div>

          {/* cat */}
          <div className="relative z-10">

            <div
              className={`
                text-[160px]
                transition-all
                duration-300
                ${
                  listening
                    ? "animate-bounce scale-110"
                    : "animate-pulse"
                }
              `}
            >
              {catMood}
            </div>

            {/* sound waves */}
            {listening && (
              <div className="flex justify-center items-end gap-2 mt-4 h-10">

                <div className="w-3 h-5 bg-pink-500 rounded-full animate-bounce"></div>

                <div className="w-3 h-10 bg-pink-500 rounded-full animate-pulse"></div>

                <div className="w-3 h-6 bg-pink-500 rounded-full animate-bounce"></div>

                <div className="w-3 h-12 bg-pink-500 rounded-full animate-pulse"></div>

                <div className="w-3 h-7 bg-pink-500 rounded-full animate-bounce"></div>

              </div>
            )}

          </div>

        </div>

        {/* message */}
        <div
          className="
            mt-8
            bg-white
            rounded-[35px]
            shadow-[inset_0_5px_20px_rgba(0,0,0,0.1)]
            min-h-[120px]
            flex
            items-center
            justify-center
            px-6
          "
        >

          <p className="text-2xl md:text-4xl font-black text-purple-600">
            {message}
          </p>

        </div>

        {/* song */}
        {currentSong && (
          <div className="mt-5 text-2xl font-black text-pink-600 animate-pulse">
            🎵 Singing: {currentSong}
          </div>
        )}

        {/* buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

          {/* talk */}
          <button
            onClick={startTalking}
            className="
              py-6
              rounded-[30px]
              font-black
              text-white
              text-2xl
              bg-gradient-to-br
              from-purple-500
              to-fuchsia-500
              shadow-[0_10px_30px_rgba(168,85,247,0.4)]
              hover:scale-105
              active:scale-95
              transition-all
            "
          >
            {listening
              ? "🎤 Listening..."
              : "🎤 Talk With Cat"}
          </button>

          {/* song */}
          <button
            onClick={singRandomSong}
            className="
              py-6
              rounded-[30px]
              font-black
              text-white
              text-2xl
              bg-gradient-to-br
              from-pink-500
              to-rose-500
              shadow-[0_10px_30px_rgba(244,63,94,0.4)]
              hover:scale-105
              active:scale-95
              transition-all
            "
          >
            🎵 Random Song
          </button>

          {/* abcd */}
          <button
            onClick={sayABCD}
            className="
              py-6
              rounded-[30px]
              font-black
              text-white
              text-2xl
              bg-gradient-to-br
              from-blue-500
              to-cyan-500
              shadow-[0_10px_30px_rgba(59,130,246,0.4)]
              hover:scale-105
              active:scale-95
              transition-all
            "
          >
            🔤 Say ABCD
          </button>

        </div>

        {/* bottom text */}
        <div className="mt-10 text-2xl font-black text-pink-600">
          Learn • Talk • Enjoy 🎈
        </div>

      </div>
    </main>
  );
}