import { motion } from 'motion/react';
import { ToolPageLayout } from '../shared/ToolPageLayout';
import { useState } from 'react';
import { Film, Camera, Palette, Sparkles } from 'lucide-react';

export function FilmStudioPage() {
  const [sceneCount, setSceneCount] = useState(3);
  const [cinematicStyle, setCinematicStyle] = useState('hollywood');

  const handleUpload = (file: File) => {
    console.log('Script uploaded:', file.name);
  };

  const settingsPanel = (
    <div className="space-y-6">
      {/* Scene Count */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">
          Number of Scenes: {sceneCount}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={sceneCount}
          onChange={(e) => setSceneCount(parseInt(e.target.value))}
          className="w-full h-2 bg-[#0B0B0D] rounded-lg appearance-none cursor-pointer accent-[#FFCB00]"
        />
      </div>

      {/* Cinematic Style */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Cinematic Style</label>
        <div className="space-y-2">
          {[
            { id: 'hollywood', name: 'Hollywood', desc: 'Epic & dramatic' },
            { id: 'indie', name: 'Indie Film', desc: 'Artistic & authentic' },
            { id: 'documentary', name: 'Documentary', desc: 'Real & engaging' },
            { id: 'noir', name: 'Film Noir', desc: 'Dark & mysterious' },
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setCinematicStyle(style.id)}
              className={`
                w-full p-3 rounded-xl transition-all duration-200 text-left
                ${cinematicStyle === style.id
                  ? 'bg-[#FFCB00] text-[#0B0B0D]'
                  : 'bg-[#0B0B0D] text-[#F6F7F9] hover:bg-[#1a1a1c]'
                }
              `}
            >
              <div className="text-sm mb-1">{style.name}</div>
              <div className="text-xs opacity-70">{style.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Camera Movement */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Camera Movement</label>
        <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all">
          <option value="static">Static</option>
          <option value="pan">Pan & Tilt</option>
          <option value="tracking">Tracking Shot</option>
          <option value="dynamic">Dynamic</option>
        </select>
      </div>

      {/* Generate Button */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all duration-200 flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5" />
        <span>Generate Film</span>
      </button>
    </div>
  );

  return (
    <ToolPageLayout
      title="Film Studio"
      description="Create cinematic films from scripts using AI-powered scene generation"
      onUpload={handleUpload}
      settingsPanel={settingsPanel}
    >
      {/* Script Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <label className="text-sm text-[#AAB0B8] mb-3 block flex items-center gap-2">
          <Film className="w-4 h-4 text-[#FFCB00]" />
          Film Script
        </label>
        <textarea
          placeholder="Write your film script or describe each scene..."
          className="w-full h-48 bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all resize-none font-mono text-sm"
        />
      </motion.div>

      {/* Scene Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#FFCB00]" />
          Scene Breakdown
        </h3>
        <div className="space-y-3">
          {[
            { scene: 1, description: 'Opening establishing shot', duration: '5s', status: 'ready' },
            { scene: 2, description: 'Main character introduction', duration: '8s', status: 'processing' },
            { scene: 3, description: 'Dramatic confrontation', duration: '12s', status: 'pending' },
          ].map((scene, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-[#0B0B0D] rounded-xl hover:bg-[#1a1a1c] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FFCB00]/10 flex items-center justify-center shrink-0">
                <span className="text-[#FFCB00]">{scene.scene}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm mb-1">{scene.description}</p>
                <div className="flex items-center gap-2 text-xs text-[#AAB0B8]">
                  <span>{scene.duration}</span>
                  <span>•</span>
                  <span className={`
                    px-2 py-0.5 rounded
                    ${scene.status === 'ready' ? 'bg-green-400/10 text-green-400' :
                      scene.status === 'processing' ? 'bg-[#FFCB00]/10 text-[#FFCB00]' :
                      'bg-[#AAB0B8]/10 text-[#AAB0B8]'
                    }
                  `}>
                    {scene.status}
                  </span>
                </div>
              </div>
              {scene.status === 'ready' && (
                <Camera className="w-5 h-5 text-green-400" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Film Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#FFCB00]" />
          Your Films
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Sci-Fi Short', 'Drama Scene', 'Action Sequence'].map((film, index) => (
            <div
              key={index}
              className="bg-[#0B0B0D] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#FFCB00]/30 transition-all cursor-pointer group"
            >
              <div className="aspect-video bg-gradient-to-br from-[#1a1a1c] to-[#0B0B0D] relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-[#FFCB00]/20 to-transparent blur-2xl"
                />
                <Film className="w-12 h-12 text-[#AAB0B8] group-hover:text-[#FFCB00] transition-colors relative z-10" />
              </div>
              <div className="p-4">
                <p className="text-sm mb-1">{film}</p>
                <p className="text-xs text-[#AAB0B8]">Generated today</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </ToolPageLayout>
  );
}
