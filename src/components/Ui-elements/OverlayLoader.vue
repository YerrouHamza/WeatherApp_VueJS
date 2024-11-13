<script setup lang="ts">
</script>

<template>
  <teleport to='body'>
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black dark:bg-whiten bg-opacity-50 dark:bg-opacity-50 z-max"
    >
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-700 border-t-transparent"
      ></div>
    </div>
  </teleport>
</template>

<style scoped></style>
