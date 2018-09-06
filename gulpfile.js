var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.+(scss|sass)')
	           .pipe(sass())
	           .pipe(autoprefixer(['last 15 versions','>1%','ie 7','ie 8', 'ff 62'],{cascade: true}))
	           .pipe(gulp.dest('app/css'))
	           .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts',function(){
	return gulp.src([
		'app/libs/js/jquery-3.3.1.min.js',
		'app/libs/js/jquery.nice-select.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs',['sass'],function(){
	return gulp.src([
		'app/css/libs.css',

		])
	.pipe(cssnano())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync',function(){
	browserSync({
		server:{
			baseDir:'app'
		},
		notify: false
	});
});

gulp.task('clean',function(){
	return del.sync('dist');
});

gulp.task('clear',function(){
	return cache.clearAll();
});

gulp.task('img',function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch',['browser-sync','css-libs','scripts'],function(){
	gulp.watch('app/sass/**/*.+(scss|sass)',['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build',['clean','img','sass','scripts'],function(){

	var buildHtml = gulp.src('app/*.html')
	    .pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/libs.min.css',
		'app/css/main.css'])
		.pipe(gulp.dest('dist/css'));


	var buildJs = gulp.src([
		'app/js/libs.min.js',
		'app/js/common.js'])
		.pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src(
		'app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildImg = gulp.src(
		'app/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('default',['watch']);