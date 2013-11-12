module.exports = function(grunt) {

	//variables about source files: 
	
	var jsSrcFiles = [ 'sgxjseditors/src/jseditors.js',
			'sgxjseditors/src/jseditors-types.js',
			'sgxjseditors/src/jseditors-html5.js' ];
	
	var templatesJsOutput = 'sgxjseditors/src/html5-templates.js'; 
	

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json')

		,
		jshint : {
			all : jsSrcFiles

			,
			options : {
				"predef" : [ '_', 'console', 'define' ],
				"laxcomma" : true
			}
		}

		,
		clean : [ 'build', templatesJsOutput ]

		,
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			// mangle: false
			}
		
			,
			main_target : {
				files : {
					
					'build/<%= pkg.name %>-jseditors.min.js' : [ 
                        'sgxjseditors/src/jseditors.js',
                        'sgxjseditors/src/jseditors-types.js',
                     ],
					
					'build/<%= pkg.name %>-jseditors-html5.min.js' : [
							'sgxjseditors/src/jseditors-html5.js',
							'sgxjseditors/src/html5-templates.js' ]
			
					,
					'build/<%= pkg.name %>-all.min.js' : [
							'sgxjseditors/src/jseditors.js',
							'sgxjseditors/src/jseditors-types.js',
							'sgxjseditors/src/jseditors-html5.js',
							'sgxjseditors/src/html5-templates.js' ]
				}
			}
		}
		
		// https://github.com/gruntjs/grunt-contrib-jst			,
		,
		jst : {
			compile : {
				options : {
					processName : function(filename) {
						return filename.substring(filename
								.lastIndexOf('/') + 1, filename
								.lastIndexOf('.html'));
					},
					namespace : 'jseditors.templates'
				},
				files : {
					'sgxjseditors/src/html5-templates.js' : [ 'sgxjseditors/src/html5_templates/**/*.html' ]
				}
			}
		}

		,
		yuidoc : {
			compile : {
				name : '<%= pkg.name %>',
				description : '<%= pkg.description %>',
				version : '<%= pkg.version %>',
				url : '<%= pkg.homepage %>',
				options : {
					paths : 'sgxjseditors/src',
//							themedir : 'path/to/custom/theme/',//js-editors/node_modules/grunt-contrib-yuidoc/node_modules/yuidocjs/themes/default
					outdir : 'apidoc'
				}
			}
		}

		// https://github.com/gruntjs/grunt-contrib-connect
		//run 'grunt run' and a server will be started for easy testing the example (http://localhost:8080/sgxjseditors/test/sgxjseditors.html) or even the apidocs. Thanks to grunt-contrib-watch the templates and apidocs are compiled each time you save a file.  
		,
		connect : {
			server : {
				options : {
					port : 8080,
					base : '.'
				// keepalive: true
				}
			}
		}

		,
		watch : {

			templates : {
				files : [ 'sgxjseditors/src/html5_templates/**/*.html' ],
				tasks : [ 'jst' ]
			}
		
//		this is nice for writing apidocs but only for that.....
		,			
			apidoc : {
				files : jsSrcFiles,
				tasks : [ 'yuidoc' ]
			}


//				livereload : {
//					options : {
//						livereload : true
//					},
//					files : [ 'sgxjseditors/src/jseditors-html5.js' ]
//				}

		// options: {
		// livereload: true
		// }
		}
			
			
			 // grunt-express will serve the files from the folders listed in
				// bases on specified port and `hostname`
//			express : {
//				all : {
//					options : {
//						port : 9000,
//						hostname : '0.0.0.0',
//						bases : [ '.' ],
//						livereload : true
//					}
//				}
//			},

							
			 // grunt-open will open your browser at the project's URL
//			open : {
//				all : {
//					// Gets the port from the connect configuration
//					path : 'http://localhost:<%= express.all.options.port%>'
//				}
//			}

		});
	


//	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-jst');
//	grunt.loadNpmTasks('grunt-contrib-jshint');
//	grunt.loadNpmTasks('grunt-contrib-clean');
//	grunt.loadNpmTasks('grunt-contrib-watch');
//	grunt.loadNpmTasks('grunt-contrib-yuidoc');
//	grunt.loadNpmTasks('grunt-contrib-connect');

	
	
	/////TASK DEFINITIONS
	
	grunt.registerTask('default', [ 'clean', 'jshint', 'jst', 'uglify' ]);
	grunt.registerTask('run', [ 'connect', 'watch' ]);
	grunt.registerTask('apidoc', [ 'clean', 'yuidoc' ]);	
	
	
//	grunt.registerTask('server', ['express', 'open', 'watch']);
//	"matchdep": "~0.1.2",
//	"grunt-express": "~1.0.0-beta2"  ,
//	 "grunt-open": "~0.2.1"
//	grunt.registerTask('test1', ['clean', 'jshint', 'jst', 'uglify', 'watch']);

	


};