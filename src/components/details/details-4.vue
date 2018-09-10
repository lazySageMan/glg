<template>
<div class="glg-wrap">
  <listTop></listTop>
  <div v-html="suyuan"></div>
</div>
</template>
<script>
import listTop from './list-top'
export default {
  props:{
    id:{
      type:Number,
      default:490
    }
  },
  data(){
    return {
      suyuan:""
    }
  },
  components:{listTop},
  created() {
    this.$http.get(`https://api.guligou.com/api/goods/detail/id/${this.id}`)
    .then((data) => {
      console.log(data.data);
      if(data.data.suxyuanxinxi == null){
          this.suyuan = "暂时没有相关信息";
      }else{
        this.suyuan = data.data.suxyuanxinxi
      }
    })
  },
}
</script>

