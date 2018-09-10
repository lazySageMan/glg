<template>
  <div class="glg-header-1">
      <router-link tag="div" active-class="active" class="glg-header-2" :to="{name:'detailsS'}" replace exact>商品</router-link>
      <router-link tag="div" active-class="active" class="glg-header-3" :to="{name:'detailsD'}" replace>详情</router-link>
      <router-link tag="div" active-class="active" class="glg-header-4" :to="{name:'detailsC'}" replace>评价</router-link>
      <router-link tag="div" active-class="active" class="glg-header-5" :to="{name:'detailsY'}" replace>溯源</router-link>
  </div>
</template>
<script>
export default {
  methods:{
    backToPage(){
      this.$router.back();
    }
  },
}
</script>

