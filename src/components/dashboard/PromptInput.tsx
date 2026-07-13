"use client";

import { useState } from "react";
import Image from "next/image";
import { Wand2, ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { imageService } from "@/services/image";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quality, setQuality] = useState("HD");

  const [loading, setLoading] = useState(false);

  const [generatedImage, setGeneratedImage] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleGenerate() {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await imageService.generateImage({
          prompt,
          style,
          aspectRatio,
          quality,
        });

      /**
       * Your backend may return:
       *
       * imageUrl
       * OR
       * images[]
       *
       * This supports both.
       */

      if (response.imageUrl) {
        setGeneratedImage(response.imageUrl);
      } else if (
        response.images &&
        response.images.length > 0
      ) {
        setGeneratedImage(response.images[0]);
      } else {
        throw new Error(
          "No image returned."
        );
      }

      toast.success(
        "Image generated successfully."
      );
    } catch (err: any) {
      setError(
        err.message ||
          "Generation failed."
      );

      toast.error(
        err.message ||
          "Generation failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Prompt */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <label className="mb-3 block text-lg font-semibold text-white">
          Prompt
        </label>

        <textarea
          rows={6}
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Describe the image you want to generate..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-violet-500"
        />

      </div>

      {/* Settings */}

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Style
          </label>

          <select
            value={style}
            onChange={(e) =>
              setStyle(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          >
            <option>Realistic</option>
            <option>Anime</option>
            <option>Fantasy</option>
            <option>Digital Art</option>
            <option>Cyberpunk</option>
            <option>3D Render</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Aspect Ratio
          </label>

          <select
            value={aspectRatio}
            onChange={(e) =>
              setAspectRatio(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          >
            <option>1:1</option>
            <option>16:9</option>
            <option>9:16</option>
            <option>4:3</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Quality
          </label>

          <select
            value={quality}
            onChange={(e) =>
              setQuality(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          >
            <option>HD</option>
            <option>Ultra HD</option>
            <option>4K</option>
          </select>

        </div>

      </div>

      {/* Generate */}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Wand2 size={20} />

        {loading
          ? "Generating..."
          : "Generate Image"}
      </button>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Preview */}

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8">

        {generatedImage ? (

          <div className="space-y-6">

            <Image
              src={generatedImage}
              alt="Generated Image"
              width={1024}
              height={1024}
              className="mx-auto rounded-xl"
            />

            <div className="flex justify-center">

              <a
                href={generatedImage}
                download
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Download Image
              </a>

            </div>

          </div>

        ) : (

          <div className="flex flex-col items-center justify-center py-12">

            <ImageIcon
              size={60}
              className="text-slate-600"
            />

            <h3 className="mt-5 text-xl font-semibold text-white">
              Image Preview
            </h3>

            <p className="mt-2 text-slate-400">
              Your generated AI image will appear here.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}