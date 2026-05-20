import { motion } from 'motion/react';
import { AI_TOOLS } from '../data/tools';
import { Check, X, Info } from 'lucide-react';

export default function ComparisonTable() {
  const toolsToCompare = AI_TOOLS.filter(t => t.pros && t.cons);

  return (
    <div className="max-w-[1400px] mx-auto py-32 px-8">
      <header className="mb-32 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-indigo-200" />
          <span className="micro-label text-indigo-600">ANALYSIS REPORT // 404_COMP</span>
          <div className="h-px w-12 bg-indigo-200" />
        </div>
        <h1 className="text-7xl md:text-8xl font-display font-black text-slate-900 text-center leading-[0.85] tracking-tighter uppercase mb-12">
          技術規律 <span className="font-serif italic font-normal text-slate-400 normal-case">Versus</span> 實戰。
        </h1>
        <p className="max-w-2xl text-center text-slate-500 font-serif italic text-lg leading-relaxed">
          「沒有完美的操作工具，只有最適合場景的解法。我們拆解主流模型的邊界，將黑盒子的內部邏輯矩陣化。」
        </p>
      </header>

      <div className="flex flex-col gap-24">
        {toolsToCompare.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Tool ID Label */}
            <div className="absolute -top-6 left-0 flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest font-mono">MTX_{tool.name.toUpperCase()}</span>
              <div className="h-px w-12 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 rounded-xl overflow-hidden">
              {/* Branding / Best For */}
              <div className="p-12 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50 flex flex-col justify-between">
                <div>
                  <span className="micro-label text-indigo-600 mb-4 block tracking-[0.3em]">{tool.category.toUpperCase()} SEGMENT</span>
                  <h3 className="text-4xl font-display font-black text-slate-900 uppercase tracking-tighter mb-4 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                </div>
                
                <div className="mt-12 bg-white border border-slate-100 p-8 rounded shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    <span className="micro-label text-slate-400">OPTIMIZIED USE CASE</span>
                  </div>
                  <p className="font-mono text-[11px] font-bold text-slate-700 leading-relaxed uppercase tracking-wider">
                    {tool.bestFor || 'GENERAL PURPOSE'}
                  </p>
                </div>
              </div>

              {/* Specs / Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {/* PROS */}
                <div className="p-12 space-y-12">
                  <div className="flex items-center justify-between">
                    <span className="micro-label text-emerald-600 font-bold tracking-[0.3em]">01_TECHNICAL_ADVANTAGE</span>
                    <Check size={14} className="text-emerald-500" />
                  </div>
                  <div className="space-y-6">
                    {tool.pros?.map((pro, i) => (
                      <div key={i} className="flex gap-6 group/item">
                        <span className="font-mono text-xs text-slate-200 font-black">[{i+1}]</span>
                        <p className="text-xs font-bold text-slate-500 group-hover/item:text-slate-900 transition-colors leading-relaxed uppercase tracking-wide">
                          {pro}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CONS */}
                <div className="p-12 space-y-12 bg-rose-50/50">
                  <div className="flex items-center justify-between">
                    <span className="micro-label text-rose-600 font-bold tracking-[0.3em]">02_OPERATIONAL_LIMITS</span>
                    <X size={14} className="text-rose-500" />
                  </div>
                  <div className="space-y-6">
                    {tool.cons?.map((con, i) => (
                      <div key={i} className="flex gap-6 group/item">
                        <span className="font-mono text-xs text-slate-200 font-black">[{i+1}]</span>
                        <p className="text-xs font-bold text-slate-500 group-hover/item:text-rose-600 transition-colors leading-relaxed uppercase tracking-wide italic">
                          {con}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Technical Bar */}
            <div className="mt-4 flex justify-between items-center px-4">
              <div className="flex gap-6">
                <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">Ver: 2024.11</span>
                <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">Loc: Cloud_Mtx</span>
              </div>
              <button className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors">
                VIEW SOURCE_REPO
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
