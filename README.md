# SZRES · Shenzhen Resistance 深圳蓝军 — 社群主页

深圳 Resistance（深圳蓝军）的官方介绍主页，成立于 2013 年，持续运营至今。
纯静态站点，无需任何构建工具。

## 页面结构

```
index.html            首页（ingress.com 式大字标语 + 全屏情报风深圳地图背景）
memories.html         回忆档案（2013–2026 按年份归档）
posts/                文章页目录（_template.html 为模板，写新文章复制它）
assets/
  style.css           全站样式（Ingress 风格黑底蓝光主题）
  main.js             导航 / 滚动动效 / 档案渲染
  memories-data.js    ★ 回忆档案数据 —— 日常维护基本只改这个文件
  logo-mark.png       透明底白色大鹏鸟徽章（导航 / 页脚 / 关于我们）
  logo.png            社群旗帜原图（1400px 宽，蓝底完整版）
  favicon.png         方形徽标（浏览器标签页用，蓝底）
  shenzhen-map.svg    Ingress 情报风格深圳地图（真实市界/区界矢量数据生成）
```

## 本地预览

直接双击 `index.html` 即可在浏览器打开（无需服务器）。

## 如何新增一条回忆（填坑）

1. 打开 `assets/memories-data.js`，往 `window.SZRES_MEMORIES` 数组里加一个对象：

   ```js
   {
     year: 2015,
     date: "2015-06",
     title: "某某异常战",
     tags: ["异常战"],
     excerpt: "一两句话的简介。",
     link: ""            // 可选，如 "posts/2015-anomaly.html"
   }
   ```

2. 保存刷新即可，首页精选和档案页都会自动更新；
   没有条目的年份会显示「档案整理中」占位卡片，全部填满后即消失。

3. 想写长文：复制 `posts/_template.html` 改名（如 `posts/2015-anomaly.html`），
   填好标题与正文后，把上面 `link` 字段指向它。

## 部署

仓库：https://github.com/szres/szres-website
GitHub Pages 从 `main` 分支根目录发布，推送后 1-2 分钟内自动更新。

```bash
git add -A && git commit -m "update" && git push
```

## 地图数据说明

`shenzhen-map.svg` 由深圳市边界 GeoJSON（阿里 DataV `440300_full.json` / `440300.json`）
经 `assets/convert-geo.ps1` 投影转换生成，装饰层（portal / link / field / 标签）在
`assets/svg-deco.txt` 中维护，改动后重新用以下命令拼装：

```bash
cd assets
{ cat svg-head.txt
  echo -n '<path class="land" d="'; awk -F'|' '{printf "%s", $2}' districts-path.txt; echo '"/>'
  echo -n '<path class="dline" d="'; awk -F'|' '{printf "%s", $2}' districts-path.txt; echo '"/>'
  echo -n '<path class="coastGlow" filter="url(#soft)" d="'; cat city-path.txt; echo '"/>'
  echo -n '<path class="coast" d="'; cat city-path.txt; echo '"/>'
  cat svg-deco.txt
} > shenzhen-map.svg
```

---

Ingress™ 为 Niantic, Inc. 的注册商标，本站为玩家自发建立的非官方社群主页。
