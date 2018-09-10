<template>
  <div class="glg-wrap" style="background: #f6f5f5">
    <!-- 头部信息 -->
    <div v-if="headerImg != ''" class="glg-user-head" :style="{background:'url('+glgImg+headerImg+') no-repeat 50%/100%'}">
      <h3></h3>
      <div class="glg-user-head-wrap"></div>
      <div class="glg-user-head-img" :style="{background:'url('+glgImg+headerImg+') no-repeat 0/100%'}"></div>
      <router-link tag="p" to="/ziliaoshezhi">{{userName}}</router-link>
      <div 
        class="lingdang"
        @click="gotoMessage"
      >
        <el-badge :value="num" :max="99" class="item">
          &#xe716;
        </el-badge>
      </div>
    </div>
    <div v-if="headerImg == ''" class="glg-user-head" :style="{background:'url('+userxiaoxi+') no-repeat 50%/100%'}">
      <h3></h3>
      <div class="glg-user-head-wrap"></div>
      <div class="glg-user-head-img" :style="{background:'url('+userxiaoxi+') no-repeat 0/100%'}"></div>
      <router-link tag="p" to="/ziliaoshezhi">{{userName}}</router-link>
      <div 
        class="lingdang"
        @click="gotoMessage"
      >
        <el-badge :value="num" :max="99" class="item">
          &#xe716;
        </el-badge>
      </div>
    </div>
    <!-- 切换身份 -->
    <div 
      class="glg-choose-userType"
      v-if="userInfo.userInfo.userType == 1"
    >
      <div
        class="glg-choose-userType-l"
        :style="{ background:'url('+maiImg+') no-repeat 100%/cover'}"
        @click="changeUserMai"
      ></div>
      <div
        class="glg-choose-userType-r"
        :style="{ background:'url('+maImg+') no-repeat 100%/cover'}"
        @click="changeUserMa"
      ></div>
    </div>
    <!-- 分类列表 -->
    <div class="glg-userList">
      <div class="glg-userList-top">
        <div>我的订单</div>
        <router-link tag="div" to="/dingDan/dingdanMost" v-if="maiJia" >查看全部订单&nbsp;></router-link>
        <router-link tag="div" to="/maijia" v-if="maJia">查看订单列表&nbsp;></router-link>
      </div>
      <div class="glg-userList-bottom">
        <router-link 
          to="/dingDan" 
          v-if="maiJia" 
          tag="div"
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+daifu+') no-repeat 50% 70%/85%'}"></div>
          <p>待付款</p>
        </router-link >
        <router-link 
          to="/dingDan/dingDanDaifa"  
          v-if="maiJia"
          tag="div" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+daifa+') no-repeat 50% 70%/82%'}"></div>
          <p>待发货</p>
        </router-link >
        <router-link 
          to="/dingDan/accountpaid" 
          tag="div" 
          v-if="maiJia" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+daishou+') no-repeat 50% 70%/83%'}"></div>
          <p>待收货</p>
        </router-link>
        <router-link 
          to="/dingDan/dingDanDaiping" 
          v-if="maiJia" 
          tag="div"
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+daipin+') no-repeat 50% 70%/80%'}"></div>
          <p>待评价</p>
        </router-link >
        <router-link 
          to="/dingDan/dingDanShouhou"  
          v-if="maiJia" 
          tag="div"
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+daitui+') no-repeat 95%/95%'}"></div>
          <p>退款/售后</p>
        </router-link >
        <router-link 
          :to="{name:'maiYishou'}" 
          tag="div" 
          v-if="maJia" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+yishou+') no-repeat 50% 70%/85%'}"></div>
          <p>已收货</p>
        </router-link>
         <router-link  
          :to="{name:'maiDaifu'}" 
          tag="div" 
          v-if="maJia" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+daifu1+') no-repeat 50% 70%/88%'}"></div>
          <p>待付款</p>
        </router-link>
         <router-link 
          :to="{name:'maiDaifa'}" 
          tag="div" 
          v-if="maJia" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+daifa1+') no-repeat 50% 70%/84%'}"></div>
          <p>待发货</p>
        </router-link>
         <router-link 
          :to="{name:'maiYifa'}" 
          tag="div" 
          v-if="maJia" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+yifa1+') no-repeat 95%/95%'}"></div>
          <p>已发货</p>
        </router-link>
        <router-link 
          :to="{name:'maiJusou'}" 
          tag="div" 
          v-if="maJia" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+jushou+') no-repeat 50%/95%'}"></div>
          <p>取消/拒收</p>
        </router-link>
        <router-link 
          :to="{name:'maiTousu'}" 
          tag="div" 
          v-if="maJia" 
          class="glg-userList-bottom-one"
        >
          <div :style="{background:'url('+tousu+') no-repeat 50% 70%/83%'}"></div>
          <p>投诉</p>
        </router-link>
      </div>
    </div>
    <!-- 服务列表 -->
    <div class="glg-doList">
      <ul>
        <router-link tag="li" :to="{name:'userSz'}" v-if="maiJia">
          <div class="left">
            <img style="width:32px;height:32px;left:10px;" src="../assets/img/user-wode-zhanghu.jpg"/>
            <span>账户设置</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link tag="li" :to="{name:'tixianguan'}" v-if="maiJia">
          <div class="left">
            <img style="width:30px;height:30px;left:11px;top:10px"  src="../assets/img/user-wode-ziji.jpg"/>
            <span>资金管理</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link tag="li" :to="{name:'shouchangP'}" v-if="maiJia">
          <div class="left">
            <img style="width:30px;height:26px;left:11px;top:11px" src="../assets/img/user-wode-shoucang.jpg"/>
            <span>收藏管理</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link tag="li" :to="{name:'userKe'}" v-if="maiJia">
          <div class="left">
            <img style="width:33px;height:33px;left:11px;" src="../assets/img/user-wode-kehu.jpg"/>
            <span>客户管理</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link tag="li" :to="{name:'userMp'}" v-if="maJia">
          <div class="left">
            <img style="width:32px;height:32px;left:9px;top:10px" src="../assets/img/user-wode-zhanghu.jpg"/>
            <span>店铺资料</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link tag="li" :to="{name:'tixianguan'}" v-if="maJia">
          <div class="left">
            <img style="width:28px;height:30px;left:11px;top:10px" src="../assets/img/user-wode-ziji.jpg"/>
            <span>资金管理</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link v-if="userInfo.userInfo.userType != 1" tag="li" :to="{name:'shopShengqinads'}" replace>
          <div class="left">
            <img src="../assets/img/user-wode-zhanghu.jpg"/>
            <span>卖家申请</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link v-if="userInfo.userInfo.isDl == 0" tag="li" :to="{name:'maijiashengqingads'}" replace>
          <div class="left">
            <img style="width:38px;height:38px;left:8px;" src="../assets/img/user-wode-fuwushang.jpg"/>
            <span>服务商申请</span>
          </div>
          <div class="right">></div>
        </router-link>
        <router-link v-if="userInfo.userInfo.isDl != 0" tag="li" :to="{name:'userMf'}">
          <div class="left">
            <img style="width:38px;height:38px;left:8px;" src="../assets/img/user-wode-fuwushang.jpg"/>
            <span>服务商</span>
          </div>
          <div class="right">></div>
        </router-link>
      </ul>
    </div>
    <!-- <div class="lgout" @click="lgout">退出账户</div> -->
    <tabBar></tabBar>
  </div>

