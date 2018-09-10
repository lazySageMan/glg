<template>
    <div class="glg-layout" >
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
        <div  class="glg-user-dianpuziliao0" style=" height:280px" >
        	<div  class=" glg-user-dianpuziliao" style=" height:100%">
            	<span style=" margin-left:5%; line-height:35px; height:100%; width:100%">
                    店铺编号：{{userInfo.userInfo.shopSn}}<br>
                    店铺名称：{{userInfo.userInfo.shopName}}<br>
                    店主姓名：{{userInfo.userInfo.shopkeeper}}<br>  
                    店主手机：{{userInfo.userInfo.shopTel}}<br>
                    公司名称：{{userInfo.userInfo.shopCompany}}<br>
                    <!-- 认证类型：保真保底、诚信联盟<br> -->
                    店铺地址：{{userInfo.userInfo.shopAddress}}<br>
                    是否提供发票：{{fapiao}}
                </span>

        	</div>
        </div>
    </div>
</template>
<script>
import userxiaoxi from '@/assets/img/user-xiaoxi.jpg'
export default {
    data(){
        return {
            userInfo:{},
            glgImg:"https://api.guligou.com/",
            userxiaoxi
        }
    },
    computed:{
        fapiao(){
            if(this.userInfo.userInfo.invoiceRemarks != ''){
                return "提供"
            }else{
                return "不提供"
            }
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
    }
}
</script>

