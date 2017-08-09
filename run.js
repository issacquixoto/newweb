const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

var url = 'https://www.smartticket.cn/';
var now = new Date();
var date = now.getFullYear()+'-'+ now.getMonth()+'-'+now.getDate()+'-'+now.getUTCHours();
var size = [440,1026];
var source_file = '../../../../Users/isaac/screenshot.png';

'../../../../Users/isaac/'

//生成放置图片的文件夹

function mkdir(dirpath,name){
    //判断是否是第一次调用
    if(typeof name === "undefined"){
        if(fs.existsSync(dirpath)){
            return;
        }else{
            mkdir(dirpath,path.dirname(dirpath));
        }
    }else{
        //判断第二个参数是否正常，避免调用时传入错误参数
        if(name !== path.dirname(dirpath)){
            mkdir(dirpath);
            return;
        }
        if(fs.existsSync(name)){
            fs.mkdirSync(dirpath);
        }else{
            mkdir(name,path.dirname(name));
            fs.mkdirSync(dirpath);
        }
    }
    console.log('mkdir完成');
}

//让HeadlessChrome生成图片
//
// function launchHeadlessChrome(size,url,callback) {
//     var CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
//     exec(`${CHROME} --headless --screenshot --disable-gpu --window-size=${size},1200 ${url}`, callback);
// }

function launchHeadlessChrome(url, callback) {
    // Assuming MacOSx.
    const CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
    exec(`${CHROME} --headless --disable-gpu --remote-debugging-port=9222 ${url}`, callback);
}

//移动文件

function movePhoto(source_file,destination_file){
    fs.writeFileSync(destination_file,fs.readFileSync(source_file));
    console.log('movePhoto完成');
}

//生成尺寸文件

// if (size.length >= 1){
//     for( var i = 0;i<size.length;i++){
//         var dirUrl = './'+url+'/'+date+'/'+size[i];
//         // mkdir(dirUrl);
//         launchHeadlessChrome(size[i],url);
//         // setTimeout(function(source_file,dirUrl){
//         //     movePhoto(source_file,dirUrl+'/screenshot.png');
//         // },  5000)
//
//     }
// }





launchHeadlessChrome(url);