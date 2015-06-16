---
title: Constructing the 1stdibs Engineering blog
publishDate: 2015-05-27
modifiedDate: 2015-06-15
template: post.html
collection: posts
author: dale tan
github: hellatan
instagram: hellatan
---

[bar51-status]: https://twitter.com/_bar51/status/599228508678844416
[gh-pages]: https://pages.github.com/
[gh-pages-org]: https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages
[gh-jekyll]: https://help.github.com/articles/using-jekyll-with-pages/
[hexo]: https://hexo.io
[ghost]: https://ghost.org
[react-static]: http://braddenver.com/blog/2015/react-static-site.html
[metalsmith]: http://metalsmith.io
[harp]: http://harpjs.com/
[hella-twitter]: https://twitter.com/hellatan
[fs-extra]: https://www.npmjs.com/package/fs-extra
[metalsmith-archive]: https://github.com/hellatan/metalsmith-archive
[metalsmith-date-formatter]: https://github.com/hellatan/metalsmith-date-formatter
[metalsmith-page-titles]: https://github.com/hellatan/metalsmith-page-titles 


After many fleeting discussions and false starts, the 1stdibs engineering blog has finally come to fruition.

Since we use GitHub to host our code repositories, it was only natural to take advantage of their [GitHub Pages][gh-pages] for [Organizations][gh-pages-org]. Based on their recommendation for creating such pages, I immediately went down the route of investigating [Jekyll][gh-jekyll]. 

Despite jumping right in, I was still rather reluctant to really look into Jekyll to begin with since I'm not a ruby fan (maybe that also slightly explains the delay). However, Jekyll is a rather powerful static site generator that seems to have a lot of functionality either baked in or that can be pulled from the open-source community. I still stuck through with it for a few days but it still just didn't feel right. On the front-end at 1stdibs, we are ultimately a JavaScript shop (with PHP mixed in...) and I come from a strict front-end background so JS is what I know and it's what I love to program with. Our front-end team is all about it as well so it felt more natural to create this using a JavaScript solution. 

I searched around and was looking into different tools like [hexo][hexo], [ghost][ghost], and [harp][harp] amongst others and even considered [rolling my own][react-static] (mainly to play with react), but they just didn't seem to fit quite right to do what I wanted to get accomplished. Hexo and ghost look to be a couple promising node.js systems but both seem to be better suited as a standalone server. Harp seemed like a pretty decent static site generator (GitHub pages is even touted on their homepage) but it was a little too opinionated for my liking (allowing only jade -*barf*- and ejs as their templating systems). Maybe I missed something, but it seemed kind of hard to extend. When you go with rolling your own solution, it just takes a lot of time and effort that can be spent elsewhere (like getting our [kegbot up and running][bar51-status]). Pre-existing solutions help get the job done at a much quicker pace and removes a lot of biolerplate that you shouldnt have to deal with.

Doing more research and fiddling around with those previous solutions, I ended going with [Metalsmith][metalsmith]. Well, it was actually my second time around with it since I also investigated it with my initial research. I think the biggest thing that drew me back to Metalsmith was the plugin extensibility. 

While my first go at Metalsmith felt more like just hacking away, the second go let me get a better feel for how Metalsmith actually operated under the hood. To me, it felt kind of like a mashup of express middleware (plugin in Metalsmith land) and the gulp pipeline in terms of how the "request" object is affected by each individual plugin that is used; one plugin can affect a subsequent plugin if not used properly. Kind of an annoyance of middleware, but you just need to keep an eye out for it. 

Once I had a good sense for the plugin system, I still ran into a few snafus like accidentally deleting the entire project while trying to run a build to the project root folder (hint - always use `Metalsmith.clean(false).destination('.')` if you want to do that) and then figuring out the best way to go about having a build that could be handled by GitHub static pages without exposing any source code.

To accomplish the latter of my main issue, I ended up using the [`fs-extra`][fs-extra] node module that basically extends the built-in node `fs` module. The only functionality that I needed was moving the contents of one directory into another. Once that was complete and handled, the blog started to really take shape.

From there it was a matter of looking for additional plugins needed for building out the site as well as creating any custom plugins to fill in any gaps. Out of this initial go with Metalsmith, three plugins were created - [Metalsmith Archive Page][metalsmith-archive], [Metalsmith Date Formatter][metalsmith-date-formatter], and [Metalsmtih Page Titles][metalsmith-page-titles]. As this blog grows, I'm sure there will be additional functionality that will need to be hooked up or created at which point there will be more open-source goodness coming from us.

As a TL;DR, here is the setup and code used to generate this site:

./package.json:

```json
{
  "name": "ms-static-blog",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node build",
    "build": "NODE_ENV=prod npm start",
    "ignore-drafts": "IGNORE_DRAFTS=true node build"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/hellatan/ms-static-blog.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/hellatan/ms-static-blog/issues"
  },
  "homepage": "https://github.com/hellatan/ms-static-blog",
  "devDependencies": {
    "fs-extra": "^0.18.4",
    "metalsmith": "^1.7.0",
    "metalsmith-archive": "^0.1.1",
    "metalsmith-code-highlight": "git://github.com/hellatan/metalsmith-code-highlight.git#feature-add-class",
    "metalsmith-collections": "^0.7.0",
    "metalsmith-date-formatter": "^1.0.2",
    "metalsmith-drafts": "0.0.1",
    "metalsmith-excerpts": "^1.0.0",
    "metalsmith-jquery": "0.0.1",
    "metalsmith-markdown": "^0.2.1",
    "metalsmith-page-titles": "^1.0.1",
    "metalsmith-permalinks": "^0.4.0",
    "metalsmith-sass": "^1.1.0",
    "metalsmith-serve": "0.0.3",
    "metalsmith-tags": "^0.9.0",
    "metalsmith-templates": "^0.7.0",
    "metalsmith-watch": "^1.0.1",
    "metalsmith-word-count": "0.0.4",
    "nunjucks": "^1.3.4"
  }
}
```

./build.js:

```js
'use strict';


var PORT            = process.env.PORT || 9999;
var IS_PROD         = process.env.NODE_ENV === 'prod';
var IGNORE_DRAFTS   = process.env.IGNORE_DRAFTS;
var Metalsmith      = require('metalsmith');
var markdown        = require('metalsmith-markdown');
var templates       = require('metalsmith-templates');
var permalinks      = require('metalsmith-permalinks');
var scss            = require('metalsmith-sass');
var drafts          = require('metalsmith-drafts');
var collections     = require('metalsmith-collections');
var excerpts        = require('metalsmith-excerpts');
var pageTitles      = require('metalsmith-page-titles');
var archive         = require('metalsmith-archive')
var codeHighlight   = require('metalsmith-code-highlight');
var serve           = require('metalsmith-serve');
var watch           = require('metalsmith-watch');
var tags            = require('metalsmith-tags');
var dateFormatter   = require('metalsmith-date-formatter');
var wordCount       = require('metalsmith-word-count');
var fs              = require('fs-extra');

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

```
