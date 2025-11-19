import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export function InputPassword({ value, onChange, error, disabled }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const hasValue = value.length > 0;
  const showFloatingLabel = isFocused || hasValue;

  return (
    <div className="relative">
      <motion.div
        animate={error ? {
          x: [0, -10, 10, -10, 10, 0],
        } : {}}
        transition={{ duration: 0.25 }}
        className="relative"
      >
        <div
          className={`
            relative flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
            ${error
              ? 'bg-[#F6F7F9] ring-2 ring-red-400/50'
              : isFocused
                ? 'bg-[#F6F7F9] ring-2 ring-[#FFCB00]'
                : 'bg-[#F6F7F9] ring-1 ring-transparent hover:ring-[#AAB0B8]/30'
            }
          `}
          onClick={() => inputRef.current?.focus()}
        >
          <Lock className={`w-5 h-5 transition-colors duration-200 ${
            isFocused ? 'text-[#FFCB00]' : 'text-[#AAB0B8]'
          }`} />
          
          <div className="flex-1 relative">
            {/* Floating label */}
            <motion.label
              animate={{
                y: showFloatingLabel ? -24 : 0,
                scale: showFloatingLabel ? 0.85 : 1,
                x: showFloatingLabel ? -4 : 0,
              }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className={`
                absolute left-0 pointer-events-none origin-left
                transition-colors duration-200
                ${showFloatingLabel
                  ? 'text-[#AAB0B8]'
                  : 'text-[#AAB0B8]'
                }
              `}
              style={{
                fontSize: showFloatingLabel ? '0.75rem' : '1rem',
              }}
            >
              Password
            </motion.label>
            
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              className="w-full bg-transparent text-[#0B0B0D] outline-none"
              style={{
                fontSize: '1rem',
                marginTop: showFloatingLabel ? '0.25rem' : '0',
              }}
              aria-label="Password"
              aria-invalid={!!error}
              aria-describedby={error ? 'password-error' : undefined}
            />
          </div>

          {/* Toggle password visibility */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPassword(!showPassword);
            }}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-[#AAB0B8]" />
            ) : (
              <Eye className="w-5 h-5 text-[#AAB0B8]" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          id="password-error"
          className="text-red-400 text-sm mt-2 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

