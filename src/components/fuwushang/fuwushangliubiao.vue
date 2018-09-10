<template>
    <div class="glg-wrap" style="background:#f6f5f5">
    	<div class="glg-fuwuliebiao-xuanze" >
        	<a @click="changeActive(1)" :class="{active:isActive == 1}">服务商列表</a>
            <a @click="changeActive(2)" :class="{active:isActive == 2}">商家列表</a>
            <a @click="changeActive(3)" :class="{active:isActive == 3}">会员列表</a>
        </div>
        <div class="glg-dingdangunali-shangpin" style="margin-top:2%;">
        	<div class="glg-dingdangunali-shangpin-mingzi">
        		<a v-if="userInfo.userInfo.yaoqingma != ''" style="font-size:1em">您的邀请码：{{userInfo.userInfo.yaoqingma}}</a>
                <a v-if="userInfo.userInfo.yaoqingma == ''" style="font-size:1em">您还没有的邀请码，赶紧去获取吧！</a>
            </div>
        </div>
        <div
            :key="index"
            v-for="(item,index) in dataInfo" 
        >
            <div class="glg-dingdangunali-shangpin" style="margin-top:2%;">
                <div class="glg-dingdangunali-shangpin-mingzi">
                    <a style="font-size:1em">编号：{{item.userId}}</a>
                </div>
            </div>
            <div class="glg-fuwushangliebian-bj" style=" height:90px" >
                <div  class="glg-fuwushangliebian-biankuang">
                    <div style="width:100%; float:left; margin-top:2%">
                        <span class="glg-fuwushangliebian-neirong" >
                        注册时间：{{item.createTime}}<br>
                        代理等级：{{item.isDl}}<br>
                        会员名：<a v-if="item.userName == null" style="color:#999" >未添加</a><a v-if="item.userName != null" style="color:#999" >{{item.userName}}</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let qs = require("qs")
export default {
    data(){
        return {
            userInfo:{},
            dataInfo:[],
            fuwu1:[],
            fuwu2:[],
            fuwu3:[],
            isActive:1
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
        this.$http.post("https://api.guligou.com/api/Daili/yaoqing",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => {
            console.log(data);
            this.fuwu1 = data.data.daili;
            this.fuwu2 = data.data.shop;
            this.fuwu3 = data.data.user;
            this.dataInfo = this.fuwu1
            loading.close();
        })
    },
    methods:{
        changeActive(num){
            this.isActive = num;
            if(this.isActive == 1){
                this.dataInfo = this.fuwu1;
            }else if(this.isActive == 2){
                this.dataInfo = this.fuwu2;
            }else if(this.isActive == 3){
                this.dataInfo = this.fuwu3;
            }
        }
    }
}
</script>

