<template>
  <div id="page-container">
    <div>
      <h1>Registro</h1>
      <h3>{{ $store.state.errors.authorizationError }}</h3>
      <h3>{{ $store.state.errors.authenticationError }}</h3>
      <form @submit.prevent="handleSubmit">
        <div v-if="$route.path === '/signup'">
          <label for="username">Nombre</label>
          <input v-model="username" name="username" type="text" placeholder="Tu nombre">
          <label for="username">{{ $store.state.errors.username }}</label>
        </div>

        <label for="email">Email</label>
        <input v-model="email" name="email" type="text" placeholder="Correo electrónico">
        <label for="email">{{ $store.state.errors.email }}</label>

        <label for="password">Contraseña</label>
        <input v-model="password" name="password" type="password" placeholder="Password">
        <label for="password">{{ $store.state.errors.password }}</label>

        <button type="submit">{{ $route.path === '/signup' ? 'Confirmar Registro' : 'Ingresar' }}</button>
        <button type="button">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {    
    async handleSubmit () {
      try {
        if (this.$route.path === '/signup') {
          await this.$store.dispatch('signupUser', {
            username: this.username,
            email: this.email,
            password: this.password,
          })
        }

        if (this.$route.path === '/signin') {
          console.log('request: ', {
            email: this.email,
            password: this.password,
          });
          await this.$store.dispatch('signinUser', {
            email: this.email,
            password: this.password,
          })
        }

        this.$router.push({ path: '/clients' })
      } catch (err) {
        console.error('Necesitas llenar todos los campos requeridos.');
      }
    },
    ...mapActions([ 'signinUser', 'signupUser', 'signoutUser' ]),
  },
}
</script>

<style>
#page-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
#page-container::before {
  content: "";
  width: 100%;
  height: 4rem;
  background-color: #8EECB9;
  position: fixed;
  top: 0;
}
#page-container::after {
  content: "";
  width: 100%;
  height: 1.6rem;
  background-color: #3768E5;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
