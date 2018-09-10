<template>
    <div>
        <div type="text" @click="dialogFormVisible = true">
            <div class=" glg-user-zhanghushezhixia">
                    <a style=" margin-left:5%">邀请码</a>
                    <a href="javascript:;" style="color:#666666; float:right;margin-top:1%; margin-right:3%">></a>
            </div>
        </div>

        <el-dialog 
            title="邀请码" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <div class="toushuContent" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">你的邀请码：</h3>
                <el-button type="info" style="width:100%;text-align:left;" disabled>{{getYaoqing}}</el-button>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="yaoQingma != null" type="primary" @click="shengqing">确 定</el-button>
                <el-button v-if="yaoQingma == null" type="primary" @click="shengqing">立即获取</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let qs = require("qs");
export default {
    data(){
        return {
            dialogFormVisible:false,
            userInfo:{},
            yaoQingma:""
        }
    },
    methods:{
        shengqing(){
            if(this.yaoQingma == null){
                this.$http.post("https://api.guligou.com/api/users/hqyqm",qs.stringify({
                    token:this.userInfo.userInfo.toKen
                }))
                .then((data) => {
                    if(data.data.status == 1){
                        this.dialogFormVisible = false;
                        // this.userInfo.userInfo.yaoqingma = 
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
                            window.location.reload();
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
            }else{
                this.dialogFormVisible = false;
            }
        }
    },
    computed:{
        getYaoqing(){
            return this.yaoQingma == null ? "您还没有邀请码，赶紧获取吧!" : this.yaoQingma;
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
        this.yaoQingma = this.userInfo.userInfo.yaoqingma
    }
}
</script>
