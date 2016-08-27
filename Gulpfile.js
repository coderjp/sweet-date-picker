var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'), //Pipe CSS through several processors, but parse CSS only once.
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('js', function () {
    gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(rename('sweet-date-picker.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('css', function () {
    gulp.src('./src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['js', 'css'], function() {

});


gulp.task('watch',function() {
    gulp.watch('./src/*.scss',['css']);
    gulp.watch('./src/*.js',['js']);
});