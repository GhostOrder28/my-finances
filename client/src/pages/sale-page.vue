<template>
  <section id='top-panel'>
    <div id="sale-info">
      <h1>Venta a Alma Delfina</h1>
      <time>date</time>
    </div>
    <div id="stats-container">
      <StatItem icon="total-value" label="Valor total" value="S/ 120" />
      <StatItem icon="amount-paid" label="Monto pagado" value="S/ 60" />
      <StatItem icon="debt" label="Deuda" value="S/ 60" />
    </div>
  </section>
  <section id="tabs-container">
    <button name="products" class="tab f-rs" @click="changeView">PRODUCTOS</button>
    <button name="payments" class="tab f-rs" @click="changeView">PAGOS</button>
  </section>
  <section id='page-content'>
    <table ref='tableRef'>
      <!-- <thead> -->
      <!--   <tr> -->
      <!--     <th class="f-rs">Nombre</th> -->
      <!--     <th class="f-rs">Deuda individual</th> -->
      <!--   </tr> -->
      <!-- </thead> -->
      <tbody 
        ref='tbodyRef'
        :style="{ height: tbodyHeight + 'px' }"
      >
        <div v-if="currentView === 'products'">
          <tr
            v-for="(item, idx) in saleMock.items"
            :key="'item' + idx"
          >
            <td class="f-rs">{{ item.item }}</td>
            <td class="f-rs">{{ `S/ ${item.value}` }}</td>
          </tr>
        </div>

        <div v-if="currentView === 'payments'">
          <tr
            v-for="(payment, idx) in saleMock.payments"
            :key="'item' + idx"
          >
            <td class="f-rs">{{ payment.date }}</td>
            <td class="f-rs">{{ `S/ ${payment.amountPaid}` }}</td>
          </tr>
        </div>
      </tbody>
    </table>
  </section>
  <PopupButton label="Añadir pago" />
</template>

<script>
import PopupButton from '@/components/popup-button' 
import StatItem from '@/components/stat-item'
import saleMock from '@/mocks/sale.mock'
import { getReferenceHeight } from '@/utils/utility-functions'
// mocks
export default {
  data () {
    return {
      saleMock,
      currentView: 'products',
      tbodyHeight: 0
    }
  },
  components: {
    StatItem,
    PopupButton
  },
  methods: {
    changeView (e) {
      this.currentView = e.target.name
    }
  },
  mounted () {
    const tbodyHeight = getReferenceHeight(this.$refs);
    this.tbodyHeight = tbodyHeight;
  }
}
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

