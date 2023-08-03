<template>
  <section class="container d-flex flex-column gap-3 bg-green px-4 py-3">
    <div class="d-flex justify-content-between gap-2">
      <div class="d-flex flex-column gap-2 text-start">
        <BackLink
          label="Regresar al cliente"
          :url="{ name: 'client', params: { clientid: $route.params.clientid } }"
        />
        <h1 class="fs-5 fw-bold m-0">Venta a {{ clientData ? clientData.clientName : '' }}</h1>
        <time class="fw-bold">realizada el {{ clientData ? clientData.sale.saleDate : '' }}</time>
      </div>
      <div class="d-flex flex-column gap-2">
        <EditButton
          :url="{ 
            name: 'editsale', 
            params: { clientid: $route.params.clientid, saleid: $route.params.saleid },
            query: { clientName: clientData?.clientName, clientNameDetails: clientData?.clientNameDetails }
          }"
          :label="true"
        />
        <DeleteButton 
          deleteEvent="deleteSaleIntent" 
          @deleteSaleIntent="declareSaleDeletionIntent"
          :label="true"
        />
      </div>
    </div>
    <div class="d-flex">
      <StatItem icon="total-value" label="Valor total" :value="clientData ? clientData.sale.saleValue : NaN" />
      <StatItem icon="amount-paid" label="Monto pagado" :value="clientData ? clientData.sale.paidAmount : NaN" />
      <StatItem icon="debt" label="Deuda" :value="clientData ? clientData.sale.unpaidAmount : NaN" />
    </div>
  </section>
  <section class="container p-0">
    <div class="w-100 d-flex">
      <button 
        name="products" 
        :class="`flex-grow-1 w-50 border-0 fs-6 fw-bold ${ currentView === 'products' ? 'bg-dark-blue' : 'bg-blue' } text-light-purple py-2`"
        @click="changeView"
      >
        PRODUCTOS
      </button>
      <button 
        name="payments" 
        :class="`flex-grow-1 w-50 border-0 fs-6 fw-bold ${ currentView === 'payments' ? 'bg-dark-blue' : 'bg-blue' } text-light-purple py-2`"
        @click="changeView"
      >
        PAGOS
      </button>
    </div>
    <div class="p-3">
      <table class="table table-fixed w-100 m-0 overflow-hidden" ref='tableRef'>
        <thead 
          v-if="currentView === 'products'"
          class="d-table w-100 fs-6"
        >
          <tr>
            <th class="text-start" :style="{ width: '40%'}">Producto</th>
            <th class="text-center" :style="{ width: '20%'}">Cantidad</th>
            <th class="text-end" :style="{ width: '20%'}">Precio</th>
            <th class="text-end" :style="{ width: '20%'}">Total</th>
          </tr>
        </thead>

        <thead 
          v-if="currentView === 'payments'"
          class="d-table w-100 fs-6"
        >
          <tr>
            <th class="text-start">Fecha de pago</th>
            <th class="text-end">Cantidad</th>
          </tr>
        </thead>

        <tbody 
          :style="{ height: tbodyHeight + 'px' }"
          v-if="currentView === 'products' && clientData"
          class="d-block w-100 table-group-divider pb-5 overflow-scroll"
        >
          <tr
            v-for="(item, idx) in clientData.sale.items"
            :key="'item' + idx"
            class="d-table w-100 align-middle"
          >
            <td class="text-start" height="50px" :style="{ width: '40%' }">{{ item.name }}</td>
            <td class="text-center" height="50px" :style="{ width: '20%' }">{{ item.quantity }}</td>
            <td class="text-end" height="50px" :style="{ width: '20%' }">S/ {{ item.pricePerUnit }}</td>
            <td class="text-end" height="50px" :style="{ width: '20%' }">S/ {{ item.pricePerUnit * item.quantity }}</td>
          </tr>
        </tbody>

        <tbody 
          :style="{ height: tbodyHeight + 'px' }"
          v-if="currentView === 'payments' && clientData"
          class="d-block w-100 table-group-divider pb-5 overflow-y-scroll"
        >
          <tr
            v-for="(payment, idx) in clientData.sale.payments"
            :key="'item' + idx"
            :class="`position-relative d-table w-100 align-middle ${toggleSelectedRow(idx)}`"
            @pointerdown="startLongPress(idx)"
          >
            <td class="text-start" height="50px">{{ payment.paymentDate }}</td>
            <td :class="`text-end ${getPaymentStyle(idx)}`" height="50px">S/ {{ payment.amount }}</td>
            <td 
              :class="`position-absolute end-0 d-flex justify-content-end gap-2 ${toggleActionPanel(idx)}`"
              height="50px"
            >
              <EditButton
                :url="{ 
                  name: 'editpayment', 
                  params: { clientid: $route.params.clientid, saleid: $route.params.saleid, paymentid: payment._id },
                  query: { clientName: clientData?.clientName, clientNameDetails: clientData?.clientNameDetails }
                }"
                :label="false"
              />
              <DeleteButton 
                deleteEvent="deletePaymentIntent"
                @deletePaymentIntent="declarePaymentDeletionIntent(payment._id)"
                :label="false" 
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <Modal
    body="¿Deseas eliminar esta venta?"
    confirmLabel="Sí, bórrala"
    rejectLabel="No"
    confirmEvent="deleteSale"
    rejectEvent="reject"
    v-if="displaySaleDeletionConfirmation"
    @deleteSale="deleteSale"
    @reject="displaySaleDeletionConfirmation = false"
  />
  <Modal
    body="¿Deseas eliminar este pago?"
    confirmLabel="Sí, bórralo"
    rejectLabel="No"
    confirmEvent="deletePayment"
    rejectEvent="reject"
    v-if="displayPaymentDeletionConfirmation"
    @deletePayment="deletePayment(paymentToDelete)"
    @reject="displayPaymentDeletionConfirmation = false"
  />
  <PopupButton 
    label="Añadir pago" 
    :url="{
      name: 'newpayment', 
      params: { clientid: $route.params.clientid, saleid: $route.params.saleid },
      query: { clientName: clientData?.clientName, clientNameDetails: clientData?.clientNameDetails }
    }"
  />
  <Spinner v-if="isLoading" />
