'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    // cssnano = require('gulp-cssnano'),
    // rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    debug = require('gulp-debug'),
    rigger = require('gulp-rigger'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    runSequence = require('run-sequence'),
    cache = require('gulp-cached'),
    newer = require('gulp-newer'),
    browserSync = require('browser-sync');


    // var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// Static server
gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });

    //gulp.watch('frontend/assets/*.html', browserSync.reload);
    // gulp.watch('frontend/**/*.scss', browserSync.reload);

    // gulp.watch("frontend/sass/*.scss", ['styles']);
    //  gulp.watch("public/*.html").on('change', browserSync.reload);
});


// tasks

// gulp.task('hello', function(callback) {
// 	console.log('Welcome!');
// 	callback();
// });



// styles
gulp.task('styles', function () {
  return gulp.src('frontend/sass/main.scss')
    .pipe(plumber({
    	errorHandler: notify.onError(function(err) {
    		return {
    		title: 'styles',
    		message: err.message
    	};
       })
    }))
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'src'}))
    // .pipe(cached('styles'))
    .pipe(sass())
    .pipe(debug({title: 'sass'}))
    .pipe(sourcemaps.write('.'))
    // .pipe(cssnano())
    // .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/styles/'))
    .pipe(browserSync.stream());
});


// // clean
 gulp.task('clean', function() {
  return del('public');
});

// assets
gulp.task('assets', function () {
 return gulp.src('frontend/assets/**')
            // .pipe(newer('public/assets'))
            .pipe(debug({title: 'src'}))
            .pipe(gulp.dest('public'))
           .pipe(browserSync.stream());

});
// js
gulp.task('js', function() {
  return gulp.src('frontend/js/main.js')
             .pipe(rigger())
             .pipe(gulp.dest('public/js'))
             .pipe(browserSync.stream());
});

//img
gulp.task("img", function() {
    gulp.src('frontend/img/*.*')
        .pipe(gulp.dest('public/img'));
});


// build
gulp.task('build', function(callback) {
  runSequence('clean',
              ['styles', 'js', 'img'],
              'assets',
              callback);
});

// watch
gulp.task('watch', function () {
    gulp.watch('frontend/sass/**/*.*', ['styles']);
     gulp.watch('frontend/assets/**/*.*', ['assets']);
    // gulp.watch('frontend/img/**/*.*', ['img']);
    gulp.watch('frontend/js/**/*.*', ['js']);

});

// dev
gulp.task('dev', ['sync', 'build', 'watch']);
