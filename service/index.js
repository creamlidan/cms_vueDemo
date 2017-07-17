const express=require('express')
const http = require('http')
const request = require('request')
const fs = require('fs')
var url = require('url') 
const app = express()
var querystring = require('querystring');

//实现跨域
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

//获取banner图片列表
app.get('/getBanner',(req, res)=> {
   fs.readFile('./data/banner.json','utf-8',(err,data)=>{
   		if(err){
   			throw err;
   			return;
   		}
   		res.send(data);
   })
})

//获取新闻列表、详细
app.get('/getNewsList', (req, res)=>{
   fs.readFile('./data/newsList.json','utf-8',(err,data)=>{
   		if(err){
   			throw err;
   			return;
   		}
   		res.send(data);
   })
})

//获取评论列表
app.get('/getComments', function (req, res) {
    //var rdata  =  url.parse(req.url,true).query;//获取参数
    //var pageIndex = rdata.pageIndex; //获取传递过来的参数用来筛选数据
    fs.readFile('./data/comments.json','utf-8',(err,data)=>{
   		if(err){
   			throw err;
   			return;
   		}
   		res.send(data);
   })
})

//添加评论
app.post('/getComments', (req, res)=>{
      // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        fs.readFile('./data/comments.json','utf8',(err,data)=>{
			if(err){
				throw err;
				return;
			}
			data = JSON.parse(data);
			for(var k in data.message){
				if(data.message[k].id == post.id){
					delete post.id;
					data.message[k].list.unshift(post);
				}
			}
			data = JSON.stringify(data);;
      fs.writeFile('./data/comments.json',data,err=>{
		    if(err){
		    	throw err;
		    	return;
		    }
		    res.send("保存成功");
			})
		})

    });
})

//获取图片分享的分类列表
app.get('/getPhotoTablist',(req, res)=> {
    fs.readFile('./data/imgCategory.json','utf-8',(err,data)=>{
      if(err){
        throw err;
        return;
      }
      res.send(data);
   })
})

//获取图片分享的分类列表
app.get('/getImageList', (req, res)=> {
    var imgId  =  url.parse(req.url,true).query;//获取参数
    fs.readFile('./data/imgCateList.json','utf-8',(err,data)=>{
      if(err){
        throw err;
        return;
      }
      var data = JSON.parse(data);
      //根据传递的ID筛选出数据
      for(var k in data.message){
        if(data.message[k].img_cate == imgId.id){
          res.send(data.message[k]);
          return;
        }
      }
   })
})

//获取商品列表
app.get('/getGoodsList',(req,res)=>{
  fs.readFile("./data/goodsList.json",'utf-8',(err,data)=>{
    if(err){
      throw err;
      return;
    }
    res.send(JSON.parse(data).message);
  })
})

//获取商品详情
app.get('/getGoodsInfo',(req,res)=>{
  var goodsId  =  url.parse(req.url,true).query;//获取参数
  console.log(111);
  console.log(goodsId)
  fs.readFile("./data/goodsInfo.json",'utf-8',(err,data)=>{
    if(err){
      throw err;
      return;
    }
    var data = JSON.parse(data);
    
    for( var k in data.message){
      if(data.message[k].id == goodsId.id){
        res.send(data.message[k]);
      }
    }
  })
})

const server = app.listen('8080',function(){
	console.log("正在监听8080端口")
})