<template>
	<div class="templ">
		<div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in list" :key="index">
					<router-link v-bind="{to:'/news/newsInfo/'+item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h2>{{item.title}}</h2>
							<p class='mui-ellipsis'>
								<span class="time">发布时间：{{item.add_time | fmtdate('YYYY-MM-DD')}}</span>
								<span class="clickNum">点击：{{item.click}}</span>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	//导入公共配置文件
	import apiHost from "../../config.js"
	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getList();
		},
		methods:{
			getList(){
				var url =  apiHost.apihost + '/src/statics/data/newsList.json'
				this.$http.get(url).then(
					function(res){
						this.list = JSON.parse(res.bodyText).message;
					},
					function(err){
						console.log(err)
					})
			}
		}
	}
</script>
<style scoped>
	.mui-ellipsis{
		display: flex;
	}
	.mui-media-body h2{
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	overflow: hidden;
    	font-size: 16px;
    	color: #333;
    	font-weight: normal;
    	margin-top: 10px;
    	line-height: 1.2;
    	margin-bottom: 20px;
	}
	.mui-ellipsis .time,.mui-ellipsis .clickNum{
		color:#999;
		font-size: 12px;
	}
	.mui-ellipsis .time{
		flex:1;
	}
	.mui-table-view .mui-media-object{
		max-width: 82px;
		height: 82px;
		line-height: 82px;
	}
</style>