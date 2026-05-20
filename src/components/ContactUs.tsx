import { motion } from 'motion/react';
import { Mail, MessageCircle, Globe, Send, User, AtSign, PenTool } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="max-w-7xl mx-auto py-24 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-20 items-center">
        
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <header>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6 text-indigo-600">
               <span className="text-[10px] font-bold uppercase tracking-widest">保持聯繫</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 font-display">
              讓我們聊天聊<br /><span className="text-indigo-600 font-display">未來的可能。</span>
            </h1>
          </header>

          <p className="text-xl text-slate-500 leading-relaxed max-w-xl italic font-serif">
            無論是產品合作、工具推薦，或是想對我們的報導提供建議，隨時歡迎與我們取得聯繫。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/20 group">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-indigo-100">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">電子郵件</p>
                <p className="font-bold text-slate-900">hello@aiportal.ai</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/20 group">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-100">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">社群媒體</p>
                <p className="font-bold text-slate-900">@ai_portal_hub</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] rotate-3 -z-10 opacity-[0.03]" />
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">
                  您的全名
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="例如：王小明"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all font-sans text-slate-900 placeholder-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">
                  電子信箱
                </label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all font-sans text-slate-900 placeholder-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">
                  您的訊息
                </label>
                <div className="relative">
                  <PenTool className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea 
                    rows={4}
                    placeholder="請描述您的合作意向或建議..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all font-sans resize-none text-slate-900 placeholder-slate-300"
                  />
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200/20">
                <Send size={18} />
                送出訊息
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400 font-medium">
               我們通常會在 24 小時內回覆。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
