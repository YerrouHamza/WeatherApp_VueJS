<script setup lang="ts">
import WeatherIcon from '@/components/Ui-Elements/WeatherIcon.vue';
import AirQualityBar from '@/components/AirQualityBar.vue';

import HumidityIcon from '@/assets/humidity.svg';
import WindIcon from '@/assets/wind.svg';
import PrecipitationIcon from '@/assets/precipitation.svg';
import AqiIcon from '@/assets/aqi.svg';

const props = defineProps({
  currentWeather: {
    type: Object,
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
  <div class="weather-details">
    <div class="flex-between col-sm">
      <div class="flex-center">
        <WeatherIcon
          class="temperature-icon"
          :condition="props.currentWeather?.condition"
          :time="props.currentWeather?.last_updated"
        />
        <h2 class="temperature">
          {{
            props.temperature === 'C'
              ? props.currentWeather?.temp_c
              : props.currentWeather?.temp_f
          }}°
        </h2>
      </div>

      <div class="condition">
        <h2 class="condition-title">
          {{ props.currentWeather?.condition?.text }}
        </h2>
        <p class="condition-feelslike">
          Feels like
          {{
            props.temperature === 'C'
              ? props.currentWeather?.feelslike_c
              : props.currentWeather?.feelslike_f
          }}°
        </p>
      </div>
    </div>

    <div class="weather-stats">
      <div class="stat-col">
        <div class="stat-value flex-between">
          <span class="flex-center">
            <HumidityIcon class="stat-icon" /> Humidity
          </span>
          <p>{{ props.currentWeather?.humidity }}%</p>
        </div>
        <div class="stat-value flex-between">
          <span class="flex-center"> <WindIcon class="stat-icon" /> Wind </span>
          <p>
            {{
              measurements === 'metric'
                ? `${props.currentWeather?.wind_kph} km/h`
                : `${props.currentWeather?.wind_mph} mph`
            }}
          </p>
        </div>
      </div>
      <div class="stat-col">
        <div class="stat-value flex-between">
          <span class="flex-center">
            <PrecipitationIcon class="stat-icon" /> Precipitation
          </span>
          <p>
            {{
              measurements === 'metric'
                ? `${props.currentWeather?.precip_mm} mm`
                : `${props.currentWeather?.precip_in} in`
            }}
          </p>
        </div>
        <div class="stat-value flex-between">
          <span class="flex-center"> <AqiIcon class="stat-icon" /> AQI </span>
          <p>
            {{ props.currentWeather?.air_quality?.co }}
          </p>
        </div>
      </div>
    </div>

    <AirQualityBar :airQuality="props.currentWeather?.air_quality?.co" />
  </div>
</template>

<style scoped>
.weather-details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 2.5rem;
  margin: 2rem 0;
}
.temperature-icon {
  width: 3.5rem;
}
.temperature {
  font-size: var(--font-title-xl);
  font-weight: var(--font-bold);
}

.condition {
  text-align: right;
}
.condition-title {
  font-size: var(--font-title-lg);
  font-weight: var(--font-medium);
  text-transform: capitalize;
}
.condition-feelslike {
  font-size: var(--font-sm);
  color: var(--text-color);
}

.weather-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 5rem;
}
.stat-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.stat-value {
  color: var(--text-color-dark);
  font-weight: var(--font-medium);
}
.stat-icon {
  width: 1.3rem;
}

@media only screen and (max-width: 600px) {
  .weather-details .weather_title {
    font-size: var(--font-title-lg);
  }

  .condition {
    text-align: center;
  }

  .weather-stats {
    grid-template-columns: 1fr;
  }
}
</style>
