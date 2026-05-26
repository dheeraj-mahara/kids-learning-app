import ActivityCard from "@/components/ActivityCard";
import Link from "next/link";

const activities = [
  {
    title: "हिंदी वर्णमाला खेल",
    emoji: "📖",
    color: "bg-yellow-300",
    link: "/hindi/varnamala",
  },
  {
    title: "शब्द और चित्र मिलान",
    emoji: "🐄",
    color: "bg-pink-300",
    link: "/hindi/word-image",
  },
  {
    title: "चित्र देखो शब्द बनाओ",
    emoji: "🖼️",
    color: "bg-pink-300",
    link: "/hindi/joinword",
  },
 
  {
    title: "छूटा हुआ अक्षर",
    emoji: "✏️",
    color: "bg-orange-300",
    link: "/hindi/missing-letter",
  },
];

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-yellow-50 px-6 py-10">

      <div className="text-center">
        <h1 className="sm:text-6xl text-4xl font-extrabold text-pink-600">
          हिंदी सीखने के मज़ेदार खेल 
        </h1>

        <p className="text-2xl text-gray-600 mt-4">
          खेलो और मज़े के साथ हिंदी सीखो 😍
        </p>
      </div>

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