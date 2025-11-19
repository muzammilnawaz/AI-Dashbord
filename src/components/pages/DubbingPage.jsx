import { motion } from 'motion/react';
import { ToolPageLayout } from '../shared/ToolPageLayout.jsx';
import { useState } from 'react';
import { Play, Pause, Download, Globe } from 'lucide-react';

export function DubbingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [selectedVoice, setSelectedVoice] = useState('natural');
  const [isProcessing, setIsProcessing] = useState(false);

  const languages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];

  const handleUpload = (file) => {
    console.log('File uploaded:', file.name);
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const settingsPanel = (
    <div className="space-y-6">
      {/* Target Language */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Target Language</label>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`
                p-3 rounded-xl transition-all duration-200 text-left
                ${selectedLanguage === lang.code
                  ? 'bg-[#FFCB00] text-[#0B0B0D] ring-2 ring-[#FFCB00]'
                  : 'bg-[#0B0B0D] text-[#F6F7F9] hover:bg-[#1a1a1c]'
                }
              `}
            >
              <div className="text-lg mb-1">{lang.flag}</div>
              <div className="text-xs">{lang.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Voice Style */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Voice Style</label>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all"
        >
          <option value="natural">Natural</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="energetic">Energetic</option>
        </select>
      </div>

      {/* Preserve Original Audio */}
      <div className="flex items-center justify-between p-4 bg-[#0B0B0D] rounded-xl">
        <div>
          <div className="text-sm mb-1">Preserve Audio</div>
          <div className="text-xs text-[#AAB0B8]">Keep background music</div>
        </div>
        <label className="relative inline-block w-12 h-6">
          <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
          <span className="absolute cursor-pointer inset-0 bg-[#1a1a1c] rounded-full transition-all peer-checked:bg-[#FFCB00] before:absolute before:content-[''] before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
        </label>
      </div>

      {/* Process Button */}
      <button
        disabled={isProcessing}
        className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all duration-200 disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Start Dubbing'}
      </button>
    </div>
  );

  return (
    <ToolPageLayout
      title="AI Dubbing"
      description="Translate and dub your videos into multiple languages while preserving the original voice characteristics"
      onUpload={handleUpload}
      settingsPanel={settingsPanel}
    >
      {/* Result Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4">Output Preview</h3>
        
        <div className="aspect-video bg-[#0B0B0D] rounded-xl flex items-center justify-center mb-4">
          <Play className="w-16 h-16 text-[#AAB0B8]" />
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

