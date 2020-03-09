---
title: Improving the Looks and the Dev environment
summary: In this post I talk about how to set up some nice Gulp tasks that will help speed up development and also about my favourite SCSS feature
tags: gulp, scss
---
# Improving the Looks and the Dev environment

So now that I am generating all the pages, I am noticing some things that need urgent attention:

* it's very annoying to manually run the `npm run build` command everytime I change something in the source files
* the pages look ugly - this happens in the absence of CSS

## Setting up a better Dev environment
For this, I want to make use of <a href="https://gulpjs.com" class="trippy" target="_blank">Gulp</a> which, according to their description, is:

>a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something

And this sounds great. As far as the tasks I want to define, I'm thinking about the following:

* I want to have a webserver with live reload when different files are changed
* I want to compile my `.scss` files into `.css` ones (oh yeah, I'll use <a href="https://sass-lang.com/" class="trippy" target="_blank">SCSS</a> to write the styles, because it's awesome)

I'll just slap what I wrote to fulfill these wishes and I'll add some comments:

```js
const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const cp = require('child_process');

sass.compiler = require('node-sass');

/* A task that takes all the .scss files from a folder, compiles them into .css and puts them in a
different folder */
gulp.task('sass', () => {
    return gulp.src('./build/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets'))
        .pipe(connect.reload());
});

/* A task that runs the build command as a shell command, looks at the newly generated .html files
and sends this information to the utility that refreshes the browser */
gulp.task('md', (done) => {
    cp.exec('npm run clean && npm run build:content', () => {
        gulp.src(['./**/*.html'], { read: false })
            .on('finish', done)
            .pipe(connect.reload());
    });
});

/* Task that runs the server */
gulp.task('connect', (done) => {
    connect.server({
        root: './',
        livereload: true
    });

    done();
});

/* Watch tasks that look at certain files and if they change, it runs a specific task*/

gulp.task('watch:md', (done) => {
    gulp.watch('./posts/*.md', gulp.series('md'));
    done();
});

gulp.task('watch:sass', (done) => {
    gulp.watch('./build/*.scss', gulp.series('sass'));
    done();
});

/* Everything in one go*/
gulp.task('default', gulp.parallel('connect', 'watch:md', 'watch:sass'));
```

## Making things beautiful

Here, things depend on preferences and taste so there won't be step by step instructions. I'm using <a href="https://prismjs.com" class="trippy" target="_blank">PrismJS</a> for adding styles to the code blocks. And, as previously mentioned, I use SCSS(SASS) for writting the styles. It has a lot of nice things for which I prefer it, but for the moment, the most important one is the ability to nest rules. Like so:

```css
html {
    font-size: 16px;

    body {
        color: black;

        p {
            margin: 0 32px;

            &:hover {
                color: red;
            }
        }
    }
}
```

I find this more readable and easier to maintain than the plain CSS version:

```css
html {
    font-size: 16px;
}

html body {
    color: black;
}

html body p {
    margin: 0 32px;
}

html body p:hover {
    color: red;
}
```

This is it for now. See you next time! 😁