<template>
  <button class='f-rs'>{{ label }}<Icon name='plus' /></button>
</template>

<script>
import Icon from './icon'
export default {
  props: {
    label: {
      required: true
    }
  },
  components: {
    Icon
  }  
}
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
