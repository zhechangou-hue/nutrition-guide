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
  nutrientCards: [
    {
      id: "iodine",
      name: "碘",
      tag: "哺乳期首要",
      summary: "母乳里给宝宝的碘，几乎全靠你日常吃进去。",
      why: "母乳是宝宝碘的唯一来源，宝宝的甲状腺和大脑发育都依赖它。你自己缺碘感觉不明显，但宝宝的影响会更大。哺乳期每天建议约 290 μg。",
      foods: ["海带 / 紫菜（每周 2–3 次）", "海鱼虾贝（每周 3 次）", "加碘盐（日常烹饪用）", "牛奶（每天一杯）"],
      tip: "用加碘盐是最简单的方式，但盐尽量最后放，别高温久炒。"
    },
    {
      id: "dha",
      name: "DHA",
      tag: "哺乳期首要",
      summary: "宝宝大脑和视网膜喜欢的关键脂肪酸。",
      why: "DHA 是大脑和视网膜的核心结构脂肪酸，宝宝出生后头两年完全依赖母乳中的 DHA。长期不补，你自己也可能更容易情绪波动、记忆力下降。建议每天 200–300 mg。",
      foods: ["三文鱼（100g，每周 2 次）", "沙丁鱼 / 鲭鱼（小型深海鱼优先）", "DHA 藻油（不吃鱼可替代）", "核桃（含 ALA，转化率低但有益）"],
      tip: "优先选小型深海鱼，汞含量更低，金枪鱼和旗鱼不要频繁吃。"
    },
    {
      id: "calcium",
      name: "钙",
      tag: "需主动补充",
      summary: "你没吃够时，身体会先从骨骼里借出来。",
      why: "每天通过母乳分泌约 200–300 mg 钙，饮食不足时身体会从骨骼里动用。短期不明显，长期会影响骨密度。哺乳期每天建议 1000–1200 mg。",
      foods: ["牛奶 / 酸奶（每天 1–2 杯）", "北豆腐（卤水点制更高钙）", "西兰花 / 羽衣甘蓝（吸收率较好）", "小鱼干 / 虾皮（汤里加一点）"],
      tip: "维生素 D 帮助钙吸收，晒太阳和户外活动都很加分。"
    },
    {
      id: "iron",
      name: "铁",
      tag: "产后重点",
      summary: "总是累、头晕、恢复慢，不一定只是带娃太辛苦。",
      why: "分娩失血会消耗铁储备，产后铁不足会持续疲劳、头晕、运动后恢复慢。这些常被误以为是普通劳累。哺乳期每天建议 9–10 mg，月经复潮后还会更高。",
      foods: ["牛羊肉（血红素铁，吸收率最好）", "猪肝（每周 1 次，不要过量）", "菠菜 / 木耳（搭配维 C）", "红豆 / 黑豆（同样建议搭配维 C）"],
      tip: "茶和咖啡会影响铁吸收，尽量别和含铁食物一起喝。"
    },
    {
      id: "protein",
      name: "蛋白质",
      tag: "每日基础",
      summary: "你同时在产奶，也在做普拉提后的修复。",
      why: "蛋白质不足时，肌肉酸痛恢复慢、容易饿、情绪也不稳定。混合喂养加每周 3 次普拉提，以 55kg 为例建议约 85g 左右。每餐一掌蛋白质食物，通常就能很接近目标。",
      foods: ["鸡蛋（每天 1–2 个）", "鱼 / 虾 / 鸡胸（每餐一掌）", "希腊酸奶（加餐首选）", "豆腐 / 毛豆（植物蛋白）"],
      tip: "练后 30–60 分钟内补一点蛋白质，恢复会更轻松。"
    }
  ],
  signals: [
    {
      feeling: "总是很累，容易头晕",
      action: "先看铁和蛋白质够不够。红肉、豆类搭配维 C 会更有帮助。"
    },
    {
      feeling: "肌肉酸痛久不恢复",
      action: "蛋白质可能不足。练后补一次蛋白质，连续观察一周。"
    },
    {
      feeling: "情绪波动大，容易焦虑",
      action: "DHA 和镁都值得留意。深海鱼和绿叶菜可以先加上。"
    },
    {
      feeling: "奶量减少",
      action: "先检查总热量和喝水量，身体会优先保护自己。"
    }
  ],
  principles: [
    "每周吃深海鱼 2–3 次，三文鱼、沙丁鱼、鲭鱼优先。",
    "每天蔬菜至少 3 种颜色，颜色越丰富，微量营养素越全。",
    "每餐有一掌蛋白质，鱼、肉、蛋、豆腐任选一。",
    "用加碘盐，烹饪最后放，保护碘不被高温破坏。",
    "练完 30–60 分钟内吃点东西，希腊酸奶、鸡蛋或一把坚果都行。"
  ],
  postWorkoutGuides: [
    {
      title: "练后 30–60 分钟，先补一点",
      icon: "cup",
      accent: "green",
      summary: "不用吃得很正式，但别一直拖到下一餐。先给身体一点蛋白质和碳水，恢复会轻松很多。",
      suggestions: ["希腊酸奶 + 半根香蕉", "鸡蛋 + 一小块红薯", "牛奶 + 一小把燕麦"],
      note: "如果课后马上要带娃出门，提前准备一个能拿了就走的小加餐最省心。"
    },
    {
      title: "蛋白质 15–25g，够修复就好",
      icon: "spark",
      accent: "peach",
      summary: "普拉提强度不算爆发型训练，不需要夸张补剂。关键是稳定给到肌肉修复原料。",
      suggestions: ["1 杯希腊酸奶", "2 个鸡蛋 + 1 杯牛奶", "一掌鱼 / 虾 / 鸡胸"],
      note: "你的目标不是练成健美选手，而是更快恢复、不那么累。"
    },
    {
      title: "加一点碳水，奶量和状态更稳",
      icon: "leaf",
      accent: "blue",
      summary: "哺乳期如果练后只吃蛋白质、不补主食，容易让后面更饿，也可能影响整体能量感。",
      suggestions: ["半拳到一拳主食", "香蕉 / 红薯 / 燕麦任选一个", "如果快到正餐，就直接把那餐好好吃完整"],
      note: "练后最好的饮食建议，通常不是“更克制”，而是“别饿着自己”。"
    }
  ],
  pilatesReasons: [
    {
      title: "怀孕撑开的腹部，需要从深层开始修复",
      summary: "妊娠期腹部肌肉被撑开拉长，不同程度的腹直肌分离几乎每个产后妈妈都有。普拉提的深层核心激活方式，正好是修复这个问题最安全、最有效的路径。",
      accent: "green"
    },
    {
      title: "分娩压力最大的地方，需要有意识地唤醒",
      summary: "骨盆底肌在妊娠和分娩过程中承受了巨大压力，产后普遍存在功能减弱。普拉提的每个动作都在调用骨盆底肌，帮助它重新建立张力和控制感。",
      accent: "peach"
    },
    {
      title: "哺乳姿势造成的体态问题，普拉提在慢慢纠正",
      summary: "长期哺乳让肩膀习惯性前倾、上背部圆曲。普拉提的脊柱延伸和肩胛稳定练习，每节课都在对抗这个模式，帮你找回直立的感觉。",
      accent: "blue"
    },
    {
      title: "不会过度消耗，不影响哺乳和恢复",
      summary: "高强度运动可能短期内影响奶量和身体恢复速度。普拉提强度可控，一周 3 次的节奏对哺乳期身体来说很理想，有刺激，但不过载。",
      accent: "green"
    }
  ],
  pilatesConcepts: [
    {
      id: "core",
      title: "核心",
      summary: "核心不是腹肌，是更深的一层",
      body: "想象肚脐往里缩、往上提的感觉，那个位置就是核心。它不是六块腹肌，而是包裹在腹腔深处的一组肌肉，像天然的腰托。抱娃不腰酸、久坐不塌腰、走路不摇晃，靠的都是它。"
    },
    {
      id: "breath",
      title: "呼吸",
      summary: "普拉提的呼吸方式本身就是训练",
      body: "普拉提用侧肋呼吸，吸气时让肋骨向两侧扩张，呼气时肋骨收拢、腹部轻轻内收。这个呼吸方式本身就在激活深层核心，也在帮助产后腹部的功能性恢复。刚开始配合不上很正常，不要憋气就好。"
    },
    {
      id: "stability",
      title: "稳定性",
      summary: "动作幅度小，不代表没有效果",
      body: "普拉提不追求练到力竭，而是在稳定的基础上完成动作。你可能会觉得动作不大、强度不猛，但这通常说明你在真正激活深层肌肉，而不是用大肌群代偿。"
    }
  ],
  pilatesExpectations: {
    normal: [
      "深层腹部和臀部内侧有轻微酸感",
      "感觉动作没做到位，或者找不到发力感",
      "不会大汗淋漓，心率也不会很高",
      "做完感觉好像没练够"
    ],
    warning: [
      "腰部有明显疼痛，不是酸，是痛",
      "练完有漏尿或盆底明显下坠感",
      "肚子中线练动作时有明显隆起或凸出",
      "任何让你感到不对劲的身体反应"
    ],
    timeline: [
      { stage: "建立连接期", duration: "第 1–2 周", result: "开始感知深层肌肉的存在" },
      { stage: "模式建立期", duration: "第 3–4 周", result: "动作开始有感觉，呼吸和动作能配合" },
      { stage: "感知提升期", duration: "第 5–6 周", result: "日常抱娃、久坐的稳定感明显提升" },
      { stage: "体态改变期", duration: "第 2–3 个月", result: "肩颈圆背开始改善，整体姿态更直" }
    ]
  },
  pilatesNutrition: {
    before: {
      title: "不需要特别准备，正常吃就好",
      body: "距离上次吃饭超过 3 小时，吃一小把坚果或半个水果垫一下。空腹练容易头晕，尤其哺乳期血糖本来就更容易波动。"
    },
    after: {
      title: "这是最重要的一餐",
      body: "身体在修复肌肉，需要蛋白质。一小碗希腊酸奶、一个鸡蛋、或一杯牛奶就够，不需要专门买蛋白粉。"
    },
    principles: [
      "碳水不要刻意减，普拉提供能和产奶都在消耗糖原。",
      "多喝 200–300ml 水，运动和哺乳都在额外耗水。",
      "不需要额外加餐，一周 3 次普拉提已计入活动系数。"
    ],
    signals: [
      { feeling: "特别疲惫，恢复慢", reason: "蛋白质或总热量不足", target: "去营养地图看蛋白质卡片" },
      { feeling: "情绪好但奶量下降", reason: "水分或总热量不够", target: "去我的目标查热量数字" },
      { feeling: "肌肉酸痛超过 3 天", reason: "强度偏高或蛋白质不足", target: "两个方向都查" },
      { feeling: "头晕或低血糖感", reason: "练前空腹或碳水不足", target: "练前加一点碳水" }
    ]
  },
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
      tags: [
        { label: "血红素铁", type: "mineral" },
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
      tags: [
        { label: "烟酸B3", type: "b-vitamin" },
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
      tags: [
        { label: "维E", type: "vitamin" },
        { label: "维K", type: "vitamin" },
        { label: "多酚", type: "phyto" }
      ]
    }
  ],
  nutrientLookup: {
    "碘": [
      { food: "海带 / 紫菜", tip: "频率比一次吃很多更重要，每周安排 2–3 次就很好。" },
      { food: "虾仁", tip: "做成快手菜最省心，也适合练后补一点蛋白质。" },
      { food: "全脂牛奶", tip: "早餐固定一杯，很容易稳定把碘吃进去。" }
    ],
    "DHA": [
      { food: "三文鱼", tip: "每周 2 次，比偶尔突击一次更有效。" },
      { food: "沙丁鱼 / 鲭鱼", tip: "小型深海鱼汞更低，哺乳期更安心。" },
      { food: "核桃", tip: "虽然不是直接 DHA，但作为日常补充依然有益。" }
    ],
    "钙": [
      { food: "全脂牛奶", tip: "和早餐绑定最容易形成稳定摄入。" },
      { food: "希腊酸奶", tip: "加餐时顺手吃，补钙也补蛋白质。" },
      { food: "北豆腐", tip: "卤水点制的豆腐通常钙更高。" }
    ],
    "铁": [
      { food: "牛腱子肉", tip: "血红素铁吸收率最好，是产后恢复的高性价比选择。" },
      { food: "菠菜", tip: "配番茄、彩椒或柠檬汁，吸收会更好。" },
      { food: "红豆 / 黑豆", tip: "植物铁需要一点维 C 帮忙，别单独吃完就算了。" }
    ],
    "蛋白质": [
      { food: "鸡胸肉", tip: "每餐一掌，通常就离目标不远了。" },
      { food: "鸡蛋", tip: "早餐或练后都很方便，补给门槛最低。" },
      { food: "希腊酸奶", tip: "作为加餐比零食更稳，也更顶饿。" }
    ],
    "维D": [
      { food: "三文鱼", tip: "维 D 和 DHA 一起补，效率很高。" },
      { food: "鸡蛋", tip: "每天 1–2 个很容易长期坚持。" },
      { food: "香菇 / 木耳", tip: "晒过的菌菇维 D 会更好一点。" }
    ],
    "叶酸": [
      { food: "菠菜", tip: "快炒或焯水后凉拌，都比久煮更利于保留。" },
      { food: "豌豆苗", tip: "口感轻，适合没胃口的时候加一份绿叶菜。" },
      { food: "红豆 / 黑豆", tip: "做成杂粮饭或汤，接受度通常更高。" }
    ],
    "镁": [
      { food: "菠菜", tip: "和蛋白质食物放在同一餐，整体恢复感会更好。" },
      { food: "豆腐 / 毛豆", tip: "植物蛋白和镁一起到位，很适合晚餐。" },
      { food: "核桃", tip: "控制在一小把，刚好补脂肪也不容易吃过量。" }
    ],
    "维C": [
      { food: "西兰花", tip: "蒸或快炒比久煮留得更多。" },
      { food: "豌豆苗", tip: "作为配菜加在午晚餐，很轻松就能提高一整餐质量。" },
      { food: "紫薯 / 红薯", tip: "别把它只当主食，它也能顺便提供一点维 C。" }
    ],
    "锌": [
      { food: "牛腱子肉", tip: "和铁一起补，适合恢复期优先安排。" },
      { food: "虾仁", tip: "口味清爽，适合夏天和没胃口的时候。" },
      { food: "红豆 / 黑豆", tip: "植物来源更适合做长期底盘补充。" }
    ]
  }
};
