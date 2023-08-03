<template>
  <section class="container p-4">
    <h1 class="d-flex flex-column align-items-baseline gap-2 align-items-center">
      <span class="d-flex gap-2 align-items-center">
        <Icon name="new-payment" />
        <span class="fs-6" v-if="$route.name === 'newpayment'">Nuevo pago de</span>
        <span class="fs-6" v-if="$route.name === 'editpayment'">Editar pago de</span>
      </span>
      <span class="fs-2 fw-bold">{{ $route.query.clientName }}</span>
      <span class="fs-6 fst-italic">{{ $route.query.clientNameDetails }}</span>
      <span class="fs-6">por una venta realizada el {{ saleDate }}</span>
    </h1>

    <form 
      class="d-flex flex-column gap-3"
      @submit.prevent="handleSubmit" 
      id="myform"
      :style="{ height: formHeight + 'px' }"
      ref="formRef"
    >
      <div class="d-flex flex-column align-items-start gap-3">
        <h2 class="fs-6 m-0"><label for="date">Fecha de venta *</label></h2>
        <date-picker 
          class="date-picker" 
          name="date" 
          v-model:value="formState.paymentDate"
          :formatter="dateFormat"
        >
        </date-picker>
      </div>

      <div class="d-flex flex-column align-items-start gap-3">
        <h2 class="fs-6 m-0"><label for="amountPaid">Monto del pago *</label></h2>
        <div class="w-100 d-flex flex-column align-items-start">
          <div class="input-group">
            <span class="input-group-text">S/</span>
            <input class="form-control" name="amountPaid" type="number" step="0.01" v-model="formState.amount">
          </div>
          <label class="error-message mt-1" for="amountPaid" v-if="formErrors">{{ formErrors.amount }}</label>
        </div>
        <span class="">Actualmente su deuda es de S/ {{ unpaidAmount }}</span>
      </div>
    </form>

    <FormButtons 
      ref="actionsRef"
      @formSubmit="handleSubmit"
      :confirmLabel="$route.name === 'newpayment' ? 'Añadir pago' : 'Confirmar'"
      cancelLabel="Cancelar"
    />

  </section>
</template>

<script lang='ts'>
import Icon from '@/components/icon.vue'
import { format } from 'date-fns'
import { defineComponent } from 'vue';
import { State, Methods, Refs } from '@/types/pages/payment-form-page.types'
import { Empty } from '@/types/global.types';
import { SaleDataForPaymentForm } from '#backend/sale.types';
import { PaymentEditionData } from '#backend/payment.types';
import FormButtons from '@/components/form-buttons.vue'
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css';
import http from '@/utils/axios-instance';
import { isAxiosError } from 'axios';

export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      formHeight: 0,
      clientName: '',
      clientNameDetails: '',
      saleDate: '',
      unpaidAmount: NaN,
      formState: {
        paymentDate: new Date(),
        amount: NaN,
      },
      formErrors: {},
    }
  },
  components: {
    Icon,
    DatePicker,
    FormButtons,
  },
  methods: {
    async handleSubmit () {
      try {
        const { params: { clientid, saleid, paymentid }, name } = this.$route
        if (name === 'newpayment') {
          await http.patch(`/clients/${clientid}/sales/${saleid}/payments`, this.formState)
        }
        if (name === 'editpayment' && paymentid) {
          await http.patch(`/clients/${clientid}/sales/${saleid}/payments/${paymentid}`, this.formState)
        }
        this.$router.push({ name: 'sale', params: { clientid, saleid } })
      } catch (err) {
        if (isAxiosError(err)) {
          this.formErrors = err.response?.data.validationError
        }
      }
    },
    async getPaymentData () {
      const { params: { clientid, saleid, paymentid }, name } = this.$route;
      let res;

      if (name === 'newpayment') {
        res = await http.get<{ saleData: SaleDataForPaymentForm }>(`/clients/${clientid}/sales/${saleid}?filter=paymentform`);
        const { clientName, clientNameDetails, unpaidAmount, saleDate } = res.data.saleData;
        this.unpaidAmount = unpaidAmount
        this.saleDate = format(new Date(saleDate), 'dd-MM-yyyy') 
      }

      if (name === 'editpayment') {
        res = await http.get<{ paymentData: PaymentEditionData }>(`/clients/${clientid}/sales/${saleid}/payments/${paymentid}`);
        const { clientName, clientNameDetails, unpaidAmount, saleDate, paymentDate, amount } = res.data.paymentData;
        this.formState = { paymentDate: new Date(paymentDate), amount }
        this.unpaidAmount = unpaidAmount
        this.saleDate = format(new Date(saleDate), 'dd-MM-yyyy') 
      }
    }
  },
  async beforeMount () {
    await this.getPaymentData()
  },
  mounted () {
    const { formRef, actionsRef } = this.$refs as Refs;
    console.log('window inner height', window.innerHeight);
    console.log('form offset top', formRef.offsetTop);
    console.log('actions ref height', actionsRef.$el);
    this.formHeight = window.innerHeight - formRef.offsetTop - actionsRef.$el.clientHeight - 30;
  },
})
</script>

<style>

.date-picker {
  width: 100%;
}
.date-picker input{
  height: 2.5rem;
}
</style>
