<template>
    <div class="glg-wrap" style="background:#f6f5f5" >
    <!-- bj-->
    	<div class="glg-user-wode" style="height:120px">
        	<div style=" background-color:#ff5e2c; width:100%; height:100%; ">
            <div style="height:25%;"></div> 
            	<div class="glg-user-shoucang" >
                	  <a>{{sD}}</a>
                      <div style="height:24%;"></div> 
                      <span>商品收藏</span>      
                </div> 
                <div class="glg-user-shoucang" >
                	  <a>{{sP}}</a>
                      <div style="height:24%;"></div> 
                      <span>商家收藏</span>      
                </div>  
            </div>
        </div>
        <!-- xia-->
        	<div  class="glg-user-zhanghushezhi0">
            	<router-link tag="div" :to="{name:'shouchangP'}" class=" glg-user-zhanghushezhixia">
                    <span style=" margin-left:5%">商品收藏</span>
                    <span style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</router-link>
            </div>
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px"  >
            	<router-link tag="div" :to="{name:'shouchang'}" class=" glg-user-zhanghushezhixia">
                    <span style=" margin-left:5%">商家收藏</span>
                    <span style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</router-link>
            </div>                     
    </div>
</template>
<script>
let qs = require("qs");
export default {
    data(){
        return {
            userInfo:{},
            shop:[],
            shopD:[]
        }
    },
    computed:{
        sD(){
            return this.shop.length;
        },
        sP(){
            return this.shopD.length;
        }
    },
    created(){
        let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass:'changeFontFamily'
		})
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/favorites/listGoodsQuery",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => { //收藏商品
            for(var key in data.data){
                if(key != 'status') {
                    this.shop = data.data[key].Rows;
                }
            }
        })
        this.$http.post("https://api.guligou.com/api/favorites/listShopQuery",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => { //收藏店铺c
            for(var key in data.data){
                if(key != 'status') {
                    this.shopD = data.data[key].Rows;
                    loading.close();
                }
            }
        })
    }
}
</script>
