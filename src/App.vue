<template>
	<div class="app">
		<!-- 整个系统的头部 -->
		<mt-header fixed title="西祠工坊"></mt-header>
		<!-- 返回按钮 -->
		<div v-if="isBackShow" class="back" @click="goback"><span class="mui-icon mui-icon-back"></span></div>
		<!-- 路由占位,用来替换其他组件 -->
		<router-view></router-view>

		<!-- 整个系统的底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/activity/activityList">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">活动</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopCar">
				<span class="mui-icon mui-icon-contact">
					<span id="shopNum" class="mui-badge">{{shopNum}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/me">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	import {vm,COUNT}  from './public/vm.js';
	import {getItem}  from './public/localShop.js';
	//用$on来注册COUNT这个常量代表的事件
	vm.$on(COUNT,function(count){
		var shopNum = document.querySelector("#shopNum");
		shopNum.innerText = parseInt(shopNum.innerText) + count;
	})
	export default{
		data(){
			return{
				isBackShow:true,
				shopNum:0
			}
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
			getCount(){
				var list = getItem("goods");
				list.forEach(item=>{
					this.shopNum += item.count;
				})
			}
		},
		created(){
			if(this.$route.path == '/home'){
				this.isBackShow = false;
			}
			else{
				this.isBackShow = true;
			}
			this.getCount();
		},
		watch:{
			'$route':function(newval,oldval){
				if(newval.path == "/home"){
					this.isBackShow = false;
				}else{
					this.isBackShow = true;
				}
			}
		}
	}
</script>
<style scoped>
	.back{
		position: fixed;
		font-size: 26px;
		color: white;
		z-index: 999;
		top:8px;
		left:5px;
	}
</style>