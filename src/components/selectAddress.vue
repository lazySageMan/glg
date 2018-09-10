<template>
    <div>
      <div
        v-if="status == 0"
        @click="outerVisible = true"
      >
        <div
          class="glg-user-dingdanxiangqing-dizhi"
          v-if="address.userName"
        >
        	<div class="glg-user-ddxiangqing-xingming">
            	<div style="height:10px"></div>
            	<div class="glg-user-ddxq-xingming">
                	<span>{{address.userName}}</span>
                	<span style=" float:right">{{address.userPhone}}</span>
                </div>
                <div></div>
                <div class="glg-user-ddxq-dizhi">
                	<img src="../assets/img/user-dingdanguanli-dingwei.jpg" width="5%" style=" float:left">
                	<p>{{address.areaName}}</p>
                </div>
            </div>
        </div>
        <div
          v-if="!address.userName"
          class="glg-address"
          style="height:70px;line-height:70px;"
        >
          还没有，收货地址，赶紧添加一个
        </div>
      </div>
      <div v-if="status == 1" @click="outerVisible = true">编辑</div>

      <el-dialog
        title="选择地址"
        :visible.sync="outerVisible"
        width="95%"
        center
        :fullscreen="true"
        @close="tabMessge"
      >
        <el-table :data="gridData" @row-click="checkAddress">
          <el-table-column property="userName" label="姓名" width="70"></el-table-column>
          <el-table-column property="userPhone" label="电话" width="100"></el-table-column>
          <el-table-column property="areaName" label="地址"></el-table-column>
        </el-table>
        <!-- 添加地址第二层diaLog -->
        <el-dialog
          width="95%"
          title="添加地址"
          :visible.sync="innerVisible"
          center
          @close="comfirm"
          :show-close="true"
          :fullscreen="true"
          append-to-body
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
            <!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
            <el-button type="primary" @click="innerVisible = false">确定</el-button>
          </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible = true">添加收货地址</el-button>
        </div>
      </el-dialog>
    </div>
</template>


<script>
  let qs = require("qs");
  import diaLogs from './diaLog'
  import local from '@/components/local'
  export default {
    props:{
      status:{
        type:Number,
        default:0
      }
    },
    data() {
      return {

        gridData:[],
        outerVisible: false,
        innerVisible: false,
        address:{},

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
            { min: 2, max: 5,  trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入正确的手机号', trigger: 'blur' },
            { min: 11, max: 11, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '可以在完善地址', trigger: 'blur' },
            { min: 10, max: 50, trigger: 'blur' }
          ],
        }

      };
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
            this.innerVisible = false;
            window.location.reload();
          }
        })
      }else{
        this.innerVisible = false;
      }
    },
    tabMessge(){
      this.$emit("tabData",this.address);
    },
    checkAddress(row){

      this.outerVisible = false;

      this.address = row;
    }
  },
  components:{
    diaLogs,
    local
  },
  created() {
    this.userInfo = this.$local.fetch("glg");
    this.$http.post("https://api.guligou.com/api/Useraddress/listQuery",qs.stringify({
      token:this.userInfo.userInfo.toKen
    }))
    .then((data) => {
      this.gridData = data.data;
      this.gridData.forEach((item) => {
        item.areaName = `${item.areaName}${item.userAddress}`;
        if(item.isDefault == 1){
          this.address = item;
        }
      })
    })
  },
  };
</script>
