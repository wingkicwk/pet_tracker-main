<template>
    <div id="app">
        <Ads v-if="!afterLogin" id="ads"></Ads>
        <!--<Bar @child2="parent2"></Bar>-->
        <!--<Map></Map>-->
        <Map></Map>
    </div>

</template>

<script>
//  import Bar from './components/Bar.vue'
  import Ads from './components/Ads.vue'
import Map from './components/Map.vue'




  export default {
    name: 'App',
    data: function () {
      return {
        afterLogin:false
      }
    },methods:{
      parent2:function (data) {
        this.afterLogin=data
      }
    },
    components: {
      Ads,
//      Bar,
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

