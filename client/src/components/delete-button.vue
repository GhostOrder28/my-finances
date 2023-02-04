<template>
  <button 
    class="d-flex gap-2 align-items-center fs-6 btn rounded-pill bg-red"
    type="button"
    @click="$emit(deleteEvent)"
  >
    {{ label ? 'Eliminar' : '' }}
    <Icon name="thrash" />
  </button>
</template>

<script lang="ts">
import Icon from '@/components/icon.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: Boolean,
      required: false,
    },
    deleteEvent: {
      type: String,
      required: true
    }
  },
  components: {
    Icon
  }
})
</script>
