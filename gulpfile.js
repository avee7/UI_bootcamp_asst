var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    watch = require('gulp-watch'),
    neat = require('node-neat').includePaths,
    normalize = require('node-normalize-scss').includePaths,
    csslint = require('gulp-csslint'),
    gutil = require('gulp-util');

gulp.task('clean', function (cb) {
    return del([
        './public/**/*'
    ]);
});

gulp.task('css', function () {
    gulp.src('src/sass/*.scss')
        .pipe(plumber(''))
        .pipe(autoprefixer())
        .pipe(sass({
            includePaths: ['styles'].concat(neat).concat(normalize)
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('src/jade/*.jade')
        .pipe(plumber(''))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload());
});


gulp.task('assets', function() {
    gulp.src(['src/assets/**/*'])
        .pipe(plumber(''))
        .pipe(gulp.dest('./public/assets/'))
        .pipe(connect.reload());
});

// csslint.addRule({
    // rule information
// });

var customReporter = function(file) {
  gutil.log(gutil.colors.cyan(file.csslint.errorCount)+' errors');

  file.csslint.results.forEach(function(result) {
    gutil.log(gutil.colors.cyan(result.error.message)+' on line '+ gutil.colors.magenta(result.error.line));
  });
};

gulp.task('lint', function() {
  gulp.src('./public/css/main.css')
    .pipe(csslint())
    .pipe(csslint.reporter(customReporter));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*', ['css']);
  gulp.watch('src/assets/*', ['assets']);
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('./public/css/main.css', ['lint']);
  watch('./public/**/*').pipe(connect.reload());
});

gulp.task('serve', ['build'], function() {
  connect.server({
    root: 'public',
    livereload: true,
    port: 3100
  });
});

gulp.task('deploy', function () {
    gulp.src(['./public/**/*', './public/*'])
       .pipe(gulp.dest('./'));
});

gulp.task('build', ['clean', 'html', 'css', 'assets']);

gulp.task('default', ['serve', 'watch']);
