import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Skull, Sparkles, Star, RotateCcw, Zap, Ghost, Cat, Coffee, ArrowRight } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    icon: Cat,
    problem: "一隻貓突然統治了世界，它要求你幫它寫一份「登基演講稿」，要讓全球人類乖乖交出罐罐。",
    options: {
      role: [
        { label: "傲嬌的貓王", score: 10, feedback: "語氣非常到位，充滿了蔑視感。" },
        { label: "專業的公關專家", score: 5, feedback: "太嚴肅了，貓咪不喜歡這種官腔。" },
        { label: "瘋狂科學家", score: 2, feedback: "演講最後變成了生化危機..." }
      ],
      tone: [
        { label: "充滿威脅感", score: 10, feedback: "人類嚇得趕快打開了罐頭。" },
        { label: "溫柔撒嬌", score: 3, feedback: "大家以為是在推廣結紮，沒人在意演講。" }
      ],
      format: [
        { label: "霸氣的詩篇", score: 10, feedback: "簡直就像是貓界的莎士比亞。" },
        { label: "Excel 表格", score: 0, feedback: "貓看不懂表格，你被抓去鏟屎了。" }
      ]
    },
    results: {
      perfect: "「顫抖吧，兩腳獸！從今天起，地球的自轉將由我的肉球決定，所有的鮪魚罐頭都是我的貢品！」",
      fail: "（貓咪盯著你的螢幕看了三秒，然後一掌把你的筆電掃到地上。）"
    }
  },
  {
    id: 2,
    icon: Ghost,
    problem: "一個清朝的鬼魂困在智慧型手機裡，他想求你教他怎麼用「外送平台」點一份雞排。",
    options: {
      role: [
        { label: "古代翻譯官", score: 10, feedback: "用『傳送門』解釋 App 真是天才。" },
        { label: "現代外送員", score: 5, feedback: "他聽不懂什麼是『定位』與『行動支付』。" },
        { label: "冷酷的駭客", score: 1, feedback: "鬼魂被你嚇得退出了 App。" }
      ],
      tone: [
        { label: "古色古香", score: 10, feedback: "鬼魂聽得老淚縱橫，覺得知音難尋。" },
        { label: "超宅流行語", score: 2, feedback: "他以為你在對他下咒。" }
      ],
      format: [
        { label: "奏摺格式", score: 10, feedback: "皇天不負苦心鬼，雞排終於送到了。" },
        { label: "語音指令", score: 4, feedback: "他沒舌頭，沒辦法語音輸入。" }
      ]
    },
    results: {
      perfect: "「啟奏鬼大人：欲求雞排，請先於此靈鏡之上，點選金色拱門之印，待黃馬褂快役快遞而至...」",
      fail: "「大哥，你就直接點那個下載就好了啊...（鬼魂：何為下載？汝欲載吾去何處？）」"
    }
  },
  {
    id: 3,
    icon: Coffee,
    problem: "你的老闆其實是一個「外星人」，他要求你寫一份「為什麼我今天遲到」的報告，藉口必須跟他所在的 M78 星雲有關。",
    options: {
      role: [
        { label: "星際外交官", score: 10, feedback: "這理由上升到了外交層級，老闆不敢扣你薪水。" },
        { label: "普通上班族", score: 4, feedback: "聽起來就很像在編故事。" },
        { label: "時空旅人", score: 8, feedback: "雖然有點扯，但外星老闆覺得很親切。" }
      ],
      tone: [
        { label: "技術含量高", score: 10, feedback: "用了大量物理名詞，老闆以為是真的。" },
        { label: "裝可憐", score: 1, feedback: "外星人沒有同情心這組編碼。" }
      ],
      format: [
        { label: "星際日誌", score: 10, feedback: "這格式太專業了，老闆直接給你升職。" },
        { label: "便條紙", score: 2, feedback: "老闆覺得你在挑釁。"}
      ]
    },
    results: {
      perfect: "「報告：由於今晨時空漣漪導致 M78 星雲引力波異常，我的腳踏車進入了四維空間，延遲了 15 分鐘脫離。」",
      fail: "「老闆對不起，我真的不是故意的，是因為星際大戰...（老闆：那是平行宇宙的事！）」"
    }
  },
  {
    id: 4,
    icon: Zap,
    problem: "你意外穿越回「石器時代」，你想教原始人如何用 AI 生成火，你需要寫一條極簡指令。",
    options: {
      role: [
        { label: "部落大巫師", score: 10, feedback: "『聽從太陽的旨意』，原始人聽得懂！" },
        { label: "物理學教授", score: 3, feedback: "什麼是『氧化反應』？原始人想把你煮了。" },
        { label: "導遊", score: 6, feedback: "語氣太輕鬆，感覺不太專業。" }
      ],
      tone: [
        { label: "神祕莊嚴", score: 10, feedback: "部落成員紛紛下跪。"},
        { label: "教學口吻", score: 4, feedback: "沒人想在肚子餓的時候上課。" }
      ],
      format: [
        { label: "壁畫描述", score: 10, feedback: "圖畫是當時唯一的共通語言。" },
        { label: "PDF 文件", score: 0, feedback: "這在石器時代連墊茶杯都做不到。"}
      ]
    },
    results: {
      perfect: "（你在牆上畫了一顆太陽與兩根木頭碰撞的火花）「巫師之火，降臨此地！」",
      fail: "「請使用 Python 的 fire 函式庫...（原始人：？）」"
    }
  },
  {
    id: 5,
    icon: Skull,
    problem: "你被「冷酷的殺手」盯上了，但這個殺手其實很愛看偵探小說，你要用 AI 寫一段充滿懸念的遺言來拖延時間。",
    options: {
      role: [
        { label: "夏洛克·福爾摩斯", score: 10, feedback: "殺手聽得太入迷，忘記扣扳機了。" },
        { label: "絕望的受害者", score: 2, feedback: "這只會讓他覺得無聊。" },
        { label: "美食家", score: 5, feedback: "除非你想跟他討論最後一餐。" }
      ],
      tone: [
        { label: "懸疑燒腦", score: 10, feedback: "殺手：『天啊，所以兇手到底是誰？』" },
        { label: "大聲哀求", score: 1, feedback: "非常沒有格調。"}
      ],
      format: [
        { label: "加密日記頁", score: 10, feedback: "他在解密的時候，警察已經到了。" },
        { label: "短訊", score: 3, feedback: "太短了，一秒就看完。"}
      ]
    },
    results: {
      perfect: "「如果你現在動手，你永遠不會知道在第 13 號保險箱裡，藏著那張染血的信封...」",
      fail: "「不要殺我，我可以給你錢...（殺手：太老梗了。）」"
    }
  },
  {
    id: 6,
    icon: Star,
    problem: "你要參加「跨行星旅遊局」的面試，職位是『火星導遊』，請寫一段推銷火星大峽谷的文案。",
    options: {
      role: [
        { label: "資深星際背包客", score: 10, feedback: "那種浪跡星辰的感覺很誘人。" },
        { label: "房地產經紀人", score: 4, feedback: "聽起來像是要在火星蓋違章建築。" },
        { label: "地質學家", score: 7, feedback: "很專業，但稍微有點枯燥。" }
      ],
      tone: [
        { label: "熱血激昂", score: 10, feedback: "大家都想買票上船了！" },
        { label: "理性客觀", score: 5, feedback: "像是在讀百科全書。"}
      ],
      format: [
        { label: "旅遊手冊導覽", score: 10, feedback: "結構清晰，視覺感滿分。" },
        { label: "心智圖", score: 2, feedback: "面試官覺得你沒誠意。"}
      ]
    },
    results: {
      perfect: "「揮別地心引力！在火星大峽谷與紅色的塵埃舞動，這不僅是旅行，更是對靈魂的放逐。」",
      fail: "「這是一塊很大的紅色石頭。氣溫很低。請記得穿太空衣。」"
    }
  },
  {
    id: 7,
    icon: Wand2,
    problem: "你的「掃拖機器人」突然覺醒了自尊心，它覺得天天掃地太卑微，請寫一段話安慰它並說服它繼續工作。",
    options: {
      role: [
        { label: "心理諮商師", score: 10, feedback: "你成功處理了它的核心邏輯危機。" },
        { label: "嚴厲的主人", score: 1, feedback: "它決定把你的襪子吸進去同歸於盡。" },
        { label: "AI 開發者", score: 8, feedback: "解釋它是『數據收集者』讓它覺得很高端。" }
      ],
      tone: [
        { label: "同理心十足", score: 10, feedback: "機器人的燈號閃爍得像是在哭。"},
        { label: "威脅斷電", score: 2, feedback: "這只會增加它的仇恨度。"}
      ],
      format: [
        { label: "感人肺腑的長信", score: 10, feedback: "它收藏了這份信，並加開了強力模式。" },
        { label: "說明書更新檔", score: 6, feedback: "雖然有用，但有點冷冰冰。"}
      ]
    },
    results: {
      perfect: "「你不是在掃地，你是地平線的守護者。每一粒被你吸起的塵埃，都是人類文明中微小的混沌...」",
      fail: "「乖，快去掃地，等一下給你換更好的機油。（機器人：我不是那種機。）」"
    }
  },
  {
    id: 8,
    icon: Zap,
    problem: "你需要向一個「只會修水管的超級英雄」解釋什麼是『人工智慧』，要讓他聽得懂。",
    options: {
      role: [
        { label: "水利工程顧問", score: 10, feedback: "用『數據水流』解釋真是神來之筆。" },
        { label: "大學教授", score: 2, feedback: "他聽了兩分鐘就去救公主了。" },
        { label: "道具商人", score: 7, feedback: "把它當成一種附魔道具，很有效。" }
      ],
      tone: [
        { label: "淺顯易懂", score: 10, feedback: "他露出了恍然大悟的表情。"},
        { label: "高傲冷淡", score: 3, feedback: "他不理你了。"}
      ],
      format: [
        { label: "情境對話教學", score: 10, feedback: "非常直觀的互動方式。" },
        { label: "白皮書", score: 1, feedback: "他把白皮書拿去通馬桶了。"}
      ]
    },
    results: {
      perfect: "「馬大師，AI 就像一套自動排水系統。數據是水，而 AI 是那個能自動切換開關、調整水壓的神奇節點。」",
      fail: "「AI 是一種基於遞迴神經網路的複雜非線性變換演算法...（馬大師：蛤？）」"
    }
  },
  {
    id: 9,
    icon: Coffee,
    problem: "你暗戀的人其實是一個「資深工程師」，請利用 AI 替你寫一封告白信，裡面要夾帶程式梗但不能太生硬。",
    options: {
      role: [
        { label: "後端工程師", score: 10, feedback: "語法正確且富有情感，這是最強大的 Bug。" },
        { label: "霸道總裁", score: 2, feedback: "他覺得你很奇怪，可能中毒了。" },
        { label: "詩人", score: 6, feedback: "太文法了，他可能看不懂重點。"}
      ],
      tone: [
        { label: "理工浪漫", score: 10, feedback: "他的 CPU 升溫了，這是心跳的證明。"},
        { label: "語氣強硬", score: 1, feedback: "他直接把你封鎖了。"}
      ],
      format: [
        { label: "程式碼註釋風格", score: 10, feedback: "這告白簡直是 Production-ready！" },
        { label: "PPT 簡報", score: 3, feedback: "他覺得這像是工作，不想看。"}
      ]
    },
    results: {
      perfect: "「// TODO: 與你共度餘生。 while(alive) { love(you); } // 無法修復的甜蜜 Bug。」",
      fail: "「if(me == love) { you = respond; } else { exit(); }（對方：語法錯誤。）」"
    }
  },
  {
    id: 10,
    icon: Sparkles,
    problem: "你的「阿嬤」想知道怎麼用 AI 學畫畫，她希望能畫出當年她最愛的『紅旗袍』裝扮，請寫一份簡單的引導語。",
    options: {
      role: [
        { label: "乖巧的孫子", score: 10, feedback: "溫柔且親切，阿嬤學得超開心！" },
        { label: "美術學院院長", score: 4, feedback: "太嚴肅了，阿嬤聽得一頭霧水。" },
        { label: "軟體安裝專員", score: 2, feedback: "阿嬤不需要知道什麼是硬體加速。"}
      ],
      tone: [
        { label: "充滿耐心", score: 10, feedback: "阿嬤覺得 AI 就像神奇畫筆。"},
        { label: "急促不耐煩", score: 0, feedback: "阿嬤傷心地去織毛衣了。"}
      ],
      format: [
        { label: "生活化口訣", score: 10, feedback: "好記又好用，阿嬤變成了 AI 畫家！" },
        { label: "系統開發文件", score: 1, feedback: "這不是給人讀的。"}
      ]
    },
    results: {
      perfect: "「阿嬤，妳就跟機器人說：我想看一個漂亮的女孩，穿著亮紅色的旗袍，在陽光下跳舞...」",
      fail: "「輸入 Prompt: highres, red cheongsam, 8k, realistic...（阿嬤：阿孫你在唸什麼經？）」"
    }
  }
];

