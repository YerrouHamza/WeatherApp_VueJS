<script setup lang="ts"></script>

<template>
  <teleport to="body">
    <div class="overlay">
      <div class="loader"></div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  z-index: 9999;
}

.loader {
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: 5px solid var(--primary);
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
