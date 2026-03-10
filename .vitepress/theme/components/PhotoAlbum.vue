<script setup lang="ts">
import { ref } from 'vue'

const images = import.meta.glob('/assets/images/landingpage-day/*.png', { eager: true, as: 'url' })
const imageList = Object.values(images) as string[]

const previewImage = ref<string | null>(null)

const openPreview = (img: string) => {
  previewImage.value = img
  document.body.style.overflow = 'hidden' // 禁止背景滚动
}

const closePreview = () => {
  previewImage.value = null
  document.body.style.overflow = '' // 恢复背景滚动
}

// 生成随机的旋转角度和位置偏移，让照片看起来杂乱
const getRandomStyle = (index: number) => {
  const rotate = Math.random() * 30 - 15 // -15deg to 15deg
  const x = Math.random() * 40 - 20 // -20px to 20px
  const y = Math.random() * 40 - 20 // -20px to 20px
  const zIndex = Math.floor(Math.random() * 10)
  const scale = 0.9 + Math.random() * 0.2 // 0.9 to 1.1

  return {
    transform: `rotate(${rotate}deg) translate(${x}px, ${y}px) scale(${scale})`,
    zIndex,
    '--delay': `${index * 0.1}s`
  }
}
</script>

<template>
  <div class="photo-album-container">
    <div class="photo-frame">
      <div class="photos">
        <div
          v-for="(img, index) in imageList"
          :key="index"
          class="photo-item"
          :style="getRandomStyle(index)"
          @click="openPreview(img)"
        >
          <div class="photo-inner">
            <img :src="img" alt="Project Preview" loading="lazy" />
          </div>
          <div class="photo-tape"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Preview Modal -->
  <Transition name="fade">
    <div v-if="previewImage" class="preview-overlay" @click="closePreview">
      <div class="preview-content" @click.stop>
        <img :src="previewImage" alt="Preview" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Preview Styles */
.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: zoom-out;
  backdrop-filter: blur(5px);
}

.preview-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
  animation: zoom-in 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.preview-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 8px solid #fff;
  border-radius: 4px;
  border-bottom-width: 20px; /* 拍立得效果 */
}

.dark .preview-content img {
  border-color: #292524;
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.photo-album-container {
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
}

.photo-frame {
  position: relative;
  background-color: #f5f5f4; /* Stone 100 */
  border: 16px solid #e7e5e4; /* Stone 200 */
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.1),
    0 10px 30px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 4rem 2rem;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark .photo-frame {
  background-color: #1c1917; /* Stone 900 */
  border-color: #292524; /* Stone 800 */
  box-shadow: 
    inset 0 0 30px rgba(0,0,0,0.5),
    0 10px 30px rgba(0,0,0,0.3);
}

.photos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  perspective: 1000px;
}

.photo-item {
  position: relative;
  width: 280px;
  height: auto;
  padding: 12px 12px 30px 12px;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  animation: float-in 0.8s ease-out backwards;
  animation-delay: var(--delay);
}

.dark .photo-item {
  background-color: #292524; /* Stone 800 */
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
}

.photo-item:hover {
  transform: scale(1.1) rotate(0deg) !important;
  z-index: 100 !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.photo-inner {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.photo-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 胶带效果 */
.photo-tape {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 100px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  border-left: 1px dashed rgba(0,0,0,0.1);
  border-right: 1px dashed rgba(0,0,0,0.1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 10;
}

.dark .photo-tape {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255,255,255,0.1);
}

@keyframes float-in {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
  to {
    opacity: 1;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .photo-frame {
    padding: 2rem 1rem;
    min-height: auto;
  }
  
  .photo-item {
    width: 140px;
    padding: 6px 6px 15px 6px;
  }
  
  .photo-inner {
    height: 100px;
  }
  
  .photo-tape {
    width: 60px;
    height: 20px;
    top: -10px;
  }
}
</style>
