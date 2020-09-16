<template>
  <div class="home">
    <div class="yt-list">
      <div  v-for="(item) in ytData.items" :key="item.id"  >
        <div v-if="item.snippet.thumbnails.high" style="margin:10px 5px;">
          <div class="yt-block" >
            <a class="position-relative" :href="devUrl+'/playvideo?videoId='+item.id">
              <img class="yt-video-img" :src="item.snippet.thumbnails.high.url" alt="">
              <span class="position-absolute yt-video-time">
                {{handleVideoTime(item.contentDetails.duration)}}
              </span>
            </a>
             <span class="text-left textover-two p18">{{item.snippet.title}}</span>
          </div>
          <button class=" btn btn-1 btn-1a" :id="'btn_collect_'+item.id"  @click="handleCollect(item)">
            <img style="width:20px;margin:0 10px;" src="https://s.verywed.com/s1/2020/09/16/1600228092_06576620b9ebd63ea5d6e9e1e7aa7af0.png" alt="">
            <span :id="'collect_'+item.id">加入收藏</span>
          </button>
        </div>
      </div>
    </div>
    <div style="display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column ">
        <span>載入中</span>
        <div class="loader"></div>
      </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'Home',
  data(){
    return{
      ytData:[],
      catchItem:[],
      devUrl: (window.location.host=="localhost:8080") ? 'http://localhost:8080' :window.location.host,
      ytDataStatus:true,
      nextPage:null,
    }
    
  },
  updated(){
    var localData = JSON.parse(localStorage.getItem('collect'));
    if(localData !=null){
      for (var i = 0; i < localData.length; i++) {
        if(localData[i].id && document.getElementById('collect_'+localData[i].id)){
          document.getElementById('collect_'+localData[i].id).innerHTML= '取消收藏'
          document.getElementById('btn_collect_'+localData[i].id).style.background= '#FB031D'
        }
      }
    }
  },
  async mounted(){
    await axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyDUllM1yxu4azkRdObu3pPfpVmeq_yuSGs')
      .then((response) => {
        this.ytData = response.data
        if(this.$store.state.youtubeList.length != 0) {
          this.ytData.items = this.$store.state.youtubeList
        }
      })
    var localData = JSON.parse(localStorage.getItem('collect'));
    if(localData !=null){
      for (var i = 0; i < localData.length; i++) {
        if(localData[i].id && document.getElementById('collect_'+localData[i].id)){
          document.getElementById('collect_'+localData[i].id).innerHTML= '取消收藏'
          document.getElementById('btn_collect_'+localData[i].id).style.background= '#FB031D'
        }
      }
    }
    window.addEventListener('scroll',this.scroll)
  },
  components: {
  },
  methods: {
    async scroll(){
      var scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
      var st = window.pageYOffset || document.documentElement.scrollTop
      if((st/scrollMaxY).toFixed(2) >= 0.95 && this.ytDataStatus){
        if(this.$store.state.youtubeList.length != 0) {
          this.ytDataStatus = false
          setTimeout(() => {
            axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyDUllM1yxu4azkRdObu3pPfpVmeq_yuSGs'+'&pageToken='+this.$store.state.nextPageToken)
            .then((response) => {
              this.ytDataStatus = true
              this.ytData.items = this.ytData.items.concat(response.data.items);
              this.ytData.nextPageToken = response.data.nextPageToken
              this.$store.commit('SET_YOUTUBELIST',this.ytData.items)
              this.$store.commit('SET_YOUTUBELIST_NEXT',response.data.nextPageToken)
            })
          },500)
        }else{
          this.ytDataStatus = false
          setTimeout(() => {
            axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyDUllM1yxu4azkRdObu3pPfpVmeq_yuSGs'+'&pageToken='+this.ytData.nextPageToken)
            .then((response) => {
              this.ytDataStatus = true
              this.ytData.items = this.ytData.items.concat(response.data.items);
              this.ytData.nextPageToken = response.data.nextPageToken
              this.$store.commit('SET_YOUTUBELIST',this.ytData.items)
              this.$store.commit('SET_YOUTUBELIST_NEXT',response.data.nextPageToken)
            })
          },500)
        }
        
      }
    },
    handleVideoTime(timeData){
      return timeData.replace('PT','').replace('H',':').replace('M',':').replace('S','')
    },
    handleCollect(item){
      var localData = JSON.parse(localStorage.getItem('collect'));
      var status = false;
      if(localData != null ){
        for(var i = 0; i < localData.length; i++) {
          if(localData[i].id === item.id) {
            status = true
            document.getElementById('collect_'+item.id).innerHTML= '加入收藏'
            document.getElementById('btn_collect_'+item.id).style.background= 'transparent'
            localData.splice(i, 1);
            localStorage.setItem('collect', JSON.stringify(localData))
          }
        }
        if(!status){
          document.getElementById('collect_'+item.id).innerHTML= '取消收藏'
          document.getElementById('btn_collect_'+item.id).style.background= '#FB031D'
          localData.push(item)
          localStorage.setItem('collect', JSON.stringify(localData))
        }
      }else{
        if(localData == null ) localData = []
        document.getElementById('collect_'+item.id).innerHTML= '取消收藏'
        document.getElementById('btn_collect_'+item.id).style.background= '#FB031D'
        localData.push(item)
        localStorage.setItem('collect', JSON.stringify(localData))
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.scroll)
  }
}
</script>
<style lang="scss">
$mob:767px;
@mixin mob() {
  @media screen and (max-width: $mob) {
    @content;
  }
}
.home{
  margin-top: 70px;
}
.yt-list{
  display:flex;
  flex-wrap: wrap;
  width:100%;
  justify-content: center;
}
.yt-collect{
  right:0;
  margin:8px 5px 0 0;
}
.yt-collectItem{
  width:100%;
  display:flex;
  justify-content:center;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #FB031D;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
