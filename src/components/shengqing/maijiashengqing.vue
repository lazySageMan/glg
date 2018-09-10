<template>
    <div class="glg-layout">
        <!-- xia-->
        <div  class="glg-user-zhanghushezhi0">
            <div  class=" glg-user-zhanghushezhixia">
            <a style=" margin-left:5%; font-weight:bold">填写信息</a>
        	</div>
        </div>
        <!--01-->
        <div  class="glg-shangjiashenqingxx">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:30%;">
                	<div style="height:30%"></div>
                	<div class="glg-shangjiashenqingxx-name">
                    	<a style="color:#000;">店铺名称</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk" >
                    <el-form :model="form" ref="form" class="demo-ruleForm">
                        <el-form-item 
                            prop="dianpuName"
                            :rules="[
                                { required: true, message: '店铺名称不能为空'},
                                { min:1,max:20, message: '店铺名称不能超过20个字'}
                            ]"
                        >
                            <el-input placeholder="店铺名称" v-model="form.dianpuName"></el-input>
                        </el-form-item>
                    </el-form>
                    </div>       
                </div>
                <p  class="glg-shangjiashenqingxx-zhuyi" style="margin-top:13px">请确保您的帐号昵称符合您的企业身份，系统默认昵称或个人化昵称将无法通过审核申请提交后将无法修改昵称，提交前请务必确认昵称符合标准。修改可参照教程。</p>
            </div>
        </div>
        <!--02-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:30%;">
                	<div style="height:30%"></div>
                	<div class="glg-shangjiashenqingxx-name">
                    	<a style="color:#000;">企业名称</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk" >
                        <el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="qiyeName"
                                :rules="[
                                    { required: true, message: '企业名称不能为空'},
                                    { min:1,max:20, message: '企业名名称不能超过20个字'}
                                ]"
                            >
                    	        <el-input placeholder="企业名称" v-model="form.qiyeName"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>       
                </div>
                <p  class="glg-shangjiashenqingxx-zhuyi" style="margin-top:13px;">只支持中国大陆工商局或市场监督管理局登记的企业，请填写工商营业执照上的企业主体信息全称，该名称将作为企业认证审核服务费的发票抬头。</p>
            </div>
        </div>
        <!--03-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%;height:163px;">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:30%;">
                	<div style="height:20%"></div>
                	<div class="glg-shangjiashenqingxx-name" style=" line-height:20px">
                    	<a style="color:#000;">营业执照注册号</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk" >
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="zhizhaoNum"
                                :rules="[
                                    { required: true, message: '营业执照号不能为空'},
                                    { type: 'number', message: '营业执照号必须为数字值'}
                                ]"
                            >
                    	        <el-input placeholder="企业名称" v-model.number="form.zhizhaoNum"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>       
                </div>
                <p  class="glg-shangjiashenqingxx-zhuyi" style="margin-top:13px;">认证信息提交后不能修改，谨慎填写。不能使用修饰性质词汇或宽泛词汇，不能包含联系方式或营销推广信息，不能以个人为认证主体，不超过16个字；体现商标、品牌、网站、手机应用等需提供对应资质</p>
            </div>
        </div>
        <!--04-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%; height:245px">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:40%;">
                	<!-- <div style="height:20%"></div> -->
                	<div class="glg-shangjiashenqingxx-name" >
                    	<a style="color:#000;">企业<br>营业执照</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk">
                    <div
                        class="shangchuanzhanpian" 
                        :style="{background:'url('+glgImg+img1+') 0/100% no-repeat'}"
                    >
                        <div v-if="!img1" style="margin-top:20px;">
                            上传营业执照<br>（有年检章，jpg/png,小于1MB）
                        </div>
                    </div>
                    </div>
                </div>
                <div style=" height:10px"></div>
                <div  class="glg-shangjiashenqingxx-tk" style=" height:35px" >          
                    <shangchuan @resData="getData" :status="1"></shangchuan>                                    
                    </div> 
                <p  class="glg-shangjiashenqingxx-zhuyi">只支持中国大陆工商局或市场监督管理局登记的企业，请上传最新的营业执照， 像素要求800*800px，正面照，资质无残缺信息。</p>
            </div>
        </div>
         <!--05-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%; height:245px">
        	<div  class="glg-shangjiashenqingxx-bj">
                <div style=" height:10%; "></div>
                <p class="glg-shangjiashenqingxx-zhuyi">下载填写<a @click="tishi" href="javascript:;" style="color:red;font-size:18px">《企业认证申请公函》</a>，填写完成后加盖红色公章，上传清晰的公函扫描件。</p>
                <div style=" height:10%; "></div>
                <div style=" height:10%; "></div>
                <!-- <div style=" height:10%; "></div>
                <div style=" height:10%; "></div> -->
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:40%;">
                	<!-- <div style="height:20%"></div> -->
                	<div class="glg-shangjiashenqingxx-name" style=" line-height:20px">
                    	<a style="color:#000;">认证公函</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk">
                    <div
                        class="shangchuanzhanpian" 
                        :style="{background:'url('+glgImg+img2+') 0/100% no-repeat'}"
                    >
                        <div v-if="!img2" style="margin-top:20px;">
                            上传认证公函<br>（有年检章，jpg/png,小于1MB）
                        </div>
                    </div>
                    </div>
                </div>
                <div style=" height:10px "></div>
                <div  class="glg-shangjiashenqingxx-tk" style=" height:35px" >          
                    <shangchuan @resData="getData" :status="2"></shangchuan>                                      
                </div> 
            </div>
        </div>
         <!--06-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%; height:245px">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:40%;">
                	<!-- <div style="height:20%"></div> -->
                	<div class="glg-shangjiashenqingxx-name" style=" line-height:20px">
                    	<a style="color:#000;">打款截图</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk">
                     <div
                        class="shangchuanzhanpian" 
                        :style="{background:'url('+glgImg+img3+') 0/100% no-repeat'}"
                    >
                        <div v-if="!img3" style="margin-top:20px;">
                            上传打款截图<br>（有年检章，jpg/png,小于1MB）
                        </div>
                    </div>
                    </div>
                </div>
                <div style=" height:10px; "></div>
                <div  class="glg-shangjiashenqingxx-tk" style=" height:35px" >          
                    <shangchuan @resData="getData" :status="3"></shangchuan>                                      
                </div>              
                <p  class="glg-shangjiashenqingxx-zhuyi" style="line-height:20px;color:black;">
                    请使用公对公支付的方式支付<span style="color:red;">{{isMoney}}</span>元的认证审核服务费，打款完成后上传打款截图。<br>
                    公司名称：黑龙江省鼓励购电子商务有限责任公司<br>
                    开户银行名称：兴业银行股份有限公司哈尔滨分行营业部。<br>
                    开户账号：562010100100939768
                </p>
            </div>
        </div>
         <!--07-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%; height:80px">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:30%;">
                	<div style="height:30%"></div>
                	<div class="glg-shangjiashenqingxx-name">
                    	<a style="color:#000;">行业分类</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk" >                    
                        <div class="block">
                            <el-cascader
                                :options="options"
                                v-model="form.value"
                                separator="-"
                                style="width:100%"
                                @change="getCHangeId"
                            >
                            </el-cascader>
                        </div>
                    </div>       
                </div>
            </div>
        </div>
        <!--08-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%; height:245px">
        	<div  class="glg-shangjiashenqingxx-bj">
                <div style=" height:5%; "></div>
                <p class="glg-shangjiashenqingxx-zhuyi">
                	<a style="color:#999">请根据您公司情况选择上传行业分类及资质</a>（选填）<br>
                    点击参考<a href="javascript:;" style="color:red;font-size:18px;" @click="tishi">《鼓励购行业分类及资质》</a>
                </p>
                <div style=" height:13%; "></div>
                <div style=" height:8%;"></div>
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:100px">
                	<!-- <div style="height:20%"></div> -->
                	<div class="glg-shangjiashenqingxx-name" style=" line-height:20px">
                    	<a style="color:#000;">行业资质</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk">
                    <div
                        class="shangchuanzhanpian" 
                        :style="{background:'url('+glgImg+img4+') 0/100% no-repeat'}"
                    >
                        <div v-if="!img4" style="margin-top:20px;">
                            上传行业资质<br>（有年检章，jpg/png,小于1MB）
                        </div>
                    </div>
                    </div>
                </div>
                <div style=" height:10px; "></div>
                <div  class="glg-shangjiashenqingxx-tk" style=" height:35px" >        
                    <shangchuan @resData="getData" :status="4"></shangchuan>
                </div> 
            </div>
        </div>
         <!--09-->
        <div  class="glg-shangjiashenqingxx"  style=" height:110px;margin-top:2%;">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:38%;">
                	<div style="height:30%"></div>
                	<div class="glg-shangjiashenqingxx-name">
                    	<a style="color:#000;">运营人</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk">
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="yunyinName"
                                :rules="[
                                    { required: true, message: '请输入你运营人员不能为空'},
                                    { min:2,max:15, message: '请输入你运营人员姓名'}
                                ]"
                            >
                    	        <el-input placeholder="企业名称" v-model="form.yunyinName"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>       
                </div>
                <p  class="glg-shangjiashenqingxx-zhuyi" style="margin-top:13px;">请填写与《鼓励购申请公函》上的运营者一致，在认证审核过程中，将与该运营者联系核实。</p>
            </div>
        </div>
         <!--10-->
        <div  class="glg-shangjiashenqingxx"  style=" height:110px;margin-top:2%;">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:38%;">
                	<div style="height:30%"></div>
                	<div class="glg-shangjiashenqingxx-name">
                    	<a style="color:#000;">联系手机</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk" >
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="yunyinPhone"
                                :rules="[
                                    { required: true, message: '联系手机不能为空'},
                                    { min:10000000000,max:19999999999,type:'number' ,message: '手机号必须为11位数字'}
                                ]"
                            >
                    	        <el-input placeholder="企业电话" v-model.number="form.yunyinPhone"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>       
                </div>
                <p  class="glg-shangjiashenqingxx-zhuyi" style="margin-top:13px">请填写该运营者的手机号，在认证审核过程中，将与该运营者联系核实。</p>
            </div>
        </div>
         <!--11-->
        <div  class="glg-shangjiashenqingxx" style="margin-top:2%; height:290px">
        	<div  class="glg-shangjiashenqingxx-bj">
            	<div class="glg-shangjiashenqingxx-yiankong" style=" height:15%;">
                	<div style="height:30%"></div>
                	<div class="glg-shangjiashenqingxx-name">
                    	<a style="color:#000;">电子邮箱</a>
                    </div>
                    <div  class="glg-shangjiashenqingxx-tk" >
                    	<el-form :model="form" ref="form" class="demo-ruleForm">
                            <el-form-item 
                                prop="yunyinEmail"
                                :rules="[
                                    { required: true, message: '邮箱地址不能为空'},
                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                ]"
                            >
                    	        <el-input placeholder="电子邮箱" v-model="form.yunyinEmail"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="glg-shangjiashenqingxx-tk" style="line-height:25px;height:130%;margin-top:13px">
                        <el-radio v-model="form.fapiao" label="0">放弃发票</el-radio>
                        <el-radio v-model="form.fapiao" label="1">增值税普通票</el-radio><br>
                        <el-radio v-model="form.fapiao" label="2">增值税专用票</el-radio>
                    </div>       
                </div>
                <p  class="glg-shangjiashenqingxx-zhuyi">企业认证审核服务费可开具票面内容为『技术服务费』的增值税普通发票（电子版）， 开票主体只能为打款主体。请您填写准确的电子邮箱地址，我们将为您发送电子发票。我司开具的增值税普通发票（电子版）均为真实有效的合法发票。 其法律效力、基本用途、基本使用规定等与税务机关监制的增值税普通发票（纸质）相同，可作为用户报销、维权、保修的有效凭据。详见《国家税务总局公告2015年第84号》。</p>
            </div>
        </div>
         <!--11-->
          <div  style="margin-top:2%; width:100%; height:60px;">
          	 <div style=" height:4%;"></div>
          	<div style="text-align:center; font-size:1em">
                <form>                                     
                    <span @click="dialogFormVisible = true" style="color:#f15c22">《鼓励购认证协议》</span>
                    <el-dialog
                        title="《鼓励购认证协议》" 
                        :visible.sync="dialogFormVisible"
                        width="95%"
                        center
                    >
                        <div style=" width:100%; height:300px;border-radius:3px; overflow:auto; padding:10px; margin:auto;text-align:left;line-height:25px;">
           鼓励购商城平台认证服务协议【首部及导言】欢迎您使用鼓励购商城！鼓励购商城平台认证服务（以下简称“本服务”）是黑龙江鼓励购电子商务有限责任公司（以下简称“鼓励购商城”）提供给用户的一项用户资质审核服务。为使用本服务，您应当阅读并遵守《鼓励购商城认证服务协议》（以下简称“本协议”）、《鼓励购商城用户服务协议及隐私保护政策》以及专项规则、制度等。请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。除非您已阅读并接受本协议所有条款，否则您无权使用鼓励购商城平台认证服务。您对本服务的登录、查看、发布信息等行为即视为您已阅读并同意本协议的约束。一、【协议的范围】
