<script setup lang="ts">
    import { ref, computed, defineProps } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import moment from 'moment';

    // Components
    import ToggleButtons from '@/components/Ui-elements/ToggleButtons.vue';
    import WeatherIcon from '@/components/Ui-elements/WeatherIcon.vue';

    const selectedOption = ref('1');
    const options = ref([
        { name: 'Hourly Forecast', id: '1' },
        { name: '7-Day Forecast', id: '2' },
    ]);

    // Props
    const props = defineProps({
        forecastWeather: {
            type: Object,
            required: true,
        },
        location: {
            type: Object,
            required: true,
        },
    });

    // Computed
    const forecast = computed(() => {
        console.log('selectedOption', props.forecastWeather);
        
        if (selectedOption.value === '1') {
            const todayHourly = props.forecastWeather?.forecastday[0]?.hour
            const tommorowHourly = props.forecastWeather?.forecastday

            console.log('tommorowHourly', tommorowHourly);
            console.log('todayHourly', todayHourly);
            
            
            // filter the hourly forecast for get the coming hours only
            const hourly = todayHourly?.filter((item: any) => {
                return moment(item?.time).isAfter(moment().subtract(1, 'hour'));
            });

            if(hourly?.length > 0) {
                const tommorowHourly = props.forecastWeather?.forecastday[1]?.hour
                return hourly.concat(tommorowHourly);
            }
            
            return hourly;
        } else {
            return props.forecastWeather?.forecastday;
        }
    });

    // Methods
    const setTheOption = (option: string) => {
        selectedOption.value = option;
    };
</script>

<template>
    <div class="space-y-5">
        <ToggleButtons
            :value="selectedOption"
            :options="options"
            :setTheOption="setTheOption"
        />

        <div class="min-h-[120px]">
            <Swiper
                :slides-per-view="selectedOption === '1' ? 8.6 : 8"
                space-between="10"
                navigation
                class="mySwiper"
                v-if="forecast"
            >
                <SwiperSlide
                    v-for="item in forecast"
                    class="flex justify-between items-center gap-6"
                >
                    <div class="flex flex-col justify-center items-center gap-y-2 text-md" v-if="selectedOption === '1'">
                        <p>
                            {{ moment(item?.time).isSame(moment(), 'hour') ? 'Now' : moment(item?.time).format('h A') }}
                        </p>
                        <WeatherIcon 
                            class="size-8"
                            :condition="item?.condition"
                            :time="item?.time"
                            :latitude="location?.lat"
                            :longitude="location?.lon"
                        />
                        <p class="font-bold">{{ item?.temp_c }}°</p>
                    </div>

                    <div class="flex flex-col justify-center items-center gap-y-2 text-md" v-else-if="selectedOption === '2'">
                        <p>
                            {{ moment(item?.date).isSame(moment(), 'day') ? 'Today' : moment(item?.date).format('ddd') }}
                        </p>
                        <WeatherIcon class="size-8" :condition="item?.day?.condition" />
                        <div class="text-center">
                            <p class="font-bold">{{ item?.day?.mintemp_c }}°</p>
                            <p class="font-bold text-gray-400">{{ item?.day?.maxtemp_c }}°</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<style scoped>
</style>