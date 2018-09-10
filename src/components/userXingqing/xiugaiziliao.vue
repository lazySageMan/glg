<template>
    <div>
        <!-- 昵称 -->
        <div v-if="status == 1" @click="dialogFormVisible = true">{{from.name}}&nbsp;></div>
        <!-- 姓名 -->
        <div v-if="status == 2" @click="dialogFormVisible = true">{{from.trueName}}&nbsp;></div>
        <!-- 性别 -->
        <div v-if="status == 3" @click="dialogFormVisible = true">{{isSex}}&nbsp;></div>
        <!-- 生日 -->
        <div v-if="status == 4" @click="dialogFormVisible = true">{{brithday}}&nbsp;></div>

        <div v-if="status == 5" @click="dialogFormVisible = true">
            <div v-if="from.userPhoto != ''" class="glg-user-head" :style="{background:'url('+glgImg+from.userPhoto+') no-repeat 50%/100%'}">
                <h3 style="color:#fff;position:relative;z-index: 1000;">点击选择头像</h3>
                <div class="glg-user-head-wrap"></div>
                <div class="glg-user-head-img" :style="{background:'url('+glgImg+from.userPhoto+') no-repeat 0/100%'}"></div>
                <p>{{userInfo.userInfo.userName}}</p>
            </div>
            <div v-if="from.userPhoto == ''" class="glg-user-head" :style="{background:'url('+userxiaoxi+') no-repeat 50%/100%'}">
                <h3 style="color:#fff;position:relative;z-index: 1000;">点击选择头像</h3>
                <div class="glg-user-head-wrap"></div>
                <div class="glg-user-head-img" :style="{background:'url('+userxiaoxi+') no-repeat 0/100%'}"></div>
                <p>{{userInfo.userInfo.userName}}</p>
            </div>
        </div>
        <el-dialog
            :visible.sync="dialogFormVisible"
            title="修改信息"
            width="95%"
            center
            :show-close="false"
        >   
            <!-- 修改昵称 -->
            <el-form
                v-if="status == 1"
            >
                <el-input v-model="from.name"></el-input>
            </el-form>
            <!-- 修改姓名 -->
            <el-form 
                v-if="status == 2"
            >
                <el-input v-model="from.trueName"></el-input>
            </el-form>
            <div
               v-if="status == 3" 
            >
                <el-radio v-model="from.userSex" label="1">男</el-radio><br>
                <el-radio v-model="from.userSex" label="2">女</el-radio>
            </div>
            <!-- 修改生日 -->
            <el-form
                v-if="status == 4"
            >
                <el-col :span="11" style="width:100%">
                    <el-date-picker type="date" placeholder="选择日期" v-model="from.brithday" style="width: 100%"></el-date-picker>
                </el-col>
                <div style="height:50px;"></div>
            </el-form>

            <!-- 修改头像 -->
            <div v-if="status == 5">
                <el-upload
                    class="sppj-tupian-addImg-img"
                    action="https://api.guligou.com/api/index/uploadPic.html"
                    :show-file-list="false"
                    :multiple="true"
                    :data="param"
                    :on-success="success"
                >
                    <div style="width:300px;text-align:center;">
                        <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    </div>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="isConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import isImg from '../../assets/img/user-wode-bj.jpg'
import userxiaoxi from '../../assets/img/user-xiaoxi.jpg'
  export default {
    props:{
        status:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            from:{
                name:"",
                trueName:"",
                brithday:"",
                userSex:"1",
                userPhoto:""
            },
            isImg:isImg,
            dialogFormVisible: false,
            userInfo:{},
            param:{},
            glgImg:"https://api.guligou.com/",
            dialogVisible:false,
            sendAddress:"",
            userxiaoxi

        }
    },
    methods:{
        isConfirm(){
            if(this.status == 1){
                this.$store.commit("changeuserName",this.from.name);
                this.dialogFormVisible = false;
            }
            else if(this.status == 2){
                this.$store.commit("changetrueName",this.from.trueName);
                this.dialogFormVisible = false;
            }
            else if(this.status == 4){
                this.$store.commit("changebrithday",this.from.brithday);
                this.dialogFormVisible = false;
            }
            else if(this.status == 3){
                this.$store.commit("changeuserSex",this.from.userSex);
                this.dialogFormVisible = false;
            }
            else if(this.status == 5){
                this.$store.commit("changeuserPhoto",this.from.userPhoto);
                this.dialogFormVisible = false;
            }
        },
        cancel(){
            if(this.status == 1){
                this.from.name = this.userInfo.userInfo.userName;
                this.dialogFormVisible = false;
            }
            else if(this.status == 2){
                this.from.trueName = this.userInfo.userInfo.trueName;
                this.dialogFormVisible = false;
            }
            else if(this.status == 4){
                this.from.brithday = this.userInfo.userInfo.brithday;
                this.dialogFormVisible = false;
            }
            else if(this.status == 3){
                this.from.userSex = this.userInfo.userInfo.userSex;
                this.dialogFormVisible = false;
            }
            else if(this.status == 5){
                this.from.userPhoto = this.userInfo.userInfo.userPhoto;
                this.dialogFormVisible = false;
            }
        },
        success(response, file, fileList){
          let res = JSON.parse(response);
          let url = res.savePath + res.name;
          this.sendAddress += `${url},`;
          this.from.userPhoto = `${url}`;
          console.log(this.sendAddress);
          this.dialogVisible = false;
      },
    },
    computed:{
        isSex(){
            let sex =""
            return this.from.userSex == 2 ? sex ="女" : sex = "男"
        },
        brithday(){
            // console.log(typeof this.from.brithday)
            // console.log(t)
            if((typeof this.from.brithday) == 'string'){
                return this.from.brithday;
            }else if((typeof this.from.brithday) == 'string'){
                let myTime = this.from.brithday.getFullYear() +'-'+(this.from.brithday.getMonth()+1) +'-'+this.from.brithday.getDate()
                return myTime;
            }
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
        this.from.name = this.userInfo.userInfo.userName;
        this.from.trueName = this.userInfo.userInfo.trueName;
        this.from.brithday = this.userInfo.userInfo.brithday || '';
        this.from.userSex = `${this.userInfo.userInfo.userSex}`;
        this.from.userPhoto = this.userInfo.userInfo.userPhoto;
        this.param = {
            dir:"appraises",
            token:this.userInfo.userInfo.toKen

        }
    }
  };
</script>
