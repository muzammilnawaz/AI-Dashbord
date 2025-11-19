import { motion } from 'motion/react';
import { Bot, Play, Pause, Settings, Plus, Activity } from 'lucide-react';
import { useState } from 'react';

export function AIAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const agents = [
    {
      id: 1,
      name: 'Video Editor Agent',
      avatar: '🎬',
      status: 'active',
      tasks: 12,
      success: 98,
      description: 'Automatically edits and enhances videos'
    },
    {
      id: 2,
      name: 'Content Writer Agent',
      avatar: '✍️',
      status: 'idle',
      tasks: 8,
      success: 95,
      description: 'Generates scripts and captions'
    },
    {
      id: 3,
      name: 'Audio Processor Agent',
      avatar: '🎵',
      status: 'active',
      tasks: 15,
      success: 99,
      description: 'Handles audio enhancement and mixing'
    },
    {
      id: 4,
      name: 'Translation Agent',
      avatar: '🌐',
      status: 'paused',
      tasks: 5,
      success: 97,
      description: 'Translates content across languages'
    },
  ];

  const recentTasks = [
    { agent: 'Video Editor', task: 'Edit product demo', status: 'completed', time: '2m ago' },
    { agent: 'Audio Processor', task: 'Mix podcast episode', status: 'processing', time: '5m ago' },
    { agent: 'Content Writer', task: 'Generate captions', status: 'completed', time: '8m ago' },
    { agent: 'Translation', task: 'Translate to Spanish', status: 'queued', time: '10m ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl mb-2">AI Agents</h1>
          <p className="text-[#AAB0B8]">Autonomous agents handling your AI workflows</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFCB00] to-[#FFD766] text-[#0B0B0D] rounded-xl shadow-[0_10px_30px_rgba(255,203,0,0.12)] hover:shadow-[0_15px_40px_rgba(255,203,0,0.18)] transition-all">
          <Plus className="w-5 h-5" />
          <span className="hidden lg:inline">New Agent</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedAgent(agent.id)}
            className={`
              bg-[#0F1113] rounded-2xl p-6 ring-1 transition-all duration-200 cursor-pointer
              ${selectedAgent === agent.id 
                ? 'ring-[#FFCB00]' 
                : 'ring-white/5 hover:ring-[#FFCB00]/30'
              }
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFCB00]/20 to-[#FFD766]/20 flex items-center justify-center text-2xl">
                {agent.avatar}
              </div>
              <div className={`
                w-3 h-3 rounded-full
                ${agent.status === 'active' ? 'bg-green-400 animate-pulse' :
                  agent.status === 'idle' ? 'bg-[#AAB0B8]' :
                  'bg-[#FFCB00]'
                }
              `} />
            </div>
            
            <h3 className="text-lg mb-2">{agent.name}</h3>
            <p className="text-sm text-[#AAB0B8] mb-4">{agent.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-[#AAB0B8]">Tasks: </span>
                <span className="text-[#F6F7F9]">{agent.tasks}</span>
              </div>
              <div>
                <span className="text-[#AAB0B8]">Success: </span>
                <span className="text-green-400">{agent.success}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agent Details */}
      {selectedAgent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Agent Configuration</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Play className="w-5 h-5 text-green-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Pause className="w-5 h-5 text-[#FFCB00]" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Settings className="w-5 h-5 text-[#AAB0B8]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Metrics */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">Task Queue</label>
                <div className="bg-[#0B0B0D] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Processing capacity</span>
                    <span className="text-sm text-[#FFCB00]">75%</span>
                  </div>
                  <div className="h-2 bg-[#0F1113] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-full bg-gradient-to-r from-[#FFCB00] to-[#FFD766]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">Recent Activity</label>
                <div className="bg-[#0B0B0D] rounded-xl p-4 space-y-2">
                  {[
                    { action: 'Processed video', time: '30s ago' },
                    { action: 'Generated transcript', time: '2m ago' },
                    { action: 'Applied filters', time: '5m ago' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-[#F6F7F9]">{activity.action}</span>
                      <span className="text-[#AAB0B8]">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">Priority</label>
                <select className="w-full bg-[#0B0B0D] text-[#F6F7F9] px-4 py-3 rounded-xl ring-1 ring-white/10 focus:ring-[#FFCB00] outline-none">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-[#AAB0B8] mb-2 block">Auto-restart</label>
                <label className="relative inline-block w-full">
                  <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                  <div className="flex items-center justify-between p-4 bg-[#0B0B0D] rounded-xl cursor-pointer">
                    <span className="text-sm">Enabled</span>
                    <div className="relative inline-block w-12 h-6">
                      <span className="absolute cursor-pointer inset-0 bg-[#1a1a1c] rounded-full transition-all peer-checked:bg-[#FFCB00] before:absolute before:content-[''] before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#FFCB00]" />
          Recent Tasks
        </h3>
        <div className="space-y-3">
          {recentTasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-[#0B0B0D] rounded-xl hover:bg-[#1a1a1c] transition-colors"
            >
              <Bot className="w-10 h-10 text-[#FFCB00]" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm">{task.task}</p>
                  <span className={`
                    text-xs px-2 py-0.5 rounded
                    ${task.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                      task.status === 'processing' ? 'bg-[#FFCB00]/10 text-[#FFCB00]' :
                      'bg-[#AAB0B8]/10 text-[#AAB0B8]'
                    }
                  `}>
                    {task.status}
                  </span>
                </div>
                <p className="text-xs text-[#AAB0B8]">{task.agent} • {task.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

