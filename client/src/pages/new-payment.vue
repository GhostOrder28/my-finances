<template>
<section id="page-content">
  <h1 id="header">
    <span>
      <Icon name="new-payment" />
      <span id="description">Nuevo pago de</span>
    </span>
    <span class="fh">Alma Delfina</span>
  </h1>

  <form 
    @submit.prevent="handleSubmit" 
    id="myform"
    :style="{ height: sectionHeight + 'px' }"
    ref="formRef"
  >
    <div class="input-container">
      <label for="date" class="f-rs">Fecha *</label>
      <input name="date" type="date" v-model="formState.date">
    </div>

    <div class="input-container">
      <label for="amountPaid" class="f-rs">Monto del pago *</label>
      <div>
        <span class="f-rs">S/</span>
        <input name="amountPaid" type="number" step="0.01" v-model="formState.amountPaid">
      </div>
      <span class="tooltip">Actualmente su deuda es de S/ 320</span>
    </div>

    <div class="input-container">
      <label for="additionalDetails" class="f-rs">Detalles adicionales</label>
      <textarea name="additionalDetails" type="textarea" v-model="formState.additionalDetails">
      </textarea>
    </div>
  </form>

  <div id="actions" ref="actionsRef">
    <button type="submit" form="myform" class="action-button confirm f-rs">Confirmar venta</button> 
    <button type="button" class="action-button danger f-rs">Cancelar</button> 
  </div>
</section>
</template>

<script>
import Icon from '@/components/icon'
import { format } from 'date-fns'
const itemInitialState = { name: '', quantity: 1, pricePerUnit: undefined };
export default {
  data () {
    return {
      sectionHeight: 0,
      formState: {
        date: format(new Date(), 'yyyy-MM-dd'),
        amountPaid: undefined,
        additionalDetails: '',
      }
    }
  },
  components: {
    Icon
  },
  methods: {
    handleSubmit () {
      console.log(JSON.stringify(this.formState, null, 2));
    },
    handleRemove (idxToRemove) {
      const remainingItems = this.formState.items.filter((_, idx) => idxToRemove !== idx);
      this.formState.items = remainingItems;
    },
    handlePress (e, idx) {
      if (e.target.value.length !== 0 && idx === this.formState.items.length - 1) {
        this.formState.items = [ ...this.formState.items, { ...itemInitialState } ]
      }
    }
  },
  mounted () {
    const { formRef, actionsRef } = this.$refs;
    this.sectionHeight = window.innerHeight - formRef.offsetTop - actionsRef.clientHeight - 50;
    console.log(this.formState.date);
  },
}
</script>

<style scoped>
#header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
#description {
  margin-left: .5rem;
}
.input-container > div {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}
input[type=number] {
  appearance: textfield;
}
.item:last-child .remove-btn {
  visibility: hidden;
}
</style>

