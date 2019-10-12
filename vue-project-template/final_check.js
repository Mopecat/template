'use strict';
const replacer = require('replace-in-file');
const chalk = require('chalk');
const bgRed = chalk.white.bgRed;

class FinalCheck {
  constructor () {
    console.log('checking start...');
  }

  process () {
    this.stripIEKeywords();
    this.addJSPEncoding();
    //this.convertToWebP();
  }

  convertToWebP () {
    const imagemin = require('imagemin');
    const imageminWebP = require('imagemin-webp');
    imagemin(['./dist/static/img/*.{png,jpg}'], './dist/static/img', {
        use: [
          imageminWebP({quality:75})
        ]
    }).then(() => {
      console.log(bgRed('webp converted') + '...');
    });
  }

  addJSPEncoding () {
    const opts = {
      files: [
        './dist/*.jsp',
      ],
      from: /<\!DOCTYPE html>/g,
      to: '<%@page contentType="text/html" pageEncoding="UTF-8"%><!DOCTYPE html>',
      encoding: 'utf8',
    }

    replacer(opts).then((changedFiles) => {
      console.log(bgRed('FINAL CHECKING: final replacing '), changedFiles.join(','));
    }).catch((err) => {
      console.error(err);
    });
  }

  stripIEKeywords () {
    const opts = {
      files: [
        './dist/static/js/**/*.js',
      ],
      from: /\.catch\b/g,
      to: '["catch"]',
      encoding: 'utf8',
    }

    replacer(opts).then((changedFiles) => {
      console.log(bgRed('FINAL CHECKING: final replacing '), changedFiles.join(','));
    }).catch((err) => {
      console.error(err);
    });
  }
}

let fc = new FinalCheck();
fc.process();
