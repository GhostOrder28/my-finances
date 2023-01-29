<template>
  <section id='top-panel'>
    <div id="sale-info">
      <h1>Venta realizada a {{ clientData ? clientData.clientName : '' }}</h1>
      <time>{{ clientData ? clientData.sales.saleDate : '' }}</time>
    </div>
    <div id="stats-container">
      <StatItem icon="total-value" label="Valor total" :value="clientData ? clientData.sales.saleValue : NaN" />
      <StatItem icon="amount-paid" label="Monto pagado" :value="clientData ? clientData.sales.paidAmount : NaN" />
      <StatItem icon="debt" label="Deuda" :value="clientData ? clientData.sales.unpaidAmount : NaN" />
    </div>
  </section>
  <section id="tabs-container">
    <button name="products" class="tab f-rs" @click="changeView">PRODUCTOS</button>
    <button name="payments" class="tab f-rs" @click="changeView">PAGOS</button>
  </section>
  <section id='page-content'>
    <table ref='tableRef'>
      <thead v-if="currentView === 'products'">
        <tr>
          <th class="f-rs">Producto</th>
          <th class="f-rs">Cantidad</th>
          <th class="f-rs">Precio/unidad</th>
        </tr>
      </thead>

      <thead v-if="currentView === 'payments'">
        <tr>
          <th class="f-rs">Fecha de pago</th>
          <th class="f-rs">Cantidad</th>
        </tr>
      </thead>
      <tbody 
        ref='tbodyRef'
        :style="{ height: tbodyHeight + 'px' }"
      >
        <div v-if="currentView === 'products' && clientData">
          <tr
            v-for="(item, idx) in clientData.sales.items"
            :key="'item' + idx"
          >
            <td class="f-rs">{{ item.name }}</td>
            <td class="f-rs">{{ item.quantity }}</td>
            <td class="f-rs">S/ {{ item.pricePerUnit }}</td>
          </tr>
        </div>

        <div v-if="currentView === 'payments' && clientData">
          <tr
            v-for="(payment, idx) in clientData.sales.payments"
            :key="'item' + idx"
          >
            <td class="f-rs">{{ payment.paymentDate }}</td>
            <td class="f-rs">S/ {{ payment.amount }}</td>
          </tr>
        </div>

        <div v-if="currentView === 'payments'">
          <tr
            v-for="(payment, idx) in payments"
            :key="'item' + idx"
          >
            <td class="f-rs">{{ payment.date }}</td>
            <td class="f-rs">S/ {{ payment.amountPaid }}</td>
          </tr>
        </div>
      </tbody>
    </table>
  </section>
  <PopupButton label="Añadir pago" :url="`${$route.path}newpayment`"/>
</template>

<script lang="ts">
import PopupButton from '@/components/popup-button.vue' 
import StatItem from '@/components/stat-item.vue'
import { getReferenceHeight } from '@/utils/utility-functions'
import { defineComponent } from 'vue'
import { State, Methods } from '@/types/pages/sale-page.types'
import { Empty } from '@/types/global.types'
import { Client } from '#backend/client.types'
import { isAxiosError } from 'axios'
import http from '@/utils/axios-instance'

export default defineComponent<any, Empty, State, Empty, Methods>({
  data () {
    return {
      clientData: undefined,
      currentView: 'products',
      tbodyHeight: 0
    }
  },
  components: {
    StatItem,
    PopupButton
  },
  methods: {
    changeView (e: MouseEvent) {
      this.currentView = (e.target as HTMLButtonElement).name
    },
    async getSaleData () {
      try {
        const { clientid, saleid } = this.$route.params;
        const res = await http.get<{ saleData: Client }>(`/clients/${clientid}/sales/${saleid}`)
        console.log('sale data: ', res.data.saleData)

        this.clientData = res.data.saleData
      } catch (err) {
        if (isAxiosError(err)) {
          console.error(err.response)
        }
      }
    }
  },
  watch: {
    clientData (newVal) {
      console.log('new value', newVal);
    }
  },
  async beforeMount () {
    await this.getSaleData();
  },
  mounted () {
    const tbodyHeight = getReferenceHeight(this.$refs);
    this.tbodyHeight = tbodyHeight;
  }
})
</script>

<style scoped>
#stats-container {
  justify-content: space-between;
}
#tabs-container {
  display: flex;
}
.tab {
  flex: 1;
  padding: 1.3rem;
  border: none;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: .15em;
  background-color: #3768E5;
  color: #CBD8FB;
}
#sale-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1, time {
  font-size: 1.7rem;
  margin: 0; padding: 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr {
  height: 5rem;
  width: 100%;
  display: table;
  vertical-align: middle;
}
thead tr {
  border-bottom: 2px solid #27373D;
}
tbody {
  overflow: scroll;
  padding-bottom: 3.5rem;
  display: block;
}
tbody tr + tr {
  border-top: 1px solid #EDEDED;
}
td:nth-child(1), th:nth-child(1) {
  width: 60%;
  text-align: left;
}
td:nth-child(2), th:nth-child(2) {
  width: 40%;
  text-align: right;
}
</style>

