# ali-oss-node-koa-upfile
## 阿里云OSS文件上传 NODEJS KOA 框架 应用示例
### 1.安装
	npm install
### 2.修改阿里云 配置
找到文件xiaoguan.js 修改两处设置 把对应的星星替换成你的

	//第一处修改
	const client = new OSS({
		region: 'oss-cn-***', //自定义项
		accessKeyId: '***', //自定义项
		accessKeySecret: '***' //自定义项
	});
	
	//第二处修改
	co(function*() {
		client.useBucket('***'); //自定义项
		....
	}
	
### 3.运行 node xiaoguan
- 打开 http://127.0.0.1:3000 试试吧 祝君好运！
- 端口可以自行修改 xiaoguan.js 的最后一行 app.listen(3000);

### QQ：309678100 第一次用Koa代码有点乱，请各位道友多多指教~
