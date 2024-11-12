<script setup lang="ts">
    import { PropType } from 'vue';

    // Components
    import WeatherIcon from '@/components/Ui-elements/WeatherIcon.vue';
    import AirQualityBar from '@/components/AirQualityBar.vue';

    // Assets
    import HumidityIcon from '@/assets/humidity.svg';
    import WindIcon from '@/assets/wind.svg';
    import PrecipitationIcon from '@/assets/precipitation.svg';
    import AqiIcon from '@/assets/aqi.svg';

    defineProps({
        currentWeather: {
            type: Object as PropType<any>,
            required: true,
        },
        temperature: {
            type: String,
            required: true,
        },
        measurements: {
            type: String,
            required: true,
        },
    });
</script>

<template>
    <div class="space-y-12">
        <div class="flex justify-between">
            <div class="flex justify-between items-center gap-6">
                <WeatherIcon class="size-14" :condition="currentWeather?.condition" />
                <h2 class="text-5xl font-bold">{{ temperature === 'C' ? currentWeather?.temp_c : currentWeather?.temp_f }}°</h2>
            </div>

            <div class="space-y-1 text-right">
                <p class="font-medium text-3xl capitalize">{{ currentWeather?.condition.text }}</p>
                <p class="text-md text-gray-600">Feels like {{  temperature === 'C' ? currentWeather?.feelslike_c : currentWeather?.feelslike_f }}°</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-x-10">
            <div class="col-span-1 space-y-5">
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <HumidityIcon class="size-5" /> Humidity
                    </span>
                    <p class="text-black font-medium">{{ currentWeather?.humidity }}%</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <WindIcon class="size-5" /> Wind
                    </span>
                    <p class="text-black font-medium">{{ measurements === 'metric' ? `${currentWeather?.wind_kph} km/h` : `${currentWeather?.wind_mph} mph` }}</p>
                </div>
            </div>
            <div class="col-span-1 space-y-5">
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <PrecipitationIcon class="size-5" /> Precipitation
                    </span>
                    <p class="text-black font-medium">{{ measurements === 'metric' ? `${currentWeather?.precip_mm} mm` : `${currentWeather?.precip_in} in` }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <AqiIcon class="size-5" /> AQI
                    </span>
                    <p class="text-black font-medium">{{ currentWeather?.air_quality.co }}</p>
                </div>
            </div>
        </div>


        <AirQualityBar :airQuality="currentWeather?.air_quality.co" />
    </div>
</template>

<style scoped>
</style>