import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { InputEmail } from './InputEmail.jsx';
import { InputText } from './InputText.jsx';
import { InputPassword } from './InputPassword.jsx';
import { PrimaryButton } from './PrimaryButton.jsx';
import { Logo } from './Logo.jsx';
import { Mail } from 'lucide-react';

export function LoginCard({ onLoginSuccess, onVerificationSuccess }) {
  const [step, setStep] = useState(1); // 1 = email, 2 = create account, 3 = verify email
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(55); // 55 seconds countdown
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const timerRef = useRef(null);
  const verificationTimeoutRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Countdown timer for resend email
  useEffect(() => {
    if (step === 3 && resendTimer > 0) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      // Clear timer when step changes or timer reaches 0
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [step, resendTimer]);

  const handleVerificationSuccess = () => {
    // Show success message
    setShowSuccessMessage(true);

    // After showing success message, redirect to onboarding
    setTimeout(() => {
      if (onVerificationSuccess) {
        onVerificationSuccess({ email, fullName });
      }
    }, 1500);
  };

  // Mock verification simulation - auto-verify after 3 seconds
  useEffect(() => {
    if (step === 3) {
      // Clear any existing verification timeout
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }

      // Simulate verification after 3 seconds
      verificationTimeoutRef.current = setTimeout(() => {
        handleVerificationSuccess();
      }, 3000);

      return () => {
        if (verificationTimeoutRef.current) {
          clearTimeout(verificationTimeoutRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleResendEmail = () => {
    // Clicking resend email triggers verification (mock)
    handleVerificationSuccess();
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Simulate API call to verify email
    setTimeout(() => {
      setLoading(false);
      setStep(2); // Move to step 2
    }, 1500);
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setFullNameError('');
    setPasswordError('');

    let hasError = false;

    if (!fullName.trim()) {
      setFullNameError('Please enter your full name');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Please enter a password');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Move to verify email step
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full flex items-center justify-center p-6 lg:p-8"
    >
      {/* Success message overlay */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#0F1113] px-6 py-3 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
          >
            <p className="text-[#FFCB00] font-medium">Email verified successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md">
        {/* Logo - visible on mobile/tablet */}
        <div className="flex justify-center mb-8 lg:hidden">
          <Logo variant="animated" size="lg" />
        </div>

        {/* Card */}
        <motion.div
          className="bg-[#0F1113] rounded-2xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="mb-8">
                  <h2 className="mb-3">Welcome Back</h2>
                  <p className="text-[#AAB0B8]">
                    Enter your email to continue to your AI studio
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <InputEmail
                    value={email}
                    onChange={setEmail}
                    error={emailError}
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
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="mb-8">
                  <h2 className="mb-3">Create Account</h2>
                  <p className="text-[#AAB0B8]">
                    {loading ? 'Verifying...' : 'Complete your account setup'}
                  </p>
                </div>

                <form onSubmit={handleAccountSubmit} className="space-y-6">
                  <InputText
                    value={fullName}
                    onChange={setFullName}
                    error={fullNameError}
                    disabled={loading}
                    label="Full Name"
                  />

                  <InputPassword
                    value={password}
                    onChange={setPassword}
                    error={passwordError}
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
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center"
              >
                <div className="mb-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFCB00] to-[#FFD766] flex items-center justify-center">
                      <Mail className="w-8 h-8 text-[#0B0B0D]" />
                    </div>
                  </div>
                  <h2 className="mb-3">Verify Your Email</h2>
                  <p className="text-[#AAB0B8]">
                    We've sent a verification email to your email address. Please check your inbox and click the verification link to continue.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-[#AAB0B8] text-sm mb-4">
                      Didn't get the email?
                    </p>
                    {resendTimer > 0 ? (
                      <p className="text-[#AAB0B8] text-sm">
                        Resend email in{' '}
                        <span className="text-[#FFCB00]">
                          {String(Math.floor(resendTimer / 60)).padStart(2, '0')}:
                          {String(resendTimer % 60).padStart(2, '0')}
                        </span>
                      </p>
                    ) : (
                      <button
                        onClick={handleResendEmail}
                        className="text-[#FFCB00] hover:text-[#FFD766] transition-colors duration-200 text-sm font-medium"
                      >
                        Resend email
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

