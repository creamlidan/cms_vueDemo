<template>
	<div class="templ">
		<div class="tablist">
			<ul id="tabUl">
			{{tablistLen}}
				<li v-for="(item,index) in tablist" :key="index">
					<a @click="getImageList(item.id)">{{item.title}}</a>
				</li>
			</ul>
		</div>
		<div class="imgList">
			<ul>
				<li v-for="(item,index) in imgList" :key="index">
					<router-link v-bind='{to:"/photo/photoInfo/"+item.id}'>
						<img v-lazy="item.img_url">
					</router-link>
					<p><span>{{item.zhaiyao}}</span></p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				tablist:[],
				imgList:[]
			}
		},
		created(){
			this.getTablist();
			this.getImageList("fj");
		},
		methods:{
			//获取图片分类列表
			getTablist(){
				let w = 0;
				this.$http.get('./src/statics/data/imgCategory.json').then(res=>{
					this.tablist = res.data.message;
					let w = (this.tablist.length * 48) + 10 +"px";
					document.getElementById("tabUl").style.width = w;
				},res=>{
					Toast("访问出错,请稍后重试");
				})
			},

			//根据分类ID获取图片列表数据
			getImageList(id){
				this.imgList = "";
				this.$http.get('./src/statics/data/imgCateList.json').then(res=>{
					var resData = res.data.message;
					for(var k in resData){
        					if(resData[k].img_cate == id){
        					  this.imgList = resData[k].img_list;
        					}
      					}
				},res=>{
					Toast("访问出错,请稍后重试");
				})
			}

		}
	}
</script>
<style>
	.tablist{
		width: 100%;
		overflow-x: auto;
		overflow-y:hidden;
	}
	.tablist ul{
		width: 1000px;
		padding-left: 10px;
	}
	.tablist li{
		display: inline-block;
		padding:10px;
		font-size:14px;
	}
	/* 懒加载图片样式 */
	image[lazy = loading]{
		width: 100%;
		margin:auto;
	}
	.imgList li{
		position: relative;
		margin-bottom: 10px;
	}
	.imgList li img{
		width: 100%;
	}
	.imgList li p{
		position: absolute;
		bottom: 0;
		left: 0;
		padding:10px;
		background: rgba(0,0,0,.5);
		color:rgba(255,255,255,.9);
		font-size:14px;
		margin-bottom: 0;
		width: 100%;
	}
</style>