/* ============================================================
   SZRES 回忆档案数据（中英双语）
   ------------------------------------------------------------
   新增一条回忆：往下面数组里加一个对象即可，页面会自动渲染。
   字段说明：
     year       数字，归属年份（2013-2026）
     date       字符串，如 "2015-06" 或 "2015-06-13"，可留空
     title      条目标题（中文）
     title_en   可选。英文版标题，语言切到 EN 时显示
     tags       标签数组，可为 []；英文译名见 assets/i18n.js 的 TAGS
     excerpt    一两句话的简介（中文）
     excerpt_en 可选。英文版简介
     link       可选。写了就整张卡片可点击跳转，
                例如 "posts/2015-anomaly.html"（页面放 posts/ 目录下）
     button     可选。卡片底部的跳转按钮：
                button: { label: "活动介绍", url: "https://..." }
                英文文案见 assets/i18n.js 的 BTN；也可直接写 label_en
   ============================================================ */
window.SZRES_MEMORIES = [
  {
    year: 2013,
    date: "2013",
    title: "深圳 Resistance 社群成立",
    title_en: "Founding of the Shenzhen Resistance community",
    tags: ["里程碑", "起点"],
    excerpt: "扫描器陆续点亮深圳，蓝军的第一批 Agent 开始集结。本条为占位卡片——成立前后的故事等待老 Agent 们补充。",
    excerpt_en: "Scanners lit up Shenzhen one by one as the first RES agents began to assemble. Placeholder entry — the origin story awaits our veterans.",
    link: ""
  },
  {
    year: 2014,
    date: "2014-08-09",
    title: "Helios（太阳神）香港卫星场大战",
    title_en: "Helios — Hong Kong Satellite Site",
    tags: ["Anomaly", "大战", "香港"],
    excerpt: "大战在香港九龙黄大仙摩士公园举办，深蓝社群的早期成员前往参加。得分情况为 Resistance 94 : Enlightened 31。",
    excerpt_en: "Held at Morse Park, Wong Tai Sin, Kowloon. Early SZRES members joined the fight. Final score: Resistance 94 : Enlightened 31.",
    link: "",
    button: { label: "活动介绍", url: "https://www.reddit.com/r/Ingress/comments/2d38oa/postanomaly_photo_and_screenshot_comparison/" }
  },
  {
    year: 2015,
    date: "2015-03-28",
    title: "Shōnin（证人）广州卫星场大战",
    title_en: "Shōnin — Guangzhou Satellite Site",
    tags: ["Anomaly", "大战", "广州"],
    excerpt: "深蓝社群组团参加 Shōnin（证人）广州 Satellite Site。这是《Ingress》早期在中国大陆举办的极少数官方大型落地赛事之一，当时吸引了来自全国各地（包括北京、香港等）的玩家前往广州线下参战。",
    excerpt_en: "SZRES travelled to Guangzhou for the Shōnin Satellite Site — one of the very few official large-scale events Ingress held in mainland China in its early days, drawing agents from across the country, Beijing and Hong Kong included.",
    link: ""
  },
  {
    year: 2015,
    date: "2015-06",
    title: "讨论平台迁移：QQ → Telegram",
    title_en: "Community chat moves from QQ to Telegram",
    tags: ["平台", "里程碑"],
    excerpt: "社群讨论平台由 QQ 迁移至 Telegram，@szres 群从此成为深蓝的行动情报与日常集结阵地。",
    excerpt_en: "The community moved its chat from QQ to Telegram — @szres became the new home for op intel and daily gatherings.",
    link: ""
  },
  {
    year: 2016,
    date: "2016-02",
    title: "社群 LOGO 更新：方形图标 → 猛禽图标",
    title_en: "New community logo: square icon gives way to the raptor",
    tags: ["品牌", "里程碑"],
    excerpt: "深蓝社群更新视觉标识，LOGO 由方形图标变为猛禽图标。",
    excerpt_en: "SZRES refreshed its visual identity — the square icon was replaced by the raptor emblem.",
    link: ""
  },
  {
    year: 2016,
    date: "2016-04",
    title: "深蓝纪念任务组图上线",
    title_en: "SZRES memorial mission series goes live",
    tags: ["Mission", "任务", "园博园"],
    excerpt: "「深圳抵抗军终极使命」与「深圳上空的鹰」两组纪念任务上线，位于深圳园博园——以超高密度的能量塔群而著名，吸引了粤港玩家前来组团打卡，曾经是蓝军周末八场的核心据点。",
    excerpt_en: "The 'Shenzhen Resistance Ultimate Mission' and 'Eagle over Shenzhen' mission series went live at Shenzhen Garden & Expo Park, famed for its ultra-dense portal clusters. The area drew agents from Guangdong and Hong Kong, and was once the core spot for weekend 8-mission runs.",
    link: "",
    button: { label: "活动介绍", url: "https://ingress.fandom.com/zh/wiki/Mission:%E6%B7%B1%E5%9C%B3%E4%B8%8A%E7%A9%BA%E7%9A%84%E9%B9%B0?variant=zh-hk" }
  },
  {
    year: 2016,
    date: "2016-04-02",
    title: "Obsidian（黑曜石）APAC 香港主场大战",
    title_en: "Obsidian APAC — Hong Kong Primary Site",
    tags: ["Anomaly", "大战", "香港"],
    excerpt: "深蓝社群组团赴港参战 Obsidian APAC 亚太区 Primary Site——香港首次举办最高级别的主场大战，战场范围横跨维多利亚港两岸，蓝军获胜。",
    excerpt_en: "SZRES crossed the border for the Obsidian APAC Primary Site — Hong Kong's first primary-level anomaly, fought across both shores of Victoria Harbour. Resistance won.",
    link: ""
  },
  {
    year: 2016,
    date: "2016-09-24",
    title: "Via Lux（光之宿命）澳门卫星场大战",
    title_en: "Via Lux — Macau Satellite Site",
    tags: ["Anomaly", "大战", "澳门"],
    excerpt: "深蓝社群组团赴澳门，参战 Via Lux（光之宿命）系列活动的卫星战场。这是 Ingress 首次在澳门举办官方大型大战活动，吸引了大量港澳及周边地区的 Agent 前往参战。蓝军获胜，比分 Resistance 1227 : Enlightened 516。",
    excerpt_en: "SZRES headed to Macau for the Via Lux satellite battlefield — the first official large-scale anomaly ever held in Macau, drawing agents from Macau, Hong Kong and beyond. Resistance won, 1227 : 516.",
    link: ""
  },
  {
    year: 2016,
    date: "2016-12-17",
    title: "MDSZ · Mission Day Shenzhen",
    tags: ["Mission Day", "活动", "里程碑"],
    excerpt: "MDSZ 是 Niantic 与中国最大的游戏媒体 17173 合作举办的 Mission Day 系列活动之一，也是深圳首次举办 Mission Day。深蓝社群为活动提供了重要的支持协助。",
    excerpt_en: "MDSZ was part of the Mission Day series co-hosted by Niantic and 17173, China's largest gaming media — and the first Mission Day ever held in Shenzhen. SZRES provided key support to the event.",
    link: "",
    button: { label: "活动介绍", url: "https://ingress.fandom.com/zh/wiki/Mission:Mission_Day_Shenzhen" }
  },
  {
    year: 2017,
    date: "2017-08-26",
    title: "13MAGNUS Reawakens（13马格努斯觉醒）澳门卫星场大战",
    title_en: "13MAGNUS Reawakens — Macau Satellite Site",
    tags: ["Anomaly", "大战", "澳门"],
    excerpt: "澳门第二次被选为 Satellite 城市，深蓝社群组团参加。活动以澳门科学馆为主会场，在台风天鸽过境后满目疮痍的澳门半岛展开激战。",
    excerpt_en: "Macau was chosen as a Satellite city for the second time, and SZRES joined in. Based at the Macau Science Center, agents battled across the typhoon-scarred Macau Peninsula in the wake of Typhoon Hato.",
    link: "",
    button: { label: "活动详情", url: "https://www.hk01.com/%E9%81%8A%E6%88%B2%E5%8B%95%E6%BC%AB/115526/%E9%A2%B1%E9%A2%A8%E4%B8%AD%E7%9A%84ar%E5%B0%8D%E6%B1%BA" }
  },
  {
    year: 2018,
    date: "2018-10",
    title: "Ingress Prime 体验",
    title_en: "Ingress Prime hands-on",
    tags: ["Prime", "扫描器"],
    excerpt: "Agent 率先体验新一代扫描器 Ingress Prime 的内测，告别旧版 Scanner，开启全新界面时代。但新版客户端功能残缺，操作习惯完全不同，且起步期无法申请新的 Portal，以上因素造成了老玩家的严重流失。",
    excerpt_en: "Agents got early beta access to the next-generation scanner, Ingress Prime — farewell to the old Scanner, hello to a new interface era. But the new client was feature-incomplete, played completely differently, and in its early days didn't even accept new Portal requests. Together these drove a serious exodus of veteran agents.",
    link: ""
  },
  {
    year: 2018,
    date: "2018-11-17",
    title: "Recursion Prime（递归之始）香港卫星场大战",
    title_en: "Recursion Prime — Hong Kong Satellite Site",
    tags: ["Anomaly", "大战", "香港"],
    excerpt: "深蓝社群组团赴港参战 Recursion Prime（递归之始）香港卫星场，在中环海滨和油尖旺区展开争夺。蓝军获胜。",
    excerpt_en: "SZRES travelled to Hong Kong for the Recursion Prime satellite battle, contesting the Central Harbourfront and the Tsim Sha Tsui area. Resistance won.",
    link: ""
  },
  {
    year: 2019,
    date: "2019",
    title: "社群迁移至新群",
    title_en: "Community moves to a new group",
    tags: ["平台", "里程碑"],
    excerpt: "社群讨论平台迁移至新的 Telegram 群，老群完成历史使命，深蓝继续前行。",
    excerpt_en: "The community chat migrated to a new Telegram group, as the old group completed its historic mission.",
    link: ""
  },
  {
    year: 2019,
    date: "2019-09-14",
    title: "Field Test: Hexathlon 澳门半岛限时挑战",
    title_en: "Field Test: Hexathlon — Macau Peninsula",
    tags: ["Prime", "活动", "澳门"],
    excerpt: "深蓝组团参加这一限定只能使用 Ingress Prime 进行的活动，需在 90 分钟以内完成 6 个不同的特殊挑战，获得特殊成就奖牌；奖牌的菁英版本将颁发给单项前 10% 的玩家。",
    excerpt_en: "SZRES took on this Prime-only event on the Macau Peninsula: six different special challenges had to be completed within 90 minutes to earn the exclusive achievement medal — with the Elite version awarded to the top 10% in each individual event.",
    link: ""
  },
  {
    year: 2020,
    date: "2020-05-02",
    title: "Ingress First Saturday 首次线上举办",
    title_en: "First online Ingress First Saturday",
    tags: ["IFS", "线上", "里程碑"],
    excerpt: "受特殊公共卫生事件影响，暂停了 4 个月的 SZIFS 活动重启，但改为线上进行。",
    excerpt_en: "With the public health crisis, SZIFS returned after a four-month pause — now held entirely online.",
    link: ""
  },
  {
    year: 2021,
    date: "2021-07-03",
    title: "线上 IFS 时隔近一年重启",
    title_en: "Online IFS returns after nearly a year",
    tags: ["IFS", "线上"],
    excerpt: "受特殊公共卫生事件影响，继续通过云端会议体验深圳 Ingress First Saturday。",
    excerpt_en: "Owing to the public health situation, we met once more through the cloud to experience Shenzhen IFS online.",
    link: ""
  },
  {
    year: 2022,
    date: "2022",
    title: "丰富深圳 Pokémon GO 游戏环境",
    title_en: "Enriching Shenzhen's Pokémon GO environment",
    tags: ["Lightship", "Wayfarer", "Pokémon GO"],
    excerpt: "2021 年底 Niantic Lightship 开发者平台上线，通过无限额的 wayspot 提交与编辑，深蓝社群极大丰富了深圳的可用能量塔数量——尤其定向覆盖 Pokémon GO 解锁区（罗湖新秀及福田保税区），在充分遵守 Wayfarer 规则的前提下，让深圳 PG 玩家拥有了更多远程道馆和补给站。",
    excerpt_en: "After Niantic's Lightship developer platform launched in late 2021, SZRES made unlimited wayspot submissions and edits that greatly expanded Shenzhen's usable portals — targeting the Pokémon GO unlock zones (Xinxiu in Luohu and the Futian Free Trade Zone) — fully within Wayfarer rules, giving local PG players many more remote gyms and PokéStops.",
    link: ""
  },
  {
    year: 2023,
    date: "2023-06-02",
    title: "超频 Overclock 功能上线",
    title_en: "Overclock goes live",
    tags: ["Overclock", "AR", "里程碑"],
    excerpt: "「AR mapped portals to hack items fast」，深蓝社群曾建立中国大陆最密集的超频能量塔农场，生成了近百个高质量 AR 超频能量塔，直至该功能于 2026 年初关闭。主要范围为北环香蜜立交西南角、梧桐山大望文化高地、塘朗山公园龙珠门、金地威新科技园、深圳图书馆北馆、地铁深圳湾公园站北侧等。",
    excerpt_en: "'AR mapped portals to hack items fast.' SZRES built mainland China's densest Overclock portal farm, creating nearly a hundred high-quality AR Overclock portals before the feature was retired in early 2026 — around the SW corner of Xiangmi interchange on Beihuan Boulevard, the Dawen cultural highland on Wutong Mountain, Longzhu Gate of Tanglang Park, Gemdale V>New tech park, Shenzhen Library North, and the north side of Shenzhen Bay Park metro station.",
    link: "",
    button: { label: "活动介绍", url: "https://ingress.com/news/2023-overclock" }
  },
  {
    year: 2024,
    date: "2024-01-06",
    title: "重启 Ingress First Saturday 线下聚会",
    title_en: "In-person IFS returns",
    tags: ["IFS", "线下", "里程碑"],
    excerpt: "深圳 Ingress First Saturday 线下聚会由蓝军组织者 SSSunlight 重启；此后 Tinki666 与 ChestnutLUO 接任组织者，持续参与举办线下 IFS。",
    excerpt_en: "Shenzhen Ingress First Saturday returned in person, revived by RES organizer SSSunlight. Tinki666 and ChestnutLUO later took over as organizers, keeping the IFS meetups going.",
    link: ""
  },
  {
    year: 2024,
    date: "2024-03-16",
    title: "Cryptic Memories XM Anomaly 澳门大战",
    title_en: "Cryptic Memories XM Anomaly — Macau",
    tags: ["Anomaly", "大战", "澳门"],
    excerpt: "澳门举办 Cryptic Memories XM Anomaly，是游戏线下重启后大湾区的第一次大型线下战。深蓝主力队伍在澳门半岛三盏灯圆地附近展开阵地对抗，最终蓝军以 Resistance 99.8 : Enlightened 59.3 获胜。",
    excerpt_en: "Cryptic Memories was the first major offline battle in the Greater Bay Area since the game's offline restart. SZRES main force held positions around the Three Lamps roundabout on the Macau Peninsula, winning 99.8 : 59.3.",
    link: ""
  },
  {
    year: 2025,
    date: "2025-05-24",
    title: "+Theta 香港屯门碎片战（Shard Singular / Skirmish）",
    title_en: "+Theta Tuen Mun shard battle (Shard Singular / Skirmish)",
    tags: ["Anomaly", "碎片战", "香港"],
    excerpt: "+Theta 赛季亚太地区碎片战在香港屯门打响，深蓝队伍出征屯门码头参战，最终 0 : 3 不敌绿军。",
    excerpt_en: "The APAC shard battle came to Tuen Mun, Hong Kong. SZRES fought at Tuen Mun Ferry Pier and fell 0 : 3 to the Enlightened.",
    link: ""
  },
  {
    year: 2025,
    date: "2025-05-31",
    title: "+Theta 澳门珠海碎片战（Shard Singular / Skirmish）",
    title_en: "+Theta Macau–Zhuhai shard battle (Shard Singular / Skirmish)",
    tags: ["Anomaly", "碎片战", "澳门珠海"],
    excerpt: "+Theta 赛季亚太地区碎片战 12:00 在马场东大马路开战，深蓝队伍在珠海配合，并于 13:00 后在珠海坚守碎片。蓝军 3 : 0 获胜。",
    excerpt_en: "The APAC shard battle opened at 12:00 on Ma Chang East Avenue. SZRES coordinated from Zhuhai and held the shard there after 13:00. Resistance won 3 : 0.",
    link: ""
  },
  {
    year: 2026,
    date: "2026-03-14",
    title: "+Gamma 赛季香港沙田 XM 异常战",
    title_en: "+Gamma — Sha Tin, Hong Kong XM anomaly",
    tags: ["Anomaly", "大战", "香港"],
    excerpt: "+Gamma 赛季 XM 异常战在香港新界沙田打响。深蓝队伍驻守圆洲角公园及战区东南角，后半程战况艰难陷入苦战，最终以 156 : 144 惜败。",
    excerpt_en: "The +Gamma XM anomaly unfolded in Sha Tin, New Territories. SZRES held Yuen Chau Kok Park and the south-east corner of the battle zone through a brutal second half, falling just short, 156 : 144.",
    link: ""
  },
  {
    year: 2026,
    date: "2026-09",
    title: "SZRES 社群主页上线",
    title_en: "SZRES website goes live",
    tags: ["网站", "里程碑"],
    excerpt: "深蓝社群介绍主页正式上线，2013—2026 的回忆档案同步开始整理，欢迎各位 Agent 投稿。",
    excerpt_en: "The SZRES community website launched, and the archiving of 2013–2026 memories began. Agents, send us your stories!",
    link: ""
  }
];
