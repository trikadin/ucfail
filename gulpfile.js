var
  gulp = require('gulp'),
  babel = require('gulp-babel'),
  del = require('del');

gulp.task('clean', function (cb) {
  del(['./build'], cb);
});

gulp.task('data', ['clean'], function (cb) {
  gulp
    .src('./data/**/*.*')
    .pipe(gulp.dest('./build/data'))
    .on('end', cb);
});

gulp.task('build', ['clean'], function(cb){
  gulp
    .src('./app.js')
    .pipe(babel())
    .pipe(gulp.dest('./build'))
    .on('end', cb);
});

gulp.task('default', ['clean', 'data', 'build']);