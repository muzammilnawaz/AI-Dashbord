import { motion } from 'motion/react';
import { useState } from 'react';
import { PrimaryButton } from '../PrimaryButton.jsx';
import { Logo } from '../Logo.jsx';
import { ArrowLeft } from 'lucide-react';

export function OnboardingPage({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const totalQuestions = 2;

  const questions = [
    {
      id: 1,
      question: 'What is your background?',
      options: [
        'Business owner',
        'Marketing professional',
        'Agency professional',
        'Content Creator',
        'Student/Educator',
        'Other'
      ]
    },
    {
      id: 2,
      question: 'How did you discover Zebracat?',
      options: [
        // Column 1
        'Instagram',
        'Friend/Colleague',
        'Zebracat watermark',
        'skool.com',
        'LinkedIn',
        'Blog',
        // Column 2
        'YouTube Shorts',
        'TikTok',
        'Google search',
        'YouTube',
        'Twitter',
        'Other'
      ]
    }
  ];

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
    }
  };

  const handleContinue = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      // Complete onboarding
      if (onComplete) {
        onComplete();
      }
    }
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      {/* Logo - top left corner (always visible) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-6 left-6 lg:top-8 lg:left-8 z-20"
      >
        <Logo variant="animated" size="lg" />
      </motion.div>

      {/* Banner text - always at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full py-4 px-6 lg:px-8 text-center"
      >
        <p className="text-[#AAB0B8] text-lg lg:text-xl">
          Your feedback matters! Share 2 quick responses to help us improve your experience.
        </p>
      </motion.div>

      <div className="p-6 lg:p-8">
        {/* Title - only show on first question */}
        {currentQuestion === 1 && (
          <div className="text-center mb-8 lg:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl lg:text-4xl font-bold mb-3 text-[#F6F7F9]"
            >
              Glad to Have You at Zebracat! 🎉
            </motion.h1>
          </div>
        )}

        {/* Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-2xl bg-[#0F1113] rounded-2xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
          >
            {/* Progress bar with numbered circles */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4 relative">
              {currentQuestion === 2 ? (
                <>
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1c] text-[#9333EA] hover:bg-[#252528] transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <span className="absolute left-1/2 -translate-x-1/2 text-[#AAB0B8] text-sm">
                    Question {currentQuestion}/{totalQuestions}
                  </span>
                  <div className="w-10"></div> {/* Spacer for centering */}
                </>
              ) : (
                <span className="text-[#AAB0B8] text-sm w-full text-center">
                  Question {currentQuestion}/{totalQuestions}
                </span>
              )}
              </div>
              <div className="flex items-center gap-4">
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200
                  ${currentQuestion >= 1
                    ? 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white'
                    : 'bg-[#1a1a1c] text-[#AAB0B8] ring-1 ring-white/10'
                  }
                `}>
                  1
                </div>
              </div>
              {/* Connector line */}
              <div className="flex-1 h-0.5 bg-[#1a1a1c]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: currentQuestion >= 2 ? '100%' : '0%' }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="h-full bg-gradient-to-r from-[#9333EA] to-[#A855F7]"
                />
              </div>
              {/* Step 2 */}
              <div className="flex items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200
                  ${currentQuestion >= 2
                    ? 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white'
                    : 'bg-[#1a1a1c] text-[#AAB0B8] ring-1 ring-white/10'
                  }
                `}>
                  2
                </div>
              </div>
              </div>
            </div>

            {/* Question */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-6"
            >
              <h2 className="text-xl lg:text-2xl font-semibold mb-8 lg:mb-10 text-center text-[#F6F7F9]">
                {questions[currentQuestion - 1].question}
              </h2>

              {/* Options - 2 column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 lg:mb-8">
                {questions[currentQuestion - 1].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    className={`
                      text-left px-6 py-4 rounded-xl transition-all duration-200
                      ${selectedOption === option
                        ? 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white ring-2 ring-[#9333EA]/50'
                        : 'bg-[#1a1a1c] text-[#AAB0B8] hover:bg-[#252528] hover:text-[#F6F7F9] ring-1 ring-transparent hover:ring-white/10'
                      }
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Continue button */}
            <motion.button
              onClick={handleContinue}
              disabled={!selectedOption}
              whileHover={!selectedOption ? {} : { scale: 0.98 }}
              whileTap={!selectedOption ? {} : { scale: 0.96 }}
              className={`
              w-full px-6 py-6 rounded-xl mt-6 lg:mt-8
              transition-all duration-200
              flex items-center justify-center gap-2
              min-h-[3.5rem]
              ${!selectedOption
                ? 'opacity-50 cursor-not-allowed bg-[#1a1a1c] text-[#AAB0B8]'
                : 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white shadow-[0_10px_30px_rgba(147,51,234,0.3)] hover:shadow-[0_15px_40px_rgba(147,51,234,0.4)]'
              }
            `}
          >
            {currentQuestion < totalQuestions ? 'Continue' : 'Submit'}
          </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

