<template>
	<div class="templ">
		<div>
		    <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,index) in goodsList">
		            <router-link v-bind="{to:'/goods/goodsInfo/'+item.id}">
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body">{{item.title}}</div>
		                <div class="otherGoodsInfo">
		                	<p class="price">
		                		<span>￥{{item.sell_price}}</span>
		                		<span>原价:{{item.market_price}}</span>
		                	</p>
		                	<p class="goodsNum">
		                		<span>热卖中</span>
		                		<span>剩余{{item.stock_quantity}}件</span>
		                	</p>
		                </div>
		            </router-link>
		        </li>
		    </ul> 
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{
				goodsList:[]
			}
		},
		created(){
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){
				let url = './src/statics/data/goodsList.json';
				this.$http.get(url).then(res=>{
					this.goodsList = res.data.message;
				},res=>{
					Toast("访问新闻详细出错,请稍后重试");
				})
			}
		}
	}
</script>
<style scoped>
	.otherGoodsInfo{
		background:#F5F5F5;
		margin-top:8px;
		text-align:left;
		padding:5px;
	}
	.price span:first-child{
		color:red;
		font-size: 16px;
	}
	.price span:last-child{
		font-size: 12px;
		margin-left: 2px;
		text-decoration: line-through;
	}
	.goodsNum{
		font-size: 12px;
		display: flex;
		margin-top: 5px;
		color:#666;
	}
	.goodsNum span:first-child{
		flex:1;
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
		text-align: left;
		text-overflow: inherit;
		white-space: normal;
		height: 32px;
		line-height: 1.2;
		margin-top: 5px;
		font-size: 14px;
	}
</style>