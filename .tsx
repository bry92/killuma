'use client';
import { useState } from 'react';

export default function KillPage() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("Ready to kill");

  const executeKill = async () => {
    setStatus("Deploying assassins...");
    const res = await fetch('/api/kill', {
      method: 'POST',
      body: JSON.stringify({ prompt, style: "cinematic bloodbath" })
    });
    const data = await res.json();
    setStatus(`Victim generated: ${data.videoUrl}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-6xl font-bold mb-4">KILLUMA</h1>
      <p className="text-xl mb-8">Luma who?</p>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-40 bg-zinc-900 p-6 text-lg"
        placeholder="Describe the victim... e.g. A sleek cyber assassin walking through raining neon Tokyo"
      />
      
      <button 
        onClick={executeKill}
        className="mt-6 px-12 py-6 bg-red-600 hover:bg-red-700 text-2xl font-bold transition"
      >
        EXECUTE
      </button>

      <p className="mt-8 text-xl">{status}</p>
    </div>
  );
}