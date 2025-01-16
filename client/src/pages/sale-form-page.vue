<template>
  <section class="container p-4">
  <h1 class="d-flex flex-column align-items-baseline gap-2 align-items-center">
    <span class="d-flex gap-2 align-items-center">
      <Icon name="new-sale" />
      <span class="fs-6" v-if="$route.name === 'newsale'" >Nueva venta realizada a</span>
      <span class="fs-6" v-if="$route.name === 'editsale'" >Editar venta realizada a</span>
    </span>
    <span class="fs-2 fw-bold">{{ $route.query.clientName }}</span>
    <span class="fs-6 fst-italic">{{ $route.query.clientNameDetails }}</span>
  </h1>

  <form 
    @submit.prevent="handleSubmit" 
    id="myform"
    class="d-flex flex-column gap-4 mt-4"
  >
    <div class="d-flex flex-column align-items-start gap-3">
      <h2 class="fs-6 m-0"><label for="date">Fecha de venta</label></h2>
      <date-picker 
        class="date-picker" 
        name="date" 
        v-model:value="formState.saleDate"
        :formatter="dateFormat"
      >
      </date-picker>
    </div>

    <div v-if="$route.name === 'newsale'" class="d-flex flex-column align-items-start gap-3">
      <h2 class="fs-6 m-0"><label for="initialPayment">Pago inicial</label></h2>
      <input 
          class="form-control" 
          type="number" 
          v-model="initialPayment" 
          name="initialPayment"
          @focus="($event.target as HTMLInputElement).select()"
        >
      <label class="error-message" for="initialPayment">{{ formErrors ? formErrors.payments : '' }}</label>
    </div>

    <div 
      class="d-flex flex-column gap-3 overflow-scroll"
      ref="itemsRef"
      :style="{ height: itemsContainerHeight + 'px' }"
    >
      <h2 class="fs-6 m-0 text-start">Productos</h2>
      <div
        v-for="(item, idx) in formState.items"
        :key="'item' + idx"
      >
        <div class="input-group gap-0">
          <input
            class="form-control name-field"
            v-model="formState.items[idx].name" 
            @input="handlePress($event, idx)"
            name="name" 
            type="text" 
            placeholder="Nombre"
          />
          <input
            class="form-control quantity-field"
            v-model="formState.items[idx].quantity" 
            name="quantity" 
            type="number"
            @focus="($event.target as HTMLInputElement).select()"
            @contextmenu.prevent
          />
          <input 
            class="form-control price-field"
            v-model="formState.items[idx].pricePerUnit" 
            name="pricePerUnit" 
            type="number"
            placeholder="Precio"
          />
          <button 
            class="btn btn-outline-danger delete-button"
            @click="handleRemove(idx)" 
            type="button"
          >
            <Icon name="cross" />
          </button>
        </div>
        <div class="d-flex flex-column align-items-start mt-1">
          <label class="error-message" for="name" v-if="formErrors && formErrors[`name${idx}`]">{{ formErrors[`name${idx}`] }}</label>
          <label class="error-message" for="quantity" v-if="formErrors && formErrors[`quantity${idx}`]">{{ formErrors[`quantity${idx}`] }}</label>
          <label class="error-message" for="pricePerUnit" v-if="formErrors && formErrors[`pricePerUnit${idx}`]">{{ formErrors[`pricePerUnit${idx}`] }}</label>
        </div>
      </div>
    </div>
  </form>

  <FormButtons 
    ref="actionsRef"
    :confirmLabel="$route.name === 'newsale' ? 'Confirmar venta' : 'Confirmar'"
    @formSubmit="handleSubmit"
    cancelLabel="Cancelar"
  />
  </section>
</template>

<script lang='ts'>
import Icon from '@/components/icon.vue'
import { format } from 'date-fns'
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import { defineComponent } from 'vue'
import { State, Methods, Refs } from '@/types/pages/sale-form-page.types'
import { Empty } from '@/types/global.types'
import { SaleFormData, isSalePostReqBody } from '../types/entities/sale.types'
import FormButtons from '@/components/form-buttons.vue'
import http from '@/utils/axios-instance'
import { isAxiosError } from 'axios'

