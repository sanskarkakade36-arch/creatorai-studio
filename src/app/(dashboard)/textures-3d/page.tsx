"use client";

import Header from "@/components/layout/Header";
import { useState } from "react";
import { Box, Upload, Download, Sparkles, RotateCcw } from "lucide-react";

const TEXTURE_TYPES = ["Diffuse / Albedo", "Normal Map", "Roughness", "Metallic", "AO Map", "Height Map", "Full PBR Set"];
const STYLES = ["Realistic", "Stylized", "Sci-Fi", "Fantasy", "Organic", "Metal", "Stone", "Wood", "Fabric", "Leather"];
const RESOLUTIONS = ["512×512", "1024×1024", "2048×2048", "4096×4096"];

export default function Textures3DPage() {
  const [prompt, setPrompt] = useState("");
  const [textureType, setTextureType] = useState("Full PBR Set");
  const [style, setStyle] = useState("Realistic");
  const [resolution, setResolution] = useState("1024×1024");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [model, setModel] = useState<string | null>(null);

  const generate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResults({});
    // TODO: Replicate API for texture generation
    setTimeout(() => {
      setResults({
        "Diffuse": "https://picsum.photos/seed/tex1/512/512",
        "Normal": "https://picsum.photos/seed/tex2/512/512",
        "Roughness": "https://picsum.photos/seed/tex3/512/512",
        "Metallic": "https://picsum.photos/seed/tex4/512/512",
        "AO": "https://picsum.photos/seed/tex5/512/512",
        "Height": "https://picsum.photos/seed/tex6/512/512",
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <Header title="3D Texture Generation" />
      <div className="flex h-[calc(100vh-57px)]">

        {/* Controls */}
        <div className="w-72 shrink-0 overflow-y-auto p-4 space-y-5" style={{ borderRight: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>Texture Type</label>
            {TEXTURE_TYPES.map((t) => (
              <button key={t} onClick={() => setTextureType(t)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm border mb-1 transition-all"
                style={{
                  background: textureType === t ? "rgba(124,58,237,0.1)" : "transparent",
                  borderColor: textureType === t ? "rgba(124,58,237,0.4)" : "transparent",
                  color: textureType === t ? "#a78bfa" : "var(--text-secondary)",
                }}
              >
                {t === "Full PBR Set" ? <><strong>{t}</strong> <span className="badge badge-gold text-xs ml-1">Best Value</span></> : t}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>Style</label>
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map((s) => (
                <button key={s} onClick={() => setStyle(s)}
                  className="px-2.5 py-1 rounded-lg text-xs border transition-all"
                  style={{
                    background: style === s ? "rgba(124,58,237,0.15)" : "transparent",
                    borderColor: style === s ? "rgba(124,58,237,0.5)" : "var(--border)",
                    color: style === s ? "#a78bfa" : "var(--text-muted)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>Resolution</label>
            <div className="grid grid-cols-2 gap-1.5">
              {RESOLUTIONS.map((r) => (
                <button key={r} onClick={() => setResolution(r)}
                  className="py-2 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    background: resolution === r ? "rgba(124,58,237,0.15)" : "var(--bg-card)",
                    borderColor: resolution === r ? "rgba(124,58,237,0.5)" : "var(--border)",
                    color: resolution === r ? "#a78bfa" : "var(--text-secondary)",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Upload 3D model */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>3D Model (Optional)</label>
            <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors"
              style={{ borderColor: model ? "rgba(16,185,129,0.5)" : "var(--border)", color: "var(--text-muted)" }}>
              <Upload size={20} />
              <span className="text-xs">{model ? "Model uploaded ✓" : "Upload OBJ / FBX / GLB"}</span>
              <input type="file" accept=".obj,.fbx,.glb,.gltf" className="hidden" onChange={() => setModel("uploaded")} />
            </label>
          </div>

          <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Cost</span><span style={{ color: "#fbbf24" }} className="font-bold">15 credits</span></div>
            <div className="flex justify-between mt-1"><span style={{ color: "var(--text-muted)" }}>Maps generated</span><span className="font-bold text-white">6 maps</span></div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex gap-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the surface material… e.g. 'Worn rusty metal with blue paint peeling off, industrial look'"
                rows={2}
                className="input flex-1 resize-none"
              />
              <button onClick={generate} disabled={!prompt.trim() || loading}
                className="btn-primary px-5 self-stretch" style={{ minWidth: 120 }}>
                {loading ? <span className="spinner" /> : <><Sparkles size={14} /> Generate</>}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                <div className="text-center">
                  <p className="font-bold text-white text-lg">Generating PBR Texture Set…</p>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Creating 6 texture maps at {resolution}</p>
                </div>
              </div>
            ) : Object.keys(results).length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">Generated Texture Maps</h3>
                  <button className="btn-primary px-4 py-2 text-xs"><Download size={12} /> Download All Maps</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(results).map(([name, src]) => (
                    <div key={name} className="card p-3 space-y-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={name} className="w-full aspect-square object-cover rounded-xl" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{name}</span>
                        <button className="btn-ghost p-1.5 rounded-lg"><Download size={13} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setResults({})} className="btn-secondary">
                  <RotateCcw size={14} /> Generate New Set
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full" style={{ color: "var(--text-muted)" }}>
                <Box size={64} className="opacity-20 mb-4" />
                <p className="text-lg font-semibold" style={{ color: "var(--text-secondary)" }}>Texture maps appear here</p>
                <p className="text-sm mt-1">Describe your material and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
