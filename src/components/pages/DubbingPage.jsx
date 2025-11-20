import { motion } from 'motion/react';
import { useState } from 'react';
import { Upload, ArrowUp } from 'lucide-react';

export function DubbingPage({ onNavigate }) {
  const [selectedRatio, setSelectedRatio] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('');
  const [translation, setTranslation] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const ratios = ['9:16', '1:1', '16:9'];
  const speakers = ['1 Person Speak', '2 Person Speak', '3 Person Speak'];
  const translationOptions = ['Only audio', 'Audio and Lips'];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleNavigate();
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleNavigate();
    }
  };

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate('dubbing-step-2');
    }
  };

  const handleLoadLink = () => {
    if (videoLink) {
      handleNavigate();
    }
  };

  const handleUpload = () => {
    handleNavigate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl mb-2 text-[#F6F7F9]">AI-Translate</h1>
        <p className="text-[#AAB0B8]">Live Translate</p>
      </div>

      {/* Control Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Select Ratio */}
        <div className="bg-[#0F1113] rounded-xl p-4 ring-1 ring-white/5">
          <label className="text-sm font-medium text-[#AAB0B8] mb-2 block">
            Select Ratio
          </label>
          <select
            value={selectedRatio}
            onChange={(e) => setSelectedRatio(e.target.value)}
            className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-3 py-2 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-[#FFCB00] outline-none text-sm"
          >
            <option value="">Select ratio</option>
            {ratios.map((ratio) => (
              <option key={ratio} value={ratio}>{ratio}</option>
            ))}
          </select>
        </div>

        {/* Select Speaker */}
        <div className="bg-[#0F1113] rounded-xl p-4 ring-1 ring-white/5">
          <label className="text-sm font-medium text-[#AAB0B8] mb-2 block">
            Select Speaker
          </label>
          <select
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
            className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-3 py-2 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-[#FFCB00] outline-none text-sm"
          >
            <option value="">Select Speaker</option>
            {speakers.map((speaker) => (
              <option key={speaker} value={speaker}>{speaker}</option>
            ))}
          </select>
        </div>

        {/* Translation */}
        <div className="bg-[#0F1113] rounded-xl p-4 ring-1 ring-white/5">
          <label className="text-sm font-medium text-[#AAB0B8] mb-2 block">
            Translation
          </label>
          <select
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-3 py-2 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-[#FFCB00] outline-none text-sm"
          >
            <option value="">Please select</option>
            {translationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Link Section */}
      <div className="bg-[#0F1113] rounded-xl p-6 ring-1 ring-white/5">
        <h3 className="text-lg font-semibold text-[#F6F7F9] mb-1">
          Add Link
        </h3>
        <p className="text-sm text-[#AAB0B8] mb-4">
          Live video translation Training
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 bg-[#0B0B0D] text-[#F6F7F9] px-4 py-2 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-[#FFCB00] outline-none text-sm placeholder:text-[#AAB0B8]"
          />
          <button
            onClick={handleLoadLink}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Load it
          </button>
        </div>
      </div>

      {/* Upload Video Section */}
      <div className="bg-[#0F1113] rounded-xl p-6 ring-1 ring-white/5">
        <h3 className="text-lg font-semibold text-[#F6F7F9] mb-1">
          Upload Video
        </h3>
        <p className="text-sm text-[#AAB0B8] mb-4">
          Local video translation Training
        </p>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-8 transition-all duration-200
            ${dragActive 
              ? 'border-[#FFCB00] bg-[#FFCB00]/5' 
              : 'border-white/20 hover:border-[#FFCB00]/50 bg-[#0B0B0D]'
            }
          `}
        >
          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFCB00]/10 flex items-center justify-center mb-3">
              <ArrowUp className="w-6 h-6 text-[#FFCB00]" />
            </div>
            <p className="text-sm text-[#AAB0B8] mb-2">
              Select the video from your local machine *mp4 only
            </p>
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
