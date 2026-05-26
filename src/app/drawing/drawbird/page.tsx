
import DrawPage from "@/components/DrawPage";

const birds = [
    { name: "Parrot", emoji: "🦜" },
    { name: "Duck", emoji: "🦆" },
    { name: "Owl", emoji: "🦉" },
    { name: "Eagle", emoji: "🦅" },
    { name: "Swan", emoji: "🦢" },
    { name: "Penguin", emoji: "🐧" },
    { name: "Chicken", emoji: "🐔" },
    { name: "Rooster", emoji: "🐓" },
    { name: "Flamingo", emoji: "🦩" },
    { name: "Turkey", emoji: "🦃" },
    { name: "Dove", emoji: "🕊️" },
];

export default function DrawAnimals() {
    return <DrawPage title="Draw Bird 🎨" guideItems={birds} bgGradient="from-sky-200 to-blue-200" />;
}