# Creating Metalsmith plugins

For creating a new plugin, start out by adding a folder in the `_lib` directory prefixed with `metalsmith-`.

The basic structure should look like this:

```bash
| - _lib/
    | - metalsmith-plugin/
        | - lib/
            | - index.js
        | - test/
            | - fixtures/
                | - build
                | - src
            | - index.js
        | - package.json
```

In your `package.json`, you should have the following setup:

```json
{
  "name": "metalsmith-plugin",
  "version": "0.1.0",
  "description": "some description",
  "main": "lib/index.js",
  "scripts": {
    "test": "./node_modules/.bin/mocha --reporter spec"
  },
  "author": "dale tan <dale@1stdibs.com> (https://1stdibs.com)",
  "license": "MIT",
  "devDependencies": {
    "metalsmith": "^1.7.0",
    "mocha": "^2.2.5"
  }
}
```

Then you can `require` the code from the `build.js` file:

```js
var plugin = require('./_lib/metalsmith-plugin');
```
