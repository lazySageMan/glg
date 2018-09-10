<template>
    <div class="glg-layout" >
        <!-- biaoti#f6f5f5-->
        <div  class="glg-user-zhanghushezhi0">
            <div  class=" glg-user-zhanghushezhixia">
            	<a style=" margin-left:2%; font-weight:bold; float:left">联系信息</a>
            	<span style="color:#999; font-size:0.8em; line-height:18px; width:71%; height:100%; float:left; margin-left:2%; margin-top:4%">填写有效的联系信息能帮助我们及时与贵公司取得联系</span>
        	</div>
        </div>
        <!--01-->

        <div class="glg-dailishangshenqingxx" style="height:230px">
        	<div class="glg-dailishangshenqingxx-bj">
            	<div style="height:9%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:19%;">
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">姓名</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    <form>
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="shengqinName"
                                :rules="[
                                    { required: true, message: '申请人姓名不能为空'},
                                    { min:2,max:15, message: '姓名不少于2个字'}
                                ]"
                            >
                    	        <el-input placeholder="申请人姓名" v-model="form.shengqinName"></el-input>
                            </el-form-item>
                        </el-form>
                    </form>
                    </div>              
                </div> 
                <div style="height:9%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:19%;">
            		
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">手机号</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="shengqinPhone"
                                :rules="[
                                    { required: true, message: '申请人电话不能为空'},
                                    { min:10000000000,max:19999999999,type:'number' , message: '手机号必须为11位'}
                                ]"
                            >
                    	        <el-input placeholder="申请人电话" v-model.number="form.shengqinPhone"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>              
                </div> 
                <div style="height:9%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:19%;">
            		
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">邮箱</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    	<!-- <el-input placeholder="请输入邮箱"></el-input> -->
                        <el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="shengqinEmail"
                                :rules="[
                                    { required: true, message: '邮箱地址不能为空'},
                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                ]"
                            >
                    	        <el-input placeholder="申请人邮箱" v-model="form.shengqinEmail"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>              
                </div> 
            </div>
        </div>
         <!--2-->
         <div  class="glg-user-zhanghushezhi0" style="margin-top:2%">
            <div  class=" glg-user-zhanghushezhixia">
            	<a style=" margin-left:2%; font-weight:bold; float:left">公司信息</a>
        	</div>
        </div>
        <div class="glg-dailishangshenqingxx" style="height:600px;">
        	<div class="glg-dailishangshenqingxx-bj">
            	<div style="height:3%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:7%;">
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">公司网站</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    <form>
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="url"
                            >
                    	        <el-input placeholder="公司网站可以选填" v-model="form.url"></el-input>
                            </el-form-item>
                        </el-form>
                    </form>
                    </div>              
                </div> 
                <div style="height:2%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:7%;">	
                	<div class="glg-dailishangshenqingxx-name" >
                    	<a style="color:#000;font-size:15px">公司所在地</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    	<local @setData="getData"></local>
                    </div>              
                </div> 
                <div style="height:2%"></div>
                <div class="glg-dailishangshenqingxx-yiankong" style="margin-top:2%; height:100px">
                	<div class="glg-dailishangshenqingxx-name" >
                    	<a style="color:#000;">资质证件</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk">
                        <div
                            class="shangchuanzhanpian" 
                            :style="{background:'url('+glgImg+form.img1+') 0/100% no-repeat'}"
                        >
                            <div v-if="!this.form.img1" style="margin-top:20px;">
                                上传资质证件<br>（有年检章，jpg/png,小于1MB）
                            </div>
                        </div>
                    </div>
                </div>
                <div style=" height:10px;"></div>
                <div  class="glg-dailishangshenqingxx-tk" style="height:35px;" >
                    <shangchuan @resData="getDatas" :status="5"></shangchuan>  
                </div>
                <div style="clear:both "></div>
                <div style=" height:1%; width:100%;"></div>
                <!--001-->
                <div class="glg-dailishangshenqingxx-yiankong" style=" height:7%;">
                	<div class="glg-dailishangshenqingxx-name" >
                    	<a style="color:#000;font-size:15px;">代理商等级</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk">
                        <el-select style="width:100%" v-model="form.value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div style="height:2%"></div>
               	<div class="glg-dailishangshenqingxx-yiankong" style="margin-top:2%; height:100px">
                	<div class="glg-dailishangshenqingxx-name" >
                    	<a style="color:#000;">打款证明</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk">
                    <div
                        class="shangchuanzhanpian" 
                        :style="{background:'url('+glgImg+form.img2+') 0/100% no-repeat'}"
                    >
                        <div v-if="!this.form.img2" style="margin-top:20px;">
                            上传打款证明<br>（有年检章，jpg/png,小于1MB）
                        </div>
                    </div>
                    </div>
                </div>
                <div style=" height:10px"></div>
                <div  class="glg-dailishangshenqingxx-tk" style="height:35px;" >
                   <shangchuan @resData="getDatas" :status="6"></shangchuan>  
                </div>
                 <p  class="glg-dailishangshenqingxx-zhuyi" style="line-height:20px;color:black;"> 
                     请使用公对公支付的方式支付<span style="color:red;">{{getMoney}}</span>元的认证审核服务费，打款完成后上传打款截图。不支持个人账户支付或支付宝支付。<br>
                     公司名称：鼓励购有限公司<br>
                     开户银行名称：黑龙江鼓励购电子商务有限公司
                     562010100100939768 
                </p>    
            </div>
        </div>
        <!-- biaoti-->
        <div  class="glg-user-zhanghushezhi0" style="margin-top:2%">
            <div  class=" glg-user-zhanghushezhixia">
            	<a style=" margin-left:2%; font-weight:bold; float:left">营业信息</a>
        	</div>
        </div>
        <div class="glg-dailishangshenqingxx" style="height:150px">
        	<div class="glg-dailishangshenqingxx-bj">
            	<div style="height:5%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:25%;">
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">成立时间</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    	<div class="block">
                            <el-date-picker
                                v-model="form.brithday"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%"
                            >
                            </el-date-picker>
                        </div>
                    </div>              
                </div>
                <div style="height:5%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:50%;">
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">基本情况</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk"  style="line-height:30px">
                        <el-radio v-model="form.shang" label="1">已上市</el-radio>
                        <el-radio v-model="form.shang" label="2">融资中，未上市</el-radio><br>
                        <el-radio v-model="form.shang" label="3">有融资计划，未上市</el-radio><br>
                        <el-radio v-model="form.shang" label="4">暂无融资计划，未上市</el-radio><br>
                    </div>              
                </div> 
        	</div> 
        </div>
        <!--4-->
         <div class="glg-dailishangshenqingxx" style="height:100px;margin-top:2%">
        	<div class="glg-dailishangshenqingxx-bj">
            	<div style="height:3%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:50%;">
                	<div class="glg-dailishangshenqingxx-name" style="line-height:25px">
                    	<a style="color:#000;">曾服务过<br>企业</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk"  style="line-height:30px">
						
                        <el-radio v-model="form.fuwu" label="1">100家以上</el-radio>
                        <el-radio v-model="form.fuwu" label="2">100-200家</el-radio><br>
                        <el-radio v-model="form.fuwu" label="3">200-500家</el-radio>
                        <el-radio v-model="form.fuwu" label="4">500-1000家</el-radio><br>
                        <el-radio v-model="form.fuwu" label="5">1000家以上</el-radio><br>
                           
                    </div>              
                </div>
            </div>
         </div>
         <div class="glg-dailishangshenqingxx" style="height:100px;margin-top:2%">
        	<div class="glg-dailishangshenqingxx-bj">
            	<div style="height:3%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:50%;">
                	<div class="glg-dailishangshenqingxx-name" style="line-height:25px">
                    	<a style="color:#000;">注册资金</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk"  style="line-height:30px">
                        <el-radio v-model="form.zijin" label="1">0-100万</el-radio>
                        <el-radio v-model="form.zijin" label="2">100-500万</el-radio><br>
                        <el-radio v-model="form.zijin" label="3">500-1000万</el-radio>
                        <el-radio v-model="form.zijin" label="4">1000万以上</el-radio><br>
                    </div>              
                </div>
            </div>
         </div>
         <!--5-->
         <!--6-->
         <!--7-->
         <div class="glg-dailishangshenqingxx" style="height:150px;margin-top:2%">
        	<div class="glg-dailishangshenqingxx-bj">
            <div style="height:2%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:50%;">
                	<div class="glg-dailishangshenqingxx-name" style="line-height:25px">
                    	<a style="color:#000;">公司曾经<br>代理业务</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk"  style="line-height:28px">
                        <el-radio v-model="form.jinyan" label="1">企业服务（非广告）</el-radio><br>
                        <el-radio v-model="form.jinyan" label="2">互联网广告（非独代）</el-radio><br>
                        <el-radio v-model="form.jinyan" label="3">互联网广告（独代型）</el-radio><br>
                        <el-radio v-model="form.jinyan" label="4">腾讯服务代理（例如微信支付）</el-radio>
                    </div>              
                </div>
            </div>
         </div>

         <div class="glg-dailishangshenqingxx" style="height:60px;margin-top:2%">
        	<div class="glg-dailishangshenqingxx-bj">
            <div style="height:5%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:50%;">
                	<div class="glg-dailishangshenqingxx-name" style="line-height:25px">
                    	<a style="color:#000;">主要服务<br>地区</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk"  style="line-height:28px">
                        <el-select style="width:100%" :collapse-tags="true" v-model="value5" placeholder="请选择">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>              
                </div>
            </div>
         </div>
         <!--8-->
         <div class="glg-dailishangshenqingxx" style="height:150px;margin-top:2%">
        	<div class="glg-dailishangshenqingxx-bj" >
            <div style="height:8%"></div>
            	
                <div class="glg-dailishangshenqingxx-yiankong" style=" height:20%;">
                	<div class="glg-dailishangshenqingxx-name" style="line-height:20px">
                    	<a style="color:#000;">公司主营项目核心业务</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk"  style="line-height:30px">
                        <el-input type="textarea" v-model="form.desc" cols="20" rows="5"></el-input>		
                    </div>              
                </div>
            </div>
         </div>
        <!-- biaoti-->
        <div  class="glg-user-zhanghushezhi0" style="margin-top:2%">
            <div  class=" glg-user-zhanghushezhixia">
            	<a style=" margin-left:2%; font-weight:bold; float:left">服务平台管理员信息 </a>
                <span style="color:#999; font-size:0.8em; float:left; margin-left:2%;">请完善管理员信息</span>
        	</div>
        </div>
         <div class="glg-dailishangshenqingxx" style="height:150px">
        	<div class="glg-dailishangshenqingxx-bj">
            	<div style="height:10%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:25%;">
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">姓名</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="yunyinName"
                                :rules="[
                                    { required: true, message: '管理员姓名不能为空'},
                                    { min:2,max:15, message: '请输入你运营人员姓名'}
                                ]"
                            >
                    	        <el-input placeholder="管理员姓名" v-model="form.yunyinName"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
            	</div>
                <div style="height:15%"></div>
            	<div class="glg-dailishangshenqingxx-yiankong" style=" height:25%;">
                	<div class="glg-dailishangshenqingxx-name">
                    	<a style="color:#000;">手机号</a>
                    </div>
                    <div  class="glg-dailishangshenqingxx-tk" >
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="yunyinPhone"
                                :rules="[
                                    { required: true, message: '管理员手机不能为空'},
                                    { min:10000000000,max:19999999999,type:'number' , message: '手机号必须为11位'}
                                ]"
                            >
                    	        <el-input placeholder="管理员电话" v-model.number="form.yunyinPhone"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
            	</div>     
         	</div>
         </div>
        
         <!--11-->
          <div  style="margin-top:2%; width:100%; height:60px;">
          	 <div style=" height:4%;"></div>
          	<div style="text-align:center; font-size:1em">
                <form>
          		    <span style="color:#f15c22" @click="dialogFormVisible = true">《鼓励购认证协议》</span>

                    <el-dialog
                        title="《鼓励购认证协议》" 
                        :visible.sync="dialogFormVisible"
                        width="95%"
                        center
                    >
                        <div style="line-height:25px; width:100%; height:300px;border-radius:3px; overflow:auto;text-indent: 2em;">
