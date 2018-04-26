eval(
    require("typescript")
        .transpile(
            require("fs").readFileSync("./gulpclass.ts").toString()
        )
)

// const gulp = require("gulp");
// const path = require("path");
// const ts = require("gulp-typescript");
// const sourcemaps = require("gulp-sourcemaps");

// gulp.task("build:server", function(){
//     var reporter = path.resolve("./server/tsconfig.json");
    
//     var tsResult = gulp.src("./server/**/*.ts")
//         .pipe( sourcemaps.init() )
//         .pipe( ts(reporter) );
//     return tsResult.js
//         .pipe( sourcemaps.write() )
//         .pipe( gulp.dest(
//             path.resolve("./dist/server")
//         ));
// });

// gulp.task("build", ["build:server"])

// gulp.task("default", ["build"])