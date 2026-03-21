<script setup lang="ts">
import {
  CommonTitle,
  CommonTooltip,
} from '@/modules';

import '@/assets/styles/main.scss';
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
  </div>
</template>

<style lang="scss"></style>
