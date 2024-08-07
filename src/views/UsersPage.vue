<template>
  <div className="page">
    <h1>Users</h1>
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="user.name" id="name" placeholder="Name" required />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input v-model="user.address" id="address" placeholder="Address" required />
      </div>
      <button type="submit" class="btn-primary">Add User</button>
    </form>

    <h3>All Users</h3>

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
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore() // Use Vuex store
const user = ref({})
const users = ref([])

// Fetch users from Vuex store
store.dispatch('fetchUsers').then(() => {
  users.value = store.state.users // Assuming users are stored in the state under 'users'
})

function goToUserDetail(id) {
  router.push({ name: 'user-detail', params: { id } })
}

function addUser() {
  store
    .dispatch('addUser', user.value)
    .then(() => {
      user.value = {} // Reset form after submission
      alert('User added successfully')
      // Optionally, fetch users again to reflect the change
      store.dispatch('fetchUsers')
    })
    .catch((error) => {
      alert(error)
      // Handle error
    })
}
</script>

<style>
.page {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-primary {
  background-image: linear-gradient(to right, #3498db, #2980b9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  margin-left: auto;
  background-color: transparent;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  color: #ffff;
}

.btn-primary:hover {
  background-image: linear-gradient(to right, #2980b9, #2c7bb6);
}
</style>
