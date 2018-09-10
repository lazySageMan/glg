import Vue from 'vue'
import Router from 'vue-router'

//tabBar导航
import index from '@/views/index'
import classify from '@/views/classify'
import searchPage from '@/views/searchPage'
import details from '@/views/details'
import shopping from "@/views/shopping"
import brand from '@/views/brand'


//details子路由
import detailsD from '@/components/details/details-3'
import detailsS from '@/components/details/details-2'
import detailsC from '@/components/details/details-1'
import detailsY from '@/components/details/details-4'

//user
//买家
import userIndex from "@/views/userIndex"
import userLogin from '@/views/userLogin'
import userRegister from "@/views/userRegister"
import userSz from '@/views/userSz'
import userShouC from '@/views/userShouC'
import userKe from '@/views/userKe'
import yitousuDetails from '@/components/bullPosition/yitousuDetails'
//买家账户设置
import ziliaoshezhi from '@/components/userXingqing/ziliaoshezhi'
import shouhuodizhi from '@/components/userXingqing/shouhuodizhi'
import anquanshezhi from '@/components/userXingqing/anquanshezhi'
//买家提线
import tixianguan from '@/components/tixianguanli/tixianguan'

import tixianjilu from '@/components/tixianguanli/tixianjilu'
import tixianzhanghao from '@/components/tixianguanli/tixianzhanghao'
//买家收藏
import shouchang from '@/components/shouchang/shouchang'
import shouchangP from '@/components/shouchang/shouchangP'
//买家消息
import wodexiaoxi from '@/components/xiaoxi/wodexiaoxi'
import xiaoxiDetails from '@/components/xiaoxi/xiaoxiDetails'
//我的邀请
import wodeyaoqing from '@/components/yaoqing/wodeyaoqing'
import yiyaoqingyong from '@/components/yaoqing/yiyaoqingyong'
//买家投诉
import toushuchaxun from '@/components/toushuc/toushuchaxun'
//买家返现
import wodefanxian from '@/components/fanxian/wodefanxian'
//买家
import userMp from '@/views/userMp'
import userMz from '@/views/userMz'
import userMf from '@/views/userMf'


//买家
import dingDan from "@/components/bullPosition/dingDan"
import accountpaid from "@/components/bullPosition/accountpaid"
import dingDanDaifa from "@/components/bullPosition/dingDanDaifa"
import dingDanDaifu from "@/components/bullPosition/dingDanDaifu"
import dingDanDaiping from "@/components/bullPosition/dingDanDaiping"
import dingDanShouhou from "@/components/bullPosition/dingDanShouhou"
import dingdanMost from "@/components/bullPosition/dingdanMost" 
import dingDanwang from "@/components/bullPosition/dingDanwan"
import shopDetails from '@/components/bullPosition/shopDetails'
import pingjia from '@/components/bullPosition/pingjia'
import wuliu from '@/components/bullPosition/wuliu'
import dingdanQuxiao from '@/components/bullPosition/dingdanQuxiao'

//卖家
import maijia from "@/components/seller/maijia"
import maiDaifa from '@/components/seller/maiDaifa'
import maiDaifu from '@/components/seller/maiDaifu'
import maiJusou from '@/components/seller/maiJusou'
import maiTousu from '@/components/seller/maiTousu'
import maiYifa from '@/components/seller/maiYifa'
import maiYishou from '@/components/seller/maiYishou'
import maijiaTouDetails from '@/components/seller/maijiaTouDetails'
import maijiaDetails from '@/components/seller/maijiaDetails'
import maijiatuikuanDeta from '@/components/seller/maijiatuikuanDeta'

//店铺设置
import dianpujie from '@/views/dianpujie'
import dianpuziliao from '@/components/maiDianpu/dianpuziliao'

//店铺店铺街

import dianpu from '@/views/dianpu'
//专栏店铺
import zhuanlandianpu from '@/views/zhuanlandianpu'

//glg自营店铺
import ziyingdianpu from '@/views/ziyingdianpu'

//服务商

import zaixiankefu from '@/components/fuwushang/zaixiankefu'
import fuwushangliubiao from '@/components/fuwushang/fuwushangliubiao'
import zijingliushui from '@/components/fuwushang/zijingliushui'

//卖家，服务商申请
import fuwushangshengqing from '@/components/shengqing/fuwushangshengqing'
import maijiashengqing from '@/components/shengqing/maijiashengqing'
import shopShengqinads from '@/views/shopShengqinads'
import maijiashengqingads from '@/views/maijiashengqingads'

//找回密码

