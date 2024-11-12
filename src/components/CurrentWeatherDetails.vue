<script setup lang="ts">
    import { PropType } from 'vue';

    // Components
    import WeatherIcon from '@/components/Ui-elements/WeatherIcon.vue';
    import AirQualityBar from '@/components/Ui-elements/AirQualityBar.vue';

    // Assets
    import HumidityIcon from '@/assets/humidity.svg';
    import WindIcon from '@/assets/wind.svg';
    import PrecipitationIcon from '@/assets/precipitation.svg';
    import AqiIcon from '@/assets/aqi.svg';

    const props = defineProps({
        currentWeather: {
            type: Object as PropType<any>,
            required: true,
        },
    });
</script>

<template>
    <div class="space-y-12">
        <div class="flex justify-between">
            <div class="flex justify-between items-center gap-6">
            <WeatherIcon class="size-16" :condition="props.currentWeather?.current?.condition" />
            <h2 class="text-6xl font-bold">{{ props.currentWeather?.current?.temp_c }}°</h2>
            </div>

            <div class="space-y-1 text-right">
            <p class="font-medium text-3xl">{{ props.currentWeather?.current?.condition.text }}</p>
            <p class="text-md text-gray-600">Feels like {{ props.currentWeather?.current?.feelslike_c }}°</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-x-10">
            <div class="col-span-1 space-y-5">
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <HumidityIcon class="size-5" /> Humidity
                    </span>
                    <p class="text-black font-medium">{{ props.currentWeather?.current?.humidity }}%</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <WindIcon class="size-5" /> Wind
                    </span>
                    <p class="text-black font-medium">{{ props.currentWeather?.current?.wind_kph }} km/h</p>
                </div>
            </div>
            <div class="col-span-1 space-y-5">
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <PrecipitationIcon class="size-5" /> Precipitation
                    </span>
                    <p class="text-black font-medium">{{ props.currentWeather?.current?.precip_mm }} mm</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <AqiIcon class="size-5" /> AQI
                    </span>
                    <p class="text-black font-medium">{{ props.currentWeather?.current?.air_quality.co }}</p>
                </div>
            </div>
        </div>


        <AirQualityBar :airQuality="props.currentWeather?.current?.air_quality.co" />
    </div>
</template>

<style scoped>
</style>