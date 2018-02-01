const Koa = require("koa");
const fs = require("fs");
const route = require("koa-route");
const formidable = require("formidable");
const app = new Koa();
const co = require('co');
const OSS = require('ali-oss');
const client = new OSS({
    region: '***', //自定义项
    accessKeyId: '***', //自定义项
    accessKeySecret: '***' //自定义项
});

const home = (ctx, next) => {
    ctx.body = require("fs").readFileSync("./tpl/xiaoguan.html", "utf-8");
}

const upfile = async(ctx, next) => {
    var alioss_upfile = function() {
        return new Promise(function(resolve, reject) {
            var form = new formidable.IncomingForm();
            form.parse(ctx.req, function(err, fields, files) {
                if (err) { throw err; return; }
                // 文件名
                var date = new Date();
                var time = '' + date.getFullYear() + date.getMonth() + 1 + date.getDate();
                var filepath = time + '/' + date.getTime();
                var fileext = files.file.name.split('.');
                var upfile = files.file.path;
                var newfile = filepath + '.' + fileext[1];
                //ali-oss
                co(function*() {
                    client.useBucket('***'); //自定义项
                    var result = yield client.put(newfile, upfile);
                    //var result = yield client.put(fields.store, new Buffer(fields.buffer));
                    console.log('文件上传成功!', result.url);
                    ctx.response.type = 'json';
                    ctx.response.body = result.url;
                    resolve(next());
                }).catch(function(err) {
                    console.log(err);
                });
            });
        });
    };
    await alioss_upfile();
};

app.use(route.get('/', home));

app.use(route.post('/upfile', upfile));

app.listen(3000);