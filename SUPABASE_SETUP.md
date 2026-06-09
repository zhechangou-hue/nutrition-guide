# 轻后台接入步骤

这套前端已经预留了事件追踪能力。你只需要接一个 Supabase 项目，就可以开始看到测试者的使用轨迹。

## 1. 创建 Supabase 项目

1. 登录 Supabase
2. 新建一个 project
3. 进入 `SQL Editor`
4. 把 [supabase-schema.sql](/Users/ouzhechang/Documents/Codex/2026-06-07/files-mentioned-by-the-user-prd/supabase-schema.sql) 全部运行一次

## 2. 拿到项目密钥

在 `Project Settings -> API` 中找到：

- `Project URL`
- `anon public key`

## 3. 修改前端配置

打开 [config.js](/Users/ouzhechang/Documents/Codex/2026-06-07/files-mentioned-by-the-user-prd/config.js)，改成：

```js
window.APP_CONFIG = {
  trackingEnabled: true,
  supabaseUrl: "你的 Supabase URL",
  supabaseAnonKey: "你的 anon key"
};
```

## 4. 给测试者生成专属链接

不要直接发根链接，发带 `client` 参数的链接：

```text
https://你的域名/?client=test_mom_001
```

如果你有多个测试者，就在 `clients` 表里多插几条：

```sql
insert into clients (id, display_name, coach_name, stage_label)
values ('test_mom_002', '测试妈妈 002', '营养师', '哺乳期 · 新手妈妈');
```

然后给她对应的链接：

```text
https://你的域名/?client=test_mom_002
```

## 5. 现在会回传哪些数据

目前前端已经会回传这些事件：

- `session_start`
- `session_end`
- `tab_open`
- `profile_update`
- `food_filter`
- `lookup_symptom`
- `lookup_nutrient`
- `state_checkin`

## 6. 你在后台先看什么

第一阶段不用开发专门管理后台，直接在 Supabase 表里看就够了：

- `events`：看测试者最常看什么、最常卡在哪个页面
- `checkins`：看最近身体/情绪/认知变化和卡点

## 7. 下一步怎么升级

等你验证这套信号有价值后，再做营养师看板：

- 每位测试者最近 7 天活跃情况
- 最近最常查看的场景
- 最近状态变化趋势
- 当前主要卡点
- 是否需要主动跟进
