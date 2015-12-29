var gulp = require("gulp"),
    sass = require("gulp-sass"),
    bourbon = require('node-bourbon');


// SASS Related tasks

gulp.task("sass:compile", function () {

    var outputStyle = "compressed"; // "nested" | "compact" | "compressed" | "expanded"

    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({
          outputStyle: outputStyle,
          includePaths: bourbon.includePaths
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task("sass:watch", function () {

    gulp.watch('./src/sass/main.scss', ["sass:compile"]);

    // gutil.log("[watch:sass]", gutil.colors.yellow("Watching SASS files..."));

});

// Common tasks

gulp.task("watch", ["sass:watch"]);
gulp.task("sass", ["sass:compile"]);
