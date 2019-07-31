var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-terser');
var stylish = require('jshint-stylish');
var pump = require('pump');
var util = require('gulp-util');
var changed = require('gulp-changed');



var uglifyjs = require('uglify-js'); // can be a git checkout
                                     // or another module (such as `uglify-es` for ES6 support)
var composer = require('gulp-uglify/composer');
var pump = require('pump');

var minify = composer(uglifyjs, console);



gulp.task('Jshint-CodeQuality', function() {
	gulp.src(['./**/*.js', '!./node_modules/**/*.js'])
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish))
});


gulp.task('Uglify-js', function(callback) {
	pump([
		gulp.src(['./**/*.js', '!./node_modules/**/*.js']),
		uglify({mangle: false}).on('error', util.log),
		gulp.dest('./minified-js')
    ],
    callback
    );
});

gulp.task('ChangedUglify', function(callback) {
	pump([
		gulp.src(['./**/*.js', '!./node_modules/**/*.js']),
		changed('./minified-js'),
		uglify({mangle: false}).on('error', util.log),
		gulp.dest('./minified-js')
		],
		callback
		);
})

gulp.task('compress', function (cb) {
  var options = {};
  pump([
    gulp.src(['./**/*.js', '!./node_modules/**/*.js','!./node_modules/**/fcmmain.js']),
      minify(options),
      gulp.dest('../minifiedjs')
    ],
    cb
  );
});
