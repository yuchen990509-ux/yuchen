import { motion } from 'motion/react';
import { Bot, FastForward, Anchor, Target, Rocket, BookmarkCheck, Sparkles } from 'lucide-react';

export default function Conclusion() {
  return (
    <div className="max-w-7xl mx-auto py-24 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-24"
      >
        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6 text-indigo-600">
            <span className="text-[10px] font-bold uppercase tracking-widest">最終章</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            如何開始你的 AI 旅程？
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed italic font-serif">
            「最好的學習方式，就是現在開始。」
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <h3 className="text-2xl font-black text-slate-900 border-b-2 border-slate-100 pb-6 flex items-center gap-4">
              <div className="h-10 w-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/10">
                <Anchor size={20} />
              </div>
              核心思維養成
            </h3>
            <ul className="space-y-10">
              <li className="flex gap-6 group">
                <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center font-bold shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-900 font-display">
                    <Bot size={20} className="text-indigo-600" />
                    它是你的超級助理
                  </h4>
                  <p className="text-slate-500 leading-relaxed">
                    不要害怕它會取代你。AI 目前最擅長的是幫你省下無聊的體力活，讓你有時間去做更有創意且具備人性溫度的決策。
                  </p>
                </div>
              </li>
              <li className="flex gap-6 group">
                <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center font-bold shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-900 font-display">
                    <FastForward size={20} className="text-indigo-600" />
                    多嘗試，別怕錯
                  </h4>
                  <p className="text-slate-500 leading-relaxed">
                    技術每天都在迭代，沒有人是永遠的專家。最好的學習方式就是直接打開工具「玩一玩」，每一次報錯都是在精進你的指令功力。
                  </p>
                </div>
              </li>
              <li className="flex gap-6 group">
                <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center font-bold shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-900 font-display">
                    <Target size={20} className="text-indigo-600" />
                    保有獨立思考
                  </h4>
                  <p className="text-slate-500 leading-relaxed">
                    AI 給出的答案不一定全對。把它當成參考，最後的判斷與品質把關，永遠需要你來掌舵，這也是人類在 AI 時代最核心的競爭力。
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-12">
             <h3 className="text-2xl font-black text-slate-900 border-b-2 border-slate-100 pb-6 flex items-center gap-4">
              <div className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                <Rocket size={20} />
              </div>
              具體行動三步驟
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {[
                { step: '01', title: '找一件煩人的事', desc: '今天就找一個重複性高的工作（如寫報告草稿、改信件格式），丟給 ChatGPT 試試看效果。', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
                { step: '02', title: '挑戰視覺新可能', desc: '下次做簡報或發社群貼文時，試著用 Midjourney 或 Canva AI 生成圖片，體驗 AI 藝術。', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { step: '03', title: '持續關注更新', desc: '將 AI Portal 加入書籤，我們會持續為您發掘全球最頂尖、最實用的工具記錄。', icon: BookmarkCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' }
              ].map((item, i) => (
                <div key={i} className="group p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-indigo-500/50 transition-all">
                  <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6 border border-slate-100`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">STEP {item.step}</span>
                  <h4 className="text-xl font-bold mb-3 text-slate-900 font-display">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-12">
          <div className="inline-block p-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-12">
             <div className="bg-white px-12 py-6 rounded-full border border-slate-100 shadow-sm">
               <p className="text-2xl font-bold italic text-slate-700 font-serif">
                「我們不僅是在使用工具，更是在參與智慧本身的進化。」
              </p>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
