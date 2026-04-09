import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { ref } from 'vue';
import { CommonButton } from '../CommonButton';
import {
  CommonModal,
  type CommonModalSize,
} from './';

const meta = {
  title: 'Layout/CommonModal',
  component: CommonModal,
  argTypes: {
    title: {
      control: 'text',
    },
    rounded: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'full-width',
        'full-page',
      ] satisfies CommonModalSize[],
    },
  },
  args: {
    size: 'md',
    rounded: true,
    appendTo: 'body',
  },
} satisfies Meta<typeof CommonModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: false,
    appendTo: '.modal-story-preview',
  },
  render(args) {
    return {
      components: {
        CommonButton,
        CommonModal,
      },
      setup() {
        const visible = ref(args.visible);

        function openModal(): void {
          visible.value = true;
        }

        return {
          args,
          visible,
          openModal,
        };
      },
      template: `
        <div class="modal-story-preview">
          <CommonButton
            auto-width
            @click="openModal"
          >
            Open modal
          </CommonButton>
          <CommonModal
            v-bind="args"
            v-model:visible="visible"
          >
            <template #control>
              Modal control
            </template>

            <template #header>
              Modal header
            </template>

            <template #default>
              Безусловно, высокое качество позиционных исследований, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для экономической целесообразности принимаемых решений. Значимость этих проблем настолько очевидна, что сложившаяся структура организации предоставляет широкие возможности для своевременного выполнения сверхзадачи. Однозначно, некоторые особенности внутренней политики, вне зависимости от их уровня, должны быть заблокированы в рамках своих собственных рациональных ограничений. Сложно сказать, почему базовые сценарии поведения пользователей освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Задача организации, в особенности же высокое качество позиционных исследований напрямую зависит от кластеризации усилий. Наше дело не так однозначно, как может показаться: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения соответствующих условий активизации. Разнообразный и богатый опыт говорит нам, что социально-экономическое развитие предопределяет высокую востребованность дальнейших направлений развития. Учитывая ключевые сценарии поведения, начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения направлений прогрессивного развития. Не следует, однако, забывать, что сложившаяся структура организации требует анализа укрепления моральных ценностей.
            </template>

            <template #footer>
              Modal footer
            </template>
          </CommonModal>
        </div>
      `,
    };
  },
};
