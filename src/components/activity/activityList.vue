<template>
	<div class="templ">
		<ul class="activityList">
			<li v-for="(item,index) in list" :key="index">
				<router-link v-bind="{to:'/activity/activityInfo/'+item.id}">
					<img :src="item.activity_image"/>
					<h4>{{item.activity_title}}</h4>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getActivity();
		},
		methods:{
			getActivity(){
				let url = "./src/statics/data/activity.json";
				this.$http.get(url).then(res=>{
					this.list = res.data.message;
				},res=>{
					Toast("活动列表错误");
				})
			}
		}
	}
</script>
<style scoped>
	.activityList{
		padding-top: 10px;
	}
	.activityList li{
		padding:10px;
		margin:10px;
		border:1px solid #f5f5f5;
		border-radius: 2px;
	}
	.activityList li img{
		width: 100%;
	}
	.activityList li h4{
		position: relative;
		color:#666;
		margin-top: 10px;
	}
	.activityList li h4::after{
		content:'\E583';
		position: absolute;
		font-family: "Muiicons";
		right: 0;
	}
</style>