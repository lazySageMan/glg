<template>
    <div class="glg-wrap" style="background:#f6f5f5;">
    <!-- bj-->      
    	<div class="glg-user-wode" style="height:180px">
        	<div style=" background-color:#ff5e2c; width:100%; height:100%; ">
            	<div class="glg-user-zijinguanli-yue">
                	<div style="height:24%;"></div>   
                    <span>账户余额</span>
                    <div style="height:24%;"></div>
                    <a>{{userInfo.userInfo.userMoney}}</a>
                    
                </div>   
            </div>
        </div>
        <!-- xia-->
        	<div  class="glg-user-zhanghushezhi0">
                <shengqingtixian></shengqingtixian>
            </div>
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px"  >
            	<router-link tag="div" :to="{name:'tixianjilu'}" class=" glg-user-zhanghushezhixia">
                    <span style=" margin-left:5%">提现记录</span>
                    <span style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</router-link>
            </div> 
      		<!-- <div  class="glg-user-zhanghushezhi0" style="margin-top:5px"  >
            	<router-link tag="div" :to="{name:'tixianzhanghao'}" class=" glg-user-zhanghushezhixia">
                    <span style=" margin-left:5%">提现账号</span>
                    <span style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
        		</router-link>
            </div>  -->
    </div>
</template>
<script>
let qs = require("qs");
import shengqingtixian from './shengqingtixian'
export default {
    data(){
        return {
            userInfo:{}
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/Users/getById.html",qs.stringify({
            token:this.userInfo.userInfo.toKen,
        }))
        .then((data) => {
            this.$local.save("glg",{
                login:true,
                userInfo:data.data
            })
            this.userInfo = this.$local.fetch("glg");
        })
    },
    components:{
        shengqingtixian
    }
}
</script>