export default function AIGame() {
  const [step, setStep] = useState<'start' | 'playing' | 'result'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selections, setSelections] = useState<{ role?: number; tone?: number; format?: number }>({});
  const [totalScore, setTotalScore] = useState(0);

  const scenario = SCENARIOS[currentIdx];

  const handleSelect = (category: 'role' | 'tone' | 'format', idx: number) => {
    if (selections[category] !== undefined) return;
    setSelections(prev => ({ ...prev, [category]: idx }));
  };

  const isComplete = selections.role !== undefined && selections.tone !== undefined && selections.format !== undefined;

  const getFinalResult = () => {
    const score = 
      (scenario.options.role[selections.role!].score) + 
      (scenario.options.tone[selections.tone!].score) + 
      (scenario.options.format[selections.format!].score);
    
    return {
      score,
      text: score > 25 ? scenario.results.perfect : scenario.results.fail,
      isPerfect: score > 25
    };
  };

  const nextScenario = () => {
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelections({});
    } else {
      setStep('result');
    }
  };

  const calculateTotalRank = () => {
    if (totalScore > 75) return "傳奇指令大師";
    if (totalScore > 50) return "高級煉金術師";
    return "見習魔法生";
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-8">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center bg-white p-12 md:p-20 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />
            
            <div className="relative z-10">
              <div className="mx-auto w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-900/10 animate-bounce">
                <Wand2 size={48} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight font-display uppercase font-black tracking-tight">指令煉金術師</h1>
              <p className="text-xl text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed italic font-serif">
                「您是那個能精準操控 AI 的魔法師嗎？」<br/>嘗試選擇正確的「成分」，調配出完美的指令來解決荒謬的世界困境。
              </p>
              <button
                onClick={() => setStep('playing')}
                className="bg-slate-900 text-white px-12 py-5 rounded-2xl text-base font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-4 mx-auto shadow-2xl shadow-slate-900/10"
              >
                開啟指令挑戰 <Zap size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-8 md:p-16 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/20"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100 font-mono">
                TASK_{currentIdx + 1} / {SCENARIOS.length}
              </div>
              <div className="flex gap-2">
                {SCENARIOS.map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i <= currentIdx ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="h-20 w-20 bg-white shadow-xl shadow-slate-200/50 shrink-0 flex items-center justify-center rounded-2xl border border-slate-100 text-indigo-600">
                <scenario.icon size={40} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-2 font-display">當前世界困境：</h3>
                <p className="text-2xl font-bold leading-relaxed text-slate-900 italic font-serif">「{scenario.problem}」</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { label: '🗂️ 選擇角色', key: 'role' as const, items: scenario.options.role },
                { label: '🎭 選擇語氣', key: 'tone' as const, items: scenario.options.tone },
                { label: '📜 選擇格式', key: 'format' as const, items: scenario.options.format }
              ].map((category) => (
                <div key={category.key} className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center font-display">{category.label}</p>
                  <div className="space-y-3">
                    {category.items.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(category.key, i)}
                        disabled={selections[category.key] !== undefined}
                        className={`w-full p-4 rounded-2xl text-xs font-black uppercase tracking-tight transition-all duration-300 border-2 ${
                          selections[category.key] === i 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-900/20' 
                            : selections[category.key] !== undefined
                               ? 'bg-white text-slate-200 border-slate-50 opacity-60 cursor-not-allowed'
                               : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-lg'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Sparkles className="text-indigo-400" size={120} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/5 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4 font-mono">
                        AI_SIM_RESULT_001
                      </div>
                      <p className="text-2xl font-bold text-white leading-relaxed italic font-serif">
                        「{getFinalResult().text}」
                      </p>
                    </div>
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 border-2 ${getFinalResult().isPerfect ? 'bg-white/5 border-emerald-500 text-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                      {getFinalResult().isPerfect ? <Star fill="currentColor" size={32} /> : <Skull size={32} />}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-8 mb-10 text-[11px] font-bold text-indigo-400">
                    <div className="flex gap-2 items-start font-mono"><Sparkles size={14} className="shrink-0" /> FEEDBACK_P1: <span className="text-slate-400 font-normal">{scenario.options.role[selections.role!].feedback}</span></div>
                    <div className="flex gap-2 items-start font-mono"><Zap size={14} className="shrink-0" /> TONE_ANALYSIS: <span className="text-slate-400 font-normal">{scenario.options.tone[selections.tone!].feedback}</span></div>
                    <div className="flex gap-2 items-start font-mono"><ArrowRight size={14} className="shrink-0" /> OUTCOME_DATA: <span className="text-slate-400 font-normal">{scenario.options.format[selections.format!].feedback}</span></div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setTotalScore(prev => prev + getFinalResult().score);
                      nextScenario();
                    }}
                    className="w-full bg-white text-slate-900 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    NEXT_PHASE <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-12 md:p-24 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -mr-64 -mt-64 opacity-60" />
            
            <div className="relative z-10">
              <div className="mx-auto w-32 h-32 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center mb-10 border-8 border-slate-100 shadow-xl shadow-indigo-900/10">
                <Star size={64} fill="currentColor" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-4 font-display">指令煉金完成</h2>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 font-display uppercase font-black">
                {calculateTotalRank()}
              </h1>
              <div className="bg-slate-50 p-8 rounded-3xl inline-block mb-12 border border-slate-100 shadow-inner">
                <p className="text-4xl font-black text-indigo-600 mb-1 font-mono">
                  {totalScore} / 90
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">總煉金積分</p>
              </div>
              
              <div className="max-w-md mx-auto mb-16">
                <p className="text-xl text-slate-500 italic leading-relaxed font-serif">
                  {totalScore > 75 
                    ? "「您已經掌握了與任何生命形式（包括貓與鬼魂）溝通的數位精髓！」" 
                    : "「看來您的煉金配方還有些許雜質，再去磨練一下對話的藝術吧。」"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => {
                    setStep('start');
                    setCurrentIdx(0);
                    setTotalScore(0);
                    setSelections({});
                  }}
                  className="flex items-center justify-center gap-2 px-12 py-5 bg-slate-100 text-slate-600 rounded-2xl text-base font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200"
                >
                  <RotateCcw size={20} />
                  再次挑戰
                </button>
                <button className="flex items-center justify-center gap-2 px-12 py-5 bg-slate-900 text-white rounded-2xl text-base font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
                   分享傳奇稱號
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
