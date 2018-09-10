<template>
    <div class="glg-layout" style="background:#f6f5f5">
        <div  class="glg-user-zhanghushezhi0">
                <shengqingYao></shengqingYao>
        </div>
        <router-link :to="{name:'yiyaoqingyong'}" tag="a" class="glg-user-zhanghushezhi0" style=" margin-top:5px"  >
                <div  class=" glg-user-zhanghushezhixia">
                        <a style="margin-left:5%">已邀请用户</a>
                        <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
                </div>
        </router-link> 
    </div>
</template>
<script>
import shengqingYao from './shengyaoqingma'
export default {
        data(){
                return {

                }
        },
        components:{
                shengqingYao
        }
}
</script>


