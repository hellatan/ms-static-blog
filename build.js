/**
 * User: daletan
 * Date: 5/22/15
 * Time: 2:40 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var PORT = process.env.PORT || 9999;
var IS_PROD = process.env.NODE_ENV === 'prod';
var IGNORE_DRAFTS = process.env.IGNORE_DRAFTS;
var gulp = require('gulp');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var scss = require('metalsmith-sass');
var drafts = require('metalsmith-drafts');
var collections = require('metalsmith-collections');
var excerpts = require('metalsmith-excerpts');

var pageTitles = require('metalsmith-page-titles');

var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var tags = require('metalsmith-tags');
var dateFormatter = require('./_lib/metalsmith-date-formatter');

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
            // this will change once this becomes a github page, instead of github project
            assetsRoot: IS_PROD ? '/ms-static-blog' : '/'
        },
        currentYear: new Date().getFullYear()
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
    // remove any article with the
    .use(drafts({
        publish: IS_PROD || IGNORE_DRAFTS ? false : true
    }))
    .use(excerpts())
    .use(collections({
        posts: {
            sortBy: 'data',
            reverse: true
        }
    }))
    .use(pageTitles())
    .use(dateFormatter())
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(templates({
        "engine": "nunjucks",
        "directory": "./_templates"
    }))
    // need to keep `tags` after `templates` b/c of some
    // "directory"/"template" issues, need to dig in
    //.use(tags({
    //    handle: 'tags',
    //    path: 'topics/:tag.html',
    //    template: '_templates/tags.html',
    //    sortBy: 'date',
    //    reverse: true
    //}))
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

