import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, Brain, Rocket, Heart, Coffee, Shield, Palette, Zap } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "早上鬧鐘響了，你的第一直覺是？",
    options: [
      { text: "計算還能賴床幾分鐘才不會遲到", trait: "logic" },
      { text: "回味剛剛那個超酷的科幻夢境", trait: "creative" },
      { text: "完了！昨晚有個點子忘了記錄下來", trait: "philosophical" },
      { text: "彈射起步，直接衝進浴室刷牙", trait: "productivity" }
    ]
  },
  {
    id: 2,
    question: "去午餐店排隊排超長，你會？",
    options: [
      { text: "觀察店家的動線哪裡可以優化", trait: "logic" },
      { text: "幻想如果這家店開在火星會長怎樣", trait: "creative" },
      { text: "戴上耳機，沉浸在 Podcast 的知識裡", trait: "curious" },
      { text: "用手機快速回完 5 封工作郵件", trait: "productivity" }
    ]
  },
  {
    id: 3,
    question: "朋友約你出去玩，你通常負責？",
    options: [
      { text: "製作精確到分鐘的行程 Excel 表", trait: "logic" },
      { text: "找最適合拍照打卡的隱藏景點", trait: "creative" },
      { text: "負責聊天，確保大家心靈都得到撫慰", trait: "philosophical" },
      { text: "訂機票飯店，3 分鐘搞定所有手續", trait: "productivity" }
    ]
  },
  {
    id: 4,
    question: "看到一則很震驚的新聞，你的反應是？",
    options: [
      { text: "先去查證消息來源是否可靠", trait: "curious" },
      { text: "這情節如果拍成電影一定大賣", trait: "creative" },
      { text: "在腦中分析這對未來社會的深遠影響", trait: "philosophical" },
      { text: "這消息對我的工作有什麼即時幫助嗎？", trait: "logic" }
    ]
  },
  {
    id: 5,
    question: "房間亂七八糟了，你打算怎麼整理？",
    options: [
      { text: "按顏色、用途嚴格分類收納", trait: "logic" },
      { text: "重新佈置家具，換個新的視覺風格", trait: "creative" },
      { text: "斷捨離！不需要的東西通通丟掉", trait: "productivity" },
      { text: "一邊整理一邊研究收納箱的材質歷史", trait: "curious" }
    ]
  },
  {
    id: 6,
    question: "看電影時，你最討厭哪種人？",
    options: [
      { text: "劇情不合理在那邊碎碎念的人（雖然我心裡也在念）", trait: "logic" },
      { text: "完全感受不到畫面美學的人", trait: "creative" },
      { text: "在感人片段滑手機的人", trait: "philosophical" },
      { text: "動作慢吞吞，擋到進場動線的人", trait: "productivity" }
    ]
  },
  {
    id: 7,
    question: "如果可以立刻學會一門技術，你會選？",
    options: [
      { text: "量子力學運算的邏輯", trait: "logic" },
      { text: "任何風格都能畫出來的畫筆", trait: "creative" },
      { text: "一目十行且過目不忘的超強檢索", trait: "curious" },
      { text: "瞬間寫完所有繁瑣文件的自動化", trait: "productivity" }
    ]
  },
  {
    id: 8,
    question: "去超市採買，你的風格是？",
    options: [
      { text: "按照購物清單，買完就走", trait: "logic" },
      { text: "看到包裝精美的商品就忍不住想買", trait: "creative" },
      { text: "每樣東西都看成分表，研究很久", trait: "curious" },
      { text: "衝去結帳排最短的那一列", trait: "productivity" }
    ]
  },
  {
    id: 9,
    question: "跟討厭的人吵架，你通常怎麼應對？",
    options: [
      { text: "列出他邏輯上的 10 個矛盾點", trait: "logic" },
      { text: "在心中默默幫他畫一個滑稽的自畫像", trait: "creative" },
      { text: "試圖理解他背後的創傷與動機", trait: "philosophical" },
      { text: "速戰速決，不要浪費我的時間", trait: "productivity" }
    ]
  },
  {
    id: 10,
    question: "下班後的理想生活是？",
    options: [
      { text: "把隔天的待辦清單整理好", trait: "logic" },
      { text: "動手做點勞作或畫畫", trait: "creative" },
      { text: "讀一本深奧但迷人的哲學書", trait: "philosophical" },
      { text: "學一個能幫我賺錢或省力的新工具", trait: "curious" }
    ]
  },
  {
    id: 11,
    question: "手機快沒電了，你只剩下 5%，你會？",
    options: [
      { text: "計算能撐到回家路程的耗電比率", trait: "logic" },
      { text: "享受這難得的斷網孤獨感", trait: "philosophical" },
      { text: "瘋狂尋找最近的共享行動電源", trait: "curious" },
      { text: "關閉所有後台，只留最關鍵的通訊", trait: "productivity" }
    ]
  },
  {
    id: 12,
    question: "你寫筆記的習慣是？",
    options: [
      { text: "用各種顏色和符號標記重點", trait: "logic" },
      { text: "旁邊一定要畫滿小插圖", trait: "creative" },
      { text: "像寫日記一樣記錄當下的心情", trait: "philosophical" },
      { text: "只記關鍵字，越簡短越好", trait: "productivity" }
    ]
  },
  {
    id: 13,
    question: "如果要在荒島生活一年，你必帶？",
    options: [
      { text: "全套求生指南補給清單", trait: "logic" },
      { text: "一整箱畫布跟顏料", trait: "creative" },
      { text: "一台裝滿全人類知識百科的離線電腦", trait: "curious" },
      { text: "一套能自動砍樹蓋房子的工具箱", trait: "productivity" }
    ]
  },
  {
    id: 14,
    question: "看到一隻流浪貓，你會？",
    options: [
      { text: "分析這隻貓的健康狀況與品種", trait: "logic" },
      { text: "幫它想一個華麗的探險故事背景", trait: "creative" },
      { text: "感嘆生命在都市叢林生存的艱辛", trait: "philosophical" },
      { text: "先拍照傳到貓咪社團找救助", trait: "productivity" }
    ]
  },
  {
    id: 15,
    question: "最後一個問題：你希望別人眼中的你是？",
    options: [
      { text: "聰明且腦袋清楚的", trait: "logic" },
      { text: "有趣且不按牌理出牌的", trait: "creative" },
      { text: "溫暖且懂人心的", trait: "philosophical" },
      { text: "強大且執行力滿分的", trait: "productivity" }
    ]
  }
];

