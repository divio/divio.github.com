import gulp from 'gulp';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
import autoprefixer from 'gulp-autoprefixer'
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import devConfig from './webpack.config';
import productionConfig from './webpack.config.production';

gulp.task('sass', () =>
    gulp.src('sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./')));

gulp.task('icons', () =>
    gulp.src('fonts/src/*.svg')
        .pipe(iconfontCss({
            fontName: 'iconfont',
            fontPath: '../fonts/',
            path: 'sass/libs/_iconfont.scss',
            targetPath: '../sass/components/_iconography.scss'
        }))
        .pipe(iconfont({
            fontName: 'iconfont',
            normalize: true
        }))
        .on('glyphs', function (glyphs, options) {
            gutil.log.bind(glyphs, options);
        })
        .pipe(gulp.dest('fonts/')));

gulp.task('webpack:server', () => {
    new WebpackDevServer(webpack(devConfig), {
        publicPath: devConfig.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    }).listen(process.env.PORT || 3000, '0.0.0.0', function (err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }

        gutil.log('[webpack-dev-server]', 'Listening at localhost:3000');
    });
});

gulp.task('webpack:build', (callback) => {
    webpack(productionConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task('default', ['sass', 'webpack:server'], () => {
    gulp.watch('sass/**/*.scss', ['sass']);
});
