<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/Api/api';

import LocationDetails from './components/LocationDetails.vue';
import CurrentWeatherDetails from '@/components/CurrentWeatherDetails.vue';
import ForcastWeather from '@/components/ForcastWeather.vue';
import SettingsModal from '@/components/SettingsModal.vue';
import OverlayLoader from '@/components/Ui-elements/OverlayLoader.vue';
import CitySearchModal from '@/components/CitySearchModal.vue';

const isloading = ref(true);
const location = ref<object>({});
const currentWeather = ref<object>({});
const forecastWeather = ref<object>({});
const temperature = ref<string>('C');
const measurements = ref<string>('metric');
const city = ref<string>('Casablanca');
const showCityModal = ref(false);

onMounted(async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        city.value = `${latitude},${longitude}`;
        await fetchedData(city.value);
      },

      async () => {
        await fetchedData();
      }
    );
  } else {
    await fetchedData();
  }

  setInterval(async () => {
    await fetchedData();
  }, 3600000);
});

const fetchedData = async (searchCity?: string) => {
  showLoader(true);

  await api
    .get(`forecast.json?aqi=yes&days=8&q=${searchCity || city?.value}`)
    .then((res) => {
      location.value = res?.data?.location;
      currentWeather.value = res?.data?.current;
      forecastWeather.value = res?.data?.forecast;

      setTimeout(() => {
        showLoader(false);
      }, 1000);
    })
    .catch(() => {
      showLoader(false);
      console.error('Failed to fetch data');
    });
};
const setTemperature = (option: string) => {
  temperature.value = option;
};
const setMeasurements = (option: string) => {
  measurements.value = option;
};
const showLoader = (value: boolean) => {
  isloading.value = value;
};
const openChangeCityModal = (open: boolean) => {
  showCityModal.value = open as boolean;
};
const handelCitySelection = (city: { name: string; value: string }) => {
  city.value = city?.name;
  fetchedData(city?.name);
  openChangeCityModal(false);
};
</script>

<template>
  <OverlayLoader v-if="isloading" />

  <CitySearchModal
    v-if="showCityModal"
    :open="showCityModal"
    :closeModal="() => openChangeCityModal(false)"
    :showLoader="showLoader"
    :handelChangeCity="handelCitySelection"
  />

  <div class="center-dev flex-col gap-10 h-screen p-5 bg-gradient-dark">
    <div
      class="card max-w-[800px] sm:max-h-[700px] flex flex-col justify-between"
    >
      <div class="flex justify-between items-start gap-4">
        <LocationDetails
          :location="location"
          :openChangeCityModal="openChangeCityModal"
        />

        <SettingsModal
          :temperature="temperature"
          :measurements="measurements"
          :onSetTemperature="setTemperature"
          :onSetMeasurements="setMeasurements"
        />
      </div>

      <CurrentWeatherDetails
        :currentWeather="currentWeather"
        :temperature="temperature"
        :measurements="measurements"
      />

      <ForcastWeather
        :forecastWeather="forecastWeather"
        :location="location"
        :temperature="temperature"
      />
    </div>

    <div class="text-white text-sm">
      <p>
        Created by
        <a
          class="font-bold hover:text-blue-500"
          href="https://github.com/YerrouHamza"
          target="_blank"
          >Hamza Yerrou</a
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>
