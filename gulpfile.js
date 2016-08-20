/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    gutil = require('gulp-util'),
    path = require('path'),
    ts = require('gulp-typescript'),
    notify = require('gulp-notify'),
    runSequence = require('run-sequence'),
    del = require('del'),
    spawn = require('child_process').spawn,
    node
    ;

var paths = {
    p: ['server/**/*.js'],
    server: 'server',
    client: 'client',
    dist: 'dist',
    tsConfig: './tsconfig.json',
    compassConfig: './config.rb',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'p')
};


var tasks = {
    babel: 'babel',
    build: 'build',
    node: 'node',
    clean: 'clean',
    default: 'default',
    jshint: 'jshint',
    transpile: 'transpile',
    moveFiles: 'move-files',
    help: 'help',
    watch: 'watch',
    compass: 'compass',
    inject: 'inject',
    pug: 'pug',
    browserSync: 'browser-sync'
};

/**
 * clean up generation folder
 */
gulp.task(tasks.clean, function () {
    gutil.log("Cleanup 'dist' folder");
    return del([paths.dist]);
});

var baseTranspileFiles = ['./app.ts', 'server/**/*.ts'];
gulp.task(tasks.transpile, function () {
    gutil.log('Transpiling typescript files');
    var tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(baseTranspileFiles, {base: './'})
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject)) // from typescript to ES6
        .pipe(babel()) // from ES6 to ES5
        .pipe(sourcemaps.write())
        .on('error', handleError)
        .pipe(gulp.dest(paths.dist));
});

gulp.task(tasks.moveFiles, function () {
    var node = 'node_modules/';
    gulp.src([
        node+'**/*.*'
    ], {base: './'})
        .pipe(gulp.dest(paths.dist));
});

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task(tasks.node, function () {
    if (node) {
        gutil.log('Killing node!');
        node.kill();
    }
    node = spawn('node', [paths.dist + '/app.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gutil.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task(tasks.build, function () {
    gutil.log('Building environment');
    runSequence(
        tasks.clean,
        tasks.moveFiles,
        tasks.transpile);
});


/**
 * default task - builds the environment: mainly for calling in bluemix
 */
gulp.task(tasks.default, function () {
    // runSequence();
});

//---------------------privates----------------------------

function handleError(error) {
    gutil.log(error.toString());
    notify(error.toString());
}