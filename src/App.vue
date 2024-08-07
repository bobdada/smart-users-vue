<template>
  <div id="app" class="flexing">
    <nav flex="{1}">
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
    <div id="router">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const store = useStore()
const router = useRouter()

const topUsers = computed(() => store.state.topUsers)
const totalUsers = computed(() => store.state.totalUsers)

function goToUserDetail(id) {
  router.push(`/user/${id}`)
}

// Fetch users from Vuex store
store.dispatch('fetchUsers')
</script>

<style scoped>
#app {
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
}
.dashboard {
  border: 10px solid black;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
}
nav {
  flex: 1;
}
#router {
  flex: 3;
}
.flexing {
  display: flex;
  gap: 20px;
}
li {
  cursor: pointer;
}
</style>
