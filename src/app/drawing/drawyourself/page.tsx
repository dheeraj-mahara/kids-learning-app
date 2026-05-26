import DrawPage from "@/components/DrawPage";

const cartoons = [
    { name: "Your own art", emoji: "" },
];

export default function DrawCartoons() {
    return <DrawPage title="Draw Yourself 🎨" guideItems={cartoons} bgGradient="from-yellow-300 to-pink-300" />;
}