<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import moment from 'moment';
    import tippy from 'tippy.js';

    // Icons
    import World from '@/assets/world.svg';

    const currentTime = ref(moment())
    
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
  
    onMounted(async() => {
        setInterval(() => {
            currentTime.value = moment()
        }, 10000)
        tippy('.city-tooltip', {
            content: 'Click to change city',
            theme: 'custom',
        })
    })
</script>

<template>
    <div class="space-y-1">
        <button 
            class="text-2xl sm:text-5xl font-semibold city-tooltip flex items-center gap-x-0.5"
            @click="openChangeCityModal(true)"
        >
            <World class="size-10 text-gray-600" /> {{ props.location?.name }}
        </button>
        <p class="text-sm sm:text-lg text-gray-600">{{ moment(currentTime).format('dddd, MMMM D, YYYY') }}</p>
        <p class="text-sm sm:text-lg text-gray-600">{{ moment(currentTime).format('HH:mm A') }}</p>
    </div>
</template>

<style scoped>
</style>