<template>
  <button 
    v-if="!link"
    :class="`flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill ${customStyle}`" 
    type="button"
    @click="$emit(event)"
  >
    {{ label }}
  </button>
  <router-link 
    v-if="link" 
    :to="url"
    :class="`flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill text-decoration-none ${customStyle}`" 
  >
    {{ label }}
  </router-link>
</template>

<script lang='ts' setup>
import { defineProps, withDefaults } from 'vue'
import { RouteLocationRaw } from 'vue-router';

type Props = {
  label: string;
  event: string;
  customStyle: string;
  link: boolean;
  url: RouteLocationRaw;
}

withDefaults(defineProps<Props>(), {
  event: 'formSubmit',
  customStyle: 'bg-blue text-light-purple',
  link: false,
  url: '#',
});
</script>
