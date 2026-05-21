import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ToolCard from './components/ToolCard';
import AIIntro from './components/AIIntro';
import ComparisonTable from './components/ComparisonTable';
import AIQuiz from './components/AIQuiz';
import Conclusion from './components/Conclusion';
import AIGame from './components/AIGame';
import AIPersonalityTest from './components/AIPersonalityTest';
import AIPromptGuide from './components/AIPromptGuide';
import ProjectStatus from './components/ProjectStatus';
import ContactUs from './components/ContactUs';
import LayoutDraft from './components/LayoutDraft';
import { AI_TOOLS } from './data/tools';
import { Category } from './types';
import { Book, Info, Columns2, Sparkles, Brain, Flag, MessageSquare, Phone, UserRound, ClipboardList, Search, Layers, Star, X } from 'lucide-react';

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Text',
  'Image',
  'Video',
  'Audio',
  'Code',
  'Productivity',
  'Marketing',
];

type View = 'directory' | 'draft' | 'intro' | 'comparison' | 'quiz' | 'game' | 'personality' | 'conclusion' | 'guide' | 'contact' | 'status';

export default function App() {
  const [view, setView] = useState<View>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [nodeDetails, setNodeDetails] = useState<string | null>(null);

  // Load and save bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('user-bookmarks');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      localStorage.setItem('user-bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchesFavorite = !showOnlyFavorites || bookmarks.includes(tool.id);
      
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [searchQuery, activeCategory, showOnlyFavorites, bookmarks]);

  const renderContent = () => {
    switch (view) {
      case 'draft':
        return <LayoutDraft />;
      case 'intro':
        return <AIIntro onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
      case 'comparison':
        return (
          <ComparisonTable 
            onViewTool={(toolName) => {
              setView('directory');
              setSearchQuery(toolName);
              setTimeout(() => {
                const el = document.getElementById('core-registry-section');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 200);
            }} 
          />
        );
      case 'quiz':
        return (
          <AIQuiz 
            onViewTool={(toolName) => {
              setView('directory');
              setSearchQuery(toolName);
              setTimeout(() => {
                const el = document.getElementById('core-registry-section');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 200);
            }} 
          />
        );
      case 'game':
        return <AIGame />;
      case 'personality':
        return <AIPersonalityTest />;
      case 'conclusion':
        return <Conclusion />;
      case 'guide':
        return (
          <AIPromptGuide 
            onViewChange={(v) => {
              setView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        );
      case 'status':
        return <ProjectStatus />;
      case 'contact':
        return <ContactUs />;
      default:
        return (
          <div className="mx-auto max-w-[1400px] px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-20 min-h-screen">
            {/* Sidebar / Navigation Rail */}
            <aside className="relative">
              <div className="sticky top-40 space-y-12">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-0.5 w-10 bg-editorial-accent" />
                    <span className="micro-label text-editorial-accent">DATABASE FILTER</span>
                  </div>
                  <CategoryFilter 
                    categories={CATEGORIES} 
                    activeCategory={activeCategory} 
                    onCategoryChange={(cat) => {
                      setActiveCategory(cat);
                      setShowOnlyFavorites(false); // reset favorites when changing category
                    }} 
                  />

                  {/* Bookmark Filtering Toggle */}
                  <div className="mt-6 pt-6 border-t border-editorial-line">
                    <button
                      onClick={() => setShowOnlyFavorites(prev => !prev)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer ${
                        showOnlyFavorites 
                          ? 'bg-amber-500/10 border-amber-500 text-amber-700 shadow-sm shadow-amber-500/10' 
                          : 'bg-white border-editorial-border text-slate-500 hover:border-amber-400 hover:text-amber-600'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Star size={13} fill={showOnlyFavorites ? "currentColor" : "none"} className="text-amber-500" />
                        僅看收藏 ({bookmarks.length})
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-12 border-t border-editorial-line">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-0.5 w-10 bg-editorial-accent" />
                    <span className="micro-label text-editorial-accent">SYSTEM STATUS</span>
                  </div>
                  <div className="space-y-4">
                    <button 
                      onClick={() => setNodeDetails("Uptime (99.9%)\n運行狀態: 極其穩定\n節點定位: US-EAST-1 Cloud Run\n響應速度: 12ms\n安全驗證: TLS v1.3 Verified\n核心叢集: 24 Core Multi-Threaded Node")}
                      className="w-full flex justify-between items-center bg-white border border-editorial-line p-4 rounded shadow-sm hover:border-editorial-accent/60 hover:shadow-md transition-all text-left cursor-pointer"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-mono">Uptime</span>
                      <span className="text-[10px] text-emerald-700 font-bold font-mono flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> 99.9%
                      </span>
                    </button>
                    <button 
                      onClick={() => setNodeDetails("API_V2 Subsystem\n狀態: 連線完好(Active)\n安全密鑰: AES-256 Bit Encrypted\n每日吞吐: 1,840,290 吞吐量\n底層引擎: Gemini LLM Engine Integration")}
                      className="w-full flex justify-between items-center bg-white border border-editorial-line p-4 rounded shadow-sm hover:border-editorial-accent/60 hover:shadow-md transition-all text-left cursor-pointer"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-mono">Api_V2</span>
                      <span className="text-[10px] text-editorial-accent font-bold font-mono">Active</span>
                    </button>
                  </div>
                </div>

                {/* Newsletter Box */}
                <div className="relative group overflow-hidden rounded-[2rem] bg-white border border-editorial-border p-8 transition-all hover:border-editorial-accent/60 shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-2xl -mr-16 -mt-16" />
                  <h4 className="font-display font-black text-sm text-slate-900 mb-2 uppercase tracking-tight">訂閱週刊</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-6 font-medium italic">
                    「每週一封郵件，帶你掃描全球最尖端的數位進化紀錄。」
                  </p>
                  
                  {isSubscribed ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                      <p className="text-[11px] font-bold text-emerald-800">
                        🎉 訂閱成功！歡迎加入。<br />
                        <span className="text-[9px] font-mono font-medium text-emerald-600 block mt-1">{subscribedEmail}</span>
                      </p>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (subscribedEmail && subscribedEmail.includes('@')) {
                          setIsSubscribed(true);
                        }
                      }}
                      className="space-y-3"
                    >
                      <input
                        type="email"
                        required
                        placeholder="請輸入您的 Email 信箱"
                        value={subscribedEmail}
                        onChange={(e) => setSubscribedEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-editorial-accent rounded-lg px-3 py-2 text-[10px] text-slate-800 text-center focus:outline-none placeholder-slate-300 transition-all"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-editorial-accent transition-all shadow-xl shadow-slate-200/20 cursor-pointer"
                      >
                        立即加入行列
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Registry */}
            <section id="core-registry-section" className="min-w-0">
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-6 bg-slate-200" />
                    <span className="micro-label text-slate-400">REGISTRY SECTION</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-900 mb-4 uppercase tracking-tighter whitespace-nowrap">
                    {showOnlyFavorites ? '我的書籤收藏庫' : activeCategory === 'All' ? '核心工具索引表' : `${activeCategory === 'Text' ? '文本生成' :
                    activeCategory === 'Image' ? '圖像生成' :
                    activeCategory === 'Video' ? '影片生成' :
                    activeCategory === 'Audio' ? '音訊處理' :
                    activeCategory === 'Code' ? '程式開發' :
                    activeCategory === 'Productivity' ? '生產力' :
                    activeCategory === 'Marketing' ? '行銷推廣' : activeCategory} REPO`}
                  </h2>
                  <p className="text-slate-400 text-sm font-serif italic">
                    「根據您的檢索條件，系統已自動篩選出最優化的解決方案。」
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="micro-label text-slate-300 mb-1">Records Found</p>
                    <p className="font-display text-2xl font-black text-slate-900">{filteredTools.length}</p>
                  </div>
                </div>
              </div>

              {filteredTools.length > 0 ? (
                <div className="flex flex-col">
                  {/* Table Header for Desktoop */}
                  <div className="hidden lg:grid grid-cols-[1fr_200px_40px] gap-6 px-12 py-3 border-b border-slate-200 micro-label text-slate-400 mb-2">
                    <div>Product Identity // Description</div>
                    <div className="text-center">Category // Tags</div>
                    <div className="text-right">Link</div>
                  </div>
                  <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                      <ToolCard 
                        key={tool.id} 
                        tool={tool} 
                        isBookmarked={bookmarks.includes(tool.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-300">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">檢索結果為空</h3>
                  <p className="text-sm text-slate-500 font-serif italic max-w-md mx-auto leading-relaxed">
                    「抱歉，資料庫中目前沒有符合條件的紀錄。請考慮調整您的搜尋關鍵字或分類範圍。」
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); setShowOnlyFavorites(false); }}
                    className="mt-10 px-8 py-3 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-indigo-600 transition-all shadow-2xl cursor-pointer"
                  >
                    重置系統檢索
                  </button>
                </div>
              )}

              {/* Technical Note */}
              <div className="mt-20 flex items-center gap-4 py-8 border-t border-slate-100">
                <div className="h-10 w-10 shrink-0 border border-slate-200 flex items-center justify-center text-slate-300">
                  <Info size={16} />
                </div>
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                  DISCLAIMER: This system is powered by AI Atlas Core v2.5. Data reflects real-time industry categorization and evaluation standards. 
                  Last synchronized: Today at 04:00 GMT.
                </p>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-editorial-bg selection:bg-slate-900 selection:text-white text-slate-800">
      <Navbar 
        currentView={view} 
        onViewChange={(v) => { 
          setView(v); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }} 
        onFocusSearch={() => {
          const el = document.getElementById('search-input');
          if (el) {
            (el as HTMLInputElement).focus();
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
      />
      
      {/* Sub-navigation */}
      <div className="border-b border-editorial-line bg-editorial-bg/85 backdrop-blur-xl sticky top-14 z-40">
        <div className="mx-auto max-w-[1400px] px-8 flex overflow-x-auto no-scrollbar">
          {[
            { id: 'directory', label: 'INDEX_REPO', icon: Book },
            { id: 'draft', label: 'DESIGN_DRAFT', icon: Layers },
            { id: 'intro', label: 'FOUNDATIONS', icon: Info },
            { id: 'guide', label: 'PROMPT_LOGIC', icon: MessageSquare },
            { id: 'comparison', label: 'ANALYSIS', icon: Columns2 },
            { id: 'quiz', label: 'MATCH_ENGINE', icon: Sparkles },
            { id: 'game', label: 'ALCHEMY', icon: Brain },
            { id: 'personality', label: 'ID_PROFILE', icon: UserRound },
            { id: 'conclusion', label: 'SUMMARY', icon: Flag },
            { id: 'status', label: 'PROJECT_TRACK', icon: ClipboardList },
            { id: 'contact', label: 'TERMINAL', icon: Phone }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex items-center gap-2 px-6 py-4 micro-label whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                view === item.id 
                  ? 'border-editorial-accent text-editorial-accent' 
                  : 'border-transparent text-slate-400 hover:text-slate-900 hover:bg-slate-100/40'
              }`}
            >
              <item.icon size={12} strokeWidth={3} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <main>
        {view === 'directory' && <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Node Details Diagnostics Popover */}
      {nodeDetails && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white border border-editorial-border p-6 rounded-3xl relative shadow-2xl">
            <button 
              onClick={() => setNodeDetails(null)} 
              className="absolute right-4 top-4 p-1 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">NODE DIAGNOSTICS</span>
            </div>
            <pre className="font-mono text-xs text-slate-600 space-y-2 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded-xl">
              {nodeDetails}
            </pre>
            <button 
              onClick={() => setNodeDetails(null)} 
              className="w-full mt-4 bg-slate-900 text-white rounded-lg py-2.5 text-[10px] font-bold uppercase tracking-widest"
            >
              關閉診斷面板
            </button>
          </div>
        </div>
      )}

      <footer className="bg-white py-24 border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-technical-grid opacity-10 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 pb-20 border-b border-slate-100">
            <div className="col-span-2">
              <div className="text-xl font-black tracking-tighter text-slate-900 uppercase mb-6">
                AI<span className="text-indigo-600">PORTAL</span>
              </div>
              <p className="text-slate-500 font-serif italic text-lg leading-relaxed max-w-md">
                「我們相信，AI 不應是替代品，而是人類創造力與技術想像力的延伸。Atlas 目標是為每一位開拓者提供精確的方位。」
              </p>
            </div>
            <div>
              <h4 className="micro-label text-slate-900 mb-6">REGISTRY</h4>
              <ul className="space-y-4 micro-label text-slate-400">
                <li><button onClick={() => { setView('directory'); setActiveCategory('All'); setShowOnlyFavorites(false); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors uppercase cursor-pointer">核心資料庫</button></li>
                <li><button onClick={() => { setView('comparison'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors uppercase cursor-pointer">趨勢追蹤矩陣</button></li>
                <li><button onClick={() => { setView('status'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors uppercase cursor-pointer">開源貢獻與進度</button></li>
              </ul>
            </div>
            <div>
              <h4 className="micro-label text-slate-900 mb-6">INTELLIGENCE</h4>
              <ul className="space-y-4 micro-label text-slate-400">
                <li><button onClick={() => { setView('intro'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors uppercase cursor-pointer">技術白皮書</button></li>
                <li><button onClick={() => { setView('guide'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors uppercase cursor-pointer">社群指令研究</button></li>
                <li><button onClick={() => { setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors uppercase cursor-pointer">安全合規</button></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row micro-label text-slate-400">
            <div className="flex flex-col gap-2">
              <div>&copy; 2024 AI ATLAS JOURNAL // CORE ARCHIVE</div>
              <div className="flex gap-4">
                <button onClick={() => alert("本條款適用於 AI Portal。所有在平台運行的指令與收藏皆儲存於本地。")} className="hover:text-indigo-600 transition-colors cursor-pointer">PRIVACY_POLICY</button>
                <button onClick={() => alert("當您使用本站服務即視為同意我們的隱私實踐，我們決不隨意出售您的使用行為。")} className="hover:text-indigo-600 transition-colors cursor-pointer">TERMS_OF_SERVICE</button>
              </div>
            </div>
            <button 
              onClick={() => setNodeDetails("Atlas Live Operations Nodes\n當前負載: 1.25%\n伺服器回應狀態: HTTP 200 OK\n連線點: GLOBAL INGRESS PROXY\n多重備源節點: 良好(Ready)")}
              className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer text-left"
            >
              <span className="bg-indigo-600 h-1.5 w-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.3)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-slate-500">System Live // Node_01 Active</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
