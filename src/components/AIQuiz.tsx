import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "您的主要目標是什麼？",
    options: [
      { label: "寫作與內容創作", value: "text" },
      { label: "視覺藝術與設計", value: "image" },
      { label: "程式開發", value: "code" },
      { label: "影片製作", value: "video" }
    ]
  },
  {
    id: 2,
    question: "您需要多少控制權？",
    options: [
      { label: "簡單快速的結果", value: "simple" },
      { label: "深度自定義與控制", value: "complex" }
    ]
  },
  {
    id: 3,
    question: "您的預算範圍？",
    options: [
      { label: "僅限免費工具", value: "free" },
      { label: "願意為品質付費", value: "paid" }
    ]
  }
];

const RECOMMENDATIONS: Record<string, string> = {
  "text-simple-free": "ChatGPT (免費版) 或 Perplexity AI",
  "text-complex-paid": "Claude 3.5 Sonnet 或 Jasper",
  "image-simple-paid": "Midjourney",
  "image-complex-free": "Stable Diffusion",
  "code-complex-paid": "GitHub Copilot",
  "video-complex-paid": "Runway Gen-2",
  "default": "ChatGPT"
};

export default function AIQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const key = newAnswers.join('-');
      setResult(RECOMMENDATIONS[key] || RECOMMENDATIONS["default"]);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-24 px-8">
      <div className="bg-white p-8 md:p-16 rounded-[2.5rem] border border-editorial-border shadow-xl shadow-slate-200/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50" />
        
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10 space-y-10"
            >
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 bg-slate-100 text-editorial-accent rounded-full text-[10px] font-bold uppercase tracking-widest border border-editorial-border">
                  工具發現測驗
                </div>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i <= step ? 'bg-editorial-accent' : 'bg-slate-100'}`} 
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                {QUESTIONS[step].question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="group flex items-center justify-between bg-white border border-editorial-border p-6 rounded-2xl text-left hover:bg-slate-50 hover:border-editorial-accent hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-lg font-bold text-slate-600 group-hover:text-editorial-accent">{option.label}</span>
                    <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-editorial-accent group-hover:text-white group-hover:border-editorial-accent transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 text-center space-y-10"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-editorial-accent text-white shadow-2xl shadow-indigo-950/10">
                <Sparkles size={40} />
              </div>
              
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  經過我們的智能分析...
                </h3>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  {result}
                </h2>
              </div>

              <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed italic font-serif">
                「根據您的需求偏好，這款工具在功能深度與操作直覺性之間為您達到了最佳平衡。」
              </p>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  <RotateCcw size={16} />
                  重新測驗
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-editorial-accent transition-all shadow-xl">
                  立即探索該工具
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
