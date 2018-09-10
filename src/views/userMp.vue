<template>
    <div class="glg-wrap" style="background:#f6f5f5">
    <!-- bj-->      
    	<div v-if="userInfo.userInfo.userPhoto != ''" class="glg-user-head" :style="{background:'url('+glgImg+userInfo.userInfo.userPhoto+') no-repeat 50%/100%'}">
            <h3></h3>
            <div class="glg-user-head-wrap"></div>
            <div class="glg-user-head-img" :style="{background:'url('+glgImg+userInfo.userInfo.userPhoto+') no-repeat 0/100%'}"></div>
            <p>{{userInfo.userInfo.userName}}</p>
        </div>
        <div v-if="userInfo.userInfo.userPhoto == ''" class="glg-user-head" :style="{background:'url('+userxiaoxi+') no-repeat 50%/100%'}">
            <h3></h3>
            <div class="glg-user-head-wrap"></div>
            <div class="glg-user-head-img" :style="{background:'url('+userxiaoxi+') no-repeat 0/100%'}"></div>
            <p>{{userInfo.userInfo.userName}}</p>
        </div>
        <!-- xia-->
        	<div  class="glg-user-zhanghushezhi0">
            	<router-link :to="{name:'dianpuziliao'}" tag="a" class=" glg-user-zhanghushezhixia">
                    <a href="javascript:;" style=" margin-left:5%">店铺资料</a>
                    <a  href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        		</router-link>
            </div>
            <div  class="glg-user-zhanghushezhi0" @click="gotoDetails" style=" margin-top:5px">
            	<a href="javascript:;" class=" glg-user-zhanghushezhixia">
                    <a href="javascript:;" style=" margin-left:5%">我的店铺</a>
                    <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        		</a>
            </div>
            <!-- <div  class="glg-user-zhanghushezhi0" style=" margin-top:5px"  >
            	<div  class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">店铺设置</a>
                    <a href="" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        		</div>
            </div> 
      		<div  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<div  class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">运费设置</a>
                    <a href="" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        		</div>
            </div> 
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<div  class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">申请推广</a>
                    <a href="" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        		</div>
            </div> 
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<div  class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">诚信联盟</a>
                    <a href="" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        		</div>
            </div> -->
    </div>
</template>
<script>
import userxiaoxi from '../assets/img/user-xiaoxi.jpg'
export default {
    data(){
        return {
            userInfo:{},
            glgImg:"https://api.guligou.com/",
            userxiaoxi
        }
    },
    methods:{
        gotoDetails(){
           
            if(this.userInfo.userInfo.shopId == 52 || this.userInfo.userInfo.shopId == 62 || this.userInfo.userInfo.shopId == 63){
                this.$router.push({
                    path:"/zhuanlandianpu",
                    query:{
                        shopId:this.userInfo.userInfo.shopId
                    }
                })
            }else if(this.userInfo.userInfo.shopId == 1){
                this.$router.push({
                    path:"/ziyingdianpu",
                    query:{
                        shopId:this.userInfo.userInfo.shopId
                    }
                })
            }else{
                this.$router.push({
                    path:"/dianpu",
                    query:{
                        shopId:this.userInfo.userInfo.shopId
                    }
                })
            }
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
    }
}
</script>

