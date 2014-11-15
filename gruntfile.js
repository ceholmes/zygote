module.exports = function(grunt) {

    // config tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        watch: {
            html: {
                files: ['public/index.html', 'public/css/*.css'],
                options: {
                    livereload: true
                }
            }
        },
        concat: {
            build: {
                src: ["public/js/**/*.js"],
                dest: "public/js/build/<%=pkg.name %>.js",
            }
        },
        uglify: {
            build: {
                src: "public/js/build/<%=pkg.name %>.js",
                dest: "public/js/build/<%=pkg.name %>.min.js"
            }
        },
        compass: {
            options: {
                sassDir: 'public/css/sass',
                cssDir: 'public/css',
            },
            watch: {
                options: {
                    watch: true
                }
            }
        },
        nodemon: {
            dev: {
                script: '<%=pkg.main%>',
                options: {
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]
                }
            },
            inspect: {
                script: '<%=pkg.main%>',
                options: {
                    nodeArgs: ["--debug"],
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]
                }
            },
            inspectBreak: {
                script: '<%=pkg.main%>',
                options: {
                    nodeArgs: ["--debug-brk"],
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js', '*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        concurrent: {
            options: {
                limit: 10,
                logConcurrentOutput: true
            },
            dev: {
                tasks: ["nodemon:dev", "compass:watch", "watch"]
            },
            inspect: {
                tasks: ["nodemon:inspect", "watch"]
            },
            inspectBreak: {
                tasks: ["nodemon:inspectBreak", "watch"]
            }
        }

    });


    // load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks('grunt-nodemon');    


    // register tasks    
    grunt.registerTask('default', ['help']);

    grunt.registerTask('help', function() {

        console.log('');
        console.log('grunt serve            starts server with nodemon');
        console.log('grunt serve:watch      starts server and watches for changes');
        console.log('');
        console.log('grunt debug            starts node-inspector');
        console.log('grunt debug:break      starts node-inspector and breaks on first line');
        console.log('grunt lint             runs jsHint');
        console.log('');

    });

    grunt.registerTask('serve', function(watch) {

        var task = (watch === 'watch') ? 'concurrent:dev' : 'nodemon:dev';
        grunt.task.run(task);
    });

    grunt.registerTask("debug", function(breakOnFirstLine) {

        var task = breakOnFirstLine === "break" ? "inspectBreak" : "inspect";

        grunt.util.spawn({
            cmd: "node-inspector"
        });

        console.log("Node inspector running at http://localhost:8080/debug?port=5858");

        grunt.task.run(["concurrent:" + task]);
    });

    grunt.registerTask('lint', ['jshint']);



};
