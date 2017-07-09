var path = require('path');
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry:'./src/main.js', //要打包的源文件
	output:{
		path:path.resolve(__dirname, './dist/'),//将所有打包的文件都要放到这个目录下
		filename:'build.js' //打包后输出的文件名称
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			{
				test:/\.(png|jpg|gif|jpeg)$/, //url的文件后缀可添加修改
				loader:'url-loader?limit=40000',
			},
			{
				test:/\.(eot|woff|woff2|svg|ttf)$/,
				use: 'url-loader?limit=40000',//小于40k会解析成base64位放入build.js中 大于10K会由webpack打包成新文件（值不能过大，否则build文件过大影响性能）
			},
			{
				test:/\.js$/, 
				loader:'babel-loader',//转换所有js文件中的es6语法为es5语法
				exclude:/node_modules/, //排除node_modules文件夹
				query:{presets:['es2015']}
			},
			{
				test:/\.vue$/, 
				loader:'vue-loader',
			}
		]
	},
	//系统会帮我们自动生成一个index文件(为了避免打包后的路径问题)
	plugins: [
    	new htmlWebpackPlugin({
    	  title: 'index', //生成页面的标题
    	  filename: 'index.html',//生成文件的名称
    	  template:'index.html'//根据index.html这个模板来生成(自己生成)
    	})
  	]

}