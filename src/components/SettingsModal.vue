<script setup lang="ts">
    import { ref, watch, defineProps } from 'vue';
    import ToggleButtons from '@/components/Ui-elements/ToggleButtons.vue';

    // Icons
    import Setting from '@/assets/setting.svg';

    defineProps({
        temperature: String,
        measurements: String,
        onSetTemperature: Function,
        onSetMeasurements: Function,
    });

    const showModal = ref(false);

    const toggleModal = () => {
        showModal.value = !showModal.value;
    };

    const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.setting-modal') && !target.closest('.btn')) {
            showModal.value = false;
        }
    };

    watch(showModal, (value) => {
        if (value) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
    });
</script>

<template>
  <div class="relative">
    <button
      :class="`btn center-dev p-2 size-12 ${showModal ? 'active-btn' : ''}`"
      @click="toggleModal"
    >
      <Setting class="h-6" />
    </button>
    
    <div v-if="showModal" class="modal setting-modal">
      <div class="mb-6 space-y-2">
        <p class="text-md font-medium">Temperature</p>
        <ToggleButtons
          :value="temperature"
          :options="[{ name: 'C°', id: 'C' }, { name: 'F°', id: 'F' }]"
          :setTheOption="onSetTemperature"
        />
      </div>
      <div class="space-y-2">
        <p class="text-md font-medium">Measurements</p>
        <ToggleButtons
          :value="measurements"
          :options="[{ name: 'Metric', id: 'metric' }, { name: 'Imperial', id: 'imperial' }]"
          :setTheOption="onSetMeasurements"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
    .setting-modal {
        @apply absolute top-0 right-0 w-[300px] translate-y-[30%];
    }
</style>