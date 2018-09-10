<template>
    <div class="glg-wrap" style="background:#f6f5f5;">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item 
                :title="item.createTime" 
                :name="index"
                :key="index"
                v-for="(item,index) in dataInfo"
                style="text-indent:5em"
            >
                <div>提现账号：{{item.accNo}}</div>
                <div>提现姓名：{{item.accUser}}</div>
                <div>提现金额：{{item.money}}</div>
                <div>实际到账：{{item.shijidaozhang}}</div>
                <div>提现类型：<span v-if="item.accType == 2">微信</span><span v-if="item.accType == 1">支付宝</span></div>
                <div>提现状态：<span v-if="item.cashSatus == 1">已到账</span><span v-if="item.cashSatus == 0">提现中</span></div>
            </el-collapse-item>
        </el-collapse>    
    </div>
</template>
<script>
let qs = require("qs")
export default {
    data() {
      return {
        activeNames: ['1'],
        userInfo:{},
        dataInfo:[]
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    },
    created(){
        let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass:'changeFontFamily'
		})
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/cashdraws/pageQuery",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => {
            console.log(data);
            this.dataInfo = data.data.Rows;
            loading.close();
        })
    }

}
</script>

