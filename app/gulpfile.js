var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		browserSync 	= require('browser-sync'),
		concat 				= require('gulp-concat'),
		uglify 				= require('gulp-uglifyjs'),
		cssnano  			= require('gulp-cssnano'),
		rename 				= require('gulp-rename');

//-------Импорт строк из SASS в CSS---------\\
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
	return gulp.src([
   'app/libs/jquery/dist/jquery.min.js',
   'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	pipe.(gulp.dest('app/css'));

});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
			notify: true
		});
});
//------Проверка на изменение sass файлов------\\
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); //---Добавляем Синх HTML файлов---//
	gulp.watch('app/js/**/*.js', browserSync.reload); //--Добавляем Синх JS файлов--//
});