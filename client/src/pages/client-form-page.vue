<template>
<section 
  id="page-content"
  :style="{ height: sectionHeight + 'px' }"
  ref="sectionRef"
>
  <div id="header">
    <Icon name="new-client" />
    <h1>Nuevo cliente</h1>
  </div>
  <span>{{ formErrors.notFoundError }}</span>
  <form @submit.prevent="handleSubmit">
    <div class="input-container">
      <label for="clientName" class="f-rs">Nombre *</label>
      <input v-model="formState.clientName" name="clientName" type="text" placeholder="Nombre del cliente">
      <label for="clientName" class="f-rs">{{ formErrors.clientName }}</label>
    </div>
    <div class="input-container">
      <label for="clientNameDetails" class="f-rs">Detalle del nombre</label>
      <input v-model="formState.clientNameDetails" name="clientNameDetails" type="text" placeholder="amigo, vecino, etc">
      <label for="clientNameDetails" class="f-rs">{{ formErrors.clientNameDetails }}</label>
      <span class="tooltip">Esto es opcional, pero es útil para diferenciar entre dos personas con el mismo nombre.</span>
    </div>
    <div class="input-container">
      <label for="contactPhone" class="f-rs">Número de contacto</label>
      <input v-model="formState.contactPhone" name="contactPhone" type="text" placeholder="Número para contactar al cliente">
      <label for="contactPhone" class="f-rs">{{ formErrors.contactPhone }}</label>
    </div>
    <div id="actions">
      <button type="submit" class="f-rs action-button confirm">Añadir cliente</button>
      <button type="button" class="f-rs action-button danger">Cancelar</button>
    </div>
  </form>
</section>
</template>

<script lang="ts">
import { State, Methods, Refs } from '@/types/pages/client-form-page.types'
import Icon from '@/components/icon.vue'
import http from '@/utils/axios-instance'
import { Empty } from '@/types/global.types'
import { defineComponent } from 'vue'
import { isAxiosError } from 'axios'

export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      sectionHeight: 0,
      formState: {
        clientName: '',
        clientNameDetails: '',
        contactPhone: '',
      },
      formErrors: {}
    }
  },
  components: {
    Icon
  },
  async beforeMount () {
    if (this.$route.params.clientid) {
      await this.getClientData()
    }
  },
  mounted () {
    const { sectionRef } = this.$refs as Refs;
    this.sectionHeight = window.innerHeight - sectionRef.offsetTop; 
    // this last part is just for testing purposes in my desktop environment, for some reason on firefox when tbody display is set to block then offsettop alwaqys returns 0
  },
  methods: {
    async handleSubmit () {
      try {
        const { clientName, clientNameDetails, contactPhone } = this.formState;
        console.log(JSON.stringify(this.formState, null, 2))
        let endpoint;

        if (this.$route.params.clientid) {
          endpoint = `/clients/${this.$route.params.clientid}`
          await http.patch(endpoint, {
            clientName,
            clientNameDetails,
            contactPhone,
          })
        } else {
          endpoint = `/clients/${this.$store.state._id}`
          await http.post(endpoint, {
            clientName,
            clientNameDetails,
            contactPhone,
          })
        }
        // this repetition could be solved by implementing a new enpoint that retrieves the client form data only
      } catch (err) {
        if (isAxiosError(err)) {
          this.formErrors = err.response?.data.validationError
        }
      }
    },
    async getClientData () {
      try {
        const res = await http.get(`/clients/${this.$route.params.clientid}?single=true`)
        const { sales, ...clientData } = res.data.clientData
        this.formState = clientData
      } catch (err) {
        if (isAxiosError(err)) {
          this.formErrors = err.response?.data
        }
      }
    }
  }
})
</script>

<style scoped>
h1 {
  font-size: 2.6rem;
}
#header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
#actions {
  display: flex;
  gap: 2rem;
  margin-top: auto;
}
</style>
