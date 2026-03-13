<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  AppRadio,
  type AppRadioOption,
  AppSelect,
  type AppSelectOption,
  AppTable,
  type AppTableHeader,
  type AppTableRow,
  AppTabs,
  type AppTabsItem,
  AppTextarea,
  AppTitle,
  CommonAccordion,
  CommonAccordionItem,
  CommonButton,
  CommonCheckbox,
  CommonCombobox,
  type CommonComboboxOption,
  CommonDatePicker,
  CommonInput,
  CommonInputFile,
  CommonLink,
  CommonList,
  CommonModal,
  CommonSpinner,
  type CommonTitleTags,
  CommonTooltip,
} from '@/modules';

interface TableData {
  id: string;
  one: string;
  two: string;
  three: string;
}

const tags = ref<CommonTitleTags[]>([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]);

const optionsSelect = ref<AppSelectOption[]>([
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

const optionsRadio = ref<AppRadioOption[]>([
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

const tabs = ref<AppTabsItem[]>([
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

const headers = ref<AppTableHeader<TableData>[]>([
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

const rows = computed<AppTableRow<TableData>[]>(() => {
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
    <AppTitle
      class="margin-bottom--s"
      inverted
    >
      STYLEGUIDE
    </AppTitle>

    <!--    CommonAccordion    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppAccordion"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-12">
              <CommonAccordion>
                <CommonAccordionItem>
                  <template #header-text>
                    Accordion 1
                  </template>
                  <template #body>
                    Whoa!
                  </template>
                </CommonAccordionItem>
                <CommonAccordionItem>
                  <template #header-text>
                    Accordion 2
                  </template>
                  <template #body>
                    Whoa!
                  </template>
                </CommonAccordionItem>
                <CommonAccordionItem>
                  <template #header-text>
                    Accordion 3
                  </template>
                  <template #body>
                    Whoa!
                  </template>
                </CommonAccordionItem>
              </CommonAccordion>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonLink    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppLink"
            class="margin-bottom--s"
          />
          <AppTitle
            tag="h5"
            text="Themes"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                PRIMARY
              </p>
              <CommonLink
                text="Source link"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SECONDARY
              </p>
              <CommonLink
                text="Source link"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                TERTIARY
              </p>
              <CommonLink
                text="Source link"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                UNACCENTED
              </p>
              <CommonLink
                text="Source link"
                theme="unaccented"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonList    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppList"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-12">
              <CommonList
                text="Link"
                :items="[
                  {
                    id: '1',
                    label: 'Label 1',
                  },
                  {
                    id: '2',
                    label: 'Label 2',
                  },
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonTitle    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            v-for="item in tags"
            :key="item"
            :tag="item"
            :text="`AppTitle ${item}`"
            class="margin-bottom--s"
          />
        </div>
      </div>
    </div>

    <!--    CommonButton    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppButton"
            class="margin-bottom--s"
          />
          <AppTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonButton
                text="Button"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonButton
                text="Button"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonButton
                text="Button"
                size="md"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonButton
                text="Button"
                size="lg"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonButton
                text="Button"
                size="xl"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonButton
                text="Button"
                disabled
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                LOADING
              </p>
              <CommonButton
                text="Button"
                loading
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                FLAT
              </p>
              <CommonButton
                text="Button"
                flat
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="Themes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                PRIMARY
              </p>
              <CommonButton
                text="Button"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SECONDARY
              </p>
              <CommonButton
                text="Button"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                TERTIARY
              </p>
              <CommonButton
                text="Button"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                UNACCENTED
              </p>
              <CommonButton
                text="Button"
                theme="unaccented"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                TRANSPARENT
              </p>
              <CommonButton
                text="Button"
                theme="transparent"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="Text styles"
            class="margin-bottom--s"
          />
          <p class="margin-bottom--xs">
            THEME
          </p>
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="unaccented"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="transparent"
              />
            </div>
          </div>
          <p class="margin-bottom--xs">
            TEXT
          </p>
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="primary"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="secondary"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="tertiary"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="unaccented"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="transparent"
                text-style="text"
              />
            </div>
          </div>
          <p class="margin-bottom--xs">
            INVERTED
          </p>
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="primary"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="secondary"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="tertiary"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="unaccented"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="transparent"
                text-style="inverted"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="Theme styles"
            class="margin-bottom--s"
          />
          <p class="margin-bottom--xs">
            FILL
          </p>
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="unaccented"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="transparent"
              />
            </div>
          </div>
          <p class="margin-bottom--xs">
            OUTLINE
          </p>
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="primary"
                theme-style="outline"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="secondary"
                theme-style="outline"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="tertiary"
                theme-style="outline"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="unaccented"
                theme-style="outline"
              />
            </div>
            <div class="col-default-2">
              <CommonButton
                text="Button"
                theme="transparent"
                theme-style="outline"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="Slots"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                PREPEND
              </p>
              <CommonButton
                text="Button"
                theme="primary"
                text-style="inverted"
              >
                <template #prepend>
                  <span class="icon icon-pencil" />
                </template>
              </CommonButton>
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                APPEND
              </p>
              <CommonButton
                text="Button"
                theme="primary"
                text-style="inverted"
              >
                <template #append>
                  <span class="icon icon-pencil" />
                </template>
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonDatePicker    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppDatePicker"
            class="margin-bottom--s"
          />
          <AppTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                SM
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                size="sm"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                MD
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                size="md"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                LG
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                size="lg"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                XL
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                REQUIRED
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                required
              />
            </div>
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <CommonDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonInput    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppInput"
            class="margin-bottom--s"
          />
          <AppTitle
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
          <AppTitle
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
          <AppTitle
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
          <AppTitle
            tag="h4"
            text="AppInputFile"
            class="margin-bottom--s"
          />
          <AppTitle
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
          <AppTitle
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

    <!--    AppSelect    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppSelect"
            class="margin-bottom--s"
          />
          <AppTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--xs">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <AppSelect
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
              <AppSelect
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
              <AppSelect
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
              <AppSelect
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
              <AppSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <AppSelect
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
              <AppSelect
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
              <AppSelect
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
          <AppTitle
            tag="h4"
            text="AppCombobox"
            class="margin-bottom--s"
          />
          <AppTitle
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
          <AppTitle
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

    <!--    AppTextarea    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppTextarea"
            class="margin-bottom--s"
          />
          <AppTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <AppTextarea
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
              <AppTextarea
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
              <AppTextarea
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
              <AppTextarea
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
              <AppTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
                size="xl"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <AppTextarea
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
              <AppTextarea
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
              <AppTextarea
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
          <AppTitle
            tag="h4"
            text="AppCheckbox"
            class="margin-bottom--s"
          />
          <AppTitle
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
          <AppTitle
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
          <AppTitle
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

    <!--    AppRadio    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppRadio"
            class="margin-bottom--s"
          />
          <AppTitle
            tag="h5"
            text="Sizes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                XS
              </p>
              <AppRadio
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
              <AppRadio
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
              <AppRadio
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
              <AppRadio
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
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-xl"
                size="xl"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="Themes"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-3"
                theme="form"
              />
            </div>
            <div class="col-default-2">
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-4"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-5"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-6"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-7"
                theme="unaccented"
              />
            </div>
          </div>
          <AppTitle
            tag="h5"
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                DEFAULT
              </p>
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-1"
              />
            </div>
            <div class="col-default-2">
              <p class="margin-bottom--xs">
                DISABLED
              </p>
              <AppRadio
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
          <AppTitle
            tag="h4"
            text="AppSpinner"
            class="margin-bottom--s"
          />
          <AppTitle
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

    <!--    AppTabs    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppTabs"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-6">
              <AppTabs
                v-model:items="tabs"
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
          <AppTitle
            tag="h4"
            text="AppTooltip"
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

    <!--    AppTable    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppTable"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-6">
              <AppTable
                :headers="headers"
                :rows="rows"
              />
            </div>
            <div class="col-default-6">
              <AppTable
                :headers="headers"
                :rows="rows"
              >
                <template #td-one="{ data }">
                  {{ data.one }}
                </template>
              </AppTable>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    CommonModal    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppModal"
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
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

::selection {
  color: var(--common-color-white);
  background: var(--common-color-black);
  text-shadow: none;
}

::-moz-selection {
  color: var(--common-color-white);
  background: var(--common-color-black);
  text-shadow: none;
}

body {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 20rem;
  width: 100%;
  margin: 0;
  padding: 0;
  color: var(--common-color-main);
  font-weight: 400;
  font-family: var(--common-font-family), Arial, Helvetica, sans-serif;
  background-color: var(--common-color-black-80);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

a {
  color: var(--common-color-main);
  text-decoration: none;

  &:visited,
  &:focus,
  &:active {
    outline: 0 none;
    text-decoration: none;
  }
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

p {
  margin: 0;
}

p+p {
  margin: 1rem 0 0;
}

.container {
  display: flex;
  flex-flow: column nowrap;
  min-width: 60rem;
  max-width: 90%;
  min-height: 100%;
  padding: 2rem;
  margin: auto;

  &__block {
    padding: 2rem;
    border-radius: .5rem;
    background-color: var(--common-color-white);
  }
}
</style>
