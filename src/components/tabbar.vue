// 底部的tabBar公用组件

<template>
  <section class="glg-wrap glg-tabbar">
    <ul>
        <router-link to="/" tag="li" exact active-class="route-shou1">
            <div class="glg-tabbar-img" id="tabimg1"></div>
            <p>首页</p>
        </router-link>
        <router-link to="/brand" tag="li" active-class="route-shou2">
            <div class="glg-tabbar-img" id="tabimg2"></div>
            <p>品牌</p>
        </router-link>
        <router-link to="/classify" tag="li" active-class="route-shou3">
            <div class="glg-tabbar-img" id="tabimg3"></div>
            <p>分类</p>
        </router-link>
        <router-link to="/shopping" tag="li" active-class="route-shou4">
            <div class="glg-tabbar-img" id="tabimg4"></div>
            <p>购物车</p>
        </router-link>
        <router-link to="/userIndex" tag="li" active-class="route-shou5">
            <div class="glg-tabbar-img" id="tabimg5"></div>
            <p>我的</p>
        </router-link>
    </ul>
</section>
</template>
<script>


export default {
  data(){
    return {
    }
  },
  methods:{
    // gotoBar(){
    //   alert(1);
    // }
  }
}
</script>

