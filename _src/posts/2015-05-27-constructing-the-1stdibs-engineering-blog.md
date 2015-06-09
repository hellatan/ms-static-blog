---
title: Constructing the 1stdibs Engineering blog
publishDate: 2015-05-27
modifiedDate: 2015-05-29
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

After many fleeting discussions and false starts, the 1stdibs engineering blog has finally come to fruition.

Since we use GitHub to host our code repositories, it was only natural to take advantage of their [GitHub Pages][gh-pages] for [Organizations][gh-pages-org]. Based on their recommendation for creating such pages, I immediately went down the route of investigating [Jekyll][gh-jekyll]. 

Despite jumping right in, I was still rather reluctant to really look into Jekyll to begin with since I'm not a ruby fan (maybe that also slightly explains the delay). However, Jekyll is a rather powerful static site generator that seems to have a lot of functionality either baked in or that can be pulled from the open-source community. I still stuck through with it for a few days and it just didn't feel right. On the front-end at 1stdibs, we are ultimately a JavaScript shop (with PHP mixed in...) and I come from a strict front-end background so JS is what I know and it's what I love to program with. Our front-end team is all about it as well so it felt more natural to create this using a JavaScript solution. 

I searched around and was looking into different tools like [hexo][hexo], [ghost][ghost], and [harp][harp] amongst others and even considered [rolling my own][react-static] (mainly to play with react), but they just didn't seem to fit quite right to do what I wanted to get accomplished. Hexo and ghost look to be a couple promising node.js systems but both seem to be better suited as a standalone server. Harp seemed like a pretty decent static site generator but it was a little too opinionated for my liking (allowing only jade -*barf*- and ejs as their templating systems). And then rolling your own solution just takes a lot of time and effort that can be spent elsewhere (like getting our [kegbot up and running][bar51-status]). Pre-existing solutions help get the job done at a much quicker pace.

After doing more research and fiddling around with those previous solutions, I ended going with [Metalsmith][metalsmith]. Well, it was actually my second time around with it since I did that in my initial research. I think the biggest thing that drew me back to Metalsmith is the plugin extensibility. 

While my first go at Metalsmith felt more like just hacking away, the second go let me get a better feel for how Metalsmith actually operated under the hood. To me, it feels kind of like a mashup of express middleware (plugin in Metalsmith land) and gulp pipeline in terms of how the "request" object is affect by each additional plugin that is used. One plugin can affect a subsequent plugin if not used properly. Kind of an annoyance of middleware, but you just need to keep an eye out for it. 

After having a good sense for the plugin system, I still ran into a few snafus like accidentally deleting the entire project while trying to run a build to the project root folder (hint - always use `.clean(false).destination('.')` if you want to do that) and figuring out the best way to go about having a build that could be handled by GitHub static pages without exposing any source code.

To accomplish the latter of my main issuse, I ended up using the `fs-extra` node module that basically extends the built-in node `fs` module. The only functionality that I needed was moving the contents of one directory into another. Once that was complete and handled, the blog started to really take shape.

Like I originally mentioned, Metalsmith takes in plugins to manipulate the main output object. In order to get (at least) the first iteration of the blog done, these were the plugins used (reasoning further down):

```js
"fs-extra":                     "^0.18.4",
"metalsmith":                   "^1.7.0",
"metalsmith-collections":       "^0.7.0",
"metalsmith-date-formatter":    "^1.0.1",
"metalsmith-drafts":            "0.0.1",
"metalsmith-excerpts":          "^1.0.0",
"metalsmith-jquery":            "0.0.2",
"metalsmith-markdown":          "^0.2.1",
"metalsmith-page-titles":       "^1.0.1",
"metalsmith-permalinks":        "^0.4.0",
"metalsmith-sass":              "^0.7.0",
"metalsmith-serve":             "0.0.3",
"metalsmith-tags":              "^0.9.0",
"metalsmith-templates":         "^0.7.0",
"metalsmith-watch":             "^1.0.1",
"nunjucks":                     "^1.3.4"
```

```js
"fs-extra": "^0.18.4",
```
As mentioned above, this was only used to move files from our `_build` directory up to the root as a post-build step. I couldn't figure out a good way to move files from our output directory via metalsmith (feel free to hit me up on [twitter][hella-twitter] if you know otherwise) but I literally run:

```js
fs.copy('./_build', './', callback);
```

to move those files so this blog plays nice with GitHub Pages.

```js
"metalsmith": "^1.7.0",
```

The main library. At this point we're using version 1.7.0.

```js
"metalsmith-date-formatter": "^1.0.1",
```

```js
"metalsmith-drafts": "0.0.1",
```

```js
"metalsmith-excerpts": "^1.0.0",
```

```js
"metalsmith-jquery": "0.0.2",
```
There's a caveat to this one in that it technically isn't currently being used but I think it's still worthwhile to point out some issues I ran into. - I was originally going to use the `metalsmith-jquery` plugin and submitted a small patch to it, but for some reason, it doesn't play nice with the `metalsmith-sass` plugin so I just ditched the jquery plugin since I could work around not having classes on my content elements; something I'm not a big fan of, but for time sake, this was the path of least resistance.

```js
"metalsmith-markdown": "^0.2.1",
```

```js
"metalsmith-page-titles": "^1.0.1",
```

```js
"metalsmith-permalinks": "^0.4.0",
```

```js
"metalsmith-sass": "^0.7.0",
```

```js
"metalsmith-serve": "0.0.3",
```

```js
"metalsmith-tags": "^0.9.0",
```

```js
"metalsmith-templates": "^0.7.0",
```

```js
"metalsmith-watch": "^1.0.1",
```

```js
"nunjucks": "^1.3.4"
```
The templating for this site isn't anything crazy so I decided to try out nunjucks. It looks very similar to the php templating engine `twig` and its JS equivelant, `swig`. I'm not really sold on using it since it's such a slim implementation/usage of it.


