<template>
  <section class="container bg-green px-4 py-3">
    <div class="d-flex">
      <StatItem icon="total-debt" label="Deuda total" :value="receivables" />
      <StatItem icon="debtor" label="Deudores" :value="debtors" />
    </div>
  </section>
  <section class='container p-4'>
    <table class="table w-100 m-0" ref='tableRef'>
      <thead>
        <tr height="50" class="border-bottom border-2 border-dark-teal align-middle w-100 d-table">
          <th class="fs-6 p-0 text-dark-teal text-start">Nombre</th>
          <th class="fs-6 p-0 text-dark-teal text-end">Deuda individual</th>
        </tr>
      </thead>
      <tbody 
        :style="{ height: tbodyHeight + 'px' }"
        class="d-block overflow-scroll pb-5"
      >
        <router-link 
          v-for="(client, idx) in clientList"
          :key="'client' + idx"
          :to="{ name: 'client', params: { clientid: client._id.toString() } }"
          class="text-dark-teal text-decoration-none"
        >
          <tr height="50" class="align-middle border-bottom w-100 d-table">
            <td class="fs-6 text-start">{{ client.clientName }}</td>
            <td class="fs-6 text-end">S/ {{ client.currentDebt }}</td>
          </tr>
        </router-link>
      </tbody>
    </table>
  </section>
  <PopupButton label="Añadir cliente" :url="{ name: 'newclient' }" />
  <Spinner v-if="isLoading" />
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
import { UserAssets } from '#backend/user.types'
import Spinner from '@/components/spinner.vue'

// mocks
export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      receivables: 0,
      debtors: 0,
      clientList: [],
      tbodyHeight: 0,
      isLoading: false,
    }
  },
  methods: {
    async getClients () {
      try {
        this.isLoading = true
        const clientListRes = await http.get<{ clientList: ClientListItem[] }>(`/clients/${this.$store.state._id}`);
        const userAssetsRes = await http.get<{ userAssets: UserAssets }>(`/users/${this.$store.state._id}`);

        this.clientList = clientListRes.data.clientList
        this.receivables = userAssetsRes.data.userAssets.receivables
        this.debtors = userAssetsRes.data.userAssets.debtors
        this.isLoading = false
      } catch (err) {
        console.error(err);
      }
    }
  },
  components: {
    StatItem,
    PopupButton,
    Spinner,
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
