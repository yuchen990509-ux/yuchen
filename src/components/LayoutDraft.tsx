import { Eye, Layers, Palette, FileText, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function LayoutDraft() {
  const imageUrl = "/src/assets/images/portal_homepage_mockup_1779245329899.png";

  const designSpecs = [
    {
      title: "色彩語境 (Color Palette)",
      icon: Palette,
      desc: "採用『奢華美術館暖象牙白』(#fcfbfa) 作為背景，搭配『深邃典雅海軍藍藍』(#2c2084) 作為醒目品牌色，邊界與格線則使用微暖的書頁灰 (#eae8df) 和細緻古籍灰 (#dcd9cf)，展現出極具質感的瑞士人文雜誌視覺與永恆美感。",
    },
    {
      title: "網格系統 (Gallery Grid)",
      icon: Layers,
      desc: "結合精密極簡的 technical-grid 襯底網格線與非對稱不規則留白。標題故意跨欄設計、主體內容保留寬裕负空間 (negative space)，降低網頁的視覺密度，創造高品味的藝廊漫步感。",
    },
    {
      title: "文字階層 (Typography Style)",
      icon: FileText,
      desc: "首頁主標題採用優雅的宋體/西式襯線體 (Serif) 與渾厚俐落的無襯線體 (Sans-serif) 混排。副文本與數據計量則全面採用 JetBrains Mono 等寬字體，突顯文藝風骨與當代科技感交織的藝術張力。",
    },
    {
      title: "功能佈局 (Product Architecture)",
      icon: Eye,
      desc: "破除傳統 AI 平台混亂的卡片堆疊，一律升級為高級單行整合式 (Identity // Description) 產品清單。首頁在圖片控制上，完美引入了全新的高解析度放大預覽與微光暈動態呼吸燈。",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-24 px-8">
      {/* Editorial Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-1.5 w-1.5 rounded-full bg-editorial-accent" />
          <span className="micro-label text-editorial-accent">DESIGN PROTOCOL</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tighter uppercase mb-4">
          首頁版面設計草稿
        </h2>
        <p className="text-slate-500 font-serif italic text-sm">
          「在代碼成型之前，這是一場關於比例、光影、呼吸感的嚴格幾何探索。」
        </p>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Mockup Canvas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative group bg-white p-3 rounded-2xl border border-editorial-border shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-6 left-6 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded text-[9px] font-mono tracking-widest text-white uppercase font-black">
              LIVE_RENDER // 16:9 HD
            </div>
            
            <div className="overflow-hidden rounded-xl bg-slate-50 border border-editorial-line aspect-video flex items-center justify-center">
              <img
                src={imageUrl}
                alt="AI Portal Homepage Design Draft"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="mt-4 flex justify-between items-center px-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Fig_01. Layout Composition Draft
              </span>
              <a 
                href={imageUrl}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-editorial-accent hover:opacity-85"
              >
                在獨立分頁中檢視 <ExternalLink size={10} />
              </a>
            </div>
          </div>

          <div className="bg-editorial-bg border border-editorial-line p-6 rounded-xl flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-editorial-accent/10 border border-editorial-accent/20 flex items-center justify-center text-editorial-accent shrink-0">
              <RefreshCw size={18} className="animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-0.5">即時架構同步</p>
              <p className="text-[11px] text-slate-500 leading-relaxed font-serif">
                本系統的首頁實例已完全遵循此視覺規範進行改造，您可以切換至 <span className="font-bold underline">INDEX_REPO</span> 分頁感受一致的高端氣韻。
              </p>
            </div>
          </div>
        </div>

        {/* Specs Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-editorial-border p-8 rounded-2xl space-y-6 shadow-sm">
            <h3 className="micro-label text-slate-400 pb-3 border-b border-editorial-line block">
              DESIGN SPECIFICATIONS
            </h3>
            
            <div className="space-y-6">
              {designSpecs.map((spec, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <spec.icon size={16} className="text-editorial-accent" />
                    <h4 className="text-xs font-bold font-sans text-slate-900 uppercase tracking-tight">
                      {spec.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pl-6 font-medium">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-editorial-line space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                研發落實狀態 (Status: Green)
              </h4>
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/50 border border-emerald-100 p-3 rounded-lg">
                <CheckCircle size={14} className="shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wide">
                  標準字、圓角、高質感底色均已在線上代碼中 100% 實現
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
