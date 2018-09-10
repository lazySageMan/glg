<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true" style="font-family:'youYuan'">添加收货地址</el-button> -->

    <el-dialog
      width="95%"
      title="收货地址"
      :visible.sync="dialogFormVisible"
      center
      @close="comfirm"
      :show-close="true"
    >
      <el-form ref="form" :rules="rules.name" :model="form" label-width="0px">
        <el-form-item label="" prop="name">
           <el-input v-model="form.name" placeholder="你的名字"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :rules="rules.phone" :model="form" label-width="0px" style="margin-top:20px;">
        <el-form-item prop="phone">
           <el-input v-model="form.phone" placeholder="你的电话"></el-input>
        </el-form-item>
      </el-form>
      <local @setData="getData"></local>
      <el-form ref="form" :rules="rules.address" :model="form" label-width="0px" style="margin-top:20px;">
        <el-form-item label="" prop="address">
           <el-input v-model="form.address" placeholder="具体地址"></el-input>
        </el-form-item>
      </el-form>
      <el-radio v-model="radio" label="1">默认</el-radio>
      <el-radio v-model="radio" label="0">不默认</el-radio>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
        <el-button type="primary" @click="sureAddress">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import local from '@/components/local'
let qs = require("qs");
export default {
  data() {
    return {
        dialogFormVisible :true,
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
            { required: true, message: '请输入你的名字'},
            { min: 2, max: 5,message:"名字必须在2到5位"}
          ],
          phone: [
            { required: true, message: '请输入正确的手机号'},
            { min: 11, max: 11 ,message :"手机号必须为11位"}
          ],
          address: [
            { required: true, message: '可以在完善地址'},
            { min: 10, max: 50,message:"请完善详细地址"}
          ],
        }
    }
  },
  methods:{
    getData(areaId){
      this.form.areaId = areaId[2];
    },
    sureAddress(){
      this.dialogFormVisible = false;
    },
    comfirm(){
      if(this.form.name && this.form.phone && this.form.address){


        this.$http.post("https://api.guligou.com/api/Useraddress/add",qs.stringify({
          token:this.userInfo.userInfo.toKen,
          userName:this.form.name,
          userPhone:this.form.phone,
          userAddress:this.form.address,
          areaId:this.form.areaId,
          addressId:"0",
          isDefault:this.radio
        }))
        .then((data) => {
          if(data.data.status == -1){
            this.$notify({
                type: 'error',
                title:'错误提醒',
                message:'添加失败',
                duration:2500,
                showClose:false
            });
          }else{
            this.form.areaId = "";
            this.form.address = "";
            this.form.phone = "";
            this.form.name = "";
            this.dialogFormVisible = false;
          }
        })
      }else{
        this.dialogFormVisible = true;
      }
    }
  },
  components:{local},
  created() {
    this.userInfo = this.$local.fetch("glg");
  },
}
</script>

