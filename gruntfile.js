module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      stylus: {
          compile: {
              options: {},
              files: {
                  'public/css/main.css': 'app/css/main.styl'
              }
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('default', ['stylus']);
};