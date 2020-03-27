const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cp = require('child_process');

const { watch } = require('gulp');

sass.compiler = require('node-sass');

gulp.task('sass', () => gulp.src('./src/styles/index.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('styles.css'))
  .pipe(gulp.dest('./assets'))
  .pipe(connect.reload()));

gulp.task('md', (done) => {
  cp.exec('npm run clean && npm run build:content', () => {
    gulp.src(['./**/*.html', './assets/*.css'], { read: false })
      .on('finish', done)
      .pipe(connect.reload());
  });
});

gulp.task('connect', (done) => {
  connect.server({
    root: './',
    livereload: true,
  });

  done();
});

gulp.task('watch:md', (done) => {
  watch(['./_posts/*.md', './src/templates/*.mustache', './src/scripts/*.js'], gulp.series('md'));
  done();
});

gulp.task('watch:sass', (done) => {
  watch('./src/styles/**/*.scss', gulp.series('sass'));
  done();
});

gulp.task('default', gulp.parallel('connect', 'watch:md', 'watch:sass'));
