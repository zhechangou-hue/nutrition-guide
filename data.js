window.APP_DATA = {
  defaults: {
    height: 162,
    weight: 55,
    age: 28,
    feeding: "mixed"
  },
  ranges: {
    height: { label: "身高", min: 150, max: 175, step: 1, unit: "cm" },
    weight: { label: "体重", min: 45, max: 75, step: 0.5, unit: "kg" },
    age: { label: "年龄", min: 22, max: 38, step: 1, unit: "岁" }
  },
  feedingOptions: [
    {
      id: "exclusive",
      label: "完全母乳",
      energyBonus: 500,
      proteinBonus: 25,
      hint: "+500 kcal · +25g 蛋白质"
    },
    {
      id: "mixed",
      label: "混合喂养",
      energyBonus: 250,
      proteinBonus: 13,
      hint: "+250 kcal · +13g 蛋白质"
    },
    {
      id: "weaned",
      label: "已断奶 / 极少哺乳",
      energyBonus: 0,
      proteinBonus: 0,
      hint: "额外需求归零"
    }
  ],
  handGuide: [
    { mark: "✊", name: "拳头", portion: "一份主食", detail: "米饭、面条、红薯，每餐一拳，哺乳期可加半拳。" },
    { mark: "✋", name: "手掌", portion: "一份蛋白质", detail: "厚度和面积接近手掌的肉、鱼或豆腐，每餐一掌。" },
    { mark: "👍", name: "拇指", portion: "一份脂肪", detail: "坚果或油脂，每天 2–3 拇指就够。" },
    { mark: "👐", name: "双手捧", portion: "一份蔬菜", detail: "两手捧满的生蔬菜，每天 4–6 捧。" }
  ],
  mealGuides: [
    {
      id: "breakfast",
      title: "早餐",
      subtitle: "先让上午不发慌",
      summary: "早餐先稳住蛋白质和碳水，上午更不容易饿得心慌。",
      examples: ["鸡蛋 + 牛奶 + 全麦面包", "希腊酸奶 + 燕麦 + 半根香蕉", "豆浆 + 鸡蛋 + 一小块红薯"],
      fallback: "来不及准备时，先保住一杯奶或酸奶，再加一个鸡蛋。"
    },
    {
      id: "lunch",
      title: "午餐",
      subtitle: "每餐都先看蛋白质",
      summary: "午餐优先保证一掌蛋白质、一拳主食和两种颜色以上的蔬菜。",
      examples: ["米饭 + 清炒西兰花 + 牛肉", "杂粮饭 + 豆腐 + 虾仁 + 绿叶菜", "面条 + 鸡胸 + 青菜 + 卤蛋"],
      fallback: "外卖也没关系，先选带肉/鱼/蛋/豆腐的套餐，再补一份青菜。"
    },
    {
      id: "dinner",
      title: "晚餐",
      subtitle: "别吃太少，也别全靠零食",
      summary: "晚餐如果太少，夜里更容易饿，也会影响第二天恢复感。",
      examples: ["三文鱼 + 红薯 + 羽衣甘蓝", "鸡胸 + 糙米饭 + 炒菠菜", "豆腐煲 + 杂粮饭 + 彩椒"],
      fallback: "没胃口时，把分量缩小一点，但还是保留主食和蛋白质。"
    }
  ],
  snackWindows: [
    {
      id: "morning",
      title: "上午 10:30 左右",
      summary: "这个时间点饿，不是你嘴馋，很多哺乳妈妈身体就是会要能量。",
      combos: ["希腊酸奶 + 半根香蕉", "牛奶 + 一小把坚果", "鸡蛋 + 一小块红薯"],
      note: "目标不是吃多，而是别等到饿慌了才乱找零食。"
    },
    {
      id: "afternoon",
      title: "下午 15:30–16:00",
      summary: "下午这次加餐，通常最能决定你晚饭前会不会突然暴饿。",
      combos: ["全脂牛奶 + 全麦饼干", "酸奶 + 燕麦", "毛豆 + 小水果"],
      note: "如果晚上还要练普拉提，这次加餐更重要。"
    }
  ],
  workoutFuel: {
    intro: "运动和吃是一件事。你不是在拼强度，而是在帮助身体更稳地恢复。",
    before: {
      title: "练前",
      summary: "距离上次吃饭超过 3 小时，就先垫一点，别空腹硬撑。",
      ideas: ["半根香蕉", "一小把坚果", "半杯牛奶", "半拳主食"]
    },
    after: {
      title: "练后 30–60 分钟",
      summary: "先补一点蛋白质和碳水，恢复会轻松很多。",
      ideas: ["希腊酸奶 + 香蕉", "鸡蛋 + 牛奶", "鸡胸 / 虾仁 + 半拳主食", "豆腐 + 红薯"]
    },
    dayAdjustments: [
      "运动日不要刻意减碳水，普拉提和产奶都在耗能。",
      "多喝 200–300ml 水，运动和哺乳都在额外耗水。",
      "一周 2–3 次普拉提不需要夸张加餐，但练后别拖太久不吃。"
    ]
  },
  swapIdeas: [
    {
      problem: "做不到每周吃深海鱼 2–3 次",
      answer: "可以考虑 DHA 藻油作为替代，不一定非得靠三文鱼完成。"
    },
    {
      problem: "奶制品吃得不多",
      answer: "先用北豆腐、酸奶、牛奶轮着补，重点是别让钙长期空着。"
    },
    {
      problem: "白天总顾不上正经加餐",
      answer: "先准备能拿了就走的最小组合，比如酸奶、牛奶、鸡蛋、坚果。"
    },
    {
      problem: "外卖太随机，不知道怎么选",
      answer: "先保住蛋白质，再补主食和蔬菜，不用追求一顿完美。"
    }
  ],
  focusPrompts: {
    exclusive: "今天先记住：完全母乳的你，别把“容易饿”理解成自己没自控力，很多时候只是身体真的在要能量。",
    mixed: "今天先记住：混合喂养也有额外需求，不用吃得像全母乳那么多，但也别按普通减脂思路去吃。",
    weaned: "今天先记住：如果已经断奶或几乎不哺乳，重点会慢慢回到恢复体力和建立稳定饮食节奏。"
  },
  routeStates: [
    {
      id: "energy_drop",
      shortLabel: "能量掉得快型",
      title: "我最近很容易饿得快、发慌，饿了就容易乱吃",
      summary: "更像是身体在催能量，不是你控制力差。",
      diagnosis: "很多哺乳期妈妈在这个阶段，会因为总热量不够、主食太少或加餐断掉，出现突然很饿、很烦、很想随便抓点东西吃的状态。",
      action: "先只保住一个固定加餐时段，比如上午 10:30 或下午 15:30，不要先从“忍住不吃”开始。",
      fallback: "哪怕只是牛奶、酸奶、鸡蛋、半根香蕉或一小把坚果，也比硬撑到乱吃更有帮助。",
      quickLinks: ["下午加餐先怎么选", "为什么一减碳就更容易晕", "晚上练普拉提前要不要垫一点"],
      todayPlan: {
        emphasisTitle: "今天先别硬撑",
        emphasisBody: "你现在更需要先把能量接住，再去谈吃得漂不漂亮。",
        prompt: "今天先保住一个固定加餐时段，不要硬撑到饿慌了再随便抓东西吃。",
        primaryCta: "我最近是不是有稳一点",
        order: ["snacks", "meals", "swap", "workout"]
      }
    },
    {
      id: "recovery_gap",
      shortLabel: "恢复接不上型",
      title: "我练完以后很累，第二天恢复也慢",
      summary: "更像是恢复没有被接住，不一定是你练得不对。",
      diagnosis: "尤其在哺乳期，如果练后一直空着、全天蛋白质偏少，身体就更容易出现“明明没练很猛，但人就是很虚”的感觉。",
      action: "练后 30–60 分钟先补一点蛋白质和碳水，不用追求完美，先让身体知道自己被接住了。",
      fallback: "如果练完没胃口，就先喝一点、垫一点，比如酸奶、牛奶、鸡蛋或半拳主食，不用等一顿完整正餐。",
      quickLinks: ["练后最小补给方案", "练完不饿怎么办", "恢复总是比别人慢是不是吃得不够"],
      todayPlan: {
        emphasisTitle: "今天先接住恢复",
        emphasisBody: "你的重点不是加练，而是让运动后的恢复真正落地。",
        prompt: "今天先记住：练后不要空着，哪怕只补一点，也是在帮身体恢复。",
        primaryCta: "看看我恢复有没有一点点变好",
        order: ["workout", "meals", "snacks", "swap"]
      }
    },
    {
      id: "know_but_blocked",
      shortLabel: "知道但做不到型",
      title: "我其实知道一些原则，但现实里总是做不到",
      summary: "不是你不知道，而是现在的方案还不够贴近真实生活。",
      diagnosis: "这类状态常见于已经有基础营养认知的妈妈。问题不在教育不足，而在执行路径太理想化，跟带娃、工作和练习节奏没有接上。",
      action: "这周先只改一个点，比如固定一次加餐、每餐先看蛋白质，或练后不再空着，不要一次全改。",
      fallback: "做不到标准版没关系，先用最低配方案、外卖兜底和补剂替代，让身体先得到一点真正的支持。",
      quickLinks: ["最低配也能做的版本", "外卖怎么选更省脑", "做不到深海鱼怎么办"],
      todayPlan: {
        emphasisTitle: "今天先别全改",
        emphasisBody: "你更需要的是可执行版本，而不是再听一轮更完整的原理。",
        prompt: "今天先只改一个点，不需要一下子把所有建议都做到。",
        primaryCta: "我最近有没有哪一点变得更容易了",
        order: ["swap", "meals", "snacks", "workout"]
      }
    },
    {
      id: "structure_off",
      shortLabel: "结构不对型",
      title: "我不是乱吃，但总觉得自己吃得没什么方向",
      summary: "更像是结构还差一点，不是吃错很多。",
      diagnosis: "很多妈妈其实已经很努力了，也不是天天乱吃，但蛋白质、主食、蔬菜结构常常偏掉，导致“看起来还行，身体却没被稳稳接住”。",
      action: "先从每餐保住一掌蛋白质、一拳主食和两种颜色蔬菜开始，不用一开始就追求完美。",
      fallback: "没有标准健康餐也没关系，先抓结构，不抓漂亮。外卖、家常菜、简餐都可以先往这三个点靠。",
      quickLinks: ["每餐先看什么", "外卖结构怎么补", "主食少了为什么更容易不稳"],
      todayPlan: {
        emphasisTitle: "今天先抓结构",
        emphasisBody: "不是你吃得太差，而是吃得还不够有方向。",
        prompt: "今天不用大改，只先看每餐结构有没有稳住。",
        primaryCta: "看看我最近有没有更稳一点",
        order: ["meals", "snacks", "swap", "workout"]
      }
    },
    {
      id: "mood_wave",
      shortLabel: "情绪波动型",
      title: "我最近比较容易烦、乱、焦虑，状态有点飘",
      summary: "情绪波动不一定只是心理上的，身体状态也可能在推着走。",
      diagnosis: "如果最近吃得不稳、恢复断掉、饿得快或者太累，情绪会比平时更容易被放大。先稳住身体节奏，情绪通常才会慢慢落地。",
      action: "先不要急着解决所有问题，先把进食节奏稳一点，不要空腹太久，也先保住一个固定加餐。",
      fallback: "先别研究太多营养素，先用最省脑的组合把节奏接回来。情绪很飘的时候，轻方案比大道理更有用。",
      quickLinks: ["稳定感相关的吃法", "总是乱饿怎么办", "为什么一乱就更难好好吃饭"],
      todayPlan: {
        emphasisTitle: "今天先让节奏回来",
        emphasisBody: "你现在更需要被安顿下来，而不是再处理更多复杂信息。",
        prompt: "今天先别急着把所有问题想清楚，先把吃和节奏稳一点。",
        primaryCta: "我最近有没有更稳一点",
        order: ["snacks", "meals", "workout", "swap"]
      }
    },
    {
      id: "fear_eating",
      shortLabel: "怕吃多型",
      title: "我想恢复活力，但又总怕自己吃多",
      summary: "更像是在用减脂思路要求一个本该先恢复的身体。",
      diagnosis: "很多妈妈会下意识吃得太保守，结果更容易累、头晕、奶量不稳，身体也更难真正回到有活力的方向。",
      action: "先暂停刻意减碳 3 天看看，不用一下子吃很多，只是别再主动把主食和练后补给一直压掉。",
      fallback: "从每餐补回半拳主食、练后补一个最小组合开始，不是放飞吃，而是先让身体看到恢复的空间。",
      quickLinks: ["主食和恢复的关系", "我是不是吃太少了", "为什么恢复期不能一直按减脂逻辑吃"],
      todayPlan: {
        emphasisTitle: "今天先别再压量",
        emphasisBody: "你真正需要的是恢复和稳定，不是继续用控制逻辑对待自己。",
        prompt: "今天先别用减脂思路要求自己，恢复和稳定是现在更重要的事。",
        primaryCta: "我最近有没有更有力一点",
        order: ["meals", "workout", "snacks", "swap"]
      }
    }
  ],
  changeGroups: [
    {
      id: "body",
      title: "身体感受",
      options: [
        { id: "body_steady", label: "下午没那么容易塌了", feedback: "这通常说明你的能量补给开始更稳了。" },
        { id: "body_recover", label: "练完没那么虚了", feedback: "这说明吃和恢复慢慢接上了。" },
        { id: "body_hungry", label: "还是容易饿得发慌", feedback: "这往往不是意志力问题，更像是加餐或总热量还没接住你。" },
        { id: "body_tired", label: "还是挺容易累", feedback: "如果疲惫感一直在，后面更值得回头看蛋白质、铁和总热量。" }
      ]
    },
    {
      id: "emotion",
      title: "情绪状态",
      options: [
        { id: "emotion_stable", label: "情绪比前几天稳一点", feedback: "有时候身体更稳，情绪会先一步变得不那么飘。" },
        { id: "emotion_fuzzy", label: "脑子还是有点乱", feedback: "这很常见，先别急着要求自己一下子变好，先从吃稳开始。" },
        { id: "emotion_anxious", label: "还是容易焦虑", feedback: "焦虑不一定都是心理问题，能量感、睡眠和恢复都可能在里面。" }
      ]
    },
    {
      id: "cognition",
      title: "认知变化",
      options: [
        { id: "mind_clear", label: "我更知道该怎么选吃的了", feedback: "这就是营养直觉开始长出来的样子。" },
        { id: "mind_partial", label: "我知道原理，但现实里还做不到", feedback: "这不是退步，是你已经走到了“知道该怎么改”的阶段。" },
        { id: "mind_confused", label: "我还是常常不知道先改哪一步", feedback: "可以先只抓一个点，比如下午加餐或练后补给，不用全改。" }
      ]
    }
  ],
  changeWins: [
    "今天抱娃时腰没那么容易酸",
    "吃完饭后更踏实一点",
    "一饿的时候没有立刻乱找零食",
    "练完第二天恢复快一点",
    "我更知道该往哪几个营养素上看"
  ],
  blockers: [
    "我还是不知道加餐吃什么最省事",
    "我知道原理，但现实里做不到",
    "我经常空腹练",
    "我总觉得自己吃了会胖",
    "我不确定自己到底缺什么"
  ],
  lookupSymptoms: [
    {
      id: "tired",
      label: "总是累",
      leads: ["铁", "蛋白质"],
      action: "先看铁和蛋白质够不够，再回头看总热量是不是一直偏低。"
    },
    {
      id: "dizzy",
      label: "容易头晕",
      leads: ["碳水", "铁"],
      action: "先排查是不是空腹太久，尤其是练前和上午、下午的加餐时间。"
    },
    {
      id: "milk",
      label: "奶量不稳",
      leads: ["总热量", "水分"],
      action: "先别急着归因，先看最近是不是吃少了、喝少了、练后又拖太久没补。"
    },
    {
      id: "mood",
      label: "情绪波动",
      leads: ["DHA", "镁"],
      action: "先从深海鱼、绿叶菜和稳定的进食节奏入手，不要先怪自己。"
    },
    {
      id: "recovery",
      label: "恢复慢",
      leads: ["蛋白质", "总热量"],
      action: "看练后是不是总没吃，或者一整天蛋白质都偏少。"
    }
  ],
  lookupNutrients: [
    {
      id: "碘",
      title: "碘",
      why: "母乳是宝宝碘的主要来源，哺乳期尤其值得稳稳补上。",
      foods: ["海带 / 紫菜", "海鱼虾贝", "加碘盐", "全脂牛奶"],
      fallback: "如果日常很少吃海产，至少先确认家里用的是加碘盐。"
    },
    {
      id: "DHA",
      title: "DHA",
      why: "更偏宝宝大脑和视网膜发育，也和你自己的情绪稳定感有关。",
      foods: ["三文鱼", "沙丁鱼 / 鲭鱼", "核桃", "DHA 藻油"],
      fallback: "如果做不到频繁吃鱼，DHA 藻油是非常现实的替代路径。"
    },
    {
      id: "钙",
      title: "钙",
      why: "哺乳期更容易从身体储备里调出去，别等到明显不舒服才想起来。",
      foods: ["全脂牛奶", "希腊酸奶", "北豆腐", "西兰花"],
      fallback: "奶制品吃得少时，先把豆腐和酸奶补上。"
    },
    {
      id: "铁",
      title: "铁",
      why: "产后失血和疲惫感，很多时候会和铁储备有关。",
      foods: ["牛腱子肉", "猪肝", "菠菜", "红豆 / 黑豆"],
      fallback: "不常吃红肉也没关系，但要记得给植物铁搭配维 C。"
    },
    {
      id: "蛋白质",
      title: "蛋白质",
      why: "它既在帮你产奶，也在帮你练后恢复。",
      foods: ["鸡蛋", "鸡胸 / 虾仁 / 鱼", "希腊酸奶", "豆腐 / 毛豆"],
      fallback: "如果正餐经常顾不上，先保证早餐和练后补一点。"
    },
    {
      id: "维D",
      title: "维D",
      why: "和钙吸收、恢复感都有关系，也常常是容易被忽略的一环。",
      foods: ["三文鱼", "鸡蛋", "全脂牛奶", "香菇 / 木耳"],
      fallback: "如果日照和鱼类都偏少，这一项后面很适合单独留意。"
    },
    {
      id: "镁",
      title: "镁",
      why: "它经常不会被第一时间想到，但和情绪、肌肉状态都有关系。",
      foods: ["菠菜", "豆腐 / 毛豆", "核桃", "燕麦"],
      fallback: "绿叶菜 + 豆类的组合，通常比单独补更容易坚持。"
    }
  ],
  foodCategories: [
    { id: "all", label: "全部" },
    { id: "protein", label: "蛋白质类" },
    { id: "vegetable", label: "蔬菜" },
    { id: "carb", label: "主食杂粮" },
    { id: "dairy", label: "奶蛋" },
    { id: "fat", label: "坚果油脂" }
  ],
  foods: [
    {
      name: "三文鱼",
      category: "protein",
      art: "salmon",
      portion: "100g 一掌",
      calories: 208,
      macros: { protein: 22, carbs: 0, fat: 13 },
      note: "更偏 DHA、维 D 和恢复感。",
      tags: [
        { label: "DHA", type: "fatty" },
        { label: "维D", type: "vitamin" },
        { label: "硒", type: "mineral" },
        { label: "B12", type: "b-vitamin" }
      ]
    },
    {
      name: "牛腱子肉",
      category: "protein",
      art: "beef",
      portion: "100g 一掌",
      calories: 170,
      macros: { protein: 26, carbs: 0, fat: 7 },
      note: "更偏铁和恢复，尤其适合疲惫感明显时留意。",
      tags: [
        { label: "铁", type: "mineral" },
        { label: "锌", type: "mineral" },
        { label: "B12", type: "b-vitamin" }
      ]
    },
    {
      name: "鸡胸肉",
      category: "protein",
      art: "chicken",
      portion: "120g 一掌",
      calories: 198,
      macros: { protein: 37, carbs: 0, fat: 4 },
      note: "很稳的蛋白质来源，适合练后恢复。",
      tags: [
        { label: "蛋白质", type: "b-vitamin" },
        { label: "磷", type: "mineral" },
        { label: "硒", type: "mineral" }
      ]
    },
    {
      name: "虾仁",
      category: "protein",
      art: "shrimp",
      portion: "100g 一抓",
      calories: 99,
      macros: { protein: 24, carbs: 0, fat: 1 },
      note: "高蛋白又清爽，也能顺手补一点碘。",
      tags: [
        { label: "碘", type: "mineral" },
        { label: "锌", type: "mineral" },
        { label: "磷", type: "mineral" }
      ]
    },
    {
      name: "豆腐 / 毛豆",
      category: "protein",
      art: "tofu",
      portion: "150g",
      calories: 165,
      macros: { protein: 15, carbs: 9, fat: 8 },
      note: "适合想吃得轻一点，但又不想把蛋白质放掉的时候。",
      tags: [
        { label: "钙", type: "mineral" },
        { label: "镁", type: "mineral" },
        { label: "铁", type: "mineral" },
        { label: "大豆异黄酮", type: "phyto" }
      ]
    },
    {
      name: "西兰花",
      category: "vegetable",
      art: "broccoli",
      portion: "100g 大一捧",
      calories: 34,
      macros: { protein: 3, carbs: 7, fat: 0 },
      note: "是很友好的基础绿叶菜，维 C 和钙都不错。",
      tags: [
        { label: "维C", type: "vitamin" },
        { label: "维K", type: "vitamin" },
        { label: "叶酸", type: "vitamin" },
        { label: "钙", type: "mineral" }
      ]
    },
    {
      name: "菠菜",
      category: "vegetable",
      art: "spinach",
      portion: "100g 一捧",
      calories: 23,
      macros: { protein: 3, carbs: 4, fat: 0 },
      note: "很适合放在“恢复慢或情绪不太稳”的时候一起留意。",
      tags: [
        { label: "铁", type: "mineral" },
        { label: "叶酸", type: "vitamin" },
        { label: "维K", type: "vitamin" },
        { label: "镁", type: "mineral" }
      ]
    },
    {
      name: "豌豆苗",
      category: "vegetable",
      art: "pea",
      portion: "100g 大一捧",
      calories: 31,
      macros: { protein: 4, carbs: 5, fat: 0 },
      note: "轻盈但营养密度不错，适合没胃口的时候。",
      tags: [
        { label: "维C", type: "vitamin" },
        { label: "叶酸", type: "vitamin" },
        { label: "β-胡萝卜素", type: "phyto" }
      ]
    },
    {
      name: "胡萝卜",
      category: "vegetable",
      art: "carrot",
      portion: "100g 一根",
      calories: 41,
      macros: { protein: 1, carbs: 10, fat: 0 },
      note: "很适合放在一顿饭里顺手补颜色。",
      tags: [
        { label: "β-胡萝卜素", type: "phyto" },
        { label: "维K", type: "vitamin" },
        { label: "钾", type: "mineral" }
      ]
    },
    {
      name: "香菇 / 木耳",
      category: "vegetable",
      art: "mushroom",
      portion: "50g 干品泡发",
      calories: 60,
      macros: { protein: 3, carbs: 11, fat: 0 },
      note: "适合做配菜加进去，轻松拉高营养密度。",
      tags: [
        { label: "维D", type: "vitamin" },
        { label: "铁", type: "mineral" },
        { label: "膳食纤维", type: "phyto" }
      ]
    },
    {
      name: "糙米饭",
      category: "carb",
      art: "rice",
      portion: "150g 熟一拳",
      calories: 168,
      macros: { protein: 4, carbs: 35, fat: 1 },
      note: "稳定碳水，比较适合不想一会儿就饿的时候。",
      tags: [
        { label: "B1", type: "b-vitamin" },
        { label: "镁", type: "mineral" },
        { label: "锰", type: "mineral" },
        { label: "膳食纤维", type: "phyto" }
      ]
    },
    {
      name: "燕麦",
      category: "carb",
      art: "oats",
      portion: "40g 干约半碗",
      calories: 156,
      macros: { protein: 7, carbs: 26, fat: 3 },
      note: "非常适合做加餐底座，稳定又省心。",
      tags: [
        { label: "β-葡聚糖", type: "phyto" },
        { label: "锰", type: "mineral" },
        { label: "磷", type: "mineral" },
        { label: "B1", type: "b-vitamin" }
      ]
    },
    {
      name: "红豆 / 黑豆",
      category: "carb",
      art: "beans",
      portion: "50g 干煮熟一碗",
      calories: 170,
      macros: { protein: 11, carbs: 30, fat: 1 },
      note: "适合在主食里顺手增加一点铁和饱腹感。",
      tags: [
        { label: "铁", type: "mineral" },
        { label: "叶酸", type: "vitamin" },
        { label: "钾", type: "mineral" },
        { label: "锌", type: "mineral" }
      ]
    },
    {
      name: "紫薯 / 红薯",
      category: "carb",
      art: "sweet-potato",
      portion: "150g 一拳",
      calories: 129,
      macros: { protein: 2, carbs: 30, fat: 0 },
      note: "很适合做练前练后的低负担碳水。",
      tags: [
        { label: "钾", type: "mineral" },
        { label: "维C", type: "vitamin" },
        { label: "β-胡萝卜素", type: "phyto" },
        { label: "膳食纤维", type: "phyto" }
      ]
    },
    {
      name: "鸡蛋",
      category: "dairy",
      art: "egg",
      portion: "1–2 个",
      calories: 78,
      macros: { protein: 6, carbs: 1, fat: 5 },
      note: "极高性价比的蛋白质来源，也很适合练后小补。",
      tags: [
        { label: "维D", type: "vitamin" },
        { label: "胆碱", type: "b-vitamin" },
        { label: "硒", type: "mineral" },
        { label: "B12", type: "b-vitamin" }
      ]
    },
    {
      name: "全脂牛奶",
      category: "dairy",
      art: "milk",
      portion: "250ml 一杯",
      calories: 150,
      macros: { protein: 8, carbs: 12, fat: 8 },
      note: "省事、稳、容易形成习惯，是很好的基础补给。",
      tags: [
        { label: "钙", type: "mineral" },
        { label: "维D", type: "vitamin" },
        { label: "B2", type: "b-vitamin" },
        { label: "碘", type: "mineral" }
      ]
    },
    {
      name: "希腊酸奶",
      category: "dairy",
      art: "yogurt",
      portion: "150g",
      calories: 135,
      macros: { protein: 15, carbs: 7, fat: 4 },
      note: "加餐首选之一，补蛋白质也补钙。",
      tags: [
        { label: "钙", type: "mineral" },
        { label: "益生菌", type: "phyto" },
        { label: "B12", type: "b-vitamin" },
        { label: "磷", type: "mineral" }
      ]
    },
    {
      name: "牛油果",
      category: "fat",
      art: "avocado",
      portion: "半个约 50g",
      calories: 80,
      macros: { protein: 1, carbs: 4, fat: 7 },
      note: "适合给一顿饭增加一点温和脂肪和饱腹感。",
      tags: [
        { label: "维E", type: "vitamin" },
        { label: "钾", type: "mineral" },
        { label: "叶酸", type: "vitamin" },
        { label: "单不饱和脂肪", type: "fatty" }
      ]
    },
    {
      name: "核桃",
      category: "fat",
      art: "walnut",
      portion: "3 颗约 25g",
      calories: 163,
      macros: { protein: 4, carbs: 3, fat: 16 },
      note: "很适合做最低配加餐，但分量别不知不觉越吃越多。",
      tags: [
        { label: "Ω-3", type: "fatty" },
        { label: "维E", type: "vitamin" },
        { label: "镁", type: "mineral" },
        { label: "锰", type: "mineral" }
      ]
    },
    {
      name: "橄榄油",
      category: "fat",
      art: "olive-oil",
      portion: "10ml 一拇指",
      calories: 90,
      macros: { protein: 0, carbs: 0, fat: 10 },
      note: "不是主角，但能让一顿饭更完整、更有满足感。",
      tags: [
        { label: "维E", type: "vitamin" },
        { label: "维K", type: "vitamin" },
        { label: "多酚", type: "phyto" }
      ]
    }
  ]
};
