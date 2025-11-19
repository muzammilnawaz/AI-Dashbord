import { motion } from 'motion/react';
import { ToolPageLayout } from '../shared/ToolPageLayout.jsx';
import { useState } from 'react';
import { Play, Mic, Save } from 'lucide-react';

export function VoiceCloningPage() {
  const [voiceName, setVoiceName] = useState('');
  const [sampleCount, setSampleCount] = useState(5);

  const handleUpload = (file) => {
    console.log('Voice sample uploaded:', file.name);
  };

  const settingsPanel = (
    <div className="space-y-6">
      {/* Voice Name */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Voice Name</label>
        <input
          type="text"
          value={voiceName}
          onChange={(e) => setVoiceName(e.target.value)}
          placeholder="e.g., Sarah's Voice"
          className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all"
        />
      </div>

      {/* Sample Count */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">
          Training Samples: {sampleCount}
        </label>
        <input
          type="range"
          min="3"
          max="10"
          value={sampleCount}
          onChange={(e) => setSampleCount(parseInt(e.target.value))}
          className="w-full h-2 bg-[#0B0B0D] rounded-lg appearance-none cursor-pointer accent-[#FFCB00]"
        />
        <p className="text-xs text-[#AAB0B8] mt-2">
          More samples = better quality
        </p>
      </div>

      {/* Quality Settings */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Quality</label>
        <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all">
          <option value="standard">Standard</option>
          <option value="high">High Quality</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* Clone Button */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all duration-200">
        Create Voice Clone
      </button>
    </div>
  );

  return (
    <ToolPageLayout
      title="Voice Cloning"
      description="Create a high-quality clone of any voice using audio samples"
      onUpload={handleUpload}
      settingsPanel={settingsPanel}
    >
      {/* Sample Upload Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4">Voice Samples (0/{sampleCount})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: sampleCount }).map((_, index) => (
            <div
              key={index}
              className="bg-[#0B0B0D] rounded-xl p-4 flex items-center justify-between hover:bg-[#1a1a1c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FFCB00]/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-[#FFCB00]" />
                </div>
                <div>
                  <p className="text-sm">Sample {index + 1}</p>
                  <p className="text-xs text-[#AAB0B8]">Not uploaded</p>
                </div>
              </div>
              <button className="text-[#FFCB00] text-sm hover:text-[#FFD766]">
                Upload
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cloned Voices Library */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4">My Cloned Voices</h3>
        <div className="space-y-3">
          {[
            { name: 'Sarah Professional', quality: 'Premium', samples: 8 },
            { name: 'John Casual', quality: 'High', samples: 5 },
            { name: 'Emily Narrator', quality: 'Premium', samples: 10 },
          ].map((voice, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#0B0B0D] rounded-xl hover:bg-[#1a1a1c] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFCB00] to-[#FFD766] flex items-center justify-center">
                  <span className="text-[#0B0B0D]">
                    {voice.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm mb-1">{voice.name}</p>
                  <div className="flex items-center gap-2 text-xs text-[#AAB0B8]">
                    <span>{voice.quality}</span>
                    <span>•</span>
                    <span>{voice.samples} samples</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-white/5">
                  <Play className="w-4 h-4 text-[#AAB0B8]" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5">
                  <Save className="w-4 h-4 text-[#AAB0B8]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </ToolPageLayout>
  );
}