</template>
<script>
let qs = require("qs")
import tabBar from '../components/tabbar'

//卖家买家切换
import maishou from '../assets/img/user-maijia-shubiaojingguo-zuo.jpg'
import maihide from '../assets/img/user-maijia-shubiaojingguo-zuohs.jpg'
import mashow from '../assets/img/user-maijia-shubiaojingguo-you.jpg'
import mahide from '../assets/img/user-maijia-shubiaojingguo-youhs.jpg'

///具体切换 买家
import daifu from '../assets/img/wode3.gif'
import daifa from '../assets/img/wode4.gif'
import daishou from '../assets/img/wode5.gif'
import daipin from '../assets/img/wode2.gif'
import daitui from '../assets/img/wode1.png'
// 卖家
import yishou from '../assets/img/aaa_06.png'
import daifu1 from '../assets/img/aaa_08.png'
import daifa1 from '../assets/img/aaa_10.png'
import yifa1 from '../assets/img/aaa_03.png'
import jushou from '../assets/img/aaa_17.png'
import tousu from '../assets/img/aaa_20.png'

import userxiaoxi from '../assets/img/user-xiaoxi.jpg'

export default {
  data(){
    return {
      headerImg:"",
      maiImg:"",
      maImg:"",
      daifu,
      daifa,
      daishou,
      daipin,
      daitui,
      yishou,
      daifu1,
      daifa1,
      yifa1,
      jushou,
      tousu,
      maiJia:true,
      maJia:false,
      userName:"",
      glgImg:"https://api.guligou.com/",
      userInfo:{},
      num:null,
      userxiaoxi
    }
  },
  computed:{
    // isNewMessage(){
    //   let num = null;
    //   setInterval(() => {
    //     this.$http.post("https://api.guligou.com/api/index/getSysMessages",qs.stringify({
    //       token:this.userInfo.userInfo.toKen,
    //       tasks:'message'
    //     }))
    //     .then((data) => {
    //      this.num = data.data.message.num;
    //     })
    //   },3000)
    // },
  },
  methods:{
    gotoMessage(){
      this.$router.push("/wodexiaoxi");
    },
    getMessage(){
      this.$http.post("https://api.guligou.com/api/index/getSysMessages",qs.stringify({
        token:this.userInfo.userInfo.toKen,
        tasks:'message'
      }))
      .then((data) => {
        this.num = data.data.message.num;
      })
    },
    changeUserMai(){
      console.log(maishou)
      this.maiImg = maishou;
      this.maImg = mahide;
      this.maiJia = true;
      this.maJia = false;
    },
    changeUserMa(){
      this.maiImg = maihide;
      this.maImg = mashow;
      this.maiJia = false;
      this.maJia = true;
    },
  },
  components:{tabBar},
  created() {
    this.maiImg = maishou;
    this.maImg = mahide;
    this.userInfo = this.$local.fetch("glg");
    this.$http.post("https://api.guligou.com/api/Users/getById.html",qs.stringify({
        token:this.userInfo.userInfo.toKen,
    }))
    .then((data) => {
        this.$local.save("glg",{
            login:true,
            userInfo:data.data
        })
        this.userInfo = this.$local.fetch("glg");
    })
    if(this.userInfo.userInfo.userName == null){
      this.userName = "快去设置昵称吧";
    }else{
      this.userName = this.userInfo.userInfo.userName;
    }
    this.headerImg = this.userInfo.userInfo.userPhoto;
    this.getMessage();
    setInterval(this.getMessage,3000)

  },
}
</script>

