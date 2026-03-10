# Mason CLI

`@noahlife/mason-cli` 是 Mason 框架配套的命令行工具，旨在帮助开发者快速初始化项目、生成代码文件以及管理项目依赖，从而显著提升开发效率。

## 安装

推荐使用 `pnpm` 或 `npm` 进行全局安装：

::: code-group

```bash [npm]
npm install -g @noahlife/mason-cli
```

```bash [pnpm]
pnpm add -g @noahlife/mason-cli
```

```bash [yarn]
yarn global add @noahlife/mason-cli
```

:::

安装完成后，你可以在终端使用 `mason-cli` 命令。

## 核心功能

### 1. 创建项目 (Create)

快速初始化一个基于 Mason 的新项目。CLI 会自动从 GitHub 拉取最新的模板代码。

**基本用法：**

```bash
# 交互式创建
mason-cli create

# 指定项目名称
mason-cli create my-project

# 指定模板
mason-cli create my-project -t vue3-ts

# 强制覆盖同名目录
mason-cli create my-project -o
```

**参数说明：**

- `-t, --template <template>`：指定模板名称（目前支持 `vue3-ts`）。
- `-o, --overwrite`：如果目标目录已存在，强制删除并重新创建。
- `--list-templates`：列出所有可用的模板。

**内置模板：**

- **vue3-ts**: 基于 Vue 3 + TypeScript + Vite 的标准中后台模板。

### 2. 组件生成 (Gen Component)

在 `src/components` 目录下快速生成 Vue 组件文件。

**基本用法：**

```bash
# 在 src/components 下生成 MyComponent.vue
mason-cli gen MyComponent

# 在 src/components/Base 下生成 Button.vue
mason-cli gen Button -d Base
```

**参数说明：**

- `-d, --dirname <dirname>`：指定 `src/components` 下的子目录名称。
- `-o, --overwrite`：如果文件已存在，强制覆盖。

### 3. 视图生成 (Gen View)

在 `src/views` 目录下生成页面组件，并**自动配置路由**。

**基本用法：**

```bash
# 生成 UserList.vue 并注册路由 /user-list
mason-cli gen-view UserList -r /user-list
```

**参数说明：**

- `-r, --router <path>`：**必填**。指定该页面对应的路由路径（如 `/user/list`）。
- `-d, --dirname <dirname>`：指定 `src/views` 下的子目录名称。
- `-o, --overwrite`：如果文件已存在，强制覆盖。

**功能亮点：**

该命令不仅会创建 `.vue` 文件，还会自动修改 `src/router/index.js`，将新页面注册到路由配置中，省去了手动修改路由文件的繁琐步骤。

### 4. 创建文件 (Create File)

在项目中快速创建指定类型的文件（如 js, ts, html, css, scss, less）。

**基本用法：**

```bash
mason-cli create-file
```

该命令为交互式命令，会引导你：
1. 选择文件类型。
2. 输入文件夹名称（默认为 `src`，支持相对路径如 `../`）。
3. 输入文件名称。

### 5. 依赖管理 (Install/Uninstall)

封装了包管理器的安装与卸载命令，支持交互式选择。

**安装依赖：**

```bash
mason-cli install
```
CLI 会引导你：
1. 输入插件名称（支持多个，空格分隔）。
2. 选择安装源（npm, cnpm, pnpm, yarn）。
3. 选择安装环境（生产环境 `-S` 或 开发环境 `-D`）。

**卸载依赖：**

```bash
mason-cli uninstall
```
CLI 会引导你输入要卸载的插件名，并默认使用 `pnpm uninstall` 进行卸载。

### 6. 项目统计 (Statistics)

统计项目中的代码行数和字符总数。

**基本用法：**

```bash
mason-cli statistics
```

该命令会遍历当前目录（排除 `node_modules`, `.git` 等忽略目录），计算所有文本文件的字符数，并估算代码行数。

## 开发与调试

如果你需要参与 `mason-cli` 的开发或进行本地调试：

```bash
# 1. 克隆仓库并安装依赖
pnpm install

# 2. 构建项目
pnpm run build

# 3. 链接到全局
npm link

# 4. 验证链接
mason-cli --help
```
