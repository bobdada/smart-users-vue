<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id" cursor="pointer" @click="goToUserDetail(user.id)">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// Simulate fetching users from an API
const users = ref([])
axios.get('http://localhost:3000/api/users').then((response) => {
  users.value = response.data.data
})

function goToUserDetail(id) {
  router.push({ name: 'user-detail', params: { id } })
}
</script>
