<template>
<div class="d-flex flex-column align-items-start flex-grow-1">
  <div class="d-flex gap-1">
    <Icon :name="icon" />
    <h2 class="fs-6">{{ label }}</h2>
  </div>
  <span class="fs-2 fw-bolder">S/ {{ value }}</span>
</div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import { Icon } from '../types/global.types'

type Props = {
  icon: Icon;
  label: string;
  value: number;
}

defineProps<Props>()
</script>
