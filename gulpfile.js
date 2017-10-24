var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require("gulp-rename")
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('gulp-cssnano')

gulp.task('watch', function() {
  gulp.watch('src/**', ['build:style', 'build:src'])
})

gulp.task('build:style', function() {
  gulp
    .src(['src/pages/**/*.scss'], { base: 'src' })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(cssnano({
      autoprefixer: false,
      discardComments: { removeAll: true }
    }))
    .pipe(rename(function (path) {
      path.extname = ".wxss"
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('build:src', function() {
  gulp
    .src(
      [
        'src/app.js',
        'src/app.json',
        'src/app.wxss',
        'src/pages/**',
        '!src/pages/**/*.wxss',
        'src/utils/**'
      ],
      { base: 'src' }
    )
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['watch', 'build:src', 'build:style'])