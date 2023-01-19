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
  <form @submit.prevent="handleSubmit">
    <div class="input-container">
      <label for="clientName" class="f-rs">Nombre *</label>
      <input v-model="formState.clientName" name="clientName" type="text" placeholder="Nombre del cliente">
    </div>
    <div class="input-container">
      <label for="clientNameDetails" class="f-rs">Detalle del nombre</label>
      <input v-model="formState.clientNameDetails" name="clientNameDetails" type="text" placeholder="amigo, vecino, etc">
      <span class="tooltip">Esto es opcional, pero es útil para diferenciar entre dos personas con el mismo nombre.</span>
    </div>
    <div class="input-container">
      <label for="contactPhone" class="f-rs">Número de contacto</label>
      <input v-model="formState.contactPhone" name="contactPhone" type="text" placeholder="Número para contactar al cliente">
    </div>
    <div id="actions">
      <button type="submit" class="f-rs action-button confirm">Añadir cliente</button>
      <button type="button" class="f-rs action-button danger">Cancelar</button>
    </div>
  </form>
</section>
</template>

<script>
import Icon from '@/components/icon'
import http from '@/utils/axios-instance'

export default {
  data () {
    return {
      sectionHeight: 0,
      formState: {
        clientName: '',
        clientNameDetails: '',
        contactPhone: '',
      }
    }
  },
  components: {
    Icon
  },
  mounted () {
    const { sectionRef } = this.$refs;
    const isFirefox = typeof InstallTrigger !== 'undefined';    
    this.sectionHeight = window.innerHeight - sectionRef.offsetTop - (isFirefox ? 50 : 0); 
    // this last part is just for testing purposes in my desktop environment, for some reason on firefox when tbody display is set to block then offsettop alwaqys returns 0
  },
  watch: {
    formState (value, oldValue) {
      console.log(value);
    }
  },
  methods: {
    async handleSubmit () {
      const { clientName, clientNameDetails, contactPhone } = this.formState;
      console.log(JSON.stringify(this.formState, null, 2));
      const res = await http.post(`/clients/${this.$store.state._id}`, {
        clientName,
        clientNameDetails,
        contactPhone,
      });
    }
  }
}
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
