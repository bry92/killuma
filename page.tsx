'use client';
import { useState } from 'react';
import PromptEditor from '@/components/PromptEditor';
import VideoPlayer from '@/components/VideoPlayer';

export default function Generate() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (prompt: string, image?: File) => {
    setIsGenerating(true);
    const form = new FormData();
    form.append('prompt', prompt);
    if (image) form.append('image', image);

    const res = await fetch('/api/generate', { method: 'POST', body: form });
    const data = await res.json();
    setVideoUrl(data.videoUrl);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Forge Your Reality</h1>
      <PromptEditor onGenerate={handleGenerate} isLoading={isGenerating} />
      {videoUrl && <VideoPlayer url={videoUrl} />}
    </div>
  );
}