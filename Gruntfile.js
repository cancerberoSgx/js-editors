module.exports = function(grunt) {

	// Project configuration.
	grunt
			.initConfig({
				pkg : grunt.file.readJSON('package.json')

				,
				jshint : {
					all : [ 'Gruntfile.js', 'sgxjseditors/src/jseditors.js' ]

					,
					options : {
						"predef" : [ '_', 'console', 'define' ],
						"laxcomma" : true
					}
				}

				,
				clean : [ 'build', 'sgxjseditors/src/html5-templates.js' ]

				,
				uglify : {
					options : {
						banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
					// mangle: false
					},

					my_target : {
						files : {
							'build/<%= pkg.name %>-jseditors.min.js' : [ 'sgxjseditors/src/jseditors.js' ],
							'build/<%= pkg.name %>-jseditors-html5.min.js' : [
									'sgxjseditors/src/jseditors-html5.js',
									'sgxjseditors/src/html5-templates.js' ]

							,
							'build/<%= pkg.name %>-all.min.js' : [
									'sgxjseditors/src/jseditors.js',
									'sgxjseditors/src/jseditors-html5.js',
									'sgxjseditors/src/html5-templates.js' ]
						}
					}
				}

				// https://github.com/gruntjs/grunt-contrib-jst
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

			// https://github.com/gruntjs/grunt-contrib-connect
			// , connect: {
			// server: {
			// options: {
			// port: 8080,
			// base: 'sgxeditors/test'
			// }
			// }
			// }

			});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-jst');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task(s).
	grunt.registerTask('default', [ 'clean', 'jshint', 'jst', 'uglify' ]);

	// grunt.loadNpmTasks('grunt-contrib-connect');

};