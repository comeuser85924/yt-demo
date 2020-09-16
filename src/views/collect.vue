<template>
  <div class="collect">
    <H1 >收藏列表</H1>
    <div class="flex-center">
      <div  v-for="(item) in ytData" :key="item.id" style="margin:10px 5px;" >
          <div class="yt-block" >
            <a class="position-relative" :href="devUrl+'/playvideo?videoId='+item.id">
              <img class="yt-video-img" :src="item.snippet.thumbnails.high.url" alt="">
              <span class="position-absolute yt-video-time">
                {{handleVideoTime(item.contentDetails.duration)}}
              </span>
            </a>
             <span class="text-left textover-two p18">{{item.snippet.title}}</span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'collect',
  data(){
    return{
      ytData:JSON.parse(localStorage.getItem('collect')),
      catchItem:[],
      devUrl: (window.location.host=="localhost:8080") ? 'http://localhost:8080' :window.location.host,
    }
  },
  async mounted(){
    this.ytData = JSON.parse(localStorage.getItem('collect'));
  },
   methods: {
    handleVideoTime(timeData){
      return timeData.replace('PT','').replace('H',':').replace('M',':').replace('S','')
    },
   }
}
</script>
<style lang="scss">
  .collect{
    margin-top: 70px;
  }
  .flex-center{
    display:flex;
    flex-wrap: wrap;
    width:100%;
    justify-content: center;
  }
  .textover-two{
    font-weight: bold;
    width:300px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
  }
  .yt-collect{
    right:0;
    margin:8px 5px 0 0;
  }
</style>