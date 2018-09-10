<template>
    <div>
        <div type="text" @click="dialogFormVisible = true">退款发货</div>

        <el-dialog 
            title="立即发货" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <div class="toushuContent" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">商家地址：</h3>
                <p>{{address}}</p>
            </div>
            <div class="toushuContent" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">物流名称：</h3>
                <el-form>
                    <el-input v-model="expressName"></el-input>
                </el-form>
            </div>
            <div class="toushuContent" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">输订单号：</h3>
                <el-form>
                    <el-input type="number" v-model="expressNo"></el-input>
                </el-form>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="fahuo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let qs = require("qs");
export default {
    props:{
        orderId:{
            type:Number,
            default:0
        },
        address:{
            type:String,
            default:""
        },
    },
    data(){
        return {
            dialogFormVisible:false,
            userInfo:{},
            expressNo:"",
            expressName:""
        }
    },
    methods:{
        fahuo(){
            if((this.expressName != '') && (this.expressNo != '')){
                this.$http.post("https://api.guligou.com/api/orderrefunds/tianxiedanhao.html",qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    kuaidigongsi:this.expressName,
                    tuihuodanhao:this.expressNo,
                    id:this.orderId
                }))
                .then((data) => {
                    console.log(data)
                    if(data.data.status == 1){
                        this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg ,
                            duration:2500,
                            showClose:false
                        });
                        this.dialogFormVisible = false;
                        setTimeout(function(){
                            window.location.reload();
                        },2500)
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
                .catch((error) => {
                    cosole.log(error)
                })
            }
            console.log(this.value)
        }

    },
    created(){
        this.userInfo = this.$local.fetch("glg");
    }
}
</script>
