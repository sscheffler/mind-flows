/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util')
    ;


var tasks = {
    babel: 'babel',
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
 * default start task
 */
gulp.task(tasks.default, function (callback) {
    gutil.log('default gulp task!');
});