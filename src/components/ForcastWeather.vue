<script setup lang="ts">
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import moment from 'moment';

// Components
import ToggleButtons from '@/components/Ui-elements/ToggleButtons.vue';
import WeatherIcon from '@/components/Ui-elements/WeatherIcon.vue';

const props = defineProps({
  forecastWeather: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  location: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  temperature: {
    type: String,
    required: true,
    default: 'C',
  },
});

const selectedOption = ref('1');

const forecast = computed(() => {
  if (selectedOption.value === '1') {
    const todayHourly = props.forecastWeather?.forecastday[0]?.hour;
    const hourly = todayHourly?.filter((item: any) => {
      return moment(item?.time).isAfter(moment().subtract(1, 'hour'));
    });
    if (hourly?.length > 0) {
      const tommorowHourly = props.forecastWeather?.forecastday[1]?.hour;
      let finalHourly = hourly.concat(tommorowHourly).slice(0, 24);
      return finalHourly;
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
      :options="[
        { name: 'Hourly Forecast', id: '1' },
        { name: '7-Day Forecast', id: '2' },
      ]"
      :setTheOption="setTheOption"
    />

    <div class="min-h-[120px]">
      <Swiper
        :slides-per-view="3"
        space-between="10"
        class="mySwiper"
        v-if="forecast"
        :breakpoints="{
          640: {
            slidesPerView: 8,
          },
        }"
      >
        <SwiperSlide
          v-for="item in forecast"
          class="flex justify-between items-center gap-6"
        >
          <div
            class="flex flex-col justify-center items-center gap-y-2 text-md"
            v-if="selectedOption === '1'"
          >
            <p>
              {{
                moment(item?.time).isSame(moment(), 'hour')
                  ? 'Now'
                  : moment(item?.time).format('h A')
              }}
            </p>
            <WeatherIcon
              class="size-8"
              :condition="item?.condition"
              :time="item?.time"
            />
            <p class="font-bold">
              {{ props.temperature === 'C' ? item?.temp_c : item?.temp_f }}°
            </p>
          </div>

          <div
            class="flex flex-col justify-center items-center gap-y-2 text-md"
            v-else-if="selectedOption === '2'"
          >
            <p>
              {{
                moment(item?.date).isSame(moment(), 'day')
                  ? 'Today'
                  : moment(item?.date).format('ddd')
              }}
            </p>
            <WeatherIcon class="size-8" :condition="item?.day?.condition" />
            <div class="text-center">
              <p class="font-bold">
                {{
                  props.temperature === 'C'
                    ? item?.day?.mintemp_c
                    : item?.day?.mintemp_f
                }}°
              </p>
              <p class="font-bold text-gray-400">
                {{
                  props.temperature === 'C'
                    ? item?.day?.maxtemp_c
                    : item?.day?.maxtemp_f
                }}°
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped></style>
