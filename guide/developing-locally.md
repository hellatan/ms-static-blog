# Developing locally

## Development Mode

```bash
$ npm install
$ npm start
[metalsmith-serve] serving /ms-static-blog/_build at http://localhost:9999
```

## Production Mode

When you're ready to publish any updates:

```bash
$ git checkout -b my-article-for-review
$ npm run build
```

Then commit any relevant changes and push them up to GitHub. 

The build process ends up moving anything from the dynamically created `./_build` folder and moves it all up one level to the root of the project.
This is done since GitHub pages everything from the root of the repo but it will ignore any folder with a leading underscore in its name.

Just an example of how the folder structure may look after doing a PROD build:

```bash
| - _build
    | - css
        | - pages
            | - post.css
            | - home.css
        | - main.css
    | - fonts
    | - images
    | - posts
        | - constructing-the-1stdibs-engineering-blog
            | - index.html
| - css
    | - pages
        | - post.css
        | - home.css
| - fonts 
| - images 
| - posts
    | - constructing-the-1stdibs-engineering-blog
        | - index.html
```

### Draft Mode

If you want to keep your article in Draft mode, add `draft: true` to your YFM. You will need to 
