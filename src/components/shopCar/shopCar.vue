<template>
	<div class="templ">
		<!-- 商品列表 -->
		<div class="shopList">
			<ul>
				<li v-for="(item,index) in shopList" :key="index">
					<div class="left">
						<mt-switch v-model="values[index]"></mt-switch>
					</div>
					<div class="middle">
						<img :src="item.img_url">
					</div>
					<div class="right">
						<h4>{{item.title}}</h4>
						<div class="number_price">
							<p>￥{{item.sell_price}}</p>
							<p>×{{item.count}}</p>
							<p class="del" @click="delGoods(item.id)">删除</p>
						</div>
					</div>
					
				</li>
			</ul>
		</div>
		<!-- 总计 -->
		<div class="total">
			<div class="left">
				<h4>总计(不含运费) :<span>{{totalPrices}}</span></h4>
				<p>已选中{{totalCount}}件商品</p>
			</div>
			<div class="right">
				<mt-button type="danger" size="small" @click="toSettlement">去结算</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import {getItem,removeItem}  from '../../public/localShop.js';
	import {vm,COUNT}  from '../../public/vm.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				shopList:[],
				values:[],//用来存储每条数据的switch
				totalPrices:0
			}
		},
		computed:{
			totalCount(){
				//初始化重置为0;
				this.totalPrices = 0;
				//计算出选中的商品有几件
				var trueArr = this.values.filter(function(item){return item})
				//计算出总价 = 商品的单价 * 商品的数量
				this.values.forEach((item,index)=>{
					if(item){
						var count = this.shopList[index].count;
						var price = this.shopList[index].sell_price;
						var itemCount = count * price;
						this.totalPrices += itemCount;
					}
				})
				return trueArr.length;
			}
		},
		created(){
			this.getShopList();
		},
		methods:{
			getShopList(){
				let list = getItem("goods");
				let goodsObj = {};
				let goods = [];
				let count = [];
				list.forEach(item=>{
					goods.push(item.goodsId);
					count.push(item.count);
				})
				var goodsShopList = [];
				let url = './src/statics/data/goodsList.json';
				this.$http.get(url).then(res=>{
					var list = res.data.message;
					for(var k in list){
      					for(var j in goods){
        					if(list[k].id == goods[j]){
        						list[k].count = count[j];
          						this.shopList.push(list[k]);
        					}
      					}
    				}
				},res=>{
					Toast("购物车发生错误请稍后重试");
				})
			},
			delGoods(id){
				let index = this.shopList.findIndex(c=>c.id == id);
				if(index >= 0){
					this.shopList.splice(index,1);
				}
				var removeCount = removeItem("goods",id);
				vm.$emit(COUNT,-removeCount);
			},
			toSettlement(){
				Toast("正在准备去结算,请稍等");
				var _this = this;
				setTimeout(function(){
					_this.$router.push({path:'/Home'});
				},3000)
			}
		}
	}
</script>
<style scoped>
	/* 商品列表样式 */
	.shopList{
		padding-top: 10px;
	}
	.shopList li{
		width: 100%;
		overflow:hidden;
		display: flex;
		position: relative;
		height: 85px;
		padding: 10px 0;
	}
	.shopList li+li{
		margin-top: 10px;
		border-top: 1px solid #f5f5f5;
	}
	.middle{
		width: 65px;
		height: 65px;
		overflow: hidden;
	}
	.middle img{
		width:100%;
	}
	.mint-switch{
		transform: scale(.6);
		padding-top: 15px;
	}
	.right{
		flex: 1;
		margin-left: 10px;
	}
	.right h4{
		font-size: 15px;
		margin:0;
		height: 34px;
		line-height: 1.2;
	}
	.number_price{
		margin-top:5px;
		display: flex;
	}
	.number_price p{
		flex: 1;
		margin-bottom: 0;
	}
	.number_price p:first-child{
		color:red;
	}
	.number_price p:last-child{
		color:#26a2ff;
		text-align: right;
		padding-right: 8px;
	}
	.number_price .numTempl{
		transform: scale(.85);
		margin-left: 0
	}

	/* 总价 */
	.total{
		width: 100%;
		background: #f5f5f5;
		padding:10px;
		display: flex;
	}
	.total h4{
		font-weight: bold;
		font-size:14px;
	}
	.total .left p{
		font-size:12px;
		margin-bottom: 0px;
	}
	.total .right{
		flex: 1;
		text-align: right;
	}
	.total .left{
		width: 70%;
		height: 48px;
	}
	.mint-button--small{
		margin-top: 8px;
	}
	.total .left h4 span{
		color:red;

		font-weight: bold;
		margin-left: 8px;
	}
</style>