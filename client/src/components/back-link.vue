<template>
  <router-link
    class="back-link d-flex align-items-center gap-2 text-decoration-none text-dark-teal lh-1"
    :to="props.url"
  >
    <Icon name="backlink" />
    {{ props.label }}
  </router-link>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue'
import { RouteLocationRaw } from 'vue-router';
import Icon from '@/components/icon.vue'

type Props = {
  url: RouteLocationRaw;
  label: string;
}

const props = defineProps<Props>();

</script>

<style>
/* css */
</style>
