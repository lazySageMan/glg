<template>
    <div>
        <div type="text" @click="dialogFormVisible = true">申请退款</div>

        <el-dialog 
            title="申请退款" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <div class="toushuDetails" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">订单详情：</h3>
                <div>
                    <span>订单编号：</span>
                    <span>{{shopInfo.orderNo}}</span>
                </div>
                <div>
                    <span>订单金额：</span>
                    <span>{{shopInfo.realTotalMoney}}</span>
                </div>
                <div>
                    <span>订单运费：</span>
                    <span>{{shopInfo.deliverMoney}}</span>
                </div>
                <div>
                    <span>下单时间：</span>
                    <span>{{shopInfo.createTime}}</span>
                </div>
                <div>
                    <span>订单商家：</span>
                    <span>{{shopInfo.shopName}}</span>
                </div>
            </div>
            <div class="toushuYuan" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">退款原因：</h3>
                <el-radio v-model="radio" label="1">承诺的没有做到</el-radio><br>
                <el-radio v-model="radio" label="2">未按约定时间发货</el-radio><br>
                <el-radio v-model="radio" label="3">未按成交价格进行交易</el-radio><br>
                <el-radio v-model="radio" label="4">恶意骚扰</el-radio>
            </div>
            <div class="toushuContent" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">具体内容：</h3>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="这里是具体投诉内容"
                    v-model="textarea"
                    style="width:100%;"
                >
                </el-input>
            </div>
            <div class="toushuContent" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">退款金额：</h3>
                <el-form>
                    <el-input v-model="money" placeholder="退款金额小于或等于实际付款金额"></el-input>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="tuiKuan">确 定</el-button>
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
        }
    },
    data(){
        return {
            dialogFormVisible:false,
            radio:"1",
            userInfo:{},
            shopInfo:"",
            textarea:"",
            money:null
        }
    },
    methods:{
        tuiKuan(){
            if((this.textarea != '') && (this.money != '')){
                this.$http.post("https://api.guligou.com/api/orderrefunds/refund.html",qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    reason:this.radio,
                    content:this.textarea,
                    money:this.money,
                    id:this.orderId
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
                        this.dialogFormVisible = false;
                        setTimeout(function(){
                            window.location.reload();
                        },2500)
                    }
                    else{
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
                    console.log(error)
                })
            }
            
        }
            

    },
    created(){
        //
        this.userInfo = this.$local.fetch("glg");
        //
        this.$http.post("https://api.guligou.com/api/orders/detail.html",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            id:this.orderId,
            type:"user"
        }))
        .then((data) => {
            this.shopInfo = data.data
        })
    }
}
</script>
