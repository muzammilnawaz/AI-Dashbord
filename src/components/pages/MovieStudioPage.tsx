import { motion } from 'motion/react';
import { ToolPageLayout } from '../shared/ToolPageLayout';
import { useState } from 'react';
import { Video, Scissors, Wand2, Layers } from 'lucide-react';

export function MovieStudioPage() {
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [resolution, setResolution] = useState('1080p');

  const handleUpload = (file: File) => {
    console.log('Video uploaded:', file.name);
  };

  const settingsPanel = (
    <div className="space-y-6">
      {/* Aspect Ratio */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Aspect Ratio</label>
        <div className="grid grid-cols-3 gap-2">
          {['16:9', '9:16', '1:1'].map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              className={`
                p-3 rounded-xl transition-all duration-200 text-sm
                ${aspectRatio === ratio
                  ? 'bg-[#FFCB00] text-[#0B0B0D]'
                  : 'bg-[#0B0B0D] text-[#F6F7F9] hover:bg-[#1a1a1c]'
                }
              `}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Resolution</label>
        <select
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all"
        >
          <option value="720p">HD (720p)</option>
          <option value="1080p">Full HD (1080p)</option>
          <option value="4k">4K Ultra HD</option>
        </select>
      </div>

      {/* AI Features */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">AI Features</label>
        <div className="space-y-2">
          {['Auto Edit', 'Color Grade', 'Scene Detection', 'Smart Trim'].map((feature) => (
            <label key={feature} className="flex items-center justify-between p-3 bg-[#0B0B0D] rounded-xl cursor-pointer hover:bg-[#1a1a1c] transition-colors">
              <span className="text-sm">{feature}</span>
              <input type="checkbox" className="w-5 h-5 accent-[#FFCB00]" />
            </label>
          ))}
        </div>
      </div>

      {/* Process Button */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all duration-200">
        Process Video
      </button>
    </div>
  );

  return (
    <ToolPageLayout
      title="MovieStudio (ZebraStudio)"
      description="Professional AI-powered video editing and enhancement"
      onUpload={handleUpload}
      settingsPanel={settingsPanel}
    >
      {/* Timeline Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-[#FFCB00]" />
          Video Timeline
        </h3>
        
        <div className="bg-[#0B0B0D] rounded-xl p-6 mb-4">
          <div className="aspect-video bg-gradient-to-br from-[#1a1a1c] to-[#0B0B0D] rounded-lg flex items-center justify-center mb-4">
            <Video className="w-16 h-16 text-[#AAB0B8]" />
          </div>
          
          {/* Timeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#AAB0B8] mb-1">
              <span>00:00</span>
              <div className="flex-1 h-px bg-white/10" />
              <span>00:30</span>
            </div>
            <div className="h-12 bg-[#0F1113] rounded-lg flex items-center gap-1 px-2">
              {[40, 60, 80, 50, 70, 90, 55].map((width, i) => (
                <div
                  key={i}
                  style={{ width: `${width}px` }}
                  className="h-8 bg-gradient-to-r from-[#FFCB00]/30 to-[#FFD766]/30 rounded hover:from-[#FFCB00]/50 hover:to-[#FFD766]/50 transition-all cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Scissors, label: 'Cut' },
            { icon: Layers, label: 'Layers' },
            { icon: Wand2, label: 'AI Edit' },
            { icon: Video, label: 'Effects' },
          ].map((tool, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-4 bg-[#0B0B0D] rounded-xl hover:bg-[#1a1a1c] hover:ring-2 hover:ring-[#FFCB00]/30 transition-all"
            >
              <tool.icon className="w-6 h-6 text-[#FFCB00]" />
              <span className="text-xs text-[#AAB0B8]">{tool.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4">Recent Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Product Demo', 'Tutorial Video', 'Brand Promo'].map((project, index) => (
            <div
              key={index}
              className="bg-[#0B0B0D] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#FFCB00]/30 transition-all cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-[#1a1a1c] to-[#0B0B0D] flex items-center justify-center">
                <Video className="w-10 h-10 text-[#AAB0B8]" />
              </div>
              <div className="p-3">
                <p className="text-sm">{project}</p>
                <p className="text-xs text-[#AAB0B8] mt-1">2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </ToolPageLayout>
  );
}
