<script setup lang="ts">
import { ref, watch } from 'vue';
import api from '@/Api/api';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
  showLoader: {
    type: Function,
    required: true,
  },
  handelChangeCity: {
    type: Function,
    required: true,
  },
});

const searchQuery = ref('');
const searchResults = ref(
  [] as { id: number; name: string; country: string }[]
);
let debounceTimeout: NodeJS.Timeout;

const searchCity = async () => {
  if (!searchQuery.value) return;
  props.showLoader(true);

  await api
    .get(`search.json?q=${searchQuery.value}`)
    .then((res) => {
      searchResults.value = res.data;

      setTimeout(() => {
        props.showLoader(false);
      }, 1000);
    })
    .catch(() => {
      props.showLoader(false);
      console.error('City search failed');
    });
};

watch(searchQuery, () => {
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    searchCity();
  }, 500);
});
</script>

<template>
  <div class="modal-overlay z-modal" @click.self="props.closeModal()">
    <div
      class="bg-white w-full rounded-xl shadow-lg py-4 px-3 sm:p-8 max-w-[500px] max-h-[500px] space-y-5"
    >
      <div class="space-y-3">
        <h2 class="text-xl font-semibold">Search for a City</h2>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Enter city name"
          @keydown.enter="searchCity"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div v-if="Object.keys(searchResults).length > 0">
        <h3 class="text-md font-semibold text-gray-400 mb-2">
          Search Results:
        </h3>
        <ul class="space-y-1">
          <li
            v-for="city in searchResults"
            :key="city.id"
            @click="() => props.handelChangeCity(city)"
            class="cursor-pointer mb-1 hover:pl-3 hover:border-l-2 hover:border-blue-500 transition-all duration-200 ease-in"
          >
            {{ city?.name }}, {{ city?.country }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
