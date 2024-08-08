<template>
  <ul>
    <li
      v-for="user in users"
      :key="user?.id"
      @click="$emit('userClick', user.id)"
      style="cursor: pointer"
    >
      {{ user?.name }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  users: Array
})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
