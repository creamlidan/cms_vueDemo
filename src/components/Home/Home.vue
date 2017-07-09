<template>
	<div class="templ">
		<!-- banner -->
		<bannerSlide :imageList ="list"></bannerSlide>
		<!-- 导航区 -->
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<span class="mui-icon mui-icon-home"></span>
						<div class="mui-media-body">新闻资讯</div>
					</a>
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
				var url = 'http://localhost:2017/src/statics/data/banner.json'
				this.$http.get(url).then(
					function(res){
						this.list = JSON.parse(res.bodyText);
					},
					function(err){
						console.log(err)
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