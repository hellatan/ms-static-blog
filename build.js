/**
 * User: daletan
 * Date: 5/22/15
 * Time: 2:40 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var IS_PROD = process.env.NODE_ENV === 'prod';
var gulp = require('gulp');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var scss = require('metalsmith-sass');
var pageTitles = require('./_lib/metalsmith-page-titles');

//var server = require('metalsmith-serve');
//var collections = require('metalsmith-collections');

Metalsmith(__dirname)
    .metadata({
        site: {
            title: '1stdibs Engineering - The most beautiful code on earth',
            url: 'http://codeat1stdibs.com'
        }
    })
    .source('./_src')
    // .clean(false).destination('.') MUST
    // be used in conjunction with one another
    // otherwise this entire project will
    // get the `rm -rf ./` treatment
    .clean(false)
    .destination('.')
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .use(pageTitles())
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(templates({
        "engine": "nunjucks",
        "directory": "./_templates"
    }))
    .use(scss({
        outputStyle: IS_PROD ? 'compressed' : 'expanded',
        // relative to .destination() path
        outputDir: './css',
        sourceMap: true,
        sourceMapContents: true
    }))
    .build(function(err) {
        if (err) {
            throw err;
        }
        console.log('built');
    });

