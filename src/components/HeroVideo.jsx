import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !isHovered) return;
      
      const rect = containerRef.current.getBoundingClientRect();
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
        ref={containerRef}
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
        className="relative w-full aspect-video rounded-2xl overflow-hidden mb-3 lg:mb-5"
      >
        {/* VIDEO added here */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/images/zebracat-login3.webm"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Grid overlay - subtle */}
        <div
          className="absolute inset-0 opacity-5 z-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 203, 0, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 203, 0, 0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Vignette overlay - subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 z-10" />

        {/* Inner border glow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-10" />
      </motion.div>


      {/* Headline with shimmer animation */}
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <h1 className="mb-4 lg:mb-6" style={{ fontSize: '2.5rem', lineHeight: '1.4' }}>
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

