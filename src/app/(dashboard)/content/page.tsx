"use client";

import Header from "@/components/layout/Header";
import { useState } from "react";
import {
  Sparkles, FileText, Camera, Briefcase, ThumbsUp, X as Twitter,
  Copy, Download, RefreshCw, ChevronDown, Wand2, Hash, AtSign,
} from "lucide-react";

const CONTENT_TYPES = [
  { value: "post", label: "Social Post", icon: "📝" },
  { value: "caption", label: "Photo Caption", icon: "🖼️" },
  { value: "reel", label: "Reel Script", icon: "🎬" },
  { value: "story", label: "Story Ideas", icon: "✨" },
  { value: "ad", label: "Ad Copy", icon: "📣" },
  { value: "email", label: "Email / Newsletter", icon: "📧" },
  { value: "blog", label: "Blog Intro", icon: "📰" },
  { value: "whatsapp", label: "WhatsApp Message", icon: "💬" },
];

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: <Camera size={14} />, color: "#e1306c" },
  { id: "linkedin", label: "LinkedIn", icon: <Briefcase size={14} />, color: "#0077b5" },
  { id: "facebook", label: "Facebook", icon: <ThumbsUp size={14} />, color: "#1877f2" },
  { id: "twitter", label: "Twitter/X", icon: <Twitter size={14} />, color: "#1d9bf0" },
];

const EXAMPLE_TOPICS = [
  "Announce our new product launch with excitement",
  "Share a behind-the-scenes look at our process",
  "Educational post about our industry's biggest myth",
  "Customer success story — transformation post",
  "Motivational Monday post for entrepreneurs",
  "Limited time offer — create urgency",
  "Ask audience a question to boost engagement",
  "Compare before/after our service",
];

const DEMO_OUTPUT = {
  instagram: {
    caption: "✨ Transforming businesses, one strategy at a time.\n\nWe just helped a client 3x their Instagram leads in 30 days — without increasing their ad spend.\n\nHere's the exact playbook we used:\n\n→ Consistent posting schedule (5x/week)\n→ AI-optimized captions for each post\n→ Community reply automation for DMs\n→ Lead scoring to prioritize hot prospects\n\nThe result? 3x more leads. Same budget. 🚀\n\nWant to see how this works for YOUR business?\nDM us \"GROW\" or tap the link in bio.\n\n#MarketingStrategy #DigitalMarketing #LeadGeneration #BusinessGrowth #MarketingAutomation #AIMarketing #SocialMediaMarketing #Entrepreneur #BusinessTips #GrowthHacking",
    hashtags: ["#MarketingStrategy", "#DigitalMarketing", "#LeadGeneration", "#BusinessGrowth", "#MarketingAutomation"],
    cta: "DM us \"GROW\" or tap the link in bio",
  },
};

export default function ContentPage() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("post");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [tone, setTone] = useState("Professional");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<typeof DEMO_OUTPUT | null>(null);
  const [copied, setCopied] = useState(false);

  const togglePlatform = (id: string) =>
    setSelectedPlatforms((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setOutput(DEMO_OUTPUT);
    setGenerating(false);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Header title="Content Studio" />

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-5">

          {/* Left — Input panel */}
          <div className="lg:col-span-2 space-y-4">

            {/* Content type */}
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Content Type</p>
              <div className="grid grid-cols-2 gap-2">
                {CONTENT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setContentType(t.value)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all"
                    style={{
                      background: contentType === t.value ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                      border: contentType === t.value ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      color: contentType === t.value ? "#c4b5fd" : "var(--text-secondary)",
                    }}
                  >
                    <span>{t.icon}</span> {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic input */}
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Topic / Brief</p>
              <textarea
                className="input w-full resize-none text-sm"
                rows={4}
                placeholder="What should this post be about? Be specific for best results…"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              {/* Example prompts */}
              <div className="space-y-1">
                <p className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>Quick ideas:</p>
                <div className="flex flex-wrap gap-1.5">
                  {EXAMPLE_TOPICS.slice(0, 4).map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setTopic(ex)}
                      className="text-[10px] px-2 py-1 rounded-lg transition-colors"
                      style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {ex.slice(0, 30)}…
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Platform & Tone */}
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Platforms</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: selectedPlatforms.includes(p.id) ? `${p.color}20` : "rgba(255,255,255,0.04)",
                      border: selectedPlatforms.includes(p.id) ? `1px solid ${p.color}60` : "1px solid rgba(255,255,255,0.08)",
                      color: selectedPlatforms.includes(p.id) ? p.color : "var(--text-secondary)",
                    }}
                  >
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Tone</p>
                <div className="relative">
                  <select
                    className="input w-full appearance-none pr-8 text-sm"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    {["Professional", "Casual", "Fun", "Luxury", "Bold", "Friendly", "Authoritative"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || generating}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{
                background: generating ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg,#7c3aed,#a855f7)",
                boxShadow: !generating && topic.trim() ? "0 0 25px rgba(124,58,237,0.35)" : "none",
              }}
            >
              {generating ? (
                <><RefreshCw size={15} className="animate-spin" /> Generating content…</>
              ) : (
                <><Wand2 size={15} /> Generate Content</>
              )}
            </button>
          </div>

          {/* Right — Output panel */}
          <div className="lg:col-span-3 space-y-4">
            {!output ? (
              <div
                className="rounded-2xl flex flex-col items-center justify-center py-24 gap-4"
                style={{ background: "var(--bg-card)", border: "2px dashed var(--border)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}
                >
                  <Sparkles size={28} className="text-violet-400" />
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-white mb-1">AI Content Generator</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Enter a topic and click Generate — AI will write platform-optimized content in your brand voice
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Caption", "Hashtags", "CTA", "Multi-platform"].map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Instagram output */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ background: "rgba(225,48,108,0.1)", borderBottom: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Camera size={15} style={{ color: "#e1306c" }} />
                      <span className="text-sm font-bold" style={{ color: "#e1306c" }}>Instagram</span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ background: "rgba(225,48,108,0.2)", color: "#e1306c", border: "1px solid rgba(225,48,108,0.3)" }}>
                        Optimized
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(output.instagram.caption)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}
                      >
                        <Copy size={11} /> {copied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}
                      >
                        <RefreshCw size={11} /> Regenerate
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <pre
                      className="text-sm whitespace-pre-wrap leading-relaxed font-sans"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {output.instagram.caption}
                    </pre>
                  </div>
                  <div
                    className="px-4 py-3 space-y-2"
                    style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Hash size={12} style={{ color: "var(--text-muted)" }} />
                      <p className="text-[11px] font-semibold" style={{ color: "var(--text-muted)" }}>Top Hashtags</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {output.instagram.hashtags.map((h) => (
                        <span key={h} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(225,48,108,0.1)", color: "#e1306c" }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <AtSign size={12} style={{ color: "var(--text-muted)" }} />
                      <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>CTA: {output.instagram.cta}</p>
                    </div>
                  </div>
                </div>

                {/* Action row */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
                  >
                    <FileText size={12} /> Save to Drafts
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                  >
                    <Download size={12} /> Download
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}
                  >
                    📅 Schedule Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
