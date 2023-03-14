<template>
  <button 
    class="link-custom d-flex gap-2 align-items-center btn rounded-pill bg-red"
    type="button"
    @click="$emit(deleteEvent)"
  >
    <span>
      {{ label ? 'Eliminar' : '' }}
    </span>
    <Icon name="thrash" />
  </button>
</template>

<script setup lang="ts">
import Icon from '@/components/icon.vue'
import { defineProps } from 'vue';

type Props = {
  label?: boolean,
  deleteEvent: string,
}

defineProps<Props>()

// export default defineComponent({
//   props: {
//     label: {
//       type: Boolean,
//       required: false,
//     },
//     deleteEvent: {
//       type: String,
//       required: true
//     }
//   },
//   components: {
//     Icon
//   }
// })
</script>

<style>
.link-custom {
  font-size: .85rem;
}
</style>
