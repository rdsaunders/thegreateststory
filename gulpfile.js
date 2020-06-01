const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const svgmin = require("gulp-svgmin");
const svgstore = require("gulp-svgstore");
const path = require('path');
const svgSprite = require("gulp-svg-sprites");
const count = require('gulp-count');



var config = {
    paths: {
        baseDir: "src",
        outputDir: "dist",
        iconDir: "dist/svgs",
        //typesDir: "../../src/components/contensis/icons/",
        svgs: "src/svgs/**/*.svg"
    },
    // // Use icon template to define the structure of the SVGS
    // templates: {
    //     symbols: require("fs").readFileSync("src/template/svg-template.svg", "utf-8")
    // },
    // Generate a svg-icon file that can be used by the app
    svg: {
        symbols: "svg-icons.html"
    },
    // Generate svg symbols
    mode: "symbols",
    // Html preview
    preview: true
};
 
exports.default = () => (
    gulp.src('src/images/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('content/uploads'))
);

// Generate svg sprite
gulp.task('sprites', function () {
    return gulp.src(config.paths.svgs)
        .pipe(svgmin({
            plugins: [{
                cleanupIDs: true
            }, {
                removeAttrs: {
                    attrs: '(fill|stroke)'
                }
            }]
        }))
        .pipe(count('<%= counter %> icons found to add to sprite.'))
        //.pipe(svgstore())
        .pipe(gulp.dest(config.paths.iconDir));
});