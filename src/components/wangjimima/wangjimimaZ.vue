<template>
    <div class="glg-wrap">
        <div class="glg-zhanghao">
            <div class="glg-zhanghao-title">
                <p>
                    忘记登录密码？<br>
                    输入需要找回的账号
                </p>
            </div>
            <div class="glg-zhanghao-btn">
                <el-input v-model="userNo" placeholder="输入需要找回的账号"></el-input>
            </div>
            <div class="glg-zhanghao-comfire">
                <el-button 
                    style="width:100%;background:#ff5e2c;color:#fff;"
                    @click="gotoCom"
                >找回密码</el-button>
            </div>
        </div>
    </div>
</template>
<script>
let qs = require("qs")
export default {
    data(){
        return {
            userNo:''
        }
    },
    methods:{
        gotoCom(){
            if(this.userNo != ''){
                this.$http.post("https://api.guligou.com/api/users/findPass",qs.stringify({
                    step:'1',
                    loginName:this.userNo
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
                        this.$router.push({
                            path:"/wangjimimaPhone",
                            query:{
                                userPhone:data.data.userPhone
                            }
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
        }
    }
}
</script>

