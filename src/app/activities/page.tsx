import Link from "next/link";

const activities = [
  {
    title: "Animal Sounds",
    emoji: "🐶",
    color: "from-yellow-300 to-orange-400",
    link: "/animals",
  },

  {
    title: "Fun Math",
    emoji: "🧮",
    color: "from-pink-300 to-rose-500",
    link: "/math",
  },

  {
    title: "Hindi Learning",
    emoji: "📚",
    color: "from-blue-300 to-cyan-500",
    link: "/hindi",
  },

  {
    title: "English Learning",
    emoji: "📖",
    color: "from-red-300 to-pink-500",
    link: "/english",
  },

  {
    title: "Drawing Game",
    emoji: "🎨",
    color: "from-green-300 to-emerald-500",
    link: "/drawing",
  },

  // {
  //   title: "talking Game",
  //   emoji: "😸",
  //   color: "from-purple-300 to-fuchsia-500",
  //   link: "/talking",
  // },
];

export default function ActivitiesPage() {
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

      {/* top heading */}
      <div className="text-center relative z-10">

        <div className="inline-block bg-white/60 backdrop-blur-xl px-8 py-4 rounded-full shadow-xl mb-6">
          <span className="text-2xl md:text-3xl font-black text-pink-600">
            🎮 Kids Learning Zone
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-pink-600 drop-shadow-lg">
          Fun Activities 🎉
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 mt-5 font-bold">
          Choose your favorite game 😍
        </p>

      </div>

      {/* main activities card */}
      <div
        className="
          relative
          mt-14
          max-w-7xl
          mx-auto
          bg-white/25
          backdrop-blur-2xl
          border-[6px]
          border-white/40
          rounded-[60px]
          p-3
          md:p-10
          shadow-[0_20px_80px_rgba(0,0,0,0.15)]
          overflow-hidden
        "
      >

        {/* decorative stars */}
        <div className="absolute top-5 left-5 text-4xl animate-pulse">
          ✨
        </div>

        <div className="absolute top-5 right-5 text-4xl animate-bounce">
          ⭐
        </div>

        {/* cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {activities.map((item) => (
            <Link
              href={item.link}
              key={item.title}
              className={`
                relative
                overflow-hidden
                rounded-[40px]
                p-6
                h-[320px]
                bg-gradient-to-br
                ${item.color}
                shadow-[0_15px_40px_rgba(0,0,0,0.15)]
                hover:scale-105
                hover:-translate-y-2
                active:scale-95
                transition-all
                duration-300
                border-[5px]
                border-white/40
                group
              `}
            >

              {/* glow */}
              <div className="absolute inset-0 bg-white/10"></div>

              {/* background emoji */}
              <div className="absolute inset-0 flex items-center justify-center text-[180px] opacity-10 group-hover:scale-125 transition duration-500">
                {item.emoji}
              </div>

              {/* sparkle */}
              <div className="absolute top-4 right-4 text-3xl animate-pulse">
                ✨
              </div>

              {/* content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">

                <div className="text-[100px] drop-shadow-lg group-hover:scale-110 transition duration-300">
                  {item.emoji}
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mt-4">
                  {item.title}
                </h2>

                <div className="mt-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white text-lg font-black">
                  Play Now 🚀
                </div>

              </div>

            </Link>
          ))}

        </section>

      </div>

      {/* bottom text */}
      <div className="text-center mt-10 text-2xl font-black text-pink-600">
        Learn • Play • Enjoy 🎈
      </div>

    </main>
  );
}