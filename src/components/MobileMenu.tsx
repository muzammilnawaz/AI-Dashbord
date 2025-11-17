import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Video, Settings, HelpCircle } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = [
    { icon: Home, label: 'Home', href: '#' },
    { icon: Video, label: 'Studio', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: HelpCircle, label: 'Help', href: '#' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#0F1113] z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3>Menu</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="p-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
                >
                  <item.icon className="w-5 h-5 text-[#AAB0B8] group-hover:text-[#FFCB00] transition-colors duration-200" />
                  <span className="text-[#F6F7F9] group-hover:text-[#FFCB00] transition-colors duration-200">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <p className="text-[#AAB0B8] text-sm text-center">
                AI Orchestration Platform
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
