<template>
    <div class="glg-wrap">
        <!-- header -->
        <listTop></listTop>
        <!-- 轮播图 -->
        <div v-html="details" class="xiangqin"></div>
    </div>
</template>
<script>
import listTop from './list-top'
export default {
  props:{
    shopId:{
      type:Number,
      default:490
    }
  },
  data(){
    return {
      details:""
    }
  },
  components:{listTop},
  created() {
    this.$http.get(`https://api.guligou.com/api/goods/detail/id/${this.shopId}`)
    .then((data) => {
      this.details = data.data.goodsDesc
    })
  },
}
</script>


