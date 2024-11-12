<script setup lang="ts">
    import { ref, defineProps, onMounted } from 'vue';
    import moment from 'moment';

    const currentTime = ref(moment())
    
    const props = defineProps({
        location: {
            type: Object,
            required: true,
        },
    });
  
    onMounted(async() => {
        setInterval(() => {
            currentTime.value = moment()
        }, 10000)
    })
</script>

<template>
    <div class="space-y-1">
        <h1 class="text-2xl sm:text-5xl font-semibold">{{ props.location?.name }}</h1>
        <p class="text-sm sm:text-lg text-gray-600">{{ moment(currentTime).format('dddd, MMMM D, YYYY') }}</p>
        <p class="text-sm sm:text-lg text-gray-600">{{ moment(currentTime).format('HH:mm A') }}</p>
    </div>
</template>

<style scoped>
</style>