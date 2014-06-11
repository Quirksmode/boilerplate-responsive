/************************
Gulp - Installation Instructions

To install Gulp globally:
$ npm install gulp -g

To install Gulp locally to project:
$ npm install gulp --save-dev

To install dependencies automatically (Requires up to data package.json):
$ npm install gulp --save-dev

To install dependencies manually (Ensure this list matches the plugins list below):
$ npm install gulp-compass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin gulp-clean gulp-concat gulp-notify gulp-cache gulp-livereload gulp-util tiny-lr gulp-combine-media-queries gulp-requirejs --save-dev
***********************/

// Load plugins
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    lr = require('tiny-lr'),
    cmq = require('gulp-combine-media-queries'),
    rjs = require('gulp-requirejs'),
    server = lr();

// Styles
gulp.task('styles', function() {
  return gulp.src('./src/scss/*.scss')
  .pipe(compass({
    //config_file: './src/config.rb',
    css: 'bin/css',
    sass: 'src/scss'
  }))
  .on('error', gutil.log)
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(cmq({ log: true })) // Combine the media queries
  .pipe(minifycss())
  .pipe(livereload(server))
  .pipe(gulp.dest('bin/css'))
  .pipe(notify({ message: 'Styles task complete' }));
});



/**
* scripts
**/
gulp.task('scripts', ['scripts-validate', 'scripts-requirejs', 'scripts-build']);

gulp.task('scripts-validate', function () {
  return gulp.src(['src/**/*.js', '!src/js/lib/*.js']) // Ignore the lib folder
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'Scripts Validated' }));
});

gulp.task('scripts-requirejs', function() {
    rjs({
        baseUrl: './src/js/',
        mainConfigFile: './src/js/common.js',
        out: 'main.js',
        name: 'common'
    })
    //.on('error', gutil.log)
    .pipe(notify({ message: 'RequireJS Build task complete' }));
});

gulp.task('scripts-build', function() {
  return gulp.src('src/js/**/*.js')
    //.pipe(gulp.dest('bin/js'))
    .pipe(uglify())
    .pipe(gulp.dest('bin/js'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Scripts Build task complete' }));
});


// Images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('bin/img'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Images task complete' }));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('bin/fonts'))
    .pipe(notify({ message: 'Fonts task complete' }));
});


// Clean - Deletes all the files before recompiling to ensure no unused files remain
gulp.task('clean', function() {
  return gulp.src(['bin/styles', 'bin/js', 'bin/images', 'bin/fonts'], {read: false})
    .pipe(clean());
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});


// Watch
gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

    // Watch .scss files
    gulp.watch('src/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/img/**/*', ['images']);

    // Watch image files
    gulp.watch('src/fonts/**/*', ['fonts']);

  });

});