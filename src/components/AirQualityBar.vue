<script setup lang="ts">
import { computed, onMounted } from 'vue';
import InfoIcon from '@/assets/info.svg';
import tippy from 'tippy.js';

const props = defineProps({
  airQuality: {
    type: Number,
    required: true,
    default: 0,
  },
});

const barColor = computed(() => {
  if (props.airQuality <= 50) {
    return 'success';
  } else if (props.airQuality <= 100) {
    return 'warning';
  }

  return 'danger';
});

const aqiBarWidth = computed(() => {
  return Math.min(Math.max(props.airQuality, 0), 300) / 3;
});

onMounted(() => {
  tippy('.aqi-tooltip', {
    content: '300+ AQI is considered hazardous',
    theme: 'custom',
  });
});
</script>

<template>
  <div class="air-quality">
    <div class="air-quality_text flex-between">
      <p>AQI</p>
      <div class="flex-center">
        300 <InfoIcon class="air-quality_icon aqi-tooltip" />
      </div>
    </div>
    <div class="air-quality_bar">
      <span
        :style="{
          width: `${aqiBarWidth}%`,
          backgroundColor: `var(--${barColor})`,
        }"
      >
      </span>
    </div>
  </div>
</template>

<style scoped>
.air-quality {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.air-quality_text {
  font-size: var(--font-size-md);
  color: var(--text-color-dark);
}

.air-quality_icon {
  width: 1rem;
  color: var(--gray-lighter);
  outline: none;
  transition: color 0.3s ease;
}
.air-quality_icon:hover {
  color: var(--primary);
  cursor: help;
}

.air-quality_bar {
  width: 100%;
  height: 0.5rem;
  background-color: var(--gray-lighter);
  border-radius: var(--raduis-sm);
}
.air-quality_bar span {
  display: block;
  height: 100%;
  border-radius: var(--raduis-sm);
}
</style>
