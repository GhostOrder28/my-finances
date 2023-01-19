<template>
  <div id='navbar'>
    <div>Mis Finanzas</div>
    <div id='navigation'>
      <Icon name='search' />
      <Icon name='menu' />
      <button type='button' @click.prevent="signOut">Salir</button>
    </div>
  </div>
</template>

<script>
import Icon from './icon';
import { mapActions } from 'vuex'

export default {
  components: {
    Icon
  },
  methods: {
    async signOut () {
      await this.$store.dispatch('signoutUser')
      this.$router.push({ path: '/signin' })
    },
    ...mapActions([ 'signoutUser' ])
  }
}
</script>

<style lang="scss" scoped>
#navbar {
  display: flex;
  padding: 20px 25px;
  justify-content: space-between;
  align-items: center;
  background-color: dark-green;

  & > div:first-child {
    font-size: 2rem;
    font-weight: 700;
  }

  & div+div {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>
