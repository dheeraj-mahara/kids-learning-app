import ActivityCard from "@/components/ActivityCard";
import Link from "next/link";

const activities = [
    {
        title: "English Alphabet Game",
        emoji: "🔤",
        color: "bg-yellow-300",
        link: "/english/alphabet",
    },
    {
        title: "Word & Image Match",
        emoji: "🐶",
        color: "bg-pink-300",
        link: "/english/word-image",
    },
    {
        title: "See Picture & Make Word",
        emoji: "🖼️",
        color: "bg-blue-300",
        link: "/english/joinword",
    },
    {
        title: "Missing Letter Game",
        emoji: "✏️",
        color: "bg-orange-300",
        link: "/english/missing-letter",
    },
];

export default function EnglishActivitiesPage() {
    return (
        <main className="min-h-screen bg-blue-50 px-6 py-10">

            <div className="text-center">
                <h1 className="sm:text-6xl text-4xl font-extrabold text-blue-600">
                    Fun English Learning Games
                </h1>

                <p className="text-2xl text-gray-600 mt-4">
                    Play and learn English with fun 😍
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