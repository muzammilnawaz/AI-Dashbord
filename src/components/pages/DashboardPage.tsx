import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Download,
  MoreVertical
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', jobs: 12 },
  { name: 'Tue', jobs: 19 },
  { name: 'Wed', jobs: 15 },
  { name: 'Thu', jobs: 25 },
  { name: 'Fri', jobs: 22 },
  { name: 'Sat', jobs: 18 },
  { name: 'Sun', jobs: 14 },
];

export function DashboardPage() {
  const stats = [
    { label: 'Total Jobs', value: '1,247', change: '+12.5%', trend: 'up' },
    { label: 'Processing', value: '8', change: 'Live', trend: 'neutral' },
    { label: 'Completed', value: '1,203', change: '+8.2%', trend: 'up' },
    { label: 'Failed', value: '36', change: '-2.1%', trend: 'down' },
  ];

  const recentJobs = [
    {
      id: 1,
      name: 'Video_Dubbing_Project_01.mp4',
      type: 'Dubbing',
      status: 'completed',
      progress: 100,
      time: '2 min ago',
    },
    {
      id: 2,
      name: 'Podcast_TTS_Episode_12.mp3',
      type: 'TTS',
      status: 'processing',
      progress: 67,
      time: '5 min ago',
    },
    {
      id: 3,
      name: 'Meeting_Transcript_042.wav',
      type: 'STT',
      status: 'completed',
      progress: 100,
      time: '12 min ago',
    },
    {
      id: 4,
      name: 'Voice_Clone_Sarah.mp3',
      type: 'Voice Cloning',
      status: 'processing',
      progress: 34,
      time: '18 min ago',
    },
    {
      id: 5,
      name: 'AI_Story_Chapter_05.mp4',
      type: 'AI Stories',
      status: 'failed',
      progress: 0,
      time: '25 min ago',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5 hover:ring-[#FFCB00]/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-[#AAB0B8] text-sm">{stat.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-400/10 text-green-400' :
                stat.trend === 'down' ? 'bg-red-400/10 text-red-400' :
                'bg-[#FFCB00]/10 text-[#FFCB00]'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl mb-1">Job Activity</h3>
            <p className="text-[#AAB0B8] text-sm">Last 7 days</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFCB00]" />
            <span className="text-sm text-[#AAB0B8]">Jobs</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFCB00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FFCB00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#AAB0B8" />
              <YAxis stroke="#AAB0B8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F1113', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#F6F7F9'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="jobs" 
                stroke="#FFCB00" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorJobs)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-[#0F1113] rounded-2xl p-6 ring-1 ring-white/5"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl">Recent Jobs</h3>
          <button className="text-[#FFCB00] hover:text-[#FFD766] transition-colors text-sm">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0B0D]/50 hover:bg-[#0B0B0D] transition-all duration-200 group"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                job.status === 'completed' ? 'bg-green-400/10' :
                job.status === 'processing' ? 'bg-[#FFCB00]/10' :
                'bg-red-400/10'
              }`}>
                {job.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                {job.status === 'processing' && <Clock className="w-5 h-5 text-[#FFCB00]" />}
                {job.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm truncate text-[#F6F7F9]">{job.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-[#AAB0B8] shrink-0">
                    {job.type}
                  </span>
                </div>
                {job.status === 'processing' ? (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#0B0B0D] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress}%` }}
                        className="h-full bg-gradient-to-r from-[#FFCB00] to-[#FFD766]"
                      />
                    </div>
                    <span className="text-xs text-[#AAB0B8]">{job.progress}%</span>
                  </div>
                ) : (
                  <p className="text-xs text-[#AAB0B8]">{job.time}</p>
                )}
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {job.status === 'completed' && (
                  <>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <Play className="w-4 h-4 text-[#AAB0B8]" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <Download className="w-4 h-4 text-[#AAB0B8]" />
                    </button>
                  </>
                )}
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <MoreVertical className="w-4 h-4 text-[#AAB0B8]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
