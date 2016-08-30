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
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
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
 * inject files in client/index.html
 *
 * bower_components
 */
gulp.task(tasks.inject, function () {
    var cssSrc = gulp.src([paths.dist + '/' + paths.client + '/css/**/*.css'], {read: false});
    var bowerSrc = gulp.src(bower({
        overrides: {
            'font-awesome': {
                main: ['./css/font-awesome.min.css']
            }
        }
    }), {read: false});
    return gulp.src(paths.client + '/index.html', {base: './'})
        .pipe(inject(cssSrc, {ignorePath: 'client'}))
        .pipe(inject(bowerSrc, {name: 'bower', relative: true}))
        .pipe(paths.client);
});

/**
 * transform pug templates
 */
gulp.task(tasks.pug, function () {
    return gulp.src([paths.client + '/**/*.pug'], {base: './'})
        .pipe(pug())
        .on('error', handleError)
        .pipe(gulp.dest('./'));
});

/**
 * clean up generation folder
 */
gulp.task(tasks.clean, function () {
    gutil.log("Cleanup 'dist' folder");
    return del([paths.dist]);
});

var baseTranspileFiles = ['./app.ts', 'server/**/*.ts', 'model/model.ts'];
var baseBrowserSyncFiles = ['./app.js', 'server/**/*.js', 'model/model.js'];
gulp.task(tasks.transpile, function () {
    gutil.log('Transpiling typescript files');
    var tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(baseTranspileFiles, {base: './'})
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject)) // from typescript to ES6
        .pipe(babel()) // from ES6 to ES5
        .pipe(sourcemaps.write())
        .on('error', handleError)
        .pipe(gulp.dest('./'));
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
    node = spawn('node', ['./app.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gutil.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task(tasks.build, function () {
    gutil.log('Building environment');
    runSequence(
        tasks.transpile,
        tasks.inject
    );
});

gulp.task(tasks.watch, function () {
    gulp.watch(baseTranspileFiles, [tasks.transpile]);
    gulp.watch([paths.client + '/**/*.pug'],[tasks.pug]);
});

gulp.task(tasks.browserSync,[] , function () {
    var files = [
        paths.dist + '/**/*'
    ];

    browserSync.init(null, {
        proxy: "http://localhost:6001",
        files: files,
        browser: "firefox",
        port: 6002
    });

    // Watch any files in dist/, reload on change
    /*gulp.watch(baseBrowserSyncFiles)
        .on('change', browserSync.reload);*/
    gulp.watch(baseBrowserSyncFiles)
        .on('change', function(){ gulp.run(tasks.node) });
    gulp.watch([paths.client + '/**/*.html'])
        .on('change', browserSync.reload);
});


/**
 * default task - builds the environment: mainly for calling in bluemix
 */
gulp.task(tasks.default, function () {
    runSequence(tasks.watch, tasks.browserSync);
});

//---------------------privates----------------------------

function handleError(error) {
    gutil.log(error.toString());
    notify(error.toString());
}