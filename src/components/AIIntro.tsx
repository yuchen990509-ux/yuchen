import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Zap, Users, Quote, X, Mail, Check, Download, Sparkles, Code } from 'lucide-react';

interface AIIntroProps {
  onViewChange?: (view: any) => void;
}

export default function AIIntro({ onViewChange }: AIIntroProps) {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [step, setStep] = useState<'input' | 'compiling' | 'success'>('input');
  const [email, setEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const compilationLogs = [
    "連線核心 Atlas Node 節點...",
    "提取最新 AI 趨勢分類指標...",
    "封裝 12 款主流工具分析圖表...",
    "綁定安全 TLS 憑證與下載授權金鑰...",
    "報告渲染封包輸出完畢...",
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'compiling') {
      setProgress(0);
      setLogIndex(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              triggerFileDownload();
              setStep('success');
            }, 600);
            return 100;
          }
          const increment = Math.floor(Math.random() * 15) + 5;
          const nextVal = Math.min(prev + increment, 100);
          
          // Speed up compilation steps
          if (nextVal > 20 && nextVal <= 45) setLogIndex(1);
          else if (nextVal > 45 && nextVal <= 70) setLogIndex(2);
          else if (nextVal > 70 && nextVal <= 90) setLogIndex(3);
          else if (nextVal > 90) setLogIndex(4);

          return nextVal;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [step]);

  const triggerFileDownload = () => {
    try {
      const fileContent = `====================================================
AI ATLAS JOURNAL - 2024 COMPLETE AI TRENDS REPORT
====================================================
授權信箱: ${email}
發布時間: ${new Date().toLocaleDateString()}
報告編號: ATLAS_REP_4009_SECURE

1. 核心觀點
AI 不僅是程式碼的堆疊，它是人類智慧的鏡像。
工具的進化，推動了「文字即程式碼」的新範式。

2. 重點工具一覽與特長精華
- ChatGPT: 通用寫作、軟體開發與創意思維的頂級引擎。
- Claude: 富含文學感與長文本消化能力的超強大腦。
- Midjourney: 概念設計與商業視覺創新的美學巔峰。
- Perplexity: 資訊研究、附帶精準出處引用的精準檢索。

3. 未來三大戰略指引
- 生產力重塑：體力重複性勞動全面轉入自動化，專注優化架構與細節
- 創意民主化：將高技術門檻，轉移到精準人類思維與結構描述
- 獨立思考：AI 生成數據不代表終局真理，品質的「掌舵者」依然是您。

謝謝閱讀 AI Portal 趨勢巨著。
學會指令，就是掌握未來的最高權杖！
  `;
      const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI_Trends_Complete_Report_${email.split('@')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartCompile = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setStep('compiling');
    }
  };

  const handleResetModal = () => {
    setShowPdfModal(false);
    setStep('input');
    setEmail('');
    setProgress(0);
  };

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
            <p className="text-sm text-slate-400 leading-relaxed uppercase tracking-wider font-mono">
              // CONCEPT REVOLUTION IN MACHINE LOGICS
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-24 items-start">
          <div className="space-y-16">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block mb-4">章節一 // 工具即思維的延伸</span>
              <p className="text-base text-slate-500 leading-relaxed">
                在傳統時代，人類通過掌握特定的技術工具（如代盤、CAD、程式編輯器）來擴展能力邊界。然而，當生成式 AI 誕生，這條界線被打破：
                軟體不再是固定死板的，它能聽懂人類自然的呼吸與指令。
                學會「如何向 AI 提問、給予精確框架與邊界」，決定了您在 AI 時代的智識厚度。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Lightbulb, title: '知識密度', desc: '在幾秒內分析長達數十萬字的文件，並精準抓取規律。' },
                { icon: Zap, title: '即時生產力', desc: '寫作、寫程式和圖像創作的邊際時間消耗被壓縮為零。' },
                { icon: Users, title: '專家代理人', desc: '隨時隨地召喚專屬律師、行銷經理、代碼專家和哲學家。' }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-slate-100 bg-white shadow-sm rounded-2xl hover:border-indigo-500/30 transition-all">
                  <div className="h-10 w-10 text-indigo-600 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                    <item.icon size={18} />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wider">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-10 border border-slate-200 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="space-y-4">
                <span className="micro-label text-slate-300 tracking-widest block">REPORT COMPILATION // VOL_2024</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-display">
                  掌握更高維度的數位競爭力。
                </h3>
                <div className="space-y-2">
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
              <button 
                onClick={() => setShowPdfModal(true)}
                className="bg-slate-900 text-white px-10 py-4 rounded font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:scale-105 transition-all shadow-2xl shrink-0 cursor-pointer"
              >
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

      {/* PDF Generation Lightbox Modal */}
      <AnimatePresence>
        {showPdfModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-white border border-editorial-border rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden text-center"
            >
              <button 
                onClick={handleResetModal}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="mb-6 flex justify-center">
                <div className="h-12 w-12 bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center rounded-full shrink-0">
                  <Download size={20} />
                </div>
              </div>

              {step === 'input' && (
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">完整趨勢報告下載通道</h3>
                  <p className="text-xs text-slate-400 font-serif italic mt-1 mb-6">
                    「請驗證您的授權，系統將在雲端即時彙整當日市場報告。」
                  </p>
                  <form onSubmit={handleStartCompile} className="space-y-4">
                    <div className="text-left space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">請填寫接收 PDF 的 Email 信箱</label>
                      <input 
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-editorial-accent rounded-xl px-4 py-3 text-xs text-slate-800 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-950 hover:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
                    >
                      開始編譯並下載 PDF (TEXT)
                    </button>
                  </form>
                </div>
              )}

              {step === 'compiling' && (
                <div className="space-y-6 py-6">
                  <h3 className="text-xl font-black text-slate-900">核心伺服器編譯中...</h3>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-150" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 min-h-[50px] flex items-center justify-center">
                    <span className="animate-pulse">{compilationLogs[logIndex]}</span>
                  </div>
                  <p className="text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-widest">{progress}% COMPILE COMPLETION</p>
                </div>
              )}

              {step === 'success' && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="h-10 w-10 bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center rounded-full">
                      <Check size={18} />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">下載就緒！</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    我們已經順利編譯專屬報告，並透過您的瀏覽器直接觸發文件下載！若沒有看到自動保存，請點選下方按鈕重新索取。
                  </p>
                  <p className="text-[10px] font-mono text-slate-400">報告已發送至: {email}</p>
                  
                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      onClick={triggerFileDownload}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      重新觸發下載
                    </button>
                    <button
                      onClick={() => {
                        handleResetModal();
                        onViewChange?.('quiz');
                      }}
                      className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      使用 MATCH_ENGINE 匹配推薦工具
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
