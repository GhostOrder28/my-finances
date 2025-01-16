<template>
  <div id='navbar' class="container d-flex justify-content-between align-items-center px-4 py-3 bg-dark-green">
    <router-link to="/">
      <span class="fs-5 fw-bolder">Libro de ventas</span>
    </router-link>
    <div id='navigation'>
      <Icon name='search' />
      <button 
        type="button" 
        class="bg-transparent border-0"
        data-bs-toggle="offcanvas" 
        data-bs-target="#offcanvas" 
        aria-controls="offcanvas"
      >
        <Icon name='menu' />
      </button>
    </div>
    <nav 
      class="offcanvas offcanvas-end d-flex flex-column"
      id="offcanvas" 
      aria-labelledby="offcanvas"
    >
      <button 
        class="align-self-end bg-transparent border-0"
        type="button" 
        data-bs-dismiss="offcanvas"
      >
        <Icon name='close' />
      </button>
      <ul class="list-unstyled">
        <li
          v-for="(link, idx) in links"
          data-bs-dismiss="offcanvas"
          :key="'link' + idx"
          class="fs-3 text-dark-teal"
        >
          <router-link
            class="text-decoration-none"
            :to="{ name: link }"
          >
            {{ link.charAt(0).toUpperCase() + link.slice(1) }}
          </router-link>
        </li>
        <li>
          <button
            type='button' 
            @click.prevent="signOut"
            class="fs-3 fw-bold text-danger bg-transparent border-0"
          >
            Salir
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Icon from './icon';
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      links: [ 'home', 'clients' ]
    }
  },
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
a, a.router-link-exact-active, a:hover {
  color: #27373D;
}
#navbar {

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
