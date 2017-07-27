<template>
	<div class="templ">
		<div class="title">
			<h4>{{photoInfo.title}}</h4>
			<p>发表时间: {{photoInfo.add_time | fmtdate('YYYY-MM-DD')}}</p>
		</div>
		<div class="thumbnail">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in list">
					<img class="preview-img thumImg" height="100" :src="item.src" @click="$preview.open(index, list)">
		        </li>
		    </ul> 
		</div>
		<div class="photo_text">
			{{photoInfo.content}}
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				photoInfo:[],
				list:[]
			}
		},
		created(){
			this.getPhotoInfo();
		},
		methods:{
			getPhotoInfo(){
				let id = this.$route.params.id;
				this.$http.get('./src/statics/data/imgCateList.json').then(res=>{
					var resData = res.data.message;
					for(var k in resData){
        				if(resData[k].img_cate == id.slice(0,2)){
        					let imgList =  resData[k].img_list;
        					for(var k in imgList){
        						if(imgList[k].id == id){
        							this.photoInfo = imgList[k];
        							this.list = imgList[k].other_imgUrl;
        						}
        					}
        				}
      				}
				},res=>{
					Toast("访问出错,请稍后重试");
				})
			}
		}
	}
</script>
<style scoped>
	.title{
		padding-left: 10px;
		padding-top: 10px;
		border-bottom: 1px solid #ccc;
	}
	.mui-grid-view.mui-grid-9{
		background: white;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		width: 80px;
		height: 80px;
		margin:10px;
		border:none;
		position: relative;
		padding:0;
	}
	.thumImg{
		width: 80px;
		height: 80px;
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
	.photo_text{
		text-indent: 2em;
		margin-top: 10px;
		font-size: 14px;
	}
</style>