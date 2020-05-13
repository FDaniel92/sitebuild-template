"use strict";

module.exports = function (grunt) {
    const sass = require('node-sass');
    // Load all Grunt tasks that are listed in package.json automagically
    require("load-grunt-tasks")(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                style: 'compressed'
            },
            dist: {
                files: {
                    "dist/css/style.css": "src/scss/style.scss"
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'src/js/vendor/bootstrap/alert.js',
                    'src/js/vendor/bootstrap/button.js',
                    'src/js/vendor/bootstrap/carousel.js',
                    'src/js/vendor/bootstrap/collapse.js',
                    'src/js/vendor/bootstrap/dropdown.js',
                    'src/js/vendor/bootstrap/modal.js',
                    'src/js/vendor/bootstrap/popover.js',
                    'src/js/vendor/bootstrap/scrollspy.js',
                    'src/js/vendor/bootstrap/tab.js',
                    'src/js/vendor/bootstrap/tooltip.js',
                    'src/js/vendor/bootstrap/util.js',
                    'src/js/custom/*.js'
                ],
                dest: 'dist/js/build.js',
            },
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/build.min.js': 'dist/js/build.js'
                }
            }
        },
        sprite: {
            all: {
                src: 'src/icons/*.{png,jpg,jpeg,gif}',
                dest: 'dist/images/sprites.png',
                destCss: 'src/scss/components/_sprites.scss',
                cssTemplate: 'src/icons/scss.template.mustache',
                imgPath: '/images/sprites.png'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },
        autoprefixer: {
            options: {
                map: true
            },
            dist: {
                files: {
                    'dist/css/style.css': 'dist/css/style.css'
                }
            }
        },
        watch: {
            sass: {
                files: "src/scss/**/*.scss",
                tasks: ["sass"]
            },
            concat: {
                files: "src/js/**/*.js",
                tasks: ["concat"]
            },
            spritesmith: {
                files: 'src/icons/*.{png,jpg,jpeg,gif}',
                tasks: ['sprite']
            },
            imagemin: {
                files: 'src/images/*.{png,jpg,gif}',
                tasks: ['imagemin']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ["dist/**/*.*"]
                },
                options: {
                    watchTask: true,
                    proxy: "sitebuildoktatas.local"
                }
            }
        }
    });
    // Custom tasks
    grunt.registerTask('default', ['browserSync', 'watch']);
};
