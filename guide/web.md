# Mason 前端开发指南

本文档旨在帮助开发者快速上手 Mason 前端项目 (`client`)，涵盖了路由配置、权限管理、布局系统以及核心开发约定。

## 1. 项目概述

Mason 前端是一个基于 **Vue 3 + Vite 6 + TypeScript** 的现代化管理后台模板。

### 技术栈
- **核心框架**: Vue 3 (Composition API)
- **构建工具**: Vite 6
- **语言**: TypeScript
- **UI 组件库**: Element Plus
- **样式库**: Tailwind CSS 4 (原子化 CSS)
- **状态管理**: Pinia + pinia-plugin-persistedstate (持久化)
- **路由**: Vue Router 4
- **国际化**: Vue I18n
- **图标**: Lucide Vue Next, Iconfont

---

## 2. 路由与菜单 (Router & Menu)

项目采用 **后端驱动的动态路由** 机制。菜单数据由后端返回，前端根据数据动态生成路由表。

### 2.1 路由配置流程
1.  **静态路由**: 在 `src/router/index.ts` 中定义基础路由（如 Login, 404, 500）。
2.  **动态路由**:
    *   用户登录后，调用 `authStore.getAuthMenuList()` 获取菜单数据。
    *   `src/router/dynamicRouter.ts` 中的 `initDynamicRouter` 方法会将菜单数据转换为 Vue Router 路由对象。
    *   **组件映射**: 后端返回的 `component` 字段（字符串路径）会自动映射到 `src/views` 下的 `.vue` 文件。

### 2.2 菜单元信息 (Meta)
后端返回的菜单数据中，`meta` 字段控制了页面的表现：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `title` | `string` | 菜单标题 |
| `icon` | `string` | 菜单图标 (支持 Lucide 图标名) |
| `isKeepAlive` | `boolean` | 是否开启页面缓存 (KeepAlive) |
| `isAffix` | `boolean` | 是否固定在标签页 (TagsView) |
| `isLink` | `boolean` | 是否为外链 |
| `isEnable` | `boolean` | 是否启用 |
| `isHide` | `boolean` | 是否隐藏菜单 |

### 2.3 新增页面
1.  在 `src/views` 下创建 `.vue` 文件。
2.  在 **系统管理 -> 菜单管理** 中配置对应的菜单项，填写组件路径（例如 `/system/user/index`）。

---

## 3. 权限管理 (Permission)

### 3.1 菜单权限
通过动态路由实现。未授权的菜单不会生成路由，用户无法访问且侧边栏不显示。

### 3.2 按钮权限
目前项目主要依赖 **菜单级权限**。
*   如果需要实现按钮级权限，建议在 `src/directives` 下扩展 `v-auth` 指令，配合 `authStore.authButtonList` 使用。

---

## 4. 布局系统 (Layouts)

项目内置了 4 种主流布局模式，支持在运行时动态切换。

### 4.1 布局模式
*   **LeftLayout (默认)**: 经典左侧菜单布局。
*   **TopLayout**: 顶部菜单布局。
*   **TopLeftLayout**: 顶部（一级菜单）+ 左侧（子菜单）混合布局。
*   **DualMenuLayout**: 双栏式菜单布局。

### 4.2 配置与切换
*   布局入口文件：`src/Layout/index.vue`。
*   布局状态存储在 `SettingStore` 中。
*   用户可通过右上角的 **主题设置** (ThemeDrawer) 抽屉实时切换布局模式、主题色、灰色模式/色弱模式等。

### 4.3 侧边栏
侧边栏支持 **拖拽调整宽度**，由 `src/hooks/useResizable.ts` 实现。

---

## 5. 开发约定

### 5.1 样式开发
推荐优先使用 **Tailwind CSS 4** 的原子类，减少手写 CSS。
```html
<!-- 推荐 -->
<div class="flex items-center justify-between mb-4 p-4 bg-white">...</div>

<!-- 仅在复杂场景使用 SCSS -->
<style scoped lang="scss">
.custom-card {
  @apply flex items-center; // 也可以在 SCSS 中使用 @apply
}
</style>
```

### 5.2 网络请求
使用 `src/service/index.ts` 导出的 Axios 实例进行请求。
*   支持 Request/Response 拦截器。
*   支持取消重复请求。
*   支持全局 Loading 配置。

### 5.3 图标使用
项目统一封装了图标组件，支持多种来源：
*   **Lucide 图标**: `<AllLucideIcon name="User" />` (推荐)
*   **Element Plus 图标**: 直接使用 Element 图标组件。
*   **SVG 图标**: 存放在 `src/assets/svg`，通过 `vite-plugin-svg-icons` 使用。

### 5.4 常用 Hooks
*   `useTable`: 封装了表格的查询、分页、刷新逻辑。
*   `useTheme`: 处理主题切换（暗黑模式、主题色）。
*   `useResizable`: 处理元素的拖拽缩放。

---

## 6. 环境配置
*   **开发环境**: `.env.development`
*   **生产环境**: `.env.production`
*   **配置项**:
    *   `VITE_API_URL`: 后端接口地址。
    *   `VITE_PORT`: 本地服务端口。
    *   `VITE_DROP_CONSOLE`: 打包是否移除 console。

## 7. 常见问题
*   **Mock 数据**: 项目启用了 `vite-plugin-mock`，开发阶段请求会优先被 Mock 拦截。如需对接真实接口，请确保 `vite.config.ts` 中的代理配置正确，或在 `main.ts` 中关闭 Mock。
