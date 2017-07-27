<template>
	<div class="templ">
		<h4 class="activity_title">
			{{activityInfo.activity_title}}
			<p>上传时间 : {{activityInfo.add_time | fmtdate("YYYY-MM-DD")}}</p>
		</h4>

		<div class="activityInfo">
			<img :src="activityInfo.activity_image"/>
			<p v-html="activityInfo.activity_info"></p>
		</div>

	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				activityInfo:[]
			}
		},
		created(){
			this.getActivity();
		},
		methods:{
			getActivity(){
				let id = this.$route.params.id;
				let url = "./src/statics/data/activity.json";
				this.$http.get(url).then(res=>{
					var list = res.data.message;
					for(var k in list){
						if(list[k].id == id){
							this.activityInfo = list[k];
						}
					}
				},res=>{
					Toast("活动列表错误");
				})
			}
		}
	}
</script>
<style scoped>
	.templ{
		padding:15px;
	}
	.activity_title{
		border-bottom: 1px solid #f5f5f5;
	}
	.activity_title p{
		margin-top: 10px;
	}
	.activityInfo img{
		width: 100%;
	}
	.activityInfo p{
		text-indent: 2em;
	}
</style>