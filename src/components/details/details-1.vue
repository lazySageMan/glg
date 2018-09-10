<template>
  <div class="glg-wrap">
    <listTop></listTop>
    <div class="glg-choose">
            <div class="glg-choose-title">选择评价类型</div>
            <div class="glg-choose-list">
                <div @click="chooseC(0)" :class="{active: num==0}" class="glg-choose-list-item">全部评价</div>
                <div @click="chooseC(1)" :class="{active: num==1}" class="glg-choose-list-item">评价带图</div>
                <div @click="chooseC(2)" :class="{active: num==2}" class="glg-choose-list-item">好评</div>
                <div @click="chooseC(3)" :class="{active: num==3}" class="glg-choose-list-item">中评</div>
                <div @click="chooseC(4)" :class="{active: num==4}" class="glg-choose-list-item">差评</div>
            </div>
    </div>
    <div class="glg-ass">
              <div
                class="glg-ass-w-content"
                :key="index"
                v-for="(item,index) in rows"
              >
                  <div class="glg-ass-w">
                      <div class="glg-ass-w-content-u">
                          <div
                            class="glg-ass-w-content-u-h"
                            :style="{background: 'url('+glgImg+item.userPhoto+') no-repeat 0/cover'}"
                          ></div>
                          <div class="glg-ass-w-content-u-n">{{item.loginName}}</div>
                          <div class="glg-ass-w-content-u-p"></div>
                      </div>
                      <div class="glg-ass-w-content-p">{{item.content}}</div>
                      <div class="glg-ass-w-content-img">
                          <div
                            :key="indexs"
                            v-for="(items,indexs) in item.images"
                          >
                            <img
                              :key="indexs"
                              :src="glgImg+items" 
                              v-preview="glgImg+items"
                              preview-title-enable="true"
                              preview-nav-enable="true"
                              style="width:100%;height:100%"
                            >
                          </div>
                      </div>
                      <div class="glg-ass-w-content-time">{{item.createTime +' '+ item.shopName}}</div>
                  </div>
              </div>

          </div>
    </div>
</template>
<script>
let qs = require("qs");
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
      rows:{},
      glgImg:"https://api.guligou.com/",
      num:0,
      pingjiaTu:[]
    }
  },
  components:{
    listTop
  },
  methods:{
    chooseC(n){
      this.num = n;
      if(n == 0){
        //渲染全部评论
        this.$http.post(`https://api.guligou.com/api/goodsappraises/getById`,qs.stringify({
          goodsId : this.shopId,
          anonymous: 1,
          type:"all"
        }))
        .then((data) => {
          this.rows=data.data.data.Rows;
          this.rows.forEach((item) => {
            if(item.images){
              item.images = item.images.split(",");
            }else{
              console.log("改评价没有图片");
            }
          })
        })
      }else if(n == 1){
        this.$http.post(`https://api.guligou.com/api/goodsappraises/getById`,qs.stringify({
          goodsId : this.shopId,
          anonymous: 1,
          type:"pic"
        }))
        .then((data) => {
          this.rows=data.data.data.Rows;
          this.rows.forEach((item) => {
            if(item.images){
              item.images = item.images.split(",");
            }else{
              console.log("改评价没有图片");
            }
          })

        })
      }else if(n == 2){
        this.$http.post(`https://api.guligou.com/api/goodsappraises/getById`,qs.stringify({
          goodsId : this.shopId,
          anonymous: 1,
          type:"best"
        }))
        .then((data) => {
          this.rows=data.data.data.Rows;
          this.rows.forEach((item) => {
            if(item.images){
              item.images = item.images.split(",");
            }else{
              console.log("改评价没有图片");
            }
          })
        })
      }else if(n == 3){
        this.$http.post(`https://api.guligou.com/api/goodsappraises/getById`,qs.stringify({
          goodsId : this.shopId,
          anonymous: 1,
          type:"good"
        }))
        .then((data) => {
          this.rows=data.data.data.Rows;
          this.rows.forEach((item) => {
            if(item.images){
              item.images = item.images.split(",");
            }else{
              console.log("改评价没有图片");
            }
          })
        })
      }else if(4){
        this.$http.post(`https://api.guligou.com/api/goodsappraises/getById`,qs.stringify({
          goodsId : this.shopId,
          anonymous: 1,
          type:"bad"
        }))
        .then((data) => {
          this.rows=data.data.data.Rows;
          this.rows.forEach((item) => {
            if(item.images){
              item.images = item.images.split(",");
            }else{
              console.log("改评价没有图片");
            }
          })
        })
      }
    }
  },
  created() {
    console.log(this.shopId);
    this.$http.post(`https://api.guligou.com/api/goodsappraises/getById`,qs.stringify({
      goodsId : this.shopId,
      anonymous: 1,
      type:"all"
    }))
    .then((data) => {
      this.rows=data.data.data.Rows;
      this.rows.forEach((item) => {
        if(item.images){
          item.images = item.images.split(",");
        }else{
          console.log("改评价没有图片");
        }
      })
    })
  },
}
</script>

