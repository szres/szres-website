/* ============================================================
   SZRES 站点双语支持（zh 默认 / en）
   ------------------------------------------------------------
   - 页面元素：给元素加 data-i18n="key"，词条写在下面的 DICT
   - 档案数据：memories-data.js 条目里可选加 title_en / excerpt_en
   - 标签与按钮文案：TAGS / BTN 映射表
   - 切换按钮：右上角 langToggle，点击后写入 localStorage 并刷新
   ============================================================ */
(function () {
  'use strict';

  var DICT = {
    title_index: ["SZRES · Shenzhen Resistance 深蓝社群", "SZRES · Shenzhen Resistance"],
    title_memories: ["MEMORIES · 回忆档案 2013–2026 | SZRES 深蓝社群", "MEMORIES · Archive 2013–2026 | SZRES"],
    hero_sub: ["SHENZHEN RESISTANCE · 深蓝社群", "SHENZHEN RESISTANCE"],
    hero_tag: ["EST. 2013 — STILL RUNNING · 那些年，我们一起玩的 Ingress", "EST. 2013 — STILL RUNNING · Those years we played Ingress together"],
    strip_founded: ["成立年份", "FOUNDED"],
    strip_years_b: ["13 年", "13"],
    strip_years_l: ["持续运营", "YEARS RUNNING"],
    strip_res_l: ["抵抗军 · 阵营色蓝", "RESISTANCE · BLUE"],
    strip_sz_b: ["SZ", "+86755/440301"],
    strip_sz_l: ["坐标深圳", "SHENZHEN, CHINA"],
    about_overline: ["ABOUT US // 关于我们", "ABOUT US // SZRES"],
    about_zh: ["我们是谁", "SZRES COMMUNITY"],
    about_p1: [
      "深蓝社群（Shenzhen Resistance，SZRES）是 Ingress 玩家在深圳的抵抗军社群，自 <em>2013 年</em>成立至今，已陪伴这座城市走过了<em>十余个年头</em>。",
      "Shenzhen Resistance (SZRES) is the Resistance community for Ingress agents in Shenzhen. Founded in <em>2013</em>, it has stood alongside this city for <em>over a decade</em>."
    ],
    about_p2: [
      "Ingress 是一款以真实世界为棋盘的增强现实（AR）游戏，全球玩家分为两支阵营——争夺守护人类心灵的 <em>Resistance（抵抗军）</em>与拥抱异次元能量的 Enlightened（启示军）。在深圳，我们就是那支把地图刷成蓝色的队伍。",
      "Ingress is an augmented-reality game played on the streets of the real world. Agents worldwide join one of two factions — the <em>Resistance</em>, fighting to protect humanity, and the Enlightened, embracing exotic energy. In Shenzhen, we are the team that paints the map blue."
    ],
    about_p3: [
      "从南山科技园到罗湖东门，从蛇口的海风到大鹏的浪涛，深圳 Agent 们的扫描器从未停下：日常的占领与建联、周末的 field ops、官方异常战（Anomaly）与 First Saturday 月光行动、以及大大小小的线下聚会。阵营会有胜负，战场会有得失，但这份从 2013 年延续下来的默契与热闹，从未散场。",
      "From the Nanshan tech hub to Dongmen in Luohu, from the sea breeze of Shekou to the waves of Dapeng, Shenzhen agents never stop scanning: daily captures and fields, weekend ops, official anomalies and First Saturday meetups, gatherings big and small. Factions win and lose, fields rise and fall — but the spirit that has run since 2013 never faded."
    ],
    about_p4: [
      "无论你是身经百战的老 Agent，还是刚刚下载扫描器的新人，蓝军的门永远为你打开。",
      "Whether you are a battle-hardened veteran or a new agent with a fresh scanner, the door of the Resistance is always open for you."
    ],
    fact_founded_v: ["2013 年", "2013"],
    fact_faction_v: ["RESISTANCE · 抵抗军", "RESISTANCE"],
    fact_city_v: ["中国 · 深圳", "SHENZHEN, CHINA"],
    fact_status_v: ["持续运营中", "STILL RUNNING"],
    join_overline: ["JOIN US // 加入我们", "JOIN US // SZRES"],
    join_zh: ["加入深蓝社群", "TELEGRAM @SZRES"],
    join_desc: [
      "点击下方按钮加入深蓝社群 Telegram 群。群里有最新的行动情报、组队约刷与线下聚会通知——深圳的天空，等你说出那一声「 Resistance! 」。",
      "Hit the button below to join the SZRES Telegram group — the latest operation intel, squad farming and offline event notices. The sky over Shenzhen awaits your cry of 'Resistance!'"
    ],
    join_hint: [
      "入群请备注游戏 ID 与等级，方便管理员核对身份",
      "When joining, please include your agent name and level for verification."
    ],
    mem_overline: ["MEMORIES // 回忆档案", "MEMORIES // ARCHIVE"],
    archive_zh: ["岁月存档", "2013 — 2026"],
    mem_sub: ["回忆档案 · 2013 — 2026 · 那些年，我们一起打下的蓝", "The archive · 2013 — 2026 · The fields we painted blue together"],
    contrib_overline: ["CONTRIBUTE // 投稿", "CONTRIBUTE // SHARE"],
    contrib_zh: ["留下你的回忆", "TO THE ARCHIVE"],
    contrib_desc: [
      "你是这些年的亲历者吗？欢迎把当年的战报、照片与故事投稿到群里，我们会整理归档到对应的年份。",
      "Were you there? Send your battle reports, photos and stories to the group — we will archive them under the right year."
    ],
    footer_name: ["SHENZHEN RESISTANCE · 深蓝社群", "SHENZHEN RESISTANCE"],
    footer_note: [
      "Ingress™ 为 Niantic, Inc. 的注册商标。本站为玩家自发建立的非官方社群主页，与 Niantic, Inc. 无从属关系。<br>© 2013–2026 SZRES · SHENZHEN RESISTANCE",
      "Ingress™ is a trademark of Niantic, Inc. This is an unofficial community website built by agents, and is not affiliated with Niantic, Inc.<br>© 2013–2026 SZRES · SHENZHEN RESISTANCE"
    ]
  };

  var TAGS = {
    "里程碑": "Milestone",
    "起点": "Origin",
    "平台": "Platform",
    "网站": "Website",
    "活动": "Event",
    "大战": "Battle",
    "香港": "Hong Kong",
    "澳门": "Macau",
    "澳门珠海": "Macau–Zhuhai",
    "广州": "Guangzhou",
    "线下": "In-person",
    "线上": "Online",
    "任务": "Missions",
    "园博园": "Garden Expo Park",
    "品牌": "Brand",
    "扫描器": "Scanner",
    "碎片战": "Shard Battle"
  };

  var BTN = {
    "活动介绍": "Event info",
    "活动详情": "Event details"
  };

  var lang = 'zh';
  try { lang = localStorage.getItem('szres_lang') === 'en' ? 'en' : 'zh'; } catch (e) {}

  function apply() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = DICT[el.getAttribute('data-i18n')];
      if (v) el.innerHTML = lang === 'en' ? v[1] : v[0];
    });
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = lang === 'en' ? '中文' : 'EN';
      btn.addEventListener('click', function () {
        try { localStorage.setItem('szres_lang', lang === 'en' ? 'zh' : 'en'); } catch (e) {}
        location.reload();
      });
    }
  }

  window.SZRES_I18N = { lang: lang, TAGS: TAGS, BTN: BTN };
  apply();
})();