【协议适用主体范围】
本协议是您与鼓励购商城之间关于您使用鼓励购商城平台认证服务所订立的协议。
“鼓励购商城”是指黑龙江鼓励购电子商务有限责任公司及其相关服务可能存在的运营关联单位。
“用户”是指申请鼓励购商城平台认证服务及/或已经认证成功的鼓励购商城用户，在本协议中更多地称为“您”。
本协议内容同时包括鼓励购商城可能不断发布的关于本服务的相关协议、服务声明、业务规则及公告指引等内容（以下统称为“专项规则”）。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。
二、【术语定义】
2.1 鼓励购商城平台认证服务：是指符合一定条件的用户可以对其鼓励购商城帐号申请鼓励购商城平台认证。鼓励购商城根据用户的申请及其提交的资料和信息，自行或者委托第三方审核机构进行审核，并根据审核情况确定认证结果和认证信息的服务。
2.2 认证审核：指用户向鼓励购商城提出申请，鼓励购商城根据法律规定及双方的约定对用户提交的资料和信息进行甄别及核实，从而对用户的鼓励购商城帐号进行帐号资质审核、帐号名称审核、帐号认证信息审核三部分审核的过程。
2.2.1 帐号资质审核：指用户向鼓励购商城提出申请，鼓励购商城根据法律规定及双方的约定，对用户提交的主体资质证明或其所拥有的权利证明资料和信息进行甄别及核实的过程。
2.2.2 帐号名称审核：指用户向鼓励购商城提出申请，鼓励购商城根据法律规定及双方的约定，对用户的鼓励购商城帐号名称进行审查核定的过程。
2.2.3 帐号认证信息审核：指用户向鼓励购商城提出申请，鼓励购商城根据法律规定及双方的约定对用户鼓励购商城帐号认证信息进行审查核定的过程。
2.3 第三方审核机构：指鼓励购商城委托对用户进行认证审核的第三方机构。
2.4 新订单：指用户以获得认证成功的审核结果为目的发起的对于其鼓励购商城帐号的认证审核申请。在新订单的审核过程中，用户自发补充或者根据鼓励购商城及/或鼓励购商城委托第三方审核机构的要求所补充的资料作为同一订单的审核范围。
2.5 补充订单：指用户认证成功后，申请变更、修改用户信息所产生的订单,在补充订单审核过程中，用户自发补充或者根据鼓励购商城及/或鼓励购商城委托第三方审核机构的要求所补充的资料同样作为同一订单的审核范围。
2.6 订单：新订单和补充订单的统称。
2.7 认证结果：是指鼓励购商城及其委托的第三方审核机构按照用户的申请进行认证审核后，鼓励购商城及其委托的第三方审核机构通过对用户提交的资料和信息分别进行帐号资质审核、帐号名称审核、帐号认证信息三部分审核，最终向用户输出的认证成功或认证失败的结果。上述三部分审核任一部分审核不通过，或由于用户原因经鼓励购商城累计三次系统通知调整认证内容，用户仍未能满足认证审核相关要求的，均视为认证失败。
2.8 审核服务费用：指鼓励购商城根据用户的申请对用户所提交的资料和信息进行认证审核而产生的费用。
三、【用户的权利义务】
3.1 用户可以根据自身需求，对其鼓励购商城帐号发起认证审核申请。
3.1.1 如果用户对其鼓励购商城帐号发起认证审核申请，认证审核成功后，用户有权以认证帐号名称和认证信息所公示的身份对外运营，并通过认证标识区别于其他非认证的鼓励购商城用户。用户可通过帐号关联鼓励购商城帐号。
3.1.2 用户使用高级功能时应遵守法律、行政法规和本协议或相关服务条款的规定，否则，鼓励购商城有权不经通知随时视行为情节对违规用户的帐号采取包括但不限于限制、停止使用高级功能等措施。
3.2 用户应保证其提供给鼓励购商城或者第三方审核机构的所有资料和信息的真实性、合法性、准确性和有效性，且不侵犯第三方合法权利。如用户提供服务或内容需要取得相关法律法规规定的许可或进行备案的，用户应当主动进行明确说明并提交相应的许可或备案证明。否则，鼓励购商城有权拒绝或终止提供本服务，并依照本协议对违规帐号进行处罚。因此给鼓励购商城或第三方造成损害的，用户应当依法予以赔偿。
3.3 用户同意授权鼓励购商城将其提交的资料和信息委托第三方审核机构进行甄别核实，第三方审核机构有权出于认证审核之必要查阅、使用及保存上述资料及信息，并有权受鼓励购商城委托以自身名义与用户就认证审核事宜进行联系与沟通，用户应当配合第三方审核机构在认证审核过程中所提出的相关需求。
3.4 用户不得通过非鼓励购商城授权的其他任何渠道使用本服务，如非因鼓励购商城或者第三方审核机构原因导致的认证失败、认证流程过长等后果，鼓励购商城及第三方审核机构不承担责任。
3.5 用户理解并且同意，用户提交的资料和信息是作出认证结果的重要依据，任何资料和信息的变更将可能影响认证结果，用户应当在资料和信息变更时及时提出补充认证申请，否则鼓励购商城有权依照本协议约定进行相关处理。鼓励购商城因此遭受损失的，用户也应当一并赔偿。
四、【鼓励购商城的权利义务】
4.1 保护用户信息是鼓励购商城的一项基本原则，鼓励购商城将会采取合理的措施保护用户所提交的一切资料及信息。除法律法规规定及本协议约定的情形外，未经用户许可鼓励购商城不会向其他第三方公开、透露上述资料及信息。用户基于申请本服务的需要，授权鼓励购商城将其提交的资料和信息委托第三方审核机构进行甄别核实以及根据法律、法规或监管部门的要求，将用户提交的资料和信息递交至相关政府部门或其委托的机构进行审核、备案。在本协议许可的范围内，鼓励购商城及第三方审核机构会对相关资料及信息采用专业加密存储与传输方式进行传输及使用，以保障用户的信息安全。
4.2 为依法保障鼓励购商城平台认证服务的规范有序，鼓励购商城有权针对用户的不同认证需求制定不同的认证审核标准及要求，并有权在必要时对相关标准及要求进行修改。
4.3 鼓励购商城有权根据用户提交的资料及信息，并结合第三方审核机构甄别核实的情况独立判断，分别确定审核结果，并根据审核情况分阶段确定帐号资质审核结果以及用户的认证帐号名称，生成认证标识及认证信息，对符合鼓励购商城平台所制定的范围和标准等的鼓励购商城帐号，准予其提交的开通相应的高级功能或高级权限的申请。
五、【审核服务费用】
5.1 用户理解并同意，用户申请鼓励购商城平台认证服务需要向鼓励购商城支付审核服务费用，每项订单收取一次费用，具体费用标准以认证申请页面公示为准。
5.2 用户理解并且同意，审核服务费用是基于鼓励购商城提供的认证审核服务而支付的一次性费用，用户每申请一次认证服务均应向鼓励购商城支付一次审核服务费，相关费用不以认证成功为前提，且不受任何一种审核结果的任何情形及认证状态的影响。
5.3 用户理解并同意，如用户对其鼓励购商城帐号发起认证审核申请并认证审核成功后，用户已支付的认证审核费用鼓励购商城将不予退还。
5.4 用户付款后，鼓励购商城将根据用户提交的发票信息向用户开具等额合法有效发票，用户应保证其提交的发票信息真实、准确及有效，否则因此导致的损失由用户自行承担。
5.5 鼓励购商城可能会根据本服务的整体规划，对本服务的收费标准、方式以及所提供的认证服务内容等进行调整和变更，前述调整、变更，均以认证申请页面公示为准。
5.6 鼓励购商城所收取的本服务相关费用在收缴、流转、账户充值等过程中均不计利息。
六、【认证服务规范】
6.1 【认证流程】
6.1.1 用户申请本服务需要登录申请页面按照鼓励购商城提示提交有关资料及信息。您在申请本服务时应仔细阅读并同意本协议，您对本服务的接受、购买、提交资料和信息、付款等行为即视为您已阅读并同意受本协议的约束。
6.1.2 用户在完成在线申请及资料提交流程，并完成审核费用支付后，鼓励购商城会在15个工作日内展开认证审核工作，用户应积极配合鼓励购商城及第三方审核公司的审核需求，并有权随时了解、查询审核进度。
6.1.3 用户向鼓励购商城或者第三方审核机构提供的资料和信息如有变更的，应当及时采取以下措施，否则鼓励购商城有权依照本协议约定对用户进行相关处理：
6.1.3.1 如处于认证审核过程中的资料和信息发生变更，用户应立即通知鼓励购商城或负责审核订单的第三方审核机构更新有关资料及信息；
6.1.3.2 如认证成功后资料和信息发生变更，用户应及时申请补充订单变更有关资料及信息；
6.1.3.3 如认证成功后鼓励购商城发现资料和信息存在错误，用户应及时申请补充订单更正有关资料及信息。
6.2 【认证规则】
6.2.1 用户理解并同意：鼓励购商城平台认证服务内容仅限于对用户提交的资料及信息进行甄别与核实，鼓励购商城将对前述资料及信息进行合理、谨慎的形式审查，但在鼓励购商城的合法权限和合理能力范围内，鼓励购商城无法实质审查用户的实际经营、运营以及推广等行为，并不为此提供任何担保。
6.2.2 鼓励购商城有权自行或委托第三方审核机构甄别核实包括但不限于以下内容：
6.2.2.1 用户是否拥有合法主体资质，以及是否取得提供服务或内容相应的权利或授权；
6.2.2.2 帐号运营者主体身份，以及是否经过用户明确授权；
6.2.2.3 其他鼓励购商城或第三方审核机构认为需要审核的内容。用户应就上述内容提供相应的证明文件予以证明并承担真实性、合法性、准确性的瑕疵担保责任。
6.3 认证帐号名称应当遵守鼓励购商城为此制定的命名规则。鼓励购商城有权根据命名规则审核用户提交的认证帐号名称申请，并提供建议名称。如用户申请名称不能符合命名规则要求的，鼓励购商城有权以建议名称作为用户认证帐号名称。
6.4 认证信息内容由鼓励购商城根据审核情况进行确定，并在认证帐号名称审核成功后生成，主要包括用户主体资质和权利等有效证明的信息。鼓励购商城有权根据平台规范运营的需要调整认证信息的内容及格式。
6.5 用户帐号认证成功状态将会自认证成功之日起被保留一年，到期后自动终止。用户如需继续保持帐号认证成功状态，则应在状态到期前再次发起新订单并认证成功，以此类推。如用户未能在到期前完成新认证或者新认证失败，其帐号认证成功状态自状态到期日起终止，该帐号、所包含的服务及权益同时失效。
七、【知识产权】
7.1 鼓励购商城是本服务及其相关产品的知识产权权利人。本服务及其相关产品的一切著作权、商标权、专利权、商业秘密等知识产权，以及相关的所有信息内容（包括但不限于文字、图片、界面设计、版面框架等）均受中华人民共和国相关法律法规及相关国际条约的保护，由今日头条享有，本协议另行约定、或按照相关法律法规规定由其他权利人享有的除外。
7.2 鼓励购商城尊重用户对于发布的信息内容的相关知识产权权利，包括但不限于著作权、商标权等；因此，鼓励购商城希望用户也同样尊重其他权利人、或其他内容权利人的相关知识产权权利，未经相关权利人允许，不得基于任何目的侵犯其合法权益。
八、【法律责任】
8.1 如果鼓励购商城发现或收到他人举报或投诉用户违反本协议约定的，鼓励购商城有权不经通知随时视行为情节对违规用户的帐号处以包括但不限于终止本服务资质审核、责令用户补充资质审查资料、责令用户修改认证信息、强制修改帐号名称及认证信息直至取消认证等措施。
8.2 用户理解并同意，因用户违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，用户应当独立承担责任。
九、【其他】
9.1 您使用本服务即视为您已阅读并同意受本协议的约束。鼓励购商城有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的条款。本协议条款变更后，如果您继续使用头条号台认证服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用鼓励购商城平台认证服务。
9.2 本协议签订地为中华人民共和国黑龙江。
9.3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。
9.4 若您和鼓励购商城之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交人民法院管辖。
9.5 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。
9.6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。
9.7 您在使用本服务过程中，如发现相关内容存在违反相关法律法规或者侵犯了您的权利，请及时向我们举报或反馈（0451-85523344），我们将依法处理。
黑龙江鼓励购电子商务有限责任公司
【2018】年【4】月【28】日

        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancel">不同意</el-button>
                            <el-button type="primary" @click="comfirm">同 意</el-button>
                        </div>
                    </el-dialog>
                    <el-checkbox-group style="margin-top:10px" v-model="form.agreen">
                        <el-checkbox label="同意" name="1"></el-checkbox>	
                    </el-checkbox-group>
                </form>
         	</div>
             <div style=" height:4%; "></div>
         </div>
        <button @click="zhuce" class="glg-user-anniuda">提交</button> 
    </div>
