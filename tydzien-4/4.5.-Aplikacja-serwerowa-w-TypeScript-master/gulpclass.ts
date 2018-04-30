import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators"

const gulp = require("gulp");
const path = require("path");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del")
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create();

@Gulpclass()
export class Gulpfile {

    @Task()
    clean(cb: Function) {
        return del(["./dist/**"], cb)
    }

    @Task("build:server")
    buildServer(){
        var reporter = path.resolve("./server/tsconfig.json");
        
        var tsResult = gulp.src("./server/**/*.ts")
            .pipe( sourcemaps.init() )
            .pipe( ts(reporter) );
        return tsResult.js
            .pipe( sourcemaps.write() )
            .pipe( gulp.dest(
                path.resolve("./dist/server")
            ));
    };

    @Task("watch:server")
    watchServer(){
        // return browserSync.reload
        return gulp.watch("./server/**/*.*", ["build:server"], browserSync.reload)
    }

    @Task("syncServer", ['build:server'])
    syncServer(){
        var stream = nodemon({
                       script: './dist/server/' // run ES5 code
                     , watch: './server' // watch ES2015 code
                     , ext: 'ts' // watch ES2015 code
                     , ignore: ['tsconfig.json']
                     , tasks: ['build:server'] // compile synchronously onChange
                     })        
      
        return stream
      }

    @Task("dev:server")
    syncServer(){
        var stream = nodemon({
                       exec: 'ts-node ./server/index.ts' // run ES5 code
                     , watch: './server' // watch ES2015 code
                     , ext: 'ts' // watch ES2015 code
                     , ignore: ['*.spec.ts']
                     })        
      
        return stream
      }

    @SequenceTask()
    default(){
        return ["clean", "build:server", "syncServer"]
    }

}