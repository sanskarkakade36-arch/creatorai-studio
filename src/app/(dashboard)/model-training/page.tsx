"use client";

import Header from "@/components/layout/Header";
import { useState } from "react";
import { Brain, Upload, Plus, X, Zap, Clock, CheckCircle, AlertCircle } from "lucide-react";

const TRAINING_TYPES = [
  { id: "style", label: "Style", desc: "Train on a visual style or aesthetic" },
  { id: "character", label: "Character / Face", desc: "Train on a specific person or character" },
  { id: "object", label: "Object / Product", desc: "Train on a specific object or product" },
  { id: "concept", label: "Custom Concept", desc: "Train on any custom concept or idea" },
];

const DEMO_MODELS = [
  { name: "My Portrait Style", type: "character", status: "ready", trigger: "MYFACE", images: 20, date: "2 days ago" },
  { name: "Watercolor Style", type: "style", status: "training", trigger: "WTRCLR", images: 15, date: "1 hour ago" },
  { name: "Studio Product", type: "object", status: "ready", trigger: "MYPROD", images: 12, date: "5 days ago" },
];

export default function ModelTrainingPage() {
  const [step, setStep] = useState<"list" | "create">("list");
  const [trainingType, setTrainingType] = useState("character");
  const [modelName, setModelName] = useState("");
  const [triggerWord, setTriggerWord] = useState("");
  const [uploads, setUploads] = useState<string[]>([]);
  const [training, setTraining] = useState(false);

  const startTraining = () => {
    if (!modelName || !triggerWord || uploads.length < 10) return;
    setTraining(true);
    setTimeout(() => { setTraining(false); setStep("list"); }, 2000);
  };

  const statusIcon = (status: string) => {
    if (status === "ready") return <CheckCircle size={14} className="text-emerald-400" />;
    if (status === "training") return <span className="spinner w-4 h-4" />;
    return <AlertCircle size={14} className="text-red-400" />;
  };

  return (
    <div>
      <Header title="Custom Model Training" />
      <div className="p-6 max-w-5xl mx-auto space-y-6">

        {/* Info banner */}
        <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(99,102,241,0.08))", border: "1px solid rgba(124,58,237,0.3)" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}>
              <Brain size={22} style={{ color: "#a78bfa" }} />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-white text-lg mb-1">Train Your Own AI Model</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Upload 10–20 images and train a custom LoRA model in ~20 minutes. Use it in Image Generation with your trigger word to create consistent characters, styles, or objects.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-black text-white">500</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>credits</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep("list")} className={step === "list" ? "btn-primary px-5" : "btn-secondary px-5"}>My Models</button>
          <button onClick={() => setStep("create")} className={step === "create" ? "btn-primary px-5" : "btn-secondary px-5"}>
            <Plus size={14} /> Train New Model
          </button>
        </div>

        {step === "list" ? (
          <div className="space-y-3">
            {DEMO_MODELS.map((m) => (
              <div key={m.name} className="card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <Brain size={20} style={{ color: "#a78bfa" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white">{m.name}</p>
                    {statusIcon(m.status)}
                    <span className="badge badge-purple text-xs">{m.type}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Trigger: <code className="font-mono text-violet-400">{m.trigger}</code> · {m.images} images · {m.date}
                  </p>
                </div>
                {m.status === "ready" && (
                  <button className="btn-primary px-4 py-2 text-xs">Use in Generation</button>
                )}
                {m.status === "training" && (
                  <span className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                    <Clock size={12} /> ~15 min remaining
                  </span>
                )}
              </div>
            ))}
            {DEMO_MODELS.length === 0 && (
              <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
                <Brain size={48} className="opacity-20 mx-auto mb-3" />
                <p>No models trained yet. Click &ldquo;Train New Model&rdquo; to start.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left — form */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>Training Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {TRAINING_TYPES.map((t) => (
                    <button key={t.id} onClick={() => setTrainingType(t.id)}
                      className="p-3 rounded-xl border text-left transition-all"
                      style={{
                        background: trainingType === t.id ? "rgba(124,58,237,0.12)" : "var(--bg-card)",
                        borderColor: trainingType === t.id ? "rgba(124,58,237,0.5)" : "var(--border)",
                      }}
                    >
                      <p className="text-sm font-bold text-white">{t.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>Model Name</label>
                <input value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="My Custom Model" className="input" />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>Trigger Word</label>
                <input value={triggerWord} onChange={(e) => setTriggerWord(e.target.value.toUpperCase())} placeholder="MYMODEL" className="input font-mono" />
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Use this word in prompts to activate your model</p>
              </div>

              <button onClick={startTraining} disabled={!modelName || !triggerWord || uploads.length < 10 || training}
                className="btn-primary w-full justify-center py-3">
                {training ? <span className="spinner" /> : <><Zap size={15} /> Start Training (500 credits)</>}
              </button>

              {uploads.length < 10 && (
                <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                  Upload at least {10 - uploads.length} more image{10 - uploads.length > 1 ? "s" : ""} to start training
                </p>
              )}
            </div>

            {/* Right — image upload */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                Training Images ({uploads.length}/20)
              </label>
              <label
                className="flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                <Upload size={28} />
                <div className="text-center">
                  <p className="font-semibold text-sm">Upload 10–20 images</p>
                  <p className="text-xs">Clear, consistent photos of your subject</p>
                </div>
                <input type="file" multiple accept="image/*" className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []).slice(0, 20 - uploads.length);
                    files.forEach((f) => {
                      const reader = new FileReader();
                      reader.onload = (ev) => setUploads((prev) => [...prev, ev.target?.result as string]);
                      reader.readAsDataURL(f);
                    });
                  }}
                />
              </label>
              <div className="grid grid-cols-4 gap-2">
                {uploads.map((src, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => setUploads((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ background: "rgba(0,0,0,0.7)" }}>
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
