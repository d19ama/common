<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  CommonButton,
  CommonImage,
  CommonModal,
  CommonTable,
  type CommonTableHeader,
  type CommonTableRow,
  CommonTitle,
  CommonTooltip,
} from '@/modules';

import '@/assets/styles/main.scss';

type TableData = {
  id: string;
  one: string;
  two: string;
  three: string;
};

const headers = ref<CommonTableHeader<TableData>[]>([
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
]);

const modal = ref<boolean>(false);

const rows = computed<CommonTableRow<TableData>[]>(() => {
  return [
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
  });
});
</script>

<template>
  <div class="container">
    <CommonTitle
      class="margin-bottom--s"
      inverted
    >
      STYLEGUIDE
    </CommonTitle>

    <!--    CommonTooltip    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonTooltip"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-4">
              <CommonTooltip>
                tooltip
              </CommonTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonTable    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonTable"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-6">
              <CommonTable
                :headers="headers"
                :rows="rows"
              />
            </div>
            <div class="col-default-6">
              <CommonTable
                :headers="headers"
                :rows="rows"
              >
                <template #td-one="{ data }">
                  {{ data.one }}
                </template>
              </CommonTable>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonModal    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonModal"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-2">
              <CommonButton
                text="Open modal!"
                @click="modal = !modal"
              />
              <CommonModal
                v-model:visible="modal"
                size="full-page"
                title="Modal title"
              >
                <template #control>
                  Modal control
                </template>

                <template #default>
                  Безусловно, высокое качество позиционных исследований, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для экономической целесообразности принимаемых решений. Значимость этих проблем настолько очевидна, что сложившаяся структура организации предоставляет широкие возможности для своевременного выполнения сверхзадачи. Однозначно, некоторые особенности внутренней политики, вне зависимости от их уровня, должны быть заблокированы в рамках своих собственных рациональных ограничений. Сложно сказать, почему базовые сценарии поведения пользователей освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Задача организации, в особенности же высокое качество позиционных исследований напрямую зависит от кластеризации усилий. Наше дело не так однозначно, как может показаться: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения соответствующих условий активизации. Разнообразный и богатый опыт говорит нам, что социально-экономическое развитие предопределяет высокую востребованность дальнейших направлений развития. Учитывая ключевые сценарии поведения, начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения направлений прогрессивного развития. Не следует, однако, забывать, что сложившаяся структура организации требует анализа укрепления моральных ценностей.
                </template>

                <template #footer>
                  Modal footer
                </template>
              </CommonModal>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonImage    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonImage"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-4">
              <CommonImage
                src="https://i1.sndcdn.com/artworks-000125697915-3ok8i4-t500x500.jpg"
                alt="Alt text"
              />
            </div>
            <div class="col-default-4">
              <CommonImage
                src="https://i1.sndcdn.com/artworks-000125697915-3ok8i4-t500x500.jpg"
                alt="Alt text"
                flat
              />
            </div>
            <div class="col-default-4">
              <CommonImage
                src=""
                alt="Alt text"
                loading
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
