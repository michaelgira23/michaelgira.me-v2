'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', () => {
	gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);