区域及行业服务商品牌管理与公关传播规范 合规 所有与鼓励购商城相关的设计、宣传物料、传播内容，在发布之前，必须获得鼓励购商城的确认；称呼自己为“鼓励购商城区域及行业服务商”；依据鼓励购商城官方的授牌结果定义自己的服务商身份：“综合类核心服务商”“综合类重点服务商”等等；如实陈诉服务商和鼓励购商城的合作关系；
描述合作关系时，依具体事实选择鼓励购商城的合作主体；
服务商相关TSA业务的联合logo，服务商logo在前，鼓励购商城logo在后；
以突出服务商logo为主，弱化鼓励购商城logo；
以官方稿件中对于广告产品的定义、产品形态描述、产品优势，业务描述阐释鼓励购商城相关产品和业务；
鼓励购商城产品灰度测试期间，以鼓励购商城提供的官方资料为介绍话术标准；
对于鼓励购商城希望暂时保密的灰度测试广告主名单等，服务商需严格保密；
保持鼓励购商城logo的完整性；
以互联网官方公布的最新财报数据为准，来描述相关业务表现。 不合规 严禁擅自发布与鼓励购商城相关的设计物料或内容。未经确认发出的任何内容，将可能被鼓励购商城追究法律责任；
严禁称呼自己为“鼓励购服务商（或代理商）”在没有得到正式授权时，严禁宣称自己为鼓励购商城服务商；
在没有得到正式授牌时，严禁宣传自己为“核心”“重点”服务商等；
严禁宣称自己为“独代”“独家”“总代”“战略合作伙伴”等与事实不符且不合规的身份；
 禁止使用“鼓励购商城”等作为合作主体；
