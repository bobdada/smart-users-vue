<template>
  <div>
    <p>
      Name: <span> {{ user?.name }} </span>
    </p>
    <p>
      Address: <span>{{ user?.address }} </span>
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  user: Object
})
</script>

<style scoped>
span {
  font-weight: 700;
}
</style>
