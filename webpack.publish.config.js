/*
* 发布阶段配置文件
*/
var path = require('path');
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin');

//删除文件夹的插件
var CleanPlugin = require('clean-webpack-plugin');

//抽取css
var ExtractTextWebpackPlugin  = require('extract-text-webpack-plugin');
//拷贝文件
var CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
	entry:'./src/main.js', //要打包的源文件
	//分离第三方应用
	entry:{
		app:'./src/main.js',
		vendors:['vue']
	},
	output:{
		path:path.resolve(__dirname, './dist/'),//将所有打包的文件都要放到这个目录下
		filename:'build.js' //打包后输出的文件名称
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
			},
			{
				test:/\.less$/,
				use:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader!less-loader"
                })
			},
			{
				test:/\.(png|jpg|gif|jpeg)$/, //url的文件后缀可添加修改
				loader:'url-loader?limit=40000&name=images/[name].[ext]',
			},
			{
				test:/\.(eot|woff|woff2|svg|ttf)$/,
				use: 'url-loader?limit=40000&name=fonts/[name].[ext]', //小于40k会解析成base64位放入build.js中 大于10K会由webpack打包成新文件（值不能过大，否则build文件过大影响性能）
			},
			{
				test:/\.js$/, 
				loader:'babel-loader',//转换所有js文件中的es6语法为es5语法
				exclude:/node_modules/ //排除node_modules文件夹
			},
			{
				test:/\.vue$/, 
				loader:'vue-loader',
			},
            {
                test: /vue-preview.src.*?js$/,//解析vue-preview中特殊格式文件
                loader: 'babel-loader'
            }
		]
	},
	//系统会帮我们自动生成一个index文件(为了避免打包后的路径问题)
	plugins: [
		//清除文件夹的插件
        new CleanPlugin(['dist']),
        //分离第三方应用
		new webpack.optimize.CommonsChunkPlugin({name:'vendors',filename:'vendors.js'}),
		new CopyWebpackPlugin([{
            from: __dirname + '/src/statics/data',
            to:__dirname +'/dist/data'
        }]),
       	new CopyWebpackPlugin([{
            from: __dirname + '/src/statics/images',
            to:__dirname +'/dist/images'
        }]),
    	new htmlWebpackPlugin({
        	template:'index.html',//根据index.html这个模板来生成(自己生成)
          	htmlWebpackPlugin:{
          	  "files":{
          	      "css":["app.css"],
          	      "js":['vendors.js','bundle.js']
          	  }
          	},
        	//html压缩清除注释空格换行等
        	minify:{
        	  removeComments:true,
        	  collapseWhitespace:true,
        	  removeAttributeQuotes:true
        	}
    	}),
    	//webpack内置插件 -压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
    	//抽离的css的名字
        new ExtractTextWebpackPlugin("app.css"),
        //删除构建过程中的警告
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:'"production"'
            }
        })
  	]

}