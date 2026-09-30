# 个人简历页面

`https://guyue.me/cv/` 对应中文版 `index.html`，`https://guyue.me/cv/en/` 对应英文版 `en/index.html`。页面使用 HTML、CSS 和少量原生 JavaScript，没有构建步骤或外部代码依赖。favicon 沿用个人主页使用的 `https://s.guyue.me/img/icon.png`。

更新简历内容时同步编辑两个 `index.html`。视觉样式在 `style.css`，目录状态逻辑在 `outline.js`，主题切换逻辑在 `theme.js`。主题默认跟随系统；手动选择明暗后会在两个语言页面之间保留，选择“自动 / System”可恢复跟随系统。

可在仓库根目录运行 `python3 -m http.server 8000`，然后访问 `http://localhost:8000/cv/` 或 `http://localhost:8000/cv/en/` 预览。打印样式已包含在 `style.css` 中，可使用浏览器的打印功能生成 PDF。
