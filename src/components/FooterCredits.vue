<script setup lang="ts"></script>

<template>
  <div class="footer">
    <p>
      Created by
      <a
        class="footer-link"
        href="https://github.com/YerrouHamza"
        target="_blank"
        >Hamza Yerrou</a
      >
    </p>
  </div>
</template>

<style scoped>
.footer {
  color: white;
  font-size: var(--font-size-lg);
}

.footer-link {
  font-weight: bold;
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary);
}
</style>
