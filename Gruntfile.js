module.exports = function(grunt) {
grunt.initConfig({
  closurecompiler: {
    minify: {
      files: {
        "app.min.js": ['index.js, lib/*.js', 'lib/*/*.js'],
      },
      options: {
        "compilation_level": "ADVANCED_OPTIMIZATIONS"
      }
    },
    minifyDebug: {
      files: {
        "app.debug.js": ['index.js, lib/*.js', 'lib/*/*.js'],
      },
      options: {
        "compilation_level": "SIMPLE_OPTIMIZATIONS",
        "debug": true,
        "formatting": "PRETTY_PRINT"
      }
    }
  }
});
grunt.loadNpmTasks('grunt-closurecompiler');
grunt.registerTask('minify', ['closurecompiler:minify']);
grunt.registerTask('debug', ['closurecompiler:minifyDebug']);
grunt.registerTask('default', ['closurecompiler:minify']);
};

