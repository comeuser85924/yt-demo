import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    youtubeList:[],
    nextPageToken:null,
    youtubeUrl:null,
  },
  mutations: {
    SET_YOUTUBELIST(state, data){
      state.youtubeList = data;
    },
    SET_YOUTUBELIST_NEXT(state, data){
      state.nextPageToken = data;
    },
    SET_YOUTUBE_URL(state, data){
      state.youtubeUrl = data;
    },
  },
  actions: {
  },
  modules: {
  }
})
