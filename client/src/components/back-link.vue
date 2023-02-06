<template>
  <router-link
    class="back-link d-flex align-items-center gap-2 text-decoration-none text-dark-teal lh-1"
    :to="url"
  >
    <Icon name="backlink" />
    {{ label }}
  </router-link>
</template>

<script>
import Icon from '@/components/icon.vue'

export default {
  props: {
    url: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  },
  components: {
    Icon,
  }
}
</script>

<style>
/* css */
</style>
