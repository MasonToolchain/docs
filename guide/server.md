# Mason 服务端开发指南

本文档旨在帮助开发者理解 Mason 服务端 (`server`) 的架构设计，并指导如何进行功能开发与改造。

## 1. 项目概述

Mason 服务端是一个基于 **Node.js** 和 **Koa 2** 的 RESTful API 服务，使用 **TypeScript** 编写。它采用了经典的分层架构，集成了 MySQL 数据库（通过 Sequelize ORM）、Redis 缓存以及 JWT 鉴权体系。

### 技术栈
- **核心框架**: Koa 2
- **语言**: TypeScript
- **数据库**: MySQL (驱动: mysql2)
- **ORM**: Sequelize
- **缓存**: Redis (ioredis)
- **鉴权**: JWT (jsonwebtoken, RS256 非对称加密)
- **参数校验**: Joi
- **日志**: Log4js

---

## 2. 架构设计

项目采用 **Router-Controller-Service-Model** 分层架构：

*   **Router (路由层)**: 定义 API 路径，解析 HTTP 方法，挂载中间件（如鉴权、参数校验），将请求分发给 Controller。
*   **Controller (控制层)**: 处理 HTTP 请求与响应，解析参数（Query/Body），进行初步校验，调用 Service 层处理业务，统一返回格式。
*   **Service (业务层)**: 封装核心业务逻辑，处理事务，调用 Model 层进行数据持久化。
*   **Model (数据层)**: 定义数据库模型（Schema），负责与数据库交互。

### 目录结构

```text
server/
├── src/
│   ├── app/                # App 实例组装 (中间件挂载、错误处理)
│   ├── config/             # 全局配置 (数据库、密钥、端口等)
│   ├── constant/           # 常量定义 (错误类型、Cookie名等)
│   ├── middleware/         # 自定义中间件 (Auth, Logger, Upload 等)
│   ├── models/             # Sequelize 模型定义
│   ├── modules/            # 业务模块 (按功能拆分)
│   │   └── user/           # 示例：用户模块
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       ├── user.router.ts
│   │       └── user.dto.ts # 数据传输对象/校验规则
│   ├── router/             # 路由入口 (聚合所有模块路由)
│   ├── utils/              # 工具函数
│   └── index.ts            # 服务启动入口
├── scripts/                # 脚本 (生成密钥等)
└── .env                    # 环境变量
```

---

## 3. 核心机制

### 3.1 鉴权机制 (JWT)
采用 **RS256** 非对称加密算法签发和验证 Token。
*   **签发**: 登录成功后，使用私钥签发 Token。
*   **验证**: `verifyAuth` 中间件使用公钥验证 Token 有效性。
*   **获取 Token**: 优先从 `Authorization` Header (Bearer Token) 获取，其次从 Cookie 获取。

### 3.2 数据库操作 (Sequelize)
*   **模型定义**: 在 `src/models` 下定义，使用 `sequelize.define`。
*   **事务管理**: 在 Service 层使用 `sequelize.transaction` 手动管理事务，确保数据一致性。
    ```typescript
    await sequelizeBase.transaction(async (t) => {
        await modelA.create(..., { transaction: t });
        await modelB.update(..., { transaction: t });
    });
    ```
*   **软删除**: 模型配置了 `paranoid: true`，删除时仅更新 `deletedAt` 字段。

### 3.3 错误处理
使用 `ctx.app.emit('error', error, ctx)` 抛出错误，由 `src/app/error-handler.ts` 全局捕获并格式化响应。

---

## 4. 如何开发 (How-to)

### 4.1 启动项目

1.  **安装依赖**:
    ```bash
    pnpm install
    ```
2.  **配置环境**:
    复制 `.env.example` 为 `.env`，并配置数据库连接信息。
3.  **生成密钥**:
    ```bash
    npm run postinstall # 生成公私钥对
    ```
4.  **启动服务**:
    ```bash
    npm run dev
    ```

### 4.2 新增一个业务模块 (以 "商品 Product" 为例)

**Step 1: 定义数据模型**
在 `src/models/product.model.ts` 中定义表结构：
```typescript
import { DataTypes } from 'sequelize'
import sequelize from '../config/mysql'

const productModel = sequelize.define('sys_product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2) }
})
export default productModel
```
并在 `src/models/index.ts` 中导出。

**Step 2: 编写 Service**
在 `src/modules/product/product.service.ts` 中实现业务逻辑：
```typescript
import { productModel } from '../../models'

class ProductService {
  async create(data: any) {
    return await productModel.create(data)
  }
}
export default new ProductService()
```

**Step 3: 编写 Controller**
在 `src/modules/product/product.controller.ts` 中处理请求：
```typescript
import { Context } from 'koa'
import productService from './product.service'

class ProductController {
  async create(ctx: Context) {
    const result = await productService.create(ctx.request.body)
    ctx.body = { code: 200, data: result, msg: '创建成功' }
  }
}
export default new ProductController()
```

**Step 4: 定义路由**
在 `src/modules/product/product.router.ts` 中配置路径：
```typescript
import Router from 'koa-router'
import productController from './product.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

const router = new Router({ prefix: '/product' })
router.post('/create', verifyAuth, productController.create)
export default router
```

**Step 5: 注册路由**
在 `src/router/index.ts` 中引入并注册：
```typescript
import productRouter from '../modules/product/product.router'
router.use(productRouter.routes())
```

---

## 5. 改造与扩展

### 如何修改数据库字段？
1.  修改 `src/models` 下对应的模型定义。
2.  由于项目启用了 `sync` (在 `src/config/sync.ts` 中)，开发环境下重启服务可能会尝试同步表结构（注意：`alter: true` 可能会导致数据丢失风险，生产环境建议使用迁移脚本）。

### 如何自定义中间件？
在 `src/middleware` 下创建文件，导出一个符合 `(ctx, next) => Promise<void>` 签名的函数，并在 Router 或 App 中使用。

### 如何添加定时任务？
建议引入 `node-schedule` 或 `agenda` 库，在 `src/index.ts` 启动时初始化任务。

### 常见问题
*   **端口占用**: 修改 `.env` 中的 `APP_PORT`。
*   **跨域问题**: `src/app/cors.ts` 中配置了跨域规则，可根据需要调整白名单。
