<template>
    <el-upload
        class="sppj-tupian-addImg-imgs"
        action="https://api.guligou.com/api/index/uploadPic.html"
        :show-file-list="false"
        :multiple="true"
        :data="param"
        style="height:25px"
        :on-success="success"
    >
        <a href="javascript:;" style="width:65px;;margin-left:160%;height:20px;" class="file">点击上传</a> 
        <!-- <div style="height:30px;width:100%"></div>  -->
    </el-upload>
</template>
<script>
export default {
    props:{
        status:{
            type:Number,
            default:1
        }
    },
    data(){
        return {
            param:{},
            shopInfo:{},
        }
    },
    methods: {
        success(response, file, fileList){
            let res = JSON.parse(response);
            let url = res.savePath + res.name;
            if(this.status == 1){
                let re = {
                    url:url,
                    status:this.status
                }
                this.$emit("resData",re);
            }else if(this.status == 2){
                let re = {
                    url:url,
                    status:this.status
                }
                this.$emit("resData",re);
            }else if(this.status == 3){
                let re = {
                    url:url,
                    status:this.status
                }
                this.$emit("resData",re);
            }else if(this.status == 4){
                let re = {
                    url:url,
                    status:this.status
                }
                this.$emit("resData",re);
            }else if(this.status == 5){
                let re = {
                    url:url,
                    status:this.status
                }
                this.$emit("resData",re);
            }else if(this.status == 6){
                let re = {
                    url:url,
                    status:this.status
                }
                this.$emit("resData",re);
            }
        },
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
        //
        this.param = {
            dir:"shopconfigs",
            token:this.userInfo.userInfo.toKen
        }
    }
}
</script>

