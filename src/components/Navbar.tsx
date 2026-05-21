import { useState, useEffect } from 'react';
import { Sparkles, Menu, Bell, User, Search, Type, X, LogOut, Check, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentView?: string;
  onViewChange?: (view: any) => void;
  onFocusSearch?: () => void;
}

export default function Navbar({ currentView, onViewChange, onFocusSearch }: NavbarProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('user-font-size') as 'normal' | 'large' | 'xlarge') || 'normal';
    }
    return 'normal';
  });

  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user-auth-username') || null;
    }
    return null;
  });

  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Form states
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Notifications
  const notifications = [
    { id: 1, text: "系統已成功整合全新 GPT-4o 圖像分析能力記錄。", time: "10分鐘前", isNew: true },
    { id: 2, text: "您的指令挑戰積分已同步至雲端（當前進度：Green）。", time: "1小時前", isNew: true },
    { id: 3, text: "週刊 Issue #40 已發佈，歡迎點擊閱讀最新趨勢報告。", time: "1天前", isNew: false },
  ];

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

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!emailInput) {
      setAuthError('請填寫電子信箱。');
      return;
    }
    if (authModal === 'signup' && !nameInput) {
      setAuthError('請填寫您的稱呼。');
      return;
    }
    if (!passwordInput || passwordInput.length < 6) {
      setAuthError('密碼長度必須大於 6 位數。');
      return;
    }

    // Success response
    const username = authModal === 'signup' ? nameInput : emailInput.split('@')[0];
    setAuthSuccess(authModal === 'signup' ? '註冊成功！系統正為您登入...' : '登入成功！正在載入個人帳號...');
    
    setTimeout(() => {
      localStorage.setItem('user-auth-username', username);
      setCurrentUser(username);
      setAuthModal(null);
      setEmailInput('');
      setNameInput('');
      setPasswordInput('');
      setAuthSuccess('');
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.removeItem('user-auth-username');
    setCurrentUser(null);
    setShowUserDropdown(false);
  };

  return (
    <nav className="w-full bg-editorial-bg/85 border-b border-editorial-line sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-12">
          <button 
            onClick={() => onViewChange?.('directory')} 
            className="flex items-center gap-2 group cursor-pointer text-left bg-transparent border-none p-0"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-editorial-accent text-white shadow-lg shadow-indigo-950/10 group-hover:rotate-6 transition-transform duration-300">
              <Sparkles size={14} />
            </div>
            <span className="text-sm font-black tracking-tighter text-slate-900 uppercase">
              AI<span className="text-editorial-accent">Portal</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onViewChange?.('directory')}
              className={`micro-label px-4 py-2 hover:text-editorial-accent transition-colors cursor-pointer ${
                currentView === 'directory' ? 'text-editorial-accent opacity-100 font-black' : 'text-slate-500'
              }`}
            >
              產品清單
            </button>
            <button
              onClick={() => onViewChange?.('comparison')}
              className={`micro-label px-4 py-2 hover:text-editorial-accent transition-colors cursor-pointer ${
                currentView === 'comparison' ? 'text-editorial-accent opacity-100 font-black' : 'text-slate-500'
              }`}
            >
              趨勢報告
            </button>
            <button
              onClick={() => onViewChange?.('guide')}
              className={`micro-label px-4 py-2 hover:text-editorial-accent transition-colors cursor-pointer ${
                currentView === 'guide' ? 'text-editorial-accent opacity-100 font-black' : 'text-slate-500'
              }`}
            >
              指令清查
            </button>
            <button
              onClick={() => onViewChange?.('status')}
              className={`micro-label px-4 py-2 hover:text-editorial-accent transition-colors cursor-pointer ${
                currentView === 'status' ? 'text-editorial-accent opacity-100 font-black' : 'text-slate-500'
              }`}
            >
              開發進度
            </button>
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

          <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-editorial-line relative">
            <button 
              onClick={() => {
                onViewChange?.('directory');
                setTimeout(() => onFocusSearch?.(), 100);
              }}
              className="p-1.5 text-slate-400 hover:text-editorial-accent transition-colors cursor-pointer"
              title="搜尋工具資料庫"
            >
              <Search size={18} />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 text-slate-400 hover:text-editorial-accent transition-colors cursor-pointer relative"
                title="系統公告"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-editorial-border bg-white p-4 shadow-xl z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">系統即時公告</span>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-300 hover:text-slate-600">
                      <X size={12} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-left text-xs">
                        <div className="flex items-start gap-2">
                          {notif.isNew && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />}
                          <div>
                            <p className="text-slate-700 font-medium leading-relaxed">{notif.text}</p>
                            <span className="text-[9px] font-mono text-slate-400 block mt-1">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3 relative">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-editorial-border p-1.5 pr-3 rounded-full text-xs font-bold text-slate-700 transition-all cursor-pointer"
                >
                  <div className="h-6 w-6 rounded-full bg-editorial-accent text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="truncate max-w-20">{currentUser}</span>
                  <ChevronDown size={12} className="text-slate-400" />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-editorial-border bg-white py-1 shadow-xl z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">已登入身分</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{currentUser}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-xs text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} />
                      登出帳號
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setAuthModal('login')}
                  className="hidden sm:block micro-label hover:text-editorial-accent transition-colors text-slate-500 cursor-pointer"
                >
                  登入
                </button>
                <button 
                  onClick={() => setAuthModal('signup')}
                  className="hidden sm:block border border-slate-900 px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                >
                  免費註冊
                </button>
              </div>
            )}
            
            <button className="lg:hidden p-2 text-slate-400" onClick={() => onViewChange?.('directory')}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal Lightbox */}
      {authModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-editorial-border shadow-2xl rounded-[2.5rem] overflow-hidden p-8 relative">
            <button 
              onClick={() => setAuthModal(null)}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <span className="micro-label text-editorial-accent block mb-2">SECURE ENDPOINT SECURITY</span>
              <h3 className="text-2xl font-black font-display text-slate-950 uppercase tracking-tight">
                {authModal === 'login' ? '登入 AI PORTAL' : '加入系統會員'}
              </h3>
              <p className="text-slate-400 text-xs font-serif italic mt-1">
                「體驗個人化工具收藏，與尖端數位進化同步。」
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authModal === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">您的大名 / 稱呼</label>
                  <input
                    type="text"
                    required
                    placeholder="王大明"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent/20 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all placeholder-slate-300"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">電子信箱 (Email)</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent/20 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all placeholder-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">密碼 (Password)</label>
                <input
                  type="password"
                  required
                  placeholder="請輸入 6 位數以上的密碼"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent/20 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all placeholder-slate-300"
                />
              </div>

              {authError && (
                <p className="text-[11px] font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
                  ⚠️ {authError}
                </p>
              )}

              {authSuccess && (
                <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                  <Check size={14} /> {authSuccess}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-editorial-accent text-white uppercase font-black text-[10px] tracking-widest rounded-xl transition-all shadow-xl shadow-slate-200/50 mt-2"
              >
                {authModal === 'login' ? '立刻登入' : '開始建立帳號'}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs">
              {authModal === 'login' ? (
                <p className="text-slate-500">
                  還沒有帳號？{' '}
                  <button 
                    onClick={() => { setAuthModal('signup'); setAuthError(''); }}
                    className="text-editorial-accent font-bold hover:underline"
                  >
                    免費註冊一個
                  </button>
                </p>
              ) : (
                <p className="text-slate-500">
                  已經有帳號了？{' '}
                  <button 
                    onClick={() => { setAuthModal('login'); setAuthError(''); }}
                    className="text-editorial-accent font-bold hover:underline"
                  >
                    點此登入
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
