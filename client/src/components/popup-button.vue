<template>
  <router-link class='f-rs' :to="url">{{ label }}<Icon name='plus' /></router-link>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Icon from './icon.vue'
import { Props } from '@/types/components/popup-button.types'

export default defineComponent({
  props: {
    label: {
      type: Object as PropType<Props['label']>,
      required: true,
    },
    url: {
      type: Object as PropType<Props['url']>,
      required: true,
    }
  },
  components: {
    Icon
  },
})
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  position: fixed;
  bottom: 30px;
  right: 20px;
  font-weight: 700;
  text-align: left;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #CBD8FB;
  background-color: #3768E5;
}
</style>
