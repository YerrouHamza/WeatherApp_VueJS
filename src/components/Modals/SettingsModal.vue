<script setup lang="ts">
import ToggleButtons from '@/components/Ui-Elements/SwitchButton.vue';

const props = defineProps<{
  temperature: string;
  measurements: string;
  onSetTemperature: (option: string) => void;
  onSetMeasurements: (option: string) => void;
}>();
</script>

<template>
  <teleport to="#setting">
    <div class="setting-modal">
      <div class="setting-modal_controls">
        <p class="title">Temperature</p>
        <ToggleButtons
          :value="props.temperature"
          :options="[
            { name: 'C°', id: 'C' },
            { name: 'F°', id: 'F' },
          ]"
          :setTheOption="props.onSetTemperature"
        />
      </div>
      <div class="setting-modal_controls">
        <p class="title">Measurements</p>
        <ToggleButtons
          :value="measurements"
          :options="[
            { name: 'Metric', id: 'metric' },
            { name: 'Imperial', id: 'imperial' },
          ]"
          :setTheOption="props.onSetMeasurements"
        />
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.setting-modal {
  width: 300px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  background-color: var(--light);
  border-radius: var(--raduis-sm);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--gray-lighter);
  padding: 1.5rem 0.75rem;
  transform: translateY(65px);
}

.setting-modal_controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.setting-modal_controls:is(:last-child) {
  margin-bottom: 0;
}
.setting-modal_controls .title {
  font-weight: var(--font-medium);
}
</style>
