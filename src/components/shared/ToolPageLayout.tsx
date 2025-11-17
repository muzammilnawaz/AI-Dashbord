import { motion } from 'motion/react';
import { Upload, Settings2, FileText, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onUpload?: (file: File) => void;
  settingsPanel?: React.ReactNode;
}

export function ToolPageLayout({ 
  title, 
  description, 
  children, 
  onUpload,
  settingsPanel 
}: ToolPageLayoutProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0] && onUpload) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUpload) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 h-[calc(100vh-140px)]">
      {/* Main Content */}
      <div className="space-y-6 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl lg:text-3xl mb-2">{title}</h1>
          <p className="text-[#AAB0B8]">{description}</p>
        </motion.div>

        {/* Upload Area */}
        {onUpload && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#0F1113] rounded-2xl p-8 ring-1 ring-white/5"
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-xl p-12 transition-all duration-200
                ${dragActive 
                  ? 'border-[#FFCB00] bg-[#FFCB00]/5' 
                  : 'border-white/10 hover:border-[#FFCB00]/50'
                }
              `}
            >
              <input
                type="file"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#FFCB00]/10 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-[#FFCB00]" />
                </div>
                <h3 className="text-lg mb-2">Drop your file here</h3>
                <p className="text-[#AAB0B8] text-sm mb-4">
                  or click to browse from your computer
                </p>
                <p className="text-[#AAB0B8] text-xs">
                  Supports: MP4, MP3, WAV, MOV (Max 500MB)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        {children}
      </div>

      {/* Settings Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:block bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5 overflow-y-auto"
      >
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="w-5 h-5 text-[#FFCB00]" />
          <h3 className="text-lg">Settings</h3>
        </div>
        {settingsPanel || (
          <div className="text-[#AAB0B8] text-sm">
            Configure your job settings here
          </div>
        )}
      </motion.div>

      {/* Mobile Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-[#FFCB00] to-[#FFD766] flex items-center justify-center shadow-[0_10px_30px_rgba(255,203,0,0.3)] z-20"
      >
        <Settings2 className="w-6 h-6 text-[#0B0B0D]" />
      </button>

      {/* Mobile Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3 }}
          className="lg:hidden fixed inset-x-0 bottom-0 bg-[#0F1113] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto z-30 ring-1 ring-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#FFCB00]" />
              <h3 className="text-lg">Settings</h3>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="text-[#AAB0B8] hover:text-[#F6F7F9]"
            >
              Close
            </button>
          </div>
          {settingsPanel}
        </motion.div>
      )}
    </div>
  );
}
