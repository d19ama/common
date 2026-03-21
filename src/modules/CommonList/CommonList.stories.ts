import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonList,
  type CommonListTags,
} from './';

const meta = {
  title: 'Data Display/CommonList',
  component: CommonList,
  argTypes: {
    marker: {
      control: 'text',
    },
    noMarkers: {
      control: 'boolean',
    },
    tag: {
      control: 'radio',
      options: [
        'ul',
        'ol',
      ] satisfies CommonListTags[],
    },
  },
  args: {
    tag: 'ul',
    noMarkers: false,
  },
} satisfies Meta<typeof CommonList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        label: 'Label 1',
      },
      {
        id: '2',
        label: 'Label 2',
      },
    ],
  },
  render(args) {
    return {
      components: {
        CommonList,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonList v-bind="args" />
      `,
    };
  },
};
