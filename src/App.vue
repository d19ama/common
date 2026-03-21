<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  CommonButton,
  CommonCheckbox,
  CommonCombobox,
  type CommonComboboxOption,
  CommonImage,
  CommonInput,
  CommonInputFile,
  CommonModal,
  CommonRadio,
  type CommonRadioOption,
  CommonSelect,
  type CommonSelectOption,
  CommonSpinner,
  CommonTable,
  type CommonTableHeader,
  type CommonTableRow,
  CommonTabs,
  type CommonTabsItem,
  CommonTextarea,
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

const optionsSelect = ref<CommonSelectOption[]>([
  {
    id: '1',
    text: 'Radio 1',
    selected: true,
    disabled: false,
  },
  {
    id: '2',
    text: 'Radio 2',
    selected: false,
    disabled: false,
  },
  {
    id: '3',
    text: 'Radio 3',
    selected: false,
    disabled: false,
  },
  {
    id: '4',
    text: 'Radio 4',
    selected: false,
    disabled: true,
  },
]);

const optionsCombobox = ref<CommonComboboxOption[]>([
  {
    id: '1',
    text: 'Radio 1',
    selected: true,
    disabled: false,
  },
  {
    id: '2',
    text: 'Radio 2',
    selected: false,
    disabled: false,
  },
  {
    id: '3',
    text: 'Radio 3',
    selected: false,
    disabled: false,
  },
  {
    id: '4',
    text: 'Radio 4',
    selected: false,
    disabled: true,
  },
]);

const optionsRadio = ref<CommonRadioOption[]>([
  {
    id: '1',
    text: 'Radio 1',
    checked: true,
    disabled: false,
  },
  {
    id: '2',
    text: 'Radio 2',
    checked: false,
    disabled: false,
  },
]);

const tabs = ref<CommonTabsItem[]>([
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
]);

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

const radio = ref<string>('1');
const select = ref<string>('');
const combobox = ref<string>('');
const textarea = ref<string>('');
const modal = ref<boolean>(false);
const spinner = ref<boolean>(true);
const inputValue = ref<string>('');
const checkbox = ref<boolean>(false);

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

    <!--    CommonInput    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonInput"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                size="md"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                size="lg"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-3">
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                required
              />
            </div>
            <div class="col-default-3">
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                disabled
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="Slots"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                PREPEND
              </p>
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
              >
                <template #prepend>
                  <span class="icon icon-search" />
                </template>
              </CommonInput>
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                APPEND
              </p>
              <CommonInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
              >
                <template #append>
                  <span class="icon icon-search" />
                </template>
              </CommonInput>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonInputFile    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonInputFile"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
                size="md"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
                size="lg"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                REQUIRED
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
                required
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonSelect    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonSelect"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--xs">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="md"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="lg"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                REQUIRED
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                required
                placeholder="Select"
                label="Select"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonSelect
                v-model:value="select"
                :options="optionsSelect"
                disabled
                placeholder="Select"
                label="Select"
                hint="Some hint"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonCombobox  -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonCombobox"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="md"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="lg"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                REQUIRED
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                required
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonTextarea    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonTextarea"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                size="md"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                size="lg"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                REQUIRED
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                required
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonCheckbox    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonCheckbox"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="form"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="form"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="form"
                size="md"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="form"
                size="lg"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="form"
                size="xl"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="Themes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                FORM
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="form"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                PRIMARY
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SECONDARY
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                TERTIARY
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                UNACCENTED
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="unaccented"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                REQUIRED
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                required
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonCheckbox
                v-model:checked="checkbox"
                text="Button"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonRadio    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonRadio"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-xs"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-sm"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-md"
                size="md"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-lg"
                size="lg"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-xl"
                size="xl"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="Themes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-3"
                theme="form"
              />
            </div>
            <div class="col-default-2">
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-4"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-5"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-6"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-7"
                theme="unaccented"
              />
            </div>
          </div>
          <CommonTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-1"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-2"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonSpinner    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonSpinner"
            class="margin-bottom--s"
          />
          <CommonTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-2 position-relative">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonSpinner
                v-model:active="spinner"
                size="xs"
              />
            </div>
            <div class="col-default-2 position-relative">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonSpinner
                v-model:active="spinner"
                size="sm"
              />
            </div>
            <div class="col-default-2 position-relative">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonSpinner
                v-model:active="spinner"
                size="md"
              />
            </div>
            <div class="col-default-2 position-relative">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonSpinner
                v-model:active="spinner"
                size="lg"
              />
            </div>
            <div class="col-default-2 position-relative">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonSpinner
                v-model:active="spinner"
                size="xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonTabs    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <CommonTitle
            tag="h4"
            text="CommonTabs"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-12">
              <CommonTabs
                v-model:tabs="tabs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

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
