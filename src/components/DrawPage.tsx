"use client";

import { useRef, useState } from "react";

export default function DrawPage({ title, guideItems, bgGradient }: {
    title: string;
    guideItems: { name: string; emoji: string }[];
    bgGradient: string;
}) {
    const svgRef = useRef<any>(null);

    const colors = [
        "#ff1493", // Pink
        "#ff0000", // Red
        "#00bfff", // Sky Blue
        "#32cd32", // Green
        "#ff8c00", // Orange
        "#8a2be2", // Purple
        "#000000", // Black
        "#ffd700", // Gold

        // Extra Cute Colors 🎨
        "#ff69b4", // Hot Pink
        "#ffb6c1", // Light Pink
        "#87cefa", // Light Sky Blue
        "#00fa9a", // Mint Green
        "#7cfc00", // Lime
        "#ffa500", // Soft Orange
        "#ff6347", // Tomato
        "#40e0d0", // Turquoise
        "#9370db", // Medium Purple
        "#ba55d3", // Orchid
        "#00ced1", // Dark Turquoise
        "#1e90ff", // Dodger Blue
        "#adff2f", // Green Yellow
        "#f08080", // Light Coral
        "#ffc0cb", // Baby Pink
        "#fff44f", // Bright Yellow
        "#c0c0c0", // Silver
        "#8b4513", // Brown
        "#ffffff", // White
    ];

    const brushSizes = [4, 8, 12, 18];

    const [selectedItem, setSelectedItem] = useState(guideItems[0]);
    const [lines, setLines] = useState<any[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [brushSize, setBrushSize] = useState(8);
    const [showGuide, setShowGuide] = useState(true);
    const [stars, setStars] = useState(0);

    const getPoint = (e: any) => {
        const rect = svgRef.current.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const startDrawing = (e: any) => {
        setIsDrawing(true);
        const point = getPoint(e);

        setLines((prev) => [...prev, { points: [point], color: selectedColor, size: brushSize }]);
    };

    const draw = (e: any) => {
        if (!isDrawing) return;
        const point = getPoint(e);


        setLines((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].points.push(point);
            return updated;
        });
    };

    const stopDrawing = () => setIsDrawing(false);
    const clearCanvas = () => setLines([]);
    const undoLast = () => setLines(prev => prev.slice(0, -1));
    const doneDrawing = () => { setStars(stars + 1); setCompleted(true); };

    return (
        <main className={`min-h-screen overflow-auto p-4 bg-gradient-to-br ${bgGradient}`}>            {/* Header */}
            <div className="absolute top-10 left-5 text-5xl animate-bounce opacity-20">
                🌈
            </div>

            <div className="absolute top-20 right-10 text-5xl animate-pulse opacity-20">
                ⭐
            </div>

            <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-20">
                🎨
            </div>

            <div className="text-center">

                <div className="inline-block bg-white/70 backdrop-blur-xl rounded-[35px] px-8 py-6 shadow-2xl border-4 border-white">

                    <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
                        {title} 🐾
                    </h1>

                    <p className="mt-3 text-lg sm:text-2xl font-bold text-gray-700">
                        Fun Drawing Game For Kids ✨
                    </p>

                </div>

                {/* Stars */}
                <div className="mt-5 inline-flex items-center gap-3 bg-yellow-300 px-6 py-3 rounded-full shadow-xl">
                    <span className="text-3xl">⭐</span>

                    <span className="font-extrabold text-2xl text-orange-700">
                        {stars} Stars
                    </span>
                </div>
            </div>


            {/* Selector */}
            <div className="max-w-6xl mx-auto mt-8  grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                {guideItems.map(item => (
                    <button key={item.name} onClick={() => { setSelectedItem(item); clearCanvas(); }}
                        className="bg-white/70 backdrop-blur-xl rounded-[30px] sm:p-4 p-1 shadow-2xl border-4 border-white hover:scale-105 active:scale-95 transition"
                    >
                        <div className="sm:text-5xl text-3xl">{item.emoji}</div>
                        <div className="sm:mt-2 font-extrabold sm:text-lg text-gray-700">{item.name}</div>
                    </button>
                ))}
            </div>

            {/* Drawing Card */}
            <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden border-[8px] border-white">
                {/* Toolbar */}
                <div className="p-4 sm:p-6 bg-white/20 border-b-4  border-white">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-6xl">{selectedItem.emoji}</div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-800">Draw {selectedItem.name}</h2>
                            <p className="font-semibold text-gray-600">Use colors & brushes 🖍️</p>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="mb-4">
                        <h3 className="font-extrabold text-gray-700 mb-2 text-lg">🎨 Choose Color</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {colors.map(color => (
                                <button key={color} onClick={() => setSelectedColor(color)}
                                    style={{ backgroundColor: color }}
                                    className={`sm:w-10 w-8 sm:h-10 h-8 rounded-full border-2 transition hover:scale-110 ${selectedColor === color ? "border-black scale-110" : "border-white"}`} />
                            ))}
                        </div>
                    </div>

                    {/* Brush */}
                    <div>
                        <h3 className="font-extrabold text-gray-700 mb-2 text-lg">🖌️ Brush Size</h3>
                        <div className="flex justify-center gap-4">
                            {brushSizes.map(size => (
                                <button key={size} onClick={() => setBrushSize(size)}
                                    style={{ width: size * 3, height: size * 3 }}
                                    className={`bg-white rounded-full flex items-center justify-center border-4 transition hover:scale-110 ${brushSize === size ? "border-pink-500" : "border-white"}`}>
                                    <div className="bg-black rounded-full" style={{ width: size, height: size }} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Draw Area */}
                <div className="relative">
                    {showGuide && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
                            <div className="text-[220px] sm:text-[320px]">{selectedItem.emoji}</div>
                        </div>
                    )}
                    <svg ref={svgRef}
                        className="w-full h-[320px] sm:h-[500px] touch-none relative z-10"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={(e: any) => startDrawing(e.touches[0])}
                        onTouchMove={(e: any) => draw(e.touches[0])}
                        onTouchEnd={stopDrawing}>
                        {lines.map((line, i) => (
                            <polyline key={i} fill="none" stroke={line.color} strokeWidth={line.size} strokeLinecap="round" strokeLinejoin="round"
                                points={line.points.map((p: any) => `${p.x},${p.y}`).join(" ")} />
                        ))}
                    </svg>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4  mb-8">
                    <button onClick={clearCanvas} className="bg-red-500 text-white sm:px-7 px-3 sm:py-4 py-2 rounded-3xl sm:font-extrabold font-bold text-xl shadow-2xl hover:scale-105 transition">🧹 Clear</button>
                    <button onClick={undoLast} className="bg-blue-500 text-white px-3 sm:px-7 ms:py-4 py-2 rounded-3xl sm:font-extrabold font-bold text-xl shadow-2xl hover:scale-105 transition">↩️ Undo</button>
                    <button onClick={() => setShowGuide(!showGuide)} className="bg-purple-500 text-white px-3 sm:px-7 sm:py-4 py-2 rounded-3xl sm:font-extrabold font-bold  text-xl shadow-2xl hover:scale-105 transition">👀 Guide</button>
                    <button onClick={doneDrawing} className="bg-green-500 text-white px-3 sm:px-7 sm:py-4 py-2 rounded-3xl sm:font-extrabold font-bold  text-xl shadow-2xl hover:scale-105 transition">✅ Done</button>
                </div>

                {/* Completed Modal */}
                {completed && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="text-center">
                            <div className="inline-block bg-white/70 backdrop-blur-xl px-8 py-5 rounded-[30px] shadow-xl border-4 border-white">
                                <h3 className="text-3xl font-extrabold text-pink-600">Great Job! 🎨✨</h3>
                                <p className="mt-2 text-gray-700 font-semibold text-lg">Draw • Learn • Have Fun</p>
                                <button onClick={() => { clearCanvas(); setCompleted(false); }} className="mt-4 bg-sky-500 text-white px-7 py-4 rounded-3xl font-extrabold text-xl shadow-2xl hover:scale-105 transition">🧹 Draw Again</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}