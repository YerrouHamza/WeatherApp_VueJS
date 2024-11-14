<script setup lang="ts">
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import moment from 'moment';

import ToggleButtons from '@/components/Ui-elements/SwitchButtons.vue';
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
  const forecastdays = props.forecastWeather?.forecastday;

  if (selectedOption.value === '1') {
    const todayHourly = forecastdays?.find((item: { date: string }) =>
      moment(item?.date).isSame(moment(), 'day')
    )?.hour;

    const hourly = todayHourly?.filter((item: { time: string }) => {
      return moment(item?.time).isAfter(moment().subtract(1, 'hour'));
    });

    if (hourly?.length > 0) {
      const tommorowHourly = forecastdays[1]?.hour;
      let finalHourly = hourly.concat(tommorowHourly).slice(0, 24);
      return finalHourly;
    }
    return hourly;
  }

  return forecastdays;
});

const setTheOption = (option: string) => {
  selectedOption.value = option;
};
</script>

<template>
  <div class="forecast">
    <ToggleButtons
      :value="selectedOption"
      :options="[
        { name: 'Hourly Forecast', id: '1' },
        { name: '7-Day Forecast', id: '2' },
      ]"
      :setTheOption="setTheOption"
    />

    <div class="forecast_slider">
      <Swiper
        :slides-per-view="3"
        space-between="10"
        v-if="forecast"
        :breakpoints="{
          640: {
            slidesPerView: 8,
          },
        }"
      >
        <SwiperSlide v-for="item in forecast" :key="item?.id">
          <div class="flex-center-col" v-if="selectedOption === '1'">
            <p>
              {{
                moment(item?.time).isSame(moment(), 'hour')
                  ? 'Now'
                  : moment(item?.time).format('h A')
              }}
            </p>
            <WeatherIcon
              class="forecast_slider-icon"
              :condition="item?.condition"
              :time="item?.time"
            />
            <p class="font-bold">
              {{ props.temperature === 'C' ? item?.temp_c : item?.temp_f }}°
            </p>
          </div>

          <div class="flex-center-col" v-else-if="selectedOption === '2'">
            <p>
              {{
                moment(item?.date).isSame(moment(), 'day')
                  ? 'Today'
                  : moment(item?.date).format('ddd')
              }}
            </p>
            <WeatherIcon
              class="forecast_slider-icon"
              :condition="item?.day?.condition"
            />
            <div class="text-center">
              <p class="font-bold">
                {{
                  props.temperature === 'C'
                    ? item?.day?.mintemp_c
                    : item?.day?.mintemp_f
                }}°
              </p>
              <p class="font-bold text-gray">
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

<style scoped>
.forecast {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.forecast_slider {
  min-height: 120px;
}

.forecast_slider-icon {
  width: 2rem;
  height: 2rem;
}

.text-gray {
  color: var(--gray-light);
}
</style>
