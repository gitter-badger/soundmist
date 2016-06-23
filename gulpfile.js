var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade');

let structured = {base: '.'};

gulp.task('jade', function() {
  gulp.src('./**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
})

gulp.task('scripts', function() {
  gulp.src(['main.js', 'scripts/**/*.js'], structured)
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload())
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./**/*.jade', ['jade']);
  gulp.watch(['main.js', 'scripts/**/*.js'], ['scripts']);
});
