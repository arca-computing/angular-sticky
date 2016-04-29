var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var replace = require('gulp-replace');
var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence');

gulp.task('lint-app', function () {
    return gulp.src('./angular-sticky.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('uglify', ['lint-app'], function () {
    return gulp.src('./angular-sticky.js')
        .pipe(uglify())
        .pipe(rename('angular-sticky.min.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('version', function(){
    if(argv.newVersion) {
        gulp.src(['package.json'])
            .pipe(replace(/("version": ")(.*)(")/, '$1' + argv.newVersion + "$3"))
            .pipe(gulp.dest('.'));
        gulp.src(['angular-sticky.js'])
            .pipe(replace(/(@version )(.*)/, '$1' + argv.newVersion))
            .pipe(gulp.dest('.'));
        gulp.src(['README.md'])
            .pipe(replace(/(current version : )(.*)/, '$1' + argv.newVersion))
            .pipe(gulp.dest('.'));
    }
});

/******* GIT ******/
gulp.task('tag', function(){
    git.tag(argv.newVersion, 'release: ' + argv.newVersion, function (err) {
        if (err) throw err;
    });
});

gulp.task('commit', function(){
    return gulp.src('.')
        .pipe(git.commit('release: ' + argv.newVersion, {args: '-a'}));
});

gulp.task('push', function(){
    git.push('origin', 'master', {args: "--follow-tags"}, function (err) {
        if (err) throw err;
    });
});

gulp.task('create-and-push-release', function(){
    if(!argv.newVersion){
        throw new Error('Need a version to tag, use --new-version=YOUR_VERSION');
    }
    runSequence('version', 'commit', 'tag', 'push');
});

/******* COMMAND LINE TASKS ******/
gulp.task('default', ['uglify']);
gulp.task('release', ['create-and-push-release', 'uglify']);