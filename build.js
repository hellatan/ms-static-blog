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
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var scss = require('metalsmith-sass');
var drafts = require('metalsmith-drafts');
var collections = require('metalsmith-collections');
var excerpts = require('metalsmith-excerpts');

var pageTitles = require('metalsmith-page-titles');
var archive = require('metalsmith-archive')

var codeHighlight = require('metalsmith-code-highlight');

var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var tags = require('metalsmith-tags');
var dateFormatter = require('metalsmith-date-formatter');

var wordCount = require('metalsmith-word-count');

var fs = require('fs-extra');

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
            assetsRoot: '/'
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
    .destination('./_build')
    .use(wordCount())
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
            sortBy: 'publishDate',
            reverse: true
        }
    }))
    .use(permalinks({
        pattern: ':collection/:title',
        relative: false
    }))
    .use(archive({
        collections: 'posts',
        groupByMonth: true
    }))
    .use(scss({
        // do not use `outputDir` option - it will remove any sort of file structure in the src files
        outputStyle: IS_PROD ? 'compressed' : 'expanded',
        sourceMap: true,
        sourceMapContents: true,
        files: ['./_src/scss/**/*.scss']
    }))
    // todo: add comment to npm module that `pageTitles` and `dateFormatter` must above `templates`
    .use(pageTitles())
    .use(dateFormatter())
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
    .use(codeHighlight())
    .use(serve({
        port: PORT,
        verbose: true
    }))
    .build(function(err) {
        console.log('building');
        if (err) {
            if (err.message) {
                err = err.message;
            }
            throw err;
        }
        console.log('built');

        if (IS_PROD) {
            fs.copy('./_build', './', function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log('moved _build content');
                process.exit();
            });
        }
    });

