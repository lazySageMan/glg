<template>
  <div class="glg-wrap">
      <search @getSearchData="getInputList"></search>
      <div class="glg-list1">
          <div :class="{active : isActive ==0}" @click="select(0)">推荐</div>
          <div :class="{active : isActive ==1}" @click="select(1)">销量</div>
          <div :class="{active : isActive ==2}" @click="select(2)">价格</div>
          <div :class="{active : isActive ==3}" @click="select(3)">促销</div>
      </div>
      <!-- shops -->
      <div class="glg-shops">
          <div
            class="glg-shops-item"
            v-for="(item,index) in shopsList"
            :key="index"
            @click="gotoDetails(item.goodsId)"
          >
              <div
                class="glg-shops-item-img"
                :style="{background:'url('+getImg+item.goodsImg+') no-repeat 50%/cover'}"
              >
              </div>
              <p class="glg-shops-item-s">{{item.shopName}}</p>
              <h3>{{item.goodsName}}</h3>
              <div class="glg-shops-item-p">
                  <p>{{item.shopPrice}}
                      <span>￥</span>
                  </p>
                  <div>已售{{item.saleNum}}件</div>
              </div>
          </div>
          <div class="clearFloat"></div>
      </div>
      <div class="address" v-if="showAddress">已经到底了</div>
  </div>
