const browserSync = require('browser-sync').create();
const child = require('child_process');
const concat = require('gulp-concat');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gutil = require('gulp-util');
const maps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const scss = require('gulp-sass');

const paths = {
    'dist': {
        'css': 'css',
        'img': 'img',
        'fonts': 'fonts'
    },
    'siteRoot': '_site',
    'src': {
        'css': 'css',
        'img': '_img/**/*',
        'fa_styles': 'node_modules/font-awesome/css/font-awesome.min.css',
        'fa_fonts': 'node_modules/font-awesome/fonts/*',
        'scss': '_sass/**/*.scss'
    }
};

gulp.task('default', ['scss', 'images', 'fa', 'jekyll', 'serve']);

gulp.task('fa', ['fa_styles', 'fa_fonts']);

gulp.task('fa_styles', () => {
    return gulp.src(paths.src.fa_styles)
    .pipe(gulp.dest(paths.dist.css))
});

gulp.task('fa_fonts', () => {
    return gulp.src(paths.src.fa_fonts)
    .pipe(gulp.dest(paths.dist.fonts))
});

gulp.task('images', () => {
    return gulp.src('_img/**/*')
    .pipe(newer(paths.dist.img))
    .pipe(imagemin()
    .on('error', e => {
        gutil.log('Imagemin Error: ' + e)
    }))
    .pipe(gulp.dest(paths.dist.img));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('scss', () => {
    gulp.src(paths.src.scss)
        .pipe(maps.init())
        .pipe(scss({
            outputStyle: 'expanded'
        })
        .on('error', scss.logError))
        .pipe(concat('main.min.css'))
        .pipe(maps.write())
        .pipe(gulp.dest(paths.src.css));
});

gulp.task('serve', () => {
  browserSync.init({
    files: [paths.siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: paths.siteRoot
    }
  });

  gulp.watch(paths.src.scss, ['scss']);
  gulp.watch(paths.src.img, ['images']);
});
