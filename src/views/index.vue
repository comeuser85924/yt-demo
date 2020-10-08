<template>
  <div>
      <headerBar></headerBar>
      <router-view/>
  </div>
</template>
<script>
import headerBar from '../components/all/header.vue';
export default {
  name:'app',
  data() {
    return {
      searchValue:null,
    }
  },
  components: {
      headerBar,
  },
  mounted(){
  },
  methods:{

  }
}
</script>
<style lang="scss">


</style>
