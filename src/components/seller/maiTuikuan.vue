<template>
    <div>
        <div type="text" @click="dialogFormVisible = true">等待退款</div>

        <el-dialog 
            title="退款操作" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <div class="toushuDetails" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">退款详情：</h3>
                <div>
                    <span>订单编号：</span>
                    <span>{{shopInfo.orderNo}}</span>
                </div>
                <div>
                    <span>实付金额：</span>
                    <span>{{shopInfo.realTotalMoney}}</span>
                </div>
                <div>
                    <span>退款金额：</span>
                    <span>{{shopInfo.backMoney}}</span>
                </div>
            </div>
            <div class="toushuYuan" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">商家意见：</h3>
                <el-radio v-model="radio" label="1">退货退款</el-radio>
                <el-radio v-model="radio" label="3">仅退款</el-radio>
                <el-radio v-model="radio" label="-1">不同意</el-radio>
            </div>
            <div 
                class="toushuContent" 
                style="margin-bottom:6px;"
                v-if=" radio == 1 "
            >
                <h3 style="margin-bottom:6px;">退货地址：</h3>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="填写详细的退货地址"
                    v-model="address"
                    style="width:100%;"
                >
                </el-input>
            </div>
            <div 
                class="toushuContent" 
                style="margin-bottom:6px;"
                v-if=" radio == -1 "
            >
                <h3 style="margin-bottom:6px;">拒绝原因：</h3>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="拒绝退款的原因"
                    v-model="textarea"
                    style="width:100%;"
                >
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="tuikuan">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let qs = require("qs");
export default {
    props:{
        refundId:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            dialogFormVisible:false,
            address:'',
            textarea:"",
            reason:"",
            radio:'1',
            userInfo:{},
            shopInfo:"",
        }
    },
    methods:{
        tuikuan(){
            if(this.radio == '1' && this.address != ''){
                this.$http.post("https://api.guligou.com/api/orderrefunds/shoprefund.html",qs.stringify({
                    refundStatus:this.radio,
                    content:"",
                    tuihuodizhi:this.address,
                    id:this.refundId
                }))
                .then((data) => {
                    console.log(data)
                    if(data.data.status == 1){
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
            else if(this.radio == '3'){
                console.log(data)
                this.$http.post("https://api.guligou.com/api/orderrefunds/shoprefund.html",qs.stringify({
                    refundStatus:this.radio,
                    content:"",
                    tuihuodizhi:"",
                    id:this.refundId
                }))
                .then((data) => {
                    if(data.data.status == 1){
                        this.dialogFormVisible = false;
                        this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                        setTimeout(function(){
                            window.location.reload();
                        },2500)
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
            else if(this.radio == '-1' && this.textarea != ''){
                console.log(data)
                this.$http.post("https://api.guligou.com/api/orderrefunds/shoprefund.html",qs.stringify({
                    refundStatus:this.radio,
                    content:this.textarea,
                    tuihuodizhi:"",
                    id:this.refundId
                }))
                .then((data) => {
                    if(data.data.status == 1){
                        this.dialogFormVisible = false;
                        this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                        setTimeout(function(){
                            window.location.reload();
                        },2500)
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
            }else{
                this.$notify({
                      type: 'error',
                      title:'错误提醒',
                      message:'填写退款信息',
                      duration:2500,
                      showClose:false
                  });
            }
        }
    },
    created(){
        this.$http.post("https://api.guligou.com/api/Orders/toShopRefund",qs.stringify({
            id:this.refundId
        }))
        .then((data) => {
            this.shopInfo = data.data;
        })
        this.userInfo = this.$local.fetch("glg");
    }
}
</script>
