import DrawPage from "@/components/DrawPage";

const emojy = [
    { name: "Sad", emoji: "😢" },
    { name: "Happy", emoji: "😄" },
    { name: "Angry", emoji: "😡" },
    { name: "Surprised", emoji: "😲" },
    { name: "Laughing", emoji: "😂" },
    { name: "Winking", emoji: "😉" },
    { name: "Crying", emoji: "😭" },
    { name: "Love", emoji: "😍" },
    { name: "Confused", emoji: "😕" },
    { name: "Sleeping", emoji: "😴" }
];

export default function DrawCartoons() {
    return <DrawPage title="Draw Emojy 🎨" guideItems={emojy} bgGradient="from-yellow-300 to-red-300" />;
}