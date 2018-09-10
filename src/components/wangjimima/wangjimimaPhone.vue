<template>
    <div class="glg-wrap">
        <div class="glg-zhanghao">
            <div class="glg-zhanghao-title">
                <p>
                    正在帮你找回账号{{from.hidePhone}}的密码<br>
                    找回密码需要验证身份
                </p>
            </div>
            <div
                style="margin-top:30px;"
            >
                <el-form 
                    label-width="0"
                    :inline="true"
                    :inline-message="true"
                    status-icon
                    :model="from"
                >
                    <el-form-item 
                        
                    >
                        <el-button type="info" disabled style="width:310px;text-align:left;">{{from.hidePhone}}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="from.code" placeholder="验证码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getCode">{{num}}</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="glg-zhanghao-comfire" style="margin-top:250px;">
                <el-button 
                    style="width:100%;background:#ff5e2c;color:#fff;"
                    @click="gotoCom"
                >确定</el-button>
            </div>
        </div>
        <el-dialog 
            title="重置密码" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >   
            <div>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0" class="demo-ruleForm">
                    <el-form-item label="" prop="pass">
                        <el-input type="password" placeholder="新密码" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="checkPass">
                        <el-input type="password" placeholder="重复新密码" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="isCom">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let qs = require("qs")
export default {
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (value.length <= 5 || value.length >= 14) {
                    callback(new Error('密码不少于6位和不大于15位'));
                }else{
                    this.$refs.ruleForm2.validateField('checkPass');
                    callback();
                }
            }
        };
      var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
      };
        return{
            ruleForm2: {
                pass: '',
                checkPass: '',
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
            dialogFormVisible:false,
            from:{
                hidePhone:"",
                phone:'',
                code:''
            },
            num:"获取验证码",
            off:true,
            token:''
        }
    },
    methods:{
        gotoCom(){
            if(this.from.code != '' && this.num > 0 && this.from.phone != ''){
                this.$http.post("https://api.guligou.com/api/users/findPass",qs.stringify({
                    step:"2",
                    userPhone:this.from.phone,
                    mobileCode:this.from.code
                }))
                .then((data) => {
                    if(data.data.status == 1){
                        this.token = data.data.token;
                        this.dialogFormVisible = true;
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
        getCode(){
            if(this.from.phone != '' && this.off){
                this.$http.post("https://api.guligou.com/api/users/getFindPhone",qs.stringify({
                    userPhone:this.from.phone
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
        isCom(){
            if(this.ruleForm2.pass != '' && this.ruleForm2.checkPass != ''){
                this.$http.post("https://api.guligou.com/api/users/findPass",qs.stringify({
                    step:'3',
                    token:this.token,
                    loginPwd:this.ruleForm2.pass,
                    repassWord:this.ruleForm2.checkPass,
                    userPhone:this.from.phone
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
                        this.$router.push("/userLogin");
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
            // this.dialogFormVisible = false;
        }
    },
    created() {
        this.from.phone = this.$route.query.userPhone
        this.from.hidePhone = this.from.phone.replace(this.from.phone.substring(3,8),'*****');

    },
}
</script>
