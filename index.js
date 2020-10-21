const fs = require('fs')
const path = require('path')
const tinify = require("tinify");
tinify.key = "QPd6PZDTFsC0FtQR0Jk8K1FsLZ7h3xHz";

function getFileName(url){
  var regExp = /(.*\/)*(.*)/ig;
	url=url.replace(regExp, "$2");
	return url;
}
const compressFn = (filedir) =>  {
  const fileName = getFileName(filedir)
  if (fileName.match(/\.(png|jpg)$/)) {
    const source = tinify.fromFile(filedir)
    source.toFile(filedir)
  } else {
    console.log('只能压缩png|jpg')
  }
}

function fileDisplay(filePath){
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath,function(err,files){
      if(err){
          console.warn(err)
      }else{
          //遍历读取到的文件列表
          // eslint-disable-next-line no-console
          console.log('files', files);
          files.forEach(function(filename){
              //获取当前文件的绝对路径
              var filedir = path.join(filePath,filename);
              //根据文件路径获取文件信息，返回一个fs.Stats对象
              fs.stat(filedir,function(eror,stats){
                  if(eror){
                      console.warn('获取文件stats失败');
                  }else{
                      var isFile = stats.isFile();//是文件
                      var isDir = stats.isDirectory();//是文件夹
                      if(isFile){
                          compressFn(filedir)
                      }
                      if(isDir){
                          fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                      }
                  }
              })
          });
      }
  });
}
fileDisplay('./assets/')