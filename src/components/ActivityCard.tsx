import Link from "next/link";

type Props = {
  title: string;
  emoji: string;
  color: string;
  link: string;
};

export default function ActivityCard({
  title,
  emoji,
  color,
  link,
}: Props) {
  return (
    <Link
      href={link}
      className={`
        relative
        overflow-hidden
        rounded-[50px]
        p-3
        h-[360px]
        bg-gradient-to-br
        ${color}
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        hover:scale-[1.04]
        hover:-translate-y-3
        active:scale-95
        transition-all
        duration-300
        border-[6px]
        border-white/40
        group
        flex
        items-center
        justify-center
      `}
    >

      {/* background glow */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* glass shine */}
      <div className="absolute top-0 left-[-100%] w-[120%] h-full bg-white/20 rotate-12 group-hover:left-[120%] transition-all duration-1000"></div>

      {/* background emoji */}
      <div className="absolute inset-0 flex items-center justify-center text-[220px] opacity-10 group-hover:scale-125 transition duration-500">
        {emoji}
      </div>

      {/* floating circles */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>

      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      {/* sparkle */}
      <div className="absolute top-5 right-5 text-4xl animate-pulse">
        ✨
      </div>

      <div className="absolute top-5 left-5 text-3xl animate-bounce">
        ⭐
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">

        {/* emoji */}
        <div
          className="
            text-[100px]
            drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]
            group-hover:scale-110
            group-hover:rotate-6
            transition-all
            duration-300
          "
        >
          {emoji}
        </div>

        {/* title */}
        <h2
          className="
            text-3xl
            md:text-4xl
            font-black
            text-white
            drop-shadow-lg
            mt-2
            leading-tight
          "
        >
          {title}
        </h2>

        {/* button */}
        <div
          className="
            mt-4
            bg-white/20
            backdrop-blur-md
            border
            border-white/30
            px-8
            py-4
            rounded-full
            text-white
            text-xl
            font-black
            shadow-lg
            group-hover:scale-105
            transition
          "
        >
          Play Now 🚀
        </div>

      </div>

      {/* bottom glow */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-black/10 blur-2xl"></div>

    </Link>
  );
}