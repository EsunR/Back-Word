import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    processing: false,
    form: {
      getUpTime: "",
      sleepTime: "",
      game: [],
      read: [],
      video: [],
      sport: [],
      music: [],
      religion: "",
      quite: "",
      noise: "",
      sound: "",
      stay: ""
    }
  },
  mutations: {
    setValue(state, obj) {
      for (let key in obj) {
        state[key] = obj[key];
      }
    },
    setFormValue(state, obj) {
      for (let key in obj) {
        state.form[key] = obj[key];
      }
    }
  },
  actions: {

  }
})
