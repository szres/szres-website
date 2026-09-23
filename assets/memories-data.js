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
    date: "2015",
    title: "讨论平台迁移：QQ → Telegram",
    tags: ["平台", "里程碑"],
    excerpt: "社群讨论平台由 QQ 迁移至 Telegram，@szres 群从此成为深蓝的行动情报与日常集结阵地。",
    link: ""
  },
  {
    year: 2016,
    date: "2016-12-17",
    title: "MDSZ · Mission Day Shenzhen",
    tags: ["Mission Day", "活动", "里程碑"],
    excerpt: "MDSZ 是 Niantic 与中国最大的游戏媒体 17173 合作举办的 Mission Day 系列活动之一，也是深圳首次举办 Mission Day。深蓝社群为活动提供了重要的支持协助。",
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
    year: 2026,
    date: "2026-09",
    title: "SZRES 社群主页上线",
    tags: ["网站", "里程碑"],
    excerpt: "深蓝社群介绍主页正式上线，2013—2026 的回忆档案同步开始整理，欢迎各位 Agent 投稿。",
    link: ""
  }
];
