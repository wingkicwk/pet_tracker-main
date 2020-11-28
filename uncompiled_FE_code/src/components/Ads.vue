<template>
    <el-carousel indicator-position="outside" :autoplay="true" height="80px" :interval="2000">
        <el-carousel-item v-for="item in adSpace" :key="item">
           <h4>{{item}}</h4>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
  export default {
    name: "Ads",
    data() {
      return {
        adSpace: ['Advertising space for rent :)', 'Great opportunity!', 'lovely position!', 'Call for BEST price']
      }
    },
    components: {}
  }
</script>

<style>
    .content {
        height: 80px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
