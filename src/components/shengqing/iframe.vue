<template>
    <div>
        <div type="text" @click="dialogFormVisible = true">
            <a href="javascript:;" style="color:red">点击参考《鼓励购行业分类及资质》</a>
        </div>
        <el-dialog
            width="95%"
            title="鼓励购行业分类及资质"
            :visible.sync="dialogFormVisible"
            center
        >
            <iframe 
                name="wendang" 
                height="400px" 
                scrolling="no" 
                width="100%" 
                frameborder="0" 
                src="https://api.guligou.com/upload/daili/zhengjian/zizhi.pdf"
                hspace ="0"  
                vspace ="0"  
                id ="SellMoney"  
                allowTransparency ="true"
            >
            ssssss
            </iframe>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dialogFormVisible:false
        }
    }
}
</script>