const itemInitialState = { 
  name: '', 
  quantity: 1, 
  pricePerUnit: NaN 
};
export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      itemsContainerHeight: 0,
      initialPayment: 0,
      formState: {
        saleDate: new Date(),
        items: [ { ...itemInitialState }, { ...itemInitialState } ],
        ...this.$route.name === 'newsale' ? { payments: [] } : {}
      },
      formErrors: undefined,
      dateFormat: {
        stringify: (date) => {
          return date ? format(date, 'dd/MM/yyyy') : ''
        }
      }
    }
  },
  components: {
    Icon,
    DatePicker,
    FormButtons
  },
  methods: {
    async handleSubmit () {
      console.log(JSON.stringify(this.formState, null, 2));
      console.log('route name', this.$route.name);
      try {
        if (this.$route.name === 'newsale') {
          if (!isSalePostReqBody(this.formState)) return;

          const res = await http.patch(`/clients/${this.$route.params.clientid}/sales`, {
            ...this.formState,
            items: this.getExistentItems()
          })

          this.$router.push({ 
            name: 'sale', 
            params: { clientid: this.$route.params.clientid, saleid: res.data.saleId } 
          })
        } 

        if(this.$route.name === 'editsale') {
          await http.patch(`/clients/${this.$route.params.clientid}/sales/${this.$route.params.saleid}`, {
            ...this.formState,
            items: this.getExistentItems()
          })

          this.$router.push({ name: 'sale', params: this.$route.params })
        }
      } catch (err) {
        if (isAxiosError(err)) {
          this.formErrors = err.response?.data.validationError
        }
      }
    },
    async handleRemove (idxToRemove) {
      const remainingItems = this.formState.items.filter((_, idx) => idxToRemove !== idx);
      this.formState.items = remainingItems;
    },
    handlePress (e, idx) {
      if ((e.target as HTMLInputElement).value.length !== 0 && idx === this.formState.items.length - 1) {
        this.formState.items = [ ...this.formState.items, { ...itemInitialState } ]
      }
    },
    getExistentItems () {
      return this.formState.items.filter((_, idx) => idx !== this.formState.items.length - 1);
    },
    async getSaleData () {
      try {
        const { clientid, saleid } = this.$route.params;
        if (this.$route.name === 'editsale') {
          const res = await http.get<{ saleData: SaleFormData }>(`/clients/${clientid}/sales/${saleid}?filter=saleform`)
          console.log('res', res.data.saleData);
          const { saleDate, items, clientName, clientNameDetails } = res.data.saleData;
          this.formState = { saleDate: new Date(saleDate), items: [ ...items, itemInitialState ] }
          this.clientName = clientName
          this.clientNameDetails = clientNameDetails
        }
      } catch (err) {
        if (isAxiosError(err)) {
          this.formErrors = err.response?.data
        } else {
          console.error(err)
        }
      }
    }
  },
  watch: {
    initialPayment (newValue) {
      if (!isSalePostReqBody(this.formState)) return;
      if (newValue > 0) {
        this.formState.payments = [{
          paymentDate: new Date(this.formState.saleDate), // the initial payment is always the same day as the sale date
          amount: newValue,
        }]
      }
    },
    'formState.saleDate': function (newValue: Date) {
      if (!isSalePostReqBody(this.formState)) return;
      if (this.formState.payments.length) {
        this.formState.payments[0].paymentDate = new Date(newValue)
      }
    },
    formState (newValue) {
      console.log('formState new value: ', JSON.stringify(newValue, null, 2))
      return newValue.payments;
    },
    formErrors (newValue) {
      console.log('formErrors', newValue);
    }
  },
  async beforeMount () {
    await this.getSaleData()
  },
  mounted () {
    const { itemsRef, actionsRef } = this.$refs as Refs;
    this.itemsContainerHeight = window.innerHeight - itemsRef.offsetTop - actionsRef.$el.clientHeight - 30;
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
.input-group .name-field {
  flex: 4
}
.input-group .quantity-field {
  flex: 1
}
.input-group .price-field {
  flex: 2
}
.input-group .delete-button {
  flex: .5
}
input[type=number]{
    appearance: textfield;
}
</style>
