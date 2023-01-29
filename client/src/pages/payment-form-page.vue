<template>
<section id="page-content">
  <h1 id="header">
    <span>
      <Icon name="new-payment" />
      <span id="description">Nuevo pago de</span>
    </span>
    <span class="fh">{{ clientName }}</span>
    <span id="description">{{ clientNameDetails }}</span>
    <span class="description">por una venta realizada el {{ saleDate }}</span>
  </h1>

  <form 
    @submit.prevent="handleSubmit" 
    id="myform"
    :style="{ height: sectionHeight + 'px' }"
    ref="formRef"
  >
    <div class="input-container">
      <label for="date" class="f-rs">Fecha *</label>
      <input name="date" type="date" v-model="formState.paymentDate">
    </div>

    <div class="input-container">
      <label for="amountPaid" class="f-rs">Monto del pago *</label>
      <div>
        <span class="f-rs">S/</span>
        <input name="amountPaid" type="number" step="0.01" v-model="formState.amount">
      </div>
      <span class="tooltip">Actualmente su deuda es de S/ {{ unpaidAmount }}</span>
    </div>

    <!-- <div class="input-container"> -->
    <!--   <label for="additionalDetails" class="f-rs">Detalles adicionales</label> -->
    <!--   <textarea name="additionalDetails" type="textarea" v-model="formState.additionalDetails"> -->
    <!--   </textarea> -->
    <!-- </div> -->
  </form>

  <div id="actions" ref="actionsRef">
    <button type="submit" form="myform" class="action-button confirm f-rs">Confirmar pago</button> 
    <button type="button" class="action-button danger f-rs">Cancelar</button> 
  </div>
</section>
</template>

<script lang='ts'>
import Icon from '@/components/icon.vue'
import { format } from 'date-fns'
import { defineComponent } from 'vue';
import { State, Methods, Refs } from '@/types/pages/payment-form-page.types'
import { Empty } from '@/types/global.types';
import http from '@/utils/axios-instance';
import { SaleDataForPaymentForm } from '#backend/sale.types';
import { PaymentEditionData } from '#backend/payment.types';

export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      sectionHeight: 0,
      clientName: '',
      clientNameDetails: '',
      saleDate: '',
      unpaidAmount: NaN,
      formState: {
        paymentDate: format(new Date(), 'yyyy-MM-dd'),
        amount: NaN,
      }
    }
  },
  components: {
    Icon
  },
  methods: {
    async handleSubmit () {
      console.log(JSON.stringify(this.formState, null, 2));
    },
    async getPaymentData () {
      const { params: { clientid, saleid, paymentid }, name } = this.$route;
      let res;

      if (name === 'newpayment') {
        res = await http.get<{ saleData: SaleDataForPaymentForm }>(`/clients/${clientid}/sales/${saleid}?filter=paymentform`);
        const { clientName, clientNameDetails, unpaidAmount, saleDate } = res.data.saleData;
        this.clientName = clientName
        this.clientNameDetails = clientNameDetails
        this.unpaidAmount = unpaidAmount
        this.saleDate = saleDate
      }

      if (name === 'editpayment') {
        res = await http.get<{ paymentData: PaymentEditionData }>(`/clients/${clientid}/sales/${saleid}/payments/${paymentid}`);
        const { clientName, clientNameDetails, unpaidAmount, saleDate, paymentDate, amount } = res.data.paymentData;
        this.formState = { paymentDate, amount }
        this.clientName = clientName
        this.clientNameDetails = clientNameDetails
        this.unpaidAmount = unpaidAmount
        this.saleDate = saleDate
      }
    }
  },
  async beforeMount () {
    await this.getPaymentData()
  },
  mounted () {
    const { formRef, actionsRef } = this.$refs as Refs;
    this.sectionHeight = window.innerHeight - formRef.offsetTop - actionsRef.clientHeight - 50;
    console.log(this.formState.paymentDate);
  },
})
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

