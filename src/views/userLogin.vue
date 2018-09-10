<template>
    <div class="glg-wrap">
        <section class="glg-logo">
            <div class="glg-logo-all">
                <div class="glg-logo-all-img"></div>
            </div>
        </section>
        <section class="glg-main">
            <div class="glg-main-btn">
                <div class="glg-main-btn-inp">
                    <div class="glg-main-btn-inp-n">
                        <p></p>
                        <input type="text" placeholder="手机号" ref="userName"/>
                    </div>
                    <div class="glg-main-btn-inp-p">
                        <p></p>
                        <input type="password" placeholder="请输入密码" ref="userPasswd" />
                    </div>
                    <div class="button" @click="login">登录</div>
                </div>
                <div class="glg-main-btn-els">
                    <router-link tag="div" to="/userRegister" >
                        <a href="javascript:;">注册账号</a>
                    </router-link>
                    <div @click="getPwd"><a>忘记密码?</a></div>
                </div>
            </div>
            <div 
                class="glg-main-wechat"
                style="margin-bottom:50px"
                @click="userWechat"
            >
                <p>使用第三方登录</p>
                <div><p></p></div>
            </div>
            <p v-html="resData"></p>
        </section>

        <el-dialog 
            title="绑定手机号码" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <div
            >
                <el-form 
                    label-width="0"
                    :inline="true"
                    :inline-message="true"
                    status-icon
                    :model="from"
                >
                    <el-form-item 
                        prop="phone"
                        :rules="[
                                { required: true, message: '请填写手机号码', trigger: 'blur' },
                                { min:11,max:11, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }
                            ]"
                    >
                        <el-input style="width:310px;" v-model="from.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="from.code" placeholder="验证码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getCode">{{num}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfire">绑定手机</el-button>
            </div>
        </el-dialog>
        <p v-html="resData" style="position:"></p>
    </div>
</template>
<script>
let qs = require("qs");
export default {
    data(){
        return {
            unionid:'',
            resData:'',
            dialogFormVisible:false,
            num:'获取验证码',
            from:{
                phone:'',
                code:''
            },
            off:true
        }
    },
    methods:{
        getPwd(){
            this.$router.push("/wangjimimaZ");
        },
        login(){
        let userName = this.$refs.userName.value;
        let password = this.$refs.userPasswd.value;
        if(userName && password){
            this.$http.post("https://api.guligou.com/api/users/checklogin",qs.stringify({
            loginName:userName,
            loginPwd:password
            }))
            .then((data) => {
                if(data.data.rs){
                    this.$notify({
                        type: 'success',
                        title:'成功提醒',
                        message:data.data.msg,
                        duration:2500,
                        showClose:false
                    });
                    this.$local.save("glg",{
                    login:true,
                    pk:false,
                    userInfo :data.data.rs
                    })
                    this.$router.push("/userIndex");
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
        comfire(){
            if(this.from.code != '' && this.from.phone != ''){
                this.$http.post("https://api.guligou.com/api/Threepartylogin/wxbangding",qs.stringify({
                    userPhone:this.from.phone,
                    mobileCode:this.from.code,
                    unionid:this.unionid
                }))
                .then((data) => {
                    if(data.data.status == '1'){
                        this.dialogFormVisible = false;
                        this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                    }else{
                        this.dialogFormVisible = false;
                        this.$notify({
                            type: 'error',
                            title:'错误提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                    }
                })
                .catch((error) => {
                    alert(error)
                })
            }
        },
        getCode(){
            if(this.from.phone != '' && this.off){
                this.$http.post("https://api.guligou.com/api/Threepartylogin/wxPhoneGetCode",qs.stringify({
                    userPhone:this.from.phone,
                    unionid:this.unionid
                }))
                .then((data) => {
                    if(data.data.status == '1'){
                        this.off = false;
                        this.num = 120;
                        this.timer = setInterval(() => {
                            this.num--;
                            if(this.num==0){
                                this.num = "重新发送验证码";
                                this.off = true;
                                clearInterval(this.timer);
                            }
                        },1000)
                    }else if(data.data.status == '0'){
                        this.off = true;
                        alert(data.data.msg);
                        this.$notify({
                            type: 'error',
                            title:'错误提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                    }
                })
                .catch((error) => {
                    this.resData = error
                })
            }
        },
        userWechat(){
            if(this.unionid){
                this.$http.post("https://api.guligou.com/api/Threepartylogin/wxlogin",qs.stringify({
                    unionid:this.unionid
                }))
                .then((data) => {
                    if(data.data == '0'){
                        this.dialogFormVisible = true;
                    }else{
                        this.$http.post("https://api.guligou.com/api/Users/getById.html",qs.stringify({
                            token:data.data.token,
                        }))
                        .then((data) => {
                            this.$local.save("glg",{
                                login:true,
                                userInfo :data.data
                            })
                            this.$notify({
                                type: 'success',
                                title:'成功提醒',
                                message:data.data.msg,
                                duration:2500,
                                showClose:false
                            });
                            this.$router.replace("/userIndex");
                        })
                    }
                })
                .catch((error) => {
                    this.resData = error
                })
            }else{
                this.$notify({
                    type: 'error',
                    title:'错误提醒',
                    message:'请在微信小程序中发打开',
                    duration:2500,
                    showClose:false
                });
            }
        }
    },
    created(){
        this.unionid = this.$local.fetch("glgWechat");
        if(this.$local.fetch("glg").login){
            this.$router.replace("/userIndex");
        }
    }
}
</script>
