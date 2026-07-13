import { PromptInput } from "@/components/dashboard/PromptInput";

export default function GeneratePage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Generate AI Images
        </h1>

        <p className="mt-2 text-slate-400">
          Describe your imagination and let AI
          create stunning artwork.
        </p>

      </div>

      <PromptInput />

    </div>
  );
}