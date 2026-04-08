import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonTable,
  type CommonTableHeader,
  type CommonTableRow,
} from './';

type TableData = {
  id: string;
  one: string;
  two: string;
  three: string;
};

const meta = {
  title: 'Data Display/CommonTable',
  component: CommonTable as unknown as Record<string, any>,
  argTypes: {
    hideHeader: {
      control: 'boolean',
    },
  },
  args: {
    hideHeader: false,
  },
} satisfies Meta<typeof CommonTable<TableData>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headers: [
      {
        id: '1',
        name: 'one',
        label: 'Column one',
      },
      {
        id: '2',
        name: 'two',
        label: 'Column two',
      },
      {
        id: '3',
        name: 'three',
        label: 'Column three',
      },
    ] satisfies CommonTableHeader<TableData>[],
    rows: [
      {
        id: '1',
        one: 'one 1',
        two: 'two 1',
        three: 'three 1',
      },
      {
        id: '2',
        one: 'one 2',
        two: 'two 2',
        three: 'three 2',
      },
    ].map((item) => {
      return {
        id: item.id,
        data: {
          ...item,
        },
      };
    }) satisfies CommonTableRow<TableData>[],
  },
  render(args) {
    return {
      components: {
        CommonTable: CommonTable as unknown as Record<string, any>,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonTable v-bind="args" />
        <br />
        <CommonTable v-bind="args">
          <template #td-one="{ data }">
            Custom {{ data.one }}
          </template>
        </CommonTable>
      `,
    };
  },
};
