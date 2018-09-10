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
            	<changePass></changePass>
            </div>
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px">
                <xiugaiZhidu></xiugaiZhidu>
            </div>
      		<!-- <div  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<yanzheng :status="0"></yanzheng>
            </div> -->
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<yanzheng :status="1"></yanzheng>
            </div>
    </div>
</template>
<script>
import changePass from './xiugaiPass'
import yanzheng from './yanzheng'
import xiugaiZhidu from './xiugaiZhidu'
import userxiaoxi from '../../assets/img/user-xiaoxi.jpg'
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
    components:{
        changePass,
        yanzheng,
        xiugaiZhidu
    }
}
</script>

