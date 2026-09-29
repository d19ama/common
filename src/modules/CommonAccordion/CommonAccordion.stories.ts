import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  DefaultStory,
  MultipleStory,
} from './stories';
import { CommonAccordion } from './';

const meta = {
  title: 'Data Display/CommonAccordion',
  component: CommonAccordion,
} satisfies Meta<typeof CommonAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(args) {
    return {
      components: {
        DefaultStory,
      },
      setup() {
        return {
          args,
        };
      },
      template: '<DefaultStory v-bind="args" />',
    };
  },
};

export const Multiple: Story = {
  args: {},
  render(args) {
    return {
      components: {
        MultipleStory,
      },
      setup() {
        return {
          args,
        };
      },
      template: '<MultipleStory v-bind="args" />',
    };
  },
};
