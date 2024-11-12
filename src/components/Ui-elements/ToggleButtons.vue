<script setup lang="ts">
    import { PropType } from 'vue';

    const props = defineProps({
        value: {
            type: String,
            required: true,
        },
        options: {
            type: Array as PropType<string[]>,
            required: true,
        },
        setTheOption: {
            type: Function as PropType<(option: string) => void>,
            required: true,
        },
    });
    
    const toggleOption = (option: string) => {
        props.setTheOption(option);
    };
</script>

<template>
  <div class="flex items-center p-1 bg-gray-200 rounded-lg w-full">
    <button
        :class="[
            'text-gray-500 px-4 py-1 rounded-lg transition-all duration-200 flex-1',
            value === option && 'bg-white text-gray-800 shadow'
        ]"
        v-for="option in options"
        @click="toggleOption(option)"
    >
        {{ option }}
    </button>
  </div>
</template>

<style scoped>
</style>
