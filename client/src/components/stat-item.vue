<template>
<div class="d-flex flex-column align-items-start flex-grow-1">
  <div class="d-flex gap-1">
    <Icon :name="icon" />
    <h2 class="fs-6">{{ label }}</h2>
  </div>
  <span class="fs-2 fw-bolder">S/ {{ value }}</span>
</div>
</template>

<script>
import Icon from '@/components/icon'
export default {
  props: {
    icon: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: String,
    }
  },
  components: {
    Icon
  }
}
</script>
