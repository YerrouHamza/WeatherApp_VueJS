<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import api from '@/Api/api';

import LocationDetails from './components/LocationDetails.vue';
import CurrentWeatherDetails from '@/components/CurrentWeatherDetails.vue';
import ForcastWeather from '@/components/ForcastWeather.vue';
import SettingsModal from '@/components/Modals/SettingsModal.vue';
import OverlayLoader from '@/components/Ui-elements/OverlayLoader.vue';
import CitySearchModal from '@/components/Modals/CitySearchModal.vue';
import SettingIcon from '@/assets/setting.svg';

const isloading = ref(true);
const location = ref<object>({});
const currentWeather = ref<object>({});
const forecastWeather = ref<object>({});
const temperature = ref<string>('C');
const measurements = ref<string>('metric');
const city = ref<string>('Casablanca');
const showCityModal = ref(false);
const showModal = ref(false);

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
const toggleSettingsModal = () => {
  showModal.value = !showModal.value;
};
const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.setting-modal') && !target.closest('#setting-btn')) {
    showModal.value = false;
  }
};

watch(showModal, (value) => {
  if (value) {
    document.addEventListener('click', handleOutsideClick);
  } else {
    document.removeEventListener('click', handleOutsideClick);
  }
});
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

  <SettingsModal
    v-if="showModal" 
    :temperature="temperature"
    :measurements="measurements"
    :onSetTemperature="setTemperature"
    :onSetMeasurements="setMeasurements"
  />

  <div class="waether-card">
    <div class="waether-card_header">
      <LocationDetails
        :location="location"
        :openChangeCityModal="openChangeCityModal"
      />

      <div id="setting" class="setting">
        <button
          id="setting-btn"
          :class="`btn btn-icon ${showModal && 'active-btn'}`"
          @click="toggleSettingsModal"
        >
          <SettingIcon />
        </button>
      </div>
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
</template>

<style scoped>
.waether-card {
  max-width: 800px;
  width: 100%;
  height: 100%;
  background: var(--light);
  border-radius: var(--raduis-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem;
}
.waether-card_header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
}
.setting {
  position: relative;
}

@media only screen and (max-width: 600px) {
  .waether-card {
    padding: 1rem;
  }
  .waether-card_header {
    gap: 1rem;
  }
}
</style>
