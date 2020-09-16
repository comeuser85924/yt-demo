<template>
  <div id="app" >
    <header class="headerBar">
      <router-link to="/" class="headerHome" alt="Youtube" title="Youtube">
        <img style="width:80px" src="https://s.verywed.com/s1/2020/09/16/1600224519_2424bad6734eae41873e9e60675c51a6.png" alt="">
      </router-link>
      
      <router-link class="headerCollect" to="/collect" alt="我的收藏" title="我的收藏">
        <img style="width:24px" src="https://s.verywed.com/s1/2020/09/16/1600228092_06576620b9ebd63ea5d6e9e1e7aa7af0.png" alt="">
      </router-link>
    </header>
    <router-view/>
  </div>
</template>
<script>

export default {
  name:'app',
  data() {
    return {
    }
  },
  methods:{
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
