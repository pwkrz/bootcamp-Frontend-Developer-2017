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
    clean() {

        return del(["./dist/**"])
    }

    @Task("build:server")
    buildServer(){
        var tsconfig = path.resolve("./server/tsconfig.json");
        
        var tsResult = gulp.src("./server/**/*.ts")
            .pipe( sourcemaps.init() )
            .pipe( ts(tsconfig) );

        return tsResult.js
            .pipe( sourcemaps.write() )
            .pipe( gulp.dest(
                path.resolve("./dist/server")
            ));
    };

    @Task("copy:public")
    copyPublic(){

        return gulp.src("./server/public/**/*.*")
            .pipe( gulp.dest(
                path.resolve("./dist/server/public")
            ));
    }

    @Task("dev:server")
    syncServer(){
        var stream = nodemon({
                       exec: 'ts-node ./server/index.ts' // run ES5 code
                     , watch: './server' // watch ES2015 code
                     , ext: 'ts' // watch ES2015 code
                     , ignore: ['*.spec.ts']
                     })        
      
        return stream;
      }

    @SequenceTask()
    default(){
        return ["clean", "build:server", "copy:public"]
    }

}