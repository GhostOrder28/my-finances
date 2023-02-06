<template>
  <section 
    :style="{ height: sectionHeight + 'px' }"
    class="container p-4"
  >
    <div class="d-flex gap-3 align-items-center">
      <Icon name="new-client" />
      <h1 class="fs-3 fw-bold m-0" v-if="$route.name === 'newclient'">Nuevo cliente</h1>
      <h1 class="fs-3 fw-bold m-0" v-if="$route.name === 'editclient'">Editar cliente</h1>
    </div>
    <span>{{ formErrors.notFoundError }}</span>

    <form 
      class="d-flex flex-column gap-4 mt-4"
      ref="formRef"
      :style="{ height: formHeight + 'px' }"
      @submit.prevent="handleSubmit"
    >
      <div class="d-flex flex-column gap-3 align-items-start">
        <label class="fs-6" for="clientName">Nombre *</label>
        <input class="form-control" v-model="formState.clientName" name="clientName" type="text" placeholder="Nombre del cliente">
        <label class="fs-6" for="clientName" v-if="formErrors.clientName">{{ formErrors.clientName }}</label>
      </div>
      <div class="d-flex flex-column gap-3 align-items-start">
        <label class="fs-6" for="clientNameDetails">Detalle del nombre</label>
        <div class="d-flex flex-column gap-2">
          <input class="form-control" v-model="formState.clientNameDetails" name="clientNameDetails" type="text" placeholder="amigo, vecino, etc">
          <span class="detail-description text-start">Esto es opcional, pero es útil para diferenciar entre dos personas con el mismo nombre.</span>
        </div>
        <label class="fs-6" for="clientNameDetails" v-if="formErrors.clientNameDetails">{{ formErrors.clientNameDetails }}</label>
      </div>
      <div class="d-flex flex-column gap-3 align-items-start">
        <label class="fs-6" for="contactPhone">Número de contacto</label>
        <input class="form-control" v-model="formState.contactPhone" name="contactPhone" type="text" placeholder="Número para contactar al cliente">
        <label class="fs-6" for="contactPhone" v-if="formErrors.contactPhone">{{ formErrors.contactPhone }}</label>
      </div>
    </form>

    <FormButtons 
      ref="actionsRef"
      :confirmLabel="$route.name === 'newclient' ? 'Añadir client' : 'Confirmar'"
      @formSubmit="handleSubmit"
      cancelLabel="Cancelar"
    />
  </section>
</template>

<script lang="ts">
import { State, Methods, Refs } from '@/types/pages/client-form-page.types'
import Icon from '@/components/icon.vue'
import http from '@/utils/axios-instance'
import { Empty } from '@/types/global.types'
import { defineComponent } from 'vue'
import { isAxiosError } from 'axios'
import FormButtons from '@/components/form-buttons.vue'

export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      formHeight: 0,
      formState: {
        clientName: '',
        clientNameDetails: '',
        contactPhone: '',
      },
      formErrors: {}
    }
  },
  components: {
    Icon,
    FormButtons,
  },
  methods: {
    async handleSubmit () {
      try {
        const { clientid } = this.$route.params;
        console.log(JSON.stringify(this.formState, null, 2))

        let res;

        if (this.$route.name === 'editclient') {
          res = await http.patch(`/clients/${clientid}`, this.formState)
        } else {
          res = await http.post(`/clients/${this.$store.state._id}`, this.formState)
        }

        console.log('res', res.data);
        this.$router.push({ name: 'client', params: { clientid: res.data.clientId } })
      } catch (err) {
        if (isAxiosError(err)) {
          this.formErrors = err.response?.data.validationError
        }
      }
    },
    getClientData () {
      const { clientName, clientNameDetails, contactPhone } = this.$route.query;
      this.formState = { 
        clientName: String(clientName), 
        clientNameDetails: String(clientNameDetails), 
        contactPhone: String(contactPhone)
      }
      // try {
      //   const res = await http.get(`/clients/${this.$route.params.clientid}?single=true`)
      //   const { sales, ...clientData } = res.data.clientData
      //   this.formState = clientData
      // } catch (err) {
      //   if (isAxiosError(err)) {
      //     this.formErrors = err.response?.data
      //   }
      // }
    }
  },
  async beforeMount () {
    if (this.$route.name === 'editclient') {
      this.getClientData()
    }
  },
  mounted () {
    const { formRef, actionsRef } = this.$refs as Refs;
    this.formHeight = window.innerHeight - formRef.offsetTop - actionsRef.$el.clientHeight - 30; 
    // this last part is just for testing purposes in my desktop environment, for some reason on firefox when tbody display is set to block then offsettop alwaqys returns 0
  },
})
</script>

<style>
.detail-description {
  font-size: .8rem;
}
</style>
