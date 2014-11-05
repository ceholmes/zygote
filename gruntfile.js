module.exports = function(grunt) {

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

        sass: { 
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                	'public/css/style.css': 'public/css/style.scss'                    
                }
            }
        },

        compass: {
            options: {
                sassDir: 'public/css',
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
                script: "<%=pkg.main %>",
                options: {                    
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]                    
                }
            },
            inspect: {
                script: "<%=pkg.main %>",
                options: {
                    nodeArgs: ["--debug"],
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]                    
                }
            },
            inspectBreak: {
                script: "<%=pkg.main %>",
                options: {
                    nodeArgs: ["--debug-brk"],
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]                    
                }
            }
        },

        concurrent: {
            options: {
                limit: 10,
                logConcurrentOutput: true                
            },
            dev: {                
                tasks:["nodemon:dev", "compass:watch", "watch"]
            },
            inspect: {
                tasks: ["nodemon:inspect", "watch"]
            },
            inspectBreak: {
                tasks: ["nodemon:inspectBreak", "watch"]
            }          
        }

    });


    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks("grunt-concurrent");


    // register default task
	grunt.registerTask('default', ['package', 'sass']);



    grunt.registerTask("debug", function(inspect, breakOnFirstLine){

        var nodemonTask = "dev";
        
        if(inspect === "inspect"){
            
            nodemonTask = breakOnFirstLine === "break" ? "inspectBreak" : "inspect";

            grunt.util.spawn({
                cmd: "node-inspector"
            });
            
            console.log("Node inspector running at http://localhost:8080/debug?port=5858");
        }

        grunt.task.run(["concurrent:"+nodemonTask]);
    });



    // example custom task
    grunt.registerTask('package', function() {
        var pkg = grunt.file.readJSON('package.json');

        grunt.log.writeln('');
        grunt.log.writeln(pkg.name + '  ' + pkg.version + '  ' + pkg.description);                        
    });


}
