import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Login | CreatorAI Studio",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#0B0B12]">

      {/* LEFT PANEL */}

      <section className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-violet-700 via-violet-600 to-blue-600 p-16 text-white">

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-white/20 p-3">
              <Sparkles className="h-8 w-8" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                CreatorAI Studio
              </h1>

              <p className="text-white/80">
                AI Image Generation Platform
              </p>
            </div>

          </div>

          <div className="mt-20">

            <h2 className="text-6xl font-bold leading-tight">
              Turn your ideas
              <br />
              into beautiful AI
              <br />
              artwork.
            </h2>

            <p className="mt-8 max-w-xl text-2xl text-white/80">
              Generate realistic images, anime art,
              product photography, logos,
              concept art and much more.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
            <h3 className="text-2xl font-bold">
              50+ AI Styles
            </h3>

            <p className="mt-2 text-white/80">
              Photorealistic, Anime,
              Pixel Art
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
            <h3 className="text-2xl font-bold">
              Lightning Fast
            </h3>

            <p className="mt-2 text-white/80">
              Generate images in seconds.
            </p>
          </div>

        </div>

      </section>

      {/* RIGHT PANEL */}

      <section className="flex items-center justify-center p-8">

        <div className="w-full max-w-lg">
          <LoginForm />
        </div>

      </section>

    </main>
  );
}