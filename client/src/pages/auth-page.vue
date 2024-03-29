<template>
  <div class="container d-flex align-items-center justify-content-center vh-100" id="page-container">
    <div class="custom-container">
      <h1 class="custom-text mb-4 fs-3 fw-bolder">{{ $route.name === 'signin' ? 'Ingresar' : 'Registro' }}</h1>
      <h3 class="fs-6 text-red text-start">{{ $store.state.errors.authorizationError }}</h3>
      <h3 class="fs-6 text-red text-start">{{ $store.state.errors.authenticationError }}</h3>
      <form 
        class="d-flex flex-column gap-2 w-100"
        @submit.prevent="handleSubmit"
      >
        <div class="d-flex flex-column gap-3 align-items-start" v-if="$route.path === '/signup'">
          <label for="username">Nombre</label>
          <input class="form-control" v-model="username" name="username" type="text" placeholder="Tu nombre">
          <label class="error-message" for="username">{{ $store.state.errors.username }}</label>
        </div>

        <div class="d-flex flex-column gap-3 align-items-start">
          <label for="email">Email</label>
          <input class="form-control" v-model="email" name="email" type="text" placeholder="Correo electrónico">
          <label class="error-message" for="email">{{ $store.state.errors.email }}</label>
        </div>

        <div class="d-flex flex-column gap-2 align-items-start">
          <label for="password">Contraseña</label>
          <input class="form-control" v-model="password" name="password" type="password" placeholder="Password">
          <label class="error-message" for="password">{{ $store.state.errors.password }}</label>
        </div>

        <div class="d-flex flex-column gap-3 mt-3">
          <CustomButton 
            :label="$route.name === 'signin' ? 'Ingresar' : 'Registrarse'"
            @formSubmit="handleSubmit"
          />

          <CustomButton 
            v-if="$route.name === 'signin'"
            label="Registrarse"
            customStyle="bg-green text-dark-teal"
            link
            :url="{ name: 'signup' }"
          />

          <CustomButton 
            v-if="$route.name === 'signup'"
            label="Ya tengo una cuenta"
            customStyle="bg-green text-dark-teal"
            link
            :url="{ name: 'signin' }"
          />

          <CustomButton 
            v-if="$route.name === 'signin'"
            label="Ingresar como invitado"
            customStyle="bg-yellow text-dark-teal"
            event="guest"
            @guest="handleGuestRequest"
          />
        </div>

      </form>
    </div>
  </div>
  <Spinner v-if="isLoading" msg="Generando usuario de invitado..." />
</template>

<script>
import { mapActions } from 'vuex'
import FormButtons from '@/components/form-buttons.vue'
import CustomButton from '@/components/custom-button.vue'
import http from '@/utils/axios-instance'
import Spinner from '@/components/spinner.vue'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {    
    async handleSubmit () {
      try {
        if (this.$route.path === '/signup') {
          await this.signupUser({
            username: this.username,
            email: this.email,
            password: this.password,
          })
        }

        if (this.$route.path === '/signin') {
          await this.signinUser({
            email: this.email,
            password: this.password,
          })
        }

        this.$router.push({ path: '/clients' })
      } catch (err) {
        console.error(err)
      }
    },
    async handleGuestRequest () {
      try {
        this.isLoading = true
        await this.requestGuest()
        this.isLoading = false

        this.$router.push({ path: '/clients' })
      } catch (err) {
        this.isLoading = false
        throw new Error(`there was an error while trying to create a guest user, ${err}`)
      }
    },
    ...mapActions([ 'signinUser', 'signupUser', 'signoutUser', 'requestGuest' ]),
  },
  components: {
    CustomButton,
    Spinner,
  }
}
</script>

<style scoped>
.container {
  margin-top: -2.5rem;
}
.custom-container {
  width: 13rem;
}
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
