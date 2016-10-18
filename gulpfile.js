/******
gulp.task('task-name', function() {
 things go here eg console.log('hello');
});
********/


var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var stylelint = require('stylelint');
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

var stylelint   = require('stylelint');

gulp.task("css-lint", function() {

  // Stylelint config rules
  var stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "double",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "never",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "rule-no-duplicate-properties": true,
      "declaration-block-no-single-line": true,
      "rule-trailing-semicolon": "always",
      "selector-list-comma-space-before": "never",
      "selector-list-comma-newline-after": "always",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  }

  var processors = [
    stylelint(stylelintConfig),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
      // Stylesheet source:
      ['app/assets/css/**/*.scss']
    )
    .pipe(postcss(processors, {syntax: syntax_scss}));
});
