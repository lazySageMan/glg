<template>
    <div>
        <div @click="dialogFormVisible = true">
            <div class=" glg-user-zhanghushezhixia">
                <span style="margin-left:5%">申请提现</span>
                <span style="color:#666666; float:right;margin-top:1%; margin-right:3%">></span>
            </div>
        </div>

        <el-dialog 
            title="申请提现" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <div class="toushuDetails" style="margin-bottom:10px;">
                <h3 style="margin-bottom:10px;">提现类型：</h3>
                <el-radio v-model="radio" label="1">支付宝</el-radio>
                <el-radio v-model="radio" label="2">微信</el-radio>
            </div>
            <div v-if="radio == 1" class="toushuYuan" style="margin-bottom:10px;">
                <h3 style="margin-bottom:10px;">支付宝提现：</h3>
                    <el-input v-model="accUser" placeholder="提现支付宝真实姓名"></el-input>
                    <el-input v-model="accNo" placeholder="支付宝账号" style="margin-top:10px"></el-input>
            </div>
            <div class="toushuYuan" style="margin-bottom:10px;">
                <h3 style="margin-bottom:10px;">提现金额：</h3>
                <el-input type="number" v-model="money"></el-input>
            </div>

            <div class="toushuContent" style="margin-bottom:10px;">
                <h3 style="margin-bottom:10px;">手续费比率：</h3>
                <el-button type="warning" style="width:100%;text-align:left" plain disabled>{{getShouxu}}</el-button>
            </div>
            <div class="toushuDetails" style="margin-bottom:10px;">
                <h3 style="margin-bottom:10px;">实际到账：</h3>
                <el-button type="warning" style="width:100%;text-align:left" plain disabled>{{getRealeMoney}}</el-button>
            </div>
            <div class="toushuDetails" style="margin-bottom:10px;">
                <h3 style="margin-bottom:10px;">支付密码：</h3>
                <el-input type="password" v-model="passwd"></el-input>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toushu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let qs = require("qs");
let wx = require("weixin-js-sdk");
export default {
    data(){
        return {
            dialogFormVisible:false,
            radio:"1",
            userInfo:{},
            money:null,
            realMoney:null,
            shouxu:null,
            passwd:"",
            accUser:'',
            accNo:''
        }
    },
    methods:{
        toushu(){
            if(this.radio == '1'){
                if(this.passwd != '' && this.money && this.accUser != '' && this.accNo!=''){
                    this.$http.post("https://api.guligou.com/api/cashdraws/drawMoney",qs.stringify({
                        token:this.userInfo.userInfo.toKen,
                        accType:'3',
                        money:this.money,
                        shouxufei:(this.money - this.getRealeMoney),
                        shijidaozhang:this.getRealeMoney,
                        payPwd:this.passwd,
                        accUser:this.accUser,
                        accNo:this.accNo
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
                            this.$http.post("https://api.guligou.com/api/Users/getById.html",qs.stringify({
                                token:this.userInfo.userInfo.toKen,
                            }))
                            .then((data) => {
                                this.$local.save("glg",{
                                    login:true,
                                    userInfo :data.data
                                })
                                setTimeout(function(){
                                    window.location.reload();
                                },2500)
                            })
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
            }else if(this.radio == '2'){
                if(this.passwd != '' && this.money){
                    wx.miniProgram.navigateTo({ //传递参数可以通过query方式传递
                        url:`/pages/tixian/tixian?token=${this.userInfo.userInfo.toKen}&shijidaozhang=${this.getRealeMoney}&payPwd=${this.passwd}&shouxufei=${(this.money - this.getRealeMoney)}&money=${this.money}`
                    })
                }
            }
        }

    },
    computed:{
        getRealeMoney(){
            if(this.money != null){
                this.realMoney = (this.money - (this.shouxu*0.01*this.money));
            }else{
                this.realMoney = null;
            }
            return this.realMoney
        },
        getShouxu(){
            return `${this.shouxu}%`
        }
    },
    created(){
        //
        this.userInfo = this.$local.fetch("glg");
        let tixian = '';
        if(this.userInfo.userInfo.isDl == 1){
            tixian = 'dltixianshouxufei';
        }else{
            if(this.userInfo.userInfo.userType == 1){
                tixian = 'shoptixianshouxufei';
            }else{
                tixian = 'tixianshouxufei';
            }
        }
        this.$http.post("https://api.guligou.com/api/index/PlatformRules",qs.stringify({
            name:tixian
        }))
        .then((data) =>{
            console.log(data);
            this.shouxu = data.data;
            this.shouxu = `${this.shouxu}`
        })
        //
    }
}
</script>
