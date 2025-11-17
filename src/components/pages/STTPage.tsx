import { motion } from 'motion/react';
import { ToolPageLayout } from '../shared/ToolPageLayout';
import { useState } from 'react';
import { Copy, Download, FileText } from 'lucide-react';

export function STTPage() {
  const [selectedModel, setSelectedModel] = useState('whisper-1');
  const [language, setLanguage] = useState('auto');
  const [format, setFormat] = useState('txt');

  const models = [
    { id: 'whisper-1', name: 'Whisper v1', accuracy: 'High', speed: 'Fast' },
    { id: 'whisper-2', name: 'Whisper v2', accuracy: 'Very High', speed: 'Medium' },
    { id: 'whisper-large', name: 'Whisper Large', accuracy: 'Excellent', speed: 'Slow' },
  ];

  const handleUpload = (file: File) => {
    console.log('File uploaded:', file.name);
  };

  const settingsPanel = (
    <div className="space-y-6">
      {/* Model Selection */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Model</label>
        <div className="space-y-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`
                w-full p-3 rounded-xl transition-all duration-200 text-left
                ${selectedModel === model.id
                  ? 'bg-[#FFCB00] text-[#0B0B0D] ring-2 ring-[#FFCB00]'
                  : 'bg-[#0B0B0D] text-[#F6F7F9] hover:bg-[#1a1a1c]'
                }
              `}
            >
              <div className="text-sm mb-1">{model.name}</div>
              <div className="text-xs opacity-70 flex items-center gap-2">
                <span>Accuracy: {model.accuracy}</span>
                <span>•</span>
                <span>Speed: {model.speed}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none transition-all"
        >
          <option value="auto">Auto-detect</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      {/* Output Format */}
      <div>
        <label className="text-sm text-[#AAB0B8] mb-3 block">Output Format</label>
        <div className="grid grid-cols-2 gap-2">
          {['txt', 'srt', 'vtt', 'json'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`
                p-3 rounded-xl transition-all duration-200 text-sm
                ${format === fmt
                  ? 'bg-[#FFCB00] text-[#0B0B0D]'
                  : 'bg-[#0B0B0D] text-[#F6F7F9] hover:bg-[#1a1a1c]'
                }
              `}
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Transcribe Button */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all duration-200">
        Start Transcription
      </button>
    </div>
  );

  return (
    <ToolPageLayout
      title="Speech to Text"
      description="Transcribe audio and video files into accurate text with timestamps"
      onUpload={handleUpload}
      settingsPanel={settingsPanel}
    >
      {/* Transcript Output */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Transcript</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Copy className="w-4 h-4 text-[#AAB0B8]" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Download className="w-4 h-4 text-[#AAB0B8]" />
            </button>
          </div>
        </div>
        
        <div className="bg-[#0B0B0D] rounded-xl p-6 min-h-[300px]">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText className="w-12 h-12 text-[#AAB0B8] mb-4" />
            <p className="text-[#AAB0B8]">Your transcript will appear here</p>
          </div>
        </div>
      </motion.div>

      {/* Timestamps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-lg mb-4">Timestamps</h3>
        <div className="space-y-3">
          {[
            { time: '00:00', text: 'Transcript with timestamps will be shown here' },
            { time: '00:15', text: 'Each segment will have accurate timing' },
            { time: '00:30', text: 'Perfect for creating subtitles' },
          ].map((segment, index) => (
            <div
              key={index}
              className="flex gap-4 p-3 bg-[#0B0B0D]/50 rounded-lg hover:bg-[#0B0B0D] transition-colors"
            >
              <span className="text-[#FFCB00] text-sm shrink-0">{segment.time}</span>
              <p className="text-sm text-[#AAB0B8]">{segment.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </ToolPageLayout>
  );
}
