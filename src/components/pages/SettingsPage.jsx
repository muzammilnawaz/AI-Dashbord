import { motion } from 'motion/react';
import { User, Key, Bell, Shield, Palette, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, setThemeMode } = useTheme();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl mb-2">Settings</h1>
        <p className="text-[#AAB0B8]">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#0F1113] rounded-2xl p-2 ring-1 ring-white/5">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap
                ${activeTab === tab.id
                  ? 'bg-[#FFCB00] text-[#0B0B0D]'
                  : 'text-[#AAB0B8] hover:bg-white/5'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5">
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFCB00] to-[#FFD766] flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <button className="px-4 py-2 bg-[#FFCB00] text-[#0B0B0D] rounded-lg text-sm hover:shadow-lg transition-all">
                  Change Avatar
                </button>
                <p className="text-xs text-[#AAB0B8] mt-2">JPG, PNG or GIF. Max 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#AAB0B8] mb-2 block">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-[#AAB0B8] mb-2 block">Role</label>
              <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none">
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>

            <button className="px-6 py-3 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all">
              Save Changes
            </button>
          </motion.div>
        )}

        {activeTab === 'api' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg mb-2">API Keys</h3>
              <p className="text-[#AAB0B8] text-sm">Manage your API keys for external integrations</p>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Production Key', key: 'sk_live_***********abc123', created: '2 days ago' },
                { name: 'Development Key', key: 'sk_test_***********xyz789', created: '1 week ago' },
              ].map((apiKey, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#0B0B0D] rounded-xl"
                >
                  <div>
                    <p className="text-sm mb-1">{apiKey.name}</p>
                    <p className="text-xs text-[#AAB0B8] font-mono">{apiKey.key}</p>
                    <p className="text-xs text-[#AAB0B8] mt-1">Created {apiKey.created}</p>
                  </div>
                  <button className="text-red-400 text-sm hover:text-red-300">
                    Revoke
                  </button>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-3 bg-[#0B0B0D] text-[#F6F7F9] rounded-xl ring-1 ring-white/10 hover:ring-[#FFCB00]/50 transition-all">
              <Key className="w-4 h-4" />
              <span>Generate New Key</span>
            </button>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg mb-2">Notification Preferences</h3>
              <p className="text-[#AAB0B8] text-sm">Choose what notifications you want to receive</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Job Completion', desc: 'Get notified when jobs are completed' },
                { label: 'Job Failures', desc: 'Alert me when a job fails' },
                { label: 'Weekly Reports', desc: 'Receive weekly summary reports' },
                { label: 'Product Updates', desc: 'News about new features and updates' },
              ].map((notif, index) => (
                <label
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#0B0B0D] rounded-xl cursor-pointer hover:bg-[#1a1a1c] transition-colors"
                >
                  <div>
                    <p className="text-sm mb-1">{notif.label}</p>
                    <p className="text-xs text-[#AAB0B8]">{notif.desc}</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked={index < 2} />
                    <span className="absolute cursor-pointer inset-0 bg-[#1a1a1c] rounded-full transition-all peer-checked:bg-[#FFCB00] before:absolute before:content-[''] before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg mb-2">Security Settings</h3>
              <p className="text-[#AAB0B8] text-sm">Manage your account security</p>
            </div>

            <div>
              <label className="text-sm text-[#AAB0B8] mb-2 block">Current Password</label>
              <input
                type="password"
                className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">New Password</label>
                <input
                  type="password"
                  className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">Confirm Password</label>
                <input
                  type="password"
                  className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-[#0B0B0D] rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm mb-1">Two-Factor Authentication</p>
                  <p className="text-xs text-[#AAB0B8]">Add extra security to your account</p>
                </div>
                <button className="text-[#FFCB00] text-sm hover:text-[#FFD766]">
                  Enable
                </button>
              </div>
            </div>

            <button className="px-6 py-3 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all">
              Update Password
            </button>
          </motion.div>
        )}

        {activeTab === 'appearance' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg mb-2">Appearance</h3>
              <p className="text-[#AAB0B8] text-sm">Customize how the platform looks</p>
            </div>

            <div>
              <label className="text-sm text-[#AAB0B8] mb-3 block">Theme</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setThemeMode('dark')}
                  className={`p-6 bg-[#0B0B0D] rounded-xl text-left transition-all duration-300 ${
                    theme === 'dark'
                      ? 'ring-2 ring-[#FFCB00]'
                      : 'ring-1 ring-white/10 hover:ring-[#FFCB00]/50'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0B0B0D] to-[#0F1113] rounded-lg mb-3 ring-1 ring-white/10" />
                  <p className="text-sm mb-1">Dark</p>
                  <p className="text-xs text-[#AAB0B8]">
                    {theme === 'dark' ? 'Current theme' : 'Switch to dark'}
                  </p>
                </button>
                <button
                  onClick={() => setThemeMode('light')}
                  className={`p-6 bg-[#0B0B0D] rounded-xl text-left transition-all duration-300 ${
                    theme === 'light'
                      ? 'ring-2 ring-[#FFCB00]'
                      : 'ring-1 ring-white/10 hover:ring-[#FFCB00]/50'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F6F7F9] to-[#ffffff] rounded-lg mb-3" />
                  <p className="text-sm mb-1">Light</p>
                  <p className="text-xs text-[#AAB0B8]">
                    {theme === 'light' ? 'Current theme' : 'Switch to light'}
                  </p>
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#AAB0B8] mb-3 block">Language</label>
              <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

