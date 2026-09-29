<script setup lang="ts">
import {
  CommonAccordion,
  CommonAccordionItem,
} from '@/modules';
</script>

<template>
  <CommonAccordion>
    <CommonAccordionItem
      name="one"
      active
    >
      <template #header-text>
        Accordion 1
      </template>
      <template #body>
        Body slot used
      </template>
    </CommonAccordionItem>
    <CommonAccordionItem name="two">
      <template #header-text>
        Accordion 2
      </template>
      <template #content>
        Content slot used
      </template>
    </CommonAccordionItem>
    <CommonAccordionItem name="three">
      <template #header-text>
        Accordion 3
      </template>
      <template #body>
        Body slot used
      </template>
    </CommonAccordionItem>
  </CommonAccordion>
</template>
