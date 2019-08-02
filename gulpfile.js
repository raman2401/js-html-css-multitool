var gulp = require('gulp');
var jshint = require('gulp-jshint');
var terser = require('gulp-terser');
var stylish = require('jshint-stylish');
var pump = require('pump');
var util = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

// check syntax errors and warnings
gulp.task('QC-js', function () {
	gulp.src(['./**/*.js', '!./node_modules/**/*.js', '!./notify/**/*.js', '!minified-js/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});


//minify javascript files 
gulp.task('minify-js', function (callback) {
	pump([
		gulp.src(['./**/*.js', '!./node_modules/**/*.js', '!./notify/**/*.js', '!minified-js/**/*.js']),
		terser({ mangle: false }).on('error', util.log),
		gulp.dest('./minified-js')
	],
		callback
	);
});

// minify javascript files and uglify 
gulp.task('uglify-js', function (callback) {
	pump([
		gulp.src(['./**/*.js', '!./node_modules/**/*.js', '!./notify/**/*.js', '!minified-js/**/*.js']),
		terser({ mangle: true }).on('error', util.log),
		gulp.dest('./minified-js')
	],
		callback
	);
});

// minify CSS files 
gulp.task('minify-css', function (callback) {
	pump([
		gulp.src('./**/*.css', '!./node_modules/**/*.css', '!minified-css/**/*.css'),
		sourcemaps.init(),
		cleanCSS({ compatibility: 'ie8' }, function (details) {
			console.log(`${details.name}: ${details.stats.originalSize}`);
			console.log(`${details.name}: ${details.stats.minifiedSize}`);
		}),
		sourcemaps.write('./maps', { addComment: false }),
		gulp.dest('minified-css')
	],
		callback
	);
});
