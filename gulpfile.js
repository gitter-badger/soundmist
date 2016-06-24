var gulp = require('gulp')
var livereload = require('gulp-livereload')
var jade = require('gulp-jade')
var sass = require('gulp-sass')

let out = './dist'
let structured = {
  base: '.'
}

gulp.task('vital', () => {
  gulp.src('package.json').pipe(gulp.dest(out))
})

gulp.task('jade', () => {
  gulp.src('./**/*.jade', structured)
    .pipe(jade())
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('scripts', () => {
  gulp.src(['main.js', 'scripts/**/*.js'], structured)
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('sass', () => {
  gulp.src(['styles/**/*.sass', 'styles/**/*.scss'], structured)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('watch', () => {
  livereload.listen()

  gulp.watch('package.json', ['vital'])
  gulp.watch('./**/*.jade', ['jade'])
  gulp.watch(['main.js', 'scripts/**/*.js'], ['scripts'])
  gulp.watch(['styles/**/*.sass', 'styles/**/*.scss'], ['sass'])
});

gulp.task('start', () => {
  gulp.start('vital', 'jade', 'sass', 'scripts')
})
