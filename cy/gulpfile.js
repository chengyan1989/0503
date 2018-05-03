var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");
var watch = require("gulp-watch");
var data = require("./src/data/nav-list-data.json");
var url = require("url");
gulp.task("webserver", function() {
    gulp.src("src")
        .pipe(webserver({
            port: 8080,
            livereload: true,
            middleware: function(req, res, next) {

                if (req.url === "/index/page1/header") {
                    res.end(JSON.stringify(data.headerNavList));
                }
                next();
            }
        }))
});
gulp.task("sass", function() {
    gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"));
});
gulp.task("watch", function() {
    gulp.watch("src/sass/*.scss", ["sass"]);
});
gulp.task("default", ["webserver", "sass", "watch"]);