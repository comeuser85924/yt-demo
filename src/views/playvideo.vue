<template>
  <div class="playvideo">
      <video
        id="vid1"
        class="video-js vjs-default-skin yt-video"
        controls
        autoplay
        :data-setup='dataSetup'
      >
      </video>
      <p class="text-left p22 bold" >{{ ytTitle }}</p>
      <p class="text-left">{{ ytDescription }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'playvideo',
  data() {
    return {
        dataSetup:{},
        ytData:[],
        ytTitle:null,
        ytDescription:null,
        ytUrl:'https://www.googleapis.com/youtube/v3/videos?id='+this.$route.query.videoId+'&key=AIzaSyDiX_hFkzy9enM7e4eh1oWovmTb0a0r4Mc&part=snippet',
    }
  },
   beforeMount() {
     axios.get(this.ytUrl)
    .then((response) => {
      this.ytData = response.data
      this.ytTitle = response.data.items[0].snippet.localized.title
      this.ytDescription = response.data.items[0].snippet.localized.description
      var date = new Date(response.data.items[0].snippet.publishedAt);
    })
  },
  mounted(){
    this.dataSetup = '{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/embed/'+this.$route.query.videoId+'"}] }'
  },
  methods: {
   
  }
}
</script>

<style scoped lang="scss">
$mob:767px;
@mixin mob() {
  @media screen and (max-width: $mob) {
    @content;
  }
}
.playvideo{
  margin:70px auto;
  width:640px;
  @include mob {
    width:100%;
  }
}
.video-js{
    display: inline-block;
}
.vid1-dimensions{
  width: 100%;
  height: 400px;
  @include mob {
    width: 100%;
  }
}
</style>
