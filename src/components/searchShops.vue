<template>
  <header>
      <div class="glg-header-search">
          <div class="glg-header-img" @click="searchValue"></div>
          <input
            type="text"
            v-model="inputValue"
            @keyup.enter="searchValue"
            placeholder="请输入你要搜索的商品"
          />
      </div>
  </header>
</template>
<script>
export default {
  data(){
    return {
      inputValue:""
    }
  },
  methods:{
    searchValue(){
      if(this.inputValue){
        this.$router.push({
        path:"/searchPage",
            query:{
              keyword:this.inputValue
            }
        });
        this.$http.get(`https://api.guligou.com/api/goods/search.html?keyword=${this.inputValue}`)
        .then((data) => {
            this.$emit('getSearchData',data.data.goodsPage.Rows);
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }

}
</script>
