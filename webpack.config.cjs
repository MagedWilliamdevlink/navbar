const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const path = require("path");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "isomorphic-mf",
    projectName: "navbar",
    webpackConfigEnv,
  });

  const serverConfig = singleSpaDefaults({
    orgName: "isomorphic-mf",
    projectName: "navbar",
    webpackConfigEnv,
  });

  // Remove CleanWebpackPlugin if not needed
  defaultConfig.plugins = defaultConfig.plugins.filter(
    (p) => p.constructor.name !== "CleanWebpackPlugin"
  );
  serverConfig.plugins = serverConfig.plugins.filter(
    (p) => p.constructor.name !== "CleanWebpackPlugin"
  );

  return [
    webpackMerge.smart(defaultConfig, {}),
    webpackMerge.smart(serverConfig, {
      target: "node", // Ensure you're targeting Node.js
      mode: "development",
      entry: path.resolve(process.cwd(), "src/node-entry.js"),
      output: {
        filename: "server.mjs",
        library: "mf",
        libraryTarget: "commonjs2",
        chunkFormat: "module", // Use CommonJS format for chunked modules
      },
      externals: defaultConfig.externals.concat(/react-dom\/.+/),
    }),
  ];
};