module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    outputStyle: "compressed"
                },
                files: {
                    'www/css/stylesheet.min.css': 'scss/stylesheet.scss',
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'www/js/javascript.min.js': 'js/**/*.js',
                }
            }
        },
        watch: {
            scss: {
                files: ['scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    interrupt: true
                }
            },
            javascript: {
                files: ['js/**/*.js'],
                tasks: ['uglify'],
                options: {
                    interrupt: true
                }
            }
        },
        phpcs: {
            application: {
                src: ['src/**/*.php']
            },
            options: {
                bin: 'vendor/bin/phpcs',
                standard: 'Zend'
            }
        }
    });

    grunt.registerTask('default', ['sass', 'uglify']);
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};