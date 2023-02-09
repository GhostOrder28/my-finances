<template>
  <div class="
    position-fixed 
    top-0
    d-flex flex-column justify-content-center align-items-center gap-3
    w-100 vh-100 
    bg-white 
    opacity-75
  ">
    <div class="spinner-border text-green"></div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: false,
    }
  }
}
</script>
