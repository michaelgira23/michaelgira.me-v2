'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

// Compile Sass
gulp.task('sass', () => {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./src/public/css'));
});

// Listen for file changes to compile Sass
gulp.task('sass:watch', () => {
	gulp.watch('./src/scss/**/*.scss', ['sass']);
});

// Move all CSS assets from node_modules into the CSS folder
gulp.task('assets:css', () => {
	gulp.src(['./node_modules/normalize.css/normalize.css'])
		.pipe(gulp.dest('./src/public/css'));
});

// Move all JS assets from node_modules into the JS folder
gulp.task('assets:js', () => {
	gulp.src(['./node_modules/snapsvg/dist/snap.svg-min.js'])
		.pipe(gulp.dest('./src/public/js'));
});

gulp.task('assets', ['assets:css', 'assets:js']);
gulp.task('default', ['assets', 'sass', 'sass:watch']);
