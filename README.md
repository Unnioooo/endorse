# 冷静买

朋友之间的私密购物审批网站。申请人上传商品、价格和购买理由，提交时锁定当时的小组审批成员；申请人不审批自己，所有审批人通过才算通过，任意一人填写理由驳回则立即结束。

## 已实现

- 邮箱作为账号名的注册与密码登录（不验证邮箱）
- 昵称、头像和多小组支持
- 8 位邀请码或邀请链接申请加入，组长确认后生效
- 私密商品图片、申请列表、详情与历史筛选
- 全员通过、一票驳回、驳回理由和审批成员快照
- 手机优先、微信浏览器安全区域和减少动画适配

## 本地运行

要求 Node.js 20 或更高版本。

```bash
npm install
copy .env.local.example .env.local
npm run dev
```

在 `.env.local` 填写 Supabase Project URL 和 Publishable/anon key，然后访问 `http://localhost:3000`。

## 初始化 Supabase

按编号顺序在 Supabase SQL Editor 执行 `supabase/migrations` 中的文件：

1. `001_initial_schema.sql`
2. `002_secure_invites.sql`
3. `003_invite_codes.sql`
4. `004_product_images.sql`
5. `005_avatars.sql`

Authentication → Email 中保持 Email provider 开启并关闭 Confirm email。当前方案把邮箱当登录标识，因此无法可靠通过邮件找回密码。

## 上线

推荐首版部署到 Vercel：

1. 将项目推送到 GitHub 私有仓库。
2. 在 Vercel 导入仓库。
3. 添加 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`。
4. 部署后，在 Supabase Authentication → URL Configuration 将 Site URL 改为正式域名。
5. 在 Redirect URLs 中加入 `https://你的域名/**`。

不要把 `.env.local`、数据库密码或 `service_role` 密钥提交到仓库。

## 验证

```bash
npm run lint
npm run build
```

上线前建议用两个真实账号再跑一遍：注册 → 创建小组 → 邀请申请 → 组长批准 → 上传购物申请 → 全员审批 → 历史筛选。

## 维护说明

- 表和安全规则位于 `supabase/migrations`。
- 页面位于 `src/app`，手绘基础组件位于 `src/components/ui/sketch.tsx`。
- 设计令牌和响应式样式集中在 `src/app/globals.css`。
- 商品图片为私密存储，通过一小时签名链接展示；头像为公开存储。
- 当前邀请 7 天有效。作废并生成新邀请后，旧邀请码和链接立即失效。

## 后续版本候选

- 商品链接自动抓取
- 催办和审批通知
- 超时规则与多种表决规则
- 已购买/已放弃状态和消费统计
- 管理员移除成员、转让组长
- 管理员协助重置密码
