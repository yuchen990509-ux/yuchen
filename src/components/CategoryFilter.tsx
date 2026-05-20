import { Category } from '../types';
import { cn } from '../lib/utils';
import { LayoutGrid, Type, Image, Video, Mic2, Code2, Zap, Megaphone } from 'lucide-react';

interface CategoryFilterProps {
  categories: (Category | 'All')[];
  activeCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-1 py-4">
      <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-editorial-muted">
        工具類別
      </h3>
      <ul className="flex flex-col gap-3">
        {categories.map((category) => {
          const catColors: Record<string, string> = {
            'Text': 'bg-blue-400',
            'Image': 'bg-rose-400',
            'Video': 'bg-purple-400',
            'Audio': 'bg-amber-400',
            'Code': 'bg-emerald-400',
            'Productivity': 'bg-indigo-400',
            'Marketing': 'bg-orange-400',
            'All': 'bg-white'
          };

          const icons: Record<string, any> = {
            'All': LayoutGrid,
            'Text': Type,
            'Image': Image,
            'Video': Video,
            'Audio': Mic2,
            'Code': Code2,
            'Productivity': Zap,
            'Marketing': Megaphone
          };
          
          const Icon = icons[category] || LayoutGrid;
          
          return (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "flex items-center gap-3 text-left text-lg font-medium transition-all duration-200 hover:text-editorial-accent group",
                  activeCategory === category
                    ? "text-editorial-ink"
                    : "text-editorial-ink/60"
                )}
              >
                <div className="relative">
                  <span className={cn(
                    "absolute -left-1 -top-1 h-3 w-3 rounded-full transition-all group-hover:scale-150 opacity-20",
                    catColors[category] || 'bg-gray-400',
                    activeCategory === category ? "scale-125 opacity-40" : "scale-100"
                  )} />
                  <Icon size={18} className={cn(
                    "relative z-10",
                    activeCategory === category ? "text-editorial-ink" : "text-editorial-ink/60"
                  )} />
                </div>
                <span className={cn(
                  activeCategory === category && "underline underline-offset-8 decoration-2"
                )}>
                  {category === 'All' ? '全部' : 
                   category === 'Text' ? '文本生成' :
                   category === 'Image' ? '圖像生成' :
                   category === 'Video' ? '影片生成' :
                   category === 'Audio' ? '音訊處理' :
                   category === 'Code' ? '程式開發' :
                   category === 'Productivity' ? '生產力' :
                   category === 'Marketing' ? '行銷推廣' : category}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
