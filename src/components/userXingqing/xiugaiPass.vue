<template>
  <div>
    <div @click="dialogFormVisible = true" style="font-family:'youYuan'">
        <div  class=" glg-user-zhanghushezhixia">
            <a href="javascript:;" style=" margin-left:5%">登录密码</a>
            <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
        </div>
    </div>

    <el-dialog
      width="95%"
      title="修改密码"
      :visible.sync="dialogFormVisible"
      center
      :show-close="true"
    >
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0" class="demo-ruleForm">
            <el-form-item label="" prop="oldPass">
                <el-input type="password" placeholder="当前你的密码" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="pass">
                <el-input type="password" placeholder="新密码" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkPass">
                <el-input type="password" placeholder="重复新密码" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
let qs = require("qs");
export default {
  data() {
      var oldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.oldPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
            callback();
          }
        }
      };
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
    return {
        ruleForm2: {
          oldPass: '',
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
          oldPass: [
            { validator: oldPass, trigger: 'blur' }
          ]
        },
        dialogFormVisible :false,
        userInfo:{}
    }
  },
  methods:{
      submitForm(formName) {
        console.log(this.ruleForm2)
        this.$http.post("https://api.guligou.com/api/users/passEdit",qs.stringify({
          token:this.userInfo.userInfo.toKen,
          oldPass:this.ruleForm2.oldPass,
          newPass:this.ruleForm2.pass,
          reNewPass:this.ruleForm2.checkPass
        }))
        .then((data) => {
          console.log(data)
          if(data.data.status == 1){
            this.dialogFormVisible = false;
            this.$notify({
                type: 'success',
                title:'成功提醒',
                message:data.data.msg,
                duration:2500,
                showClose:false
            });
          }else{
            this.$notify({
                type: 'error',
                title:'错误提醒',
                message:data.data.msg,
                duration:2500,
                showClose:false
            });
            this.$refs[formName].resetFields();
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  created(){
    this.userInfo = this.$local.fetch("glg");
  }
}
</script>

