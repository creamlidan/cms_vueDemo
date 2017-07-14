## 项目说明文档
### 技术选型
- vue2 + vue-resource + vue-router + mint-ui + mui + webpack + ES6  + less + flex 
### 关于数据接口
- nodejs构建的后台系统接口
- 注意点: 项目中涉及到数据请求的地方在返回错误信息的回调函数中,重新发送了一次本地静态资源请求，方便打包到手机上测试.真实环境忽略删除即可
### 项目运行
- git clone https://github.com/creamlidan/cms_vueDemo.git  

- cd 项目文件

- npm install

- 打开项目文件目录里面的service文件夹 --> 开启命令窗口 --> node index.js 开启服务

- npm run dev 即可本地测试(本地测试之前请确保开启服务,否则..你懂的~)

- npm run publish (发布版本,这里要注意更换根目录下的配置文件提供接口地址,删除测试用的data文件即可)