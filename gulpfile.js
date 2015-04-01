var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	path = require('path');

gulp.task('img',function() {
	var img_src = './www/resource/img/*';
	return gulp.src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_src));
});

gulp.task('default', function() {
  gulp.start('img')
});