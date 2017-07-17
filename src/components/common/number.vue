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
		methods:{
			sub(){
				this.count--;
			},
			add(){
				this.count++;
			},
			//向父组件广播count值
			radioCount(){
				let count = 'count';
				this.$emit(key,this.count);
			}
		}
	}
</script>
<style scoped>
	.left,.middle,.right{
		display: inline-block;
		width: 45px;
		text-align: center;
		border:1px solid #BDBDBD;
		font-size:12px;
	}
	.left,.right{
		width: 30px;
	}
	.numTempl{
		display: inline-block;
		margin-left: 10px;
	}
</style>