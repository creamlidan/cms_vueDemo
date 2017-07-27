<template>
	<div class="templ leaveMessage_wrap">
		<h4>问题和建议：</h4>
		<div class="text_wrap">
			<textarea ref="textarea" id="" cols="30" rows="4"></textarea>
			<button class="mint-button mint-button--primary mint-button--large" @click="postLeaveMessage"><!----> <label class="mint-button-text">提交</label></button>
		</div>
		<h4 class="leaveMessage_title">
			最新反馈:
		</h4>
		<div class="leaveMessage_list">
			<ul>
				<li v-for="(item,index) in leaveMessageList" :key="index">
					<p>{{item.content}}</p>
					<p>
						<span>{{item.user_name}}</span>
						<span>{{item.add_time | fmtdate("YYYY-MM-DD")}}</span>
					</p>
				</li>
				<li v-if="!leaveMessageList.length"><p>暂时还没有人评论~~</p></li>
			</ul>
			<button class="mint-button mint-button--default mint-button--large" v-show="isFooter" @click="more"><!----> <label class="mint-button-text" >加载更多</label></button>
		</div>
	</div>
</template>
<script>
	import apiHost from '../../config.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				leaveMessageList:[],
				pageIndex:1,//用来存储评论列表
				isFooter:true
			}
		},
		created(){
			this.getLeaveMessage(this.pageIndex);
		},
		methods:{
			postLeaveMessage(){
				let url = apiHost.apihost + '/postLeaveMessage';
				let time = new Date().toString();
				let contentText = this.$refs.textarea.value;
				if(contentText.length<=0){
					Toast("不能发表空的留言!");
					return;
				}
				//由于没有搭后台留言提交功能暂时不能实现
				this.$http.post(url,{"content":contentText,"add_time":time,"user_name":"匿名用户"},{emulateJSON:true}).then(res=>{
					Toast('提交成功');
					this.leaveMessageList =[];
					this.getLeaveMessage(1);
				},res=>{
					let url = 'data/messageBoard.json';
					this.$http.post(url,{"content":contentText,"add_time":time,"user_name":"匿名用户","id":id},{emulateJSON:true}).then(res=>{
						Toast('提交评论成功');
						this.leaveMessageList =[];
						this.getLeaveMessage(1);
						},res=>{
							Toast('添加评论失败,请稍后重试');
						})
					})
			},
			getLeaveMessage(pageIndex){
				let url = './src/statics/data/messageBoard.json';
				this.$http.get(url).then(res=>{
					let resData = res.data.message.slice((pageIndex-1)*5,pageIndex*5);
					resData.forEach(item=>{
						this.leaveMessageList.push(item)
					})
					if(res.data.length<=0){
						this.isFooter = false;
					}
				},res=>{
					Toast('获取评论数据失败,请稍后重试')
				})
			},
			more(){
				this.pageIndex++;
				this.getLeaveMessage(this.pageIndex);
			}
		}
	}
</script>
<style scoped>
	.leaveMessage_wrap h4{
		margin-bottom: 10px;
		font-weight: bold;
	}
	.leaveMessage_wrap{
		padding:10px;

	}
	.leaveMessage_list ul{
		padding:0px;
	}
	.leaveMessage_list ul li+li{
		border-top:1px solid #ccc;
		padding-top: 10px;
	}
	.leaveMessage_list ul li p{
		color:#666;
	}
	.leaveMessage_list ul li p:last-child{
		color:#999;
		font-size: 14px;
		display: flex;
	}
	.leaveMessage_list ul li p:last-child span:first-child{
		flex:1;
	}
	.leaveMessage_title{
		position: relative;
		margin-top: 20px;
	}
	.leaveMessage_title span{
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