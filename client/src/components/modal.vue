<template>
  <Teleport to="body">
    <div class="d-flex flex-column gap-4 justify-content-center align-items-center bg-white bg-opacity-75 position-fixed top-0 container px-5 vw-100 vh-100">
      <p class="fs-3 fw-bold text-dark-teal">{{ body }}</p>
      <div class="d-flex gap-3 w-100">
        <button class="flex-grow-1 py-2 rounded-pill border-0 bg-blue text-light-purple" type="button" @click="$emit(confirmEvent)">{{ confirmLabel }}</button>
        <button class="flex-grow-1 py-2 rounded-pill border-0 bg-red text-light-red" @click="$emit(rejectEvent)">{{ rejectLabel }}</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'

type Props = {
  body: string;
  rejectLabel: string;
  confirmLabel: string;
  confirmEvent: string;
  rejectEvent: string;
}

defineProps<Props>();
</script>
