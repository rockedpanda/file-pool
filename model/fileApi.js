'use strict';
/** 个人文件列表保存至个人配置列表中 */
var fs = require('fs');
var _ = require('underscore');
var path = require('path');
var date_format = require('date-format');
var list = [];
var _userid = '';

function init(userid) {
    list = JSON.parse(fs.readFileSync(path.join(__dirname,'../config/userdata/',userid+'.json')));
    _userid = userid;
}

function save() {
    fs.writeFileSync(path.join(__dirname,'../config/userdata/',_userid+'.json'),JSON.stringify(list,null,4));
}
function saveAsync(callback) {
    fs.writeFile(path.join(__dirname,'../config/userdata/',_userid+'.json'),JSON.stringify(list,null,4),callback);
}

function changeUser(userid){
    if(_userid){
        save();
    }
    init(userid);
}

function getList(){
    return list;
}

function add(fileInfo){
    /**
     * { fieldname: 'file',
        originalname: 'index.js',
        encoding: '7bit',
        mimetype: 'application/javascript' }
     */
    let d = Date.now();
    let dString = date_format.asString('yyyy-MM-dd hh:mm:ss', new Date(d));
    let info = {
        "name": fileInfo.originalname || "文件1.txt",
        "time": d,
        "timestring":dString,
        "filepath": "/uploads/"+fileInfo.filename
    };
    list.push(info);
    saveAsync(function(err,data) {
        console.log('saved...');
    });
}

exports.getList = getList;
exports.changeUser = changeUser;
exports.init = init;
exports.save = save;
exports.add = add;