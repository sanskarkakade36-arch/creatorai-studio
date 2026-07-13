"use client";

import { Sparkles } from "lucide-react";

export function AuthIllustration() {
  return (
    <section className="hidden lg:flex relative overflow-hidden items-center justify-center bg-gradient-to-br from-violet-700 via-indigo-700 to-sky-600 text-white">

      <div className="absolute inset-0 opacity-20">
        <div className="absolute h-64 w-64 rounded-full bg-white blur-3xl top-10 left-10" />
        <div className="absolute h-72 w-72 rounded-full bg-purple-400 blur-3xl bottom-10 right-10" />
      </div>

      <div className="relative z-10 max-w-lg px-12">

        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-xl bg-white/20 p-3">
            <Sparkles className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              CreatorAI Studio
            </h1>

            <p className="text-white/80">
              AI Image Generation Platform
            </p>
          </div>
        </div>

        <h2 className="text-5xl font-bold leading-tight">
          Turn your ideas into beautiful AI artwork.
        </h2>

        <p className="mt-6 text-lg text-white/80">
          Generate realistic images, anime art,
          product photography, logos, concept art,
          avatars and much more using powerful AI
          models.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-10">

          <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
            <h3 className="font-semibold">
              50+ AI Styles
            </h3>

            <p className="text-sm text-white/70 mt-2">
              Photorealistic, Anime,
              Cinematic, Pixel Art
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
            <h3 className="font-semibold">
              Lightning Fast
            </h3>

            <p className="text-sm text-white/70 mt-2">
              Generate images within seconds.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}