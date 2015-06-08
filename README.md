[metalsmith]: http://www.metalsmith.io/
[markdown]: http://daringfireball.net/projects/markdown/syntax
[yfm]: http://jekyllrb.com/docs/frontmatter/
[gfm]: https://help.github.com/articles/github-flavored-markdown/


# 1stdibs Engineering Blog

The 1stdibs engineering blog. Built with [Metalsmith][metalsmith].

## What comprises of a post?

A post should always be written in [Markdown][markdown] which uses the [Github Flavored Markdown][gfm] version.
You must include [YAML Front Matter (YFM)][yfm] at the very top of your post. The following properties are required in order to make your post render properly:

- `title`: pretty self-explanatory
- `publishDate`: in YYYY-MM-DD format
- `modifiedDate`: in YYYY-MM-DD format
- `template`: most likely just `post.html`
- `collection`: most likely just `posts`

Here is an example of the minimal YFM that you need:

```markdown
---
title: The title of my post
publishDate: 2015-05-27
modifiedDate: 2015-05-28
template: post.html
collection: posts
---
```

## Creating a new post

Your `title` YFM will become the post title on output as a `<h1>` tag so you should not include an additional `<h1>` header. It will also be used when creating any links.

### Create a new file

Naming convention: `YYYY-MM-DD-title-here.md`
Example: 2015-05-27-my-post-title.md

### Add YAML Front Matter

At least add the YFM from above. Other properties that can be added (though some implementation may be TBD):

- `tags`: comma delimited list of tags. there is no master list. You'll need to check the individual posts
- `drafts`: if `true`, it will not be published, but viewable in dev mode
- social media handles: `twitter`, `instagram`, `github` 

### Submit a pull request

Get it reviewed.

## Topics

Create a new Github issue. This way it's more visible engineering-wide.

## Troubleshooting

If you run `npm start` (aliased to `node build`) and see the following (or similar) issue:

```bash
[metalsmith-watch] ✔︎ Watching _src/**/*
[metalsmith-watch] ✔︎ Watching _templates/**/*
[metalsmith-serve] serving /blog/_build at http://localhost:9999

/blog/build.js:105
            throw err;
                  ^
Error: Failed to write the file at: /my-blog-post/index.html

EACCES, mkdir '/my-blog-post'
```

Make sure that you have all of the required YFM in your post. One culprit could be not having the `collection` property.

# Roadmap (aka add this functionality) in no specific order

- Post pagination (metalsmith-collections-paginate plugin?)
- Create a page that groups articles under their respective author
- Add more functionality to the YFM and displaying appropriately (ie author social media links)
- Figure out the issue when using metalsmith-jquery (no ticket filed on github yet)
- Add a "tags" page (would require updating posts with tags info)
