<template>
  <div>
    <div v-if="addressId !=0" @click="dialogFormVisible = true" style="font-family:'youYuan'">编辑</div>
    <div v-if="addressId ==0" style="width:100%;text-align:center;margin:20px auto;">
			<el-button @click="dialogFormVisible = true" style="background:#ff5e2c;color:#fff;" icon="el-icon-edit">添加收货地址</el-button>
		</div>

    <el-dialog
      width="95%"
      title="编辑地址"
      :visible.sync="dialogFormVisible"
      center
      :fullscreen="true"
      :show-close="true"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="0px">
        <el-form-item label="" prop="name">
           <el-input v-model="form.name" placeholder="你的名字"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :rules="rules" :model="form" label-width="0px" style="margin-top:20px;">
        <el-form-item label="" prop="phone">
           <el-input v-model="form.phone" placeholder="你的电话"></el-input>
        </el-form-item>
      </el-form>
      <local @setData="getData"></local>
      <el-form ref="form" :rules="rules" :model="form" label-width="0px" style="margin-top:20px;">
        <el-form-item label="" prop="address">
           <el-input v-model="form.address" placeholder="具体地址"></el-input>
        </el-form-item>
      </el-form>
      <el-radio v-model="radio" label="1">默认</el-radio>
      <el-radio v-model="radio" label="0">不默认</el-radio>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="sureAddress">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import local from '@/components/local'
let qs = require("qs");
export default {
  props:{
    addressId:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
        dialogFormVisible :false,
        userInfo:{},
        form: {
          name: '',
          phone:'',
          region: '',
          address:'',
          areaId:''
        },
        radio:'1',
        formLabelWidth: '120px',
        rules:{
          name: [
            { required: true, message: '请输入你的名字', trigger: 'blur' },
            { min: 2, max: 5, message:"姓名在2到5个字符", trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入正确的手机号', trigger: 'blur' },
            { min: 11, max: 11, message:"手机号不少于11位",trigger: 'blur' }
          ],
          address: [
            { required: true, message: '可以在完善地址', trigger: 'blur' },
            { min: 10, max: 50,message:"详细地址不少于10个字符", trigger: 'blur' }
          ],
        }
    }
  },
  methods:{
    getData(areaId){
      this.form.areaId = areaId[2];
    },
    sureAddress(){
        if(this.form.name && this.form.phone && this.form.address && this.addressId != 0){
            this.$http.post("https://api.guligou.com/api/useraddress/toEdit.html",qs.stringify({
              addressId:this.addressId,
              token:this.userInfo.userInfo.toKen,
              userName:this.form.name,
              userPhone:this.form.phone,
              userAddress:this.form.address,
              areaId:this.form.areaId,
              isDefault:this.radio
            }))
            .then((data) => {
              if(data.data.status == -1){
                  this.$notify({
                      type: 'error',
                      title:'错误提醒',
                      message:data.data.msg,
                      duration:2500,
                      showClose:false
                  });
              }else{
                  this.form.areaId = "";
                  this.form.address = "";
                  this.form.phone = "";
                  this.form.name = "";
                  this.$notify({
                      type: 'success',
                      title:'成功提醒',
                      message:data.data.msg,
                      duration:2500,
                      showClose:false
                  });
                  this.dialogFormVisible = false;
                  setTimeout(function(){
                      window.location.reload();
                  },2500)
              }
            })
        }else if(this.form.name && this.form.phone.length==11 && this.form.address.length >=10 && this.addressId == 0){
            this.$http.post("https://api.guligou.com/api/Useraddress/add",qs.stringify({
              token:this.userInfo.userInfo.toKen,
              userName:this.form.name,
              userPhone:this.form.phone,
              userAddress:this.form.address,
              areaId:this.form.areaId,
              isDefault:this.radio
            }))
            .then((data) => {
              if(data.data.status == -1){
                  this.$notify({
                      type: 'error',
                      title:'错误提醒',
                      message:data.data.msg,
                      duration:2500,
                      showClose:false
                  });
              }else{
                  this.form.areaId = "";
                  this.form.address = "";
                  this.form.phone = "";
                  this.form.name = "";
                  this.$notify({
                      type: 'success',
                      title:'成功提醒',
                      message:data.data.msg,
                      duration:2500,
                      showClose:false
                  });
                  this.dialogFormVisible = false;
                  setTimeout(function(){
                      window.location.reload();
                  },2500)
              }
            })
        }else{
          this.dialogFormVisible = flase;
        }
    },
    comfirm(){
      
    }
  },
  components:{local},
  created() {
    this.userInfo = this.$local.fetch("glg");
  },
}
</script>

