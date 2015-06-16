# Troubleshooting

## EACCES, mkdir '/some-directory'

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

## My post shows up out of order on the homepage

Make sure you have `publishDate` set in your YFM. This is the property posts are ordered in.
