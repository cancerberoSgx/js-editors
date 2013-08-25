module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
	pkg : grunt.file.readJSON('package.json'),
	uglify : {
		options : {
			banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//			mangle: false
		},

		my_target : {
			files : {
				'build/<%= pkg.name %>-jseditors.min.js' : [  'sgxjseditors/src/jseditors.js'  ]
			,	'build/<%= pkg.name %>-jseditors-html5.min.js' : [  'sgxjseditors/src/jseditors-html5.js'  ]
		
			,	'build/<%= pkg.name %>-all.min.js' : [ 
			 	    'sgxjseditors/src/jseditors.js' 
			 	,	'sgxjseditors/src/jseditors-html5.js' 
                ]
			}
		}
	}
});


// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');

// Default task(s).
grunt.registerTask('default', [ 'uglify' ]);

};