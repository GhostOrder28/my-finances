<template>
  <router-link
    class="d-flex gap-2 align-items-center fs-6 btn rounded-pill bg-turquoise text-decoration-none"
    :to="url" 
  >
    {{ label ? 'Modificar' : '' }}
    <Icon name="edit" />
  </router-link>
</template>

<script lang="ts">
import Icon from '@/components/icon.vue'

export default {
  props: {
    url: {
      type: Object,
      required: true,
    },
    label: {
      type: Boolean,
      required: false
    }
  },
  components: {
    Icon
  },
}
</script>
