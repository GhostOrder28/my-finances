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
          <td class="f-rs">{{ client.clientName }}</td>
          <td class="f-rs">{{ `S/ ${client.currentDebt}` }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <PopupButton type="link" label="Añadir cliente" url='newclient' />
</template>

<script lang="ts">
import PopupButton from '@/components/popup-button.vue' 
import StatItem from '@/components/stat-item.vue'
import { getReferenceHeight } from '@/utils/utility-functions'
import http from '@/utils/axios-instance'
import { ClientListItem } from '#backend/client.types'
import { defineComponent } from 'vue'
import { State, Methods, Refs } from '@/types/pages/client-list-page.types'
import { Empty } from '@/types/global.types'

// mocks
export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      clientList: [],
      tbodyHeight: 0
    }
  },
  methods: {
    async getClients () {
      try {
        const res = await http.get<{ clientList: ClientListItem[] }>(`/clients/${this.$store.state._id}`);
        console.log(res.data.clientList);
        this.clientList = res.data.clientList
      } catch (err) {
        console.error(err);
      }
    }
  },
  components: {
    StatItem,
    PopupButton
  },
  async beforeMount () {
    await this.getClients()
  },
  mounted () {
    const tbodyHeight = getReferenceHeight(this.$refs as Refs);
    this.tbodyHeight = tbodyHeight;
  }
})
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
