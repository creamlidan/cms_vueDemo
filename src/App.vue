<template>
	<div class="app">
		<!-- 整个系统的头部 -->
		<mt-header fixed title="CMS内容管理"></mt-header>
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
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopCart">
				<span class="mui-icon mui-icon-contact">
					<span class="mui-badge">9</span>
				</span>
				<span class="mui-tab-label">购物</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				isBackShow:true
			}
		},
		methods:{
			goback(){
				this.$router.go(-1);
			}
		},
		created(){
			if(this.$route.path == '/home'){
				this.isBackShow = false;
			}
			else{
				this.isBackShow = true;
			}
		},
		watch:{
			'$route':function(newval,oldval){
				console.log(newval.path)
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
		position: absolute;
		font-size: 26px;
		color: white;
		z-index: 999;
		width: 30px;
		height: 30px;
		top:5px;
		left:5px;
	}
</style>