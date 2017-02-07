var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'), //Pipe CSS through several processors, but parse CSS only once.
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    wrap = require('gulp-wrap');

// Sass
gulp.task('sass', function () {
    gulp.src('./src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
        .pipe(gulp.dest('./dist'));
});

// Compile ES5
gulp.task('commonjs', function () {
   gulp.src('./src/sweet-date-picker.es6.js')
       .pipe(babel())
       .pipe(rename('sweet-date-picker.js'))
       .pipe(gulp.dest('lib'));

    gulp.src('./src/modules/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib/modules'));
});


gulp.task('scripts', function () {
    return browserify({
        entries: './src/sweet-date-picker.es6.js',
        debug: true
    })
       .transform(babelify)
       .bundle()
        .pipe(source('sweet-date-picker-dev.js'))
        .pipe(wrap({
            src: './src/gulpfile-wrap-template.js'
        }))
        .pipe(gulp.dest('dist')) // Dev Version

        .pipe(rename('sweet-date-picker.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist')); // User version
});

gulp.task('default', ['scripts', 'commonjs', 'sass'], function() {

});

gulp.task('watch',function() {
    gulp.watch('./src/*.scss',['sass']);
    gulp.watch('./src/*.js',['scripts', 'commonjs']);
});