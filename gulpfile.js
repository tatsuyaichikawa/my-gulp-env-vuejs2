var gulp         = require("gulp");
// css
var sass         = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var plumber      = require("gulp-plumber");
var sourcemaps   = require('gulp-sourcemaps');
// js
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
// liveload
var sync         = require('browser-sync').create();
var notify       = require('gulp-notify');


gulp.task('sass', function() {
  gulp.src('./src/*.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(autoprefixer({
          browsers: ['last 2 versions', 'ie >= 8', 'Android >= 4','ios_saf >= 8'],
          cascade: false
      }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('./dist'));
});

// js
gulp.task('build', function() {
    browserify({
        'entries': ['./src/main.js']
    })
        .bundle()
        .pipe(plumber())
        .pipe(source('./dist/app.js'))
        .pipe(gulp.dest('./'));
});

// BrowserSyncの設定
// ブラウザ画面への通知を無効化
gulp.task('sync', function() {
  sync.init({
    server: {
      baseDir: "./dist",
      notify: false
    }
  });
});

gulp.task('reload', function() {
  sync.reload();
});

gulp.task('watch', function() {
  gulp.watch("./src/*.scss",["sass"]);
  gulp.watch(["./src/*.js", "./src/*.vue"],["build"]);
});

gulp.task('default', ['sass', 'sync', 'build', 'reload', 'watch']);
