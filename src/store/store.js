import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let store = new Vuex.Store({
  //只能有一个store
  state: {
    pkey:"",
    // 修改用户信息
    changeUserInfo:{
    },
    //选择商品进入详情页
    shopId:null
  },
  mutations: {  
    changeuserName(state,userName){
        state.changeUserInfo.userName = userName
    },
    changetrueName(state,trueName){
        state.changeUserInfo.trueName = trueName
    },
    changebrithday(state,brithday){
        state.changeUserInfo.brithday = brithday
    },
    changeuserSex(state,userSex){
        state.changeUserInfo.userSex = userSex
    },
    changeuserPhoto(state,userPhoto){
        state.changeUserInfo.userPhoto = userPhoto
    },
    changeShopId(state,shopId){
        // console.log(shopId,5555555555555555)
        state.shopId = shopId;
    },
    changePkey(state,pk){
        console.log(pk);
        state.pkey = pk
    }
  }
});

//暴露出去

export default store;
