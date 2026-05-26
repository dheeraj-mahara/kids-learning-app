
import DrawPage from "@/components/DrawPage";

const landscape = [
    { name: "House", emoji: "🏡" },
    { name: "Mountain", emoji: "⛰️" },
    { name: "Tree", emoji: "🌳" },
    { name: "Sun", emoji: "🌞" },
    { name: "Cloud", emoji: "☁️" },
    { name: "Rainbow", emoji: "🌈" },
    { name: "Cactus", emoji: "🌵" },
    { name: "Desert", emoji: "🏜️" },
    { name: "Beach", emoji: "🏖️" },
    { name: "Volcano", emoji: "🌋" }
];

export default function DrawAnimals() {
    return <DrawPage title="Draw landscape 🎨" guideItems={landscape} bgGradient="from-green-200 to-green-700" />;
}