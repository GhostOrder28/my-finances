<template>
  <section id='top-panel'>
    <div id="stats-container">
      <div id="client-info">
        <h1>{{ clientData ? clientData.clientName : ''}}</h1>
        <address>
          <Icon name="phone" />
          <span>{{ clientData ? clientData.contactPhone : '' }}</span>
        </address>
      </div>
      <StatItem icon="total-debt" label="Deuda total" :value="clientData ? clientData.currentDebt : 0" />
    </div>
  </section>
  <section 
    id='page-content'
  >
    <table ref="tableRef">
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
        <div v-if="clientData">
          <tr
            v-for="(sale, idx) in clientData.sales"
            :key="'sale' + idx"
          >
            <router-link 
              :to="`${$route.path}/sale/${sale._id}`"
            >
              <td class="f-rs">
                <time class="ls">{{ sale.saleDate }}</time>
                <ul>
                  <li
                    v-for="(item, itemIdx) in sale.items"
                    :key="'item' + itemIdx"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </td>
              <td class="f-rs">{{ sale.saleValue }}</td>
              <td class="f-rs">{{ sale.paidAmount }}</td>
              <td class="f-rs">{{ sale.unpaidAmount }}</td>
            </router-link>
          </tr>
        </div>
      </tbody>
    </table>
  </section>
  <PopupButton label="Nueva venta" :url="{ name: 'newsale',  params: { clientid: $route.params.clientid } }" />
</template>

<script lang='ts'>
import StatItem from '@/components/stat-item.vue'
import PopupButton from '@/components/popup-button.vue' 
import Icon from '@/components/icon.vue'
import { getReferenceHeight, getReferenceHeight2 } from '@/utils/utility-functions'
import { defineComponent } from 'vue'
import { State, Refs, Methods } from '@/types/pages/client-page.types'
import { Empty } from '@/types/global.types'
import http from '@/utils/axios-instance'

export default defineComponent<Empty, Empty, State, Empty, Methods>({
  // for some Reason if I pass Props to the first parameter in defineComponent typescript thinks 'props' is undefined, so for now I will let it as any.

  data () {
    return {
      clientData: undefined, // I've tried adding a type predicate to {} | ClientResponse so I can initialize this prop as an empty object instead of undefined but for some reason type  predicates doesn't work on Vue
      tbodyHeight: 0
    }
  },
  methods: {
    async getClientData () {
      try {
        const res = await http.get(`/clients/${this.$route.params.clientid}?single=true`);
        console.log('res', res.data.clientData);

        this.clientData = res.data.clientData;
      } catch (err) {
        console.error(err)
      }
    }
  },
  components: {
    Icon,
    StatItem,
    PopupButton
  },
  async beforeMount () {
    await this.getClientData();
  },
  mounted () {
    const tbodyHeight = getReferenceHeight(this.$refs as Refs);
    this.tbodyHeight = tbodyHeight;
  }
})
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
