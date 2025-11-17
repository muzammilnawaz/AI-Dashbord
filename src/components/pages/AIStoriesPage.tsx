import { motion } from 'motion/react';
import { ToolPageLayout } from '../shared/ToolPageLayout';
import { useState } from 'react';
import { Sparkles, Play, Download, Wand2 } from 'lucide-react';

export function AIStoriesPage() {
  const [storyPrompt, setStoryPrompt] = useState('');
  const [duration, setDuration] = useState(30);
  const [style, setStyle] = useState('cinematic');

  const settingsPanel = (
    <div className="space-y-6">
      {/* Duration */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">
          Duration: {duration}s
        </label>
        <input
          type="range"
          min="15"
          max="120"
          step="15"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-full h-2 bg-[#0B0B0D] rounded-lg appearance-none cursor-pointer accent-[#FFCB00]"
        />
      </div>

      {/* Visual Style */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Visual Style</label>
        <div className="grid grid-cols-2 gap-2">
          {['cinematic', 'cartoon', 'realistic', 'anime'].map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`
                p-3 rounded-xl transition-all duration-200 text-sm capitalize
                ${style === s
                  ? 'bg-[#FFCB00] text-[#0B0B0D]'
                  : 'bg-[#0B0B0D] text-[#F6F7F9] hover:bg-[#1a1a1c]'
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Over */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Narrator Voice</label>
        <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all">
          <option value="male-deep">Male Deep</option>
          <option value="female-warm">Female Warm</option>
          <option value="neutral-calm">Neutral Calm</option>
          <option value="child-friendly">Child Friendly</option>
        </select>
      </div>

      {/* Music */}
      <div className="flex items-center justify-between p-4 bg-[#0B0B0D] rounded-xl">
        <div>
          <div className="text-sm mb-1">Background Music</div>
          <div className="text-xs text-[#AAB0B8]">Add ambient soundtrack</div>
        </div>
        <label className="relative inline-block w-12 h-6">
          <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
          <span className="absolute cursor-pointer inset-0 bg-[#1a1a1c] rounded-full transition-all peer-checked:bg-[#FFCB00] before:absolute before:content-[''] before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
        </label>
      </div>

      {/* Generate Button */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all duration-200 flex items-center justify-center gap-2">
        <Wand2 className="w-5 h-5" />
        <span>Generate Story</span>
      </button>
    </div>
  );

  return (
    <ToolPageLayout
      title="AI Stories"
      description="Generate engaging video stories from text prompts using AI"
      settingsPanel={settingsPanel}
    >
      {/* Story Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <label className="text-sm text-[#AAB0B8] mb-3 block flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFCB00]" />
          Story Prompt
        </label>
        <textarea
          value={storyPrompt}
          onChange={(e) => setStoryPrompt(e.target.value)}
          placeholder="Describe your story idea... e.g., 'A magical forest where talking animals help a lost child find their way home'"
          className="w-full h-32 bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all resize-none"
        />
      </motion.div>

      {/* Generated Stories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4">Generated Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'The Magic Garden', duration: '45s', style: 'Cinematic' },
            { title: 'Space Adventure', duration: '60s', style: 'Cartoon' },
            { title: 'Ocean Mystery', duration: '30s', style: 'Realistic' },
          ].map((story, index) => (
            <div
              key={index}
              className="bg-[#0B0B0D] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#FFCB00]/30 transition-all group"
            >
              <div className="aspect-video bg-gradient-to-br from-[#1a1a1c] to-[#0B0B0D] relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-[#FFCB00]/20 to-transparent blur-2xl"
                />
                <Play className="w-12 h-12 text-[#AAB0B8] group-hover:text-[#FFCB00] transition-colors relative z-10" />
              </div>
              <div className="p-4">
                <h4 className="text-sm mb-2">{story.title}</h4>
                <div className="flex items-center justify-between text-xs text-[#AAB0B8]">
                  <span>{story.duration}</span>
                  <span>{story.style}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </ToolPageLayout>
  );
}
