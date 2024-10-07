/** @type {import('next').NextConfig} */
const {
  BugsnagSourceMapUploaderPlugin,
  BugsnagBuildReporterPlugin,
} = require("webpack-bugsnag-plugins");
const { execSync } = require("child_process");

console.log("process.env.CI: ", process.env.CI);
console.log("process.env.CI: ", Boolean(Number(process.env.CI)));

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
  webpack: (config, { isServer, dev, buildId }) => {
    if (!isServer && !dev && Boolean(Number(process.env.CI))) {
      new BugsnagBuildReporterPlugin({
        apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
        appVersion: buildId,
      });
      config.devtool = "source-map";
      config.plugins.push(
        new BugsnagSourceMapUploaderPlugin({
          apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
          appVersion: buildId,
          overwrite: true,
          publicPath: "*/_next/",
        }),
      );
    }
    return config;
  },
};

module.exports = nextConfig;
