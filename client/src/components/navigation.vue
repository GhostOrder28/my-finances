<template>
  <div id='navbar'>
    <div>Mis Finanzas</div>
    <div id='navigation'>
      <Icon name='search' />
      <Icon name='menu' />
    </div>
  </div>
</template>

<script>
import Icon from './icon';

export default {
  components: {
    Icon
  }  
}
</script>

<style scoped>
#navbar {
  display: flex;
  padding: 20px 25px;
  justify-content: space-between;
  align-items: center;
  background-color: #8EECB9;
}

#navbar > div:first-child {
  font-size: 2rem;
  font-weight: 700;
}

#navbar div+div {
  display: flex;
  align-items: center;
  gap: 20px;
}

</style>
