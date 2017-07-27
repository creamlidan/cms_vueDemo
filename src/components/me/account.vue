<template>
	<div class="templ">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<a id="head" class="mui-navigate-right">头像
				<span class="mui-pull-right head">
					<img class="head-img mui-action-preview" id="head-img1" :src="userInfo.head_img"/>
				</span>
			</a>
			</li>
			<li class="mui-table-view-cell">
				<a>姓名<span class="mui-pull-right">{{userInfo.user_name}}</span></a>
			</li>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<a>手机号<span class="mui-pull-right">{{userInfo.tel}}</span></a>
			</li>
			<li class="mui-table-view-cell">
				<a>邮箱地址<span class="mui-pull-right">{{userInfo.email}}</span></a>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				userInfo:[]
			}
		},
		created(){
			this.getUserInfo();
		},
		methods:{
			getUserInfo(){
				let url = "./src/statics/data/user.json";
				this.$http.get(url).then(res=>{
					this.userInfo = res.data;
				},res=>{
					Toast("网络出错,请稍后重试")
				})
			}
		}
	}
</script>
<style scoped>
	.templ{
		font-size: 14px;
	}
	.head-img{
		width: 40px;
		height:40px;
		display: block;
	}
	.mui-table-view-cell>a:not(.mui-btn){
		line-height: 40px;
	}
	.mui-pull-right.head{
		width: 42px;
    	height: 42px;
    	position: relative;
    	overflow: hidden;
	}
	.mui-pull-right.head img{
		position: absolute;
		height: 100%;
    	left: 50%;
    	top: 50%;
    	transform: translate(-50%,-50%);
    	width: auto;
	}
</style>