import { motion } from 'motion/react';

interface LogoProps {
  variant?: 'static' | 'animated';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'animated', size = 'md' }: LogoProps) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const logoElement = (
    <div className={`${sizeMap[size]} relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFCB00] to-[#FFD766] rounded-xl" />
      <div className="absolute inset-[2px] bg-[#0B0B0D] rounded-[10px] flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          <path
            d="M4 4L20 20M4 20L20 4"
            stroke="url(#logo-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="logo-gradient" x1="4" y1="4" x2="20" y2="20">
              <stop offset="0%" stopColor="#FFCB00" />
              <stop offset="100%" stopColor="#FFD766" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );

  if (variant === 'animated') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {logoElement}
      </motion.div>
    );
  }

  return logoElement;
}
