<template>
	<div class="templ">
		<!-- 商品轮播图 -->
		<bannerSlide class="goodsImg" :imageList ="list"></bannerSlide>
		<!-- 商品购买区域 -->
		<div class="goodsBuy">
			<h4 class="goodsTitle">
				{{goodsInfo.title}}
			</h4>
		    <div class="goodsInfo">
		        <p class="price">
		        	<span><em>销售价 :</em>￥{{goodsInfo.sell_price}}</span>
		        	<span>市场价 :{{goodsInfo.market_price}}</span>
		        </p>
		    </div>
		    <div class="count">
		    	购买数量 :<number v-on:count="getCount"></number>
		    </div>
		    <div class="btnWrap">
		    	<mt-button size="small" type="primary">立即购买</mt-button>
				<mt-button size="small" type="danger">加入购物车</mt-button>
			</div>
		</div>
		<!-- 商品参数区域 -->
		<div class="parameter">
			<h4>商品参数</h4>
			<p>
				商品货号 :
				<span>{{goodsInfo.productId}}</span>
			</p>
			<p>
				库存数量 :
				<span>{{goodsInfo.stock_quantity}}件</span>
			</p>
			<p>
				上架时间 :
				<span>{{goodsInfo.add_time}}</span>
			</p>
		</div>
		<!-- 商品图文信息区域 -->
		<div class="goodsInt">
			<mt-button type="primary" plain size="large" @click="getGoodsInt" v-show="!isShowIntr">图文介绍</mt-button>
			<div class="text" v-html="goodsInfo.graph_icIntr" v-if="isShowIntr"></div>
		</div>
	</div>
</template>
<script>
	import bannerSlide from '../common/bannerSlide.vue';
	import apiHost from "../../config.js";
	import { Toast } from 'mint-ui';
	import number from '../common/number.vue';
	export default{
		data(){
			return{
				list:[],//图片轮播list
				goodsInfo:[],
				isShowIntr:false
			}
		},
		created(){
			this.getGoodsInfo();
		},
		methods:{
			getGoodsInfo(){
				let id = this.$route.params.id;
				let url = apiHost.apihost + '/getGoodsInfo?id=' + id;
				this.$http.get(url).then(res=>{
					this.goodsInfo = JSON.parse(res.bodyText);
					this.list = JSON.parse(res.bodyText).other_Img;
				},res=>{
					let url = 'data/goodsInfo.json';
					this.$http.get(url).then(res=>{
						let rList = res.data.message;
						 for (var k in rList) {
						 	if(rList[k].id == id){
						 		this.goodsInfo = rList[k];
						 		this.list = rList[k].other_Img;
						 		return;
						 	}
						 }
					},res=>{
						Toast("访问新闻详细出错,请稍后重试")
					})
				})
			},
			//用来接收子组件传递过来的值
			getCount(count){
				console.log("count="+count)
			},
			getGoodsInt(){
				this.isShowIntr = !this.isShowIntr
			}
		},
		components:{
    		bannerSlide,
    		number
    	}
	}
</script>
<style scoped>
	.goodsImg{
		padding:2px;
		border:1px solid #eee;
		margin:5px;
		border-radius: 2px;
		overflow: hidden;
	}
	.goodsBuy{
		margin:5px;
		border:1px solid #eee;
		border-radius: 2px;
	}
	.goodsBuy>div{
		margin-bottom: 15px;
	}
	.goodsTitle{
		color:#26a2ff;
		margin:10px 5px;
		padding:5px 5px 15px 5px;
		border-bottom: 1px solid #eee;
	}
	.goodsBuy .goodsInfo{
		text-align:left;
		padding:5px 0px 0px 15px;
		margin-bottom: 5px;
	}
	.price span:first-child{
		color:red;
		font-size: 18px;
		margin-right: 10px;
	}
	.price span:first-child em{
		color:#666;
		margin-right: 2px;
		font-size: 12px;
		font-style: normal;
	}
	.price span:last-child{
		font-size: 12px;
		margin-left: 2px;
		text-decoration: line-through;
	}
	.count{
		font-size: 12px;
		padding-left: 15px;
	}
	.btnWrap{
		padding-left: 15px;
	}
	/* 商品详情 */
	.parameter{
		margin:5px;
		border-radius: 2px;
		border:1px solid #eee;
		padding:5px;
	}
	.parameter h4{
		border-bottom:1px solid #eee;
		padding-bottom: 10px;
		font-size:14px;
	}
	.parameter p{
		font-size:12px;
		margin-bottom: 0;
		padding-left: 15px;
	}
	/* 图文介绍	 */
	.goodsInt{
		margin:5px;
		border-radius: 2px;
		border:1px solid #eee;
		padding:5px;
	}
	.goodsInt .mint-button{
		height: 36px;
		font-size:14px;
	}
	.goodsInt .text{
		margin-top: 10px;
		font-size:12px;
		text-indent: 2em;
	}
</style>