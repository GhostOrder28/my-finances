<template>
  <router-link
    class="back-link d-flex align-items-center gap-2 text-decoration-none text-dark-teal"
    :to="url"
  >
    <Icon name="backlink" />
    Regresar a {{ entity }}
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
    entity: {
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
