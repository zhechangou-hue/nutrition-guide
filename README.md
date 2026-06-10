# 哺乳期营养地图

这是一个移动端优先的 H5 工具，核心结构已经升级为：

- 我的现在
- 今天怎么吃
- 我最近的变化
- 缺什么查什么
- 食物选择

它现在既能独立给测试者使用，也已经预留了未来接入轻后台追踪的能力。

## 当前文件

- `index.html`：页面入口
- `styles.css`：全局样式
- `data.js`：内容数据
- `app.js`：交互逻辑
- `config.js`：后台追踪开关与配置
- `manifest.json`：PWA 配置
- `icon.svg`：应用图标
- `supabase-schema.sql`：Supabase 数据表
- `SUPABASE_SETUP.md`：后台接入说明
- `CURRENT_TEST_SUCCESS_CRITERIA.md`：当前测试版成功标准
- `RELEASE_CHECKLIST.md`：发布与测试检查清单
- `TESTER_MANAGEMENT_TEMPLATE.csv`：测试者管理模板

## 本地预览

直接打开 `index.html` 即可。

## GitHub Pages 上传

把这些文件一起上传到仓库根目录：

- `index.html`
- `styles.css`
- `app.js`
- `data.js`
- `config.js`
- `manifest.json`
- `icon.svg`
- `README.md`
- `SUPABASE_SETUP.md`
- `supabase-schema.sql`
- `CURRENT_TEST_SUCCESS_CRITERIA.md`
- `RELEASE_CHECKLIST.md`
- `TESTER_MANAGEMENT_TEMPLATE.csv`

## 开启轻后台

按 [SUPABASE_SETUP.md](/Users/ouzhechang/Documents/Codex/2026-06-07/files-mentioned-by-the-user-prd/SUPABASE_SETUP.md) 操作即可。
