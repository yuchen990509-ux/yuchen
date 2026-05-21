import { Search, Sparkles, TrendingUp, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="relative pt-32 pb-40 overflow-hidden bg-editorial-bg technical-grid">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-editorial-line/50 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-px w-8 bg-editorial-border" />
          <span className="micro-label text-editorial-accent">
            Volume 01 // Issue 2024
          </span>
          <div className="h-px w-8 bg-editorial-border" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl font-display text-7.5xl md:text-[112px] font-black text-slate-900 text-center leading-[0.88] tracking-tighter mb-12 uppercase"
        >
          探索 <span className="font-serif italic font-normal text-slate-400 normal-case">Artificial</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-editorial-accent to-slate-900">Intelligence</span> 的極致。
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-slate-500 text-lg md:text-xl text-center font-sans mb-16 leading-relaxed italic"
        >
          「我們收錄全球最具啟發性的 AI 紀錄與工具，<br className="hidden md:block" />
          旨在縮短人類創意與數位實踐之間的距離。」
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl relative group"
        >
          <div className="absolute -inset-4 bg-editorial-accent/5 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const el = document.getElementById('core-registry-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="relative flex items-center bg-white border border-editorial-border rounded-2xl p-1.5 pl-6 shadow-xl shadow-slate-200/20 transition-all group-hover:border-editorial-accent/55"
          >
            <Search className="text-slate-400" size={20} />
            <input
              id="search-input"
              type="text"
              placeholder="SEARCH THE DATABASE_v2..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent px-4 py-4 font-mono text-xs uppercase tracking-widest focus:outline-none text-slate-900 placeholder-slate-300"
            />
            <div className="hidden sm:flex items-center pr-2">
              <button 
                type="submit"
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-editorial-accent transition-all shadow-xl cursor-pointer"
              >
                執行檢索
              </button>
            </div>
          </form>
        </motion.div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-editorial-line pt-12 w-full max-w-4xl">
          {[
            { label: '最新收錄', value: '1,280+', color: 'text-editorial-accent' },
            { label: '熱門分類', value: '24+', color: 'text-slate-900' },
            { label: '每日更新', value: '24/7', color: 'text-slate-900' },
            { label: '社群評價', value: 'High', color: 'text-emerald-700 font-bold' }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="micro-label text-slate-400 mb-2">{stat.label}</p>
              <p className={`font-display text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
