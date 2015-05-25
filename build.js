/**
 * User: daletan
 * Date: 5/22/15
 * Time: 2:40 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var gulp = require('gulp');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var scss = require('metalsmith-sass');
//var server = require('metalsmith-serve');
//var collections = require('metalsmith-collections');

Metalsmith(__dirname)
    .metadata({
        title: '1stdibs Engineering',
        url: 'http://codeat1stdibs.com'
    })
    .source('./_src')
    .use(scss({
        outputStyle: 'expanded',
        // relative to .destination() path
        outputDir: '../css'
    }))
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(templates({
        "engine": "nunjucks",
        "directory": "./_templates"
    }))
    // .clean(false).destination('.') MUST
    // be used in conjunction with one another
    .clean(false)
    .destination('.')
    .build(function(err) {
        if (err) {
            throw err;
        }
        console.log('built');
    });

