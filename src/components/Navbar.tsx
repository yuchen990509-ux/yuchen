import { useState, useEffect } from 'react';
import { Sparkles, Menu, Bell, User, Search, Type } from 'lucide-react';

export default function Navbar() {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('user-font-size') as 'normal' | 'large' | 'xlarge') || 'normal';
    }
    return 'normal';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'normal') {
      root.style.fontSize = '16px';
    } else if (fontSize === 'large') {
      root.style.fontSize = '18.5px'; // ~15% larger
    } else if (fontSize === 'xlarge') {
      root.style.fontSize = '21px'; // ~31% larger
    }
    localStorage.setItem('user-font-size', fontSize);
  }, [fontSize]);

  return (
    <nav className="w-full bg-editorial-bg/85 border-b border-editorial-line sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-12">
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-editorial-accent text-white shadow-lg shadow-indigo-950/10 group-hover:rotate-6 transition-transform duration-300">
              <Sparkles size={14} />
            </div>
            <span className="text-sm font-black tracking-tighter text-slate-900 uppercase">
              AI<span className="text-editorial-accent">Portal</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            <a href="#" className="micro-label px-4 py-2 hover:text-editorial-accent transition-colors text-slate-500">產品清單</a>
            <a href="#" className="micro-label px-4 py-2 hover:text-editorial-accent transition-colors text-slate-500">趨勢報告</a>
            <a href="#" className="micro-label px-4 py-2 hover:text-editorial-accent transition-colors text-slate-500">指令清查</a>
            <a href="#" className="micro-label px-4 py-2 hover:text-editorial-accent transition-colors text-slate-500">開發進度</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Font Size Adjuster component */}
          <div className="flex items-center gap-1 bg-slate-100/50 border border-editorial-line p-0.5 rounded-lg">
            <div className="p-1 text-slate-400" title="調整字大小">
              <Type size={13} />
            </div>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                fontSize === 'normal'
                  ? 'bg-white text-editorial-accent shadow-sm border border-editorial-line'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              標準
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                fontSize === 'large'
                  ? 'bg-white text-editorial-accent shadow-sm border border-editorial-line'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              中
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                fontSize === 'xlarge'
                  ? 'bg-white text-editorial-accent shadow-sm border border-editorial-line'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              大
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 pr-6 border-r border-editorial-line">
            <button className="p-1.5 text-slate-400 hover:text-editorial-accent transition-colors">
              <Search size={18} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-editorial-accent transition-colors">
              <Bell size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block micro-label hover:text-editorial-accent transition-colors text-slate-500">
              登入
            </button>
            <button className="hidden sm:block border border-slate-900 px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
              免費註冊
            </button>
          </div>
          <button className="lg:hidden p-2 text-slate-400">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
