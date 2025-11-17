import { motion } from 'motion/react';
import { useState } from 'react';
import { InputEmail } from './InputEmail';
import { PrimaryButton } from './PrimaryButton';
import { Logo } from './Logo';
import { CheckCircle2 } from 'lucide-react';

interface LoginCardProps {
  onLoginSuccess: (email: string) => void;
}

export function LoginCard({ onLoginSuccess }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Navigate to dashboard after success animation
      setTimeout(() => {
        onLoginSuccess(email);
      }, 1500);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full flex items-center justify-center p-6 lg:p-8"
    >
      <div className="w-full max-w-md">
        {/* Logo - visible on mobile/tablet */}
        <div className="flex justify-center mb-8 lg:hidden">
          <Logo variant="animated" size="lg" />
        </div>

        {/* Card */}
        <motion.div
          className="bg-[#0F1113] rounded-2xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
        >
          {!success ? (
            <>
              <div className="mb-8">
                <h2 className="mb-3">Welcome Back</h2>
                <p className="text-[#AAB0B8]">
                  Enter your email to continue to your AI studio
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputEmail
                  value={email}
                  onChange={setEmail}
                  error={error}
                  disabled={loading}
                />

                <PrimaryButton
                  type="submit"
                  loading={loading}
                  disabled={loading}
                >
                  Continue
                </PrimaryButton>
              </form>

              <div className="mt-8 text-center">
                <a
                  href="#"
                  className="text-[#AAB0B8] hover:text-[#FFCB00] transition-colors duration-200 inline-block"
                >
                  Need help signing in?
                </a>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                className="relative mb-6"
              >
                <CheckCircle2 className="w-16 h-16 text-[#FFCB00]" />
                
                {/* Confetti burst */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI * 2) / 8) * 40,
                      y: Math.sin((i * Math.PI * 2) / 8) * 40,
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#FFCB00]"
                  />
                ))}
              </motion.div>
              
              <h3 className="mb-2">Success!</h3>
              <p className="text-[#AAB0B8]">
                Check your email to continue
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[#AAB0B8] text-sm">
            By continuing you agree to our{' '}
            <a
              href="#"
              className="text-[#F6F7F9] hover:text-[#FFCB00] transition-colors duration-200 underline"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}