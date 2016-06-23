var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade');

let out = './dist'
let structured = {
  base: '.'
};

gulp.task('vital', () => {
  gulp.src('package.json').pipe(gulp.dest(out))
})

gulp.task('jade', () => {
  gulp.src('./**/*.jade', structured)
    .pipe(jade())
    .pipe(gulp.dest(out))
    .pipe(livereload());
})

gulp.task('scripts', () => {
  gulp.src(['main.js', 'scripts/**/*.js'], structured)
    .pipe(gulp.dest(out))
    .pipe(livereload())
})

gulp.task('watch', () => {
  livereload.listen();

  gulp.watch('package.json', ['vital'])
  gulp.watch('./**/*.jade', ['jade']);
  gulp.watch(['main.js', 'scripts/**/*.js'], ['scripts']);
});

gulp.task('start', () => {
  gulp.start('vital', 'jade', 'scripts');
})
