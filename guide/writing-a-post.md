[markdown]: http://daringfireball.net/projects/markdown/syntax
[yfm]: http://jekyllrb.com/docs/frontmatter/
[gfm]: https://help.github.com/articles/github-flavored-markdown/

# Writing a post

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
