<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  AppAccordion,
  AppAccordionItem,
  AppButton,
  AppCheckbox,
  AppCombobox,
  type AppComboboxOption,
  AppDatePicker,
  AppInput,
  AppInputFile,
  AppLink,
  AppList,
  AppModal,
  AppRadio,
  type AppRadioOption,
  AppSelect,
  type AppSelectOption,
  AppSpinner,
  AppTable,
  type AppTableHeader,
  type AppTableRow,
  AppTabs,
  type AppTabsItem,
  AppTextarea,
  AppTitle,
  type AppTitleTags,
  AppTooltip,
} from '@/modules';

interface TableData {
  id: string;
  one: string;
  two: string;
  three: string;
}

const tags = ref<AppTitleTags[]>([
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

const optionsCombobox = ref<AppComboboxOption[]>([
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
    <!--    AppAccordion    -->
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
              <AppAccordion>
                <AppAccordionItem>
                  <template #header-text>
                    Accordion 1
                  </template>
                  <template #body>
                    Whoa!
                  </template>
                </AppAccordionItem>
                <AppAccordionItem>
                  <template #header-text>
                    Accordion 2
                  </template>
                  <template #body>
                    Whoa!
                  </template>
                </AppAccordionItem>
                <AppAccordionItem>
                  <template #header-text>
                    Accordion 3
                  </template>
                  <template #body>
                    Whoa!
                  </template>
                </AppAccordionItem>
              </AppAccordion>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    AppLink    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppLink"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-2">
              <AppLink
                text="Link"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <AppLink
                text="Link"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <AppLink
                text="Link"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <AppLink
                text="Link"
                theme="unaccented"
              />
            </div>
            <div class="col-default-2">
              <AppLink
                text="Link"
                theme="transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    AppList    -->
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
              <AppList
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

    <!--    AppTitle    -->
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

    <!--    AppButton    -->
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
              <AppButton
                text="Button"
                size="xs"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                size="s"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                size="m"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                size="l"
              />
            </div>
            <div class="col-default-2">
              <AppButton
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
              <AppButton
                text="Button"
                disabled
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                loading
              />
            </div>
            <div class="col-default-2">
              <AppButton
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
              <AppButton
                text="Button"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="unaccented"
              />
            </div>
            <div class="col-default-2">
              <AppButton
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
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="primary"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="secondary"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="tertiary"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="unaccented"
                text-style="text"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="transparent"
                text-style="text"
              />
            </div>
          </div>
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="primary"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="secondary"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="tertiary"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="unaccented"
                text-style="inverted"
              />
            </div>
            <div class="col-default-2">
              <AppButton
                text="Button"
                theme="transparent"
                text-style="inverted"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    AppDatePicker    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppDatePicker"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <AppDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <AppDatePicker
                placeholder="Select date"
                label="DatePicker"
                hint="Some hint"
                required
              />
            </div>
            <div class="col-default-3">
              <AppDatePicker
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

    <!--    AppInput    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppInput"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <AppInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <AppInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                required
              />
            </div>
            <div class="col-default-3">
              <AppInput
                v-model:value="inputValue"
                label="Some some"
                placeholder="Type some"
                hint="Some hint"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    AppInputFile    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppInputFile"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <AppInputFile
                label="Upload file"
                button-text="Upload"
                hint="Some hint"
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
          <div class="row">
            <div class="col-default-3">
              <AppSelect
                v-model:value="select"
                :options="optionsSelect"
                placeholder="Select"
                label="Select"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
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

    <!--    AppCombobox  -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppCombobox"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3">
              <AppCombobox
                v-model:value="combobox"
                :options="optionsCombobox"
                placeholder="Select"
                label="Select"
                hint="Some hint"
              />
            </div>
            <div class="col-default-3">
              <AppCombobox
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
          <div class="row">
            <div class="col-default-4">
              <AppTextarea
                v-model:value="textarea"
                placeholder="Type some"
                label="Textarea"
                hint="Some hint"
              />
            </div>
            <div class="col-default-4">
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

    <!--    AppCheckbox    -->
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
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <AppCheckbox
                v-model:checked="checkbox"
                text="Button"
              />
            </div>
            <div class="col-default-2">
              <AppCheckbox
                v-model:checked="checkbox"
                text="Button"
                disabled
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
              <AppCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="form"
              />
            </div>
            <div class="col-default-2">
              <AppCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="primary"
              />
            </div>
            <div class="col-default-2">
              <AppCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="secondary"
              />
            </div>
            <div class="col-default-2">
              <AppCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="tertiary"
              />
            </div>
            <div class="col-default-2">
              <AppCheckbox
                v-model:checked="checkbox"
                text="Button"
                theme="unaccented"
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
            text="States"
            class="margin-bottom--s"
          />
          <div class="row margin-bottom--s">
            <div class="col-default-2">
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-1"
              />
            </div>
            <div class="col-default-2">
              <AppRadio
                v-model:value="radio"
                :options="optionsRadio"
                name="radio-2"
                disabled
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
        </div>
      </div>
    </div>

    <!--    AppSpinner    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppSpinner"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-3 position-relative">
              <AppSpinner
                v-model:active="spinner"
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

    <!--    AppTooltip    -->
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
              <AppTooltip>
                tooltip
              </AppTooltip>
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

    <!--    AppModal    -->
    <div class="container__block margin-bottom--s">
      <div class="row">
        <div class="col-default-12">
          <AppTitle
            tag="h4"
            text="AppModal"
            class="margin-bottom--s"
          />
          <div class="row">
            <div class="col-default-4">
              <AppButton
                text="Open modal!"
                @click="modal = !modal"
              />
              <AppModal v-model:visible="modal">
                Modal content!
              </AppModal>
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
  color: var(--common-color-text-main);
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
  color: var(--common-color-text-main);
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
  max-width: 60rem;
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
