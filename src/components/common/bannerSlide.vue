<template>
	<div class="banTempl">
		<!-- banner -->
		<mt-swipe :auto="4000" class="swipe_wrap">
			<mt-swipe-item v-for="(item,index) in imageList" :key="index">
				<a href="##" :style="item.backgroundImg" class="swipe_img"></a>
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},props:['imageList']
	}
</script>
<style scoped>

	.swipe_wrap,.mint-swipe-items-wrap{
		height:2.6rem;
	}
	.swipe_img{
		display: block;
		width: 100%;
		height:100%;
		background-position:center;
		background-size:auto 100%;
		background-repeat: no-repeat;
	}
	.swipe_wrap .mint-swipe-indicator{
		opactiy:0.5 !important;
	}
	.swipe_wrap .mint-swipe-indicator.is-active{
		background: #26a2ff !important;
	}
</style>