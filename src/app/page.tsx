"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {

  const [kidName, setKidName] = useState("");

  const [deferredPrompt, setDeferredPrompt] =
    useState<any>(null);

  const [showInstall, setShowInstall] =
    useState(false);

  const router = useRouter();

  // install app
  useEffect(() => {

    const handler = (e: any) => {

      e.preventDefault();

      setDeferredPrompt(e);

      setShowInstall(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };

  }, []);

  // check login
  useEffect(() => {

    const name = localStorage.getItem("kidName");

    if (!name) {
      router.push("/login");
    }

  }, [router]);

  // get name
  useEffect(() => {

    const savedName =
      localStorage.getItem("kidName");

    if (savedName) {
      setKidName(savedName);
    }

  }, []);

  // install function
  const installApp = async () => {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);

    setShowInstall(false);
  };

  return (
    <main
      className="  min-h-screen  overflow-hidden  relative  bg-gradient-to-br  from-pink-300  via-yellow-100  to-sky-200  flex  items-center  justify-center  px-4  py-10" >

      {/* floating emojis */}
      <div className="absolute top-5 left-5 text-6xl animate-bounce">
        ☁️
      </div>

      <div className="absolute top-10 right-8 text-6xl animate-pulse">
        🌈
      </div>

      <div className="absolute bottom-10 left-10 text-6xl animate-bounce">
        ⭐
      </div>

      <div className="absolute bottom-10 right-10 text-7xl animate-pulse">
        🎈
      </div>

      <div className="absolute top-1/2 left-5 text-5xl opacity-30 animate-spin">
        🌟
      </div>

      <div className="absolute top-1/3 right-5 text-5xl opacity-30 animate-bounce">
        🦄
      </div>

      {/* main card */}
      <div
        className="  relative  w-full  max-w-5xl  rounded-[50px]  bg-white/30  backdrop-blur-2xl  border-[6px]  border-white/40  shadow-[0_20px_80px_rgba(0,0,0,0.15)]  overflow-hidden  p-6  md:p-12">

        {/* glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-pink-300/40 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl"></div>

        {/* content */}
        <div className="relative z-10 flex flex-col items-center text-center">

         

          {/* welcome */}
          <div>

            <h1
              className="  text-5xl  sm:text-6xl  md:text-8xl  font-black  text-pink-600  drop-shadow-lg  leading-tight"
            >
              Hii 😍 {kidName} 
            </h1>

            <p
              className="  mt-6  text-xl  sm:text-2xl  md:text-4xl  font-bold  text-gray-700  leading-relaxed"
            >
              Welcome to
              <span className="text-pink-600">
                {" "}FunLearn 🎈
              </span>

              <br />

              Let’s Play & Learn Together ✨
            </p>

          </div>

          {/* fun boxes */}
          <div
            className="  grid  grid-cols-2  md:grid-cols-4  gap-4  mt-10  w-full  max-w-4xl"
          >

            <div className="bg-white/50 rounded-3xl p-5 shadow-xl">
              <div className="text-5xl">🐶</div>
              <p className="font-black text-lg mt-2">
                Animals
              </p>
            </div>

            <div className="bg-white/50 rounded-3xl p-5 shadow-xl">
              <div className="text-5xl">🔤</div>
              <p className="font-black text-lg mt-2">
                ABCD
              </p>
            </div>

            <div className="bg-white/50 rounded-3xl p-5 shadow-xl">
              <div className="text-5xl">🎨</div>
              <p className="font-black text-lg mt-2">
                Drawing
              </p>
            </div>

            <div className="bg-white/50 rounded-3xl p-5 shadow-xl">
              <div className="text-5xl">🎵</div>
              <p className="font-black text-lg mt-2">
                Songs
              </p>
            </div>

          </div>

          {/* start button */}
          <button
            onClick={() =>
              router.push("/activities")
            }
            className="  mt-12  relative  overflow-hidden  px-6  md:px-16  py-5  md:py-7  rounded-full  bg-gradient-to-r  from-pink-500  via-orange-400  to-yellow-400  text-white  text-2xl  md:text-4xl  font-black  shadow-[0_10px_40px_rgba(236,72,153,0.4)]  hover:scale-105  active:scale-95  transition-all  duration-300"
          >

            <div className="absolute inset-0 bg-white/20"></div>

            <span className="relative z-10">
              Let’s Start 🚀
            </span>

          </button>

          {/* bottom text */}
          <div className="mt-8 text-lg md:text-2xl font-bold text-pink-600 animate-pulse">
            Learn • Play • Enjoy 🌈
          </div>

        </div>

      </div>

      {/* install button */}
      {
        showInstall && (
          <button
            onClick={installApp}
            className="  fixed  bottom-5  right-5  z-50  px-6  py-4  rounded-full  bg-gradient-to-r  from-pink-500  to-orange-400  text-white  text-lg  md:text-xl  font-black  shadow-[0_10px_30px_rgba(0,0,0,0.25)]  hover:scale-105  active:scale-95  transition-all  animate-bounce" >
            📲 Install App
          </button>
        )
      }

    </main>
  );
}