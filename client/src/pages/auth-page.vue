<template>
  <div class="container d-flex align-items-center justify-content-center vh-100" id="page-container">
    <div>
      <h1 class="fs-3">{{ $route.name === 'signin' ? 'Ingresar' : 'Registro' }}</h1>
      <h3>{{ $store.state.errors.authorizationError }}</h3>
      <h3>{{ $store.state.errors.authenticationError }}</h3>
      <form 
        class="d-flex flex-column gap-4 w-100"
        @submit.prevent="handleSubmit"
      >
        <div class="d-flex flex-column gap-3 align-items-start" v-if="$route.path === '/signup'">
          <label for="username">Nombre</label>
          <input class="form-control" v-model="username" name="username" type="text" placeholder="Tu nombre">
          <label for="username">{{ $store.state.errors.username }}</label>
        </div>

        <div class="d-flex flex-column gap-3 align-items-start">
          <label for="email">Email</label>
          <input class="form-control" v-model="email" name="email" type="text" placeholder="Correo electrónico">
          <label for="email">{{ $store.state.errors.email }}</label>
        </div>

        <div class="d-flex flex-column gap-3 align-items-start">
          <label  for="password">Contraseña</label>
          <input class="form-control" v-model="password" name="password" type="password" placeholder="Password">
          <label for="password">{{ $store.state.errors.password }}</label>
        </div>

        <FormButtons 
          :confirmLabel="$route.name === 'signin' ? 'Ingresar' : 'Confirmar Registro'"
          cancelLabel="Cancelar"
          single
          @formSubmit="handleSubmit"
        />
        <button type="button" @click="handleTest">Test</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormButtons from '@/components/form-buttons.vue'
import http from '@/utils/axios-instance'

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
          await this.$store.dispatch('signinUser', {
            email: this.email,
            password: this.password,
          })
        }

        console.log('signed in!');
        this.$router.push({ path: '/clients' })
      } catch (err) {
        console.error(err)
        // console.error('Necesitas llenar todos los campos requeridos.');
      }
    },
    async handleTest () {
      const res = await http.get('/test');
      console.log('res', res.data);
    },
    ...mapActions([ 'signinUser', 'signupUser', 'signoutUser' ]),
  },
  components: {
    FormButtons
  }
}
</script>

<style>
#page-container::before {
  content: "";
  width: 100%;
  height: 4rem;
  background-color: #8EECB9;
  position: fixed;
  left: 0;
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
