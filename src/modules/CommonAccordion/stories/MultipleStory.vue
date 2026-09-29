<script setup lang="ts">
import {
  CommonAccordion,
  CommonAccordionItem,
} from '@/modules';
</script>

<template>
  <CommonAccordion multiple>
    <CommonAccordionItem
      name="one"
      active
    >
      <template #header-text>
        Accordion 1
      </template>
      <template #content>
        Content slot
      </template>
    </CommonAccordionItem>
    <CommonAccordionItem
      name="two"
      active
    >
      <template #header-text>
        Accordion 2
      </template>
      <template #content>
        Content slot
      </template>
    </CommonAccordionItem>
    <CommonAccordionItem
      name="three"
      active
    >
      <template #header-text>
        Accordion 3
      </template>
      <template #content>
        Content slot
      </template>
    </CommonAccordionItem>
  </CommonAccordion>
</template>
