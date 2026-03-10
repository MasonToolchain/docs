# Mason 基础模板使用指南

本文档详细介绍了 Mason 项目基础模板的使用方法、配置项以及代码约定。

## 1. 模板介绍

这是一个基于 **Vue 3 + TypeScript + Vite 7** 的现代化前端开发模板，集成了主流的开发工具和最佳实践，旨在提供开箱即用的开发体验。

**核心技术栈：**
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 7
- **语言**: TypeScript
- **状态管理**: Pinia + pinia-plugin-persistedstate (持久化)
- **路由**: Vue Router 5 (配合 unplugin-vue-router 实现文件路由)
- **HTTP**: Axios (封装了拦截器、重试、取消等功能)
- **样式**: UnoCSS (兼容 Tailwind CSS 4), SCSS
- **图标**: Iconify + vite-plugin-svg-icons
- **国际化**: Vue I18n (支持按需加载)
- **代码规范**: ESLint, Prettier, Oxlint, Commitlint

---

## 2. 如何使用

### 启动项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev:dev

# 构建生产环境
pnpm build:prod

# 代码格式化与检查
pnpm lint
```

### 开发流程示例

1.  **新建页面**: 在 `src/pages` 下创建 `.vue` 文件，路由会自动生成。
2.  **定义 API**: 在 `src/services` 下继承 `BaseService` 创建新的 Service 类。
3.  **定义状态**: 在 `src/stores` 下创建 Pinia Store。
4.  **组件开发**: 使用 UnoCSS 编写样式，使用自动导入的组件和 API。

---

## 3. 配置说明

### 3.1 Vite 插件配置 (`vite.config.ts`)

模板预置了丰富的 Vite 插件，主要包括：

*   **AutoImport**: 自动导入 Vue, Vue Router, Pinia 等 API，无需手动 import。
*   **Components**: 自动导入 `src/components` 下的组件。
*   **VueRouter**: 基于文件系统的路由生成 (`unplugin-vue-router`)。
*   **Layouts**: 布局系统 (`vite-plugin-vue-layouts`)。
*   **UnoCSS**: 原子化 CSS 引擎。
*   **SvgIcons**: 支持 SVG Sprite，图标存放于 `src/assets/icons`。
*   **Mock**: 支持 Mock 数据 (`vite-plugin-mock`)。
*   **Compression/ImageOptimizer**: 构建产物压缩与图片优化。
*   **CodeInspectorPlugin**: 在页面上点击元素自动打开 IDE 并定位到代码 (支持 VSCode, Trae, WebStorm 等)。

### 3.2 样式配置 (`uno.config.ts`)

*   **预设**: 使用 `presetWind4` (Tailwind 4 预设) 和 `presetIcons` (图标预设)。
*   **主题色**: 定义了 `primary`, `success`, `warning`, `danger`, `info` 等语义化颜色，映射到 CSS 变量。
*   **指令**: 启用 `@apply` 指令支持。
*   **快捷方式**: 预定义了 `flex-center` 等常用布局类。

### 3.3 HTTP 配置 (`src/http/index.ts`)

*   导出 `api` (HttpClient 实例) 和 `instance` (Axios 实例)。
*   在此处配置全局请求/响应拦截器（如 Token 注入）。

---

## 4. 代码约定

### 4.1 路由约定 (Routing)

*   **文件路由**: 页面文件放置在 `src/pages` 目录下，文件名即路由路径。
*   **路由元信息**: 使用 `definePage` 宏在 `.vue` 文件中定义 `meta` 信息。
    ```typescript
    definePage({
      meta: {
        title: '示例页面',
        layout: 'default',
        locales: ['demo'], // 指定需要加载的语言包模块
      },
    })
    ```

### 4.2 网络请求 (HTTP & Service)

*   **Service 层**: 推荐使用类继承 `BaseService` 的方式封装 API。
    ```typescript
    // src/services/demo-service.ts
    import { BaseService } from './base-service'

    export class DemoService extends BaseService<Demo, DemoListReq> {
        protected getPrefix(): string {
            return 'demo' // API 前缀
        }
        // 可扩展自定义方法
    }
    export const demoService = new DemoService()
    ```
*   **Hooks**: 使用 `useRequest` 处理请求状态（loading, error）。
    ```typescript
    const { data, loading, run } = useRequest(() => demoService.page(params))
    ```

### 4.3 状态管理 (Store)

*   使用 Pinia 的 **Composition API** 风格 (`defineStore` 第二个参数为函数)。
*   开启持久化：`{ persist: true }`。

### 4.4 样式与图标 (Style & Icon)

*   **原子类**: 优先使用 UnoCSS 原子类 (e.g., `text-primary`, `mt-4`, `flex-center`)。
*   **SCSS**: 复杂样式使用 SCSS，可结合 `@apply` 使用原子类。
*   **图标**:
    *   **Iconify**: 使用 `i-` 前缀类名 (e.g., `i-mdi-home`) 或 `<icon type="uno" icon="i-mdi:home" />`。
    *   **SVG**: 将 `.svg` 文件放入 `src/assets/icons`，使用 `<icon type="svg" icon="文件名" />`。
    *   **Icon Component**: 统一使用全局 `Icon` 组件。

### 4.5 国际化 (I18n)

*   语言包位于 `src/i18n/locales`。
*   模块化管理：在 `modules` 目录下按功能模块拆分语言文件。
*   **按需加载**: 在页面中使用 `definePage` 的 `meta.locales` 声明依赖的语言模块。

### 4.6 环境配置 (Env)

*   使用 `src/utils/env.ts` 中的 `Env` 工具类获取环境变量，提供类型安全和类型转换。
    ```typescript
    Env.get('VITE_APP_NAME')
    Env.getNumber('VITE_PORT')
    Env.isDev // boolean
    ```
