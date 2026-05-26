
import DrawPage from "@/components/DrawPage";

const animals = [
    { name: "Dog", emoji: "🐶" },
    { name: "Cat", emoji: "🐱" },
    { name: "Lion", emoji: "🦁" },
    { name: "Rabbit", emoji: "🐰" },
    { name: "Frog", emoji: "🐸" },
    { name: "Panda", emoji: "🐼" },
    { name: "Tiger", emoji: "🐯" },
    { name: "Bear", emoji: "🐻" },
    { name: "Koala", emoji: "🐨" },
    { name: "Monkey", emoji: "🐵" },
    { name: "Elephant", emoji: "🐘" },
    { name: "Horse", emoji: "🐴" },
    { name: "Sheep", emoji: "🐑" },
    { name: "Pig", emoji: "🐷" },
    { name: "Cow", emoji: "🐮" },
];

export default function DrawAnimals() {
    return <DrawPage title="Draw Animals 🎨" guideItems={animals} bgGradient="from-yellow-200 to-orange-200" />;
}