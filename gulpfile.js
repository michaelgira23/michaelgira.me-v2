const fs           = require('fs');
const gulp         = require('gulp');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const webp         = require('gulp-webp');
const imagemin     = require('gulp-imagemin');

const jsonPath = './src/me.json';
const deviconPath = './node_modules/devicon/icons/';

// Listen for file changes to compile Sass and import logo icons
function watch() {
	gulp.watch('./src/scss/**/*.scss', compileSass);
	gulp.watch(jsonPath, logoAssets);
}

// Compile Sass
function compileSass() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(postcss([autoprefixer()]))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('./src/public/css'));
}

// Move all CSS assets from node_modules into the CSS folder
function cssAssets() {
	return gulp.src(['./node_modules/normalize.css/normalize.css'])
		.pipe(rename({ extname: '.scss' }))
		.pipe(gulp.dest('./src/scss'));
}

// Move all JS assets from node_modules into the JS folder
function jsAssets() {
	return gulp.src(['./node_modules/snapsvg/dist/snap.svg-min.js'])
		.pipe(gulp.dest('./src/public/js'));
}

// Move project images from /assets to /public
function imageAssetsWebp() {
	return gulp.src(['./src/assets/**/*.{png,jpg}'])
		.pipe(webp())
		.pipe(gulp.dest('./src/public/img'));
}
function imageAssetsMinimize() {
	return gulp.src(['./src/assets/**/*.{png,jpg}'])
		.pipe(imagemin())
		.pipe(gulp.dest('./src/public/img'));
}

// Move all Devicon logos from node_modules into the logos folder
function logoAssets() {
	// Read logos from me.json
	const logoPaths = [];
	JSON.parse(fs.readFileSync(jsonPath)).skills.forEach(skill => {
		logoPaths.push(deviconPath + skill.logo);
	});

	return gulp.src(logoPaths)
		.pipe(gulp.dest('./src/public/img/logos'));
}

exports.prod = gulp.series(gulp.parallel(cssAssets, jsAssets, imageAssetsWebp, imageAssetsMinimize, logoAssets), compileSass);
exports.default = gulp.parallel(exports.prod, watch);
