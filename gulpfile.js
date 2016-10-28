/******
gulp.task('task-name', function() {
console.log('hello');
});
********/


var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

/*****
To do
Set up and try livereload / notify

Look for more plugins
******/
var notify = require('gulp-notify');
var liveReload = require('gulp-livereload');

gulp.task('sass', function(){
  return gulp.src('food-blog/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('food-blog/stylesheets'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('food-blog/scss/**/*.scss', ['sass']);
  gulp.watch('food-blog/**/*.html', browserSync.reload);
  gulp.watch('food-blog/scripts/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'food-blog'
    },
  })
})
