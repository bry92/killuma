'use client';

import { useState } from 'react';

export default function Killuma() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("Ready to kill.");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isKilling, setIsKilling] = useState(false);

  const executeKill = async () => {
    if (!prompt.trim()) return;
    
    setIsKilling(true);
    setStatus("Deploying assassins...");

    try {
      const res = await fetch('/api/kill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setStatus("Victim eliminated.");
      } else {
        setStatus("Something survived...");
      }
    } catch (e) {
      setStatus("Kill failed. Try again.");
    }
    
    setIsKilling(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-7xl font-black tracking-tighter mb-2 text-red-500">KILLUMA</h1>
        <p className="text-xl mb-12 text-zinc-400">Luma is dead. Long live the slaughter.</p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the victim... 
A cyberpunk samurai slicing through a raining neon street, dramatic camera pan, cinematic lighting"
          className="w-full h-52 bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-lg placeholder-zinc-500 focus:outline-none focus:border-red-600 resize-none"
        />

        <button
          onClick={executeKill}
          disabled={isKilling || !prompt.trim()}
          className="mt-8 w-full py-8 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-3xl font-bold tracking-wider transition-all active:scale-95 rounded-2xl"
        >
          {isKilling ? "EXECUTING..." : "EXECUTE KILL"}
        </button>

        <p className="text-center mt-6 text-zinc-500 text-sm">{status}</p>

        {videoUrl && (
          <div className="mt-12">
            <h3 className="text-xl mb-4">Victim Rendered:</h3>
            <video src={videoUrl} controls className="w-full rounded-2xl border border-zinc-800" />
          </div>
        )}
      </div>
    </div>
  );
}