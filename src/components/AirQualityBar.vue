<script setup lang="ts">
import { computed, onMounted } from 'vue';
import InfoIcon from '@/assets/info.svg';
import tippy from 'tippy.js';

const props = defineProps({
  airQuality: {
    type: Number,
    required: true,
  },
});

const barBgColor = computed(() => {
  if (props.airQuality <= 50) {
    return 'bg-green-500'; // Good air quality
  } else if (props.airQuality <= 100) {
    return 'bg-yellow-500'; // Moderate air quality
  } else {
    return 'bg-red-500'; // Poor air quality
  }
});

const aqiBarWidth = computed(() => {
  // Normalize air quality to a percentage scale (0-100)
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
  <div class="space-y-1">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-x-2">AQI</div>
      <div class="text-gray-600 flex items-center gap-x-1">
        300 <InfoIcon class="size-4 text-gray-300 aqi-tooltip" />
      </div>
    </div>
    <div class="bg-gray-300 w-full h-2 rounded-lg">
      <span
        :class="`${barBgColor} block h-full rounded-lg`"
        :style="{ width: `${aqiBarWidth}%` }"
      >
      </span>
    </div>
  </div>
</template>

<style scoped></style>