const RESULTS = {
  logic: {
    name: "ChatGPT - 指令大師",
    description: "你是那種邏輯極強、腦中自備 Excel 表格的人。你追求的不只是答案，而是『最佳解』。對你來說，混亂是不可接受的。",
    advice: "有時候，讓大腦隨意亂想一下，或許會有意想不到的收穫。",
    icon: Brain,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  creative: {
    name: "Midjourney - 夢想捕手",
    description: "你活在色彩與構圖中。對你而言，一張圖勝過千言萬語。你擁有的想像力，足以建造一個全新的平行時空。",
    advice: "試著把你的夢境寫成文字，那會是另一種強大的力量。",
    icon: Palette,
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  philosophical: {
    name: "Claude - 靈魂寫手",
    description: "你注重細節、情感與道德邊界。你寫出的東西不僅有理，更有情。你是一個溫潤如玉的思考者。",
    advice: "保持你的細膩，這個世界需要更多像你這樣溫暖的聲音。",
    icon: Heart,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  productivity: {
    name: "GitHub Copilot - 效率猛獸",
    description: "速度是你的代名詞。你討厭重複勞動，喜歡自動化一切。如果可以，你希望一天能有 48 小時。",
    advice: "適時關掉你的引擎，去看看路邊的風景，而不是程式碼的終點。",
    icon: Zap,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  curious: {
    name: "Perplexity - 知識信徒",
    description: "你對世界充滿永無止境的好奇心。你不停地問『為什麼？』，並且一定要找到那個有根據的答案。",
    advice: "知識是無窮的，記得偶爾停下來消化你學到的東西。",
    icon: Rocket,
    color: "text-purple-500",
    bg: "bg-purple-50"
  }
};

export default function AIPersonalityTest() {
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (trait: string) => {
    const newAnswers = [...answers, trait];
    setAnswers(newAnswers);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const getResult = () => {
    if (answers.length === 0) return RESULTS.logic;
    const counts: Record<string, number> = {};
    answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topTrait = sorted[0][0];
    return RESULTS[topTrait as keyof typeof RESULTS] || RESULTS.logic;
  };

  const reset = () => {
    setStep('start');
    setCurrentIdx(0);
    setAnswers([]);
  };

  const result = getResult();
  const ResultIcon = result.icon;

  return (
    <div className="max-w-4xl mx-auto py-24 px-8">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center bg-white p-12 md:p-20 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />
            
            <div className="relative z-10">
              <div className="mx-auto w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-900/10 rotate-6 hover:rotate-0 transition-transform duration-500">
                <Sparkles size={48} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight font-display">你是哪一種 AI 靈魂？</h1>
              <p className="text-xl text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed italic">
                「你是理性的 ChatGPT？還是浪漫的 Midjourney？」<br/>15 個問題，揭開您潛意識中的數位人格。
              </p>
              <button
                onClick={() => setStep('quiz')}
                className="bg-indigo-600 text-white px-12 py-5 rounded-2xl text-base font-bold hover:bg-slate-900 transition-all flex items-center gap-4 mx-auto shadow-2xl shadow-indigo-900/10"
              >
                開始靈魂測驗 <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-8 md:p-16 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100 font-display">
                問題 {currentIdx + 1} / {QUESTIONS.length}
              </div>
              <div className="h-1.5 w-48 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-12 font-display">
              {QUESTIONS[currentIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {QUESTIONS[currentIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.trait)}
                  className="group flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 text-left"
                >
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shrink-0">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{opt.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 md:p-24 rounded-[4rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden relative"
          >
            <div className={`absolute top-0 right-0 w-96 h-96 ${result.bg} rounded-full -mr-48 -mt-48 opacity-60 blur-[120px]`} />
            
            <div className="relative z-10 text-center">
              <div className={`mx-auto w-32 h-32 bg-white ${result.color} rounded-[2.5rem] flex items-center justify-center mb-10 border-8 border-slate-50 shadow-2xl shadow-indigo-900/10`}>
                <ResultIcon size={64} />
              </div>
              
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-4 font-display">經過極精密的人格掃描...</h2>
              <h1 className={`text-5xl md:text-7xl font-black ${result.color} tracking-tighter mb-10 font-display`}>
                {result.name}
              </h1>

              <div className="max-w-2xl mx-auto space-y-12 mb-16">
                <p className="text-2xl italic text-slate-600 leading-relaxed font-medium font-serif">
                  「{result.description}」
                </p>
                <div className="pt-10 border-t border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                    數位進化建議
                  </div>
                  <p className="text-xl text-slate-500 italic font-serif">「{result.advice}」</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-10 py-5 bg-slate-50 text-slate-500 rounded-2xl text-base font-bold hover:bg-slate-100 transition-all border border-slate-100"
                >
                  <RotateCcw size={20} />
                  重新測驗
                </button>
                <button className="flex items-center justify-center gap-2 px-10 py-5 bg-slate-900 text-white rounded-2xl text-base font-bold hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-900/20">
                  分享結果給朋友
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
          PROJECT_IDENTITY_SCAN_v2.5 // AI PORTAL CORE
        </p>
      </div>
    </div>
  );
}
