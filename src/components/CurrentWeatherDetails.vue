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

    const props = defineProps({
        currentWeather: {
            type: Object as PropType<any>,
            required: true,
            default: () => ({}),
        },
        temperature: {
            type: String,
            required: true,
            default: 'C',
        },
        measurements: {
            type: String,
            required: true,
            default: 'metric',
        },
    });
</script>

<template>
    <div class="space-y-12 my-8">
        <div class="flex flex-col sm:flex-row justify-between gap-y-5">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-x-6 gap-y-3">
                <WeatherIcon 
                    class="size-14"
                    :condition="props.currentWeather?.condition"
                    :time="props.currentWeather?.last_updated"
                />
                <h2 class="text-5xl font-bold">{{ props.temperature === 'C' ? props.currentWeather?.temp_c : props.currentWeather?.temp_f }}°</h2>
            </div>

            <div class="space-y-1 text-center sm:text-right">
                <p class="font-medium text-3xl capitalize">{{ props.currentWeather?.condition.text }}</p>
                <p class="text-md text-gray-600">Feels like {{  props.temperature === 'C' ? props.currentWeather?.feelslike_c : props.currentWeather?.feelslike_f }}°</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-x-10 gap-y-5">
            <div class="col-span-2 sm:col-span-1 space-y-5">
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <HumidityIcon class="size-5" /> Humidity
                    </span>
                    <p class="text-black font-medium">{{ props.currentWeather?.humidity }}%</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <WindIcon class="size-5" /> Wind
                    </span>
                    <p class="text-black font-medium">{{ measurements === 'metric' ? `${props.currentWeather?.wind_kph} km/h` : `${props.currentWeather?.wind_mph} mph` }}</p>
                </div>
            </div>
            <div class="col-span-2 sm:col-span-1 space-y-5">
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <PrecipitationIcon class="size-5" /> Precipitation
                    </span>
                    <p class="text-black font-medium">{{ measurements === 'metric' ? `${props.currentWeather?.precip_mm} mm` : `${props.currentWeather?.precip_in} in` }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="flex items-center gap-x-2">
                        <AqiIcon class="size-5" /> AQI
                    </span>
                    <p class="text-black font-medium">{{ props.currentWeather?.air_quality.co }}</p>
                </div>
            </div>
        </div>


        <AirQualityBar :airQuality="props.currentWeather?.air_quality.co" />
    </div>
</template>

<style scoped>
</style>