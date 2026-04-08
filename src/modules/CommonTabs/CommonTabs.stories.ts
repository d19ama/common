import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { ref } from 'vue';
import { CommonTabs } from './';

const meta = {
  title: 'Data Display/CommonTabs',
  component: CommonTabs as unknown as Record<string, any>,
  argTypes: {},
  args: {},
} satisfies Meta<typeof CommonTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      {
        id: '1',
        active: true,
        label: 'Tab 1',
      },
      {
        id: '2',
        active: false,
        label: 'Tab 2',
      },
      {
        id: '3',
        active: false,
        label: 'Tab 3',
      },
      {
        id: '4',
        active: false,
        disabled: true,
        label: 'Tab 4',
      },
    ],
  },
  render(args) {
    return {
      components: {
        CommonTabs: CommonTabs as unknown as Record<string, any>,
      },
      setup() {
        const activeTab = ref('1');

        return {
          args,
          activeTab,
        };
      },
      template: `
        <CommonTabs
          v-model:tabs="args.tabs"
          @change:tab="activeTab = $event"
          v-bind="args"
        />
        <br/>
        <div v-if="activeTab === '1'">Tab content 1</div>
        <div v-if="activeTab === '2'">Tab content 2</div>
        <div v-if="activeTab === '3'">Tab content 3</div>
        <div v-if="activeTab === '4'">Tab content 4</div>
      `,
    };
  },
};
