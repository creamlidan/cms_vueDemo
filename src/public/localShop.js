/*
* 利用localstroage来存储商品id和数量
*/
//根据key获取数据
export function getItem(KEY){
	return JSON.parse(localStorage.getItem(KEY) || '[]');
}

//向localstroage存储数据
export function setItem(KEY,obj){
	var isAdd = true;
	//获取旧的数据
	var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
	//判断是否购物车数据中已经存在该商品了，如果存在就直接叠加数据
	for(var k in arr){
		if(arr[k].goodsId == obj.goodsId){
			arr[k].count += obj.count;
			isAdd = false;
		}
	}
	//当isAdd为真是直接push到数组中
	if(isAdd){
		arr.push(obj);
	}
	//将新传递的数据添加到数组中
	//存储到localStroage中
	localStorage.setItem(KEY,JSON.stringify(arr));
}

//向localstroage移除数据
export function removeItem(KEY,goodsId){
	//获取旧的数据
	var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
	var newArr = [];
	var count = 0;
	if(!goodsId){
		localStorage.removeItem(KEY);
	}else{
		for(var k in arr){
			if(arr[k].goodsId != goodsId){
				newArr.push(arr[k])
			}else{
				count = arr[k].count
			}
		}
	}

	//将新传递的数据添加到数组中
	//存储到localStroage中
	localStorage.setItem(KEY,JSON.stringify(newArr));
	return count;
}