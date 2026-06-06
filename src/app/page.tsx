"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="font-unageo flex flex-col items-center justify-center min-h-screen bg-white text-purple-900 p-8 text-center">
      <h1 className="text-6xl md:text-7xl mb-4 text-purple-700">
        Out of Office
      </h1>
      <p className="text-xl md:text-2xl font-light mb-8 max-w-xl leading-relaxed">
        Welcome to your Next.js + TypeScript application configured with
        Tailwind CSS v4.
      </p>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="bg-purple-900 hover:bg-purple-700 text-white text-base font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
      >
        Count is: {count}
      </button>

      <h1 className="font-sans">Heading</h1>
      <p className="font-cormorant">Body text</p>
    </main>
  );
}
