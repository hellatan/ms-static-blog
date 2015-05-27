[metalsmith]: http://www.metalsmith.io/
[markdown]: http://daringfireball.net/projects/markdown/syntax
[yfm]: http://jekyllrb.com/docs/frontmatter/
[gfm]: https://help.github.com/articles/github-flavored-markdown/


# 1stdibs Engineering Blog

The 1stdibs engineering blog. Built with [Metalsmith][metalsmith].

## What comprises of a post?

A post should always be written in [Markdown][markdown] but also uses [Github Flavored Markdown][gfm].
You must include [YAML Front Matter (YFM)][yfm] at the very top of your post. The following properties are required in order to make your post render properly:

- `title`: pretty self-explanatory
- `date`: in YYYY-MM-DD format)
- `template`: most likely just `post.html`
- `collection`: most likely just `posts`

Here is an example of the minimal YFM that you need:

```markdown
---
title: The title of my post
date: 2015-05-27
template: post.html
collection: posts
---
```

## Creating a new post

### Create a new file
Naming convention: `YYYY-MM-DD-title-here.md`
Example: 2015-05-27-my-post-title.md

### Add YAML Front Matter

At least add the YFM from above. Other properties that can be added:

- `tags`: comma delimited list of tags. there is no master list. You'll need to check the individual posts
- `drafts`: if `true`, it will not be published, but viewable in dev mode

### Submit a pull request

Get it reviewed. That is all.

## Topics

Create a new Github issue. This way it's more visible engineering-wide.

