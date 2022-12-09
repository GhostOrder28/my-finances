<template>
  <section id='top-panel'>
    <div id="stats-container">
      <StatItem icon="total-debt" label="Deuda total" value="S/ 320" />
      <StatItem icon="debtor" label="Deudores" value="4" />
    </div>
  </section>
  <section 
    id='page-content'
  >
    <table ref='tableRef'>
      <thead>
        <tr>
          <th class="f-rs">Nombre</th>
          <th class="f-rs">Deuda individual</th>
        </tr>
      </thead>
      <tbody 
        ref='tbodyRef'
        :style="{ height: tbodyHeight + 'px' }"
      >
        <tr
          v-for="(client, idx) in clientList"
          :key="'client' + idx"
        >
          <td class="f-rs">{{ client.name }}</td>
          <td class="f-rs">{{ `S/ ${client.debt}` }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <PopupButton label="Añadir cliente" />
</template>

<script>
import PopupButton from '@/components/popup-button' 
import StatItem from '@/components/stat-item'
import { getReferenceHeight } from '@/utils/utility-functions'
// mocks
import { clientList } from '@/mocks/clients.mock'
export default {
  data () {
    return {
      clientList,
      tbodyHeight: 0
    }
  },
  components: {
    StatItem,
    PopupButton
  },
  mounted () {
    const tbodyHeight = getReferenceHeight(this.$refs);
    this.tbodyHeight = tbodyHeight;
  }
}
</script>

<style scoped>
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
  width: 60%;
  text-align: left;
}
td:nth-child(2), th:nth-child(2) {
  width: 40%;
  text-align: right;
}
</style>