</template>

<script lang="ts">
import PopupButton from '@/components/popup-button.vue' 
import StatItem from '@/components/stat-item.vue'
import { getReferenceHeight } from '@/utils/utility-functions'
import { defineComponent } from 'vue'
import { State, Methods, Refs } from '@/types/pages/sale-page.types'
import { Empty } from '@/types/global.types'
import { isAxiosError } from 'axios'
import http from '@/utils/axios-instance'
import { format } from 'date-fns'
import EditButton from '@/components/edit-button.vue'
import DeleteButton from '@/components/delete-button.vue'
import BackLink from '@/components/back-link.vue'
import { ClientAndSaleResBody } from '#backend/sale.types'
import Modal from '@/components/modal.vue'
import { SaleAfterPayment } from '#backend/sale.types'
import Spinner from '@/components/spinner.vue'

export default defineComponent<Empty, Empty, State, Empty, Methods>({
  data () {
    return {
      displayPaymentDeletionConfirmation: false,
      displaySaleDeletionConfirmation: false,
      paymentToDelete: undefined,
      pressTimeoutId: undefined,
      clientData: undefined,
      currentView: 'products',
      tbodyHeight: 0,
      actionPanel: undefined,
      isLoading: false
    }
  },
  components: {
    StatItem,
    PopupButton,
    EditButton,
    DeleteButton,
    BackLink,
    Modal,
    Spinner,
  },
  methods: {
    changeView (e: MouseEvent) {
      this.currentView = (e.target as HTMLButtonElement).name
    },
    async getSaleData () {
      try {
        this.isLoading = true
        const { clientid, saleid } = this.$route.params;
        const res = await http.get<{ saleData: ClientAndSaleResBody }>(`/clients/${clientid}/sales/${saleid}`)
        // console.log('res', res.data.saleData);
        const parsedRes = { ...res.data.saleData }
        parsedRes.sale.saleDate = format(new Date(parsedRes.sale.saleDate), 'dd-MM-yyyy')
        console.log('parsedRes: ', parsedRes);
        parsedRes.sale.payments = parsedRes.sale.payments.map(payment => ({
          ...payment, 
          paymentDate: format(new Date(payment.paymentDate), 'dd-MM-yyyy') 
        }))

        // console.log('parsed res', parsedRes)

        this.clientData = parsedRes
        this.isLoading = false
      } catch (err) {
        if (isAxiosError(err)) {
          this.isLoading = false
          console.error(err.response)
          throw new Error(`there was an error when requesting the sale data, ${err.response}`)
        } else {
          this.isLoading = false
          throw new Error(`there was an error, ${err}`)
        }
      }
      // this.clientData = responseMock.saleData
    },
    onLongPressStop (e, idx) {
      console.log(`row ${idx} was pressed`);
      this.actionPanel = idx
    },
    getPaymentStyle (idx) {
      return idx === this.actionPanel ? 'payment-td' : '';
    },
    toggleActionPanel (idx) {
      return idx === this.actionPanel ? 'action-panel-active' : 'action-panel';
    },
    toggleSelectedRow (idx) {
      return idx === this.actionPanel ? 'row-selected' : '';
    },
    startLongPress (rowIdx) {
      this.pressTimeoutId = setTimeout(() => { this.actionPanel = rowIdx }, 500)
    },
    declarePaymentDeletionIntent (paymentId) {
      this.paymentToDelete = paymentId
      this.displayPaymentDeletionConfirmation = true
    },
    declareSaleDeletionIntent () {
      this.displaySaleDeletionConfirmation = true
    },
    async deletePayment (paymentId) {
      if (!paymentId) return;

      const { clientid, saleid } = this.$route.params;
      const res = await http.patch<{ affectedSaleFields: SaleAfterPayment }>(`/clients/${clientid}/sales/${saleid}/payments/${paymentId}?delete=true`)

      if (this.clientData) { // for some reason the type predicate is not working as expected here
        this.clientData.sale.payments = this.clientData.sale.payments.filter((payment) => {
          return payment._id !== paymentId;
        })
        this.clientData.sale.unpaidAmount = res.data.affectedSaleFields.unpaidAmount
        this.clientData.sale.paidAmount = res.data.affectedSaleFields.paidAmount
      }
      this.displayPaymentDeletionConfirmation = false
      this.paymentToDelete = undefined
      this.actionPanel = undefined
    },
    async deleteSale() {
      console.log('deleting this sale');
      const { clientid, saleid } = this.$route.params;
      await http.patch(`/clients/${clientid}/sales/${saleid}?delete=true`)
      this.$router.back();
      // throw new Error('you need to specify the entity to delete');
      // this.displaySaleDeletionConfirmation = false
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
    console.log(this.$route);
    const tbodyHeight = getReferenceHeight(this.$refs as Refs);
    this.tbodyHeight = tbodyHeight;
  }
})
</script>

<style>
.back-link {
  font-size: .9rem;
}
.payment-td {
  transform: translateX(-110px);
  transition: ease .3s;
}
.action-panel {
  visibility: hidden;
  transform: translateX(110px);
  transition: ease .3s;
}
.action-panel-active {
  visibility: visible;
  transition: ease .3s;
  transform: translateX(0px);
}
.row-selected { 
  background-color: #CBD8FB;
}
</style>
