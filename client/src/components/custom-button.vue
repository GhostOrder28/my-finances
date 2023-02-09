<template>
  <button 
    v-if="!link"
    :class="`flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill ${customStyle}`" 
    type="button"
    @click="$emit(event)"
  >
    {{ label }}
  </button>
  <router-link 
    v-if="link" 
    :to="url"
    :class="`flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill text-decoration-none ${customStyle}`" 
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: false,
      default: 'formSubmit'
    },
    customStyle: {
      type: String,
      required: false,
      default: 'bg-blue text-light-purple'
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    url: {
      type: Object,
      required: false,
    }
  }
}
</script>
