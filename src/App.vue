<template>
  <div id="app">
    <nav>
      <ul>
        <div class="dashboard">
          <h2>Dashboard</h2>
          <p>Total Users: {{ totalUsers }}</p>
        </div>
        <li><a href="/users">Users</a></li>
        <li>
          User List
          <ul>
            <li v-for="user in topUsers" :key="user.id" @click="goToUserDetail(user.id)">
              {{ user.name }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
import axios from 'axios'

const topUsers = ref([])
const totalUsers = ref(0)

async function fetchTotalUsers() {
  try {
    const response = await axios.get('http://localhost:3000/api/users')
    const data = response.data.data

    topUsers.value = data.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3)
    totalUsers.value = data.length
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

fetchTotalUsers() // Initial fetch

// Watch for route changes to refetch data if necessary
watch(
  () => router.currentRoute.value.path,
  () => {
    fetchTotalUsers()
  }
)

function goToUserDetail(id) {
  window.location.href = `/user/${id}`
}
</script>

<style scoped>
.dashboard {
  border: 10px solid black;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
}
</style>
