<template>
<section id="page-content">
  <h1 id="header">
    <span>
      <Icon name="new-sale" />
      <span v-if="$route.name === 'newsale'" id="description">Nueva venta realizada a</span>
      <span v-if="$route.name === 'editsale'" id="description">Editar venta realizada a</span>
    </span>
    <span class="fh">{{ clientName }}</span>
    <span class="description">{{ clientNameDetails }}</span>
  </h1>

  <form 
    @submit.prevent="handleSubmit" 
    id="myform"
  >
    <div class="input-container">
      <label for="date" class="f-rs">Fecha *</label>
      <input type="date" v-model="formState.saleDate" name="date">
      <label for="date" class="f-rs">{{ formErrors ? formErrors.date : '' }}</label>
    </div>

    <div v-if="$route.name === 'newsale'" class="input-container">
      <label for="initialPayment" class="f-rs">Pago inicial</label>
      <input type="number" v-model="initialPayment" name="initialPayment">
      <label for="initialPayment" class="f-rs">{{ formErrors ? formErrors.payments : '' }}</label>
    </div>

    <div id="labels">
      <span class="f-rs">Producto / Cantidad</span>
      <span class="f-rs">Precio unitario</span>
    </div>

    <div 
      id="items" 
      ref="itemsRef"
      :style="{ height: itemsContainerHeight + 'px' }"
    >
      <div v-for="(item, idx) in formState.items" class="item" :key="'item' + idx">
        <div class="content">
          <div>
            <input
              v-model="formState.items[idx].name" 
              @input="handlePress($event, idx)"
              name="name" 
              type="text" 
              class="name"
            >
            <input
              v-model="formState.items[idx].quantity" 
              name="quantity" 
              type="number"
              class="quantity"
              @focus="($event.target as HTMLInputElement).select()"
              @contextmenu.prevent
            >
          </div>
          <div>
            <input v-model="formState.items[idx].pricePerUnit" name="pricePerUnit" type="number" class="price">
            <button @click="handleRemove(idx)" type="button" class="remove-btn">
              <Icon name="cross" />
            </button>
          </div>
        </div>
        <div class="errorMessages">
          <label for="name">{{ formErrors ? formErrors[`name${idx}`] : '' }}</label>
          <label for="quantity">{{ formErrors ? formErrors[`quantity${idx}`] : '' }}</label>
          <label for="pricePerUnit">{{ formErrors ? formErrors[`pricePerUnit${idx}`] : '' }}</label>
        </div>
      </div>
    </div>
  </form>

  <div id="actions" ref="actionsRef">
    <button type="submit" form="myform" class="action-button confirm f-rs">Confirmar venta</button> 
    <button type="button" class="action-button danger f-rs">Cancelar</button> 
  </div>
</section>
</template>

<script lang='ts'>
import Icon from '@/components/icon.vue'
import { format } from 'date-fns'
import { defineComponent } from 'vue'
import { State, Methods, Refs } from '@/types/pages/sale-form-page.types'
import { Empty } from '@/types/global.types'
import { SaleFormData, isSalePostReqBody } from '#backend/sale.types'
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
        saleDate: '',
        items: [ { ...itemInitialState }, { ...itemInitialState } ],
      },
      formErrors: undefined
    }
  },
  components: {
    Icon
  },
  methods: {
    async handleSubmit () {
      console.log(JSON.stringify(this.formState, null, 2));
      try {
        if (this.$route.name === 'newsale') {
          if (!isSalePostReqBody(this.formState)) return;
          await http.patch(`/clients/${this.$route.params.clientid}/sales`, {
            ...this.formState,
            items: this.getExistentItems()
          })
        } 
        if(this.$route.name === 'editsale') {
          await http.patch(`/clients/${this.$route.params.clientid}/sales/${this.$route.params.saleid}`, {
            ...this.formState,
            items: this.getExistentItems()
          })
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
        const res = await http.get<{ saleData: SaleFormData }>(`/clients/${clientid}/sales/${saleid}?filter=saleform`)
        console.log('res', res.data.saleData);
        const { saleDate, items, clientName, clientNameDetails } = res.data.saleData;
        this.formState = { saleDate, items: [ ...items, itemInitialState ] }
        this.clientName = clientName
        this.clientNameDetails = clientNameDetails
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
          paymentDate: this.formState.saleDate, // the initial payment is always the same day as the sale date
          amount: newValue,
        }]
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
    if (this.$route.name === 'editsale') {
      await this.getSaleData()
    }
  },
  mounted () {
    const { itemsRef, actionsRef } = this.$refs as Refs;
    console.log('window height', window.innerHeight);
    console.log('itemsRef offset top', itemsRef.offsetTop);
    console.log('route', this.$route);
    this.itemsContainerHeight = window.innerHeight - itemsRef.offsetTop - actionsRef.clientHeight - 50;
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
#labels {
  display: flex;
}
#labels > span:nth-child(1) {
  flex: .6;
  text-align: left;
}
#labels > span:nth-child(2) {
  flex: .4;
  text-align: left;
}
#items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
}
.item .content{
  display: flex;
  gap: 2rem;
}
.item .content div:nth-child(1) {
  flex: .6;
  display: flex;
  gap: 2rem;
}
.item .content div:nth-child(2) {
  flex: .4;
  display: flex;
  gap: 2rem;
}
.name {
  flex: .9
}
.quantity {
  flex: .1
}
.price {
  flex: .7
}
.errorMessages label {
  display: block;
  text-align: left;
}
.remove-btn {
  flex: .3
}
input[type=number] {
  appearance: textfield;
}
.remove-btn {
  display: flex;
  align-items: center;
  padding: 0;
  background: none;
  border: none;
}
.item:last-child .content .remove-btn {
  visibility: hidden;
}
</style>
