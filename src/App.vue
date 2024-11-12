<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import api from '@/Auth/api'

  // Components
  import LocationDetails from './components/LocationDetails.vue';
  import CurrentWeatherDetails from '@/components/CurrentWeatherDetails.vue';
  import ForcastWeather from '@/components/ForcastWeather.vue';
  import SettingsModal from '@/components/SettingsModal.vue';
  import Loader from '@/components/Ui-elements/Loader.vue';
  
  const loader = ref(true);
  const location = ref<any>(null);
  const currentWeather = ref<any>(null);
  const forecastWeather = ref<any>(null);
  const temperature = ref<string>('C');
  const measurements = ref<string>('metric');
  const city = ref<string>('casablanca');

  onMounted(async() => {
    await fetchedData()

    setInterval(async () => {
      await fetchedData()
    }, 3600000)
  })

  // Methods
  const fetchedData = async () => {
    await api.get(`forecast.json?aqi=yes&days=8&q=${city.value}`)
      .then((res: any) => {
        location.value = res.data?.location
        currentWeather.value = res.data?.current
        forecastWeather.value = res.data?.forecast

        setTimeout(() => {
          loader.value = false
        }, 1000)
      }).catch(() => {
        loader.value = false
        console.error('Error')
      })
  }
  const setTemperature = (option: string) => {
    temperature.value = option
  }
  const setMeasurements = (option: string) => {
    measurements.value = option
  }
</script>

<template>
  <loader v-if="loader" />
  
  <div class="center-dev flex-col gap-10 h-screen p-5 bg-gradient-dark">
    <div class="card max-w-[800px] sm:max-h-[700px] flex flex-col justify-between">
      <div class="flex justify-between items-start gap-4">
        <LocationDetails 
          :location="location"
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
      <p>Created by <a class="font-bold hover:text-blue-500" href="https://github.com/YerrouHamza" target="_blank">Hamza Yerrou</a></p>
    </div>
  </div>
</template>

<style scoped>
</style>