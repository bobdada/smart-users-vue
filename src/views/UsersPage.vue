<template>
  <div class="page">
    <h1>Users</h1>
    <UserForm :user="user" buttonLabel="Add User" :onSubmit="addUser" />
    <h3>All Users</h3>
    <UserList :users="users" @userClick="goToUserDetail" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UserForm from '../components/UserForm.vue'
import UserList from '../components/UserList.vue'

const router = useRouter()
const store = useStore()

const users = computed(() => store.state.users)

// Navigate to user detail
function goToUserDetail(id) {
  router.push({ name: 'user-detail', params: { id } })
}

// Add a new user
async function addUser(newUser) {
  try {
    await store.dispatch('addUser', newUser)
    alert('User added successfully')
    // Optionally, fetch users again to reflect the change
    store.dispatch('fetchUsers')
  } catch (error) {
    alert(error)
    // Handle error
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
