<template>
    <div class="glg-wrap" style="background:#f6f5f5">
    <!-- bj-->      
    	<div class="glg-user-wode">
            <xiugai style="height:100%;width:100%;" :status="5"></xiugai>
        </div>
        <!-- xia-->
        	<div  class="glg-user-zhanghushezhi0">
            	<div  class="glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">账户：{{userInfo.userInfo.loginName}}</a>
        		</div>
            </div>
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px">
            	<div class="glg-user-zhanghushezhixia">
                    <a style="margin-left:5%">昵称</a>
                        <xiugai :status="1" style="color:#666666; float:right;margin-top:1%; margin-right:3%"></xiugai>
            	</div>
            </div> 
      		<div  class="glg-user-zhanghushezhi0" style="margin-top:5px">
            	<div  class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">姓名</a>
                    <xiugai :status="2" style="color:#666666; float:right;margin-top:1%; margin-right:3%"></xiugai>
        		</div>
            </div> 
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<div class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">性别</a>
                    <xiugai :status="3" style="color:#666666; float:right;margin-top:1%; margin-right:3%"></xiugai>
        		</div>
            </div> 
            <div  class="glg-user-zhanghushezhi0" style="margin-top:5px" >
            	<div class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">生日</a>
                    <xiugai :status="4" style="color:#666666; float:right;margin-top:1%; margin-right:3%"></xiugai>
        		</div>
            </div>
            <a class="glg-user-anniu" @click="change">更&nbsp;改</a>
            <div style="height:90px"></div>
        <!-- tabBar -->
    </div>
</template>
<script>
import xiugai from './xiugaiziliao'
import userxiaoxi from '@/assets/img/user-xiaoxi.jpg'
let qs = require("qs");
export default {
    data(){
        return {
            infos:{},
            userInfo:{},
            userxiaoxi
        }
    },
    components:{
       xiugai 
    },
    computed:{
        getuserInfo(){
            return this.$store.state.changeUserInfo
        }
    },
    methods:{
        change(){
            this.infos = this.getuserInfo;
            if(this.infos.brithday){
                this.infos.brithday = this.infos.brithday.getFullYear() +'-'+(this.infos.brithday.getMonth()+1) +'-'+this.infos.brithday.getDate();
            }else{
                this.infos.brithday = this.userInfo.userInfo.brithday
            }
            if(!this.infos.userName){
                this.infos.userName = this.userInfo.userInfo.userName
            }
            if(!this.infos.trueName){
                this.infos.trueName = this.userInfo.userInfo.trueName
            }
            if(!this.infos.userSex){
                this.infos.userSex = this.userInfo.userInfo.userSex
            }
            if(!this.infos.userPhoto){
                this.infos.userPhoto = this.userInfo.userInfo.userPhoto
            }
            this.$http.post('https://api.guligou.com/api/Users/toEdit.html',qs.stringify({
                token:this.userInfo.userInfo.toKen,
                userName:this.infos.userName,
                trueName:this.infos.trueName,
                brithday:this.infos.brithday,
                userSex:this.infos.userSex,
                userPhoto:this.infos.userPhoto
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
                    this.$http.post("https://api.guligou.com/api/Users/getById.html",qs.stringify({
                        token:this.userInfo.userInfo.toKen,
                    }))
                    .then((data) => {
                        this.$local.save("glg",{
                            login:true,
                            userInfo :data.data
                        })
                        window.location.reload();
                    })
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
    created(){
        this.userInfo = this.$local.fetch("glg");
        this.infos = this.$store.state.changeUserInfo;
        if(this.userInfo.userInfo.userPhoto == ''){
            this.userInfo.userInfo.userPhoto == this.userxiaoxi;
        }
    }
}
</script>

