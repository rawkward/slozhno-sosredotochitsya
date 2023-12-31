const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const build = gulp.series(clean, gulp.parallel(html, css, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

function html() {
  return gulp.src('./**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src('./**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('./images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('./fonts/**/*.{woff,woff2,ttf}')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['./**/*.html'], html);
  gulp.watch(['./blocks/**/*.css'], css);
  gulp.watch(['./images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

exports.css = css;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watchapp = watchapp;

exports.default = watchapp;