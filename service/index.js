const express=require('express')
const http = require('http')
const request = require('request')
const fs = require('fs')
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
app.get('/getBanner', function (req, res) {
   fs.readFile('./data/banner.json','utf-8',(err,data)=>{
   		if(err){
   			throw err;
   			return;
   		}
   		res.send(data);
   })
})

//获取新闻列表、详细
app.get('/getNewsList', function (req, res) {
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
   fs.readFile('./data/comments.json','utf-8',(err,data)=>{
   		if(err){
   			throw err;
   			return;
   		}
   		res.send(data);
   })
})

app.post('/getComments', function (req, res) {
      // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        fs.readFile('./data/comments.json','utf8',function(err,data){
			if(err){
				throw err;
				return;
			}
			data = JSON.parse(data);
			for(var k in data.message){
				if(data.message[k].id == post.id){
					delete post.id;
					console.log(post)
					data.message[k].list.unshift(post);
				}
			}
			data = JSON.stringify(data);
			console.log(data);
        	fs.writeFile('./data/comments.json',data,function(err){
				if(err){
					throw err;
					return;
				}
				res.send("保存成功");
			})
		})

    });
})

const server = app.listen('8080',function(){
	console.log("正在监听8080端口")
})