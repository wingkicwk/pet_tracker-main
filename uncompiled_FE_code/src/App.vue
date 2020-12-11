<template>
    <div id="app">
        <Ads v-if="!afterLogin" id="ads"></Ads>
        <Map @status="changeStatus"></Map>
    </div>

</template>

<script>

  import Ads from './components/Ads.vue'
import Map from './components/Map.vue'




  export default {
    name: 'App',
    data: function () {
      return {
        afterLogin:false
      }
    },methods:{

      changeStatus:function (data) {
        if(data!="null"){
          this.afterLogin=true
        }else{
          this.afterLogin=false
        }
      }
    },
    components: {
      Ads,
      Map
    }
  }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 30px;
    }
    #ads{
        margin-top: -24px;
        margin-bottom:6px;
    }
</style>

