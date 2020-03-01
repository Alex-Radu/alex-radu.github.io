const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const cp = require('child_process');

sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./build/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets'))
        .pipe(connect.reload());
});

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
        livereload: true
    });

    done();
});

gulp.task('watch:md', (done) => {
    gulp.watch('./_posts/*.md', gulp.series('md'));
    done();
});

gulp.task('watch:sass', (done) => {
    gulp.watch('./build/*.scss', gulp.series('sass'));
    done();
});

gulp.task('default', gulp.parallel('connect', 'watch:md', 'watch:sass'));