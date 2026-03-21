import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { CommonImage } from './';

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
  },
  args: {
    flat: false,
  },
} satisfies Meta<typeof CommonImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i1.sndcdn.com/artworks-000125697915-3ok8i4-t500x500.jpg',
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
