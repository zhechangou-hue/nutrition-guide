# 哺乳期营养地图

这是一个纯前端、移动端优先的 H5 单页工具，适合直接部署到 Vercel 或 GitHub Pages。

## 文件结构

- `index.html`：页面入口
- `styles.css`：样式与移动端布局
- `data.js`：营养素、食物、反查数据
- `app.js`：Tab 切换、公式计算、筛选、展开逻辑
- `manifest.json`：PWA 基础配置

## 本地预览

直接双击 `index.html` 就可以打开静态页面。

如果你想走本地服务预览，可以在当前目录运行：

```bash
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 部署到 Vercel

1. 新建一个仓库并上传这些文件。
2. 在 Vercel 中导入该仓库。
3. Framework Preset 选择 `Other`。
4. Build Command 留空。
5. Output Directory 留空或填项目根目录。
6. 部署完成后即可得到可分享链接。

## 部署到 GitHub Pages

1. 把这些文件推送到 GitHub 仓库默认分支。
2. 进入仓库 `Settings -> Pages`。
3. `Build and deployment` 选择 `Deploy from a branch`。
4. Branch 选择默认分支和 `/root`。
5. 保存后等待 GitHub Pages 发布完成。

## 后续可扩展项

- 增加离线缓存，让 PWA 真正支持断网查看
- 增加首页封面或引导页
- 增加 SVG 图标与更完整的品牌视觉
