import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonCheckbox,
  type CommonCheckboxProps,
  type CommonCheckboxTheme,
} from './';

const meta = {
  title: 'Form/CommonCheckbox',
  component: CommonCheckbox,
  argTypes: {
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'unaccented',
        'form',
      ] satisfies CommonCheckboxTheme[],
    },
    size: {
      control: 'radio',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
      ] satisfies CommonCheckboxProps['size'][],
    },
  },
  args: {
    size: 'md',
    theme: 'form',
    disabled: false,
    required: false,
  },
} satisfies Meta<typeof CommonCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
  render(args) {
    return {
      components: {
        CommonCheckbox,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonCheckbox
          v-model:checked="args.checked"
          v-bind="args"
        >
          {{ args.text || 'Typical checkbox' }}
        </CommonCheckbox>
      `,
    };
  },
};
