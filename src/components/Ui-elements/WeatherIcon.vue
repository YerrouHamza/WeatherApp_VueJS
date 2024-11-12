<script lang="ts" setup>
    import { computed, PropType } from 'vue';
    import moment from 'moment';
    
    // Import your SVG icons
    import sunnyIcon from '@/assets/sunny.svg';
    import cloudyIcon from '@/assets/cloudy.svg';
    import windIcon from '@/assets/wind.svg';
    import precipitationIcon from '@/assets/precipitation.svg';
    import moonIcon from '@/assets/moon.svg';
  
    const props = defineProps({
      condition: {
        type: Object as PropType<{ code: number; text: string }>,
        required: true,
      },
      class: {
        type: String as PropType<string>,
        default: '',
      },
      time: {
        type: String as PropType<string>,
        default: '',
      },
    });

    const iconComponent = computed(() => {
        const hour = moment(props?.time).format('HH') as unknown as number;

        if ([1003, 1006, 1009].includes(props.condition?.code)) {
            return cloudyIcon; // Partly Cloudy/Cloudy
        } else if ([1063, 1183, 1186, 1189, 1192, 1195].includes(props.condition?.code)) {
            return precipitationIcon; // Rainy conditions
        } else if ([1117, 1204, 1210, 1216].includes(props.condition?.code)) {
            return windIcon; // Wind or similar
        } else if ([1000].includes(props.condition?.code) || props.condition?.code) {
            if (props.time && (hour >= 18 || hour <= 6)) {
                return moonIcon; // Night
            }
            return sunnyIcon; // Default icon (fallback)
        }
    });
</script>

<template>
    <component :class="props.class" :is="iconComponent" v-if="iconComponent" :aria-label="condition?.text" />
</template>

<style scoped>
</style>  