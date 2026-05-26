"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()} className=" fixed top-4 left-4 z-50 bg-white shadow-lg hover:bg-gray-100 text-black px-4 py-2 rounded-full font-bold transition " >
            ← Back
        </button>
    );
}