严禁随意拟定鼓励购商城的合作身份（例如擅自申明鼓励购商城会议主办/合办身份）；
 严禁随意使用鼓励购商城logo，或将logo不合理的前置或最突出；
严禁擅自过多解读鼓励购商城相关产品和业务；
"严禁将灰度测试的产品和客户内容通过外部媒体进行任何传播；
严禁自称鼓励购商城某灰度测试或新上线产品的“独家”、“首家”服务商；
严禁对外宣称不符合事实的业务流程，例如快速上线，特批上线等；
" 严禁对业务名或广告产品名称进行变体命名，如“（服务商名）-鼓励购商城”；
严禁对鼓励购商城logo进行变形和拆分；
严禁使用不准确的数字（用户数量，市场占比等）来进行市场宣传。
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancel">不同意</el-button>
                            <el-button type="primary" @click="comfirm">同 意</el-button>
                        </div>
                    </el-dialog>
                    <el-checkbox-group style="margin-top:10px" v-model="form.isAgreen">
                        <el-checkbox label="同意" name="1"></el-checkbox>	
                    </el-checkbox-group>
                </form>
         	</div>
             <div style=" height:4%;"></div>
         </div>
        <button @click="shengqin" class="glg-user-anniuda">提交</button> 
    </div>
</template>
<script>
import local from '@/components/local'
import img from '@/assets/img/banner.png'
import shangchuan from './shangchuanP'
let qs = require("qs")
export default {
    data(){
        return {
            dialogFormVisible:false,
            form:{
                isAgreen:[],
                yunyinName:'',
                yunyinPhone:'',
                url:'',
                shengqinName:'',
                shengqinPhone:'',
                shengqinEmail:'',
                img1:"",
                img2:"",
                value:'1',
                desc:'',
                zijin:'1',




                areaId:"",
                brithday:"",
                shang:"1",
                fuwu:"1",
                ziben:"1",
                jinyan:"1",
            },
            options: [{
                value: '1',
                label: '一级代理商'
                }, {
                value: '2',
                label: '二级代理商'
                },
                {
                value: '3',
                label: '三级代理商'
                },
                 {
                value: '4',
                label: '四级代理商'
                },
                {
                value: '5',
                label: '五级代理商'
                },
            ],
            options2:[],
            value5:[],
            img,
            glgImg:'https://api.guligou.com/',
            userInfo:{}
        }
    },
    computed:{
        getMoney(){
            if(this.form.value == '1'){
                return 1000
            }else if(this.form.value == '2'){
                return 3000
            }else if(this.form.value == '3'){
                return 10000
            }else if(this.form.value == '4'){
                return 20000
            }else if(this.form.value == '5'){
                return 50000
            }
        },
        shang(){
            if(this.form.shang == '1'){
                return '已上市'
            }else if(this.form.shang == '2'){
                return '融资中，未上市'
            }else if(this.form.shang == '3'){
                return '有融资计划，未上市'
            }else if(this.form.shang == '4'){
                return '暂无融资计划，未上市'
            }
        },
        zijin(){
            if(this.form.zijin == '1'){
                return '0-100万'
            }else if(this.form.zijin == '2'){
                return '100-500万'
            }else if(this.form.zijin == '3'){
                return '500-1000万'
            }else if(this.form.zijin == '4'){
                return '1000万以上'
            }
        },
        fuwu(){
            if(this.form.fuwu == '1'){
                return '100家以上'
            }else if(this.form.fuwu == '2'){
                return '100-200家'
            }else if(this.form.fuwu == '3'){
                return '200-500家'
            }else if(this.form.fuwu == '4'){
                return '500-1000家'
            }else if(this.form.fuwu == '5'){
                return '1000家以上'
            }
        },
        jinyan(){
            if(this.form.jinyan == '1'){
                return '企业服务（非广告）'
            }else if(this.form.jinyan == '2'){
                return '互联网广告（非独代）'
            }else if(this.form.jinyan == '3'){
                return '互联网广告（独代型）'
            }else if(this.form.jinyan == '4'){
                return '腾讯服务代理（例如微信支付）'
            }
        },
        isAuto(){
            if(this.form.isAgreen.length != 0){
                return true;
            }else {
                return false;
            }
        },
        isTime(){
            return this.form.brithday.getFullYear() +'-'+(this.form.brithday.getMonth()+1) +'-'+this.form.brithday.getDate()
        },
        isAray(){
            return this.value5;
        },
        isSend(){
            if(this.isAuto && this.form.shengqinName != '' &&this.form.shengqinPhone != '' &&this.form.shengqinEmail != '' &&this.form.img1 != '' && this.form.img2 != '' &&this.form.desc != '' &&this.form.yunyinName != '' &&this.form.yunyinPhone != '' &&this.form.value != '' &&this.isTime != '' &&this.isAray != '' &&this.form.areaId != ''){
                return true;
            }else {
                return false;
            }
        }
    },
    methods:{
        cancel(){
            this.dialogFormVisible = false;
            this.form.isAgreen = []
        },
        comfirm(){
            this.dialogFormVisible = false;
            this.form.isAgreen.push("同意");
        },
        getData(areaId){

            this.form.areaId = `${areaId[0]},${areaId[1]},${areaId[2]}`;
        },
        getDatas(data){
            if(data.status == 5) {
                this.form.img1 = data.url;
            }else if (data.status == 6){
                this.form.img2 = data.url;
            }
        },
        shengqin(){
            console.log(this.form.isAgreen)
            if(this.isSend){
                this.$http.post('https://api.guligou.com/api/daili/tijiao',qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    name:this.form.shengqinName,
                    tel:this.form.shengqinPhone,
                    emial:this.form.shengqinEmail,
                    gongsiwangzhan:this.form.url,
                    gongsidizhi:this.form.areaId,
                    yyzz:`/${this.form.img1}`,
                    dakuanzhengming:`/${this.form.img2}`,
                    chenglishijian:this.isTime,
                    qingkuang:this.shang,
                    fuwushuliang:this.fuwu,
                    dailiyewu:this.jinyan,
                    zhuceziben:this.zijin,
                    feiyong:this.getMoney,
                    fuwudiqu :this.isAray,
                    dengji:this.form.value,
                    zhuyingxiangmu :this.form.desc,
                    glyname:this.form.yunyinName,
                    glytel:this.form.yunyinPhone
                })) 
                .then((data) => {
                    console.log(data.data);
                    if(data.data.status == 1){
                        this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        }); 
                        this.$router.push("/userIndex")
                    }else{
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
                    alert(error)
                })
            }else {
                this.$notify({
                      type: 'error',
                      title:'错误提醒',
                      message:'填写申请信息',
                      duration:2500,
                      showClose:false
                  });
            }
        }
    },
    created(){
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/areas/listQuery")
        .then((data) => {
            for(var key in data.data){
                this.options2.push({label:data.data[key].areaName,value:data.data[key].areaName});
            }
        })
    },
    components:{
       local,
       shangchuan
    }
}
</script>

