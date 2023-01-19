<template>
<section id="page-content">
  <h1 id="header">
    <span>
      <Icon name="new-sale" />
      <span id="description">Nueva venta a</span>
    </span>
    <span class="fh">Alma Delfina</span>
  </h1>

  <form 
    @submit.prevent="handleSubmit" 
    id="myform"
  >
    <div class="input-container">
      <label for="name" class="f-rs">Fecha *</label>
      <input type="date" v-model="formState.date" name="date">
    </div>

    <div class="input-container">
      <label for="initialPayment" class="f-rs">Pago inicial</label>
      <input type="number" v-model="formState.initialPayment" name="initialPayment">
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
            @focus="$event.target.select()"
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
const itemInitialState = { 
  name: '', 
  quantity: 1, 
  pricePerUnit: undefined 
};
export default {
  data () {
    return {
      itemsContainerHeight: 0,
      formState: {
        date: format(new Date(), 'yyyy-MM-dd'),
        initialPayment: 0,
        payments: [],
        items: [ { ...itemInitialState }, { ...itemInitialState } ],
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
  watch: {
    initialPayment (newValue, oldValue) {
      if (newValue > 0) {
        this.formState.payments = [{
          date: this.formState.date,
          amount: newValue,
        }]
      }
      console.log(newValue);
    }
  },
  mounted () {
    // document.addEventListener()
    const { itemsRef, actionsRef } = this.$refs;
    console.log('window height', window.innerHeight);
    console.log('itemsRef offset top', itemsRef.offsetTop);
    this.itemsContainerHeight = window.innerHeight - itemsRef.offsetTop - actionsRef.clientHeight - 50;
    console.log(this.formState.date);
  },
  updated () {
    console.log(this.formState.date);
    // document.addEventListener()
    // const { itemsRef, actionsRef } = this.$refs;
    // console.log('window height', window.innerHeight);
    // console.log('itemsRef offset top', itemsRef.offsetTop);
    // this.itemsContainerHeight = window.innerHeight - itemsRef.offsetTop - actionsRef.clientHeight - 50;
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
.item {
  display: flex;
  gap: 2rem;
}
.item div:nth-child(1) {
  flex: .6;
  display: flex;
  gap: 2rem;
}
.item div:nth-child(2) {
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
.item:last-child .remove-btn {
  visibility: hidden;
}
</style>
