<script lang="ts" setup>
import { computed } from 'vue';
import moment from 'moment';

// Import your SVG icons
import sunnyIcon from '@/assets/sunny.svg';
import cloudyIcon from '@/assets/cloudy.svg';
import windIcon from '@/assets/wind.svg';
import precipitationIcon from '@/assets/precipitation.svg';
import moonIcon from '@/assets/moon.svg';

const props = defineProps({
  condition: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  class: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
});

const componentIcon = computed(() => {
  const hour = moment(props?.time).format('HH') as unknown as number;

  if ([1003, 1006, 1009].includes(props.condition?.code)) {
    return cloudyIcon;
  } else if (
    [1063, 1183, 1186, 1189, 1192, 1195].includes(props.condition?.code)
  ) {
    return precipitationIcon;
  } else if ([1117, 1204, 1210, 1216].includes(props.condition?.code)) {
    return windIcon;
  }

  if (props.time && (hour >= 18 || hour <= 6)) {
    return moonIcon;
  }
  return sunnyIcon;
});
</script>

<template>
  <component
    :class="props.class"
    :is="componentIcon"
    v-if="componentIcon"
    :aria-label="condition?.text"
  />
</template>

<style scoped></style>
