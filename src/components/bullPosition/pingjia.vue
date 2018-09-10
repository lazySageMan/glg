<template>
    <div class="glg-wrap" style="background:#f6f6f6">
        <!--商品1 -->
        <div 
            class="glg-wrap-pingjia"
            :key="index"
            v-for="(item,index) in shopInfo"
        >
            <div class="glg-dingdangunali-shangpin1" style="background-color:#f0f0f0">
                <div class="glg-dingdangunali-shangpin-juti">
                    <div style=" height:18%"></div>
                    <img :src="glgImg+item.goodsImg" width="20%" style="float:left;"/>
                    <div class="glg-dingdangunali-shangpin-juti1">
                        <span>{{item.goodsName}}</span>
                    </div>
                </div>
            </div> 
            <div style="width:100%; height: 120px;margin-top:30px;">
                <div style="width:90%; margin:auto; height:38%; ">
                    <textarea v-if="item.appraise == null" v-model="content" class="pngjiatetxt" cols="35" rows="5" placeholder="商品满足您的期待吗？说说商品的优点和美中不足的地方吧"></textarea>
                    <p v-if="item.appraise != null" class="pngjiatetxt" >{{item.appraise.content}}</p>
                </div>
            </div>
            <div class="sppj-bj">
                <div class="sppj-tupian">
                    <div 
                        class="sppj-tupian-addImg"
                        v-if="item.appraise == null"
                    >
                        <el-upload
                            class="sppj-tupian-addImg-img"
                            action="https://api.guligou.com/api/index/uploadPic.html"
                            list-type="picture-card"
                            :on-remove="handleRemove"
                            :multiple="true"
                            :limit="5"
                            :data="param"
                            :on-success="success"
                        >
                            <img src="../../assets/img/shangpinpingjiatupian.jpg" style="width:100%"/>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img :src="dialogImageUrl">
                        </el-dialog>
                    </div>
                    <div 
                        v-if="item.appraise != null"
                        class="sppj-tupian-addImg"
                    >
                        <div
                            :key="indexs"
                            v-for="(items,indexs) in item.appraise.images"
                            style="width:25%;height:75px"
                        >
                            <img :src="glgImg+items" width="100%">
                        </div>
                    </div> 
                    <div 
                        class="sppjwujiaoxing"
                        v-if="item.appraise == null"
                    >
                        <div class="sppjpinglun">
                            <span>商品评分</span>
                            <div style="margin-left:15px">
                                <div class="block">
                                    <el-rate
                                        v-model="item.value1"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :allow-half="true"
                                        :show-text="true"
                                        :texts="['差评','不满意','一般','不错','特别棒']"
                                        @change="changeScore"
                                    >
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                        <div class="sppjpinglun">
                            <span>时效评分</span>
                            <div style="margin-left:15px">
                                <div class="block">
                                    <el-rate
                                        v-model="item.value2"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :allow-half="true"
                                        :show-text="true"
                                        :texts="['差评','不满意','一般','不错','特别棒']"
                                        @change="changeScore"
                                    >
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                        <div class="sppjpinglun">
                            <span>服务评分</span>
                            <div style="margin-left:15px">
                                <div class="block">
                                    <el-rate
                                        v-model="item.value3"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :allow-half="true"
                                        :show-text="true"
                                        :texts="['差评','不满意','一般','不错','特别棒']"
                                        @change="changeScore"   
                                    >
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div 
                        class="sppjwujiaoxing"
                        v-if="item.appraise != null"
                    >
                        <div class="sppjpinglun">
                            <span>商品评分</span>
                            <div style="margin-left:15px">
                                <div class="block">
                                    <el-rate
                                        :disabled="true"
                                        v-model="item.appraise.goodsScore"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :allow-half="true"
                                        :show-text="true"
                                        :texts="['差评','不满意','一般','不错','特别棒']"
                                        @change="changeScore"
                                    >
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                        <div class="sppjpinglun">
                            <span>时效评分</span>
                            <div style="margin-left:15px">
                                <div class="block">
                                    <el-rate
                                        :disabled="true"
                                        v-model="item.appraise.timeScore"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :allow-half="true"
                                        :show-text="true"
                                        :texts="['差评','不满意','一般','不错','特别棒']"
                                        @change="changeScore"
                                    >
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                        <div class="sppjpinglun">
                            <span>服务评分</span>
                            <div style="margin-left:15px">
                                <div class="block">
                                    <el-rate
                                        :disabled="true"
                                        v-model="item.appraise.serviceScore"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :allow-half="true"
                                        :show-text="true"
                                        :texts="['差评','不满意','一般','不错','特别棒']"
                                        @change="changeScore"   
                                    >
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div 
                v-if="item.appraise == null"
                class="glg-dingdangunali-shangpin2-anniu"
                @click="pingjiaTijiao(index)"
                style="margin-right:10px"
            >
                提交评价
            </div>
            
            <div 
                v-if="item.appraise != null"
                class="glg-dingdangunali-shangpin2-anniu"
                style="margin-right:10px"
            >
                已经评价
            </div>
        </div>
    </div>
