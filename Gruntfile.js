module.exports = function(grunt) {

  grunt.initConfig({
    includereplace: {
          dist: {
              options: {
                        includesDir: 'src/templates/components'
              },
              files: [{
                        src: 'src/templates/index.html',
                        dest: 'dest/index.html',
                        expand: false
                      }]
            }
          },
    copy: {
      js: {
        files: [         
          { cwd: 'src/js/',
            src: ['*.*'], 
            dest: 'dest/js/',
            expand: true
          }
        ],
      },
      css: {
        files: [         
          { cwd: 'src/css/',
            src: ['*.*'], 
            dest: 'dest/css/',
            expand: true
          }
        ],
      },    
      json: {
        files: [         
          { cwd: 'src/json/',
            src: ['*.*'], 
            dest: 'dest/json/',
            expand: true
          }
        ],
      },
      assets: {   
        files: [
          {   cwd: 'assets/',
              src: ['**/*.*'], 
              dest: 'dest/assets/',
              expand: true
          }
        ]
      }
    },    
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        reporter: require('jshint-stylish')
      }
    },
    less: {
      dev: {
        options: {
          paths: ["src/less"]
        },
        files: { "dest/css/cover.css": "src/less/cover.less"}
      },
      build: {
        options: {
          paths: ["src/less"],
          cleancss: true
        },
        files: { "dest/css/cover.css": "src/less/cover.less"}
      }
    },
    watch: {
      files: ['src/**/*.*'],
      tasks: ['jshint','copy:js', 'copy:css', 'copy:json', 'includereplace','less:dev']
    },
    clean: {
      dev: ['dest/js','dest/css'],
      build: ['dest/']
    }

  });

  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['clean:dev', 'jshint','copy:js', 'copy:css', 'copy:json', 'includereplace','less:dev']);

  grunt.registerTask('build', ['clean:build','jshint','copy','includereplace', 'less:build']);
};