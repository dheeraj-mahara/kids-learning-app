import ActivityCard from "@/components/ActivityCard";
import Link from "next/link";

const activities = [
  {
    title: "Draw an Animal",
    emoji: "🐘",
    color: "bg-orange-300",
    link: "/drawing/drawanimal",
  },
  {
    title: "Sketch a Bird",
    emoji: "🦜",
    color: "bg-sky-300",
    link: "/drawing/drawbird",
  },
  {
    title: "Draw a Emojy ",
    emoji: "🥰",
    color: "bg-yellow-300",
    link: "/drawing/drawemojy",
  },
  {
    title: "Draw a Landscape",
    emoji: "🏞️",
    color: "bg-purple-300",
    link: "/drawing/drawlandscape",
  },
  {
    title: "Draw yourself",
    emoji: "🎨",
    color: "bg-pink-300",
    link: "/drawing/drawyourself",
  },
];

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-yellow-50 px-6 py-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-pink-600">
          Fun Drawing Activities 🎨
        </h1>
        <p className="text-2xl text-gray-600 mt-4">
          Pick an activity and have fun drawing! 😍
        </p>
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
        {activities.map((item) => (
        <ActivityCard
          key={item.title}
          title={item.title}
          emoji={item.emoji}
          color={item.color}
          link={item.link}
        />
      ))}
      </section>
    </main>
  );
}