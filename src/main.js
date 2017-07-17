import Vue from "vue"
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
import VuePreview from 'vue-preview'

import App from './App.vue'

//导入mui样式
import './statics/css/mui.min.css'
import './statics/css/icons-extra.css'

//导入自定义样式
import './statics/css/base.css'
import './statics/js/base.js'

//导入mint-ui框架
import mintUI from 'mint-ui'
Vue.use(mintUI)//注入vue	
import 'mint-ui/lib/style.min.css'

//在vue中加载vueRouter
Vue.use(vueRouter);

// 使用vueResource对象才能自动在Vue对象实例上挂载一个$http
Vue.use(vueResource);

//图片弹出预览插件引用
Vue.use(VuePreview)

//定义时间全局过滤器采用的是moment.js插件
import moment from "moment";
Vue.filter('fmtdate',function(input,dateString){
	return moment(input).format(dateString);
})

import Home from './components/Home/Home.vue'
import member from './components/member/member.vue'
import shopCart from './components/shopCart/shopCart.vue'
import search from './components/search/search.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photo/photoList.vue'
import photoInfo from './components/photo/photoInfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'

let router = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{name:'root',path:'/',redirect:'/Home'},//当路由为'/'的时候重定向到'/ Home'
		{name:'home',path:'/Home',component:Home},
		{name:'member',path:'/member',component:member},
		{name:'shopCart',path:'/shopCart',component:shopCart},
		{name:'search',path:'/search',component:search},
		{name:'newsList',path:'/news/newsList',component:newsList},
		{name:'newsInfo',path:'/news/newsInfo/:id',component:newsInfo},
		{name:'photoList',path:'/photo/photoList',component:photoList},
		{name:'photoInfo',path:'/photo/photoInfo/:id',component:photoInfo},
		{name:'goodsList',path:'/goods/goodsList',component:goodsList},
		{name:'goodsInfo',path:'/goods/goodsInfo/:id',component:goodsInfo}
	]
})

new Vue({
	el:'#app',
	router,
	render:c=>c(App)
})

