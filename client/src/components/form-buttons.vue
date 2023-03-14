<template>
  <div class="container px-4 w-100 d-flex gap-4">
    <button 
      class="flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill bg-blue text-light-purple" 
      type="button"
      @click="$emit('formSubmit')"
    >
      {{ confirmLabel }}
    </button>
    <button 
      class="flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill bg-red text-light-red" 
      v-if="!single"
      type="button"
      @click.prevent="$router.back()"
    >
      {{ cancelLabel }}
    </button>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults } from 'vue'

type Props = {
  confirmLabel: string;
  cancelLabel: string;
  single: boolean;
}

withDefaults(defineProps<Props>(), {
  single: false,
})
</script>
