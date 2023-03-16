<template>
  <router-link
    class="link-custom d-flex gap-2 align-items-center btn rounded-pill bg-turquoise text-decoration-none"
    :to="url" 
  >
    {{ label ? 'Modificar' : '' }}
    <Icon name="edit" />
  </router-link>
</template>

<script setup lang="ts">
import Icon from '@/components/icon.vue'
import { RouteLocationRaw } from 'vue-router';
import { defineProps } from 'vue';

type Props = {
  url: RouteLocationRaw,
  label?: boolean,
}

defineProps<Props>()
</script>

<style>
.link-custom {
  font-size: .85rem;
}
</style>
