import { motion } from 'motion/react';

export function Logo({ variant = 'animated', size = 'md' }) {
  const sizeMap = {
    sm: 'w-28 h-28',
    md: 'w-36 h-36',
    lg: 'w-40 h-12 max-w-[150px]'
  };

  const logoElement = (
    <div className={`${sizeMap[size]} relative flex items-center justify-center`}>
      {/* Updated image */}
      <img
        src="/images/zebracat-logo.png"
        alt="Logo"
        className="w-full h-full object-contain"
      />
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
