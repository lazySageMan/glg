<template>
    <div class="glg-wrap" style="background:#f6f5f5">
        <div v-if="userInfo.userInfo.isDl">
            <div class="glg-user-zhanghushezhi0">
                <router-link to="/tixianguan" tag="a" style="display:block" class="glg-user-zhanghushezhixia">
                    <a href="javascript:;" style="margin-left:5%">我的钱包</a>
                    <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
                </router-link>
            </div>
            <div class="glg-user-zhanghushezhi0" style=" margin-top:5px"  >
                <router-link to="/fuwushangliubiao" tag="a" style="display:block" class="glg-user-zhanghushezhixia">
                    <a href="javascript:;" style=" margin-left:5%">邀请管理</a>
                    <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
                </router-link>
            </div> 
            <div class="glg-user-zhanghushezhi0" style=" margin-top:5px">
                <router-link to="/zaixiankefu" tag="a" style="display:block" class=" glg-user-zhanghushezhixia">
                    <a href="javascript:;" style="margin-left:5%">在线客服</a>
                    <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
                </router-link>
            </div>
            <div class="glg-user-zhanghushezhi0" style=" margin-top:5px"  >
                <router-link to="/zijingliushui" tag="a" style="display:block"  class=" glg-user-zhanghushezhixia">
                    <a href="javascript:;" style=" margin-left:5%">资金流水</a>
                    <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
                </router-link>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userInfo:{}
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
    }
}
</script>

