<template>
	<div class="templ">
		<div class="title">
			<h4>{{info.title}}</h4>
			<p>发表时间:{{info.add_time | fmtdate('YYYY-MM-DD')}}</p>
		</div>
		<div class="mui-card">
			<div class="mui-card-header mui-card-media">
				<img :src="info.img_url">
			</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>{{info.time}}</p>
					<div class="info_text" v-html="info.content"></div>
				</div>
			</div>
		</div>
		<div>
			<comments :artid="artid"></comments>
		</div>
	</div>
</template>
<script>
import apiHost from "../../config.js"
import comments from '../common/comments.vue'
	export default{
		data(){
			return{
				info:[],
				artid:0
			}
		},
		components:{
			comments//注册为私有组件
		},
		created(){
			this.getInfo();
			artid:this.$route.params.id
		},
		methods:{
			getInfo(){
				var id = this.$route.params.id
				var url = apiHost.apihost + "/src/statics/data/newsList.json?id="+ id;
				this.$http.get(url).then(res=>{
						var resList = JSON.parse(res.bodyText).message;
						//由于此处数据是假数据需要手动筛选数据
						for(var k in resList){
							if (resList[k].id ==  id) {
								this.info = resList[k];
								return;
							}
						}
					},res=>{
					console.log("访问新闻详细出错")
				})
			}
		}
	}
</script>
<style scoped>
.title{
	padding:10px 10px 0 10px;
}
.title h4{
	line-height: 1.5;
	font-size:16px;
}
.mui-card{
	box-shadow: none;
	background-color: inherit;
}
.mui-card-header.mui-card-media{
	display: flex;
	padding:0;
}
.mui-card-media img{
	width: 100%;
	height: auto;
}
.mui-card-content-inner{
	padding:0px;
}
.info_text{
	text-indent: 2em;
}
</style>