import { motion } from 'motion/react';
import { MessageSquare, Target, UserCircle, Layout, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const GUIDE_STEPS = [
  {
    title: '第一步：給它一個「角色」',
    description: '先把 AI 當成一個人。你要它幫什麼忙，就先給它一個職業，它說話的語氣和專業度會瞬間變得很不一樣。',
    bad: '寫封信。',
    good: '你現在是我的「專業職場顧問」，請幫我寫一封有禮貌、但語氣堅定的離職信。',
    icon: UserCircle,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    title: '第二步：話要「講清楚」',
    description: '不要讓 AI 猜你的心思。你想讓它做什麼，動作要精確。越具體，它給你的東西就越好用。',
    bad: '幫我規劃旅遊。',
    good: '請幫我規劃一趟「三天兩夜的台中旅遊行程」，內容要包含三間在地人才知道的小吃，且步調要慢。',
    icon: Target,
    color: 'bg-rose-100 text-rose-700'
  },
  {
    title: '第三步：補上「背景故事」',
    description: '多給一點資訊！你是寫給誰看的？有沒有什麼特別的要求？這些小細節是讓 AI 多懂你一點的關鍵。',
    bad: '講一個笑話。',
    good: '講一個關於「上班族」的冷笑話，要在尾牙表演用的，內容不可以有髒話或太尷尬，要適合長輩聽。',
    icon: MessageSquare,
    color: 'bg-amber-100 text-amber-700'
  },
  {
    title: '第四步：決定「長什麼樣」',
    description: '你希望最後呈現的是表格？還是一段話？還是個清單？先講好格式，你之後就不用自己動手改。',
    bad: '給我幾個晚餐建議。',
    good: '給我 5 個晚餐建議，請用「表格」呈現，欄位包含：[菜名]、[大約熱量]、[所需食材]。',
    icon: Layout,
    color: 'bg-emerald-100 text-emerald-700'
  }
];

export default function AIPromptGuide() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-8">
      {/* Header */}
      <div className="text-center mb-24 uppercase">
        <h2 className="text-xs font-black tracking-[0.3em] text-indigo-600 mb-4">跟 AI 聊天的小撇步</h2>
        <h1 className="font-display text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">如何讓 AI<br/>聽懂你在說什麼？</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-500 italic font-serif text-lg">
          <span>AI 不是神，它更像是一個很聰明但需要指令的實習生。</span>
          <div className="hidden md:block h-px w-12 bg-slate-200" />
          <span>話說對了，效率就翻倍。</span>
        </div>
      </div>

      {/* The Core Formula */}
      <div className="bg-white border border-slate-200 p-12 md:p-16 mb-32 relative overflow-hidden shadow-xl shadow-slate-200/20 rounded-3xl">
        <Sparkles size={200} className="absolute -right-12 -top-12 text-indigo-500/5 rotate-12" />
        <div className="relative z-10 text-slate-900">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
            <span className="h-2 w-10 bg-indigo-600 block" />
            一句話學會精準提問
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l border-slate-100 pl-4">
              <span className="font-display text-4xl block mb-2 text-indigo-600">我是誰</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Role (角色)</p>
            </div>
            <div className="border-l border-slate-100 pl-4">
              <span className="font-display text-4xl block mb-2 text-indigo-600">做什麼</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Task (任務)</p>
            </div>
            <div className="border-l border-slate-100 pl-4">
              <span className="font-display text-4xl block mb-2 text-indigo-600">為誰做</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Context (背景)</p>
            </div>
            <div className="border-l border-slate-100 pl-4">
              <span className="font-display text-4xl block mb-2 text-indigo-600">長怎樣</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Format (格式)</p>
            </div>
          </div>
          <div className="mt-12 p-8 bg-slate-50 border border-slate-100 italic font-serif text-xl leading-relaxed text-slate-600 rounded-xl">
            「請你扮演 [專業角色]，幫我執行 [具體任務]，因為我的目標是 [背景/受眾]，最後請給我 [呈現方式]。」
          </div>
        </div>
      </div>

      {/* Steps Detail */}
      <div className="space-y-32">
        {GUIDE_STEPS.map((step, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={idx} 
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}
          >
            <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
              <div className={`mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full ${step.color}`}>
                <step.icon size={18} />
                <span className="text-xs font-black uppercase tracking-widest">祕訣 0{idx + 1}</span>
              </div>
              <h3 className="font-display text-4xl font-black text-slate-900 uppercase tracking-tight mb-6">
                {step.title}
              </h3>
              <p className="font-serif text-xl leading-relaxed text-slate-500 mb-8">
                {step.description}
              </p>
              <ul className="space-y-4 font-sans text-xs font-bold uppercase tracking-widest text-indigo-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} /> 聽話不走鐘</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} /> 省下修改時間</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} /> 產出更專業</li>
              </ul>
            </div>

            <div className={`space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="bg-white p-8 border-l-4 border-red-500 rounded-r-xl border border-slate-100 shadow-sm shadow-red-500/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400 block mb-4">😕 講得很模糊</span>
                <p className="font-serif text-lg text-slate-400 italic">「{step.bad}」</p>
              </div>
              <div className="flex justify-center -my-2 relative z-10">
                <div className="bg-white p-2 rounded-full border border-slate-200 text-slate-400 shadow-lg">
                  <ArrowRight size={20} className="rotate-90 lg:rotate-0" />
                </div>
              </div>
              <div className="bg-white p-8 border-l-4 border-indigo-600 shadow-xl shadow-indigo-900/5 rounded-r-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block mb-4">🤩 這樣講才對</span>
                <p className="font-serif text-lg text-slate-900 leading-relaxed">「{step.good}」</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pro Tips */}
      <div className="mt-40 pt-20 border-t border-slate-200 text-slate-900">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight mb-12 text-center text-slate-900">
          再來幾招私藏祕技
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-slate-100 bg-white hover:border-indigo-600 transition-all group rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
            <h4 className="font-display text-lg font-black mb-4 group-hover:text-indigo-600 text-slate-900">這招叫：多給範例</h4>
            <p className="font-serif text-sm text-slate-500 leading-relaxed">
              先給它看一個你覺得寫得很好的例子。AI 模仿能力很強，看過之後它就會照著你喜歡的方式寫。
            </p>
          </div>
          <div className="p-8 border border-slate-100 bg-white hover:border-indigo-600 transition-all group rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
            <h4 className="font-display text-lg font-black mb-4 group-hover:text-indigo-600 text-slate-900">這招叫：思考過程</h4>
            <p className="font-serif text-sm text-slate-500 leading-relaxed">
              叫它「一步一步想」。這能讓它頭腦清醒一點，減少它亂編故事或是算錯數學的機會。
            </p>
          </div>
          <div className="p-8 border border-slate-100 bg-white hover:border-indigo-600 transition-all group rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
            <h4 className="font-display text-lg font-black mb-4 group-hover:text-indigo-600 text-slate-900">這招叫：二度修改</h4>
            <p className="font-serif text-sm text-slate-500 leading-relaxed">
              產出內容後，再問它：「你覺得哪裡可以寫得更吸引人？」讓它幫自己打分數，結果通常會更好。
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-32 text-center p-20 bg-indigo-50 border border-indigo-100 relative overflow-hidden rounded-[3rem] shadow-sm">
        <div className="relative z-10">
          <p className="font-serif text-2xl italic text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            「別把 AI 當成神，把它當成身邊那個隨時待命、但需要你多教教它的實習生就對了。」
          </p>
          <button className="bg-slate-900 text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all rounded-full shadow-2xl">
            現在就去跟它聊聊看
          </button>
        </div>
      </div>
    </div>
  );
}
