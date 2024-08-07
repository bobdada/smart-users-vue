// src/store.js
import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    topUsers: [],
    totalUsers: 0
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_TOP_USERS(state, topUsers) {
      state.topUsers = topUsers
    },
    SET_TOTAL_USERS(state, total) {
      state.totalUsers = total
    },
    ADD_USER(state, newUser) {
      state.users.push(newUser)
      state.totalUsers += 1 // Assuming you have a totalUsers state property
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId)
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/users')
        const data = response.data.data
        commit('SET_USERS', data)
        commit('SET_TOP_USERS', data.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3))
        commit('SET_TOTAL_USERS', data.length)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    },
    addUser({ commit }, newUser) {
      axios.post('http://localhost:3000/api/users', newUser).then((response) => {
        commit('ADD_USER', response.data.data)
      })
    },
    updateUser({ commit }, updatedUser) {
      axios
        .patch(`http://localhost:3000/api/users/${updatedUser.id}`, updatedUser)
        .then((response) => {
          commit('UPDATE_USER', response.data.data)
        })
    },
    deleteUser({ commit }, userId) {
      axios.delete(`http://localhost:3000/api/users/${userId}`).then((response) => {
        commit('DELETE_USER', userId)
      })
    }
  }
})
