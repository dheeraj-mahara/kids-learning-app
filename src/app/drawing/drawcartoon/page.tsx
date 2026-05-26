import DrawPage from "@/components/DrawPage";

const cartoons = [
    { name: "Mickey", emoji: "🐭" },
    { name: "SpongeBob", emoji: "🧽" },
    { name: "Tom", emoji: "🐱" },
    { name: "Jerry", emoji: "🐭" },
];

export default function DrawCartoons() {
    return <DrawPage title="Draw Cartoons 🎨" guideItems={cartoons} bgGradient="from-yellow-300 to-pink-300" />;
}