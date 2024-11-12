<script setup lang="ts">
    import { PropType } from 'vue';

    const props = defineProps({
        value: {
            type: String as PropType<string>,
            required: true,
            default: '',
        },
        options: {
            type: Array as PropType<{ name: string, id: string }[]>,
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
  <div class="flex items-center p-1 bg-gray-200 rounded-xl w-full">
    <button
        :class="[
            'text-gray-500 px-4 py-1 rounded-lg transition-all duration-200 flex-1',
            value === option.id && 'bg-white text-gray-800 shadow'
        ]"
        v-for="option in options"
        :key="option.id"
        @click="toggleOption(option.id)"
    >
        {{ option.name }}
    </button>
  </div>
</template>

<style scoped>
</style>
