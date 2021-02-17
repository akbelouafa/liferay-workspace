/**
 * © 2017 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: MIT
 */

'use strict';

var gulp = require('gulp'),
    jsonfile = require('jsonfile'),
	  execSync = require('child_process').execSync


var liferayThemeTasks = require('liferay-theme-tasks');

liferayThemeTasks.registerTasks({
	gulp,
});

const designSystemConfig =  jsonfile.readFileSync('design-system.json')
const sourcePath = designSystemConfig.sourcePath
const buildCommand = designSystemConfig.buildCommand



gulp.task('build-ds',function(done) {
	
		  var logExecSync = execSync('cd ' + sourcePath + ' && ' + buildCommand ,(err, stdout, stderr) => {

			if (err) {
			  console.error(err);
			  return;
			}
			console.log(stdout);
		  });
		  console.log(logExecSync.toString());
		  done();

  });
function buildDS() {
	var logExec = require('child_process').execSync('cd ' + sourcePath + ' && ' + buildCommand ,(err, stdout, stderr) => {

		if (err) {
		  console.error(err);
		  return;
		}
		console.log(stdout);
	  });
	  console.log(logExec.toString());
	  return;
	}
	
function copyToThemeCss() {

	return gulp.src([sourcePath + '/dist/assets/css/*.min.css',
					sourcePath + '/dist/assets/css/*.css.map'])
		  .pipe(gulp.dest('src/css'))
  }
  
  function copyToThemeImages() {
	return gulp.src(sourcePath + '/dist/assets/images/**/*.*')
	  .pipe(gulp.dest('src/images'))
  }
  function copyToThemeJS() {
	return gulp.src([sourcePath + '/dist/assets/js/*.min.js',
					sourcePath + '/dist/assets/js/*.js.map'],  {
						  'allowEmpty': true
					  })
		  .pipe(gulp.dest('src/js/design-system'), {
			  'allowEmpty': true
		  })
  }
  function copyToThemeFonts() {
	return gulp.src(sourcePath + '/dist/assets/fonts/**/*')
		  .pipe(gulp.dest('../bpc_pcf_common_theme/src/fonts'))
  }
  
  function JsVendorForLivraison() {
	return gulp.src([
		'!src/assets/vendor/jquery/dist/jquery.min.js',
		'!src/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
		'src/assets/vendor/**/*.js'
	  ], {
		  'allowEmpty': true
	  })
	  .pipe(concat('vendor.js'))
	  .pipe(rename({suffix: '.min'}))
	  .pipe(uglify())
	  .pipe(gulp.dest('dist/assets/js', {
		  'allowEmpty': true
	  }))
  }
  


  exports.copyDesignSystem = gulp.series( copyToThemeCss,copyToThemeJS,copyToThemeImages,copyToThemeFonts)


