<template>
  <div class="page">
    <h2>User Details</h2>
    <UserDetails :user="user" />
    <UserForm :user="user" buttonLabel="Update User" :onSubmit="updateUser" />
    <DeleteButton @deleteUser="deleteUser" />
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import UserDetails from '../components/UserDetails.vue'
import UserForm from '../components/UserForm.vue'
import DeleteButton from '../components/DeleteButton.vue'

const route = useRoute()
const store = useStore()
const user = ref(null)

watchEffect(() => {
  fetchUserData(route.params.id)
})

// Fetch user data based on the current id
function fetchUserData(id) {
  const users = store.state.users
  user.value = users.find((u) => u.id === id)
}

// Watch for changes in the route parameter
watch(
  () => route.params.id,
  (newId) => {
    fetchUserData(newId)
  },
  { immediate: true } // Also fetch data on initial load
)

// Update user
async function updateUser(newUser) {
  await store.dispatch('updateUser', newUser)
  user.value = {} // Reset form after submission
  alert('User updated successfully')
}

// Delete user
async function deleteUser() {
  if (confirm('Are you sure you want to delete this user?')) {
    await store.dispatch('deleteUser', route.params.id)
    alert('User deleted successfully')
    router.push({ name: 'users' })
  }
}
</script>

<style scoped>
.page {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
}
</style>
