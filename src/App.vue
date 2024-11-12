<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import api from '@/Auth/api'

  // Components
  import LocationDetails from './components/LocationDetails.vue';
  import CurrentWeatherDetails from '@/components/CurrentWeatherDetails.vue';
  import ForcastWeather from '@/components/ForcastWeather.vue';
  import SettingsModal from '@/components/SettingsModal.vue';

  const location = ref<any>(null)
  const currentWeather = ref<any>(null)
  const forecastWeather = ref<any>(null)
  const temperature = ref<string>('C');
  const measurements = ref<string>('metric');

  onMounted(async() => {
    await fetchedData()

    setInterval(async () => {
      await fetchedData()
    }, 3600000)
  })

  // Methods
  const fetchedData = async () => {
    await api.get('forecast.json?aqi=yes&days=8&q=tetouan')
      .then((res: any) => {
        location.value = res.data?.location
        currentWeather.value = res.data?.current
        forecastWeather.value = res.data?.forecast
      }).catch(() => {
        console.log('Error')
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
  <div class="center-dev flex-col gap-10 h-screen bg-gradient-dark">
    <div class="card max-w-[800px] max-h-[700px] flex flex-col justify-between">
      <div class="flex justify-between items-start">
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