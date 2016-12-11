var gulp = require('gulp');
var gulpif = require('gulp-if');
var args = require('yargs').argv;

var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var del = require('del');

var src = 'src';
var dist = 'dist';

var tsProject = typescript.createProject('tsconfig.json');

gulp.task("build-ts", () => {
    var tsResult = gulp.src(src + '/app/**/*.ts').pipe(sourcemaps.init()).pipe(typescript(tsProject));
    return tsResult.js.pipe(sourcemaps.write(".")).pipe(gulp.dest(dist + '/app'));
});

gulp.task('build-copy', function () {
    return gulp.src([src + "/**/*", "!**/*.ts"]).pipe(gulp.dest(dist + '/'));
    // gulp.src([src + '/app/**/*.html', src + '/app/**/*.htm', src + '/app/**/*.css']).pipe(gulp.dest(dist + '/app'));
    // gulp.src([src + '/index.html']).pipe(gulp.dest(dist + '/'));
    // gulp.src([src + '/systemjs.config.js']).pipe(gulp.dest(dist + '/'));
});

// gulp.task('clean', function () {
//     return del([dist + '/**/*.html', dist + '/**/*.htm', dist + '/**/*.css'], dist + '/app');
// });
gulp.task('clean', (cb) => {
    return del([dist], cb);
});

gulp.task("vendor", () => {
    return gulp.src([
            'core-js/**',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/**',
            '@angular/**',
            '@types/**',
            'bootstrap/**',
            'moment/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(dist + '/vendor'));
});

gulp.task('watch', function () {
    gulp.watch(src + '/**/*.ts', ['build-ts']);
    gulp.watch(src + '/**/*.{html,htm,css}', ['build-copy']);
});

gulp.task('build', ['build-ts', 'build-copy']);
gulp.task('default', ['build', 'watch']);