</template>
<script>
import shangchuan from './shangchuanP'
import ifarm from './iframe'
let qs = require("qs")
export default {
    data(){
        return {
            dialogFormVisible:false,
            form:{
                qiyeName:'',
                dianpuName:'',
                zhizhaoNum:null,
                yunyinName:'',
                yunyinPhone:null,
                yunyinEmail:'',
                agreen:[],
                catId:'',
                fapiao:'0',
                value:[]
            },
            options: [],
            glgImg:'https://api.guligou.com/',
            img1:'',
            img2:'',
            img3:'',
            img4:'',
            status:1,
            userInfo:{},
            isMoney:0
        }
    },
    methods:{
        comfirm(){
            this.dialogFormVisible = false;
            this.form.agreen.push("同意");
        },
        cancel(){
            this.dialogFormVisible = false;
            this.form.agreen = []
        },
        tishi(){
            this.$notify({
              type: 'warning',
              title:'警告',
              message:'请前往pc端查看',
              duration:2500,
              showClose:false
          });
        },
        getData(data){
            if(data.status == 1) {
                this.img1 = data.url;
            }else if (data.status == 2){
                this.img2 = data.url;
            }else if(data.status == 3){
                this.img3 = data.url;
            }else if(data.status == 4){
                this.img4 = data.url;
            }
        },
        getCHangeId(val){
            this.form.catId = `${val[0]},${val[1]}`;
        },
        zhuce(){
           if(this.isSend && this.getAgreen) {
               this.$http.post('https://api.guligou.com/api/shopapplys/apply.html',qs.stringify({
                  userName: this.form.dianpuName,
                  CorporateName:this.form.qiyeName,
                  xinyongdaima:this.form.zhizhaoNum,
                  yyzz:`/${this.img1}`,
                  gonghan:`/${this.img2}`,
                  dakuanzhengming:`/${this.img3}`,
                  hyzz:`/${this.img4}`,
                  shopkeeper:this.form.yunyinName,
                  telephone:this.form.yunyinPhone,
                  email:this.form.yunyinEmail,
                  fapiao:this.form.fapiao,
                  fenlei:this.form.catId,
                  token:this.userInfo.userInfo.toKen
               }))
               .then((data) => {
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
           }else{
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
    computed:{
        getAgreen(){
            if(this.form.agreen.length != 0){
                return true
            }else {
                return false
            }
        },
        isSend(){
            if(this.form.img1 != '' && this.form.img2 != '' && this.form.img3 != '' && this.form.img4 != '' &&this.form.qiyeName != '' &&this.form.dianpuName != '' &&this.form.yunyinName != null &&this.form.yunyinPhone != '' && this.form.yunyinEmail != '' && this.form.zhizhaoNum != null && this.form.catId != '' ){
                return true;
            }else{
                return false;
            }
        }
    },
    created() {
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/index/PlatformRules",qs.stringify({
            name:'ruzhufeiyong'
        }))
        .then((data) => {
            console.log(data)
            this.isMoney =data.data
        })
        this.$http.get("https://api.guligou.com/api/Goodscats/getListQuery")
        .then((data) => {
            console.log(data)
            data.data.forEach((item) => {
                this.options.push({
                    value:item.catId,
                    label:item.catName,
                    children:[]
                })
                item.children.forEach((items,indexs) => {
                    this.options.forEach((itemP) => {
                        itemP.children.push({
                            value:items.catId,
                            label:items.catName
                        })
                    })
                })
            })
        })
    },
    components:{
        shangchuan,
        ifarm
    }
}
</script>

