import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonImage,
  type CommonImageObjectFit,
} from './';

const meta = {
  title: 'Data Display/CommonImage',
  component: CommonImage,
  argTypes: {
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    flat: {
      control: 'boolean',
    },
    objectFit: {
      control: 'select',
      options: [
        'fill',
        'cover',
        'contain',
        'scale-down',
        'none',
      ] satisfies CommonImageObjectFit[],
    },
  },
  args: {
    flat: false,
    objectFit: 'cover',
  },
} satisfies Meta<typeof CommonImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://avatars.mds.yandex.net/i?id=c224fff1a5154f100f7ab72bb7bfdf04_l-4255244-images-thumbs&n=13',
    alt: 'Image',
  },
  render(args) {
    return {
      components: {
        CommonImage,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonImage
          v-bind="args"
          style="width: 300px; height: 300px;"
        />
      `,
    };
  },
};
