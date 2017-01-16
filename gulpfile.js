
  //引入gulp
 var gulp = require("gulp"); //安装 npm install gulp --save-dev   全局安装 （npm install gulp -g）
  //引入gulp-sass  css编译插件
 var sass = require("gulp-sass"); //安装 npm install gulp-sass --save-dev
  //引入gulp-less  css编译插件
 var less = require("gulp-less");//安装 npm install gulp-less --save-dev
 //引入gulp-concat 合并插件
 var concat = require("gulp-concat"); //安装 npm  install gulp-concat --save-dev
 //引入gulp-uglify 压缩插件
 var uglify = require("gulp-uglify"); //安装 npm  install gulp-uglify --save-dev
 //引入gulp-rename 重命名
 var rename = require("gulp-rename"); //安装 npm  install gulp-rename --save-dev
 //引入gulp-minify-css 专压css
 var minifyCSS = require("gulp-minify-css"); //安装 npm  install gulp-minify-css --save-dev 
 //引入gulp-imagemin 压缩图片
 var imagemin = require("gulp-imagemin"); //安装 npm  install gulp-imagemin --save-dev 
 //引入服务器
 var  connect =require("gulp-connect"); //安转 npm install gulp-connect --save-dev
 gulp.task("server",function(){
      connect.server({
        root:'dist', //服务器访问的目录
        livereload:true //浏览器时实刷新
      });
 })  

  // 测试gulp的安装成功与否task添加任务
  // gulp.task("hello",function(){
  // 	console.log("你好我输出了");
  // })
  // gulp.task("basic",["hello"]);  //命令执行 gulp basic

  gulp.task("copy-index",function(){
  //src 拿到文件   复制到 pipe 管道   dest是一个方法 复制到dist文件夹里面
  //connect.reload() 变化时刷新
        return   gulp.src('index.html').pipe(gulp.dest('dist')).pipe(connect.reload()); 

  })

  //gulp.src (就是找到要复制的文件目录)    pipe(gulp.dest（要把复制的文件放在想要放置的文件里面）)
  gulp.task("images", function() {
      //return gulp.src("images/*").pipe(gulp.dest("dist/images"));
      //images 目录下的 {png,jpg}
      //return gulp.src("images/*.{png,jpg}").pipe(gulp.dest("dist/images"));
      //  /*一级目录   /*/*  一级二级目录下的文件 类推下去
      return gulp.src("images/*/*")
      .pipe(imagemin())//压缩图片
      .pipe(gulp.dest("dist/images"));
  });


  gulp.task("data",function(){
      //  !json/secret-*.json  前面加个！就是排除掉后面的文件
      return gulp.src(['xml/*.xml','json/*.json','!json/secret-*.json']).pipe(gulp.dest("dist/data"));
  })

  //建立统一执行(依赖的任务同时执行，然后再执行console.log())
  gulp.task("build",["copy-index","images","data"],function(){
     console.log("编译成功");
  })

  
  //监听文件 gulp watch() 当发生变化的时候就会同步执行 
  gulp.task('watch',function(){
     gulp.watch('index.html',['copy-index']);
     gulp.watch('images/*/*',['images']);
     gulp.watch('xml/*.xml','json/*.json','!json/secret-*.json',['data']);

  })


 // gulp 插件地址 gulpjs.com/plugins   css插件gulp-sass  把sass编译成css
  gulp.task("sass",function(){
     //sass(); 调用sass编译
    return gulp.src("stylesheets/**/*.scss").pipe(sass()).pipe(gulp.dest("dist/css"));

  })

 //gulp-less插件
 gulp.task("less",function(){
    return gulp.src("stylesheets/**/*.less")
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest("dist/css"));
 })

 //gulp-concat合并 压缩 重命名
 gulp.task("scripts",function(){
 //把jquery.js和index.js合并成vendor.js 并且放在dist/js目录下
    return gulp.src(['javascript/jquery.js','javascript/index.js'])
    .pipe(concat('vendor.js'))//合并
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify()) //压缩
    .pipe(rename('vendor.min.js'))//压缩后重命名min
    .pipe(gulp.dest("dist/js"));
 })

 //数据同步执行  实时刷新浏览器 的数据 
 gulp.task("default",['server','watch']);


