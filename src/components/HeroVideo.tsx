import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current || !isHovered) return;
      
      const rect = videoRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      setMousePosition({ x: x * 15, y: y * 15 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full flex flex-col justify-center px-8 lg:px-16"
    >
      {/* Video container with parallax effect */}
      <motion.div
        ref={videoRef}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 lg:mb-12"
      >
        {/* Video background - using gradient as placeholder since we don't have actual video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1113] via-[#1a1a1c] to-[#0F1113]">
          {/* Animated gradient overlay simulating video */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255, 203, 0, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255, 215, 102, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(255, 203, 0, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255, 203, 0, 0.15) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          />
          
          {/* Animated circles simulating video content */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-[#FFCB00]/20 to-transparent blur-3xl"
          />
          
          {/* Grid overlay for tech aesthetic */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255, 203, 0, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 203, 0, 0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50" />
        
        {/* Inner border glow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </motion.div>

      {/* Headline with shimmer animation */}
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <h1 className="mb-4 lg:mb-6">
            Craft Viral Videos in Seconds with{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] bg-clip-text text-transparent">
                AI
              </span>
              {/* Shimmer effect */}
              <motion.div
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
                style={{ width: '50%' }}
              />
            </span>
          </h1>
          <p className="text-[#AAB0B8] text-lg lg:text-xl max-w-2xl">
            Transform your ideas into stunning content with our AI-powered orchestration platform
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
