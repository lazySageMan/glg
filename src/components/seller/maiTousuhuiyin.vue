<template>
    <div>
        <div type="text" @click="dialogFormVisible = true">投诉回应</div>

        <el-dialog 
            title="投诉回应" 
            :visible.sync="dialogFormVisible"
            width="95%"
            center
        >
            <div class="toushuContent" style="margin-bottom:6px;">
                <h3 style="margin-bottom:6px;">应诉理由：</h3>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="具体内容"
                    v-model="textarea"
                    style="width:100%;"
                >
                </el-input>
            </div>
            <div class="toushuImg">
                <h3 style="margin-bottom:6px;">图片上传：</h3>
                <div 
                    class="sppj-tupian-addImg"
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
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toushu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let qs = require("qs");
export default {
    props:{
        complainId:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            dialogFormVisible:false,
            textarea:'',
            userInfo:{},
            sendAddress:"",
            dialogImageUrl:"",
            dialogVisible:false,
            shopInfo:"",
            param:{}
        }
    },
    methods:{
        toushu(){
            this.sendAddress = this.sendAddress.substring(0,(this.sendAddress.length-1));
            if(this.textarea  && this.sendAddress){
                console.log(this.textarea,this.sendAddress)
                this.$http.post("https://api.guligou.com/api/ordercomplains/saveRespond",qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    complainId:this.complainId,
                    respondAnnex:this.sendAddress,
                    respondContent:this.textarea,
                }))
                .then((data) =>{
                    if(data.data.status == 1){
                        this.dialogFormVisible = false;
                        this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                        setTimeout(function(){
                            window.location.reload();
                        },2500)
                    } else{
                        this.$notify({
                            type: 'error',
                            title:'错误提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                    }  
                })
                .catch((error) => {
                    console.log(error)
                })
            }else{
                this.dialogFormVisible = true;
                this.$notify({
                      type: 'error',
                      title:'错误提醒',
                      message:'完善投诉信息',
                      duration:2500,
                      showClose:false
                  });
            }
        },
        handleRemove(file, fileList) {
        this.sendAddress = "";
        for(var key in fileList){
            let res = JSON.parse(fileList[key].response);
            let url = res.savePath + res.name;
            this.sendAddress += `${url},`;
            //this.sendAddress = this.sendAddress.substring(0,(this.sendAddress.length-1));
        }
        // console.log(this.sendAddress)
      },
        success(response, file, fileList){
          let res = JSON.parse(response);
          let url = res.savePath + res.name;
          this.sendAddress += `${url},`;
          this.dialogImageUrl = `${this.glgImg}${url}`;
          console.log(this.sendAddress);
          this.dialogVisible = false;
          console.log(this.sendAddress)
      },

    },
    created(){
        //
        this.userInfo = this.$local.fetch("glg");
        //
        this.param = {
            dir:"complains",
            token:this.userInfo.userInfo.toKen
        }
    }
}
</script>
