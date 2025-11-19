import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { 
  LayoutDashboard,
  Languages,
  Mic,
  Volume2,
  UserCircle2,
  Sparkles,
  Clapperboard,
  Film,
  Settings,
  Bot,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  CreditCard,
  Users
} from 'lucide-react';

export function Layout({ children, currentPage, onPageChange, onLogout, userEmail, userName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dubbing', label: 'Dubbing', icon: Languages },
    { id: 'tts', label: 'TTS', icon: Volume2 },
    { id: 'stt', label: 'STT', icon: Mic },
    { id: 'voice-cloning', label: 'Voice Cloning', icon: UserCircle2 },
    { id: 'ai-stories', label: 'AI Stories', icon: Sparkles },
    { id: 'movie-studio', label: 'MovieStudio', icon: Clapperboard },
    { id: 'film-studio', label: 'Film Studio', icon: Film },
    { id: 'ai-agents', label: 'AI Agents', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (pageId) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  // Theme-based classes
  const themeClasses = theme === 'dark' 
    ? {
        bg: 'bg-[#0B0B0D]',
        sidebarBg: 'bg-[#0F1113]',
        headerBg: 'bg-[#0B0B0D]/80',
        text: 'text-[#F6F7F9]',
        textMuted: 'text-[#AAB0B8]',
        border: 'border-white/5',
        cardBg: 'bg-[#0F1113]',
      }
    : {
        bg: 'bg-white',
        sidebarBg: 'bg-gray-50',
        headerBg: 'bg-white/80',
        text: 'text-gray-900',
        textMuted: 'text-gray-600',
        border: 'border-gray-200',
        cardBg: 'bg-white',
      };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg}`}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex fixed left-0 top-0 bottom-0 w-64 ${themeClasses.sidebarBg} border-r ${themeClasses.border} flex-col transition-colors duration-300`}>
        <div className={`p-6 border-b ${themeClasses.border} transition-colors duration-300`}>
          <Logo variant="static" size="md" />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${currentPage === item.id
                    ? 'bg-[#FFCB00] text-[#0B0B0D]'
                    : 'text-[#AAB0B8] hover:bg-white/5 hover:text-[#F6F7F9]'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#AAB0B8] hover:bg-white/5 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#0F1113] z-50 shadow-2xl flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <Logo variant="static" size="md" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${currentPage === item.id
                        ? 'bg-[#FFCB00] text-[#0B0B0D]'
                        : 'text-[#AAB0B8] hover:bg-white/5 hover:text-[#F6F7F9]'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-4 border-t border-white/5">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#AAB0B8] hover:bg-white/5 hover:text-red-400 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className={`sticky top-0 z-30 ${themeClasses.headerBg} backdrop-blur-lg border-b ${themeClasses.border} transition-colors duration-300`}>
          {/* Top section: Icons */}
          <div className="flex items-center justify-between px-4 lg:px-8 py-3">
            {/* Left side - empty on desktop, mobile menu on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block"></div>
            
            {/* Right side - Theme, Community, Profile */}
            <div className="flex items-center gap-2 lg:gap-4 ml-auto">
              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-300 ease-in-out"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-[#AAB0B8]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#AAB0B8]" />
                )}
              </button>

              {/* Community Button */}
              <button
                onClick={() => window.open('https://www.skool.com/zebracat', '_blank')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300/20 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-sm"
                aria-label="Community"
              >
                <Users className="w-4 h-4 text-[#AAB0B8]" />
                <span className="text-sm text-[#AAB0B8] hidden lg:inline">Community</span>
              </button>

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0F1113] ring-1 ring-white/5 hover:ring-[#FFCB00]/50 transition-all duration-300"
                  aria-label="Profile menu"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFCB00] flex items-center justify-center">
                    <span className="text-[#0B0B0D] text-sm font-semibold">
                      {userName ? userName.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-[#F6F7F9] hidden lg:inline">{userEmail.split('@')[0]}</span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5 overflow-hidden z-50 ${
                        theme === 'dark' ? 'bg-[#0F1113]' : 'bg-white'
                      } backdrop-blur-none`}
                      style={{
                        backgroundColor: theme === 'dark' ? '#0F1113' : '#ffffff',
                        opacity: 1
                      }}
                    >
                      <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-[#FFCB00] flex items-center justify-center">
                            <span className="text-[#0B0B0D] text-sm font-semibold">
                              {userName ? userName.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#F6F7F9]' : 'text-gray-900'}`}>
                              {userName || userEmail.split('@')[0]}
                            </p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-[#AAB0B8]' : 'text-gray-500'}`}>
                              {userEmail}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <a
                          href="#"
                          className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            theme === 'dark' ? 'text-[#AAB0B8] hover:bg-white/5 hover:text-[#F6F7F9]' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          Credits & Billing
                        </a>
                        <button
                          onClick={() => {
                            onPageChange('settings');
                            setIsProfileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            theme === 'dark' ? 'text-[#AAB0B8] hover:bg-white/5 hover:text-[#F6F7F9]' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        <div className={`my-2 border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`} />
                        <button
                          onClick={onLogout}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            theme === 'dark' ? 'text-red-400 hover:bg-white/5 hover:text-red-300' : 'text-red-600 hover:bg-gray-100'
                          }`}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom section: User name and email */}
          <div className={`border-t ${themeClasses.border} px-4 lg:px-8 py-2`}>
            <div className="flex flex-col">
              <h2 className={`text-sm lg:text-base ${themeClasses.text} transition-colors duration-300`}>
                Hello {userName || userEmail.split('@')[0]}
              </h2>
              <span className={`${themeClasses.textMuted} text-xs lg:text-sm transition-colors duration-300`}>
                {userEmail}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

