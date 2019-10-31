const gulp = require('gulp'),
    gutil = require('gulp-util'),                 // Утилиты для Gulp плагинов
    plumber = require('gulp-plumber'),            // Обработчик ошибок сборщика
    path = require('path'),                       // Утилита для работы с путями
    less = require('gulp-less'),                  // Компилятор LESS
    watchLess = require('gulp-watch-less'),       // Наблюдатель за всеми includa'ми в файле
    concat = require('gulp-concat'),              // объединяет файлы в один бандл
    rename = require('gulp-rename');              // Переименовывает
    browserSync = require('browser-sync');           //Синхронизация с браузером

let task_env = "dev"; // Идентификатор цели запуска задачи (dev - для наблюдателей, prod - для финального билда)

const postcss = require('gulp-postcss');

const postcss_processors = [
    require('postcss-cssnext')(['> 0.5%', 'last 10 versions']),
];

// LESS
const cssPath = 'app/css/';
const lessPath = path.join(cssPath, 'less');        // Папка с LESS файлами
const mainLess = path.join(lessPath, 'style.less'); // Имя главного LESS файла проекта
const css_file = 'result_style.css';           // Имя полученного файла


const lessConfig = {
    paths: [
        lessPath,
        path.join(lessPath, 'modules'),
        path.join(lessPath, 'includes')
    ],
};

//JS
const jsPath = 'app/js/';                        // Папка с JS файлами
const jsFiles = [                               // Исходные JS файлы
    'script.js'
];

const onError = function (err) {
    gutil.beep();
    console.log(err);
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
});

gulp.task('watch', ['browser-sync'], function(){                       // Наблюдает за файлами LESS и JS
    watchLess(mainLess, {
        name: 'LESS'
    })
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less(lessConfig))
        .pipe(rename(css_file))
        .pipe(gulp.dest(cssPath))
        .pipe(postcss(postcss_processors))
        .pipe(plumber.stop())
        //.pipe(gulp.dest(cssPath));

    gulp.watch(jsFiles, {cwd: jsPath});
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/css/*.css', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('less', function(){
    return gulp.src(mainLess)
        .pipe(less(lessConfig))
        .pipe(rename(css_file))
        .pipe(gulp.dest(cssPath));

});

gulp.task('postcss', ['less'], function () {


    return gulp.src(css_file)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(postcss(postcss_processors))
        .pipe(plumber.stop())
        .pipe(gulp.dest(cssPath));



});

gulp.task('production', function(){
    task_env = 'prod';
});


gulp.task('build', ['production','postcss']);

