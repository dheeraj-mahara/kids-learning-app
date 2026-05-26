import ActivityCard from "@/components/ActivityCard";
import Link from "next/link";

const activities = [
  {
    title: "Calculation Game",
    emoji: "🧮",
    color: "bg-orange-300",
    link: "/math/calculation", 
  },
  {
    title: "Shape Game",
    emoji: "🔺",
    color: "bg-yellow-300",
    link: "/math/shapes",
  },
  {
    title: "Counting Game",
    emoji: "🔢",
    color: "bg-pink-300",
    link: "/math/counting",
  },
  {
    title: "Math Puzzle",
    emoji: "🧩",
    color: "bg-red-300",
    link: "/math/puzzle",
  },
  {
    title: "Time & Clock Game",
    emoji: "⏰",
    color: "bg-blue-300",
    link: "/math/time",
  },
  {
    title: "Money & Coins Game",
    emoji: "💰",
    color: "bg-green-300",
    link: "/math/money",
  },
];

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-yellow-50 px-6 py-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="sm:text-6xl text-5xl font-extrabold text-pink-600">
          Fun Math Activities 🎨
        </h1>
        <p className="text-2xl text-gray-600 mt-4">
          Pick an activity and have fun in math ! 😍
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