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

<script setup lang='ts'>
import { defineProps } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import Icon from './icon.vue'

type Props = {
  label: string;
  url: RouteLocationRaw
}

defineProps<Props>()
</script>
