<script lang="ts" setup>
    import { computed, PropType } from 'vue';
    
    // Import your SVG icons
    import sunnyIcon from '@/assets/sunny.svg';
    import cloudyIcon from '@/assets/cloudy.svg';
    import windIcon from '@/assets/wind.svg';
    import precipitationIcon from '@/assets/precipitation.svg';
  
    const props = defineProps({
      condition: {
        type: Object as PropType<{ code: number; text: string }>,
        required: true,
      },
      class: {
        type: String as PropType<string>,
        default: '',
      },
    });

    const iconComponent = computed(() => {
        if ([1000].includes(props.condition?.code)) {
            return sunnyIcon; // Clear/Sunny
        } else if ([1003, 1006, 1009].includes(props.condition?.code)) {
            return cloudyIcon; // Partly Cloudy/Cloudy
        } else if ([1063, 1183, 1186, 1189, 1192, 1195].includes(props.condition?.code)) {
            return precipitationIcon; // Rainy conditions
        } else if ([1117, 1204, 1210, 1216].includes(props.condition?.code)) {
            return windIcon; // Wind or similar
        } else {
            return sunnyIcon; // Default icon (fallback)
        }
    });
</script>

<template>
    <component :class="class" :is="iconComponent" v-if="iconComponent" :aria-label="condition?.text" />
</template>

<style scoped>
</style>  