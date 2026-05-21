import { useState } from 'react';
import { ExternalLink, Globe, BookmarkPlus, Share2, Star, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export default function ToolCard({ tool, isBookmarked = false, onToggleBookmark }: ToolCardProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    'Text': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'Image': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    'Video': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    'Audio': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'Code': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    'Productivity': { bg: 'bg-zinc-100/80', text: 'text-zinc-700', border: 'border-zinc-300/60' },
    'Marketing': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  };

  const colors = categoryColors[tool.category] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' };

  return (
    <motion.div
      layout
      className="group relative flex items-center gap-6 p-4 border-b border-editorial-line hover:bg-slate-100/30 transition-all duration-300"
    >
      <div className="flex items-center gap-6 flex-1 min-w-0">
        {/* Status indicator */}
        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-editorial-accent group-hover:animate-pulse shadow-[0_0_8px_rgba(44,32,132,0.4)]" />
        
        {/* Enlargeable Brand/Introduction Image Preview */}
        <div 
          onClick={() => setIsZoomed(true)}
          className="w-28 h-18 bg-white border border-editorial-border p-0.5 shrink-0 shadow-sm rounded-lg overflow-hidden cursor-zoom-in relative group/img-preview"
          title="點擊放大圖片"
        >
          <img
            src={tool.imageUrl}
            alt={tool.name}
            className="h-full w-full object-cover rounded-md grayscale opacity-85 group-hover/img-preview:scale-110 group-hover/img-preview:grayscale-0 group-hover/img-preview:opacity-100 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 backdrop-blur-[1px] py-0.5 flex items-center justify-center translate-y-full group-hover/img-preview:translate-y-0 transition-transform duration-300">
            <span className="text-[8px] text-white font-mono uppercase tracking-widest font-black flex items-center gap-0.5">
              <ZoomIn size={8} /> 點擊放大
            </span>
          </div>
        </div>

        {/* Primary Info */}
        <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-[200px_1fr_180px] items-center gap-8">
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase truncate">
              {tool.name}
            </h3>
            <p className="micro-label text-slate-400 mt-0.5">Asset ID: 2024_{tool.name.slice(0, 3).toUpperCase()}</p>
          </div>

          <div className="hidden lg:block">
            <p className="text-xs text-slate-500 italic font-medium line-clamp-1 pr-8">
              「{tool.description}」
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <div className={`px-2.5 py-0.5 text-[8px] font-black rounded-sm border ${colors.border} ${colors.text} uppercase tracking-widest bg-white`}>
              {tool.category}
            </div>
            {tool.isPopular && (
              <span className="text-[8px] font-black text-amber-700 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                Trending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tags / Meta */}
      <div className="hidden xl:flex flex-wrap gap-1.5 w-64 justify-end">
        {tool.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold">
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pl-4 border-l border-editorial-line">
        <button 
          onClick={() => onToggleBookmark?.(tool.id)}
          className={`hidden sm:block p-1.5 transition-colors cursor-pointer ${
            isBookmarked ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-slate-900'
          }`}
          title={isBookmarked ? "由收藏中移除" : "加入我的收藏"}
        >
          {isBookmarked ? <Star size={16} fill="currentColor" /> : <BookmarkPlus size={16} />}
        </button>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-9 flex items-center justify-center bg-slate-950 text-white rounded hover:bg-editorial-accent transition-all shadow-lg"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Lightbox / Enlarged View Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white border border-editorial-border rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Top Bar inside the modal */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-editorial-line bg-editorial-bg/60">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-editorial-accent animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">
                    PROG_PREVIEW // {tool.name}
                  </span>
                </div>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Image body */}
              <div className="relative aspect-video max-h-[60vh] bg-slate-50 flex items-center justify-center overflow-hidden">
                <img
                  src={tool.imageUrl}
                  alt={tool.name}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info panel below the image */}
              <div className="px-6 py-5 bg-editorial-bg/80 border-t border-editorial-line">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-slate-900 font-bold text-base">{tool.name}</h4>
                    <p className="text-slate-500 text-xs mt-1 font-serif italic">
                      「{tool.description}」
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="px-2.5 py-1 text-[9px] font-black tracking-widest bg-slate-100 border border-editorial-border text-slate-800 rounded-sm uppercase">
                      {tool.category}
                    </span>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 flex items-center gap-1.5 bg-slate-900 text-white font-bold text-[10px] tracking-widest uppercase rounded hover:bg-editorial-accent transition-all shadow-lg"
                    >
                      開啟網站 <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
