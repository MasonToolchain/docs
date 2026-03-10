<script setup lang="ts">
import { useRouter, withBase } from 'vitepress'
import PhotoAlbum from './PhotoAlbum.vue'

const router = useRouter()

const features = [
  {
    title: '深度全栈整合',
    desc: '前端采用 Vue 3 + Vite + PostCSS，后端集成 Express + MySQL。提供从 JWT 鉴权、动态路由到细粒度权限控制（菜单/按钮/接口）的完整闭环。'
  },
  {
    title: '极致开发体验',
    desc: '内置 Mason CLI 脚手架，一键生成项目结构与业务模块。TypeScript 全类型覆盖，结合 Pinia 持久化状态管理，编码更丝滑。'
  },
  {
    title: '优雅的 UI 组件体系',
    desc: '基于 Element Plus 深度定制。提供增强型表格、ECharts 可视化、Lottie 动画及 Lucide 图标系统，内置暗黑模式与多主题配置，细节之处见真章。'
  },
  {
    title: '完善的系统管理',
    desc: '内置用户、角色、部门、菜单管理及操作日志系统。支持验证码、文件上传、数据导出等常见业务场景。'
  }
]

const goGuide = () => {
  router.go(withBase('/guide/basic-template'))
}

const goGithub = () => {
  window.open('https://github.com/ZRMYDYCG/Mason', '_blank')
}
</script>

<template>
  <div class="landing-page">
    <div class="hero-section">
      <div class="hero-content">
        <div class="badge">v1.0.9 Released</div>
        <h1 class="hero-title">
          <span class="gradient-text">Mason</span>
          <br />
          现代化全栈中后台解决方案
        </h1>
        <p class="hero-desc">
          基于 Vue 3 生态的现代化管理系统模板，打通前后端开发流程，
          提供高效、灵活、可扩展的工程化基础。
        </p>
        <div class="hero-actions">
          <button class="btn primary" @click="goGuide">
            快速开始
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          <button class="btn secondary" @click="goGithub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            GitHub
          </button>
        </div>
      </div>
      <div class="hero-visual">
        <PhotoAlbum />
      </div>
    </div>

    <div class="features-section">
      <div class="feature-grid">
        <div v-for="(item, index) in features" :key="index" class="feature-card">
          <div class="card-header">
            <span class="card-index">0{{ index + 1 }}</span>
            <h3 class="feature-title">{{ item.title }}</h3>
          </div>
          <p class="feature-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  width: 100%;
  overflow-x: hidden;
}

/* Badge */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--vp-c-brand);
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  margin-bottom: 2rem;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.2);
  text-transform: uppercase;
}

/* Hero Section */
.hero-section {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 6rem;
  position: relative;
  overflow: hidden;
}

/* Background decoration */
.hero-section::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at 50% 40%, rgba(var(--vp-c-brand-rgb), 0.08) 0%, transparent 60%);
  opacity: 1;
  z-index: -1;
  pointer-events: none;
}

.hero-content {
  max-width: 960px;
  margin-bottom: 5rem;
  z-index: 10;
  text-align: center;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
}

.gradient-text {
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3.5rem;
  line-height: 1.8;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2.5rem;
  border-radius: 99px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  letter-spacing: 0.02em;
}

.btn .icon {
  width: 1.1em;
  height: 1.1em;
}

.btn.primary {
  background-color: var(--vp-c-brand-1);
  color: white;
  border: 1px solid transparent;
}

.btn.primary:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--vp-c-brand-soft);
}

.btn.secondary {
  background-color: transparent;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn.secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.hero-visual {
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
}

/* Features Section */
.features-section {
  padding: 6rem 2rem 8rem;
  background-color: var(--vp-c-bg);
  position: relative;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.feature-card {
  padding: 2.5rem;
  border-radius: 0; /* Sharp or slightly rounded? Let's go minimal rounded */
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.4s ease;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.feature-card:hover {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.card-header {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-index {
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
  margin: 0;
}

.feature-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  font-weight: 400;
  margin: 0;
}

@media (max-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-desc {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
  
  .hero-section {
    padding: 6rem 1.5rem 4rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
