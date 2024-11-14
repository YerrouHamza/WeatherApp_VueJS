<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  value: {
    type: String as PropType<string>,
    required: true,
    default: '',
  },
  options: {
    type: Array as PropType<{ name: string; id: string }[]>,
    required: true,
    default: () => [],
  },
  setTheOption: {
    type: Function as PropType<(option: string) => void>,
    required: true,
    default: () => {},
  },
});

const toggleOption = (option: string) => {
  props.setTheOption(option);
};
</script>

<template>
  <div class="switch flex-center">
    <button
      :class="['switch-button', props.value === option.id && 'active']"
      v-for="option in props.options"
      :key="option.id"
      @click="toggleOption(option.id)"
    >
      {{ option.name }}
    </button>
  </div>
</template>

<style scoped>
.switch {
  padding: 0.25rem;
  background-color: var(--gray-lighter);
  border-radius: var(--raduis);
  width: 100%;
}
.switch-button {
  min-height: 2rem;
  font-size: var(--text-sm);
  padding: 0.2rem 1rem;
  color: var(--gray-light);
  font-weight: var(--font-medium);
  border-radius: var(--raduis-sm);
  transition: all 0.2s ease-in-out;
  flex: 1;
}
.switch-button:hover {
  color: var(--gray);
}
.switch-button.active {
  background-color: var(--light);
  color: var(--gray-dark);
  box-shadow: var(--shadow-lg);
}
</style>
