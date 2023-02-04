<template>
  <router-link 
    class="
      position-fixed bottom-0 end-0
      m-3 py-2 px-3
      rounded-pill
      d-flex gap-2 align-items-center
      fs-6 fw-bold
      bg-blue text-purple 
      text-decoration-none"
    :to="url"
  >
    {{ label }}
    <Icon name='plus' />
  </router-link>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from './icon.vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: Object,
      required: true,
    }
  },
  components: {
    Icon
  },
})
</script>
