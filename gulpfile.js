var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	path = require('path');

gulp.task('img',function() {
	var img_src = './www/resource/img/k/*';
	return gulp.src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_src));
});

gulp.task('clean', function(cb) {
  del(['./www/resource/img/k/*'], cb)
});

gulp.task('default',['clean'], function() {
  gulp.start('img')
});