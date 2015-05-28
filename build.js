/**
 * User: daletan
 * Date: 5/22/15
 * Time: 2:40 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var PORT = process.env.PORT || 9999;
var IS_PROD = process.env.NODE_ENV === 'prod';
var gulp = require('gulp');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var scss = require('metalsmith-sass');
var drafts = require('metalsmith-drafts');
var collections = require('metalsmith-collections');

var pageTitles = require('metalsmith-page-titles');

var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

var M = Metalsmith(__dirname);

if (!IS_PROD) {
    M.use(watch(
        {
            paths: {
                "${source}/**/*": "**/*",
                "_templates/**/*": "**/*"
            },
            livereload: true
        }
    ));
}

M.metadata({
        IS_PROD: IS_PROD,
        site: {
            title: '1stdibs Engineering - The most beautiful code on earth',
            url: 'http://codeat1stdibs.com',
            assetsRoot: IS_PROD ? '/ms-static-blog' : ''
        }
    })
    .source('./_src')
    // .clean(false).destination('.') MUST
    // be used in conjunction with one another
    // otherwise this entire project will
    // get the `rm -rf ./` treatment
    // .clean(false)
    // .destination('.')
    .destination('_build')
    .use(markdown({
        smartypants: true,
        // github flavored markdown
        gfm: true,
        tables: true
    }))
    .use(collections({
        posts: {
            sortBy: 'data',
            reverse: true
        }
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
    .use(serve({
        port: PORT,
        verbose: true
    }))
    .build(function(err) {
        if (err) {
            throw err;
        }
        console.log('built');
    });

