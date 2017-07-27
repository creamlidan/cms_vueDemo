<template>
	<div class="meTempl">
		<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<router-link v-bind='loginUser[0].isLogin==1?{to:"/me/account"}:{to:""}' class="mui-navigate-right">
					<span class="head-img mui-media-object mui-pull-left">
						<img id="head-img" :src="userInfo.head_img">
					</span>
					<div class="mui-media-body">
						{{loginUser[0].isLogin == "1"? userInfo.user_name:"未登录"}}
						<p class='mui-ellipsis'>格言: {{userInfo.geyan}}</p>
					</div>
				</router-link>
			</li>
		</ul>
		<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell">
				<router-link v-bind='loginUser[0].isLogin==1?{to:"/me/account"}:{to:""}' class="mui-navigate-right">
					账号与安全
				</router-link>
			</li>
			<li class="mui-table-view-cell">
				<router-link to="/me/aboutVersion" class="mui-navigate-right">
					关于MUI <i class="mui-pull-right update">V1.1.0</i>
				</router-link>
			</li>
		</ul>
		<a>
 			<button class="mint-button mint-button--primary mint-button--large" @click="login"> <label class="mint-button-text" v-html="loginUser[0].isLogin==1?'退出登录':'去登录'"></label></button>
		</a>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	import {getItem,setItem,removeItem}  from '../../public/localShop.js';
	export default{
		data(){
			return{
				userInfo:[],
				loginUser:[{}],
			}
		},
		created(){
			this.getUserInfo();
			this.getLogin();
		},
		methods:{
			getUserInfo(){
				let url = "./src/statics/data/user.json";
				this.$http.get(url).then(res=>{
					this.userInfo = res.data;
				},res=>{
					Toast("网络出错,请稍后重试")
				})
			},
			//初始化登录状态
			getLogin(){
				var loginUser = getItem("user");
				if(loginUser.length>0){
					this.loginUser = loginUser;
				}else{
					this.loginUser[0].isLogin = "0";
				}
			},
			//点击按钮根据存储的状态处理相应的逻辑
			login(){
				var loginUser = getItem("user");
				//如果当前是登录状态,点击退出后要重新修改localStorage中的登录状态
				if(loginUser.length > 0){
					this.loginUser = loginUser;
					if(this.loginUser[0].isLogin == 1){
						this.loginUser[0].isLogin = "0";
						removeItem("user");
						setItem("user",this.loginUser[0]);
						var _this = this;
						Toast("退出成功");
						setTimeout(function(){
							_this.$router.push({path:'/me'});
						},1500)
					}else{
						this.$router.push({path:'/login'});
					}
				}else{

					this.$router.push({path:'/register'});
				}
				
			}	
		}
	}
</script>
<style>
.meTempl{
	margin-top: 40px;
	background: #efeff4;
	font-size:14px;
}
.meTempl ul{
	margin-bottom: 10px;
}
.mui-pull-right{
    float: right;
    font-style: normal;
    font-size: 14px;
}
.mint-button--large{
	font-size: 14px;
}
.mui-table-view .mui-media-object{
	line-height: 42px;
    max-width: 42px;
    height: 42px;
    position: relative;
    width: 42px;
    overflow: hidden;
}
.mui-table-view .mui-media-object img{
	position: absolute;
	height: 100%;
}
</style>