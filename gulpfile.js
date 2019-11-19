const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
sass.compiler = require('node-sass');
const sassPaths = ['./node_modules'];

// плгагин gulp-sass   перобразуем scss в css также можно наоборот css d scss
// параметр для компресии пердадем в функцию  outputStyle: 'compressed'
// ===== 3 ТАСКА
gulp.task('do_css', function() {
  return (
    gulp
      .src('./app/css/main.scss')
      .pipe(sourcemaps.init())
      // .pipe(sass({ includePaths: sassPaths }))
      .pipe(sass().on('error', sass.logError))
      .pipe(
        autoprefixer({
          browsersl: ['> 0.1%'],
          cascade: false,
        }),
      )
      // .pipe(gulp.dest('./dist/css'))
      .pipe(rename('min.css'))
      .pipe(
        cleanCSS({
          level: 2,
        }),
      )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream())
  );
});

gulp.task('imagemin', function() {
  return gulp
    .src('./app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});
// gulp.task('script', function() {
//   return gulp
//     .src([
//       // './node_modules/slick-carousel/slick/slick.min.js',
//       './app/js/main.js',
//     ])
//     .pipe(concat('script.js'))
//     .pipe(gulp.dest('./dist/js/'))
//     .pipe(
//       uglify({
//         toplevel: true,
//       }),
//     )
//     .pipe(rename('main.min.js'))
//     .pipe(gulp.dest('./dist/js'))
//     .pipe(browserSync.stream());
// });
// эта функцию можно убарать поставить с вотчере gulp.watch('./*.html').on('change', browserSync.reload); если нам не нужно делать чтото с .html

// function html() {
//   return gulp
//     .src('./index.html')
//     .pipe(gulp.dest('./dist/'))
//     .pipe(browserSync.stream());
// }

gulp.task('del', function() {
  return del(['./dist/*']);
});

// наш такс отслеживаем изменения в файл
// важно вотчер запускаем после всех билдов и сборок
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  //gulp.watch('./app/js/main.js', gulp.series('script'));
  gulp.watch('./app/css/*.scss', gulp.series('do_css'));
  // gulp.watch('./*.html', gulp.series(html));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch(['./app/css/*.scss', './app/js/*.js'], gulp.parallel('do_css'));
});
// важно запускаем после вотчера этот таck

// // =======собираем наши таски gulp scriptи do_css  и  в один таск
gulp.task('bild', gulp.series('del', gulp.parallel('do_css', 'imagemin')));
gulp.task('dev', gulp.series('bild', 'server'));

gulp.task('default', gulp.series('dev'));
