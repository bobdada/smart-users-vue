import { createStore } from 'vuex'
import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/users'

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
      state.totalUsers += 1
      state.topUsers = [...state.users].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3)
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
        state.topUsers = [...state.users].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3)
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId)
      state.topUsers = [...state.users].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3)
      state.totalUsers -= 1
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(baseUrl)
        const data = response.data.data
        commit('SET_USERS', data)
        commit('SET_TOP_USERS', [...data].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3))
        commit('SET_TOTAL_USERS', data.length)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    },
    addUser({ commit }, newUser) {
      axios.post(baseUrl, newUser).then((response) => {
        commit('ADD_USER', response.data.data)
      })
    },
    updateUser({ commit }, updatedUser) {
      axios.patch(`${baseUrl}/${updatedUser.id}`, updatedUser).then((_) => {
        commit('UPDATE_USER', updatedUser)
      })
    },
    deleteUser({ commit }, userId) {
      axios.delete(`${baseUrl}/${userId}`).then((_) => {
        commit('DELETE_USER', userId)
      })
    }
  }
})
