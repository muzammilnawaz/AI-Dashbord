import { motion } from 'motion/react';
import { useState } from 'react';
import { Logo } from './Logo';
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
  Bell,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  userEmail: string;
}

export function Layout({ children, currentPage, onPageChange, onLogout, userEmail }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-[#0F1113] border-r border-white/5 flex-col">
        <div className="p-6 border-b border-white/5">
          <Logo variant="static" size="md" />
          <p className="text-[#AAB0B8] text-sm mt-2">AI Orchestration</p>
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
                <p className="text-[#AAB0B8] text-sm mt-2">AI Orchestration</p>
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
        <header className="sticky top-0 z-30 bg-[#0B0B0D]/80 backdrop-blur-lg border-b border-white/5">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg lg:text-xl">
                  {navItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
                </h2>
                <p className="text-[#AAB0B8] text-sm hidden lg:block">{userEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-[#AAB0B8]" /> : <Moon className="w-5 h-5 text-[#AAB0B8]" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
                <Bell className="w-5 h-5 text-[#AAB0B8]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFCB00] rounded-full" />
              </button>
              <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0F1113] ring-1 ring-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFCB00] to-[#FFD766] flex items-center justify-center">
                  <span className="text-[#0B0B0D] text-sm">
                    {userEmail.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-[#F6F7F9]">{userEmail.split('@')[0]}</span>
              </div>
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
