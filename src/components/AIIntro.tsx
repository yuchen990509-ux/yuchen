import { motion } from 'motion/react';
import { Lightbulb, Zap, Users, Quote } from 'lucide-react';

export default function AIIntro() {
  return (
    <div className="max-w-7xl mx-auto py-32 px-8 technical-grid">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-40"
      >
        <header className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-end border-b border-slate-100 pb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-8 bg-indigo-500" />
              <span className="micro-label text-indigo-600">FOUNDATION_DOC_001</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-slate-900 leading-[0.85] tracking-tighter uppercase mb-6">
              何謂 <br/><span className="text-slate-400 font-serif italic normal-case font-normal">Artificial</span><br/> Intelligence?
            </h1>
          </div>
          <div className="max-w-xl">
            <p className="text-2xl text-slate-500 leading-relaxed font-serif italic mb-8">
              「AI 不僅僅是代碼的堆砌，它是人類智慧的數位鏡像，正在引發一場關於生產力本質的深刻變革。」
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              在 AI Atlas，我們將 AI 視為一種「合成智慧」(Synthetic Intelligence)，它通過海量數據與神經網絡演算法，模擬人類的認知、推理與創造過程。這份指南將帶領您揭開這項技術的核心機制。
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100">
          <div className="bg-white p-12 space-y-8 group hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded flex items-center justify-center">
                <Lightbulb size={24} />
              </div>
              <span className="font-mono text-[40px] font-black text-slate-100 group-hover:text-indigo-600/10 transition-colors tracking-tighter">01</span>
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight mb-4">數據為核心</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                AI 透過深度學習 (Deep Learning) 架構，從海量未標註的數據中提取特徵，形成獨特的「神經元權重」。處理的維度越高，生成的精細度與關聯性就越強。
              </p>
            </div>
          </div>

          <div className="bg-white p-12 space-y-8 group hover:bg-slate-50 transition-colors border-l border-slate-100">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 border border-amber-100 rounded flex items-center justify-center">
                <Zap size={24} />
              </div>
              <span className="font-mono text-[40px] font-black text-slate-100 group-hover:text-amber-600/10 transition-colors tracking-tighter">02</span>
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight mb-4">生成式革命</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                基於 Transformer 架構的生成式模型 (Generative AI)，能夠根據極簡的自然語言指令 (Prompts)，在概率空間中計算出最符合邏輯的產出內容，實現跨媒體的無中生有。
              </p>
            </div>
          </div>

          <div className="bg-white p-12 space-y-8 group hover:bg-slate-50 transition-colors border-l border-slate-100">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded flex items-center justify-center">
                <Users size={24} />
              </div>
              <span className="font-mono text-[40px] font-black text-slate-100 group-hover:text-emerald-600/10 transition-colors tracking-tighter">03</span>
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight mb-4">協同進化的未來</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                AI 的發展路徑正在從「自動化工具」轉變為「智能副駕駛」(Copilot)。它能大幅降低專業門檻，釋放人類在戰略規劃與純粹創意領域的高階潛能。
              </p>
            </div>
          </div>
        </section>

        <div className="relative border border-slate-200 bg-white p-12 md:p-24 overflow-hidden rounded-[2rem] shadow-sm">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] -mr-96 -mt-96" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-[0.9] uppercase tracking-tighter mb-8">
                  DECODE THE <br/><span className="text-indigo-600 italic font-serif font-normal normal-case">Future</span> MARKET
                </h2>
                <div className="space-y-6">
                  {[
                    '生產力重塑：將重複性勞動轉化為即時產出',
                    '創意民主化：將複雜的技術門檻轉向語言操作',
                    '情報決策：從海量混沌數據中精煉核心預測'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="h-2 w-2 bg-indigo-300 group-hover:scale-150 transition-transform" />
                      <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="bg-slate-900 text-white px-10 py-4 rounded font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-2xl">
                獲取完整報告 PDF
              </button>
            </div>

            <div className="w-full lg:w-[450px] p-10 bg-slate-50 border border-slate-200 relative rounded-3xl">
              <Quote size={40} className="text-indigo-500 mb-8 opacity-20 shrink-0" />
              <p className="text-xl italic text-slate-700 leading-relaxed mb-12 font-serif font-light">
                「未來十年，最具價值的技能不再是記住如何使用工具，而是學會如何描述你想要的結果。這就是指令工程 (Prompt Engineering) 的價值所在。」
              </p>
              <div className="flex items-center gap-4 pt-10 border-t border-slate-200">
                <div className="h-10 w-10 bg-indigo-100 rounded flex items-center justify-center font-black text-indigo-600 uppercase tracking-widest text-xs border border-indigo-200">ED</div>
                <div>
                  <div className="text-slate-900 text-xs font-black uppercase tracking-widest">Editorial Board</div>
                  <div className="micro-label text-slate-400">AI Atlas Journal Issue #01</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
