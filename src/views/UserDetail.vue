<template>
  <div className="page">
    <h2>User Details</h2>
    <!-- Display user details here -->

    <p>Name: {{ user.name }}</p>
    <p>address: {{ user.address }}</p>

    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="user.name" id="name" placeholder="Name" required />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input v-model="user.address" id="address" placeholder="Address" required />
      </div>
      <button type="submit" class="btn-primary">Update</button>
    </form>
    <button @click="deleteUser" class="btn-danger">Delete User</button>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const { id } = route.params
const user = ref(null)

watchEffect(() => {
  // Fetch user details based on ID
  axios.get(`http://localhost:3000/api/users/${id}`).then((response) => {
    user.value = response.data.data
  })
})

function updateUser() {
  axios
    .patch(`http://localhost:3000/api/users/${id}`, user.value)
    .then((response) => {
      fetchAndSetUsers()

      // Handle success, e.g., show a message or redirect
      alert('User updated successfully')

      console.log('response updating user', response)
    })
    .catch((error) => {
      alert(error)
      // Handle error
    })
}

function deleteUser() {
  if (confirm('Are you sure you want to delete this user?')) {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
      .then((response) => {
        fetchAndSetUsers()

        alert('User deleted successfully')
        console.log('response deleting user', response)
        // Handle successful deletion, e.g., redirect to user list
      })
      .catch((error) => {
        alert(error)
        // Handle error
      })
  }
}

async function fetchAndSetUsers() {
  const response = await axios.get('http://localhost:3000/users')
  // Assuming you have a reactive variable for the user list
  usersList.value = response.data.users
  // Optionally, refetch the total users count
  fetchTotalUsers()
}
</script>

<style scoped>
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

.btn-primary,
.btn-danger {
  background-color: transparent;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-primary {
  background-image: linear-gradient(to right, #3498db, #2980b9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.btn-primary:hover {
  background-image: linear-gradient(to right, #2980b9, #2c7bb6);
}

.btn-danger {
  background-image: linear-gradient(to right, #e74c3c, #c0392b);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.btn-danger:hover {
  background-image: linear-gradient(to right, #c0392b, #d35400);
}
</style>
