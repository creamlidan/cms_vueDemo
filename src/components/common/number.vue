<template>
	<div class="numTempl">
		<div class="left" @click="sub">-</div>
		<div class="middle">{{count}}</div>
		<div class="right" @click="add">+</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				count:1
			}
		},
		created(){
			this.count = this.initcount>1?this.initcount:1;
		},
		props:['initcount'],
		methods:{
			sub(){
				if(this.count<=1){
					this.count == 1;
				}else{
					this.count--;
				}
				this.radioCount();
			},
			add(){
				this.count++;
				this.radioCount();
			},
			//向父组件广播count值
			radioCount(){
				this.$emit('count',this.count);
			}
		}
	}
</script>
<style scoped>
	.left,.middle,.right{
		float: left;
		width: 45px;
		text-align: center;
		border:1px solid #BDBDBD;
		font-size:12px;
	}
	.middle{
		border-left: none;
		border-right: none;
	}
	.left,.right{
		width: 30px;
	}
	.numTempl{
		display: inline-block;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>