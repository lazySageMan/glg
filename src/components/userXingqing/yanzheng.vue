<template>
  <div>
    <div v-if="status == 0" @click="dialogFormVisible = true" style="font-family:'youYuan'">
        <div  class=" glg-user-zhanghushezhixia">
            <a href="javascript:;" style=" margin-left:5%">邮箱验证</a>
            <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        </div>
    </div>
    <div v-if="status == 1" @click="dialogFormVisible = true" style="font-family:'youYuan'">
        <div  class=" glg-user-zhanghushezhixia">
            <a href="javascript:;" style=" margin-left:5%">手机验证</a>
            <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        </div>
    </div>

    <el-dialog
      width="95%"
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      :show-close="true"
    >
        <div v-if="status == 0">
            <div
                v-if="userInfo.userInfo.userEmail != ''"
            >
                <div style="width:100;height:50px;font-size:15px;line-height:50px;text-align:center;">
                    成功绑定：{{userInfo.userInfo.userEmail}}
                </div>
            </div>
            <div
                v-if="userInfo.userInfo.userEmail == ''"   
            >
                <el-form 
                    label-width="0"
                    :inline="true"
                    :inline-message="true"
                    status-icon
                    :model="from"
                >
                    <el-form-item
                            prop="email"
                            :rules="[
                                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]"
                    >
                        <el-input style="width:310px;" v-model="from.email" placeholder="输入需要验证的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="from.code" placeholder="验证码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button 
                            type="primary"
                            :class="{'sended':off}"
                            @click="sendCode"
                        >获取验证码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-if="status == 1">
            <div
                v-if="userInfo.userInfo.userPhone != ''"
            >
                <div style="width:100;height:50px;font-size:15px;line-height:50px;text-align:center;">
                    成功绑定：{{userInfo.userInfo.userPhone}}
                </div>
            </div>
            <div
                v-if="userInfo.userInfo.userPhone == ''"   
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
                        <el-button type="primary" >获取验证码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div 
            slot="footer" 
            class="dialog-footer"
            v-if="status == 1"
        >
            <el-button v-if="(userInfo.userInfo.userPhone == '')"  type="primary" @click="submitForm">验 证</el-button>
            <el-button v-if="(userInfo.userInfo.userPhone != '')" type="primary" @click="submitForm">确 定</el-button>
        </div>
        <div 
            slot="footer" 
            class="dialog-footer"
            v-if="status == 0"
        >
            <el-button v-if="(userInfo.userInfo.userEmail == '')"  type="primary" @click="submitForm">验 证</el-button>
            <el-button v-if="(userInfo.userInfo.userEmail != '')" type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
let qs = require("qs");
export default {
    props:{
        status:{
            type:Number,
            default:0
        }
    },
    data() {
            return {
                dialogFormVisible :false,
                userInfo:{},
                title:"",
                from:{
                    email:"",
                    code:"",
                    phone:""
                },
                num:0,
                off:false
            }

        },
    methods:{
        submitForm(){
            this.dialogFormVisible = false;
        },
        sendCode(){
            if(this.from.phone != ''){
                this.$http.post("https://api.guligou.com/api/users/getEmailVerify.html",qs.stringify({
                    userPhone:this.from.phone,
                    token:this.userInfo.userInfo.toKen
                }))
                .then((data) => {
                    console.log(data);
                })
            }
        }
    },
    created(){
        if(this.status == 0){
            this.title = "验证邮箱"
        }else{
            this.title = "验证手机"
        }   
        this.userInfo = this.$local.fetch("glg");
        console.log(this.userInfo.userInfo.userEmail)
    }
}
</script>
<style>

.sended{
    background:gray;color:#fff
}
</style>

