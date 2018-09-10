<template>
  <el-cascader
    :options="options2"
    separator="-"
    @active-item-change="handleItemChange"
    :props="props"
    style="width:100%"
    @change="getCHangeId"
  >
  </el-cascader>
</template>
<script>
let qs = require("qs");
  export default {
    data() {
      return {
        options2: [],
        props: {
          value: 'label',
          children: 'cities'
        },
        areaId:[],
      };
    },

    methods: {
      handleItemChange(val) {
        this.options2.forEach((item) => {
          if(item.cities.length){
            item.cities.forEach((items) => {

              if(items.cities.length){

              }else{

                if(val.indexOf(items.label) > -1){


                  this.$http.post("https://api.guligou.com/api/areas/listQuery",qs.stringify({
                    parentId:items.areaId
                  }))
                  .then((data) => {

                    for(var key in data.data){
                      if(data.data.length == 0){
                      }else{
                        items.cities.push({label:data.data[key].areaName,areaId:data.data[key].areaId});
                      }
                    }
                  })
                }
              }

            })

          }else{

            if(val.indexOf(item.label) > -1){

              this.$http.post("https://api.guligou.com/api/areas/listQuery",qs.stringify({
                parentId:item.areaId
              }))
              .then((data) => {
                for(var key in data.data){
                  if(data.data.length == 0){
                    item.cities.push("");
                  }else{
                    item.cities.push({label:data.data[key].areaName,cities:[],areaId:data.data[key].areaId});
                  }
                }
              })
            }
          }
        })
      },
      getCHangeId(val){
        this.areaId = [];
        this.options2.forEach((item) => {
          if(val[0].indexOf(item.label) > -1){
            this.areaId.push(item.areaId);
            item.cities.forEach((items) => {
              if(val[1].indexOf(items.label) > -1){
                this.areaId.push(items.areaId);
                items.cities.forEach((itemss) => {
                  if(val[2].indexOf(itemss.label) > -1){
                    this.areaId.push(itemss.areaId);
                  }
                })
              }
            })
          }
        })
        if(this.areaId.length){
          this.$emit("setData",this.areaId);
        }
      }
    },
    created() {
      this.$http.post("https://api.guligou.com/api/areas/listQuery")
      .then((data) => {
        for(var key in data.data){
            this.options2.push({label:data.data[key].areaName,cities:[],areaId:data.data[key].areaId});
        }
      })
    }
  };
</script>

