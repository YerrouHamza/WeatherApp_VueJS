<script setup lang="ts">
import { ref, watch } from 'vue';
import api from '@/Api/api';

import SearchIcon from '@/assets/search.svg';

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
  <div class="overlay" @click.self="props.closeModal()">
    <div class="search-modal">
      <div class="search-feild card">
        <SearchIcon class="icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by city name"
          @keydown.enter="searchCity"
        />
      </div>

      <div
        class="search-result card"
        v-if="Object.keys(searchResults).length > 0"
      >
        <h3 class="title">Search Results</h3>
        <ul class="result-list">
          <li
            v-for="city in searchResults"
            :key="city.id"
            @click="() => props.handelChangeCity(city)"
            class="result-list__item"
          >
            {{ city?.name }}, {{ city?.country }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--light);
  border-radius: var(--raduis);
}
.search-modal {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.search-feild {
  padding: var(--padding-sm);
  padding: 0.4rem 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  border: 1px solid var(--light);
  transition: all 0.2s ease-in-out;
}
.search-feild:is(:focus-within) {
  box-shadow: var(--shadow-primary);
}
.search-feild .icon {
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 0.5rem;
  color: var(--gray);
}
.search-feild input {
  font-size: var(--font-size-lg);
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
.search-result {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  padding: 1.4rem 1rem;
  border: 1px solid var(--light);
  border-top: none;
}
.search-result .title {
  color: var(--gray);
  font-size: var(--font-size-md);
  font-weight: var(--font-medium);
  margin-bottom: 1.5rem;
}
.result-list {
  list-style: none;
  padding: 0;
}
.result-list__item {
  padding: 0.6rem 1rem;
  border-radius: var(--raduis-sm);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.result-list__item:hover {
  background-color: var(--light-primary);
  color: var(--primary);
}
</style>
