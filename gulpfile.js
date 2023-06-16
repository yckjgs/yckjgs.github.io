//获取gulp对象
const gulp = require("gulp")
const uglify = require("gulp-uglify")
const minifyCss = require("gulp-minify-css")
const imagemin = require('gulp-imagemin')
const minifyHtml = require('gulp-minify-html')

// 定义压缩文件的处理方法
function script(){
	//压缩js文件
	gulp.src('yckjgs/js/*.js').pipe(uglify()).pipe(gulp.dest('dist/js'))
	
	//压缩css文件
	gulp.src('yckjgs/css/*.css').pipe(minifyCss()).pipe(gulp.dest('dist/css'))
	
	//压缩图片文件
	gulp.src('yckjgs/images/*.*').pipe(gulp.dest('dist/images'))
	
	//移动font文件
	gulp.src(['yckjgs/font/*'],{allowEmpty: true}).pipe(gulp.dest('dist/font'));
	
	//压缩html文件
	var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        minifyJS: true,//压缩js
        minifyCSS: true//压缩css
    };
    gulp.src('yckjgs/*.html')
        .pipe(minifyHtml(options))
        .pipe(gulp.dest('dist/'))
}
//创建监听js文件的方法
function autoScript(){
	// 创建监听对象
	var watcher = gulp.watch("yckjgs/*.*");
	//分别监听 change,add,unlink事件
	watcher.on("change",function(path,stats){
	   console.log(`${path} has been changed!`);
	});
	watcher.on("add",function(path,stats){
	   console.log(`${path} has been add!`);
	});
	watcher.on("unlink",function(path,stats){
	   console.log(`${path} has been unlink!`);
	})
}
//将定义好的压缩方法暴露给外界，并作为gulp的默认值
exports.autoScript = gulp.parallel(script,autoScript);