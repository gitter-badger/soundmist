'use strict'

var fs = require('fs')
var gulp = require('gulp')
var livereload = require('gulp-livereload')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var gutil = require('gulp-util')
var symlink = require('gulp-sym')

let out = '.tmp'
let structured = {
  base: '.'
}

gulp.task('vital', () => {
  gulp.src('package.json').pipe(gulp.dest(out))
})

gulp.task('symlinks', () => {
  if (!fs.existsSync(out + '/bower_components')) {
    gulp.src('bower_components').pipe(symlink(out + '/bower_components'))
  }

  if (!fs.existsSync(out + '/node_modules')) {
    gulp.src('node_modules').pipe(symlink(out + '/node_modules'))
  }
})

gulp.task('jade', () => {
  gulp.src(['index.jade', 'app/**/*.jade'], structured)
    .pipe(jade())
    .on('error', gutil.log)
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('scripts', () => {
  gulp.src(['main.js', 'auth.js', 'app/**/*.js'], structured)
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('sass', () => {
  gulp.src(['app/**/*.sass', 'app/**/*.scss'], structured)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app/style.css'))
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('media', () => {
  gulp.src(['app/media/**/*'], structured)
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('watch', () => {
  livereload.listen()

  gulp.watch('package.json', ['vital'])
  gulp.watch(['index.jade', 'app/**/*.jade'], ['jade'])
  gulp.watch(['main.js', 'auth.js', 'app/**/*.js'], ['scripts'])
  gulp.watch(['app/**/*.sass', 'app/**/*.scss'], ['sass'])
  gulp.watch(['app/media/**/*'], ['media'])
});

gulp.task('start', () => {
  gulp.start('symlinks', 'vital', 'jade', 'sass', 'scripts', 'media')
})
