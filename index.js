'use strict';
var fs = require('fs');
var _ = require('underscore');
var express = require('express');
var path = require('path');
var router = require('./router/router.js');
var fileApi = require('./model/fileApi.js');
var multer = require('multer');
var config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8') || '{}');
config = _.extend({
    port: 3000,
    user: 'admin',
    password: '123456',
    filedir: "public/uploads"
}, config);

fileApi.changeUser(config.user);

var uploading = multer({
    dest: __dirname + config.filedir
});
var bodyParser = require('body-parser');

var app = express();

/** 环境变量配置 **/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(path.join(__dirname, config.filedir)));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/*app.use('/upload', function(req, res, next) {
    console.log(req.files); //JSON Object
    next();
});*/

var muilter = require('./model/multerUtil.js');
//multer有single()中的名称必须是表单上传字段的name名称。
// var uploadfile=; 

app.post('/upload', muilter.single('file'), function(req, res) {
    var file = req.file;
    console.log('-------------------');
    console.log(JSON.stringify(file));
    fileApi.add(file);
    res.redirect('/');
});

app.get('/', function(req, res) {
    let fileList = fileApi.getList();
    res.render('index.ejs', {
        list: fileList
    });
    // res.send('hello world');
});

app.listen(config.port, '127.0.0.1');
console.log('程序已启动,正监听:'+'127.0.0.1:'+config.port);