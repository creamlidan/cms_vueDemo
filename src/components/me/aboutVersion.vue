<template>
	<div class="templ">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<a>客服服务<span class="mui-pull-right"></span></a>
			</li>
			<li class="mui-table-view-cell">
				<router-link to="/messageBoard">问题反馈<span class="mui-pull-right"></span></router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		}
	}
</script>
<style scoped>
	.templ{
		font-size: 14px;
	}
</style>