<template>
    <div tabindex="-1" class="modal d-flex flex-column gap-4 justify-content-center align-items-center bg-white bg-opacity-75 top-0 px-5">
      <p class="fs-3 fw-bold text-dark-teal">{{ body }}</p>
      <div class="d-flex gap-3 w-100">
        <button class="flex-grow-1 py-2 rounded-pill border-0 bg-blue text-light-purple" type="button" @click="$emit(confirmEvent)">{{ confirmLabel }}</button>
        <button class="flex-grow-1 py-2 rounded-pill border-0 bg-red text-light-red" @click="$emit(rejectEvent)">{{ rejectLabel }}</button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    body: {
      type: String,
      required: true,
    },
    rejectLabel: {
      type: String,
      required: true,
    },
    confirmLabel: {
      type: String,
      required: true,
    },
    confirmEvent: {
      type: String,
      required: true,
    },
    rejectEvent: {
      type: String,
      required: true,
    }
  }
}
</script>
