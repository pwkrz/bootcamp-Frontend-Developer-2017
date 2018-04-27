const gulp = require('gulp');
const sass = require('gulp-sass');
const bs = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');

gulp.task("css", function(){
	
	del('src/css')
	
	gulp.src("src/sass/main.scss")
		.pipe( plumber() )
		.pipe( sass({
			"outputStyle": 'compressed',
			"sourceMap": true,
			"sourceMapContents": true,
			"sourceMapEmbed": true
		}).on('error', sass.logError) )
		.pipe( autoprefixer({
            browsers: ['last 2 versions'],
			cascade: false
		}) )
		.pipe( gulp.dest('src/css') )
		.pipe( bs.stream() )
		
})

gulp.task("src:server", function(){
	
	bs.init({
        server: {
            baseDir: "./src"
        }
    });
	
})

gulp.task("src:watch", function(){
	
	gulp.watch("src/sass/**/*.+(sass|scss)", ["css"]);
	gulp.watch(["src/*.html", "src/**/*.js"], bs.reload);
	
})

gulp.task("dist:clean", function(){
	
	return del("dist");
	
})

gulp.task("dist:html", function(){
	
	return gulp.src("./src/index.html")
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( useref() )
		.pipe( gulpIf( '*.js', uglify() ) )
		.pipe( gulpIf( '*.html', htmlmin({collapseWhitespace: true}) ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest("dist") )
	
})

gulp.task("dist:images", function(){
	
	return gulp.src('src/**/*.+(gif|jpg|png)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/'))
	
})

gulp.task("build:sequence", function(cb){
	
	runSequence( "dist:clean", "dist:html", "dist:images", cb )
	
})

gulp.task("default", ["css", "src:server", "src:watch"])

gulp.task("build", ["build:sequence"], function(){
	
	bs.init({
        server: {
            baseDir: "./dist"
        }
    })

})