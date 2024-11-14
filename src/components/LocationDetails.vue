<script setup lang="ts">
import { ref, onMounted } from 'vue';
import moment from 'moment';
import tippy from 'tippy.js';
import World from '@/assets/world.svg';

const props = defineProps({
  location: {
    type: Object,
    required: true,
  },
  openChangeCityModal: {
    type: Function,
    required: true,
  },
});

const currentTime = ref(moment());

onMounted(async () => {
  setInterval(() => {
    currentTime.value = moment();
  }, 10000);
  tippy('.city-tooltip', {
    content: 'Click to change city',
    theme: 'custom',
  });
});
</script>

<template>
  <div>
    <button
      class="location-details_title flex-center city-tooltip"
      @click="openChangeCityModal(true)"
    >
      <World class="location-details_icon" /> {{ props.location?.name }}
    </button>
    <p class="location-details_subtitle">
      {{ moment(currentTime).format('dddd, MMMM D, YYYY') }}
    </p>
    <p class="location-details_subtitle">
      {{ moment(currentTime).format('HH:mm A') }}
    </p>
  </div>
</template>

<style scoped>
.location-details_title {
  font-size: var(--font-title-xl);
  font-weight: var(--font-bold);
  line-height: 1;
  gap: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
.location-details_icon {
  height: 2.5rem;
  color: var(--text-color);
}
.location-details_subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-color);
}

@media only screen and (max-width: 600px) {
  .location-details_title {
    font-size: var(--font-title);
  }
  .location-details_subtitle {
    font-size: var(--font-size-sm);
  }
}
</style>
