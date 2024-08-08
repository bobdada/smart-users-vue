<template>
    <button @click="$emit('deleteUser')" class="btn-danger">Delete User</button>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .btn-danger {
    background-color: transparent;
    color: #ffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    background-image: linear-gradient(to right, #e74c3c, #c0392b);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .btn-danger:hover {
    background-image: linear-gradient(to right, #c0392b, #d35400);
  }
  </style>
  