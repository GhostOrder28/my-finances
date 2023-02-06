<template>
  <section class="container d-flex flex-column bg-green p-4 gap-3">
    <BackLink 
      entity="Clientes"
      :url="{ name: 'clients' }"
    /> 
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-column gap-2 d-flex flex-column gap-1 flex-grow-1">
        <h1 class="fs-2 fw-bolder text-start m-0">{{ clientData ? clientData.clientName : ''}}</h1>
        <address class="d-flex align-items-center gap-1 fs-6 m-0">
          <Icon name="phone" />
          <span>{{ clientData ? clientData.contactPhone : '' }}</span>
        </address>
      </div>
      <StatItem icon="total-debt" label="Deuda total" :value="clientData ? clientData.currentDebt : 0" />
    </div>
    <div class="d-flex gap-3">
      <EditButton
        :url="{ 
          name: 'editclient', 
          params: { clientid: $route.params.clientid },
          query: {
            clientName: clientData?.clientName, 
            clientNameDetails: clientData?.clientNameDetails,
            contactPhone: clientData?.contactPhone
          }
        }"
        :label="true"
      />
      <DeleteButton 
        deleteEvent="deleteClientIntent" 
        @deleteClientIntent="declareClientDeletionIntent"
        :label="true"
      />
    </div>
  </section>
  <section class="container p-4">
    <table ref="tableRef" class="table w-100 m-0">
      <thead>
        <tr height="50" class="align-middle w-100 d-table">
          <th class="border-0 sale-col fs-6 p-0 text-dark-teal text-start">Venta</th>
          <th class="border-0 stats-col fs-6 p-0 text-dark-teal text-end">Total</th>
          <th class="border-0 stats-col fs-6 p-0 text-dark-teal text-end">Pagado</th>
          <th class="border-0 stats-col fs-6 p-0 text-dark-teal text-end">Deuda</th>
        </tr>
      </thead>
      <tbody 
       :style="{ height: tbodyHeight + 'px' }"
        class="d-block table-group-divider pb-5 overflow-scroll w-100"
      >
        <div v-if="clientData">
          <router-link 
            v-for="(sale, idx) in clientData.sales"
            :key="'sale' + idx"
            :to="`${$route.path}/sale/${sale._id}`"
            class="row-link d-block border-top px-0 py-3 text-dark-teal text-decoration-none"
          >
            <tr
              class="align-middle w-100 d-table"
            >
              <td class="sale-col fs-6 text-start text-dark-teal">
                <time class="text-dark-teal text-opacity-50 fs-6">{{ sale.saleDate }}</time>
                <ul class="list-unstyled m-0">
                  <li
                    v-for="(item, itemIdx) in sale.items"
                    :key="'item' + itemIdx"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </td>
              <td class="stats-col fs-6 text-end">S/ {{ sale.saleValue }}</td>
              <td class="stats-col fs-6 text-end">S/ {{ sale.paidAmount }}</td>
              <td class="stats-col fs-6 text-end">S/ {{ sale.unpaidAmount }}</td>
            </tr>
          </router-link>
        </div>
      </tbody>
    </table>
  </section>

  <Modal
    body="¿Deseas eliminar este cliente?"
    confirmLabel="Sí, bórralo"
    rejectLabel="No"
    confirmEvent="deleteClient"
    rejectEvent="reject"
    v-if="displayClientDeletionConfirmation"
    @deleteClient="deleteClient"
    @reject="displayClientDeletionConfirmation = false"
  />

  <PopupButton 
    label="Nueva venta" 
    :url="{ 
      name: 'newsale',  
      params: { clientid: $route.params.clientid },
      query: { clientName: clientData?.clientName, clientNameDetails: clientData?.clientNameDetails }
    }"
  />

</template>

<script lang='ts'>
import StatItem from '@/components/stat-item.vue'
import PopupButton from '@/components/popup-button.vue' 
import Icon from '@/components/icon.vue'
import { getReferenceHeight } from '@/utils/utility-functions'
import { defineComponent, PropType } from 'vue'
import { Props, State, Refs, Methods } from '@/types/pages/client-page.types'
import { Empty } from '@/types/global.types'
import http from '@/utils/axios-instance'
import BackLink from '@/components/back-link.vue'
import EditButton from '@/components/edit-button.vue'
import DeleteButton from '@/components/delete-button.vue'
import { format } from 'date-fns'
import Modal from '@/components/modal.vue'
import { ClientResBody } from '#backend/client.types'

export default defineComponent<any, Empty, State, Empty, Methods>({
  // for some Reason if I pass Props to the first parameter in defineComponent typescript thinks 'props' is undefined, so for now I will let it as any.

  data () {
    return {
      displayClientDeletionConfirmation: false,
      clientData: undefined, // I've tried adding a type predicate to {} | ClientResponse so I can initialize this prop as an empty object instead of undefined but for some reason type  predicates doesn't work on Vue
      tbodyHeight: 0
    }
  },
  methods: {
    async getClientData () {
      try {
        const res = await http.get<{ clientData: ClientResBody }>(`/clients/${this.$route.params.clientid}?single=true`)
        const parsedSales = res.data.clientData.sales.map(sale => ({
          ...sale,
          saleDate: format(new Date(sale.saleDate), 'dd-MM-yyyy') 
        }))
        console.log('parsed res', parsedSales)

        this.clientData = { ...res.data.clientData, sales: parsedSales }
      } catch (err) {
        console.error(err)
      }
    },
    async deleteClient () {
      try {
        const { clientid } = this.$route.params;
        const { _id: userid } = this.$store.state;
        await http.delete(`/clients/${userid}/${clientid}`)
        this.$router.back()
      } catch (err) {
        throw new Error(`there was an error, ${err}`)
      }
    },
    declareClientDeletionIntent () {
      console.log('AAAA');
      this.displayClientDeletionConfirmation = true
    }
  },
  components: {
    Icon,
    StatItem,
    PopupButton,
    BackLink,
    EditButton,
    DeleteButton,
    Modal,
  },
  watch: {
    displayClientDeletionConfirmation (newVal) {
      console.log(newVal);
    }
  },
  async beforeMount () {
    await this.getClientData();
  },
  mounted () {
    const tbodyHeight = getReferenceHeight(this.$refs as Refs);
    console.log(tbodyHeight);
    this.tbodyHeight = tbodyHeight;
  }
})
</script>

<style scoped>
.sale-col {
  width: 40%;
}
.stats-col {
  width: 20%
}
</style>