import wangjimimaZ from '@/components/wangjimima/wangjimimaZ'
import wangjimimaPhone from '@/components/wangjimima/wangjimimaPhone'
//微信支付
import wxpay from "@/components/wechat/wxpay"
import sale from '@/views/sale'

Vue.use(Router)

let router = new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "index",
      component: index,
      meta:{
        title:"鼓励购商城",
        bg:"#fff"
      }
    },
    {
      path: "/shopShengqinads",
      name: "shopShengqinads",
      component: shopShengqinads,
      meta:{
        title:"开店申请",
        bg:"#fff"
      }
    },
    {
      path: "/maijiashengqingads",
      name: "maijiashengqingads",
      component: maijiashengqingads,
      meta:{
        title:"服务商申请",
        bg:"#fff"
      }
    },
    {
      path: "/wangjimimaZ",
      name: "wangjimimaZ",
      component: wangjimimaZ,
      meta:{
        title:"找回密码",
      }
    },
    {
      path: "/wangjimimaZ",
      name: "wangjimimaZ",
      component: wangjimimaZ,
      meta:{
        title:"找回密码",
      }
    },
    {
      path: "/wangjimimaPhone",
      name: "wangjimimaPhone",
      component: wangjimimaPhone,
      meta:{
        title:"身份确认",
      }
    },
    {
      path: "/classify",
      name: "classify",
      component: classify,
      meta:{
        title:"分类页",
        bg:"#fff"
      }
    },
    {
      path: "/searchPage",
      name: "searchPage",
      component: searchPage,
      meta:{
        title:"商品列表"
      }
    },
    {
      path: "/maijiatuikuanDeta",
      name: "maijiatuikuanDeta",
      component: maijiatuikuanDeta,
      meta:{
        title:"投诉详情",
        bg:"#fff"
      }
    },
    {
      path: "/dianpujie",
      name: "dianpujie",
      component: dianpujie,
      meta:{
        title:"店铺街"
      }
    },
    {
      path: "/xiaoxiDetails",
      name: "xiaoxiDetails",
      component: xiaoxiDetails,
      meta:{
        title:"消息详情",
      }
    },
    {
      path: "/details",
      component: details,
      children: [
        {
          path: "",
          name: "detailsS",
          component: detailsS,
          meta:{
            title:"商品详情",
            bg:"#fff"
          }
        },
        {
          path: "detailsC",
          name: "detailsC",
          component: detailsC,
          meta:{
            title:"商品详情",
            bg:"#fff"
          }
        },
        {
          path: "detailsY",
          name: "detailsY",
          component: detailsY,
          meta:{
            title:"商品详情",
            bg:"#fff"
          }
        }
      ]
    },
    {
      path: "/shopping",
      name: "shopping",
      component: shopping,
      meta: {
        title:"购物车",
        login: true,
        bg:"#fff"
      }
    },
    {
      path: "/brand",
      name: "brand",
      component: brand,
      meta:{
        title:"品牌页",
        bg:"#fff"
      }
    },
    {
      path: "/userIndex",
      component: userIndex,
      meta: {
        login: true,
        title:"会员中心"
      }
    },
    {
      path: "/userLogin",
      name: "userLogin",
      component: userLogin,
      meta:{
        title:"用户登录"
      }
    },
    {
      path: "/userRegister",
      name: "userRegister",
      component: userRegister,
      meta:{
        title:"用户注册"
      }
    },
    {
      path: "/sale",
      name: "sale",
      component: sale,
      meta: {
        login: true,
        title:"确认订单"
      }
    },
    {
      path: "/wxpay",
      name: "wxpay",
      component: wxpay,
      meta: {
        login: true
      }
    },
    {
      path: "/shopDetails",
      name: "shopDetails",
      component: shopDetails,
      meta: {
        login: true
      }
    },
    {
      path: "/pingjia",
      name: "pingjia",
      component:pingjia,
      meta:{
        title:"用户评价",
        login:true
      } 
    },
    {
      path: "/dingDan",
      component: dingDan,
      meta: {
        login: true,
      },
      children: [
        {
          path: "dingdanQuxiao",
          name: "dingdanQuxiao",
          component: dingdanQuxiao,
          meta:{
            login:true,
            title:"取消订单"
          }
        },
        {
          path: "dingdanMost",
          name: "dingdanMost",
          component: dingdanMost,
          meta:{
            login:true,
            title:"全部订单"
          }
        },
        {
          path: "accountpaid",
          name: "accountpaid",
          component: accountpaid,
          meta:{
            login:true,
            title:"待收货订单"
          }
        },
        {
          path: "",
          name: "dingDanDaifu",
          component: dingDanDaifu,
          meta:{
            login:true,
            title:"待付款订单"
          }
        },
        {
          path: "dingDanDaifa",
          name: "dingDanDaifa",
          component: dingDanDaifa,
          meta:{
            login:true,
            title:"待发货订单"
          }
        },
        {
          path: "dingDanDaiping",
          name: "dingDanDaiping",
          component: dingDanDaiping,
          meta:{
            login:true,
            title:"待评价订单"
          }
        },
        {
          path: "dingDanShouhou",
          name: "dingDanShouhou",
          component: dingDanShouhou,
          meta:{
            login:true,
            title:"投诉/售后订单"
          }
        },
        {
          path: "dingDanwang",
          name: "dingDanwang",
          component: dingDanwang,
          meta:{
            login:true,
            title:"已完成订单"
          }
        }
      ]
    },
    {
      path: "/wuliu",
      name: "wuliu",
      component:wuliu,
      meta:{
        login:true,
        title:"物流详情",
        bg:"#fff"
      }
    },
    {
      path: "/dianpu",
      name: "dianpu",
      component: dianpu,
      meta:{
        login:true,
        title:"店铺详情"
      }
    },
    {
      path: "/userSz",
      name: "userSz",
      component: userSz,
      meta:{
        login:true,
        title:"用户设置"
      }
    },
    {
      path: "/userShouC",
      name: "userShouC",
      component: userShouC,
      meta:{
        login:true,
        title:"用户收藏"
      }
    },
    {
      path: "/userKe",
      name: "userKe",
      component: userKe,
      meta:{
        login:true,
        title:"客户管理"
      }
    },
    {
      path: "/userMp",
      name: "userMp",
      component: userMp,
      meta:{
        login:true,
        title:"店铺资料"
      }
    },
    {
      path: "/userMz",
      name: "userMz",
      component: userMz,
      
    },
    {
      path: "/userMf",
      name: "userMf",
      component: userMf,
      meta:{
        login:true,
        title:"服务商"
      }
    },
    {
      path: "/ziliaoshezhi",
      name: "ziliaoshezhi",
      component: ziliaoshezhi,
      meta:{
        login:true,
        title:"资料设置"
      }
    },
    {
      path: "/shouhuodizhi",
      name: "shouhuodizhi",
      component: shouhuodizhi,
      meta:{
        login:true,
        title:"收货地址"
      }
    },
    {
      path: "/anquanshezhi",
      name: "anquanshezhi",
      component: anquanshezhi,
      meta:{
        login:true,
        title:"安全设置"
      }
    },
    {
      path: "/tixianguan",
      name: "tixianguan",
      component: tixianguan,
      meta:{
        login:true,
        title:"提现管理"
      }
    },
    // {
    //   path: "/shengqingtixian",
    //   name: "shengqingtixian",
    //   component: shengqingtixian
    // },
    {
      path: "/shouchang",
      name: "shouchang",
      component: shouchang,
      meta:{
        login:true,
        title:"商家收藏"
      }
    },
    {
      path: "/shouchangP",
      name: "shouchangP",
      component: shouchangP,
      meta:{
        login:true,
        title:"商品收藏"
      }
    },
    {
      path: "/toushuchaxun",
      name: "toushuchaxun",
      component: toushuchaxun,
      meta:{
        login:true,
        title:"投诉管理"
      }
    },
    {
      path: "/wodexiaoxi",
      name: "wodexiaoxi",
      component: wodexiaoxi,
      meta:{
        login:true,
        title:"我的消息"
      }
    },
    {
      path: "/wodeyaoqing",
      name: "wodeyaoqing",
      component: wodeyaoqing,
      meta:{
        login:true,
        title:"我的邀请"
      }
    },
    {
      path: "/wodefanxian",
      name: "wodefanxian",
      component: wodefanxian,
      meta:{
        login:true,
        title:"我的返现"
      }
    },
    {
      path: "/yiyaoqingyong",
      name: "yiyaoqingyong",
      component: yiyaoqingyong,
      meta:{
        login:true,
        title:"已邀请的用户"
      }
    },
    {
      path: "/tixianjilu",
      name: "tixianjilu",
      component: tixianjilu,
      meta:{
        login:true,
        title:"提现记录"
      }
    },
    {
      path: "/tixianzhanghao",
      name: "tixianzhanghao",
      component: tixianzhanghao,
      meta:{
        login:true,
        title:"提现账号"
      }
    },
    {
      path: "/maijiaDetails",
      name: "maijiaDetails",
      component: maijiaDetails,
      meta:{
        login:true,
        title:"订单详情",
        bg:"#fff"
      }
    },
    {
      path:"/maijiaTouDetails",
      name:"maijiaTouDetails",
      component:maijiaTouDetails,
      meta:{
        login:true,
        title:"投诉订单详情",
      }
    },
    {
      path:"/maijia",
      component:maijia,
      children:[
        {
          path:"",
          name:"maiDaifa",
          component:maiDaifa,
          meta:{
            login:true,
            title:"待发货"
          }
        },
        {
          path:"maiDaifu",
          name:"maiDaifu",
          component:maiDaifu,
          meta:{
            login:true,
            title:"待付款"
          }
        },
        {
          path:"maiJusou",
          name:"maiJusou",
          component:maiJusou,
          meta:{
            login:true,
            title:"拒收订单"
          }
        },
        {
          path:"maiTousu",
          name:"maiTousu",
          component:maiTousu,
          meta:{
            login:true,
            title:"投诉订单"
          }
        },
        {
          path:"maiYifa",
          name:"maiYifa",
          component:maiYifa,
          meta:{
            login:true,
            title:"已发货订单"
          }
        },
        {
          path:"maiYishou",
          name:"maiYishou",
          component:maiYishou,
          meta:{
            login:true,
            title:"已收货订单"
          }
        }
      ]
    },
    {
      path:"/dianpuziliao",
      name:"dianpuziliao",
      component:dianpuziliao,
      meta:{
        login:true,
        title:"店铺资料详情"
      }
    },
    {
      path:"/zaixiankefu",
      name:"zaixiankefu",
      component:zaixiankefu,
      meta:{
        login:true,
        title:"客服资料"
      }
    },
    {
      path:"/fuwushangliubiao",
      name:"fuwushangliubiao",
      component:fuwushangliubiao,
      meta:{
        login:true,
        title:"服务商列表"
      }
    },
    {
      path:"/zijingliushui",
      name:"zijingliushui",
      component:zijingliushui,
      meta:{
        login:true,
        title:"资金流水详情"
      }
    },
    {
      path:"/zhuanlandianpu",
      name:"zhuanlandianpu",
      component:zhuanlandianpu,
      meta:{
        title:"专栏店铺",
        bg:"#fff"
      }
    },
    {
      path:"/ziyingdianpu",
      name:"ziyingdianpu",
      component:ziyingdianpu,
      meta:{
        title:"鼓励购自营店铺",
        bg:"#fff"
      }
    },
    {
      path:"/fuwushangshengqing",
      name:"fuwushangshengqing",
      component:fuwushangshengqing,
      meta:{
        login:true,
        title:"服务商申请"
      }
    },
    {
      path:"/maijiashengqing",
      name:"maijiashengqing",
      component:maijiashengqing,
      meta:{
        login:true,
        title:"商家申请"
      }
    },
    {
      path:"/yitousuDetails",
      name:"yitousuDetails",
      component:yitousuDetails,
      meta:{
        login:true,
        title:"投诉详情"
      }
    },
  ],
  
});
router.beforeEach((to, from, next) => {
  //动态切换页面title

  if(to.matched.some((item) => item.meta.login)){
    //router.app 拿到vue的根实例
    let info = router.app.$local.fetch("glg");
    if (info.login){
      if(to.meta.title){
        document.title = to.meta.title;
        if(to.meta.bg){
          document.body.style.background = to.meta.bg;
        }else{
          document.body.style.background = "#f6f6f6";
        }
      }
      next();
    }else{
      //这里进行跳转到微信授权的借口处
      router.app.$confirm('您还没有登录，是否前往登录', '提示', {
        customClass:"cusClass",
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose:false,
        type: 'warning',
        center: true,
      })
      .then(() => {
        if(to.meta.title){
          document.title = to.meta.title;
        }
        if(to.meta.bg){
          document.body.style.background = to.meta.bg;
        }else{
          document.body.style.background = "#f6f6f6";
        }
        router.push("/userLogin");
      })
      .catch(() => {
        if(from.meta.title){
          document.title = from.meta.title;
        }
        if(from.meta.bg){
          document.body.style.background = from.meta.bg;
        }else{
          document.body.style.background = "#f6f6f6";
        }
      })
    }
  }else{
    if(to.meta.title){
      document.title = to.meta.title;
    }
    if(to.meta.bg){
      document.body.style.background = to.meta.bg;
    }else{
      document.body.style.background = "#f6f6f6";
    }
    next();
  }
  //目标路由的信息
});

export default router;

