<template>
    <div class="glg-wrap" style="background:#f6f5f5">
        <el-collapse accordion>
            <el-collapse-item
                :key="index"
                v-for="(item,index) in dataInfo"
            >
                <template slot="title" >
                    <div style="display:flex;align-items:center;">
                        <a style=" color:#000;margin-left:30px;">{{index+1}}.</a>                         
                        <img v-if="item.userPhoto != ''" :src="glgImg+item.userPhoto" style="width: 45px;height:45px;margin-left:30px;">
                        <img v-if="item.userPhoto == ''" :src="userxiaoxi" style="width: 45px;height:45px;margin-left:30px;">
                        <span style="margin-left:30px;">{{item.trueName}}</span>
                    </div>  
                </template>
                <div style="margin-left:30px;">邀请用户：{{item.userName}}</div>
                <div style="margin-left:30px;">注册时间：{{item.createTime}}</div>
                <div style="margin-left:30px;">消费金额：{{item.userMoney}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>


import userxiaoxi from '../../assets/img/user-xiaoxi.jpg'
let qs = require("qs")
export default {
    data() {
      return {
        activeNames: ['1'],
        userInfo:{},
        dataInfo:[],
        glgImg:"https://api.guligou.com/",
        userxiaoxi
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
        this.$http.post("https://api.guligou.com/api/users/yaoqing",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => {
            console.log(data);
            this.dataInfo = data.data.yaoqinguser;
            loading.close();
        })
    }

}
</script>



