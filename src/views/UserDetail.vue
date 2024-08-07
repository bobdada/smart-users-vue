<template>
  <div className="page">
    <h2>User Details</h2>
    <!-- Display user details here -->

    <p>
      Name: <span> {{ user?.name }} </span>
    </p>
    <p>
      address: <span>{{ user?.address }} </span>
    </p>

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
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const { id } = route.params
const store = useStore() // Use Vuex store
const user = ref(null)

// Fetch user details based on ID from Vuex store
watchEffect(() => {
  store.dispatch('fetchUsers') // Assuming fetchUsers action sets the state globally
})

// Update user
async function updateUser() {
  await store.dispatch('updateUser', user.value)
  user.value = {} // Reset form after submission
  alert('User updated successfully')
}

// Delete user
async function deleteUser() {
  if (confirm('Are you sure you want to delete this user?')) {
    await store.dispatch('deleteUser', id)
    alert('User deleted successfully')
    // Redirect or clear user detail view
  }
}
</script>

<style scoped>
span {
  font-weight: 700;
}
.page {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 15px;
  margin-top: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
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
  color: #ffff;
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
