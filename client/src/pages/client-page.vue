<template>
  <section id='top-panel'>
    <div id="stats-container">
      <div id="client-info">
        <h1>Alma Delfina</h1>
        <address>
          <Icon name="phone" />
          <span>525 2565</span>
        </address>
      </div>
      <StatItem icon="total-debt" label="Deuda total" value="S/ 124" />
    </div>
  </section>
  <section 
    id='page-content'
  >
    <table ref='tableRef'>
      <thead>
        <tr>
          <th class="f-rs">Venta</th>
          <th class="f-rs">Total</th>
          <th class="f-rs">Pagado</th>
          <th class="f-rs">Deuda</th>
        </tr>
      </thead>
      <tbody 
        ref='tbodyRef'
        :style="{ height: tbodyHeight + 'px' }"
      >
        <tr
          v-for="(sale, idx) in clientSales"
          :key="'sale' + idx"
        >
          <td class="f-rs">
            <time class="ls">{{ sale.date }}</time>
            <ul>
              <li
                v-for="(item, itemIdx) in sale.items"
                :key="'item' + itemIdx"
              >
                {{ item }}
              </li>
            </ul>
          </td>
          <td class="f-rs">{{ sale.totalAmount }}</td>
          <td class="f-rs">{{ sale.paid }}</td>
          <td class="f-rs">{{ sale.owed }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <PopupButton label="Nueva venta" />
</template>

<script>
import StatItem from '@/components/stat-item'
import PopupButton from '@/components/popup-button' 
import Icon from '@/components/icon'
import { getReferenceHeight } from '@/utils/utility-functions'
// mocks
import clientSales from '@/mocks/client-sales.mock'
export default {
  data () {
    return {
      clientSales,
      tbodyHeight: 0
    }
  },
  components: {
    Icon,
    StatItem ,
    PopupButton
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
h1 {
  font-size: 2.6rem;
  margin: 0;
  padding: 0;
  font-weight: 900;
}
#client-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
address {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 1.7rem;
  font-style: normal;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr {
  height: 5rem;
  width: 100%;
  display: table;
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
  width: 40%;
  text-align: left;
}
td:nth-child(n+2):nth-child(-n+4), th:nth-child(n+2):nth-child(-n+4) {
  width: 20%;
  text-align: right;
}
ul {
  margin: 0;
  padding: 0;
}
time {
  color: #6B6B6B;
}
</style>

