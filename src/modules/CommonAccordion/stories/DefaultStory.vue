<script setup lang="ts">
import {
  CommonAccordion,
  CommonAccordionItem,
} from '@/modules';
</script>

<template>
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
</template>
