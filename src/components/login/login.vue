<template>
	<div class="templ">
		<div class="mui-content">
			<form id='login-form' class="mui-input-group" name="form">
				<div class="mui-input-row">
					<label>账号 :</label>
					<input id='account' type="text" v-model="user.phone" class="mui-input-clear mui-input" placeholder="请输入手机号码">
				</div>
				<div class="mui-input-row">
					<label>密码 :</label>
					<input id='password' type="password" v-model="user.password" class="mui-input-clear mui-input" placeholder="请输入密码6-18位密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
				<div class="link-area"><router-link id='reg' to="/register">注册账号</router-link>
					<span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {getItem,setItem,removeItem}  from '../../public/localShop.js';
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{
				user:[]
			}
		},
		methods:{
			submit(){
				if(!(/^1(3|4|5|7|8)\d{9}$/).test(this.user.phone)){
					Toast("请输入正确的电话");
					return;
				}
				if(!(/^[a-zA-Z1-9]{6,12}(?!\d)$/).test(this.user.password)){
					Toast("请输入密码");
					return;
				}
				var list = getItem("user");
				if(list.length > 0 && list[0].phone == this.user.phone && list[0].password == this.user.password){
					var _this = this;
					removeItem("user");
					Toast("登录成功");
					setItem("user",{phone:this.user.phone,password:this.user.password,isLogin:"1"})
					setTimeout(function(){
						_this.$router.push({path:'/Home'});
					},1500)
				}else{
					Toast("用户名密码错误");
				}
			}
		}
	}
</script>
<style scoped>
	.mui-btn-block{
		padding:5px 0;
		font-size: 16px;
	}
	.mui-input-row label{
		width: 30%;
		font-family: "microsoft YaHei";
	}
	.mui-input-row label~input, .mui-input-row label~select, .mui-input-row label~textarea{
		font-family: "microsoft YaHei";
		font-size: 14px;
		width: 70%;
	}
	.mui-content{
		font-size: 14px;
	}
	.link-area{
		margin-top: 10px;
		text-align: center;
	}
	.mui-content-padded{
		padding-bottom: 20px;
	}
</style>