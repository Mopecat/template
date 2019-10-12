const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
const analyzer = require("webpack-bundle-analyzer");
const deployConfig = require("./config");
const glob = require("glob");
const path = require("path");
const resolve = file => path.resolve(__dirname, file);
const target = "client";
const isDev = process.env.NODE_ENV && process.env.NODE_ENV.indexOf("dev") > -1;
module.exports = {
  assetsDir: "static",
  publicPath: deployConfig[`${isDev ? "dev" : "build"}`].assetsPublicPath,
  crossorigin: "anonymous",
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: deployConfig.dev.proxyTable,
    disableHostCheck: true,
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    }
  },
  // 将 lint 错误输出为编译错误
  lintOnSave: "error",
  transpileDependencies: [],
  configureWebpack: config => ({
    entry: `./src/module/index.js`,
    target: "web",
    node: false,
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-vendors",
            test: /[\/]node_modules[\/]/,
            priority: 10,
            chunks: "initial" // 只打包初始时依赖的第三方
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.VUE_ENV": `"${target}"`,
        "process.host": getDeployConfigDefine()
      })
    ]
      .concat(
        isDev
          ? []
          : new CopyWebpackPlugin([
              {
                from: resolve("./static"),
                to: resolve("./dist/static"),
                toType: "dir",
                ignore: [".DS_Store"]
              }
            ])
      )
      .concat(getCssSpritesPlugins())
  }),
  chainWebpack: config => {
    // alias
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"));
    config.resolve.modules.add("assets/images/sprites/build");

    config.plugin("html").tap(args => {
      args[0].template = resolve("./src/module/index.html");
      if (!isDev) {
        args[0].filename = "index.jsp";
      }
      return args;
    });

    if (process.env.npm_config_report) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(analyzer.BundleAnalyzerPlugin);
    }
  }
};

// deploy config converter
function getDeployConfigDefine() {
  let config = {};
  Object.keys(deployConfig.env).forEach(function(key) {
    config[key] = `"${deployConfig.env[key]}"`;
  });
  return config;
}

// 解决雪碧图问题
function getCssSpritesPlugins() {
  const path = `src/assets/images/sprites`;
  let plugins = [];
  glob.sync(path + "/*").forEach(dirPath => {
    let name = dirPath.replace(path + "/", "");
    if (name === "build") {
      return;
    }

    let spritesmithPlugin = new SpritesmithPlugin({
      src: {
        cwd: resolve(dirPath),
        glob: "*.png"
      },
      target: {
        image: resolve(`src/assets/images/sprites/build/${name}.png`),
        css: [
          [
            resolve(`src/assets/images/sprites/build/${name}.scss`),
            {
              format: "retinaOnly"
            }
          ]
        ]
      },
      apiOptions: {
        cssImageRef: `~${name}.png`
      },
      spritesmithOptions: {
        padding: 4
      }
    });

    plugins.push(spritesmithPlugin);
  });
  return plugins;
}
