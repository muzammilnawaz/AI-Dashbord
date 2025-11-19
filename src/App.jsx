import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import { Logo } from './components/Logo.jsx';
import { HeroVideo } from './components/HeroVideo.jsx';
import { LoginCard } from './components/LoginCard.jsx';
import { MobileMenu } from './components/MobileMenu.jsx';
import { Layout } from './components/Layout.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

// Import all page components
import { DashboardPage } from './components/pages/DashboardPage.jsx';
import { DubbingPage } from './components/pages/DubbingPage.jsx';
import { TTSPage } from './components/pages/TTSPage.jsx';
import { STTPage } from './components/pages/STTPage.jsx';
import { VoiceCloningPage } from './components/pages/VoiceCloningPage.jsx';
import { AIStoriesPage } from './components/pages/AIStoriesPage.jsx';
import { MovieStudioPage } from './components/pages/MovieStudioPage.jsx';
import { FilmStudioPage } from './components/pages/FilmStudioPage.jsx';
import { AIAgentsPage } from './components/pages/AIAgentsPage.jsx';
import { SettingsPage } from './components/pages/SettingsPage.jsx';
import { OnboardingPage } from './components/pages/OnboardingPage.jsx';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show content after logo animation
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleVerificationSuccess = (userData) => {
    if (userData) {
      setUserEmail(userData.email);
      setUserName(userData.fullName);
    }
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setCurrentPage('dashboard');
    setShowContent(false);
    // Re-trigger content animation
    setTimeout(() => setShowContent(true), 100);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'dubbing':
        return <DubbingPage />;
      case 'tts':
        return <TTSPage />;
      case 'stt':
        return <STTPage />;
      case 'voice-cloning':
        return <VoiceCloningPage />;
      case 'ai-stories':
        return <AIStoriesPage />;
      case 'movie-studio':
        return <MovieStudioPage />;
      case 'film-studio':
        return <FilmStudioPage />;
      case 'ai-agents':
        return <AIAgentsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#0B0B0D] overflow-x-hidden">
        <AnimatePresence mode="wait">
        {showOnboarding ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OnboardingPage onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : !isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            {/* Mobile header */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#0B0B0D]/80 backdrop-blur-lg border-b border-white/5"
            >
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-[#F6F7F9]" />
                </button>
                <Logo variant="static" size="sm" />
                <div className="w-10" /> {/* Spacer for centering */}
              </div>
            </motion.header>

            {/* Main content */}
            <div className="relative min-h-screen">
              {/* Desktop logo - top left */}
              <div className="hidden lg:block fixed top-6 left-8 z-20">
                <Logo variant="animated" size="lg" />
              </div>

              {/* Desktop layout: Two-column split */}
              <div className="hidden lg:grid lg:grid-cols-[65%_35%] min-h-screen">
                {/* Left: Hero video section */}
                <div className="relative">
                  {showContent && <HeroVideo />}
                </div>

                {/* Right: Login card */}
                <div className="relative bg-[#0B0B0D]">
                  {showContent && <LoginCard onLoginSuccess={handleLoginSuccess} onVerificationSuccess={handleVerificationSuccess} />}
                </div>
              </div>

              {/* Tablet & Mobile layout: Stacked */}
              <div className="lg:hidden">
                {/* Spacer for fixed header */}
                <div className="h-20" />

                {/* Hero section */}
                <div className="relative min-h-[50vh] md:min-h-[60vh]">
                  {showContent && <HeroVideo />}
                </div>

                {/* Login card */}
                <div className="relative bg-[#0B0B0D] min-h-[50vh]">
                  {showContent && <LoginCard onLoginSuccess={handleLoginSuccess} onVerificationSuccess={handleVerificationSuccess} />}
                </div>
              </div>
            </div>

            {/* Background accent elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.03, 0.05, 0.03],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#FFCB00]/10 to-transparent rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.02, 0.04, 0.02],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#FFD766]/10 to-transparent rounded-full blur-3xl"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Layout
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onLogout={handleLogout}
              userEmail={userEmail}
              userName={userName}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </Layout>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

