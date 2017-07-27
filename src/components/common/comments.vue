<template>
	<div class="templ comments_wrap">
		<h4>评论区</h4>
		<div class="text_wrap">
			<textarea ref="textarea" id="" cols="30" rows="4"></textarea>
			<button class="mint-button mint-button--primary mint-button--large" @click="postComments"><!----> <label class="mint-button-text">提交</label></button>
		</div>
		<h4 class="comments_title">
			评论列表
			<span>共{{comments.length}}条</span>
		</h4>
		<div class="comments_list">
			<ul>
				<li v-for="(item,index) in comments" :key="index">
					<p>{{item.content}}</p>
					<p>
						<span>{{item.user_name}}</span>
						<span>{{item.add_time | fmtdate("YYYY-MM-DD")}}</span>
					</p>
				</li>
				<li v-if="!comments.length"><p>暂时还没有人评论~~</p></li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				comments:[]//用来存储评论列表
			}
		},
		created(){
			this.getComments();
		},
		methods:{
			postComments(){
				let id = this.$route.params.id;
				let url = './src/statics/data/comments.json';
				let time = new Date().toString();
				let contentText = this.$refs.textarea.value;
				if(contentText.length<=0){
					Toast("不能发表空的评论!");
					return;
				}
				this.$http.post(url,{"content":contentText,"add_time":time,"user_name":"匿名用户","id":id},{emulateJSON:true}).then(res=>{
					Toast('提交成功');
					this.getComments(1);
				},res=>{
					Toast('添加评论失败,请稍后重试');
				})
			},
			getComments(){
				let id = this.$route.params.id;
				let url = './src/statics/data/comments.json';
				this.$http.get(url).then(res=>{
				let resData = res.data.message;
					for(var k in resData){
						if(resData[k].id == id){
							this.comments = resData[k].list;
						}
					}
				},res=>{
					Toast('获取评论数据失败,请稍后重试');
				})
			}
		},
		props:['artid']//用来接收评论所属内容的id
	}
</script>
<style scoped>
	.comments_wrap{
		padding:10px;

	}
	.comments_list ul{
		padding:0px;
	}
	.comments_list ul li+li{
		border-top:1px solid #ccc;
		padding-top: 10px;
	}
	.comments_list ul li p{
		color:#666;
	}
	.comments_list ul li p:last-child{
		color:#999;
		font-size: 14px;
		display: flex;
	}
	.comments_list ul li p:last-child span:first-child{
		flex:1;
	}
	.comments_title{
		position: relative;
		margin-top: 20px;
	}
	.comments_title span{
		position: absolute;
		right:0;
		bottom:0;
		font-size: 12px;
		color: #666;
	}
	.mint-button--default{
		margin-top: 40px;
	}
</style>