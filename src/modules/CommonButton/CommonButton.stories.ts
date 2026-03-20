import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonButton,
  type CommonButtonSize,
  type CommonButtonTextStyle,
  type CommonButtonTheme,
} from './';
import type { CommonButtonThemeStyle } from '@/modules/CommonButton/types';

const meta = {
  title: 'Actions/CommonButton',
  component: CommonButton,
  argTypes: {
    autoWidth: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
      ] satisfies CommonButtonSize[],
    },
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'unaccented',
        'transparent',
        'icon',
      ] satisfies CommonButtonTheme[],
    },
    themeStyle: {
      control: 'select',
      options: [
        'fill',
        'outline',
      ] satisfies CommonButtonThemeStyle[],
    },
    textStyle: {
      control: 'select',
      options: [
        'text',
        'theme',
        'inverted',
      ] satisfies CommonButtonTextStyle[],
    },
  },
  args: {
    autoWidth: true,
    theme: 'primary',
    themeStyle: 'fill',
    textStyle: 'theme',
  },
} satisfies Meta<typeof CommonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return {
      components: {
        CommonButton,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonButton v-bind="args">
          Button
        </CommonButton>
      `,
    };
  },
  args: {},
};
