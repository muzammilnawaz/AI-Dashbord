import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { Download, Play, Pause, Clock, FileText, Video } from 'lucide-react';

export function DashboardPage() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [videoDurations, setVideoDurations] = useState({});
  const [currentTimes, setCurrentTimes] = useState({});
  const videoRefs = useRef({});
  const stats = [
    { 
      label: 'In Progress', 
      value: '10', 
      subtitle: 'TTS- Training',
      bgColor: 'bg-[#0F1113]',
      textColor: 'text-[#F6F7F9]',
      icon: Clock
    },
    { 
      label: 'Words Total', 
      value: '1000000', 
      subtitle: 'TTS- Training',
      bgColor: 'bg-[#0F1113]',
      textColor: 'text-[#F6F7F9]',
      icon: FileText
    },
    { 
      label: 'Videos Total', 
      value: '25', 
      subtitle: 'TTS- Training',
      bgColor: 'bg-[#0F1113]',
      textColor: 'text-[#F6F7F9]',
      icon: Video
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'PixVerse V4.5 - Camera Push Forward',
      duration: '1:19:35',
      videoUrl: '/images/PixVerse_V4.5_Image_Text_1080P_镜头缓缓前推，小男孩身体不动，.mp4',
      thumbnail: '',
    },
    {
      id: 2,
      title: 'PixVerse V5 - Frame Rotation in Space',
      duration: '1:19:35',
      videoUrl: '/images/PixVerse_V5_Image_Text_1080P_镜头快速向前推，相框在太空中旋转3.mp4',
      thumbnail: '',
    },
    {
      id: 3,
      title: 'ZebraCat - Login Animation',
      duration: '0:00',
      videoUrl: '/images/zebracat-login3.webm',
      thumbnail: '',
    },
  ];

  const handleVideoClick = (videoId) => {
    const video = videoRefs.current[videoId];
    if (!video) return;

    if (playingVideo === videoId) {
      // Pause if already playing
      video.pause();
      setPlayingVideo(null);
    } else {
      // Pause all other videos
      Object.keys(videoRefs.current).forEach((id) => {
        if (videoRefs.current[id] && id !== videoId) {
          videoRefs.current[id].pause();
          videoRefs.current[id].currentTime = 0;
        }
      });
      // Play clicked video
      video.play();
      setPlayingVideo(videoId);
    }
  };

  const handleVideoEnd = (videoId) => {
    setPlayingVideo(null);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoLoadedMetadata = (videoId, videoElement) => {
    if (videoElement && videoElement.duration) {
      setVideoDurations((prev) => ({
        ...prev,
        [videoId]: videoElement.duration,
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-6 shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className={`text-3xl font-bold mb-2 ${stat.textColor}`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${stat.textColor} opacity-80`}>
                  {stat.label}
                </div>
                <div className={`text-xs mt-1 ${stat.textColor} opacity-60`}>
                  {stat.subtitle}
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} border border-white/10 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor} opacity-80`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Translate Done Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#F6F7F9]">
          Video Translate Done
        </h2>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="bg-gray-100 dark:bg-[#0F1113] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              {/* Video Thumbnail */}
              <div 
                className="relative aspect-video bg-gray-200 dark:bg-[#0B0B0D] overflow-hidden group/video cursor-pointer"
                onClick={() => handleVideoClick(video.id)}
              >
                {/* Video Element */}
                <video
                  ref={(el) => (videoRefs.current[video.id] = el)}
                  className="w-full h-full object-cover"
                  {...(video.thumbnail && { poster: video.thumbnail })}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  onEnded={() => handleVideoEnd(video.id)}
                  onLoadedMetadata={(e) => handleVideoLoadedMetadata(video.id, e.target)}
                  onTimeUpdate={(e) => {
                    // Update progress bar and current time
                    const videoElement = e.target;
                    if (videoElement.duration) {
                      const progress = (videoElement.currentTime / videoElement.duration) * 100;
                      setVideoProgress((prev) => ({
                        ...prev,
                        [video.id]: progress,
                      }));
                      setCurrentTimes((prev) => ({
                        ...prev,
                        [video.id]: videoElement.currentTime,
                      }));
                    }
                  }}
                >
                  <source src={video.videoUrl} type={video.videoUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play/Pause button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/90 dark:bg-[#0F1113]/90 flex items-center justify-center shadow-lg">
                    {playingVideo === video.id ? (
                      <Pause className="w-7 h-7 text-gray-700 dark:text-[#AAB0B8]" fill="currentColor" />
                    ) : (
                      <Play className="w-7 h-7 text-gray-700 dark:text-[#AAB0B8] ml-1" fill="currentColor" />
                    )}
                  </div>
                </div>
                
                {/* Live Duration overlay - bottom right */}
                <div className="absolute bottom-8 right-3 px-2 py-1 bg-black/50 rounded text-white text-xs font-medium z-10">
                  {formatTime(currentTimes[video.id] || 0)} / {formatTime(videoDurations[video.id] || 0)}
                </div>
                
                {/* Download icon - bottom right above progress */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle download logic here
                  }}
                  className="absolute bottom-8 right-12 p-1.5 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Download className="w-4 h-4 text-white" />
                </button>
                
                {/* Red Progress Line - Bottom (YouTube style) */}
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-red-600 z-30 transition-all duration-75 ease-linear" 
                  style={{ width: `${videoProgress[video.id] || 0}%` }} 
                />
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800 dark:text-[#F6F7F9]">
                    {video.title}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download logic here
                    }}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/5 rounded transition-colors"
                  >
                    <Download className="w-5 h-5 text-gray-600 dark:text-[#AAB0B8]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

