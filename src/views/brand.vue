<template>
  <div class="glg-wrap">
        <div class="glg-shop-list">
            <ul>
                <li v-for="(item,index) in brandList"
                    :key="index"
                    @click="gotoBrandList(item.brandId,item.catId)"
                >
                    <div class="glg-shop-list-w">
                        <div>{{item.brandName}}</div>
                        <p>></p>
                    </div>
                </li>
            </ul>
        </div>
        <tabBar></tabBar>
  </div>
</template>
<script>
import tabBar from '@/components/tabbar'
export default {
  data(){
    return {
      brandList:[]
    }
  },
  methods:{
    gotoBrandList(brandId,cat){
      this.$router.push({
        path:"/searchPage",
        query:{
            brandId,
            cat
        }
      })
    }
  },
  components:{tabBar},
  created() {
    let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass:'changeFontFamily'
		})
    this.$http.get("https://api.guligou.com/api/brands/index")
    .then((data) => {
      this.brandList = data.data.Rows;
      loading.close();
    })
    .catch((error) => {
      console.log(error)
    })
  },
}
</script>

