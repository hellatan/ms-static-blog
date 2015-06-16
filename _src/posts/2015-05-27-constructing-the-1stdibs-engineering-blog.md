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

After doing more research and fiddling around with those previous solutions, I ended going with [Metalsmith][metalsmith]. Well, it was actually my second time around with it since I also investigated it with my initial research. I think the biggest thing that drew me back to Metalsmith was the plugin extensibility. 

While my first go at Metalsmith felt more like just hacking away, the second go let me get a better feel for how Metalsmith actually operated under the hood. To me, it felt kind of like a mashup of express middleware (plugin in Metalsmith land) and the gulp pipeline in terms of how the "request" object is affected by each individual plugin that is used; one plugin can affect a subsequent plugin if not used properly. Kind of an annoyance of middleware, but you just need to keep an eye out for it. 

After having a good sense for the plugin system, I still ran into a few snafus like accidentally deleting the entire project while trying to run a build to the project root folder (hint - always use `Metalsmith.clean(false).destination('.')` if you want to do that) and then figuring out the best way to go about having a build that could be handled by GitHub static pages without exposing any source code.

To accomplish the latter of my main issue, I ended up using the [`fs-extra`][fs-extra] node module that basically extends the built-in node `fs` module. The only functionality that I needed was moving the contents of one directory into another. Once that was complete and handled, the blog started to really take shape.

From there it was a matter of looking for additional plugins needed for building out the site as well as creating any custom plugins to fill in any gaps. Out of this initial go with Metalsmith, three plugins were created - [Metalsmith Archive Page][metalsmith-archive], [Metalsmith Date Formatter][metalsmith-date-formatter], and [Metalsmtih Page Titles][metalsmith-page-titles]. As this blog grows, I'm sure there will be additional functionality that will need to be hooked up or created at which point there will be more open-source goodness coming from us.
