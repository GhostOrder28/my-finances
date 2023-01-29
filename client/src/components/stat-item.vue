<template>
<div class="container">
  <div class="label-container">
    <Icon :name="icon" />
    <h2>{{ label }}</h2>
  </div>
  <span>S/ {{ value }}</span>
</div>
</template>

<script>
import Icon from '@/components/icon'
export default {
  props: {
    icon: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: String,
    }
  },
  components: {
    Icon
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .8rem;
}
.label-container {
  display: flex;
}

h2 {
  margin: 0 0 0 .5rem;
  font-size: 1.4rem;
  font-weight: 400;
}

span {
  font-size: 2.6rem;
  font-weight: 700;
}
</style>
