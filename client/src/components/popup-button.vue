<template>
  <router-link v-if="type === 'link'" class='f-rs' :to="{ name: url }">{{ label }}<Icon name='plus' /></router-link>
  <!-- <button v-if="type === 'button'" class='f-rs' @click="handleClick">{{ label }}<Icon name='plus' /></button> -->
</template>

<script lang='ts'>
// import axios from 'axios'
import { defineComponent, PropType } from 'vue'
import Icon from './icon.vue'
import { Props } from '@/types/components/popup-button.types'
// import { Empty } from '@/types/global.types'

export default defineComponent({
  props: {
    type: {
      type: Object as PropType<Props['type']>,
      required: true,
    },
    label: {
      type: Object as PropType<Props['label']>,
      required: true,
    },
    url: {
      type: Object as PropType<Props['url']>,
      required: false,
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
