<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name:</label>
      <input v-model="localUser.name" id="name" placeholder="Name" required />
    </div>
    <div class="form-group">
      <label for="address">Address:</label>
      <input v-model="localUser.address" id="address" placeholder="Address" required />
    </div>
    <button type="submit" class="btn-primary">{{ buttonLabel }}</button>
  </form>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'

const props = defineProps({
  user: Object, // User data to be edited
  buttonLabel: String, // Label for the submit button
  onSubmit: Function // Function to call on form submission
})

// Local copy of the user to edit
const localUser = ref({ ...props.user })

// Watch for changes in the user prop and update the localUser
watch(
  () => props.user,
  (newUser) => {
    localUser.value = { ...newUser }
  },
  { immediate: true, deep: true }
)

// Emit the local user object on form submission
function handleSubmit() {
  props.onSubmit({ ...localUser.value })
}
</script>

<style scoped>
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
