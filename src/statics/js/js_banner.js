function slideBanner(element){
	this.element = element;
	this.BannerUl = this.element.children[0];
	this.items = this.BannerUl.children;
	this.items_n = this.items.length;
	this.itemsW = this.element.clientWidth;
	this.index = 1;
	this.timer = null;
	this.BannerUl.appendChild(this.BannerUl.children[0].cloneNode(true));//克隆第一个节点
	this.BannerUl.insertBefore(this.BannerUl.children[this.items_n-1].cloneNode(true),this.BannerUl.children[0]);//克隆第一个节点
	this.setting = function(){
		this.BannerUl.style.width = this.items.length * 100 +"%";
		var str = "";
		for(var i = 0; i < this.items.length; i++){
			this.items[i].style.width = 100 / this.items.length +"%";
		}
		for(var i = 0; i <= this.items_n-1; i++){
			str += "<li></li>";
		}
		this.BannerUl.style.transform = "translate3d("+ -this.itemsW +"px,0,0)";
		var bannerOl = document.createElement('ol');
		bannerOl.innerHTML = str;
		this.element.appendChild(bannerOl);
	}();
	this.bannerOl = this.element.children[1];
	this.bannerOlLis = this.bannerOl.children;
	this.bannerOlLis[0].classList.add("current");
	/*公用方法*/
	/*清除过渡*/
	this.removeTransition = function(){
		this.BannerUl.style.transition = "none";
		this.BannerUl.style.webkitTransition = "none";
	}
	/*设置过渡*/
	this.setTransition = function(){
		this.BannerUl.style.transition = "all  .2s";
		this.BannerUl.style.webkitTransition = "all .2s";
	}
	/*设置过渡*/
	this.setTranslateX = function(x){
		this.BannerUl.style.transform = "translateX("+ x +"px)";
		this.BannerUl.style.webkitTransition = "translateX("+ x +"px)";
	}
	/*设置轮播提示点*/
	this.setBannerOlStyle = function(index){
		for(var i = 0; i < this.bannerOlLis.length; i++){
			this.bannerOlLis[i].classList.remove("current");
		}
		if(index == 6){
			this.bannerOlLis[0].classList.add("current");
		}else if(index == 0){
			this.bannerOlLis[4].classList.add("current");
		}else{
			this.bannerOlLis[index-1].classList.add("current");
		}
	}
	/*设置自动轮播*/
	this.setAuto = function(){
		this.timer = setInterval(function(){
			this.index++;
			this.setTransition();
			this.setTranslateX(-this.index * this.itemsW);
			this.setBannerOlStyle(this.index);
		},2000);
	};
	this.setAuto();
	banner.transitionEnd(this.BannerUl,function(){
		if(this.index >= 6){
			this.index = 1;
			this.removeTransition();
			this.setTranslateX(-this.index * self.itemsW);
			this.setBannerOlStyle(this.index);
		}else if(this.index <= 0){
			this.index = 5;
			this.removeTransition();
			this.setTranslateX(-this.index * self.itemsW);
			this.setBannerOlStyle(this.index);
		}
	});
	this.slide = function(){
		var self = this;
		var startHander = function(e){
			clearInterval(timer);
			self.startX = e.targetTouches[0].clientX;
			self.offset = 0;
		}
		var moveHander = function(e){
			e.preventDefault();
			self.offset = e.targetTouches[0].clientX - self.startX;
			self.removeTransition();
			self.setTranslateX(- self.itemsW * index + self.offset);
		}
		var endHander = function(e){
			//如果为负值banner向左移动
			if(self.offset < 0){
				index ++;
			}
			//如果为正值banner向右移动
			if(self.offset > 0){
				index --;
			}
			self.setTransition();
			self.setTranslateX(-index * this.itemsW);
			self.setBannerOlStyle(index);
			clearInterval(this.timer);
			self.setAuto();
		}
		this.BannerUl.addEventListener("touchstart",startHander);
		this.BannerUl.addEventListener("touchmove",moveHander);
		window.addEventListener("touchend",endHander);
	}();
}
window.banner ={};
banner.transitionEnd =function(dom,callback){
	if(dom && typeof dom == "object"){
		dom.addEventListener("transitionEnd",function(){
			callback && callback();
		})
		dom.addEventListener("webkitTransitionEnd",function(){
			callback && callback();
		})
	}
}
window.onload = function(){
	slideBanner(document.querySelector(".J_banner"));
}