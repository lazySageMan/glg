<template>
    <router-view :shopId="id"></router-view>
</template>
<script>
export default {
  data(){
    return {
      id:0,
    }
  },
  created() {
    this.id = Number(this.$route.query.id);
    // console.log(this.$route.params.id);
  },
}
</script>

