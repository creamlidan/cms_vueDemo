<template>
	<div class="templ">
		<div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in list" :key="index">
					<router-link v-bind="{to:'/news/newsInfo/'+item.id}">
						<div class="mui-media-object mui-pull-left"><img :src="item.img_url"></div>
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
	import { Toast } from 'mint-ui'
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
				var url =  apiHost.apihost + '/getNewsList'
				this.$http.get(url).then(
					function(res){
						this.list = JSON.parse(res.bodyText).message;
					},
					function(err){
						var url = 'data/newsList.json';
						this.$http.get(url).then(res=>{
							this.list = res.data.message;
						},res=>{
							Toast("获取新闻列表失败,请稍后重试")
						})
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
    	overflow: hidden;
    	position: relative;
    	width: 82px;
	}
	.mui-media-object img{
		height: 100%;
    	position: absolute;
    	left: 50%;
    	transform: translateX(-50%);
	}
</style>