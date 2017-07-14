<template>
	<div class="templ">
		<!-- banner -->
		<bannerSlide :imageList ="list"></bannerSlide>
		<!-- 导航区 -->
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/news/newsList">
						<span class="mui-icon mui-icon-home"></span>
						<div class="mui-media-body">新闻资讯</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
						<div class="mui-media-body">图片分享</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<span class="mui-icon mui-icon-chatbubble"></span>
						<div class="mui-media-body">商品购买</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<span class="mui-icon mui-icon-location"></span>
						<div class="mui-media-body">留言反馈</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<span class="mui-icon mui-icon-search"></span>
						<div class="mui-media-body">视频专区</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<span class="mui-icon mui-icon-phone"></span>
						<div class="mui-media-body">联系我们</div>
					</a>
				</li>
			</ul> 
		</div>
	</div>
</template>
<script>
	import bannerSlide from '../common/bannerSlide.vue'
	//导入公共配置文件
	import apiHost from "../../config.js"
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getBanner();
		},
		methods:{
			getBanner(){
				var url = apiHost.apihost + '/getBanner'
				this.$http.get(url).then(
					function(res){
						this.list = JSON.parse(res.bodyText);
					},
					function(err){
						//此处在访问node后台数据接口的时候如果报错就访问本地的文件
						//为了方便本地打包测试，故做了以下操作,实际开发中不需要直接输出错误信息即可
						this.$http.get('data/banner.json').then(res => {
    					// 响应成功回调
						   this.list = res.data;
						 }, res => {
						   // 响应错误回调
						   Toast('网络出错,请稍后重试');
						});
					})
			}
		},
		components:{
    		bannerSlide
    	}
	}
</script>
<style scoped>
	.mui-content{
		background: none;
	}
	.mui-grid-view.mui-grid-9,.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border:none;
		background: none;
	}
	.mui-icon-home::before,.mui-icon-email::before,.mui-icon-chatbubble::before,.mui-icon-location::before,.mui-icon-search::before,.mui-icon-phone::before{
		content: "";
	}
	.mui-icon-home,.mui-icon-email,.mui-icon-chatbubble,.mui-icon-location,.mui-icon-search,.mui-icon-phone{
		width: 41px;
		height: 41px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
	}
	.mui-icon-home{
		background-image: url('../../statics/images/icon/menu10.png');
	}
	.mui-icon-email{
		background-image: url('../../statics/images/icon/menu3.png');
	}
	.mui-icon-chatbubble{
		background-image: url('../../statics/images/icon/menu4.png');
	}
	.mui-icon-location{
		background-image: url('../../statics/images/icon/menu5.png');
	}
	.mui-icon-search{
		background-image: url('../../statics/images/icon/menu6.png');
	}
	.mui-icon-phone{
		background-image: url('../../statics/images/icon/menu9.png');
	}
</style>