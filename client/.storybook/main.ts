import type { StorybookConfig } from "@storybook/react-webpack5";
import path from 'path';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
  webpackFinal(config) {
    if (!config.resolve) {
      config.resolve = {};
    }

    config.resolve.alias = {
      ...config.resolve?.alias,
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@app': path.resolve(__dirname, '../src/app'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@widgets': path.resolve(__dirname, '../src/widgets'),
      '@features': path.resolve(__dirname, '../src/features'),
      '@entities': path.resolve(__dirname, '../src/entities'),
      '@shared': path.resolve(__dirname, '../src/shared'),
    }

    return config;
  }
};
export default config;
