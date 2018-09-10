<template>
    <div class="glg-wrap">
        <div class="glg-message">
            <p class="glg-message-time">{{messageInfo.createTime}}</p>
            <div class="glg-message-content">
                <p>{{messageInfo.msgContent}}</p>
            </div>
        </div>
    </div>
</template>
<script>
let qs = require("qs")
export default {
    data(){
        return {
            messageId:'',
            messageInfo:{},
            userInfo:{}
        }
    },
    created(){
        this.messageId = this.$route.query.id;
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/messages/showMsg.html",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            msgId:this.messageId,
        }))
        .then((data) => {
            this.messageInfo = data.data;
        })
    }
}
</script>


