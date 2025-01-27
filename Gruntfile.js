module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/upup.js',
        'Gruntfile.js'
      ],
      options: {
        jshintrc: true
      }
    },
    uglify: {
      options: {
        preserveComments: 'some',
        sourceMap: true
      },
      all: {
        files: {
          'dist/upup.min.js': ['src/upup.js'],
          'dist/upup.sw.min.js': ['src/vendor/serviceworker-cache-polyfill.js', 'src/upup.sw.js'],
        }
      }
    },
    watch: {
      files: ['src/*', '!**/node_modules/**'],
      tasks: ['default'],
    },
    connect: {
      server: {
        options: {
          protocol: 'http',
          port: 8443,
          hostname: '*',
          base: '.',
          open: 'http://localhost:8443/demo'
        }
      }
    },
    markdox: {
      target: {
        files: [
          {src: 'src/upup.js', dest: 'docs/README.md'}
        ]
      }
    },
    compress: {
      main: {
        options: {
          archive: 'dist/upup.zip'
        },
        files: [
          {expand: true, cwd: 'dist', src: ['*.js']}
        ]
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdox');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'markdox', 'compress']);

  grunt.registerTask('dev', ['default', 'connect', 'watch']);

};
