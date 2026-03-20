import type { Preview } from '@storybook/vue3-vite';

import '../src/assets/styles/fonts/index.scss';
import '../src/assets/styles/main.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    backgrounds: {
      default: 'white',
    },

    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Data',
          'Form',
          'Actions',
          'Layout',
        ],
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
