# gulp-svgo ![Run tests](https://github.com/pioug/gulp-svgo/workflows/Run%20tests/badge.svg)

## Install

```sh
$ npm i github:shim128/gulp-svgo
```

### Example

```js
const gulp = require("gulp");
const svgo = require("gulp-svgo");

gulp.src("example.svg").pipe(svgo()).pipe(gulp.dest("build"));
```

- See https://github.com/svgo/svgo for more minification options
