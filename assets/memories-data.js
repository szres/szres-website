/* ============================================================
   SZRES 回忆档案数据
   ------------------------------------------------------------
   新增一条回忆：往下面数组里加一个对象即可，页面会自动渲染。
   字段说明：
     year    数字，归属年份（2013-2026）
     date    字符串，如 "2015-06" 或 "2015-06-13"，可留空
     title   条目标题
     tags    标签数组，可为 []
     excerpt 一两句话的简介
     link    可选。写了就整张卡片可点击跳转，
             例如 "posts/2015-anomaly.html"（页面放 posts/ 目录下）
     button  可选。卡片底部的跳转按钮：
             button: { label: "活动介绍", url: "https://..." }
   ============================================================ */
window.SZRES_MEMORIES = [
  {
    year: 2013,
    date: "2013",
    title: "深圳 Resistance 社群成立",
    tags: ["里程碑", "起点"],
    excerpt: "扫描器陆续点亮深圳，蓝军的第一批 Agent 开始集结。本条为占位卡片——成立前后的故事等待老 Agent 们补充。",
    link: ""
  },
  {
    year: 2015,
    date: "2015-06",
    title: "讨论平台迁移：QQ → Telegram",
    tags: ["平台", "里程碑"],
    excerpt: "社群讨论平台由 QQ 迁移至 Telegram，@szres 群从此成为深蓝的行动情报与日常集结阵地。",
    link: ""
  },
  {
    year: 2014,
    date: "2014-08-09",
    title: "Helios（太阳神）香港卫星场大战",
    tags: ["Anomaly", "大战", "香港"],
    excerpt: "大战在香港九龙黄大仙摩士公园举办，深蓝社群的早期成员前往参加。得分情况为 Resistance 94 : Enlightened 31。",
    link: "",
    button: { label: "活动介绍", url: "https://www.reddit.com/r/Ingress/comments/2d38oa/postanomaly_photo_and_screenshot_comparison/" }
  },
  {
    year: 2015,
    date: "2015-03-28",
    title: "Shōnin（证人）广州卫星场大战",
    tags: ["Anomaly", "大战", "广州"],
    excerpt: "深蓝社群组团参加 Shōnin（证人）广州 Satellite Site。这是《Ingress》早期在中国大陆举办的极少数官方大型落地赛事之一，当时吸引了来自全国各地（包括北京、香港等）的玩家前往广州线下参战。",
    link: ""
  },
  {
    year: 2016,
    date: "2016-04-02",
    title: "Obsidian（黑曜石）APAC 香港主场大战",
    tags: ["Anomaly", "大战", "香港"],
    excerpt: "深蓝社群组团赴港参战 Obsidian APAC 亚太区 Primary Site——香港首次举办最高级别的主场大战，战场范围横跨维多利亚港两岸，蓝军获胜。",
    link: ""
  },
  {
    year: 2016,
    date: "2016-02",
    title: "社群 LOGO 更新：方形图标 → 猛禽图标",
    tags: ["品牌", "里程碑"],
    excerpt: "深蓝社群更新视觉标识，LOGO 由方形图标变为猛禽图标。",
    link: ""
  },
  {
    year: 2016,
    date: "2016-04",
    title: "深蓝纪念任务组图上线",
    tags: ["Mission", "任务", "园博园"],
    excerpt: "「深圳抵抗军终极使命」与「深圳上空的鹰」两组纪念任务上线，位于深圳园博园——以超高密度的能量塔群而著名，吸引了粤港玩家前来组团打卡，曾经是蓝军周末八场的核心据点。",
    link: "",
    button: { label: "活动介绍", url: "https://ingress.fandom.com/zh/wiki/Mission:%E6%B7%B1%E5%9C%B3%E4%B8%8A%E7%A9%BA%E7%9A%84%E9%B9%B0?variant=zh-hk" }
  },
  {
    year: 2016,
    date: "2016-09-24",
    title: "Via Lux（光之宿命）澳门卫星场大战",
    tags: ["Anomaly", "大战", "澳门"],
    excerpt: "深蓝社群组团赴澳门，参战 Via Lux（光之宿命）系列活动的卫星战场。这是 Ingress 首次在澳门举办官方大型大战活动，吸引了大量港澳及周边地区的 Agent 前往参战。蓝军获胜，比分 Resistance 1227 : Enlightened 516。",
    link: ""
  },
  {
    year: 2016,
    date: "2016-12-17",
    title: "MDSZ · Mission Day Shenzhen",
    tags: ["Mission Day", "活动", "里程碑"],
    excerpt: "MDSZ 是 Niantic 与中国最大的游戏媒体 17173 合作举办的 Mission Day 系列活动之一，也是深圳首次举办 Mission Day。深蓝社群为活动提供了重要的支持协助。",
    link: "",
    button: { label: "活动介绍", url: "https://ingress.fandom.com/zh/wiki/Mission:Mission_Day_Shenzhen" }
  },
  {
    year: 2017,
    date: "2017-08-26",
    title: "13MAGNUS Reawakens（13马格努斯觉醒）澳门卫星场大战",
    tags: ["Anomaly", "大战", "澳门"],
    excerpt: "澳门第二次被选为 Satellite 城市，深蓝社群组团参加。活动以澳门科学馆为主会场，在台风天鸽过境后满目疮痍的澳门半岛展开激战。",
    link: "",
    button: { label: "活动详情", url: "https://www.hk01.com/%E9%81%8A%E6%88%B2%E5%8B%95%E6%BC%AB/115526/%E9%A2%B1%E9%A2%A8%E4%B8%AD%E7%9A%84ar%E5%B0%8D%E6%B1%BA" }
  },
  {
    year: 2018,
    date: "2018-10",
    title: "Ingress Prime 内测体验",
    tags: ["Prime", "扫描器", "里程碑"],
    excerpt: "Agent 们率先拿到新一代扫描器 Ingress Prime 的内测资格，告别旧版 Scanner，开启全新界面时代。",
    link: ""
  },
  {
    year: 2018,
    date: "2018-11-17",
    title: "Recursion Prime（递归之始）香港卫星场大战",
    tags: ["Anomaly", "大战", "香港"],
    excerpt: "深蓝社群组团赴港参战 Recursion Prime（递归之始）香港卫星场，在中环海滨和油尖旺区展开争夺。蓝军获胜。",
    link: ""
  },
  {
    year: 2019,
    date: "2019",
    title: "社群迁移至新群",
    tags: ["平台", "里程碑"],
    excerpt: "社群讨论平台迁移至新的 Telegram 群，老群完成历史使命，深蓝继续前行。",
    link: ""
  },
  {
    year: 2020,
    date: "2020-05-02",
    title: "Ingress First Saturday 首次线上举办",
    tags: ["IFS", "线上", "里程碑"],
    excerpt: "受特殊公共卫生事件影响，暂停了 4 个月的 SZIFS 活动重启，但改为线上进行。",
    link: ""
  },
  {
    year: 2021,
    date: "2021-07-03",
    title: "线上 IFS 时隔近一年重启",
    tags: ["IFS", "线上"],
    excerpt: "受特殊公共卫生事件影响，继续通过云端会议体验深圳 Ingress First Saturday。",
    link: ""
  },
  {
    year: 2023,
    date: "2023-06-02",
    title: "超频 Overclock 能量塔功能上线",
    tags: ["Overclock", "AR", "里程碑"],
    excerpt: "超频能量塔功能上线——「AR mapped portals to hack items fast」。深蓝社群建立中国大陆最密集的超频能量塔农场，直至该功能于 2026 年初关闭，在北环香蜜立交、梧桐山大望文化高地、金地威新科技园等地生成了超过 50 个完全真实的高质量 AR 超频能量塔。",
    link: "",
    button: { label: "活动介绍", url: "https://ingress.com/news/2023-overclock" }
  },
  {
    year: 2024,
    date: "2024-01-06",
    title: "重启 Ingress First Saturday 线下聚会",
    tags: ["IFS", "线下", "里程碑"],
    excerpt: "深圳 Ingress First Saturday 线下聚会由蓝军组织者 SSSunlight 重启；此后 Tinki666 与 ChestnutLUO 接任组织者，持续参与举办线下 IFS。",
    link: ""
  },
  {
    year: 2024,
    date: "2024-03-16",
    title: "Cryptic Memories XM Anomaly 澳门大战",
    tags: ["Anomaly", "大战", "澳门"],
    excerpt: "澳门举办 Cryptic Memories XM Anomaly，是游戏线下重启后大湾区的第一次大型线下战。深蓝主力队伍在澳门半岛三盏灯圆地附近展开阵地对抗，最终蓝军以 Resistance 99.8 : Enlightened 59.3 获胜。",
    link: ""
  },
  {
    year: 2025,
    date: "2025-05-24",
    title: "+Theta 香港屯门碎片战（Shard Singular / Skirmish）",
    tags: ["Anomaly", "碎片战", "香港"],
    excerpt: "+Theta 赛季亚太地区碎片战在香港屯门打响，深蓝队伍出征屯门码头参战，最终 0 : 3 不敌绿军。",
    link: ""
  },
  {
    year: 2025,
    date: "2025-05-31",
    title: "+Theta 澳门珠海碎片战（Shard Singular / Skirmish）",
    tags: ["Anomaly", "碎片战", "澳门珠海"],
    excerpt: "+Theta 赛季亚太地区碎片战 12:00 在马场东大马路开战，深蓝队伍在珠海配合，并于 13:00 后在珠海坚守碎片。蓝军 3 : 0 获胜。",
    link: ""
  },
  {
    year: 2026,
    date: "2026-09",
    title: "SZRES 社群主页上线",
    tags: ["网站", "里程碑"],
    excerpt: "深蓝社群介绍主页正式上线，2013—2026 的回忆档案同步开始整理，欢迎各位 Agent 投稿。",
    link: ""
  }
];
