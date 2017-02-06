'use strict';

const fs   = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');

const jsonPath = './src/me.json';
const deviconPath = './node_modules/devicon/icons/';

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

// Move all Devicon logos from node_modules into the logos folder
gulp.task('logos', () => {

	// Read logos from me.json
	const logoPaths = [];
	JSON.parse(fs.readFileSync(jsonPath)).skills.forEach(skill => {
		logoPaths.push(deviconPath + skill.logo);
	});

	gulp.src(logoPaths)
		.pipe(gulp.dest('./src/public/img/logos'));
});

// Listen for file changes in the me.json for importing logos
gulp.task('logos:watch', () => {
	gulp.watch(jsonPath, ['logos']);
});

gulp.task('assets', ['assets:css', 'assets:js', 'logos']);
gulp.task('default', ['assets', 'sass', 'sass:watch', 'logos:watch']);
