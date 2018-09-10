<template>
    <div>
        <div type="text" @click="dialogFormVisible = true">拒绝收货</div>

        <el-dialog 
            title="拒绝收获原因" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <el-select 
                v-model="value" 
                placeholder="选择拒绝收获原因"
                style="width:100%"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="具体原因"
                v-model="textarea"
                style="width:100%;margin-top:20px"
            >
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="quxiao">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let qs = require("qs")
  export default {
    props:{
        orderId:{
            type:Number,
            default:0
        }
    },
    data() {
      return {
        dialogFormVisible: false,
        options: [],
        value: '',
        userInfo:{},
        textarea:''
      };
    },
    methods:{
        quxiao(){
            if(this.value){
                this.$http.post("https://api.guligou.com/api/Orders/reject",qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    reason:this.value,
                    id:this.orderId,
                    content:this.textarea
                }))
                .then((data) => {
                    console.log(data.data)
                    if(data.data.status == 1){
                         this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg ,
                            duration:2500,
                            showClose:false
                        },2500);
                        this.$router.replace("/dingDan/dingDanShouhou")
                    }else{
                         this.$notify({
                            type: 'error',
                            title:'错误提醒',
                            message:data.data.msg ,
                            duration:2500,
                            showClose:false
                        });
                    }
                })
            }
            this.dialogFormVisible = false;
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/Orders/getReason?catId=2")
        .then((data) => {
            data.data.forEach((item) => {
                this.options.push({label:item.dataName,value:item.dataVal});
            })
        })
    }

  };
</script>
