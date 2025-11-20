import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Play, Upload, Download, Trash2, Settings, Shield, X } from 'lucide-react';

export function DubbingStep3Page({ onNavigate }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedScene, setSelectedScene] = useState(null);

  const scenes = [
    {
      id: 1,
      title: 'Original',
      text: 'Text will be de Heretowinbe Here Text will be de Here Text will be Here Text will be de Here Text will be',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=60&fit=crop'
    },
    {
      id: 2,
      title: 'Scene 2',
      text: 'Text will be de Heretowinbe Here Text will be de Here Text will be Here Text will be de Here Text will be',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=60&fit=crop'
    },
    {
      id: 3,
      title: 'Scene 3',
      text: 'Text will be de Heretowinbe Here Text will be de Here Text will be Here Text will be de Here Text will be',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=60&fit=crop'
    },
  ];

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    // Handle delete logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      {/* Top Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0F1113] rounded-xl p-3 ring-1 ring-white/5">
          <label className="text-xs text-[#AAB0B8] mb-1 block">Select Ratio</label>
          <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-2 py-1 rounded ring-1 ring-white/10 text-sm">
            <option>Select speaker</option>
          </select>
        </div>
        <div className="bg-[#0F1113] rounded-xl p-3 ring-1 ring-white/5">
          <label className="text-xs text-[#AAB0B8] mb-1 block">Select Speaker</label>
          <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-2 py-1 rounded ring-1 ring-white/10 text-sm">
            <option>Select speaker</option>
          </select>
        </div>
        <div className="bg-[#0F1113] rounded-xl p-3 ring-1 ring-white/5">
          <label className="text-xs text-[#AAB0B8] mb-1 block">Video Language</label>
          <div className="flex gap-2">
            <select className="flex-1 bg-[#0B0B0D] text-[#F6F7F9] px-2 py-1 rounded ring-1 ring-white/10 text-sm">
              <option>Main Language</option>
            </select>
            <select className="flex-1 bg-[#0B0B0D] text-[#F6F7F9] px-2 py-1 rounded ring-1 ring-white/10 text-sm">
              <option>Host Language</option>
            </select>
          </div>
        </div>
        <div className="bg-[#0F1113] rounded-xl p-3 ring-1 ring-white/5">
          <label className="text-xs text-[#AAB0B8] mb-1 block">Voice Language</label>
          <input type="range" min="0" max="5" defaultValue="3" className="w-full" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 overflow-hidden">
        {/* Left Sidebar - Scenes List */}
        <div className="bg-[#0F1113] rounded-xl p-4 ring-1 ring-white/5 overflow-y-auto">
          {scenes.map((scene) => (
            <div key={scene.id} className="mb-4 last:mb-0">
              <div className="text-sm font-semibold text-[#F6F7F9] mb-2">
                {scene.title}
              </div>
              <div className="flex gap-3">
                <img
                  src={scene.thumbnail}
                  alt={scene.title}
                  className="w-20 h-15 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs text-[#AAB0B8] mb-2 line-clamp-3">
                    {scene.text}
                  </p>
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
                      <Upload className="w-4 h-4 text-[#AAB0B8]" />
                    </button>
                    <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
                      <Download className="w-4 h-4 text-[#AAB0B8]" />
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="p-1.5 hover:bg-white/5 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Content - Video Player and Progress */}
        <div className="flex flex-col gap-4 overflow-hidden">
          {/* Video Player */}
          <div className="flex-1 bg-[#0B0B0D] rounded-xl overflow-hidden relative min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-6xl font-bold opacity-20">HALO</div>
            </div>
            <div className="absolute bottom-4 right-4">
              <button className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg transition-colors">
                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Progress Status */}
          <div className="bg-[#0F1113] rounded-xl p-4 ring-1 ring-white/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#F6F7F9]">Progress Status</h3>
              <span className="text-xs text-[#AAB0B8]">75% to complete</span>
            </div>
            <div className="flex items-center gap-2">
              {['Upload Video', 'Collect Language', 'Collect Voices', 'Upload Complete'].map((step, index) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`
                    flex-1 h-1 rounded
                    ${index < 3 ? 'bg-blue-500' : 'bg-white/10'}
                  `} />
                  {index < 3 && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 mx-1" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#AAB0B8]">
              {['Upload Video', 'Collect Language', 'Collect Voices', 'Upload Complete'].map((step) => (
                <span key={step} className="flex-1 text-center">{step}</span>
              ))}
            </div>
          </div>

          {/* Audio Waveforms */}
          <div className="space-y-3">
            {/* Original Audio */}
            <div className="bg-[#0F1113] rounded-xl p-3 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                </button>
                <div className="flex-1 h-8 bg-[#0B0B0D] rounded flex items-center px-2">
                  <div className="w-full h-4 bg-green-500 rounded" style={{ clipPath: 'polygon(0 50%, 10% 20%, 20% 80%, 30% 10%, 40% 90%, 50% 30%, 60% 70%, 70% 40%, 80% 60%, 90% 25%, 100% 75%)' }} />
                </div>
                <span className="text-xs text-[#AAB0B8]">00:00 / 1:12:25</span>
                <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
                  <Settings className="w-4 h-4 text-[#AAB0B8]" />
                </button>
                <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
                  <Download className="w-4 h-4 text-[#AAB0B8]" />
                </button>
              </div>
            </div>

            {/* Translated Audio */}
            <div className="bg-[#0F1113] rounded-xl p-3 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                </button>
                <div className="flex-1 h-8 bg-[#0B0B0D] rounded flex items-center px-2">
                  <div className="w-full h-4 bg-green-500 rounded" style={{ clipPath: 'polygon(0 50%, 10% 20%, 20% 80%, 30% 10%, 40% 90%, 50% 30%, 60% 70%, 70% 40%, 80% 60%, 90% 25%, 100% 75%)' }} />
                </div>
                <span className="text-xs text-[#AAB0B8]">00:00 / 1:12:25</span>
                <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
                  <Settings className="w-4 h-4 text-[#AAB0B8]" />
                </button>
                <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
                  <Download className="w-4 h-4 text-[#AAB0B8]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmDialog(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-[#0F1113] rounded-xl p-6 shadow-xl ring-1 ring-white/5 max-w-md w-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#F6F7F9]">
                        Confirmation
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="p-1 hover:bg-white/5 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-[#AAB0B8]" />
                  </button>
                </div>
                <p className="text-[#AAB0B8] mb-6">
                  You are about to remove this video are u sure about ?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

