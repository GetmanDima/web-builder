import React from "react";
import type { Preview } from "@storybook/react";
import "@assets/style/build/tailwind.css";

const preview: Preview = {
  parameters: {
    darkMode: {
      current: 'dark'
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{backgroundColor: '#374151', padding: '40px'}}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
