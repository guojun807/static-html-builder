var path = require('path');

module.exports = function (grunt) {

  grunt.config('concat', {

    generated: {
      options: {
        process: function (src, filepath) {
          if (path.extname(filepath) !== '.js') {
            return src;
          }
          if (filepath.indexOf('app') !== 0) {
            return src;
          }
          return '(function(){' + src + '})();';
        }
      }
    },

    useStrict: {
      src: ['<%= config.temp %>/concat/js/app.js'],
      dest: '<%= config.temp %>/concat/js/app.js',
      options: {
        banner:  '\'use strict\';'
      }
    },

    ngTemplate: {
      src: ['<%= config.temp %>/ngTemplate/src/**/*.html'],
      dest: '<%= config.temp %>/ngTemplate/concat.html',
      options: {
        process: function (src, filepath) {
          return '<script id="' + path.relative('.tmp/ngTemplate/src/', filepath) + '" type="text/ng-template">' + src + '</script>';
        }
      }
    }

  });

};