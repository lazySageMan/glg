
import Vue from 'vue'
import App from './App'
import router from "./router";

//引入css文件
import '@/assets/css/app.css'

//引入 swiper 插件
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);

//引入axios 
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios);

//引入操作localstory的插件
import localIfo from '@/lib/localIfo'
Vue.use(localIfo);

//引入element-ui
import elementUI from "element-ui"
Vue.use(elementUI);
import '@/assets/css/element.scss'
// import "element-ui/lib/theme-chalk/index.css"

//引入状态管理
import store from "@/store/store"

//引入weixin-js-sdk
import wx from 'weixin-js-sdk'
Vue.use(wx);

//引入图片预览组件
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
