<template>
    <div class="glg-wrap" style="background:#f6f5f5">
        <!--商品1 -->
    	<swiper 
            class="glg-wodexiaoxi-bj"
            ref="mySwiper"
            :options="swiperOption"
            :key="index"
            v-for="(item,index) in messageInfo"
            @click="gotoMessage(item.id,item.msgStatus)"
        >
        	<swiperSlide class="glg-wodexiaoxi-shangpin">
        		<img src="../../assets/img/user-xiaoxi.jpg" width="19%" style=" margin-top:2%;float:left">
                <div class="glg-swodexiaoxi-dianpu">
                	<a>鼓励购自营店</a>
                    <span :class="{weiduxiaoxi:item.msgStatus == 0}">{{item.createTime}}</span>
                    <p>{{item.msgContent}}</p>
                </div>
        	</swiperSlide>
            <swiperSlide style="width:180px;height:100%">
                <div 
                    class="xiaoxichakan"
                    style="background:orange;"
                    v-if="item.msgStatus == 1"
                >已读</div>
                <div 
                    class="xiaoxichakan"
                    style="background:orange;"
                    @click="gotoMessage(item.id,item.msgStatus)"
                    v-if="item.msgStatus == 0"
                >未读</div>
                <div 
                    class="xiaoxichakan"
                    style="background:red"
                    @click="deletes(item.id,item.msgStatus)"
                >删除</div>
            </swiperSlide>
            
        </swiper>
    </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
let qs = require("qs");
export default {
    data(){
        return {
            swiperOption:{
                slidesPerView:'auto',
                autoHeight:true,
                resistanceRatio:0
            },
            messageInfo:[],
            userInfo:{},
            off:true,
            page:2
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/messages/pageQuery",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => {
            this.messageInfo = data.data.Rows;
             console.log(this.messageInfo)
        })
    },
    mounted() {
         window.addEventListener("scroll",() =>{//滚动条滚动的时候
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let willDo = document.documentElement.scrollHeight - scrollTop;
            if(willDo<750 && this.off){//判断滚动条位置
                this.off = false;
                this.$http.post(`https://api.guligou.com/api/messages/pageQuery`,qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    page:this.page
                }))
                .then( (data) => {
                console.log(data);
                    if(data.data.Rows.length == 0){
                        console.log("请求为空")
                        this.off=true;
                        this.showAddress = true;
                    }else{
                        let getList = data.data.Rows;
                        getList.forEach((item) => {
                        this.messageInfo.push(item);
                        });
                        this.page++;
                        this.off=true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
         })
    },
    methods:{

        gotoMessage(id,msgStatus){
            if(msgStatus == 0){
                this.$http.post("https://api.guligou.com/api/messages/batchRead",qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    id:id
                }))
                .then((data) => {
                    console.log(data)
                })
            }
            this.$router.push({
                path:"/xiaoxiDetails",
                query:{
                    id:id
                }
            })
        },
        deletes(id){
            this.$http.post("https://api.guligou.com/api/messages/del",qs.stringify({
                token:this.userInfo.userInfo.toKen,
                id:id
            }))
            .then((data) => {
                if(data.data.status == 1){
                    this.$notify({
                        type: 'success',
                        title:'成功提醒',
                        message:data.data.msg,
                        duration:2500,
                        showClose:false
                    });
                    window.location.reload();
                }else{
                    this.$notify({
                        type: 'error',
                        title:'错误提醒',
                        message:data.data.msg,
                        duration:2500,
                        showClose:false
                    });
                }
            })
        }
    },
    beforeDestroy(){
        window.addEventListener("scroll",null);
    },
    components:{
        swiper,
        swiperSlide
    }
}
</script>

