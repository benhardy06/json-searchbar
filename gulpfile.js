var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync');
    del = require('del');
    rename = require('gulp-rename');
    plumber = require('gulp-plumber')
    reload = browserSync.reload


//minify and watch for script changes
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}


gulp.task('scripts', function(){
    var scriptsPath = "app/js"
    var folders = getFolders(scriptsPath);
    var minify = folders.map(function(folder){
    gulp.src(['app/js/'+folder+'/*.js', '!app/js/'+folder+'/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js/'+folder))
    .pipe(reload({stream:true}))
    })
})


gulp.task('watch', function(){
    var scriptsPath = "app/js"
    var pagesPath = "app/pages"
    var scripts = getFolders(scriptsPath);
    var pages = getFolders(pagesPath)
    scripts.map(function(folder){
       gulp.watch(['app/js/'+folder+'/*.js', 'app/js/app.js'], ['scripts']) 
    })
       gulp.watch(['app/pages/*.html', 'app/index.html'], ['html'])
   
    
})

//browser-sync

gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir:'./app/'
        }
        
    })
})

//watch for html changes
gulp.task('html', function(){
    gulp.src(['app/pages/*.html', 'app/index.html'], ['html'])
    .pipe(reload({stream:true}))
})

gulp.task('default', ['scripts', 'html', 'browser-sync', 'watch'])