</template>
<script>
// import getShopList from '@/lib/searchData'
import search from '@/components/searchShops'
export default {
  data(){
    return {
      shopsList:[],
      isActive:0,
      getImg:"https://api.guligou.com/",
      catId:this.$route.query,
      page:2,
      off:true,
      showAddress:false
    }
  },
  methods: {
    select(num){
      this.isActive=num;
      this.page = 2;
      console.log(this.catId);
      if(num == 0){//这边前端可以自行排序，可以降低耗能  默认

        if(this.catId.keyword){
          console.log(this.catId.keyword)
          this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }else if(this.catId.cat){
          console.log(1)
          this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }
      }else if( num ==1 ){//销量
        if(this.catId.keyword){
          this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}&orderBy=0&order=1&areaId=0`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }else if(this.catId.cat){
          this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}&orderBy=0&order=1&areaId=0`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }
      }else if(num == 2){//价格
        if(this.catId.keyword){
          this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}&orderBy=1&order=0&areaId=0`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }else if(this.catId.cat){
          this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}&orderBy=1&order=0&areaId=0`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }
      }else{//新品
        if(this.catId.keyword){
          this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}&order=1&areaId=0&isNew=1`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }else if(this.catId.cat){
          this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}&order=1&areaId=0&isNew=1`)
          .then( (data) => {
            this.shopsList = data.data.goodsPage.Rows;
          } )
        }
      }
    },
    gotoDetails(shopId){
      this.$store.commit("changeShopId",shopId);
      this.$router.push({
        name:"detailsS",
        query: {  //如果用params传递参数的话必须用name:
            id: shopId
        }
      });
    },
    getInputList(searchList){  //接受子组件传过来的数据
      this.catId = this.$route.query;
      this.shopsList = searchList;
    }

  },
  created() { //在这里加载初始化数据
  let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass:'changeFontFamily'
		})
    if(this.catId.cat){
      this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}:&brand=${this.catId.brandId}?`)
      .then((data) => {
        this.shopsList = data.data.goodsPage.Rows;
        loading.close();
      })
    }else if(this.catId.keyword){
      this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}`)
      .then((data) => {
        if(data.data.goodsPage.Rows.length == 0){
            this.$notify({
              type: 'error',
              title:'错误提醒',
              message:'什么都没有，换个搜索试试',
              duration:2500,
              showClose:false
            });
          this.$router.back();
        }else{
          this.shopsList = data.data.goodsPage.Rows;
          loading.close();
        }
      })
    }else{
        this.$http.get(`https://api.guligou.com/api/goods/lists.html?orderBy=0&order=1&areaId=0`)
        .then((data) => {

          if(data.data.goodsPage.Rows.length == 0){
            
          }else{
            this.shopsList = data.data.goodsPage.Rows;
            this.isActive = 1;
            loading.close()
          }
        })
    }
  },
  mounted() {
    window.addEventListener("scroll",() =>{//滚动条滚动的时候
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let willDo = document.documentElement.scrollHeight - scrollTop;
      if(willDo<750 && this.off){//判断滚动条位置
        this.off=false;
        if(this.isActive == 0){
          if(this.catId.keyword){
            this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}&page=${this.page}`)
            .then( (data) => {
              // console.log(this.page);
              if(data.data.goodsPage.Rows.length == 0){
                console.log("请求为空")
                this.off=true;
                this.showAddress = true;
              }else{
                let getList = data.data.goodsPage.Rows;
                getList.forEach((item) => {
                  this.shopsList.push(item);
                });
                this.page++;
                this.off=true;
                // console.log(this.off)
              }
            })
          .catch((error) => {
            console.log(error);
          })
          }else if(this.catId.cat){
            this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}&brand=${this.catId.brandId}&page=${this.page}`)
            .then( (data) => {
              // console.log(this.page);
              if(data.data.goodsPage.Rows.length == 0){
                console.log("请求为空")
                this.off=true;
                this.showAddress = true;
              }else{
                let getList = data.data.goodsPage.Rows;
                getList.forEach((item) => {
                  this.shopsList.push(item);
                });
                this.page++;
                this.off=true;
                // console.log(this.off)
              }
            })
            .catch((error) => {
              console.log(error);
            })
          }
        }else if(this.isActive == 1){
          if(this.catId.keyword){
            this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}&page=${this.page}&orderBy=0&order=1&areaId=0`)
            .then( (data) => {
              // console.log(this.page);
              if(data.data.goodsPage.Rows.length == 0){
                console.log("请求为空")
                this.off=true;
                this.showAddress = true;
              }else{
                let getList = data.data.goodsPage.Rows;
                getList.forEach((item) => {
                  this.shopsList.push(item);
                });
                this.page++;
                this.off=true;
                // console.log(this.off)
              }
            })
            .catch((error) => {
              console.log(error);
            })
          }else if(this.catId.cat){
            this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}&brand=${this.catId.brandId}&page=${this.page}&orderBy=0&order=1&areaId=0`)
            .then( (data) => {
              // console.log(this.page);
              if(data.data.goodsPage.Rows.length == 0){
                console.log("请求为空")
                this.off=true;
                this.showAddress = true;
              }else{
                let getList = data.data.goodsPage.Rows;
                getList.forEach((item) => {
                  this.shopsList.push(item);
                });
                this.page++;
                this.off=true;
                // console.log(this.off)
              }
            })
            .catch((error) => {
              console.log(error);
            })
          }
        }else if(this.isActive == 2){
          if(this.catId.keyword){
            this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}&page=${this.page}&orderBy=1&order=0&areaId=0`)
            .then( (data) => {
              // console.log(this.page);
              if(data.data.goodsPage.Rows.length == 0){
                console.log("请求为空")
                this.off=true;
                this.showAddress = true;
              }else{
                let getList = data.data.goodsPage.Rows;
                getList.forEach((item) => {
                  this.shopsList.push(item);
                });
                this.page++;
                this.off=true;
                // console.log(this.off)
              }
            })
            .catch((error) => {
              console.log(error);
            })
          }else if(this.catId.cat){
            this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}&brand=${this.catId.brandId}&page=${this.page}&orderBy=1&order=0&areaId=0`)
            .then( (data) => {
              // console.log(this.page);
              if(data.data.goodsPage.Rows.length == 0){
                console.log("请求为空")
                this.off=true;
                this.showAddress = true;
              }else{
                let getList = data.data.goodsPage.Rows;
                getList.forEach((item) => {
                  this.shopsList.push(item);
                });
                this.page++;
                this.off=true;
                // console.log(this.off)
              }
            })
            .catch((error) => {
              console.log(error);
            })
          }
        }else if(this.isActive == 3){
          if(this.catId.keyword){
            this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.catId.keyword}&page=${this.page}&order=1&areaId=0&isNew=1`)
          .then( (data) => {
            // console.log(this.page);
            if(data.data.goodsPage.Rows.length == 0){
              console.log("请求为空")
              this.off=true;
              this.showAddress = true;
            }else{
              let getList = data.data.goodsPage.Rows;
              getList.forEach((item) => {
                this.shopsList.push(item);
              });
              this.page++;
              this.off=true;
              // console.log(this.off)
            }
          })
          .catch((error) => {
            console.log(error);
          })
          }else if(this.catId.cat){

            this.$http.get(`https://api.guligou.com/api/goods/lists?cat=${this.catId.cat}&brand=${this.catId.brandId}&page=${this.page}&order=1&areaId=0&isNew=1`)
            .then( (data) => {
              // console.log(this.page);
              if(data.data.goodsPage.Rows.length == 0){
                console.log("请求为空")
                this.off=true;
                this.showAddress = true;
              }else{
                let getList = data.data.goodsPage.Rows;
                getList.forEach((item) => {
                  this.shopsList.push(item);
                });
                this.page++;
                this.off=true;
                // console.log(this.off)
              }
            })
            .catch((error) => {
              console.log(error);
            })
          }
        }
      }
    },false);
  },
  beforeDestroy(){
    window.addEventListener("scroll",null);
  },
  components:{search}
}
</script>

