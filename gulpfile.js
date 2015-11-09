// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var devGulpTasks = require('grommet/utils/gulp/gulp-tasks');

var opts = {
  base: '.',
  dist: path.resolve(__dirname, 'dist/'),
  copyAssets: [
    'src/index.html',
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/index.scss',
  webpack: {
    resolve: {
      // alias: {
      //   'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
      //   'grommet': path.resolve(__dirname, '../grommet/src/js')
      // },
      root: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/scss')
      ]
    }
  },
  devServerPort: 9020,
  devServerProxy: {
    "/ldap/*": 'http://localhost:8020'
  },
  sync: {
    hostname: 'grommet.us.rdlabs.hpecorp.net',
    username: 'ligo',
    remoteDestination: '/var/www/html/examples/people-finder/dist'
  },
  devPreprocess: ['start-backend']
};

gulp.task('start-backend', function() {
  nodemon({
    script: path.resolve(__dirname, 'server/server')
  });
});

devGulpTasks(gulp, opts);
