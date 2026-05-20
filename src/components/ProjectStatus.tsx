import { motion } from 'motion/react';
import { Calendar, CheckCircle2, Star, Layout, Code, Search, Palette, Rocket } from 'lucide-react';

const PROJECT_PLAN = [
  {
    phase: '第一階段：規劃與架構',
    time: 'Week 1',
    status: 'completed',
    items: ['核心功能定義', '資訊架構設計', '技術棧選定 (React + Tailwind)', '基礎組件庫建立']
  },
  {
    phase: '第二階段：視覺與 UI 設計',
    time: 'Week 2',
    status: 'completed',
    items: ['專業白主題 (Light Theme) 導入', '版式與字體優化', '響應式佈局 (Mobile-First)', '交互動畫設計']
  },
  {
    phase: '第三階段：功能開發',
    time: 'Week 3',
    status: 'in-progress',
    items: ['AI 工具目錄實作', '智能推薦演算法 (Quiz)', '指令煉金術遊戲開發', '潛能測驗邏輯']
  },
  {
    phase: '第四階段：優化與部署',
    time: 'Week 4',
    status: 'upcoming',
    items: ['效能優化與 SEO', '跨瀏覽器相容性測試', '使用者體驗 (UX) 調校', '正式部署上限']
  }
];

const FAVORITE_SITES = [
  {
    name: 'Linear',
    description: '極簡主義的巔峰之作，其深色模式的運用極其優雅。',
    learnings: ['精緻的邊框與陰影處理', '流暢的鍵盤操作體驗', '層次分明的排版架構'],
    icon: Layout
  },
  {
    name: 'Figma',
    description: '互動設計的標竿，完美平衡了功能複雜度與使用者直覺。',
    learnings: ['高度動態的組件系統', '實時協作的數據同步', '優雅的微交互設計'],
    icon: Palette
  },
  {
    name: 'Vercel',
    description: '現代 Web 開發的門面，充分展示了字體美學與留白的力量。',
    learnings: ['大膽的字體運用', '極速的加載與過渡動畫', '開發者友好的介面設計'],
    icon: Code
  }
];

export default function ProjectStatus() {
  return (
    <div className="max-w-6xl mx-auto py-24 px-8 space-y-32">
      {/* Project Plan Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em] mb-4">Development Roadmap</h2>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-display">製作進度與工作項目</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROJECT_PLAN.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 bg-white border ${phase.status === 'completed' ? 'border-indigo-600/20 shadow-xl shadow-slate-200/20' : 'border-slate-100'} rounded-3xl relative overflow-hidden group`}
            >
              {phase.status === 'completed' && (
                <div className="absolute top-4 right-4 text-emerald-500">
                  <CheckCircle2 size={24} />
                </div>
              )}
              
              <div className="text-indigo-600 font-mono text-sm mb-2">{phase.time}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">{phase.phase}</h3>
              
              <ul className="space-y-4">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-500">
                    <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${phase.status === 'completed' ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                    {item}
                  </li>
                ))}
              </ul>

              {phase.status === 'in-progress' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-3/4 animate-pulse" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Design Inspiration Section */}
      <section className="bg-slate-50 rounded-[3rem] border border-slate-200 p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em] mb-4">Inspiration & Tech</h2>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 font-display">設計靈感與<br/>學習目標</h1>
            <p className="text-slate-500 leading-relaxed italic mb-8 font-serif">
              我們不只是在建立一個網站，我們在打造一個「像公司製作出來的專業程式」般的產品。
            </p>
          </div>

          <div className="space-y-12">
            {FAVORITE_SITES.map((site, idx) => (
              <motion.div 
                key={idx}
                className="flex items-start gap-8 group"
              >
                <div className="h-16 w-16 bg-white border border-slate-200 text-indigo-600 shadow-sm rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500">
                  <site.icon size={32} />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">{site.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{site.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {site.learnings.map((learning, i) => (
                      <div key={i} className="px-4 py-2 bg-white border border-slate-100 shadow-sm rounded-xl text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                        {learning}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Identity / Colors */}
      <section className="text-center">
        <div className="mb-16">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em] mb-4">Core Identity</h2>
          <h1 className="text-4xl font-black text-slate-900 font-display">品牌核心色調</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="h-48 bg-white border border-slate-200 rounded-3xl flex items-end p-6 shadow-sm overflow-hidden relative">
               <div className="absolute inset-0 bg-slate-50 -z-10" />
               <div className="h-12 w-full bg-slate-900 rounded-xl" title="Actually showing slate-900 for context" />
              <span className="absolute bottom-6 left-6 text-xs font-bold text-slate-500 uppercase tracking-widest">#0F172A (Text)</span>
            </div>
            <h4 className="font-bold text-slate-900 font-display">主色：石板深藍</h4>
            <p className="text-xs text-slate-500">主要文字、沉穩專業</p>
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-white border border-slate-200 rounded-3xl flex items-end p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">#F8FAFC (BG)</span>
            </div>
            <h4 className="font-bold text-slate-900 font-display">輔色：雲霧白</h4>
            <p className="text-xs text-slate-500">背景、區塊分割、開闊感</p>
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-indigo-500 border border-indigo-400 rounded-3xl flex items-end p-6 shadow-xl shadow-indigo-200">
              <span className="text-xs font-bold text-white uppercase tracking-widest">#4F46E5</span>
            </div>
            <h4 className="font-bold text-slate-900 font-display">強調色：極光靛藍</h4>
            <p className="text-xs text-slate-500">引導視線、重點標示、品牌靈魂</p>
          </div>
        </div>
      </section>
    </div>
  );
}
