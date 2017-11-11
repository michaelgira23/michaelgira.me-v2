const fs           = require('fs');
const gulp         = require('gulp');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const jsonPath = './src/me.json';
const deviconPath = './node_modules/devicon/icons/';

// Compile Sass
gulp.task('sass', () => {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('./src/public/css'));
});

// Listen for file changes to compile Sass
gulp.task('sass:watch', () => {
	gulp.watch('./src/scss/**/*.scss', ['sass']);
});

// Move all CSS assets from node_modules into the CSS folder
gulp.task('assets:css', () => {
	gulp.src(['./node_modules/normalize.css/normalize.css'])
		.pipe(rename({ extname: '.scss' }))
		.pipe(gulp.dest('./src/scss'));
});

// Move all JS assets from node_modules into the JS folder
gulp.task('assets:js', () => {
	gulp.src(['./node_modules/snapsvg/dist/snap.svg-min.js'])
		.pipe(gulp.dest('./src/public/js'));
});

// Move all Devicon logos from node_modules into the logos folder
gulp.task('assets:logos', () => {

	// Read logos from me.json
	const logoPaths = [];
	JSON.parse(fs.readFileSync(jsonPath)).skills.forEach(skill => {
		logoPaths.push(deviconPath + skill.logo);
	});

	gulp.src(logoPaths)
		.pipe(gulp.dest('./src/public/img/logos'));
});

// Listen for file changes in the me.json for importing logos
gulp.task('assets:logos:watch', () => {
	gulp.watch(jsonPath, ['logos']);
});

gulp.task('assets', ['assets:css', 'assets:js', 'assets:logos']);
gulp.task('default', ['assets', 'sass', 'sass:watch', 'assets:logos:watch']);
gulp.task('prod', ['assets', 'sass']);
