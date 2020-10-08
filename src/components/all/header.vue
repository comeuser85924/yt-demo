<template>
  <div>
    <header class="headerBar">
      <router-link to="/" class="headerHome" alt="Youtube" title="Youtube">
        <img style="width:80px" src="https://s.verywed.com/s1/2020/09/16/1600224519_2424bad6734eae41873e9e60675c51a6.png" alt="">
      </router-link>
      <div>
        <input type="text" v-model="searchValue">
        <button @click="search">搜尋</button>
      </div>
      <router-link class="headerCollect" to="/collect" alt="我的收藏" title="我的收藏">
        <img style="width:24px" src="https://s.verywed.com/s1/2020/09/16/1600228092_06576620b9ebd63ea5d6e9e1e7aa7af0.png" alt="">
      </router-link>
    </header>
     
  </div>
</template>
<script>

export default {
  name:'headerBars',
  data() {
    return {
      searchValue:null,
    }
  },
  methods:{
    search(){
      // this.$store.commit('SET_YOUTUBE_URL', 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+this.searchValue+'&key=AIzaSyDiX_hFkzy9enM7e4eh1oWovmTb0a0r4Mc&type=video&maxResults=12')
      // this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">

.headerBar{
  background:#fff;
  position: fixed;;
  width:100%;
  height:70px;
  top:0px;
  left:0;
  z-index:50;
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.headerHome{
  padding:0 15px 0 15px;
}
.headerCollect{
  height: 100%;
  display: flex;
  align-items: center;
  padding:0 15px 0 15px;
}
.headerCollect:hover{
  background:#F9F9F9;
}
</style>
