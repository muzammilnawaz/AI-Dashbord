import { motion } from 'motion/react';
import { ToolPageLayout } from '../shared/ToolPageLayout.jsx';
import { useState } from 'react';
import { Play, Download, Volume2 } from 'lucide-react';

export function TTSPage() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);

  const voices = [
    { id: 'alloy', name: 'Alloy', gender: 'Neutral', preview: '👤' },
    { id: 'echo', name: 'Echo', gender: 'Male', preview: '👨' },
    { id: 'fable', name: 'Fable', gender: 'Male', preview: '👨' },
    { id: 'onyx', name: 'Onyx', gender: 'Male', preview: '👨' },
    { id: 'nova', name: 'Nova', gender: 'Female', preview: '👩' },
    { id: 'shimmer', name: 'Shimmer', gender: 'Female', preview: '👩' },
  ];

  const settingsPanel = (
    <div className="space-y-6">
      {/* Voice Selection */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Voice</label>
        <div className="space-y-2">
          {voices.map((voice) => (
            <button
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id)}
              className={`
                w-full p-3 rounded-xl transition-all duration-200 flex items-center gap-3
                ${selectedVoice === voice.id
                  ? 'bg-[#FFCB00] text-[#0B0B0D] ring-2 ring-[#FFCB00]'
                  : 'bg-[#0B0B0D] text-[#F6F7F9] hover:bg-[#1a1a1c]'
                }
              `}
            >
              <span className="text-2xl">{voice.preview}</span>
              <div className="flex-1 text-left">
                <div className="text-sm">{voice.name}</div>
                <div className="text-xs opacity-70">{voice.gender}</div>
              </div>
              <Volume2 className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </div>
      </div>

      {/* Speed Control */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">
          Speed: {speed}x
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-[#0B0B0D] rounded-lg appearance-none cursor-pointer accent-[#FFCB00]"
        />
      </div>

      {/* Pitch Control */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">
          Pitch: {pitch}x
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(parseFloat(e.target.value))}
          className="w-full h-2 bg-[#0B0B0D] rounded-lg appearance-none cursor-pointer accent-[#FFCB00]"
        />
      </div>

      {/* Generate Button */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all duration-200">
        Generate Speech
      </button>
    </div>
  );

  return (
    <ToolPageLayout
      title="Text to Speech"
      description="Convert your text into natural-sounding speech with multiple voice options"
      settingsPanel={settingsPanel}
    >
      {/* Text Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <label className="text-sm text-[#AAB0B8] mb-3 block">Enter Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-48 bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all resize-none"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[#AAB0B8]">
            {text.length} / 5000 characters
          </span>
          <button className="text-xs text-[#FFCB00] hover:text-[#FFD766]">
            Clear
          </button>
        </div>
      </motion.div>

      {/* Audio Output */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4">Generated Audio</h3>
        
        <div className="bg-[#0B0B0D] rounded-xl p-8 flex flex-col items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#FFCB00]/10 flex items-center justify-center mb-4">
            <Volume2 className="w-10 h-10 text-[#FFCB00]" />
          </div>
          <p className="text-[#AAB0B8] text-sm">Your audio will appear here</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FFCB00] text-[#0B0B0D] rounded-xl hover:shadow-lg transition-all">
            <Play className="w-4 h-4" />
            <span>Play</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0B0B0D] text-[#F6F7F9] rounded-xl ring-1 ring-white/10 hover:ring-[#FFCB00]/50 transition-all">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </motion.div>
    </ToolPageLayout>
  );
}

