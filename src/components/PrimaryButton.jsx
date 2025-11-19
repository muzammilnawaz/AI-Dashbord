import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export function PrimaryButton({
  children,
  onClick,
  disabled,
  loading,
  variant = 'primary',
  fullWidth = true,
  type = 'button',
}) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 0.98 }}
      whileTap={disabled || loading ? {} : { scale: 0.96 }}
      className={`
        ${fullWidth ? 'w-full' : 'w-auto'}
        px-6 py-4 rounded-xl
        transition-all duration-200
        flex items-center justify-center gap-2
        min-h-[3.5rem]
        ${isPrimary
          ? 'bg-gradient-to-r from-[#FFCB00] via-[#FFD766] to-[#FFCB00] text-[#0B0B0D]'
          : 'bg-[#0F1113] text-[#F6F7F9] ring-1 ring-[#AAB0B8]/30'
        }
        ${disabled || loading
          ? 'opacity-50 cursor-not-allowed'
          : isPrimary
            ? 'shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)]'
            : 'hover:ring-[#FFCB00]/50'
        }
      `}
      style={{
        backgroundSize: isPrimary ? '200% 100%' : undefined,
      }}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-5 h-5" />
        </motion.div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </motion.button>
  );
}

