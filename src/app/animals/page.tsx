import ActivityCard from "@/components/ActivityCard";
import Link from "next/link";

const activities = [
  {
    title: "Play Animal Sounds",
    emoji: "🐶",
    color: "bg-yellow-300",
    link: "/animals/playsound",
  },
  {
    title: "Guess the Animal",
    emoji: "🦁",
    color: "bg-pink-300",
    link: "/animals/guesssound",
  },
  {
    title: "Animal Quiz",
    emoji: "🧠",
    color: "bg-green-300",
    link: "/animals/quiz",
  },
  {
    title: "Animal Pair Match Game",
    emoji: "🃏",
    color: "bg-purple-300",
    link: "/animals/memory",
  },
  {
  title: "Animal Baby Match",
  emoji: "🐣",
  color: "bg-orange-300",
  link: "/animals/baby-match",
},

];

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-yellow-50 px-6 py-10">

      {/* Heading */}
      <div className="text-center">
        <h1 className="sm:text-6xl text-4xl font-extrabold text-pink-600">
          Fun Animal Activities 🐾
        </h1>

        <p className="text-2xl text-gray-600 mt-4">
          Pick an activity and have fun learning about animals! 😍
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