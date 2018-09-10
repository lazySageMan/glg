<template>
    <div class="glg-wrap" style="background:#f6f5f5">
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
        	<router-link tag="div" :to="{name:'ziliaoshezhi'}" class="glg-user-zhanghushezhi0">
            	<div  class=" glg-user-zhanghushezhixia">
                    <span  style=" margin-left:5%">用户资料</span>
                    <span style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</div>
            </router-link>
            <router-link tag="div" :to="{name:'shouhuodizhi'}"  class="glg-user-zhanghushezhi0" style=" margin-top:5px"  >
            	<div  class=" glg-user-zhanghushezhixia">
                    <span style=" margin-left:5%">收货地址</span>
                    <span href="" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</div>
            </router-link> 
      		<router-link tag="div" :to="{name:'anquanshezhi'}"  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<div  class=" glg-user-zhanghushezhixia">
                    <span style=" margin-left:5%">安全设置</span>
                    <span href="" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</div>
            </router-link> 
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px">
            	<div @click="lgout" class=" glg-user-zhanghushezhixia">
                    <span style=" margin-left:5%">退出账户</span>
                    <span href="" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</div>
            </div> 
            
        <!-- tabBar -->
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
    created() {
        this.userInfo = this.$local.fetch("glg");
    },
    methods:{
        lgout(){
            this.$local.save("glg","");
            this.$notify({
                type: 'success',
                title:'成功提醒',
                message:'退出成功',
                duration:2500,
                showClose:false
            });
            this.$router.push("/");
            // window.location.reload();
        },
    }
}
</script>
