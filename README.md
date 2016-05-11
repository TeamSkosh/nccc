# Northland Christian Counseling Center Website

May 2016

---

Install Node dependencies after changing the working directory to the project root:

```
$ cd nccc

$ npm install
```

Install the correct version of Jekyll via Bundler:

```
$ bundle install
```

Run the project at `http://localhost:4000`

```
$ gulp
```

## Configured Gulp Tasks

Run all the things!
```
$ gulp
```

Compile Sass

```
$ gulp scss
```

Minify Images

```
$ gulp images
```

Run Jekyll

```
$ gulp jekyll
```

Run the dev server (with BrowserSync) at http://localhost:4000`
```
$ gulp serve
```
