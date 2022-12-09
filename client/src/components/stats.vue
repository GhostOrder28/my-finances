<template>
<div id='stats-container'>
  <slot />
</div>
</template>

<script>
import Icon from '@/components/icon';

export default {
}
</script>

<style scoped>
#stats-container {
  display: flex;
  gap: 5rem;
}
</style>