</template>
<script>
let qs = require("qs");
  export default {
    data() {
      return {
        param:{},
        userInfo:{},
        glgImg:"https://api.guligou.com/",
        shopInfo:{},
        content:"",
        orderId:"",
        dialogImageUrl:"",
        dialogVisible:false,
        sendAddress:""
      };
    },

    methods: {
      handleRemove(file, fileList) {
        console.log(fileList)
        this.sendAddress = "";
        for(var key in fileList){
            let res = JSON.parse(fileList[key].response);
            let url = res.savePath + res.name;
            this.sendAddress += `${url},`;
            //this.sendAddress = this.sendAddress.substring(0,(this.sendAddress.length-1));
        }
        console.log(this.sendAddress)
      },
      success(response, file, fileList){
          let res = JSON.parse(response);
          let url = res.savePath + res.name;
          this.sendAddress += `${url},`;
          this.dialogImageUrl = `${this.glgImg}${url}`;
          console.log(this.sendAddress);
          this.dialogVisible = false;
      },
      changeScore(score){
        console.log(score)
      },
      pingjiaTijiao(index){
          if((this.shopInfo[index].value1===0) || (this.shopInfo[index].value2===0) || (this.shopInfo[index].value3===0)){
                 this.$notify({
                    type: 'error',
                    title:'错误提醒',
                    message:'请为商品打分' ,
                    duration:2500,
                    showClose:false
                });
          }else{
              this.$http.post("https://api.guligou.com/home/goodsAppraises/add.html",qs.stringify({
                  token:this.userInfo.userInfo.toKen,
                  goodsSpecId:0,
                  orderId:this.orderId,
                  goodsId:this.shopInfo[index].goodsId,
                  goodsScore:this.shopInfo[index].value1,
                  timeScore:this.shopInfo[index].value2,
                  serviceScore:this.shopInfo[index].value3,
                  content:this.content,
                  images:this.sendAddress
              }))
              .then((data) => {
                  if(data.data.status == 1){
                       this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg ,
                            duration:2500,
                            showClose:false
                        });
                      this.$router.replace("/dingDan/dingDanDaiping");
                      this.$http.post("https://api.guligou.com/api/Orders/orderAppraise",qs.stringify({
                        token:this.userInfo.userInfo.toKen,
                        oId:this.orderId
                    }))
                    .then((data) => {
                        this.shopInfo = data.data.data;
                        console.log(data.data.data);
                    })
                  }else{
                       this.$notify({
                            type: 'error',
                            title:'错误提醒',
                            message:data.data.msg ,
                            duration:2500,
                            showClose:false
                        });
                  }
              })
          }
      }
    },
    created(){
        this.userInfo = this.$local.fetch('glg');
        this.orderId = this.$route.query.orderId;
        this.param = {
            dir:"appraises",
            token:this.userInfo.userInfo.toKen
        }
        this.$http.post("https://api.guligou.com/api/Orders/orderAppraise",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            oId:this.orderId
        }))
        .then((data) => {
            this.shopInfo = data.data.data;
            console.log(data.data.data)
        })
        
    },
  }
</script>

