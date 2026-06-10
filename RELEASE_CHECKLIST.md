# 发布与测试检查清单

## A. GitHub 更新前

- [ ] 本地页面改动已完成
- [ ] `config.js` 已确认是当前需要的配置
- [ ] `supabase-schema.sql` 是最新版本
- [ ] 需要上传的文件已整理进 `github-upload-package`

## B. GitHub 更新时

把以下文件上传到仓库根目录：

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

## C. GitHub 更新后

- [ ] 打开线上链接确认页面正常显示
- [ ] 带 `?client=test_mom_001` 的链接能正常打开
- [ ] 自己先点几下页面进行测试

示例：

```text
https://zhechangou-hue.github.io/nutrition-guide/?client=test_mom_001
```

## D. Supabase 检查

- [ ] `clients` 表存在
- [ ] `sessions` 表存在
- [ ] `events` 表存在
- [ ] `checkins` 表存在
- [ ] `clients` 表里有测试者 ID
- [ ] 前端测试后，`events` 和 `checkins` 有新数据

## E. 发给测试者前

- [ ] 已为该测试者准备专属 `client` 参数链接
- [ ] 已把该测试者登记进管理表
- [ ] 已准备好发送话术

## F. 测试后回看

- [ ] 她最近有没有打开
- [ ] 她最常看哪个入口
- [ ] 她最常出现哪种状态
- [ ] 她有没有开始稳定下来
- [ ] 需要人工跟进吗
