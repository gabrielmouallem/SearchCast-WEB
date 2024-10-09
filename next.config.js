/** @type {import('next').NextConfig} */
const {
  BugsnagSourceMapUploaderPlugin,
  BugsnagBuildReporterPlugin,
} = require("webpack-bugsnag-plugins");
const { DeleteSourceMapsPlugin } = require("webpack-delete-sourcemaps-plugin");
const { execSync } = require("child_process");

const nextConfig = {
  images: {
    domains: ["*", "i.ytimg.com", "fakeimg.pl"],
  },
  generateBuildId: () => {
    try {
      return `searchcast-${
        process.env.VERCEL_GIT_COMMIT_SHA ??
        execSync("git rev-parse HEAD").toString().trim()
      }`;
    } catch (error) {
      console.warn("Failed to generate build ID from git commit hash:", error);
      return null;
    }
  },
  productionBrowserSourceMaps: Boolean(Number(process.env.CI)),
  webpack: (config, { isServer, dev, buildId, webpack }) => {
    // Add the DefinePlugin to set NEXT_BUILD_ID
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NEXT_PUBLIC_BUILD_ID": JSON.stringify(buildId),
      }),
    );

    if (!isServer && !dev && Boolean(Number(process.env.CI))) {
      config.devtool = "hidden-source-map";
      new BugsnagBuildReporterPlugin({
        apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
        appVersion: buildId,
      });
      config.plugins.push(
        new BugsnagSourceMapUploaderPlugin({
          apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
          appVersion: buildId,
          overwrite: true,
          publicPath: "*/_next/",
        }),
      );
      config.plugins.push(
        new DeleteSourceMapsPlugin({ isServer, keepServerSourcemaps: true }),
      );
    }
    return config;
  },
};

module.exports = nextConfig;
